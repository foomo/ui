import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

const alertVariants = cva(
	"fui:group/alert fui:relative fui:grid fui:w-full fui:gap-0.5 fui:rounded-lg fui:border fui:px-4 fui:py-3 fui:text-left fui:text-sm fui:has-data-[slot=alert-action]:relative fui:has-data-[slot=alert-action]:pr-18 fui:has-[>svg]:grid-cols-[auto_1fr] fui:has-[>svg]:gap-x-2.5 fui:*:[svg]:row-span-2 fui:*:[svg]:translate-y-0.5 fui:*:[svg]:text-current fui:*:[svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default: "fui:bg-card fui:text-card-foreground",
				destructive:
					"fui:bg-card fui:text-destructive fui:*:data-[slot=alert-description]:text-destructive/90 fui:*:[svg]:text-current",
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
				"fui:font-medium fui:group-has-[>svg]/alert:col-start-2 fui:[&_a]:underline fui:[&_a]:underline-offset-3 fui:[&_a]:hover:text-foreground",
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
				"fui:text-sm fui:text-balance fui:text-muted-foreground fui:md:text-pretty fui:[&_a]:underline fui:[&_a]:underline-offset-3 fui:[&_a]:hover:text-foreground fui:[&_p:not(:last-child)]:mb-4",
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
			className={cn("fui:absolute fui:top-2.5 fui:right-3", className)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
