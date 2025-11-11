import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Separator } from "@/components/separator";
import { cn } from "@/lib/utils";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			role="list"
			data-slot="item-group"
			className={cn("lib:group/item-group lib:flex lib:flex-col", className)}
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
			className={cn("lib:my-0", className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"lib:group/item lib:[a]:hover:bg-accent/50 lib:focus-visible:border-ring lib:focus-visible:ring-ring/50 lib:[a]:transition-colors lib:flex lib:flex-wrap lib:items-center lib:rounded-md lib:border lib:border-transparent lib:text-sm lib:outline-none lib:transition-colors lib:duration-100 lib:focus-visible:ring-[3px]",
	{
		variants: {
			variant: {
				default: "lib:bg-transparent",
				outline: "lib:border-border",
				muted: "lib:bg-muted/50",
			},
			size: {
				default: "lib:gap-4 lib:p-4 lib:",
				sm: "lib:gap-2.5 lib:px-4 lib:py-3",
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
	asChild = false,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof itemVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			data-slot="item"
			data-variant={variant}
			data-size={size}
			className={cn(itemVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

const itemMediaVariants = cva(
	"lib:flex lib:shrink-0 lib:items-center lib:justify-center lib:gap-2 lib:group-has-[[data-slot=item-description]]/item:translate-y-0.5 lib:group-has-[[data-slot=item-description]]/item:self-start lib:[&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "lib:bg-transparent",
				icon: "lib:bg-muted lib:size-8 lib:rounded-sm lib:border lib:[&_svg:not([class*=size-])]:size-4",
				image:
					"lib:size-10 lib:overflow-hidden lib:rounded-sm lib:[&_img]:size-full lib:[&_img]:object-cover",
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
				"lib:flex lib:flex-1 lib:flex-col lib:gap-1 lib:[&+[data-slot=item-content]]:flex-none",
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
				"lib:flex lib:w-fit lib:items-center lib:gap-2 lib:text-sm lib:font-medium lib:leading-snug",
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
				"lib:text-muted-foreground lib:line-clamp-2 lib:text-balance lib:text-sm lib:font-normal lib:leading-normal",
				"lib:[&>a:hover]:text-primary lib:[&>a]:underline lib:[&>a]:underline-offset-4",
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
