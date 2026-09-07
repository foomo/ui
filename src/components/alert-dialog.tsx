"use client";

import { cn } from "cn";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import type * as React from "react";

import { Button } from "@/components/button";

function AlertDialog({
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

function AlertDialogPortal({
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

function AlertDialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
	return (
		<AlertDialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={cn(
				"lib:fixed lib:inset-0 lib:z-50 lib:bg-black/80 lib:duration-100 lib:supports-backdrop-filter:backdrop-blur-xs lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-closed:animate-out lib:data-closed:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogContent({
	className,
	size = "default",
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
	size?: "default" | "sm";
}) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				data-size={size}
				className={cn(
					"lib:group/alert-dialog-content lib:fixed lib:top-1/2 lib:left-1/2 lib:z-50 lib:grid lib:w-full lib:-translate-x-1/2 lib:-translate-y-1/2 lib:gap-6 lib:rounded-4xl lib:bg-popover lib:p-6 lib:text-popover-foreground lib:ring-1 lib:ring-foreground/5 lib:duration-100 lib:outline-none lib:data-[size=default]:max-w-xs lib:data-[size=sm]:max-w-xs lib:data-[size=default]:sm:max-w-md lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95",
					className,
				)}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn(
				"lib:grid lib:grid-rows-[auto_1fr] lib:place-items-center lib:gap-1.5 lib:text-center lib:has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] lib:has-data-[slot=alert-dialog-media]:gap-x-6 lib:sm:group-data-[size=default]/alert-dialog-content:place-items-start lib:sm:group-data-[size=default]/alert-dialog-content:text-left lib:sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"lib:flex lib:flex-col-reverse lib:gap-2 lib:group-data-[size=sm]/alert-dialog-content:grid lib:group-data-[size=sm]/alert-dialog-content:grid-cols-2 lib:sm:flex-row lib:sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-media"
			className={cn(
				"lib:mb-2 lib:inline-flex lib:size-16 lib:items-center lib:justify-center lib:rounded-full lib:bg-muted lib:sm:group-data-[size=default]/alert-dialog-content:row-span-2 lib:*:[svg:not([class*=size-])]:size-8",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn(
				"lib:font-heading lib:text-lg lib:font-medium lib:sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn(
				"lib:text-sm lib:text-balance lib:text-muted-foreground lib:md:text-pretty lib:*:[a]:underline lib:*:[a]:underline-offset-3 lib:*:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	className,
	variant = "default",
	size = "default",
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<Button variant={variant} size={size} asChild>
			<AlertDialogPrimitive.Action
				data-slot="alert-dialog-action"
				className={cn(className)}
				{...props}
			/>
		</Button>
	);
}

function AlertDialogCancel({
	className,
	variant = "outline",
	size = "default",
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<Button variant={variant} size={size} asChild>
			<AlertDialogPrimitive.Cancel
				data-slot="alert-dialog-cancel"
				className={cn(className)}
				{...props}
			/>
		</Button>
	);
}

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
