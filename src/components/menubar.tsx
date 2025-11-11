import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function MenubarMenu({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
	return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Root
		ref={ref}
		className={cn(
			"lib:flex lib:h-9 lib:items-center lib:space-x-1 lib:rounded-md lib:border lib:bg-background lib:p-1 lib:shadow-sm",
			className,
		)}
		{...props}
	/>
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Trigger
		ref={ref}
		className={cn(
			"lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:px-3 lib:py-1 lib:text-sm lib:font-medium lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[state=open]:bg-accent lib:data-[state=open]:text-accent-foreground",
			className,
		)}
		{...props}
	/>
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<MenubarPrimitive.SubTrigger
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
	</MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.SubContent
		ref={ref}
		className={cn(
			"lib:z-50 lib:min-w-[8rem] lib:overflow-hidden lib:rounded-md lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-lg lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-menubar-content-transform-origin]",
			className,
		)}
		{...props}
	/>
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
	(
		{ className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
		ref,
	) => (
		<MenubarPrimitive.Portal>
			<MenubarPrimitive.Content
				ref={ref}
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"lib:z-50 lib:min-w-[12rem] lib:overflow-hidden lib:rounded-md lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-md lib:data-[state=open]:animate-in lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-menubar-content-transform-origin]",
					className,
				)}
				{...props}
			/>
		</MenubarPrimitive.Portal>
	),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Item
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:px-2 lib:py-1.5 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	/>
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<MenubarPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-8 lib:pr-2 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="lib:absolute lib:left-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<MenubarPrimitive.ItemIndicator>
				<Check className="lib:h-4 lib:w-4" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<MenubarPrimitive.RadioItem
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:select-none lib:items-center lib:rounded-sm lib:py-1.5 lib:pl-8 lib:pr-2 lib:text-sm lib:outline-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-[disabled]:pointer-events-none lib:data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="lib:absolute lib:left-2 lib:flex lib:h-3.5 lib:w-3.5 lib:items-center lib:justify-center">
			<MenubarPrimitive.ItemIndicator>
				<Circle className="lib:h-4 lib:w-4 lib:fill-current" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Label
		ref={ref}
		className={cn(
			"lib:px-2 lib:py-1.5 lib:text-sm lib:font-semibold",
			inset && "lib:pl-8",
			className,
		)}
		{...props}
	/>
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Separator
		ref={ref}
		className={cn("lib:-mx-1 lib:my-1 lib:h-px lib:bg-muted", className)}
		{...props}
	/>
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
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
MenubarShortcut.displayname = "MenubarShortcut";

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
	MenubarLabel,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarPortal,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarGroup,
	MenubarSub,
	MenubarShortcut,
};
