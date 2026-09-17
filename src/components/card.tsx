import { cn } from "cn";
import type * as React from "react";

function Card({
	className,
	size = "default",
	...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				"fui:group/card fui:flex fui:flex-col fui:gap-(--card-spacing) fui:overflow-hidden fui:rounded-2xl fui:bg-card fui:py-(--card-spacing) fui:text-sm fui:text-card-foreground fui:ring-1 fui:ring-foreground/10 fui:[--card-spacing:--spacing(6)] fui:has-[>img:first-child]:pt-0 fui:data-[size=sm]:[--card-spacing:--spacing(4)] fui:*:[img:first-child]:rounded-t-xl fui:*:[img:last-child]:rounded-b-xl",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"fui:group/card-header fui:@container/card-header fui:grid fui:auto-rows-min fui:items-start fui:gap-2 fui:rounded-t-xl fui:px-(--card-spacing) fui:has-data-[slot=card-action]:grid-cols-[1fr_auto] fui:has-data-[slot=card-description]:grid-rows-[auto_auto] fui:[.border-b]:pb-(--card-spacing)",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"fui:font-heading fui:text-base fui:font-medium",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("fui:text-sm fui:text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"fui:col-start-2 fui:row-span-2 fui:row-start-1 fui:self-start fui:justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("fui:px-(--card-spacing)", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"fui:flex fui:items-center fui:rounded-b-xl fui:px-(--card-spacing) fui:[.border-t]:pt-(--card-spacing)",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
