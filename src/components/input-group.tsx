import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-group"
			role="group"
			className={cn(
				"lib:group/input-group lib:border-input lib:dark:bg-input/30 lib:shadow-xs lib:relative lib:flex lib:w-full lib:items-center lib:rounded-md lib:border lib:outline-none lib:transition-[color,box-shadow]",
				"lib:h-9 lib:has-[>textarea]:h-auto",

				// Variants based on alignment.
				"lib:has-[>[data-align=inline-start]]:[&>input]:pl-2",
				"lib:has-[>[data-align=inline-end]]:[&>input]:pr-2",
				"lib:has-[>[data-align=block-start]]:h-auto lib:has-[>[data-align=block-start]]:flex-col lib:has-[>[data-align=block-start]]:[&>input]:pb-3",
				"lib:has-[>[data-align=block-end]]:h-auto lib:has-[>[data-align=block-end]]:flex-col lib:has-[>[data-align=block-end]]:[&>input]:pt-3",

				// Focus state.
				"lib:has-[[data-slot=input-group-control]:focus-visible]:ring-ring lib:has-[[data-slot=input-group-control]:focus-visible]:ring-1",

				// Error state.
				"lib:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 lib:has-[[data-slot][aria-invalid=true]]:border-destructive lib:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"lib:text-muted-foreground lib:flex lib:h-auto lib:cursor-text lib:select-none lib:items-center lib:justify-center lib:gap-2 lib:py-1.5 lib:text-sm lib:font-medium lib:group-data-[disabled=true]/input-group:opacity-50 lib:[&>kbd]:rounded-[calc(var(--radius)-5px)] lib:[&>svg:not([class*=size-])]:size-4",
	{
		variants: {
			align: {
				"inline-start":
					"lib:order-first lib:pl-3 lib:has-[>button]:ml-[-0.45rem] lib:has-[>kbd]:ml-[-0.35rem]",
				"inline-end":
					"lib:order-last lib:pr-3 lib:has-[>button]:mr-[-0.4rem] lib:has-[>kbd]:mr-[-0.35rem]",
				"block-start":
					"lib:[.border-b]:pb-3 lib:order-first lib:w-full lib:justify-start lib:px-3 lib:pt-3 lib:group-has-[>input]/input-group:pt-2.5",
				"block-end":
					"lib:[.border-t]:pt-3 lib:order-last lib:w-full lib:justify-start lib:px-3 lib:pb-3 lib:group-has-[>input]/input-group:pb-2.5",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	},
);

function InputGroupAddon({
	className,
	align = "inline-start",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		<div
			role="group"
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={(e) => {
				if ((e.target as HTMLElement).closest("button")) {
					return;
				}
				e.currentTarget.parentElement?.querySelector("input")?.focus();
			}}
			{...props}
		/>
	);
}

const inputGroupButtonVariants = cva(
	"lib:flex lib:items-center lib:gap-2 lib:text-sm lib:shadow-none",
	{
		variants: {
			size: {
				xs: "lib:h-6 lib:gap-1 lib:rounded-[calc(var(--radius)-5px)] lib:px-2 lib:has-[>svg]:px-2 lib:[&>svg:not([class*=size-])]:size-3.5",
				sm: "lib:h-8 lib:gap-1.5 lib:rounded-md lib:px-2.5 lib:has-[>svg]:px-2.5",
				"icon-xs":
					"lib:size-6 lib:rounded-[calc(var(--radius)-5px)] lib:p-0 lib:has-[>svg]:p-0",
				"icon-sm": "lib:size-8 lib:p-0 lib:has-[>svg]:p-0",
			},
		},
		defaultVariants: {
			size: "xs",
		},
	},
);

function InputGroupButton({
	className,
	type = "button",
	variant = "ghost",
	size = "xs",
	...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
	VariantProps<typeof inputGroupButtonVariants>) {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	);
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"lib:text-muted-foreground lib:flex lib:items-center lib:gap-2 lib:text-sm lib:[&_svg:not([class*=size-])]:size-4 lib:[&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupInput({
	className,
	...props
}: React.ComponentProps<"input">) {
	return (
		<Input
			data-slot="input-group-control"
			className={cn(
				"lib:flex-1 lib:rounded-none lib:border-0 lib:bg-transparent lib:shadow-none lib:focus-visible:ring-0 lib:dark:bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupTextarea({
	className,
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<Textarea
			data-slot="input-group-control"
			className={cn(
				"lib:flex-1 lib:resize-none lib:rounded-none lib:border-0 lib:bg-transparent lib:py-3 lib:shadow-none lib:focus-visible:ring-0 lib:dark:bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
};
