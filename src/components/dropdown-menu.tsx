"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			"lib:flex lib:cursor-default lib:select-none lib:items-center lib:gap-2 lib:rounded-sm lib:px-2 lib:py-1.5 lib:text-sm lib:outline-none lib:focus:bg-accent lib:data-[state=open]:bg-accent lib:[&_svg]:pointer-events-none lib:[&_svg]:size-4 lib:[&_svg]:shrink-0",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="lib:ml-auto" />
	</DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
	DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			"lib:z-50 lib:min-w-[8rem] lib:overflow-hidden lib:rounded-md lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-lg lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-dropdown-menu-content-transform-origin]",
			className,
		)}
		{...props}
	/>
));
DropdownMenuSubContent.displayName =
	DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"lib:z-50 lib:max-h-[var(--radix-dropdown-menu-content-available-height)] lib:min-w-[8rem] lib:overflow-y-auto lib:overflow-x-hidden lib:rounded-md lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-md",
				"lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-dropdown-menu-content-transform-origin]",
				className,
			)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:gap-2 lib:rounded-sm lib:px-2 lib:py-1.5 lib:text-sm lib:outline-none lib:transition-colors lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50 lib:[&>svg]:size-4 lib:[&>svg]:shrink-0",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-8 lib:pr-2 lib:text-sm lib:outline-none lib:transition-colors lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="lib:absolute lib:left-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className="lib:h-4 lib:w-4" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
	DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-8 lib:pr-2 lib:text-sm lib:outline-none lib:transition-colors lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="lib:absolute lib:left-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className="lib:h-2 lib:w-2 lib:fill-current" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn(
			"lib:px-2 lib:py-1.5 lib:text-sm lib:font-semibold",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn("lib:-mx-1 lib:my-1 lib:h-px lib:bg-muted", className)}
		{...props}
	/>
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				"lib:ml-auto lib:text-xs lib:tracking-widest lib:opacity-60",
				className,
			)}
			{...props}
		/>
	);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
};
