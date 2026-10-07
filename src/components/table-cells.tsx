import {
	CheckCircleIcon,
	CheckIcon,
	type Icon,
	MinusIcon,
	WarningIcon,
	XIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";
import { Badge } from "@/components/badge";

/**
 * Cell renderers for `DataTable` and `Table`.
 *
 * A listing is scanned far more often than it is read line by line, so the
 * values that repeat down a column — flags, kinds, states — are better as a
 * glyph or a tag than as a word. Anything carried by shape or colour alone
 * also carries text for assistive tech.
 */

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

/**
 * A yes/no flag.
 *
 * A column of "Yes"/"No" reads as a wall of text and gives the eye nothing to
 * lock onto; a tick against a muted cross does. `undefined` means the row has
 * no value, which is not the same as a definite "no", so it gets a dash.
 *
 * `label` names what the flag means, because a tick on its own tells a screen
 * reader nothing.
 *
 * `tone` picks how much the glyphs say on their own:
 *
 * - `neutral` (default) leaves the colour to the table. Right where the flag
 *   is a plain attribute — "Discountable", "Webshop" — and a green tick would
 *   imply an approval that isn't being made.
 * - `semantic` colours true with `--success` and false with `--destructive`,
 *   for a column where true really does mean good and false really does mean
 *   bad.
 *
 * Each glyph sits on a small square, styled like the matching tag: `neutral`
 * as an outline tag (a border, no fill), `semantic` as a tint of the glyph's
 * own colour, like the `success` and `destructive` tags. An unknown value gets
 * neither, in either tone: it is the absence of a flag, and should read
 * quieter than any answer.
 *
 * Literal class strings per state, not built from the colour name: Tailwind
 * only emits CSS for class names it finds verbatim in the source.
 */
function BooleanCell({
	value,
	label,
	tone = "neutral",
}: {
	value: boolean | undefined | null;
	label: string;
	tone?: "neutral" | "semantic";
}) {
	const semantic = tone === "semantic";

	const state =
		value === undefined || value === null
			? {
					Icon: MinusIcon,
					text: "fui:text-muted-foreground/60",
					box: "",
					spoken: "unknown",
				}
			: value
				? {
						Icon: CheckIcon,
						text: semantic ? "fui:text-success" : "fui:text-foreground",
						box: semantic ? "fui:bg-success/10" : "fui:border-border",
						spoken: "yes",
					}
				: {
						Icon: XIcon,
						text: semantic
							? "fui:text-destructive"
							: "fui:text-muted-foreground/60",
						box: semantic ? "fui:bg-destructive/10" : "fui:border-border",
						spoken: "no",
					};

	return (
		<span
			data-slot="boolean-cell"
			className={cn(
				// The transparent border keeps every state the same size, so an
				// outlined chip and a tinted one line up in the column.
				"fui:inline-flex fui:size-6 fui:items-center fui:justify-center fui:rounded-4xl fui:border fui:border-transparent",
				state.box,
			)}
		>
			<state.Icon className={cn("fui:size-4", state.text)} aria-hidden />
			<span className="fui:sr-only">
				{label}: {state.spoken}
			</span>
		</span>
	);
}

/**
 * The tag palette: six categorical colours (`--label-color-1` … `-6` in the
 * theme), for categories that have no good/bad meaning (a type, an area, a
 * source). Pick one per category and keep it stable, so a category keeps its
 * colour across every table. A state that really is good or bad ("Enabled",
 * "Failed") takes the `success`, `alert` or `destructive` variant instead.
 */
type TagColor =
	| "label-1"
	| "label-2"
	| "label-3"
	| "label-4"
	| "label-5"
	| "label-6";

/**
 * A tinted fill under text in the full colour. Dark mode switches to the
 * foreground (white) text on a heavier tint: six distinct hues read as
 * near-identical against a dark surface, and a 10% tint is barely visible
 * there, so the fill carries the colour and the text stays legible.
 *
 * Literal strings, not built from a template: Tailwind only emits CSS for
 * class names it finds verbatim in the source.
 */
const tagColorClassNames: Record<TagColor, string> = {
	"label-1":
		"fui:bg-label-color-1/10 fui:text-label-color-1 fui:dark:bg-label-color-1/50 fui:dark:text-foreground",
	"label-2":
		"fui:bg-label-color-2/10 fui:text-label-color-2 fui:dark:bg-label-color-2/50 fui:dark:text-foreground",
	"label-3":
		"fui:bg-label-color-3/10 fui:text-label-color-3 fui:dark:bg-label-color-3/50 fui:dark:text-foreground",
	"label-4":
		"fui:bg-label-color-4/10 fui:text-label-color-4 fui:dark:bg-label-color-4/50 fui:dark:text-foreground",
	"label-5":
		"fui:bg-label-color-5/10 fui:text-label-color-5 fui:dark:bg-label-color-5/50 fui:dark:text-foreground",
	"label-6":
		"fui:bg-label-color-6/10 fui:text-label-color-6 fui:dark:bg-label-color-6/50 fui:dark:text-foreground",
};

/**
 * The `label-*` colours as plain CSS values, in palette order, for chart
 * marks: an SVG `fill` takes a colour, not a class. Index `n` is `label-(n+1)`,
 * so a chart colouring the same categories as a table can line them up.
 */
const tagColorValues = [
	"var(--label-color-1)",
	"var(--label-color-2)",
	"var(--label-color-3)",
	"var(--label-color-4)",
	"var(--label-color-5)",
	"var(--label-color-6)",
] as const;

/**
 * A single tag.
 *
 * `outline` by default: a listing can carry several tag columns, and filled
 * badges in each turn the table into a colour chart. Spend colour only where
 * it means something, by passing a `variant` or a `color`.
 *
 * `color` takes precedence over `variant`. The tag then renders with no
 * variant styles at all, only the badge's shape and the palette colour, so
 * the two never compete for the background.
 *
 * `icon` leads the label, for a tag whose glyph carries meaning on top of its
 * colour. It is marked `data-icon="inline-start"` rather than sized here: the
 * badge keys its padding and icon size off that attribute.
 */
function TagCell({
	children,
	variant = "outline",
	color,
	icon: LeadingIcon,
	className,
}: {
	children: React.ReactNode;
	variant?: BadgeVariant;
	color?: TagColor;
	icon?: Icon;
	className?: string;
}) {
	if (children === null || children === undefined || children === "") {
		return <EmptyCell />;
	}

	return (
		<Badge
			variant={color ? null : variant}
			data-color={color}
			className={cn(color && tagColorClassNames[color], className)}
		>
			{LeadingIcon ? (
				<LeadingIcon data-icon="inline-start" aria-hidden />
			) : null}
			{children}
		</Badge>
	);
}

/**
 * The outcomes a status column most often needs, each a fixed pair of glyph
 * and colour so the same outcome looks the same in every table:
 *
 * - `success`: a tick on green, for a step that completed ("Imported").
 * - `destructive`: a cross on red, for one that failed ("Failed").
 * - `alert`: a warning sign on yellow, for one that needs a look but has not
 *   failed ("Needs review").
 * - `info`: a circled tick on blue, for one settled some other way, after
 *   the fact ("Resolved").
 */
type StatusTone = "success" | "destructive" | "alert" | "info";

const statusTones: Record<
	StatusTone,
	{ icon: Icon; variant?: BadgeVariant; color?: TagColor }
> = {
	success: { icon: CheckIcon, variant: "success" },
	destructive: { icon: XIcon, variant: "destructive" },
	alert: { icon: WarningIcon, variant: "alert" },
	info: { icon: CheckCircleIcon, color: "label-1" },
};

/**
 * A status as a coloured tag with a leading icon, from the default set in
 * {@link StatusTone}. The label is the caller's own word for the outcome;
 * pass `icon` to swap the glyph while keeping the tone's colour.
 */
function StatusTagCell({
	status,
	icon,
	children,
	className,
}: {
	status: StatusTone;
	icon?: Icon;
	children: React.ReactNode;
	className?: string;
}) {
	const tone = statusTones[status];

	return (
		<TagCell
			variant={tone.variant}
			color={tone.color}
			icon={icon ?? tone.icon}
			className={className}
		>
			{children}
		</TagCell>
	);
}

/**
 * Several tags in one cell, wrapping rather than widening the column.
 *
 * `color` is either one colour for every tag, or a function picking each
 * tag's colour from its value, so a category keeps the colour it has in a
 * single-tag column.
 */
function TagListCell({
	values,
	variant = "outline",
	color,
	empty,
}: {
	values: ReadonlyArray<string>;
	variant?: BadgeVariant;
	color?: TagColor | ((value: string) => TagColor | undefined);
	empty?: React.ReactNode;
}) {
	if (values.length === 0) {
		return empty !== undefined ? empty : <EmptyCell />;
	}

	return (
		<div className="fui:flex fui:flex-wrap fui:gap-1">
			{values.map((value) => (
				<TagCell
					key={value}
					variant={variant}
					color={typeof color === "function" ? color(value) : color}
				>
					{value}
				</TagCell>
			))}
		</div>
	);
}

/**
 * An identifier, in the table's regular font.
 *
 * `tabular-nums` gives every digit the same width, so digit runs still line
 * up down the column without switching to a monospace, which reads as a
 * different kind of value next to the rest of the row.
 *
 * Presentational only. A cell that navigates wraps this in the router's own
 * link component — taking a route as a string here would mean casting away
 * whatever type safety that router provides.
 *
 * `mono` opts back into a monospace, for a value that really is code. Tables
 * should not need it; it defaults to off.
 */
function IdCell({
	children,
	className,
	mono = false,
	...props
}: React.ComponentProps<"span"> & { mono?: boolean }) {
	return (
		<span
			className={cn("fui:tabular-nums", mono && "fui:font-mono", className)}
			{...props}
		>
			{children}
		</span>
	);
}

/**
 * Affordance for a cell whose whole content navigates somewhere, to put on the
 * router link that wraps it.
 */
const cellLinkClassName = "fui:text-link fui:hover:underline";

/** A value the row does not have, rendered so the column keeps its rhythm. */
function EmptyCell() {
	return <span className="fui:text-muted-foreground">—</span>;
}

export {
	BooleanCell,
	cellLinkClassName,
	EmptyCell,
	IdCell,
	StatusTagCell,
	type StatusTone,
	TagCell,
	type TagColor,
	TagListCell,
	tagColorValues,
};
