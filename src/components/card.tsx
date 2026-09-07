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
				"lib:group/card lib:flex lib:flex-col lib:gap-(--card-spacing) lib:overflow-hidden lib:rounded-2xl lib:bg-card lib:py-(--card-spacing) lib:text-sm lib:text-card-foreground lib:ring-1 lib:ring-foreground/10 lib:[--card-spacing:--spacing(6)] lib:has-[>img:first-child]:pt-0 lib:data-[size=sm]:[--card-spacing:--spacing(4)] lib:*:[img:first-child]:rounded-t-xl lib:*:[img:last-child]:rounded-b-xl",
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
				"lib:group/card-header lib:@container/card-header lib:grid lib:auto-rows-min lib:items-start lib:gap-2 lib:rounded-t-xl lib:px-(--card-spacing) lib:has-data-[slot=card-action]:grid-cols-[1fr_auto] lib:has-data-[slot=card-description]:grid-rows-[auto_auto] lib:[.border-b]:pb-(--card-spacing)",
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
				"lib:font-heading lib:text-base lib:font-medium",
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
			className={cn("lib:text-sm lib:text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"lib:col-start-2 lib:row-span-2 lib:row-start-1 lib:self-start lib:justify-self-end",
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
			className={cn("lib:px-(--card-spacing)", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"lib:flex lib:items-center lib:rounded-b-xl lib:px-(--card-spacing) lib:[.border-t]:pt-(--card-spacing)",
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
