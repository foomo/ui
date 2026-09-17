"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
import type * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu";

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
	return (
		<MenubarPrimitive
			data-slot="menubar"
			className={cn(
				"fui:flex fui:h-9 fui:items-center fui:rounded-4xl fui:border fui:p-1",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
	return <DropdownMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuGroup>) {
	return <DropdownMenuGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPortal>) {
	return <DropdownMenuPortal data-slot="menubar-portal" {...props} />;
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
	return (
		<DropdownMenuTrigger
			data-slot="menubar-trigger"
			className={cn(
				"fui:flex fui:items-center fui:rounded-xl fui:px-2 fui:py-0.75 fui:text-sm fui:font-medium fui:outline-hidden fui:select-none fui:hover:bg-muted fui:aria-expanded:bg-muted",
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
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			data-slot="menubar-content"
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				"fui: fui: fui:min-w-48 fui:rounded-2xl fui:bg-popover fui:p-1 fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
	return (
		<DropdownMenuItem
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"fui:group/menubar-item fui:gap-2.5 fui:rounded-xl fui:px-3 fui:py-2 fui:text-sm fui:focus:bg-accent fui:focus:text-accent-foreground fui:not-data-[variant=destructive]:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-[variant=destructive]:text-destructive fui:data-[variant=destructive]:focus:bg-destructive/10 fui:data-[variant=destructive]:focus:text-destructive fui:dark:data-[variant=destructive]:focus:bg-destructive/20 fui:data-disabled:opacity-50 fui:[&_svg:not([class*=size-])]:size-4 fui:data-[variant=destructive]:*:[svg]:text-destructive!",
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
}: MenuPrimitive.CheckboxItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			data-inset={inset}
			className={cn(
				"fui:relative fui:flex fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:py-2 fui:pr-3 fui:pl-9.5 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="fui:pointer-events-none fui:absolute fui:left-3 fui:flex fui:size-4 fui:items-center fui:justify-center fui:[&_svg:not([class*=size-])]:size-4">
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
	return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarRadioItem({
	className,
	children,
	inset,
	...props
}: MenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="menubar-radio-item"
			data-inset={inset}
			className={cn(
				"fui:relative fui:flex fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:py-2 fui:pr-3 fui:pl-9.5 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<span className="fui:pointer-events-none fui:absolute fui:left-3 fui:flex fui:size-4 fui:items-center fui:justify-center fui:[&_svg:not([class*=size-])]:size-4">
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuLabel
			data-slot="menubar-label"
			data-inset={inset}
			className={cn(
				"fui:px-3.5 fui:py-2.5 fui:text-xs fui:text-muted-foreground fui:data-inset:pl-9.5",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
	return (
		<DropdownMenuSeparator
			data-slot="menubar-separator"
			className={cn("fui:-mx-1 fui:my-1 fui:h-px fui:bg-border/50", className)}
			{...props}
		/>
	);
}

function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
	return (
		<DropdownMenuShortcut
			data-slot="menubar-shortcut"
			className={cn(
				"fui:ml-auto fui:text-xs fui:tracking-widest fui:text-muted-foreground fui:group-focus/menubar-item:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof DropdownMenuSub>) {
	return <DropdownMenuSub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuSubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"fui:gap-2 fui:rounded-xl fui:px-3 fui:py-2 fui:text-sm fui:focus:bg-accent fui:focus:text-accent-foreground fui:data-inset:pl-9.5 fui:data-open:bg-accent fui:data-open:text-accent-foreground fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
	return (
		<DropdownMenuSubContent
			data-slot="menubar-sub-content"
			className={cn(
				"fui: fui: fui:min-w-32 fui:rounded-2xl fui:bg-popover fui:p-1 fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
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
