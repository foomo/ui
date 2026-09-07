"use client";

import { cn } from "cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function Drawer({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
	return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-overlay"
			className={cn(
				"lib:fixed lib:inset-0 lib:z-50 lib:bg-black/80 lib:supports-backdrop-filter:backdrop-blur-xs lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-closed:animate-out lib:data-closed:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
	return (
		<DrawerPortal data-slot="drawer-portal">
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot="drawer-content"
				className={cn(
					"lib:group/drawer-content lib:fixed lib:z-50 lib:flex lib:h-auto lib:flex-col lib:bg-transparent lib:p-4 lib:text-sm lib:text-popover-foreground lib:before:absolute lib:before:inset-2 lib:before:-z-10 lib:before:rounded-4xl lib:before:border lib:before:border-border lib:before:bg-popover lib:data-[vaul-drawer-direction=bottom]:inset-x-0 lib:data-[vaul-drawer-direction=bottom]:bottom-0 lib:data-[vaul-drawer-direction=bottom]:mt-24 lib:data-[vaul-drawer-direction=bottom]:max-h-[80vh] lib:data-[vaul-drawer-direction=left]:inset-y-0 lib:data-[vaul-drawer-direction=left]:left-0 lib:data-[vaul-drawer-direction=left]:w-3/4 lib:data-[vaul-drawer-direction=right]:inset-y-0 lib:data-[vaul-drawer-direction=right]:right-0 lib:data-[vaul-drawer-direction=right]:w-3/4 lib:data-[vaul-drawer-direction=top]:inset-x-0 lib:data-[vaul-drawer-direction=top]:top-0 lib:data-[vaul-drawer-direction=top]:mb-24 lib:data-[vaul-drawer-direction=top]:max-h-[80vh] lib:data-[vaul-drawer-direction=left]:sm:max-w-sm lib:data-[vaul-drawer-direction=right]:sm:max-w-sm",
					className,
				)}
				{...props}
			>
				<div className="lib:mx-auto lib:mt-4 lib:hidden lib:h-1.5 lib:w-[100px] lib:shrink-0 lib:rounded-full lib:bg-muted lib:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				"lib:flex lib:flex-col lib:gap-0.5 lib:p-4 lib:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center lib:group-data-[vaul-drawer-direction=top]/drawer-content:text-center lib:md:gap-1.5 lib:md:text-left",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn(
				"lib:mt-auto lib:flex lib:flex-col lib:gap-2 lib:p-4",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerTitle({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn(
				"lib:font-heading lib:text-base lib:font-medium lib:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerDescription({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("lib:text-sm lib:text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
