"use client";

import { cn } from "cn";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import type * as React from "react";

function ContextMenu({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			className={cn("lib:select-none", className)}
			{...props}
		/>
	);
}

function ContextMenuGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
	return (
		<ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
	);
}

function ContextMenuPortal({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
	return (
		<ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
	);
}

function ContextMenuSub({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
	return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			{...props}
		/>
	);
}

function ContextMenuContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content> & {
	side?: "top" | "right" | "bottom" | "left";
}) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				data-slot="context-menu-content"
				className={cn(
					"lib:z-50 lib:max-h-(--radix-context-menu-content-available-height) lib:min-w-48 lib:origin-(--radix-context-menu-content-transform-origin) lib:overflow-x-hidden lib:overflow-y-auto lib:rounded-2xl lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:duration-100 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95 lib:animate-none! lib:relative lib:bg-popover/70 lib:before:pointer-events-none lib:before:absolute lib:before:inset-0 lib:before:-z-1 lib:before:rounded-[inherit] lib:before:backdrop-blur-2xl lib:before:backdrop-saturate-150 lib:**:data-[slot$=-item]:focus:bg-foreground/10 lib:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 lib:**:data-[slot$=-separator]:bg-foreground/5 lib:**:data-[slot$=-trigger]:focus:bg-foreground/10 lib:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! lib:**:data-[variant=destructive]:focus:bg-foreground/10! lib:**:data-[variant=destructive]:text-accent-foreground! lib:**:data-[variant=destructive]:**:text-accent-foreground!",
					className,
				)}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	);
}

function ContextMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"lib:group/context-menu-item lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2.5 lib:rounded-xl lib:px-3 lib:py-2 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-inset:pl-9.5 lib:data-[variant=destructive]:text-destructive lib:data-[variant=destructive]:focus:bg-destructive/10 lib:data-[variant=destructive]:focus:text-destructive lib:dark:data-[variant=destructive]:focus:bg-destructive/20 lib:data-disabled:pointer-events-none lib:data-disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4 lib:focus:*:[svg]:text-accent-foreground lib:data-[variant=destructive]:*:[svg]:text-destructive",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.SubTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"lib:flex lib:cursor-default lib:items-center lib:rounded-xl lib:px-3 lib:py-2 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-inset:pl-9.5 lib:data-open:bg-accent lib:data-open:text-accent-foreground lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="lib:ml-auto" />
		</ContextMenuPrimitive.SubTrigger>
	);
}

function ContextMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
	return (
		<ContextMenuPrimitive.SubContent
			data-slot="context-menu-sub-content"
			className={cn(
				"lib:z-50 lib:min-w-32 lib:origin-(--radix-context-menu-content-transform-origin) lib:overflow-hidden lib:rounded-2xl lib:border lib:bg-popover lib:p-1 lib:text-popover-foreground lib:shadow-lg lib:duration-100 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95 lib:animate-none! lib:relative lib:bg-popover/70 lib:before:pointer-events-none lib:before:absolute lib:before:inset-0 lib:before:-z-1 lib:before:rounded-[inherit] lib:before:backdrop-blur-2xl lib:before:backdrop-saturate-150 lib:**:data-[slot$=-item]:focus:bg-foreground/10 lib:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 lib:**:data-[slot$=-separator]:bg-foreground/5 lib:**:data-[slot$=-trigger]:focus:bg-foreground/10 lib:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! lib:**:data-[variant=destructive]:focus:bg-foreground/10! lib:**:data-[variant=destructive]:text-accent-foreground! lib:**:data-[variant=destructive]:**:text-accent-foreground!",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			data-inset={inset}
			className={cn(
				"lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2 lib:rounded-xl lib:py-2 lib:pr-8 lib:pl-3 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-inset:pl-9.5 lib:data-disabled:pointer-events-none lib:data-disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="lib:pointer-events-none lib:absolute lib:right-2">
				<ContextMenuPrimitive.ItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	);
}

function ContextMenuRadioItem({
	className,
	children,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			data-inset={inset}
			className={cn(
				"lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2 lib:rounded-xl lib:py-2 lib:pr-8 lib:pl-3 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:data-inset:pl-9.5 lib:data-disabled:pointer-events-none lib:data-disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<span className="lib:pointer-events-none lib:absolute lib:right-2">
				<ContextMenuPrimitive.ItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	);
}

function ContextMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.Label
			data-slot="context-menu-label"
			data-inset={inset}
			className={cn(
				"lib:px-3 lib:py-2.5 lib:text-xs lib:text-muted-foreground lib:data-inset:pl-9.5",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("lib:-mx-1 lib:my-1 lib:h-px lib:bg-border/50", className)}
			{...props}
		/>
	);
}

function ContextMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn(
				"lib:ml-auto lib:text-xs lib:tracking-widest lib:text-muted-foreground lib:group-focus/context-menu-item:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

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
