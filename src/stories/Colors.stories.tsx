import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/table";

type Token = { name: string; use?: string };

const groups: { title: string; description: string; tokens: Token[] }[] = [
	{
		title: "Status",
		description:
			"The brand status colours. Badges, tags, alerts and toasts use them as a light tint with text in the full colour.",
		tokens: [
			{ name: "success", use: "A state that really is good" },
			{ name: "alert", use: "Needs a look, but has not failed" },
			{
				name: "alert-foreground",
				use: "Alert text on white, where the yellow is too light",
			},
			{ name: "destructive", use: "A state that really is bad" },
			{ name: "link", use: "Links, and the info status" },
			{
				name: "accent-highlight",
				use: "Selected controls: checkbox, radio, switch, calendar day",
			},
			{ name: "accent-highlight-foreground" },
		],
	},
	{
		title: "Surfaces and text",
		description:
			"Each surface comes with a foreground for the text on it. Muted is the quiet grey behind tabs, hovers and tracks.",
		tokens: [
			{ name: "background", use: "The page" },
			{ name: "foreground", use: "Body text" },
			{ name: "card" },
			{ name: "card-foreground" },
			{ name: "popover", use: "Menus, popovers, toasts" },
			{ name: "popover-foreground" },
			{ name: "muted", use: "Tab track, hover and pressed states" },
			{ name: "muted-foreground", use: "Secondary text, placeholders" },
			{ name: "secondary", use: "Secondary buttons and badges" },
			{ name: "secondary-foreground" },
			{ name: "tertiary", use: "A cool grey surface" },
			{ name: "tertiary-foreground" },
		],
	},
	{
		title: "Emphasis",
		description: "The solid fill for the main action, and its text.",
		tokens: [
			{ name: "primary", use: "Default button and badge" },
			{ name: "primary-foreground" },
			{ name: "accent" },
			{ name: "accent-foreground" },
		],
	},
	{
		title: "Lines",
		description: "Borders, input outlines and the focus ring.",
		tokens: [
			{ name: "border" },
			{ name: "input" },
			{ name: "ring", use: "Focus ring" },
		],
	},
	{
		title: "Charts",
		description: "One blue stepped by lightness, for series in a chart.",
		tokens: [1, 2, 3, 4, 5].map((step) => ({ name: `chart-${step}` })),
	},
	{
		title: "Tag palette",
		description:
			"Six categorical colours for tags with no good or bad meaning, such as a brand or a source.",
		tokens: [1, 2, 3, 4, 5, 6].map((step) => ({ name: `label-color-${step}` })),
	},
	{
		title: "Sidebar",
		description: "The sidebar's own surface, so it can differ from the page.",
		tokens: [
			{ name: "sidebar" },
			{ name: "sidebar-foreground" },
			{ name: "sidebar-primary" },
			{ name: "sidebar-primary-foreground" },
			{ name: "sidebar-accent" },
			{ name: "sidebar-accent-foreground" },
			{ name: "sidebar-border" },
			{ name: "sidebar-ring" },
		],
	},
];

type Theme = Record<string, string>;

/**
 * The custom properties declared on `:root` and on `.dark`, read from the
 * loaded theme stylesheet. Reading the rules rather than computed styles
 * gives both modes at once, whichever mode the page is in.
 */
function readThemes(): { light: Theme; dark: Theme } {
	const light: Theme = {};
	const dark: Theme = {};
	const visit = (rules: CSSRuleList) => {
		for (const rule of Array.from(rules)) {
			if ("cssRules" in rule && !(rule instanceof CSSStyleRule)) {
				visit((rule as CSSGroupingRule).cssRules);
				continue;
			}
			if (!(rule instanceof CSSStyleRule)) continue;
			const target =
				rule.selectorText === ":root"
					? light
					: rule.selectorText === ".dark"
						? dark
						: undefined;
			if (!target) continue;
			for (const property of Array.from(rule.style)) {
				if (property.startsWith("--")) {
					target[property.slice(2)] = rule.style
						.getPropertyValue(property)
						.trim();
				}
			}
		}
	};
	for (const sheet of Array.from(document.styleSheets)) {
		try {
			visit(sheet.cssRules);
		} catch {
			// A cross-origin stylesheet cannot be read; the theme is never one.
		}
	}
	return { light, dark: { ...light, ...dark } };
}

