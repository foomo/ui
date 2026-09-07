import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

const alertVariants = cva(
	"lib:group/alert lib:relative lib:grid lib:w-full lib:gap-0.5 lib:rounded-lg lib:border lib:px-4 lib:py-3 lib:text-left lib:text-sm lib:has-data-[slot=alert-action]:relative lib:has-data-[slot=alert-action]:pr-18 lib:has-[>svg]:grid-cols-[auto_1fr] lib:has-[>svg]:gap-x-2.5 lib:*:[svg]:row-span-2 lib:*:[svg]:translate-y-0.5 lib:*:[svg]:text-current lib:*:[svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default: "lib:bg-card lib:text-card-foreground",
				destructive:
					"lib:bg-card lib:text-destructive lib:*:data-[slot=alert-description]:text-destructive/90 lib:*:[svg]:text-current",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"lib:font-medium lib:group-has-[>svg]/alert:col-start-2 lib:[&_a]:underline lib:[&_a]:underline-offset-3 lib:[&_a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"lib:text-sm lib:text-balance lib:text-muted-foreground lib:md:text-pretty lib:[&_a]:underline lib:[&_a]:underline-offset-3 lib:[&_a]:hover:text-foreground lib:[&_p:not(:last-child)]:mb-4",
				className,
			)}
			{...props}
		/>
	);
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-action"
			className={cn("lib:absolute lib:top-2.5 lib:right-3", className)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
