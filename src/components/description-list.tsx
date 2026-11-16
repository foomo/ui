import { cn } from "cn";
import * as React from "react";

import { EmptyCell } from "@/components/table-cells";

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

/** Empty content renders the empty table cell's dash. */
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
