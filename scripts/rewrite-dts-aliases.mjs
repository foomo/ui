/**
 * Rewrite `@/…` path aliases in the emitted declaration files to relative
 * specifiers.
 *
 * `tsc` resolves the alias when type-checking but emits it verbatim into the
 * `.d.ts` output, and consumers have no `@/*` mapping — so every such import
 * silently degrades to `any` on their side. That is not a cosmetic problem:
 * `alert-dialog.d.ts` importing `Button` this way turns
 * `Pick<ComponentProps<typeof Button>, "variant" | "size">` into
 * `Pick<any, …>`, which makes both props *required* for callers.
 *
 * Vite already rewrites the alias in the `.js` output, so this only has to
 * catch the declarations. It runs as a build step rather than a source-level
 * change because `regenerate-components` re-runs the shadcn CLI, which always
 * emits `@/` imports.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, dirname, sep } from "node:path";
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const ALIAS = /(from\s*")@\/([^"]+)(")/g;

async function* declarations(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			yield* declarations(path);
		} else if (entry.name.endsWith(".d.ts")) {
			yield path;
		}
	}
}

/**
 * Returns the number of imports rewritten. Writes only when non-zero, so the
 * watcher does not react to its own writes.
 */
export async function rewriteDeclaration(file) {
	const source = await readFile(file, "utf8");
	let count = 0;

	const output = source.replace(ALIAS, (_match, open, target, close) => {
		count += 1;
		// `dist/components/x.d.ts` -> `dist/`, so `@/components/button`
		// becomes `./button`.
		let path = relative(dirname(file), join(DIST, target)).split(sep).join("/");
		if (!path.startsWith(".")) {
			path = `./${path}`;
		}
		return `${open}${path}${close}`;
	});

	if (count > 0) {
		await writeFile(file, output);
	}
	return count;
}

// Real paths, so running it through a symlink still counts as the main module.
if (
	process.argv[1] &&
	realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])
) {
	let rewritten = 0;
	let files = 0;

	for await (const file of declarations(DIST)) {
		const count = await rewriteDeclaration(file);
		if (count > 0) {
			rewritten += count;
			files += 1;
		}
	}

	console.log(
		`rewrite-dts-aliases: ${rewritten} import(s) across ${files} declaration file(s)`,
	);
}
