"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"lib:flex lib:h-9 lib:w-full lib:items-center lib:justify-between lib:whitespace-nowrap lib:rounded-md lib:border lib:border-input lib:bg-transparent lib:px-3 lib:py-2 lib:text-sm lib:shadow-sm lib:ring-offset-background lib:data-[placeholder]:text-muted-foreground lib:focus:outline-none lib:focus:ring-1 lib:focus:ring-ring lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:[&>span]:line-clamp-1",
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDown className="lib:h-4 lib:w-4 lib:opacity-50" />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={cn(
			"lib:flex lib:cursor-default lib:items-center lib:justify-center lib:py-1",
			className,
		)}
		{...props}
	>
		<ChevronUp className="lib:h-4 lib:w-4" />
	</SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn(
			"lib:flex lib:cursor-default lib:items-center lib:justify-center lib:py-1",
			className,
		)}
		{...props}
	>
		<ChevronDown className="lib:h-4 lib:w-4" />
	</SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				"lib:relative lib:z-50 lib:max-h-[--radix-select-content-available-height] lib:min-w-[8rem] lib:overflow-y-auto lib:overflow-x-hidden lib:rounded-md lib:border lib:bg-popover lib:text-popover-foreground lib:shadow-md lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-select-content-transform-origin]",
				position === "popper" &&
					"lib:data-[side=bottom]:translate-y-1 lib:data-[side=left]:-translate-x-1 lib:data-[side=right]:translate-x-1 lib:data-[side=top]:-translate-y-1",
				className,
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={cn(
					"lib:p-1",
					position === "popper" &&
						"lib:h-[var(--radix-select-trigger-height)] lib:w-full lib:min-w-[var(--radix-select-trigger-width)]",
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn(
			"lib:px-2 lib:py-1.5 lib:text-sm lib:font-semibold",
			className,
		)}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:w-full lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-2 lib:pr-8 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="lib:absolute lib:right-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<SelectPrimitive.ItemIndicator>
				<Check className="lib:h-4 lib:w-4" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("lib:-mx-1 lib:my-1 lib:h-px lib:bg-muted", className)}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
