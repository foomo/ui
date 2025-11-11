import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<ContextMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			"lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:px-2 lib:py-1.5 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[state=open]:bg-accent lib:data-[state=open]:text-accent-foreground",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="lib:ml-auto lib:h-4 lib:w-4" />
	</ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			"lib:z-50 lib:min-w-[8rem] lib:overflow-hidden lib:rounded-md lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-lg lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-context-menu-content-transform-origin]",
			className,
		)}
		{...props}
	/>
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.Portal>
		<ContextMenuPrimitive.Content
			ref={ref}
			className={cn(
				"lib:z-50 lib:max-h-[--radix-context-menu-content-available-height] lib:min-w-[8rem] lib:overflow-y-auto lib:overflow-x-hidden lib:rounded-md lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-md lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-context-menu-content-transform-origin]",
				className,
			)}
			{...props}
		/>
	</ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<ContextMenuPrimitive.Item
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:px-2 lib:py-1.5 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	/>
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<ContextMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-8 lib:pr-2 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="lib:absolute lib:left-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<ContextMenuPrimitive.ItemIndicator>
				<Check className="lib:h-4 lib:w-4" />
			</ContextMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
	ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<ContextMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-8 lib:pr-2 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="lib:absolute lib:left-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<ContextMenuPrimitive.ItemIndicator>
				<Circle className="lib:h-4 lib:w-4 lib:fill-current" />
			</ContextMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<ContextMenuPrimitive.Label
		ref={ref}
		className={cn(
			"lib:px-2 lib:py-1.5 lib:text-sm lib:font-semibold lib:text-foreground",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	/>
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
	React.ElementRef<typeof ContextMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<ContextMenuPrimitive.Separator
		ref={ref}
		className={cn("lib:-mx-1 lib:my-1 lib:h-px lib:bg-border", className)}
		{...props}
	/>
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				"lib:ml-auto lib:text-xs lib:tracking-widest lib:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuGroup,
	ContextMenuPortal,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuRadioGroup,
};
