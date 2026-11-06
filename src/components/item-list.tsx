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

/**
 * How an `ItemList` sets its entries apart:
 *
 * - `divided`: compact entries split by a line, with no frame. For a feed read
 *   top to bottom, such as recent changes.
 * - `outline`: each entry in its own frame, spaced apart. For a short list of
 *   things to act on, each with a switch or a button.
 */
type ItemListVariant = "divided" | "outline";

const ItemListContext = React.createContext<ItemListVariant>("divided");

/**
 * A list of entries, each a title with an optional description, an optional
 * avatar or icon in front and an optional slot at the end. Compose an
 * `ItemListEntry` per entry. Built on the `Item` parts; reach for those
 * directly for a layout this does not cover.
 *
 * Renders a `<ul>` with an `<li>` per entry, so a screen reader announces the
 * list and how many entries it holds.
 */
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

/**
 * One entry.
 *
 * - `media`: an avatar, an icon or an image in front. `mediaVariant="icon"`
 *   sizes an icon, `"image"` crops an image to a square.
 * - `title`, `description`: the entry's name and one or two lines about it.
 * - `end`: what sits at the end of the row, such as a value and a time, a
 *   switch or a button.
 *
 * In a `divided` list the line between entries is a bottom border rather than
 * a separator element, so the list holds list items only.
 */
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
