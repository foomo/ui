"use client";

import { cn } from "cn";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { Menubar as MenubarPrimitive } from "radix-ui";
import type * as React from "react";

function Menubar({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cn(
				"lib:flex lib:h-9 lib:items-center lib:rounded-4xl lib:border lib:p-1",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
	return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return (
		<MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
	);
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
	return (
		<MenubarPrimitive.Trigger
			data-slot="menubar-trigger"
			className={cn(
				"lib:flex lib:items-center lib:rounded-xl lib:px-2 lib:py-0.75 lib:text-sm lib:font-medium lib:outline-hidden lib:select-none lib:hover:bg-muted lib:aria-expanded:bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
	return (
		<MenubarPortal>
			<MenubarPrimitive.Content
				data-slot="menubar-content"
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"lib:z-50 lib:min-w-48 lib:origin-(--radix-menubar-content-transform-origin) lib:overflow-hidden lib:rounded-2xl lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:duration-100 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:animate-none! lib:relative lib:bg-popover/70 lib:before:pointer-events-none lib:before:absolute lib:before:inset-0 lib:before:-z-1 lib:before:rounded-[inherit] lib:before:backdrop-blur-2xl lib:before:backdrop-saturate-150 lib:**:data-[slot$=-item]:focus:bg-foreground/10 lib:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 lib:**:data-[slot$=-separator]:bg-foreground/5 lib:**:data-[slot$=-trigger]:focus:bg-foreground/10 lib:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! lib:**:data-[variant=destructive]:focus:bg-foreground/10! lib:**:data-[variant=destructive]:text-accent-foreground! lib:**:data-[variant=destructive]:**:text-accent-foreground!",
					className,
				)}
				{...props}
			/>
		</MenubarPortal>
	);
}

function MenubarItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<MenubarPrimitive.Item
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"lib:group/menubar-item lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2.5 lib:rounded-xl lib:px-3 lib:py-2 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:not-data-[variant=destructive]:focus:**:text-accent-foreground lib:data-inset:pl-9.5 lib:data-[variant=destructive]:text-destructive lib:data-[variant=destructive]:focus:bg-destructive/10 lib:data-[variant=destructive]:focus:text-destructive lib:dark:data-[variant=destructive]:focus:bg-destructive/20 lib:data-disabled:pointer-events-none lib:data-disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4 lib:data-[variant=destructive]:*:[svg]:text-destructive!",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			data-inset={inset}
			className={cn(
				"lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2.5 lib:rounded-xl lib:py-2 lib:pr-3 lib:pl-9.5 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:focus:**:text-accent-foreground lib:data-inset:pl-9.5 lib:data-disabled:pointer-events-none lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="lib:pointer-events-none lib:absolute lib:left-3 lib:flex lib:size-4 lib:items-center lib:justify-center lib:[&_svg:not([class*=size-])]:size-4">
				<MenubarPrimitive.ItemIndicator>
					<CheckIcon />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.CheckboxItem>
	);
}

function MenubarRadioItem({
	className,
	children,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.RadioItem
			data-slot="menubar-radio-item"
			data-inset={inset}
			className={cn(
				"lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2.5 lib:rounded-xl lib:py-2 lib:pr-3 lib:pl-9.5 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:focus:**:text-accent-foreground lib:data-inset:pl-9.5 lib:data-disabled:pointer-events-none lib:data-disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<span className="lib:pointer-events-none lib:absolute lib:left-3 lib:flex lib:size-4 lib:items-center lib:justify-center lib:[&_svg:not([class*=size-])]:size-4">
				<MenubarPrimitive.ItemIndicator>
					<CheckIcon />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.RadioItem>
	);
}

function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.Label
			data-slot="menubar-label"
			data-inset={inset}
			className={cn(
				"lib:px-3.5 lib:py-2.5 lib:text-xs lib:text-muted-foreground lib:data-inset:pl-9.5",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
	return (
		<MenubarPrimitive.Separator
			data-slot="menubar-separator"
			className={cn("lib:-mx-1 lib:my-1 lib:h-px lib:bg-border/50", className)}
			{...props}
		/>
	);
}

function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cn(
				"lib:ml-auto lib:text-xs lib:tracking-widest lib:text-muted-foreground lib:group-focus/menubar-item:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.SubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"lib:flex lib:cursor-default lib:items-center lib:gap-2 lib:rounded-xl lib:px-3 lib:py-2 lib:text-sm lib:outline-none lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-inset:pl-9.5 lib:data-open:bg-accent lib:data-open:text-accent-foreground lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="lib:ml-auto lib:size-4" />
		</MenubarPrimitive.SubTrigger>
	);
}

function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
	return (
		<MenubarPrimitive.SubContent
			data-slot="menubar-sub-content"
			className={cn(
				"lib:z-50 lib:min-w-32 lib:origin-(--radix-menubar-content-transform-origin) lib:overflow-hidden lib:rounded-2xl lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:duration-100 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95 lib:animate-none! lib:relative lib:bg-popover/70 lib:before:pointer-events-none lib:before:absolute lib:before:inset-0 lib:before:-z-1 lib:before:rounded-[inherit] lib:before:backdrop-blur-2xl lib:before:backdrop-saturate-150 lib:**:data-[slot$=-item]:focus:bg-foreground/10 lib:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 lib:**:data-[slot$=-separator]:bg-foreground/5 lib:**:data-[slot$=-trigger]:focus:bg-foreground/10 lib:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! lib:**:data-[variant=destructive]:focus:bg-foreground/10! lib:**:data-[variant=destructive]:text-accent-foreground! lib:**:data-[variant=destructive]:**:text-accent-foreground!",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Menubar,
	MenubarPortal,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarGroup,
	MenubarSeparator,
	MenubarLabel,
	MenubarItem,
	MenubarShortcut,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
};
