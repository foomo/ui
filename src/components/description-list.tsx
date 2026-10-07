import { cn } from "cn";
import type * as React from "react";

import { EmptyCell } from "@/components/table-cells";

/**
 * Label and value pairs in rows, for the details of one record (ID, SKU,
 * supplier, valid from). Renders a `<dl>`, so a screen reader announces each
 * value with its label.
 *
 * Rows stack the label above the value on narrow screens and sit side by side
 * from `sm` up, with the label column at least 8rem wide.
 */
function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
	return (
		<dl
			data-slot="description-list"
			className={cn("fui:divide-y fui:text-sm", className)}
			{...props}
		/>
	);
}

/** One row: a `DescriptionListTerm` and its `DescriptionListDetails`. */
function DescriptionListItem({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="description-list-item"
			className={cn(
				"fui:grid fui:items-center fui:gap-1 fui:px-3 fui:py-3 fui:sm:grid-cols-[minmax(8rem,1fr)_2fr] fui:sm:gap-4",
				className,
			)}
			{...props}
		/>
	);
}

/** The label, in medium weight so it stands apart from the regular value. */
function DescriptionListTerm({
	className,
	...props
}: React.ComponentProps<"dt">) {
	return (
		<dt
			data-slot="description-list-term"
			className={cn("fui:font-medium", className)}
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
	const empty = children === null || children === undefined || children === "";

	return (
		<dd
			data-slot="description-list-details"
			className={cn("fui:break-words", className)}
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
	DescriptionListTerm,
};
