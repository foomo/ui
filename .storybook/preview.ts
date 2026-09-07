import type { Decorator, Preview } from "@storybook/react-vite";
// Import index.css directly rather than via src/styles.ts: package.json marks
// only `*.css` as having side effects, so Rollup tree-shakes the .ts re-export
// out of `storybook build` and the bundle ships with no Tailwind at all.
import "../src/index.css";
// The library CSS intentionally does not ship the typeface (see src/index.css);
// Storybook plays the role of the host app here.
import "@fontsource-variable/inter";
// The design tokens (--background, --primary, --sidebar, --chart-1, …) live in
// the theme files, not in index.css. Without this import every `bg-*`/`text-*`
// utility resolves to an undefined custom property.
import "../src/themes/neutral.css";

const withTheme: Decorator = (Story, context) => {
	const theme = context.globals.theme === "dark" ? "dark" : "light";

	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.style.colorScheme = theme;
	document.documentElement.style.backgroundColor = "var(--background)";
	document.body.style.backgroundColor = "var(--background)";
	document.body.style.color = "var(--foreground)";
	document.body.classList.add("lib:bg-background", "lib:text-foreground");

	return Story();
};

const preview: Preview = {
	decorators: [withTheme],
	initialGlobals: {
		theme: "light",
	},
	globalTypes: {
		theme: {
			description: "Color theme",
			toolbar: {
				title: "Theme",
				icon: "circlehollow",
				items: [
					{ value: "light", title: "Light", icon: "sun" },
					{ value: "dark", title: "Dark", icon: "moon" },
				],
				dynamicTitle: true,
			},
		},
	},
	parameters: {
		backgrounds: { disable: true },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
