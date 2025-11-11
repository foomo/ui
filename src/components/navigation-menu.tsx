import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn(
			"lib:relative lib:z-10 lib:flex lib:max-w-max lib:flex-1 lib:items-center lib:justify-center",
			className,
		)}
		{...props}
	>
		{children}
		<NavigationMenuViewport />
	</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn(
			"lib:group lib:flex lib:flex-1 lib:list-none lib:items-center lib:justify-center lib:space-x-1",
			className,
		)}
		{...props}
	/>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
	"lib:group lib:inline-flex lib:h-9 lib:w-max lib:items-center lib:justify-center lib:rounded-md lib:bg-background lib:px-4 lib:py-2 lib:text-sm lib:font-medium lib:transition-colors lib:hover:bg-accent lib:hover:text-accent-foreground lib:focus:bg-accent lib:focus:text-accent-foreground lib:focus:outline-none lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:data-[state=open]:text-accent-foreground lib:data-[state=open]:bg-accent/50 lib:data-[state=open]:hover:bg-accent lib:data-[state=open]:focus:bg-accent",
);

const NavigationMenuTrigger = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(navigationMenuTriggerStyle(), "lib:group", className)}
		{...props}
	>
		{children}{" "}
		<ChevronDown
			className="lib:relative lib:top-[1px] lib:ml-1 lib:h-3 lib:w-3 lib:transition lib:duration-300 lib:group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={cn(
			"lib:left-0 lib:top-0 lib:w-full lib:data-[motion^=from-]:animate-in lib:data-[motion^=to-]:animate-out lib:data-[motion^=from-]:fade-in lib:data-[motion^=to-]:fade-out lib:data-[motion=from-end]:slide-in-from-right-52 lib:data-[motion=from-start]:slide-in-from-left-52 lib:data-[motion=to-end]:slide-out-to-right-52 lib:data-[motion=to-start]:slide-out-to-left-52 lib:md:absolute lib:md:w-auto lib:",
			className,
		)}
		{...props}
	/>
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
	<div
		className={cn(
			"lib:absolute lib:left-0 lib:top-full lib:flex lib:justify-center",
		)}
	>
		<NavigationMenuPrimitive.Viewport
			className={cn(
				"lib:origin-top-center lib:relative lib:mt-1.5 lib:h-[var(--radix-navigation-menu-viewport-height)] lib:w-full lib:overflow-hidden lib:rounded-md lib:border lib:bg-popover lib:text-popover-foreground lib:shadow lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-90 lib:md:w-[var(--radix-navigation-menu-viewport-width)]",
				className,
			)}
			ref={ref}
			{...props}
		/>
	</div>
));
NavigationMenuViewport.displayName =
	NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Indicator
		ref={ref}
		className={cn(
			"lib:top-full lib:z-[1] lib:flex lib:h-1.5 lib:items-end lib:justify-center lib:overflow-hidden lib:data-[state=visible]:animate-in lib:data-[state=hidden]:animate-out lib:data-[state=hidden]:fade-out lib:data-[state=visible]:fade-in",
			className,
		)}
		{...props}
	>
		<div className="lib:relative lib:top-[60%] lib:h-2 lib:w-2 lib:rotate-45 lib:rounded-tl-sm lib:bg-border lib:shadow-md" />
	</NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
	NavigationMenuPrimitive.Indicator.displayName;

export {
	navigationMenuTriggerStyle,
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
};
