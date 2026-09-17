import { cn } from "cn";
import { CheckIcon, MinusIcon, XIcon } from "lucide-react";
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
 */
function BooleanCell({
	value,
	label,
}: {
	value: boolean | undefined | null;
	label: string;
}) {
	if (value === undefined || value === null) {
		return (
			<>
				<MinusIcon
					className="fui:size-4 fui:text-muted-foreground/60"
					aria-hidden
				/>
				<span className="fui:sr-only">{label}: unknown</span>
			</>
		);
	}

	return (
		<>
			{value ? (
				<CheckIcon className="fui:size-4 fui:text-foreground" aria-hidden />
			) : (
				<XIcon
					className="fui:size-4 fui:text-muted-foreground/60"
					aria-hidden
				/>
			)}
			<span className="fui:sr-only">
				{label}: {value ? "yes" : "no"}
			</span>
		</>
	);
}

/**
 * A single tag.
 *
 * `outline` by default: a listing can carry several tag columns, and filled
 * badges in each turn the table into a colour chart. Spend colour only where
 * it means something, by passing a `variant`.
 */
function TagCell({
	children,
	variant = "outline",
	className,
}: {
	children: React.ReactNode;
	variant?: BadgeVariant;
	className?: string;
}) {
	if (children === null || children === undefined || children === "") {
		return <EmptyCell />;
	}

	return (
		<Badge variant={variant} className={cn("fui:font-normal", className)}>
			{children}
		</Badge>
	);
}

/** Several tags in one cell, wrapping rather than widening the column. */
function TagListCell({
	values,
	variant = "outline",
	empty,
}: {
	values: ReadonlyArray<string>;
	variant?: BadgeVariant;
	empty?: React.ReactNode;
}) {
	if (values.length === 0) {
		return empty !== undefined ? <>{empty}</> : <EmptyCell />;
	}

	return (
		<div className="fui:flex fui:flex-wrap fui:gap-1">
			{values.map((value) => (
				<TagCell key={value} variant={variant}>
					{value}
				</TagCell>
			))}
		</div>
	);
}

/**
 * An identifier: monospaced so digits line up down the column.
 *
 * Presentational only. A cell that navigates wraps this in the router's own
 * link component — taking a route as a string here would mean casting away
 * whatever type safety that router provides.
 */
function IdCell({
	children,
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span className={cn("fui:font-mono fui:text-xs", className)} {...props}>
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
	TagCell,
	TagListCell,
};
