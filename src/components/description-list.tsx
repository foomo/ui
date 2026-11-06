import { cn } from "cn";
import * as React from "react";

import { EmptyCell } from "@/components/table-cells";

/**
 * How a `DescriptionList` lays out its pairs:
 *
 * - `rows`: one divided row per pair, the label in medium weight. For the
 *   details of one record on a detail page.
 * - `inline`: the pairs side by side in a wrapping line, each muted label
 *   followed by its value in medium weight. For a summary above a table
 *   ("Effective now 42 · Scheduled 11").
 * - `grid`: a tight two-column grid, muted labels on the left, with no
 *   dividers or padding. For a few pairs inside a table cell or a small tile.
 * - `stacked`: each muted label above its value, the pairs in a column. For
 *   figures read out beside a chart.
 */
type DescriptionListLayout = "rows" | "inline" | "grid" | "stacked";

const DescriptionListContext =
	React.createContext<DescriptionListLayout>("rows");

const listClassNames: Record<DescriptionListLayout, string> = {
	rows: "fui:divide-y fui:text-sm",
	inline: "fui:flex fui:flex-wrap fui:items-baseline fui:gap-x-6 fui:gap-y-1",
	grid: "fui:grid fui:grid-cols-[max-content_1fr] fui:gap-x-3 fui:gap-y-1",
	stacked: "fui:flex fui:flex-col fui:gap-2",
};

const itemClassNames: Record<DescriptionListLayout, string> = {
	rows: "fui:grid fui:items-center fui:gap-1 fui:px-3 fui:py-3 fui:sm:grid-cols-[minmax(8rem,1fr)_2fr] fui:sm:gap-4",
	inline: "fui:flex fui:items-baseline fui:gap-1",
	grid: "fui:contents",
	stacked: "",
};

const termClassNames: Record<DescriptionListLayout, string> = {
	rows: "fui:font-medium",
	inline: "fui:text-muted-foreground",
	grid: "fui:text-muted-foreground",
	stacked: "fui:text-muted-foreground",
};

const detailsClassNames: Record<DescriptionListLayout, string | undefined> = {
	rows: undefined,
	inline: "fui:font-medium",
	grid: undefined,
	stacked: undefined,
};

/**
 * Label and value pairs, for the details of one record (ID, SKU, supplier,
 * valid from). Renders a `<dl>`, so a screen reader announces each value with
 * its label.
 *
 * In the default `rows` layout, rows stack the label above the value on narrow
 * screens and sit side by side from `sm` up, with the label column at least
 * 8rem wide. The compact `inline`, `grid` and `stacked` layouts take the
 * surrounding text size, so they fit a toolbar line or a small tile; see
 * `DescriptionListLayout`.
 */
function DescriptionList({
	layout = "rows",
	className,
	...props
}: React.ComponentProps<"dl"> & { layout?: DescriptionListLayout }) {
	return (
		<DescriptionListContext.Provider value={layout}>
			<dl
				data-slot="description-list"
				data-layout={layout}
				className={cn(listClassNames[layout], className)}
				{...props}
			/>
		</DescriptionListContext.Provider>
	);
}

/** One pair: a `DescriptionListTerm` and its `DescriptionListDetails`. */
function DescriptionListItem({
	className,
	...props
}: React.ComponentProps<"div">) {
	const layout = React.useContext(DescriptionListContext);

	return (
		<div
			data-slot="description-list-item"
			className={cn(itemClassNames[layout], className)}
			{...props}
		/>
	);
}

/** The label: medium weight in rows, muted in the compact layouts. */
function DescriptionListTerm({
	className,
	...props
}: React.ComponentProps<"dt">) {
	const layout = React.useContext(DescriptionListContext);

	return (
		<dt
			data-slot="description-list-term"
			className={cn(termClassNames[layout], className)}
			{...props}
		/>
	);
}

/**
 * The value. An empty value shows the same dash as an empty table cell, so a
 * missing field reads as "not set" rather than as a layout gap.
 */
function DescriptionListDetails({
	className,
	children,
	...props
}: React.ComponentProps<"dd">) {
	const layout = React.useContext(DescriptionListContext);
	const empty = children === null || children === undefined || children === "";

	return (
		<dd
			data-slot="description-list-details"
			className={cn("fui:break-words", detailsClassNames[layout], className)}
			{...props}
		>
			{empty ? <EmptyCell /> : children}
		</dd>
	);
}

export {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	type DescriptionListLayout,
	DescriptionListTerm,
};
