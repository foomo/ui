"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		className={cn(
			"lib:fixed lib:inset-0 lib:z-50 lib:bg-black/80 lib: lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
		ref={ref}
	/>
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
	"lib:fixed lib:z-50 lib:gap-4 lib:bg-background lib:p-6 lib:shadow-lg lib:transition lib:ease-in-out lib:data-[state=closed]:duration-300 lib:data-[state=open]:duration-500 lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out",
	{
		variants: {
			side: {
				top: "lib:inset-x-0 lib:top-0 lib:border-b lib:data-[state=closed]:slide-out-to-top lib:data-[state=open]:slide-in-from-top",
				bottom:
					"lib:inset-x-0 lib:bottom-0 lib:border-t lib:data-[state=closed]:slide-out-to-bottom lib:data-[state=open]:slide-in-from-bottom",
				left: "lib:inset-y-0 lib:left-0 lib:h-full lib:w-3/4 lib:border-r lib:data-[state=closed]:slide-out-to-left lib:data-[state=open]:slide-in-from-left lib:sm:max-w-sm",
				right:
					"lib:inset-y-0 lib:right-0 lib:h-full lib:w-3/4 lib:border-l lib:data-[state=closed]:slide-out-to-right lib:data-[state=open]:slide-in-from-right lib:sm:max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	},
);

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
	<SheetPortal>
		<SheetOverlay />
		<SheetPrimitive.Content
			ref={ref}
			className={cn(sheetVariants({ side }), className)}
			{...props}
		>
			<SheetPrimitive.Close className="lib:absolute lib:right-4 lib:top-4 lib:rounded-sm lib:opacity-70 lib:ring-offset-background lib:transition-opacity lib:hover:opacity-100 lib:focus:outline-none lib:focus:ring-2 lib:focus:ring-ring lib:focus:ring-offset-2 lib:disabled:pointer-events-none lib:data-[state=open]:bg-secondary">
				<X className="lib:h-4 lib:w-4" />
				<span className="lib:sr-only">Close</span>
			</SheetPrimitive.Close>
			{children}
		</SheetPrimitive.Content>
	</SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
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
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
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
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title
		ref={ref}
		className={cn(
			"lib:text-lg lib:font-semibold lib:text-foreground",
			className,
		)}
		{...props}
	/>
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description
		ref={ref}
		className={cn("lib:text-sm lib:text-muted-foreground", className)}
		{...props}
	/>
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
