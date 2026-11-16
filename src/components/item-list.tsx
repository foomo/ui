import { cn } from "cn";
import * as React from "react";

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/item";

type ItemListVariant = "divided" | "outline";

const ItemListContext = React.createContext<ItemListVariant>("divided");

function ItemList({
	variant = "divided",
	className,
	...props
}: React.ComponentProps<"ul"> & { variant?: ItemListVariant }) {
	return (
		<ItemListContext.Provider value={variant}>
			<ul
				data-slot="item-list"
				data-variant={variant}
				className={cn(
					"fui:flex fui:w-full fui:flex-col",
					variant === "outline" && "fui:gap-2",
					className,
				)}
				{...props}
			/>
		</ItemListContext.Provider>
	);
}

function ItemListEntry({
	media,
	mediaVariant = "default",
	title,
	description,
	end,
	className,
}: {
	media?: React.ReactNode;
	mediaVariant?: React.ComponentProps<typeof ItemMedia>["variant"];
	title: React.ReactNode;
	description?: React.ReactNode;
	end?: React.ReactNode;
	className?: string;
}) {
	const variant = React.useContext(ItemListContext);

	return (
		<Item
			render={<li />}
			data-slot="item-list-entry"
			variant={variant === "outline" ? "outline" : "default"}
			size={variant === "divided" ? "sm" : "default"}
			// A border, not a separator element, so the `<ul>` holds only `<li>`s.
			className={cn(
				variant === "divided" &&
					"fui:rounded-none fui:border-x-0 fui:border-t-0 fui:border-b-border fui:px-0 fui:last:border-b-transparent",
				className,
			)}
		>
			{media ? <ItemMedia variant={mediaVariant}>{media}</ItemMedia> : null}
			<ItemContent>
				<ItemTitle>{title}</ItemTitle>
				{description ? <ItemDescription>{description}</ItemDescription> : null}
			</ItemContent>
			{end ? <ItemActions>{end}</ItemActions> : null}
		</Item>
	);
}

export { ItemList, ItemListEntry, type ItemListVariant };
