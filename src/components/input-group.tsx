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
				"fui:group/input-group fui:relative fui:flex fui:h-9 fui:w-full fui:min-w-0 fui:items-center fui:rounded-4xl fui:border fui:border-input fui:bg-background fui:dark:bg-input/30 fui:transition-colors fui:outline-none fui:in-data-[slot=combobox-content]:focus-within:border-inherit fui:in-data-[slot=combobox-content]:focus-within:ring-0 fui:has-data-[align=block-end]:rounded-2xl fui:has-data-[align=block-start]:rounded-2xl fui:has-[[data-slot=input-group-control]:focus-visible]:border-ring fui:has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] fui:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 fui:has-[[data-slot][aria-invalid=true]]:border-destructive fui:has-[[data-slot][aria-invalid=true]]:ring-[3px] fui:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 fui:has-[textarea]:rounded-xl fui:has-[>[data-align=block-end]]:h-auto fui:has-[>[data-align=block-end]]:flex-col fui:has-[>[data-align=block-start]]:h-auto fui:has-[>[data-align=block-start]]:flex-col fui:has-[>textarea]:h-auto fui:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 fui:has-[>[data-align=block-end]]:[&>input]:pt-3 fui:has-[>[data-align=block-start]]:[&>input]:pb-3 fui:has-[>[data-align=inline-end]]:[&>input]:pr-1.5 fui:has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"fui:flex fui:h-auto fui:cursor-text fui:items-center fui:justify-center fui:gap-2 fui:py-2 fui:text-sm fui:font-medium fui:text-muted-foreground fui:select-none fui:group-data-[disabled=true]/input-group:opacity-50 fui:**:data-[slot=kbd]:rounded-4xl fui:**:data-[slot=kbd]:bg-muted-foreground/10 fui:**:data-[slot=kbd]:px-1.5 fui:[&>svg:not([class*=size-])]:size-4",
	{
		variants: {
			align: {
				"inline-start":
					"fui:order-first fui:pl-3 fui:has-[>button]:-ml-1 fui:has-[>kbd]:ml-[-0.15rem]",
				"inline-end":
					"fui:order-last fui:pr-3 fui:has-[>button]:-mr-1 fui:has-[>kbd]:mr-[-0.15rem]",
				"block-start":
					"fui:order-first fui:w-full fui:justify-start fui:px-3 fui:pt-3 fui:group-has-[>input]/input-group:pt-3 fui:[.border-b]:pb-3",
				"block-end":
					"fui:order-last fui:w-full fui:justify-start fui:px-3 fui:pb-3 fui:group-has-[>input]/input-group:pb-3 fui:[.border-t]:pt-3",
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
	"fui:flex fui:items-center fui:gap-2 fui:rounded-4xl fui:text-sm fui:shadow-none",
	{
		variants: {
			size: {
				xs: "fui:h-6 fui:gap-1 fui:px-1.5 fui:[&>svg:not([class*=size-])]:size-3.5",
				sm: "fui:",
				"icon-xs": "fui:size-6 fui:p-0 fui:has-[>svg]:p-0",
				"icon-sm": "fui:size-8 fui:p-0 fui:has-[>svg]:p-0",
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
				"fui:flex fui:items-center fui:gap-2 fui:text-sm fui:text-muted-foreground fui:[&_svg]:pointer-events-none fui:[&_svg:not([class*=size-])]:size-4",
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
				"fui:flex-1 fui:rounded-none fui:border-0 fui:bg-transparent fui:shadow-none fui:ring-0 fui:focus-visible:ring-0 fui:aria-invalid:ring-0 fui:dark:bg-transparent",
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
				"fui:flex-1 fui:resize-none fui:rounded-none fui:border-0 fui:bg-transparent fui:py-2 fui:shadow-none fui:ring-0 fui:focus-visible:ring-0 fui:aria-invalid:ring-0 fui:dark:bg-transparent",
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
