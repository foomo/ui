import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/button";

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

function AlertDialogOverlay({
	className,
	...props
}: AlertDialogPrimitive.Backdrop.Props) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			className={cn(
				"fui:fixed fui:inset-0 fui:isolate fui:z-50 fui:bg-black/80 fui:duration-100 fui:supports-backdrop-filter:backdrop-blur-xs fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-closed:animate-out fui:data-closed:fade-out-0",
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
}: AlertDialogPrimitive.Popup.Props & {
	size?: "default" | "sm";
}) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Popup
				data-slot="alert-dialog-content"
				data-size={size}
				className={cn(
					"fui:group/alert-dialog-content fui:fixed fui:top-1/2 fui:left-1/2 fui:z-50 fui:grid fui:w-full fui:-translate-x-1/2 fui:-translate-y-1/2 fui:gap-6 fui:rounded-4xl fui:bg-popover fui:p-6 fui:text-popover-foreground fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:outline-none fui:data-[size=default]:max-w-xs fui:data-[size=sm]:max-w-xs fui:data-[size=default]:sm:max-w-md fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95",
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
				"fui:grid fui:grid-rows-[auto_1fr] fui:place-items-center fui:gap-1.5 fui:text-center fui:has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] fui:has-data-[slot=alert-dialog-media]:gap-x-6 fui:sm:group-data-[size=default]/alert-dialog-content:place-items-start fui:sm:group-data-[size=default]/alert-dialog-content:text-left fui:sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
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
				"fui:flex fui:flex-col-reverse fui:gap-2 fui:group-data-[size=sm]/alert-dialog-content:grid fui:group-data-[size=sm]/alert-dialog-content:grid-cols-2 fui:sm:flex-row fui:sm:justify-end",
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
				"fui:mb-2 fui:inline-flex fui:size-16 fui:items-center fui:justify-center fui:rounded-full fui:bg-muted fui:sm:group-data-[size=default]/alert-dialog-content:row-span-2 fui:*:[svg:not([class*=size-])]:size-8",
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
				"fui:font-heading fui:text-lg fui:font-medium fui:sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
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
				"fui:text-sm fui:text-balance fui:text-muted-foreground fui:md:text-pretty fui:*:[a]:underline fui:*:[a]:underline-offset-3 fui:*:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	return (
		<Button
			data-slot="alert-dialog-action"
			className={cn(className)}
			{...props}
		/>
	);
}

function AlertDialogCancel({
	className,
	variant = "outline",
	size = "default",
	...props
}: AlertDialogPrimitive.Close.Props &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-cancel"
			className={cn(className)}
			render={<Button variant={variant} size={size} />}
			{...props}
		/>
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