/** Follows `var(--x)` references within one mode, e.g. accent-highlight. */
function resolve(theme: Theme, value: string | undefined, depth = 0): string {
	if (!value) return "";
	const reference = value.match(/^var\(--([\w-]+)\)$/);
	if (!reference || depth > 5) return value;
	return resolve(theme, theme[reference[1]], depth + 1);
}

/**
 * A CSS colour as hex, by painting it on a one-pixel canvas. Translucent
 * colours (the dark-mode lines) come back with their opacity.
 */
function toHex(color: string, context: CanvasRenderingContext2D | null) {
	if (!color || !context) return "";
	context.clearRect(0, 0, 1, 1);
	context.fillStyle = color;
	context.fillRect(0, 0, 1, 1);
	const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
	const hex = [r, g, b]
		.map((channel) => channel.toString(16).padStart(2, "0"))
		.join("")
		.toUpperCase();
	return a < 255 ? `${hex} · ${Math.round((a / 255) * 100)}%` : hex;
}

function ColorTokens() {
	const [themes, setThemes] = React.useState<{
		light: Theme;
		dark: Theme;
	} | null>(null);
	const context = React.useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 1;
		canvas.height = 1;
		return canvas.getContext("2d", { willReadFrequently: true });
	}, []);

	React.useEffect(() => setThemes(readThemes()), []);

	if (!themes) return null;

	return (
		<div className="fui:flex fui:flex-col fui:gap-10">
			{groups.map((group) => (
				<section key={group.title} className="fui:flex fui:flex-col fui:gap-3">
					<div className="fui:flex fui:flex-col fui:gap-1">
						<h3 className="fui:text-sm fui:font-medium">{group.title}</h3>
						<p className="fui:text-sm fui:text-muted-foreground">
							{group.description}
						</p>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Token</TableHead>
								<TableHead>Light</TableHead>
								<TableHead>Dark</TableHead>
								<TableHead>Used for</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{group.tokens.map((token) => {
								const light = resolve(themes.light, themes.light[token.name]);
								const dark = resolve(themes.dark, themes.dark[token.name]);
								return (
									<TableRow key={token.name}>
										<TableCell>
											<div className="fui:flex fui:flex-col">
												<span className="fui:font-medium">--{token.name}</span>
												<span className="fui:text-xs fui:text-muted-foreground">
													fui:bg-{token.name}, fui:text-{token.name}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<Swatch
												color={light}
												hex={toHex(light, context)}
												page={themes.light.background}
											/>
										</TableCell>
										<TableCell>
											<Swatch
												color={dark}
												hex={toHex(dark, context)}
												page={themes.dark.background}
											/>
										</TableCell>
										<TableCell className="fui:text-muted-foreground">
											{token.use}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</section>
			))}
		</div>
	);
}

/**
 * A chip of the colour with its hex. Each chip sits on its own mode's page
 * background, so translucent colours show as they would in that mode.
 */
function Swatch({
	color,
	hex,
	page,
}: {
	color: string;
	hex: string;
	page: string;
}) {
	return (
		<div className="fui:flex fui:items-center fui:gap-3">
			<span
				className="fui:flex fui:size-8 fui:shrink-0 fui:rounded-md fui:border fui:border-border fui:p-0.5"
				style={{ background: page }}
			>
				<span
					className="fui:size-full fui:rounded-sm"
					style={{ background: color }}
				/>
			</span>
			<span className="fui:tabular-nums">{hex}</span>
		</div>
	);
}

const meta = {
	title: "Foundations/Colors",
	component: ColorTokens,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Every colour token in the neutral theme, with its light and dark value as hex. Values are read from the theme stylesheet, so this page always matches `src/themes/neutral.css`. Each token is available as a Tailwind colour, e.g. `fui:bg-success` or `fui:text-muted-foreground`.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ColorTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
