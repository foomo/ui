/**
 * Development watch mode: keep `dist/` in sync with `src/` so an app that
 * consumes the package through `bun link` / `npm link` picks up changes
 * without a manual `bun run build`.
 *
 * It runs the same three steps as `build`, each in its incremental form:
 *
 *  - `tsc --watch` re-emits declarations for changed files,
 *  - a `dist/` watcher passes every emitted `.d.ts` through
 *    `rewriteDeclaration` (the `@/` alias fix from rewrite-dts-aliases.mjs),
 *  - `vite build --watch` rebuilds the JS and `ui.css`.
 *
 * Vite resolves the library entries from a glob when the config loads, so
 * adding or removing a module under `src/` restarts the Vite watcher.
 * Theme files are not part of the module graph and are copied directly.
 *
 * While it runs, a pid file tells the Claude Code Stop hook
 * (.claude/hooks/rebuild-if-changed.sh) to skip its full rebuild, which would
 * otherwise wipe `dist/` underneath the watchers.
 */
import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build, createLogger } from "vite";
import { DIST, rewriteDeclaration } from "./rewrite-dts-aliases.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const PID_FILE = join(ROOT, "node_modules/.cache/foomo-ui/watch.pid");

let shuttingDown = false;

const color = (code) => (text) =>
	process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text;
const dim = color(2);
const tags = {
	types: color(34)("[types]"),
	js: color(35)("[js]   "),
	theme: color(36)("[theme]"),
	watch: color(32)("[watch]"),
};
const time = () => dim(new Date().toLocaleTimeString());
const log = (tag, message) => console.log(`${time()} ${tags[tag]} ${message}`);

// Mirrors the entry filter in vite.config.ts: changes to anything else under
// src/ are picked up by the running watchers without a restart.
const isAlive = (pid) => {
	try {
		process.kill(pid, 0);
		return true;
	} catch (error) {
		// EPERM: the process exists but belongs to someone else.
		return error.code === "EPERM";
	}
};

const isLibraryEntry = (file) =>
	/\.tsx?$/.test(file) &&
	!/\.d\.ts$|\.stories\.|\.test\./.test(file) &&
	!file.startsWith("stories/") &&
	file !== "main.tsx";

// --- setup -----------------------------------------------------------------

// A second watcher would wipe dist/ under the first and take over its pid
// file, so only one may run at a time.
const runningPid = Number(await readFile(PID_FILE, "utf8").catch(() => ""));
if (runningPid && isAlive(runningPid)) {
	console.error(`${tags.watch} already running (pid ${runningPid})`);
	process.exit(1);
}

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, "themes"), { recursive: true });
await mkdir(join(PID_FILE, ".."), { recursive: true });
await writeFile(PID_FILE, String(process.pid));

// --- declarations ------------------------------------------------------------

const tsc = spawn(
	join(ROOT, "node_modules/.bin/tsc"),
	["-p", "tsconfig.build.json", "--watch", "--preserveWatchOutput"],
	{ cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] },
);
for (const stream of [tsc.stdout, tsc.stderr]) {
	stream.setEncoding("utf8");
	stream.on("data", (chunk) => {
		for (const line of chunk.split("\n")) {
			// tsc clears nothing with --preserveWatchOutput, but it still emits
			// its own timestamp prefix; drop it in favour of ours.
			const text = line.replace(/^\[?\d{1,2}:\d{2}:\d{2}( [AP]M)?\]? - /, "");
			if (text.trim()) log("types", text);
		}
	});
}
tsc.on("exit", (code, signal) => {
	if (!shuttingDown) {
		log("types", `tsc exited (${signal ?? code})`);
		shutdown(1);
	}
});

// tsc emits `@/` imports verbatim; fix each declaration as it lands. Rewriting
// is a no-op once applied, so our own writes don't cause a loop.
const pendingDeclarations = new Set();
let declarationTimer;
const distWatcher = watch(DIST, { recursive: true }, (_event, file) => {
	if (!file?.endsWith(".d.ts")) return;
	pendingDeclarations.add(join(DIST, file));
	clearTimeout(declarationTimer);
	declarationTimer = setTimeout(async () => {
		const files = [...pendingDeclarations];
		pendingDeclarations.clear();
		let rewritten = 0;
		let touched = 0;
		for (const path of files) {
			// The file can disappear between the event and the read.
			const count = await rewriteDeclaration(path).catch(() => 0);
			rewritten += count;
			if (count > 0) touched += 1;
		}
		if (rewritten > 0) {
			log("types", `rewrote ${rewritten} alias import(s) in ${touched} file(s)`);
		}
	}, 100);
});

