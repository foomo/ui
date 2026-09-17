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
				"fui:group/item-group fui:flex fui:w-full fui:flex-col fui:gap-4 fui:has-data-[size=sm]:gap-2.5 fui:has-data-[size=xs]:gap-2",
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
			className={cn("fui:my-2", className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"fui:group/item fui:flex fui:w-full fui:flex-wrap fui:items-center fui:rounded-2xl fui:border fui:text-sm fui:transition-colors fui:duration-100 fui:outline-none fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:[a]:transition-colors fui:[a]:hover:bg-muted",
	{
		variants: {
			variant: {
				default: "fui:border-transparent",
				outline: "fui:border-border",
				muted: "fui:border-transparent fui:bg-muted/50",
			},
			size: {
				default: "fui:gap-3.5 fui:px-4 fui:py-3.5",
				sm: "fui:gap-3.5 fui:px-3.5 fui:py-3",
				xs: "fui:gap-2.5 fui:px-3 fui:py-2.5 fui:in-data-[slot=dropdown-menu-content]:p-0",
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
	"fui:flex fui:shrink-0 fui:items-center fui:justify-center fui:gap-2 fui:group-has-data-[slot=item-description]/item:translate-y-0.5 fui:group-has-data-[slot=item-description]/item:self-start fui:[&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "fui:bg-transparent",
				icon: "fui:[&_svg:not([class*=size-])]:size-4",
				image:
					"fui:size-10 fui:overflow-hidden fui:rounded-lg fui:group-data-[size=sm]/item:size-8 fui:group-data-[size=xs]/item:size-6 fui:group-data-[size=xs]/item:rounded-md fui:[&_img]:size-full fui:[&_img]:object-cover",
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
				"fui:flex fui:flex-1 fui:flex-col fui:gap-1 fui:group-data-[size=xs]/item:gap-0.5 fui:[&+[data-slot=item-content]]:flex-none",
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
				"fui:line-clamp-1 fui:flex fui:w-fit fui:items-center fui:gap-2 fui:text-sm fui:leading-snug fui:font-medium fui:underline-offset-4",
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
				"fui:line-clamp-2 fui:text-left fui:text-sm fui:font-normal fui:text-muted-foreground fui:[&>a]:underline fui:[&>a]:underline-offset-4 fui:[&>a:hover]:text-primary",
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
			className={cn("fui:flex fui:items-center fui:gap-2", className)}
			{...props}
		/>
	);
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-header"
			className={cn(
				"fui:flex fui:basis-full fui:items-center fui:justify-between fui:gap-2",
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
				"fui:flex fui:basis-full fui:items-center fui:justify-between fui:gap-2",
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
