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
				"fui:fixed fui:inset-0 fui:z-50 fui:bg-black/80 fui:supports-backdrop-filter:backdrop-blur-xs fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-closed:animate-out fui:data-closed:fade-out-0",
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
					"fui:group/drawer-content fui:fixed fui:z-50 fui:flex fui:h-auto fui:flex-col fui:bg-transparent fui:p-4 fui:text-sm fui:text-popover-foreground fui:before:absolute fui:before:inset-2 fui:before:-z-10 fui:before:rounded-4xl fui:before:border fui:before:border-border fui:before:bg-popover fui:data-[vaul-drawer-direction=bottom]:inset-x-0 fui:data-[vaul-drawer-direction=bottom]:bottom-0 fui:data-[vaul-drawer-direction=bottom]:mt-24 fui:data-[vaul-drawer-direction=bottom]:max-h-[80vh] fui:data-[vaul-drawer-direction=left]:inset-y-0 fui:data-[vaul-drawer-direction=left]:left-0 fui:data-[vaul-drawer-direction=left]:w-3/4 fui:data-[vaul-drawer-direction=right]:inset-y-0 fui:data-[vaul-drawer-direction=right]:right-0 fui:data-[vaul-drawer-direction=right]:w-3/4 fui:data-[vaul-drawer-direction=top]:inset-x-0 fui:data-[vaul-drawer-direction=top]:top-0 fui:data-[vaul-drawer-direction=top]:mb-24 fui:data-[vaul-drawer-direction=top]:max-h-[80vh] fui:data-[vaul-drawer-direction=left]:sm:max-w-sm fui:data-[vaul-drawer-direction=right]:sm:max-w-sm",
					className,
				)}
				{...props}
			>
				<div className="fui:mx-auto fui:mt-4 fui:hidden fui:h-1.5 fui:w-[100px] fui:shrink-0 fui:rounded-full fui:bg-muted fui:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
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
				"fui:flex fui:flex-col fui:gap-0.5 fui:p-4 fui:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center fui:group-data-[vaul-drawer-direction=top]/drawer-content:text-center fui:md:gap-1.5 fui:md:text-left",
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
				"fui:mt-auto fui:flex fui:flex-col fui:gap-2 fui:p-4",
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
				"fui:font-heading fui:text-base fui:font-medium fui:text-foreground",
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
			className={cn("fui:text-sm fui:text-muted-foreground", className)}
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