// --- JS + CSS ----------------------------------------------------------------

// Rollup's watch cache only re-transforms modules whose own file changed, so
// a component gaining a new utility class would leave ui.css stale. Forcing
// the stylesheets back through the pipeline makes Tailwind rescan sources.
// The scanner only ever adds classes, so a removed one keeps its (unused)
// rule in ui.css until the watcher restarts.
const rescanTailwind = {
	name: "foomo-ui:rescan-tailwind",
	shouldTransformCachedModule: ({ id }) => id.endsWith(".css") || null,
};

// Rollup errors arrive as watcher events and are logged there; without this
// Vite prints each one a second time.
const viteLogger = createLogger("warn");
viteLogger.error = () => {};

let viteWatcher;
let bundleStart = 0;
let bundleFailed = false;

async function startVite() {
	const watcher = await build({
		root: ROOT,
		// Both are needed: the logger filters messages, but the build reporter
		// checks logLevel before writing its "rendering chunks" progress line
		// straight to the terminal.
		logLevel: "warn",
		customLogger: viteLogger,
		clearScreen: false,
		build: { watch: {} },
		plugins: [rescanTailwind],
	});
	watcher.on("event", (event) => {
		switch (event.code) {
			case "BUNDLE_START":
				bundleStart = performance.now();
				bundleFailed = false;
				break;
			case "BUNDLE_END":
				event.result.close();
				break;
			case "END":
				if (bundleFailed) break;
				log("js", `built in ${Math.round(performance.now() - bundleStart)}ms`);
				break;
			case "ERROR":
				event.result?.close();
				bundleFailed = true;
				log("js", color(31)(event.error.message));
				break;
		}
	});
	return watcher;
}

let restartTimer;
function restartVite(reason) {
	clearTimeout(restartTimer);
	restartTimer = setTimeout(async () => {
		log("js", `${reason}, restarting`);
		await viteWatcher?.close();
		viteWatcher = await startVite();
	}, 200);
}

viteWatcher = await startVite();

// --- source events Vite can't see --------------------------------------------

const entries = new Set(
	(await readdir(SRC, { recursive: true }))
		.map((file) => file.split("\\").join("/"))
		.filter(isLibraryEntry),
);

const srcWatcher = watch(SRC, { recursive: true }, async (event, file) => {
	if (!file) return;
	file = file.split("\\").join("/");

	if (file.startsWith("themes/") && file.endsWith(".css")) {
		const target = join(DIST, "themes", basename(file));
		await copyFile(join(SRC, file), target).then(
			() => log("theme", `copied ${file}`),
			() => rm(target, { force: true }),
		);
		return;
	}

	// "rename" covers creation and deletion, but also editors (and sed -i)
	// that save by replacing the file, so compare against what exists.
	if (event === "rename" && isLibraryEntry(file)) {
		const exists = existsSync(join(SRC, file));
		if (exists !== entries.has(file)) {
			entries[exists ? "add" : "delete"](file);
			if (!exists) {
				// Neither watcher deletes outputs, so a removed module would
				// otherwise stay importable from dist/.
				const stem = join(DIST, file.replace(/\.tsx?$/, ""));
				await Promise.all(
					[".js", ".cjs", ".d.ts"].flatMap((ext) =>
						[stem + ext, `${stem}${ext}.map`].map((path) =>
							rm(path, { force: true }),
						),
					),
				);
			}
			restartVite(`entry ${file} ${exists ? "added" : "removed"}`);
		}
	}
});

log("watch", `watching src/ → dist/ ${dim("(Ctrl+C to stop)")}`);

// --- shutdown ----------------------------------------------------------------

async function shutdown(code = 0) {
	if (shuttingDown) return;
	shuttingDown = true;
	srcWatcher.close();
	distWatcher.close();
	tsc.kill();
	await viteWatcher?.close();
	const pidFileOwner = await readFile(PID_FILE, "utf8").catch(() => "");
	if (pidFileOwner === String(process.pid)) {
		await rm(PID_FILE, { force: true });
	}
	process.exit(code);
}
process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
