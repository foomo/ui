import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";
import { buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={cn(
			"lib:fixed lib:inset-0 lib:z-50 lib:bg-black/80 lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
		ref={ref}
	/>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content
			ref={ref}
			className={cn(
				"lib:fixed lib:left-[50%] lib:top-[50%] lib:z-50 lib:grid lib:w-full lib:max-w-lg lib:translate-x-[-50%] lib:translate-y-[-50%] lib:gap-4 lib:border lib:bg-background lib:p-6 lib:shadow-lg lib:duration-200 lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[state=closed]:slide-out-to-left-1/2 lib:data-[state=closed]:slide-out-to-top-[48%] lib:data-[state=open]:slide-in-from-left-1/2 lib:data-[state=open]:slide-in-from-top-[48%] lib:sm:rounded-lg",
				className,
			)}
			{...props}
		/>
	</AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"lib:flex lib:flex-col lib:space-y-2 lib:text-center lib:sm:text-left",
			className,
		)}
		{...props}
	/>
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
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
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		ref={ref}
		className={cn("lib:text-lg lib:font-semibold", className)}
		{...props}
	/>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		className={cn("lib:text-sm lib:text-muted-foreground", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName =
	AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Action
		ref={ref}
		className={cn(buttonVariants(), className)}
		{...props}
	/>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel
		ref={ref}
		className={cn(
			buttonVariants({ variant: "outline" }),
			"lib:mt-2 lib:sm:mt-0",
			className,
		)}
		{...props}
	/>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
};
