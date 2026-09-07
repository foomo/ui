import { cva } from "class-variance-authority";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import type * as React from "react";

function NavigationMenu({
	className,
	children,
	viewport = true,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			data-viewport={viewport}
			className={cn(
				"lib:group/navigation-menu lib:relative lib:flex lib:max-w-max lib:flex-1 lib:items-center lib:justify-center",
				className,
			)}
			{...props}
		>
			{children}
			{viewport && <NavigationMenuViewport />}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"lib:group lib:flex lib:flex-1 lib:list-none lib:items-center lib:justify-center lib:gap-0",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("lib:relative", className)}
			{...props}
		/>
	);
}

const navigationMenuTriggerStyle = cva(
	"lib:group/navigation-menu-trigger lib:inline-flex lib:h-9 lib:w-max lib:items-center lib:justify-center lib:rounded-2xl lib:px-4.5 lib:py-2.5 lib:text-sm lib:font-medium lib:transition-all lib:outline-none lib:hover:bg-muted lib:focus:bg-muted lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:focus-visible:outline-1 lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:data-popup-open:bg-muted/50 lib:data-popup-open:hover:bg-muted lib:data-open:bg-muted/50 lib:data-open:hover:bg-muted lib:data-open:focus:bg-muted",
);

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "lib:group", className)}
			{...props}
		>
			{children}{" "}
			<ChevronDownIcon
				className="lib:relative lib:top-px lib:ml-1 lib:size-3 lib:transition lib:duration-300 lib:group-data-popup-open/navigation-menu-trigger:rotate-180 lib:group-data-open/navigation-menu-trigger:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"lib:top-0 lib:left-0 lib:isolate lib:z-50 lib:w-full lib:p-2.5 lib:pr-3 lib:ease-[cubic-bezier(0.22,1,0.36,1)] lib:group-data-[viewport=false]/navigation-menu:top-full lib:group-data-[viewport=false]/navigation-menu:mt-1.5 lib:group-data-[viewport=false]/navigation-menu:overflow-hidden lib:group-data-[viewport=false]/navigation-menu:rounded-2xl lib:group-data-[viewport=false]/navigation-menu:bg-popover lib:group-data-[viewport=false]/navigation-menu:text-popover-foreground lib:group-data-[viewport=false]/navigation-menu:shadow-2xl lib:group-data-[viewport=false]/navigation-menu:ring-1 lib:group-data-[viewport=false]/navigation-menu:ring-foreground/5 lib:group-data-[viewport=false]/navigation-menu:duration-300 lib:data-[motion=from-end]:slide-in-from-right-52 lib:data-[motion=from-start]:slide-in-from-left-52 lib:data-[motion=to-end]:slide-out-to-right-52 lib:data-[motion=to-start]:slide-out-to-left-52 lib:data-[motion^=from-]:animate-in lib:data-[motion^=from-]:fade-in lib:data-[motion^=to-]:animate-out lib:data-[motion^=to-]:fade-out lib:**:data-[slot=navigation-menu-link]:focus:ring-0 lib:**:data-[slot=navigation-menu-link]:focus:outline-none lib:md:absolute lib:md:w-auto lib:group-data-[viewport=false]/navigation-menu:data-open:animate-in lib:group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 lib:group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 lib:group-data-[viewport=false]/navigation-menu:data-closed:animate-out lib:group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 lib:group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div
			className={cn(
				"lib:absolute lib:top-full lib:left-0 lib:isolate lib:z-50 lib:flex lib:justify-center",
			)}
		>
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					"lib:origin-top-center lib:relative lib:mt-1.5 lib:h-(--radix-navigation-menu-viewport-height) lib:w-full lib:overflow-hidden lib:rounded-2xl lib:bg-popover lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:duration-100 lib:md:w-(--radix-navigation-menu-viewport-width) lib:data-open:animate-in lib:data-open:zoom-in-90 lib:data-closed:animate-out lib:data-closed:zoom-out-90",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"lib:flex lib:items-center lib:gap-1.5 lib:rounded-2xl lib:p-3 lib:text-sm lib:transition-all lib:outline-none lib:hover:bg-muted lib:focus:bg-muted lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:focus-visible:outline-1 lib:in-data-[slot=navigation-menu-content]:rounded-xl lib:data-[active=true]:bg-muted/50 lib:data-[active=true]:hover:bg-muted lib:data-[active=true]:focus:bg-muted lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				"lib:top-full lib:z-1 lib:flex lib:h-1.5 lib:items-end lib:justify-center lib:overflow-hidden lib:data-[state=hidden]:animate-out lib:data-[state=hidden]:fade-out lib:data-[state=visible]:animate-in lib:data-[state=visible]:fade-in",
				className,
			)}
			{...props}
		>
			<div className="lib:relative lib:top-[60%] lib:h-2 lib:w-2 lib:rotate-45 lib:rounded-tl-sm lib:bg-border lib:shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
};
