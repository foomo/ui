import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

function NavigationMenu({
	align = "start",
	className,
	children,
	...props
}: NavigationMenuPrimitive.Root.Props &
	Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"lib:group/navigation-menu lib:relative lib:flex lib:max-w-max lib:flex-1 lib:items-center lib:justify-center",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuPositioner align={align} />
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
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
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
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
}: NavigationMenuPrimitive.Trigger.Props) {
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
}: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"lib:data-ending-style:data-activation-direction=left:translate-x-[50%] lib:data-ending-style:data-activation-direction=right:translate-x-[-50%] lib:data-starting-style:data-activation-direction=left:translate-x-[-50%] lib:data-starting-style:data-activation-direction=right:translate-x-[50%] lib:isolate lib:z-50 lib:h-full lib:w-auto lib:p-2.5 lib:pr-3 lib:transition-[opacity,transform,translate] lib:duration-[0.35s] lib:ease-[cubic-bezier(0.22,1,0.36,1)] lib:group-data-[viewport=false]/navigation-menu:rounded-2xl lib:group-data-[viewport=false]/navigation-menu:bg-popover lib:group-data-[viewport=false]/navigation-menu:text-popover-foreground lib:group-data-[viewport=false]/navigation-menu:shadow-2xl lib:group-data-[viewport=false]/navigation-menu:ring-1 lib:group-data-[viewport=false]/navigation-menu:ring-foreground/5 lib:group-data-[viewport=false]/navigation-menu:duration-300 lib:data-ending-style:opacity-0 lib:data-starting-style:opacity-0 lib:data-[motion=from-end]:slide-in-from-right-52 lib:data-[motion=from-start]:slide-in-from-left-52 lib:data-[motion=to-end]:slide-out-to-right-52 lib:data-[motion=to-start]:slide-out-to-left-52 lib:data-[motion^=from-]:animate-in lib:data-[motion^=from-]:fade-in lib:data-[motion^=to-]:animate-out lib:data-[motion^=to-]:fade-out lib:**:data-[slot=navigation-menu-link]:focus:ring-0 lib:**:data-[slot=navigation-menu-link]:focus:outline-none lib:group-data-[viewport=false]/navigation-menu:data-open:animate-in lib:group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 lib:group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 lib:group-data-[viewport=false]/navigation-menu:data-closed:animate-out lib:group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 lib:group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuPositioner({
	className,
	side = "bottom",
	sideOffset = 8,
	align = "start",
	alignOffset = 0,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn(
					"lib:isolate lib:z-50 lib:h-(--positioner-height) lib:w-(--positioner-width) lib:max-w-(--available-width) lib:transition-[top,left,right,bottom] lib:duration-[0.35s] lib:ease-[cubic-bezier(0.22,1,0.36,1)] lib:data-instant:transition-none lib:data-[side=bottom]:before:top-[-10px] lib:data-[side=bottom]:before:right-0 lib:data-[side=bottom]:before:left-0",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="lib:data-[ending-style]:easing-[ease] lib:xs:w-(--popup-width) lib:relative lib:h-(--popup-height) lib:w-(--popup-width) lib:origin-(--transform-origin) lib:rounded-2xl lib:bg-popover lib:text-popover-foreground lib:shadow lib:ring-1 lib:ring-foreground/5 lib:transition-[opacity,transform,width,height,scale,translate] lib:duration-[0.35s] lib:ease-[cubic-bezier(0.22,1,0.36,1)] lib:outline-none lib:data-ending-style:scale-90 lib:data-ending-style:opacity-0 lib:data-ending-style:duration-150 lib:data-starting-style:scale-90 lib:data-starting-style:opacity-0">
					<NavigationMenuPrimitive.Viewport className="lib:relative lib:size-full lib:overflow-hidden" />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}

function NavigationMenuLink({
	className,
	...props
}: NavigationMenuPrimitive.Link.Props) {
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
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
	return (
		<NavigationMenuPrimitive.Icon
			data-slot="navigation-menu-indicator"
			className={cn(
				"lib:top-full lib:z-1 lib:flex lib:h-1.5 lib:items-end lib:justify-center lib:overflow-hidden lib:data-[state=hidden]:animate-out lib:data-[state=hidden]:fade-out lib:data-[state=visible]:animate-in lib:data-[state=visible]:fade-in",
				className,
			)}
			{...props}
		>
			<div className="lib:relative lib:top-[60%] lib:h-2 lib:w-2 lib:rotate-45 lib:rounded-tl-sm lib:bg-border lib:shadow-md" />
		</NavigationMenuPrimitive.Icon>
	);
}

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuPositioner,
};
