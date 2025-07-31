/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
// https://vite.dev/config/
const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: "playwright",
						instances: [
							{
								browser: "chromium",
							},
						],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
	build: {
		lib: {
			entry: Object.fromEntries(
				glob
					.sync("src/**/*.{ts,tsx}", {
						ignore: ["**/*.d.ts", "**/*.stories.*", "**/*.test.*"],
					})
					.map((file) => [
						file.slice(4, file.length - path.extname(file).length),
						path.resolve(__dirname, file),
					]),
			),
			formats: ["es", "cjs"],
		},
		cssCodeSplit: false,
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"clsx",
				"tailwind-merge",
				"class-variance-authority",
				"@radix-ui/react-slot",
			],
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		},
		sourcemap: true,
		emptyOutDir: false,
	},
});
