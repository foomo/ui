"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-group"
			role="group"
			className={cn(
				"lib:group/input-group lib:relative lib:flex lib:h-9 lib:w-full lib:min-w-0 lib:items-center lib:rounded-4xl lib:border lib:border-input lib:bg-input/30 lib:transition-colors lib:outline-none lib:in-data-[slot=combobox-content]:focus-within:border-inherit lib:in-data-[slot=combobox-content]:focus-within:ring-0 lib:has-data-[align=block-end]:rounded-2xl lib:has-data-[align=block-start]:rounded-2xl lib:has-[[data-slot=input-group-control]:focus-visible]:border-ring lib:has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] lib:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 lib:has-[[data-slot][aria-invalid=true]]:border-destructive lib:has-[[data-slot][aria-invalid=true]]:ring-[3px] lib:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 lib:has-[textarea]:rounded-xl lib:has-[>[data-align=block-end]]:h-auto lib:has-[>[data-align=block-end]]:flex-col lib:has-[>[data-align=block-start]]:h-auto lib:has-[>[data-align=block-start]]:flex-col lib:has-[>textarea]:h-auto lib:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 lib:has-[>[data-align=block-end]]:[&>input]:pt-3 lib:has-[>[data-align=block-start]]:[&>input]:pb-3 lib:has-[>[data-align=inline-end]]:[&>input]:pr-1.5 lib:has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"lib:flex lib:h-auto lib:cursor-text lib:items-center lib:justify-center lib:gap-2 lib:py-2 lib:text-sm lib:font-medium lib:text-muted-foreground lib:select-none lib:group-data-[disabled=true]/input-group:opacity-50 lib:**:data-[slot=kbd]:rounded-4xl lib:**:data-[slot=kbd]:bg-muted-foreground/10 lib:**:data-[slot=kbd]:px-1.5 lib:[&>svg:not([class*=size-])]:size-4",
	{
		variants: {
			align: {
				"inline-start":
					"lib:order-first lib:pl-3 lib:has-[>button]:-ml-1 lib:has-[>kbd]:ml-[-0.15rem]",
				"inline-end":
					"lib:order-last lib:pr-3 lib:has-[>button]:-mr-1 lib:has-[>kbd]:mr-[-0.15rem]",
				"block-start":
					"lib:order-first lib:w-full lib:justify-start lib:px-3 lib:pt-3 lib:group-has-[>input]/input-group:pt-3 lib:[.border-b]:pb-3",
				"block-end":
					"lib:order-last lib:w-full lib:justify-start lib:px-3 lib:pb-3 lib:group-has-[>input]/input-group:pb-3 lib:[.border-t]:pt-3",
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
	"lib:flex lib:items-center lib:gap-2 lib:rounded-4xl lib:text-sm lib:shadow-none",
	{
		variants: {
			size: {
				xs: "lib:h-6 lib:gap-1 lib:px-1.5 lib:[&>svg:not([class*=size-])]:size-3.5",
				sm: "lib:",
				"icon-xs": "lib:size-6 lib:p-0 lib:has-[>svg]:p-0",
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
				"lib:flex lib:items-center lib:gap-2 lib:text-sm lib:text-muted-foreground lib:[&_svg]:pointer-events-none lib:[&_svg:not([class*=size-])]:size-4",
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
				"lib:flex-1 lib:rounded-none lib:border-0 lib:bg-transparent lib:shadow-none lib:ring-0 lib:focus-visible:ring-0 lib:aria-invalid:ring-0 lib:dark:bg-transparent",
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
				"lib:flex-1 lib:resize-none lib:rounded-none lib:border-0 lib:bg-transparent lib:py-2 lib:shadow-none lib:ring-0 lib:focus-visible:ring-0 lib:aria-invalid:ring-0 lib:dark:bg-transparent",
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
