import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

import { Separator } from "@/components/separator";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			role="list"
			data-slot="item-group"
			className={cn(
				"lib:group/item-group lib:flex lib:w-full lib:flex-col lib:gap-4 lib:has-data-[size=sm]:gap-2.5 lib:has-data-[size=xs]:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function ItemSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="item-separator"
			orientation="horizontal"
			className={cn("lib:my-2", className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"lib:group/item lib:flex lib:w-full lib:flex-wrap lib:items-center lib:rounded-2xl lib:border lib:text-sm lib:transition-colors lib:duration-100 lib:outline-none lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:[a]:transition-colors lib:[a]:hover:bg-muted",
	{
		variants: {
			variant: {
				default: "lib:border-transparent",
				outline: "lib:border-border",
				muted: "lib:border-transparent lib:bg-muted/50",
			},
			size: {
				default: "lib:gap-3.5 lib:px-4 lib:py-3.5",
				sm: "lib:gap-3.5 lib:px-3.5 lib:py-3",
				xs: "lib:gap-2.5 lib:px-3 lib:py-2.5 lib:in-data-[slot=dropdown-menu-content]:p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Item({
	className,
	variant = "default",
	size = "default",
	render,
	...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(itemVariants({ variant, size, className })),
			},
			props,
		),
		render,
		state: {
			slot: "item",
			variant,
			size,
		},
	});
}

const itemMediaVariants = cva(
	"lib:flex lib:shrink-0 lib:items-center lib:justify-center lib:gap-2 lib:group-has-data-[slot=item-description]/item:translate-y-0.5 lib:group-has-data-[slot=item-description]/item:self-start lib:[&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "lib:bg-transparent",
				icon: "lib:[&_svg:not([class*=size-])]:size-4",
				image:
					"lib:size-10 lib:overflow-hidden lib:rounded-lg lib:group-data-[size=sm]/item:size-8 lib:group-data-[size=xs]/item:size-6 lib:group-data-[size=xs]/item:rounded-md lib:[&_img]:size-full lib:[&_img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function ItemMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
	return (
		<div
			data-slot="item-media"
			data-variant={variant}
			className={cn(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-content"
			className={cn(
				"lib:flex lib:flex-1 lib:flex-col lib:gap-1 lib:group-data-[size=xs]/item:gap-0.5 lib:[&+[data-slot=item-content]]:flex-none",
				className,
			)}
			{...props}
		/>
	);
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-title"
			className={cn(
				"lib:line-clamp-1 lib:flex lib:w-fit lib:items-center lib:gap-2 lib:text-sm lib:leading-snug lib:font-medium lib:underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="item-description"
			className={cn(
				"lib:line-clamp-2 lib:text-left lib:text-sm lib:font-normal lib:text-muted-foreground lib:[&>a]:underline lib:[&>a]:underline-offset-4 lib:[&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-actions"
			className={cn("lib:flex lib:items-center lib:gap-2", className)}
			{...props}
		/>
	);
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-header"
			className={cn(
				"lib:flex lib:basis-full lib:items-center lib:justify-between lib:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-footer"
			className={cn(
				"lib:flex lib:basis-full lib:items-center lib:justify-between lib:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Item,
	ItemMedia,
	ItemContent,
	ItemActions,
	ItemGroup,
	ItemSeparator,
	ItemTitle,
	ItemDescription,
	ItemHeader,
	ItemFooter,
};
