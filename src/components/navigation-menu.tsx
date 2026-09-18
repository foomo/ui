import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { CaretDownIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { cn } from "cn";

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
				"fui:group/navigation-menu fui:relative fui:flex fui:max-w-max fui:flex-1 fui:items-center fui:justify-center",
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
				"fui:group fui:flex fui:flex-1 fui:list-none fui:items-center fui:justify-center fui:gap-0",
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
			className={cn("fui:relative", className)}
			{...props}
		/>
	);
}

const navigationMenuTriggerStyle = cva(
	"fui:group/navigation-menu-trigger fui:inline-flex fui:h-9 fui:w-max fui:items-center fui:justify-center fui:rounded-2xl fui:px-4.5 fui:py-2.5 fui:text-sm fui:font-medium fui:transition-all fui:outline-none fui:hover:bg-muted fui:focus:bg-muted fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:focus-visible:outline-1 fui:disabled:pointer-events-none fui:disabled:opacity-50 fui:data-popup-open:bg-muted/50 fui:data-popup-open:hover:bg-muted fui:data-open:bg-muted/50 fui:data-open:hover:bg-muted fui:data-open:focus:bg-muted",
);

function NavigationMenuTrigger({
	className,
	children,
	...props
}: NavigationMenuPrimitive.Trigger.Props) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "fui:group", className)}
			{...props}
		>
			{children}{" "}
			<CaretDownIcon
				className="fui:relative fui:top-px fui:ml-1 fui:size-3 fui:transition fui:duration-300 fui:group-data-popup-open/navigation-menu-trigger:rotate-180 fui:group-data-open/navigation-menu-trigger:rotate-180"
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
				"fui:data-ending-style:data-activation-direction=left:translate-x-[50%] fui:data-ending-style:data-activation-direction=right:translate-x-[-50%] fui:data-starting-style:data-activation-direction=left:translate-x-[-50%] fui:data-starting-style:data-activation-direction=right:translate-x-[50%] fui:isolate fui:z-50 fui:h-full fui:w-auto fui:p-2.5 fui:pr-3 fui:transition-[opacity,transform,translate] fui:duration-[0.35s] fui:ease-[cubic-bezier(0.22,1,0.36,1)] fui:group-data-[viewport=false]/navigation-menu:rounded-2xl fui:group-data-[viewport=false]/navigation-menu:bg-popover fui:group-data-[viewport=false]/navigation-menu:text-popover-foreground fui:group-data-[viewport=false]/navigation-menu:shadow-2xl fui:group-data-[viewport=false]/navigation-menu:ring-1 fui:group-data-[viewport=false]/navigation-menu:ring-foreground/5 fui:group-data-[viewport=false]/navigation-menu:duration-300 fui:data-ending-style:opacity-0 fui:data-starting-style:opacity-0 fui:data-[motion=from-end]:slide-in-from-right-52 fui:data-[motion=from-start]:slide-in-from-left-52 fui:data-[motion=to-end]:slide-out-to-right-52 fui:data-[motion=to-start]:slide-out-to-left-52 fui:data-[motion^=from-]:animate-in fui:data-[motion^=from-]:fade-in fui:data-[motion^=to-]:animate-out fui:data-[motion^=to-]:fade-out fui:**:data-[slot=navigation-menu-link]:focus:ring-0 fui:**:data-[slot=navigation-menu-link]:focus:outline-none fui:group-data-[viewport=false]/navigation-menu:data-open:animate-in fui:group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 fui:group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 fui:group-data-[viewport=false]/navigation-menu:data-closed:animate-out fui:group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 fui:group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
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
					"fui:isolate fui:z-50 fui:h-(--positioner-height) fui:w-(--positioner-width) fui:max-w-(--available-width) fui:transition-[top,left,right,bottom] fui:duration-[0.35s] fui:ease-[cubic-bezier(0.22,1,0.36,1)] fui:data-instant:transition-none fui:data-[side=bottom]:before:top-[-10px] fui:data-[side=bottom]:before:right-0 fui:data-[side=bottom]:before:left-0",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="fui:data-[ending-style]:easing-[ease] fui:xs:w-(--popup-width) fui:relative fui:h-(--popup-height) fui:w-(--popup-width) fui:origin-(--transform-origin) fui:rounded-2xl fui:bg-popover fui:text-popover-foreground fui:shadow fui:ring-1 fui:ring-foreground/5 fui:transition-[opacity,transform,width,height,scale,translate] fui:duration-[0.35s] fui:ease-[cubic-bezier(0.22,1,0.36,1)] fui:outline-none fui:data-ending-style:scale-90 fui:data-ending-style:opacity-0 fui:data-ending-style:duration-150 fui:data-starting-style:scale-90 fui:data-starting-style:opacity-0">
					<NavigationMenuPrimitive.Viewport className="fui:relative fui:size-full fui:overflow-hidden" />
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
				"fui:flex fui:items-center fui:gap-1.5 fui:rounded-2xl fui:p-3 fui:text-sm fui:transition-all fui:outline-none fui:hover:bg-muted fui:focus:bg-muted fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:focus-visible:outline-1 fui:in-data-[slot=navigation-menu-content]:rounded-xl fui:data-[active=true]:bg-muted/50 fui:data-[active=true]:hover:bg-muted fui:data-[active=true]:focus:bg-muted fui:[&_svg:not([class*=size-])]:size-4",
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
				"fui:top-full fui:z-1 fui:flex fui:h-1.5 fui:items-end fui:justify-center fui:overflow-hidden fui:data-[state=hidden]:animate-out fui:data-[state=hidden]:fade-out fui:data-[state=visible]:animate-in fui:data-[state=visible]:fade-in",
				className,
			)}
			{...props}
		>
			<div className="fui:relative fui:top-[60%] fui:h-2 fui:w-2 fui:rotate-45 fui:rounded-tl-sm fui:bg-border fui:shadow-md" />
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
