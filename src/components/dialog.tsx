"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"lib:fixed lib:inset-0 lib:z-50 lib:bg-black/80 lib: lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(
				"lib:fixed lib:left-[50%] lib:top-[50%] lib:z-50 lib:grid lib:w-full lib:max-w-lg lib:translate-x-[-50%] lib:translate-y-[-50%] lib:gap-4 lib:border lib:bg-background lib:p-6 lib:shadow-lg lib:duration-200 lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[state=closed]:slide-out-to-left-1/2 lib:data-[state=closed]:slide-out-to-top-[48%] lib:data-[state=open]:slide-in-from-left-1/2 lib:data-[state=open]:slide-in-from-top-[48%] lib:sm:rounded-lg",
				className,
			)}
			{...props}
		>
			{children}
			<DialogPrimitive.Close className="lib:absolute lib:right-4 lib:top-4 lib:rounded-sm lib:opacity-70 lib:ring-offset-background lib:transition-opacity lib:hover:opacity-100 lib:focus:outline-none lib:focus:ring-2 lib:focus:ring-ring lib:focus:ring-offset-2 lib:disabled:pointer-events-none lib:data-[state=open]:bg-accent lib:data-[state=open]:text-muted-foreground">
				<X className="lib:h-4 lib:w-4" />
				<span className="lib:sr-only">Close</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"lib:flex lib:flex-col lib:space-y-1.5 lib:text-center lib:sm:text-left",
			className,
		)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"lib:flex lib:flex-col-reverse lib:sm:flex-row lib:sm:justify-end lib:sm:space-x-2",
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			"lib:text-lg lib:font-semibold lib:leading-none lib:tracking-tight",
			className,
		)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("lib:text-sm lib:text-muted-foreground", className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
