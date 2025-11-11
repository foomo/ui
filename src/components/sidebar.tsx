import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Separator } from "@/components/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/sheet";
import { Skeleton } from "@/components/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}

	return context;
}

const SidebarProvider = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		defaultOpen?: boolean;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	}
>(
	(
		{
			defaultOpen = true,
			open: openProp,
			onOpenChange: setOpenProp,
			className,
			style,
			children,
			...props
		},
		ref,
	) => {
		const isMobile = useIsMobile();
		const [openMobile, setOpenMobile] = React.useState(false);

		// This is the internal state of the sidebar.
		// We use openProp and setOpenProp for control from outside the component.
		const [_open, _setOpen] = React.useState(defaultOpen);
		const open = openProp ?? _open;
		const setOpen = React.useCallback(
			(value: boolean | ((value: boolean) => boolean)) => {
				const openState = typeof value === "function" ? value(open) : value;
				if (setOpenProp) {
					setOpenProp(openState);
				} else {
					_setOpen(openState);
				}

				// This sets the cookie to keep the sidebar state.
				document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
			},
			[setOpenProp, open],
		);

		// Helper to toggle the sidebar.
		const toggleSidebar = React.useCallback(() => {
			return isMobile
				? setOpenMobile((open) => !open)
				: setOpen((open) => !open);
		}, [isMobile, setOpen]);

		// Adds a keyboard shortcut to toggle the sidebar.
		React.useEffect(() => {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (
					event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
					(event.metaKey || event.ctrlKey)
				) {
					event.preventDefault();
					toggleSidebar();
				}
			};

			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}, [toggleSidebar]);

		// We add a state so that we can do data-state="expanded" or "collapsed".
		// This makes it easier to style the sidebar with Tailwind classes.
		const state = open ? "expanded" : "collapsed";

		const contextValue = React.useMemo<SidebarContextProps>(
			() => ({
				state,
				open,
				setOpen,
				isMobile,
				openMobile,
				setOpenMobile,
				toggleSidebar,
			}),
			[state, open, setOpen, isMobile, openMobile, toggleSidebar],
		);

		return (
			<SidebarContext.Provider value={contextValue}>
				<TooltipProvider delayDuration={0}>
					<div
						style={
							{
								"--sidebar-width": SIDEBAR_WIDTH,
								"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
								...style,
							} as React.CSSProperties
						}
						className={cn(
							"lib:group/sidebar-wrapper lib:flex lib:min-h-svh lib:w-full lib:has-[[data-variant=inset]]:bg-sidebar",
							className,
						)}
						ref={ref}
						{...props}
					>
						{children}
					</div>
				</TooltipProvider>
			</SidebarContext.Provider>
		);
	},
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		side?: "left" | "right";
		variant?: "sidebar" | "floating" | "inset";
		collapsible?: "offcanvas" | "icon" | "none";
	}
>(
	(
		{
			side = "left",
			variant = "sidebar",
			collapsible = "offcanvas",
			className,
			children,
			...props
		},
		ref,
	) => {
		const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

		if (collapsible === "none") {
			return (
				<div
					className={cn(
						"lib:flex lib:h-full lib:w-[--sidebar-width] lib:flex-col lib:bg-sidebar lib:text-sidebar-foreground",
						className,
					)}
					ref={ref}
					{...props}
				>
					{children}
				</div>
			);
		}

		if (isMobile) {
			return (
				<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
					<SheetContent
						data-sidebar="sidebar"
						data-mobile="true"
						className="lib:w-[--sidebar-width] lib:bg-sidebar lib:p-0 lib:text-sidebar-foreground lib:[&>button]:hidden"
						style={
							{
								"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
							} as React.CSSProperties
						}
						side={side}
					>
						<SheetHeader className="lib:sr-only">
							<SheetTitle>Sidebar</SheetTitle>
							<SheetDescription>Displays the mobile sidebar.</SheetDescription>
						</SheetHeader>
						<div className="lib:flex lib:h-full lib:w-full lib:flex-col">
							{children}
						</div>
					</SheetContent>
				</Sheet>
			);
		}

		return (
			<div
				ref={ref}
				className="lib:group lib:peer lib:hidden lib:text-sidebar-foreground lib:md:block"
				data-state={state}
				data-collapsible={state === "collapsed" ? collapsible : ""}
				data-variant={variant}
				data-side={side}
			>
				{/* This is what handles the sidebar gap on desktop */}
				<div
					className={cn(
						"lib:relative lib:w-[--sidebar-width] lib:bg-transparent lib:transition-[width] lib:duration-200 lib:ease-linear",
						"lib:group-data-[collapsible=offcanvas]:w-0",
						"lib:group-data-[side=right]:rotate-180",
						variant === "floating" || variant === "inset"
							? "lib:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
							: "lib:group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
					)}
				/>
				<div
					className={cn(
						"lib:fixed lib:inset-y-0 lib:z-10 lib:hidden lib:h-svh lib:w-[--sidebar-width] lib:transition-[left,right,width] lib:duration-200 lib:ease-linear lib:md:flex",
						side === "left"
							? "lib:left-0 lib:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
							: "lib:right-0 lib:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
						// Adjust the padding for floating and inset variants.
						variant === "floating" || variant === "inset"
							? "lib:p-2 lib:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
							: "lib:group-data-[collapsible=icon]:w-[--sidebar-width-icon] lib:group-data-[side=left]:border-r lib:group-data-[side=right]:border-l",
						className,
					)}
					{...props}
				>
					<div
						data-sidebar="sidebar"
						className="lib:flex lib:h-full lib:w-full lib:flex-col lib:bg-sidebar lib:group-data-[variant=floating]:rounded-lg lib:group-data-[variant=floating]:border lib:group-data-[variant=floating]:border-sidebar-border lib:group-data-[variant=floating]:shadow"
					>
						{children}
					</div>
				</div>
			</div>
		);
	},
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
	React.ElementRef<typeof Button>,
	React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			ref={ref}
			data-sidebar="trigger"
			variant="ghost"
			size="icon"
			className={cn("lib:h-7 lib:w-7", className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<PanelLeft />
			<span className="lib:sr-only">Toggle Sidebar</span>
		</Button>
	);
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			ref={ref}
			data-sidebar="rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar"
			className={cn(
				"lib:absolute lib:inset-y-0 lib:z-20 lib:hidden lib:w-4 lib:-translate-x-1/2 lib:transition-all lib:ease-linear lib:after:absolute lib:after:inset-y-0 lib:after:left-1/2 lib:after:w-[2px] lib:hover:after:bg-sidebar-border lib:group-data-[side=left]:-right-4 lib:group-data-[side=right]:left-0 lib:sm:flex",
				"lib:[[data-side=left]_&]:cursor-w-resize lib:[[data-side=right]_&]:cursor-e-resize",
				"lib:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize lib:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"lib:group-data-[collapsible=offcanvas]:translate-x-0 lib:group-data-[collapsible=offcanvas]:after:left-full lib:group-data-[collapsible=offcanvas]:hover:bg-sidebar",
				"lib:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"lib:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				className,
			)}
			{...props}
		/>
	);
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
	return (
		<main
			ref={ref}
			className={cn(
				"lib:relative lib:flex lib:w-full lib:flex-1 lib:flex-col lib:bg-background",
				"lib:md:peer-data-[variant=inset]:m-2 lib:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 lib:md:peer-data-[variant=inset]:ml-0 lib:md:peer-data-[variant=inset]:rounded-xl lib:md:peer-data-[variant=inset]:shadow",
				className,
			)}
			{...props}
		/>
	);
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
	React.ElementRef<typeof Input>,
	React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
	return (
		<Input
			ref={ref}
			data-sidebar="input"
			className={cn(
				"lib:h-8 lib:w-full lib:bg-background lib:shadow-none lib:focus-visible:ring-2 lib:focus-visible:ring-sidebar-ring",
				className,
			)}
			{...props}
		/>
	);
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			data-sidebar="header"
			className={cn("lib:flex lib:flex-col lib:gap-2 lib:p-2", className)}
			{...props}
		/>
	);
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			data-sidebar="footer"
			className={cn("lib:flex lib:flex-col lib:gap-2 lib:p-2", className)}
			{...props}
		/>
	);
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
	React.ElementRef<typeof Separator>,
	React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
	return (
		<Separator
			ref={ref}
			data-sidebar="separator"
			className={cn("lib:mx-2 lib:w-auto lib:bg-sidebar-border", className)}
			{...props}
		/>
	);
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			data-sidebar="content"
			className={cn(
				"lib:flex lib:min-h-0 lib:flex-1 lib:flex-col lib:gap-2 lib:overflow-auto lib:group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			data-sidebar="group"
			className={cn(
				"lib:relative lib:flex lib:w-full lib:min-w-0 lib:flex-col lib:p-2",
				className,
			)}
			{...props}
		/>
	);
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			ref={ref}
			data-sidebar="group-label"
			className={cn(
				"lib:flex lib:h-8 lib:shrink-0 lib:items-center lib:rounded-md lib:px-2 lib:text-xs lib:font-medium lib:text-sidebar-foreground/70 lib:outline-none lib:ring-sidebar-ring lib:transition-[margin,opacity] lib:duration-200 lib:ease-linear lib:focus-visible:ring-2 lib:[&>svg]:size-4 lib:[&>svg]:shrink-0",
				"lib:group-data-[collapsible=icon]:-mt-8 lib:group-data-[collapsible=icon]:opacity-0",
				className,
			)}
			{...props}
		/>
	);
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			ref={ref}
			data-sidebar="group-action"
			className={cn(
				"lib:absolute lib:right-3 lib:top-3.5 lib:flex lib:aspect-square lib:w-5 lib:items-center lib:justify-center lib:rounded-md lib:p-0 lib:text-sidebar-foreground lib:outline-none lib:ring-sidebar-ring lib:transition-transform lib:hover:bg-sidebar-accent lib:hover:text-sidebar-accent-foreground lib:focus-visible:ring-2 lib:[&>svg]:size-4 lib:[&>svg]:shrink-0",
				// Increases the hit area of the button on mobile.
				"lib:after:absolute lib:after:-inset-2 lib:after:md:hidden",
				"lib:group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	);
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="group-content"
		className={cn("lib:w-full lib:text-sm", className)}
		{...props}
	/>
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		data-sidebar="menu"
		className={cn(
			"lib:flex lib:w-full lib:min-w-0 lib:flex-col lib:gap-1",
			className,
		)}
		{...props}
	/>
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		data-sidebar="menu-item"
		className={cn("lib:group/menu-item lib:relative", className)}
		{...props}
	/>
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
	"lib:peer/menu-button lib:flex lib:w-full lib:items-center lib:gap-2 lib:overflow-hidden lib:rounded-md lib:p-2 lib:text-left lib:text-sm lib:outline-none lib:ring-sidebar-ring lib:transition-[width,height,padding] lib:hover:bg-sidebar-accent lib:hover:text-sidebar-accent-foreground lib:focus-visible:ring-2 lib:active:bg-sidebar-accent lib:active:text-sidebar-accent-foreground lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 lib:aria-disabled:pointer-events-none lib:aria-disabled:opacity-50 lib:data-[active=true]:bg-sidebar-accent lib:data-[active=true]:font-medium lib:data-[active=true]:text-sidebar-accent-foreground lib:data-[state=open]:hover:bg-sidebar-accent lib:data-[state=open]:hover:text-sidebar-accent-foreground lib:group-data-[collapsible=icon]:!size-8 lib:group-data-[collapsible=icon]:!p-2 lib:[&>span:last-child]:truncate lib:[&>svg]:size-4 lib:[&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"lib:hover:bg-sidebar-accent lib:hover:text-sidebar-accent-foreground",
				outline:
					"lib:bg-background lib:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] lib:hover:bg-sidebar-accent lib:hover:text-sidebar-accent-foreground lib:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "lib:h-8 lib:text-sm",
				sm: "lib:h-7 lib:text-xs",
				lg: "lib:h-12 lib:text-sm lib:group-data-[collapsible=icon]:!p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const SidebarMenuButton = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button"> & {
		asChild?: boolean;
		isActive?: boolean;
		tooltip?: string | React.ComponentProps<typeof TooltipContent>;
	} & VariantProps<typeof sidebarMenuButtonVariants>
>(
	(
		{
			asChild = false,
			isActive = false,
			variant = "default",
			size = "default",
			tooltip,
			className,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		const { isMobile, state } = useSidebar();

		const button = (
			<Comp
				ref={ref}
				data-sidebar="menu-button"
				data-size={size}
				data-active={isActive}
				className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
				{...props}
			/>
		);

		if (!tooltip) {
			return button;
		}

		if (typeof tooltip === "string") {
			tooltip = {
				children: tooltip,
			};
		}

		return (
			<Tooltip>
				<TooltipTrigger asChild>{button}</TooltipTrigger>
				<TooltipContent
					side="right"
					align="center"
					hidden={state !== "collapsed" || isMobile}
					{...tooltip}
				/>
			</Tooltip>
		);
	},
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button"> & {
		asChild?: boolean;
		showOnHover?: boolean;
	}
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			ref={ref}
			data-sidebar="menu-action"
			className={cn(
				"lib:absolute lib:right-1 lib:top-1.5 lib:flex lib:aspect-square lib:w-5 lib:items-center lib:justify-center lib:rounded-md lib:p-0 lib:text-sidebar-foreground lib:outline-none lib:ring-sidebar-ring lib:transition-transform lib:hover:bg-sidebar-accent lib:hover:text-sidebar-accent-foreground lib:focus-visible:ring-2 lib:peer-hover/menu-button:text-sidebar-accent-foreground lib:[&>svg]:size-4 lib:[&>svg]:shrink-0",
				// Increases the hit area of the button on mobile.
				"lib:after:absolute lib:after:-inset-2 lib:after:md:hidden",
				"lib:peer-data-[size=sm]/menu-button:top-1",
				"lib:peer-data-[size=default]/menu-button:top-1.5",
				"lib:peer-data-[size=lg]/menu-button:top-2.5",
				"lib:group-data-[collapsible=icon]:hidden",
				showOnHover &&
					"lib:group-focus-within/menu-item:opacity-100 lib:group-hover/menu-item:opacity-100 lib:data-[state=open]:opacity-100 lib:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground lib:md:opacity-0",
				className,
			)}
			{...props}
		/>
	);
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-sidebar="menu-badge"
		className={cn(
			"lib:pointer-events-none lib:absolute lib:right-1 lib:flex lib:h-5 lib:min-w-5 lib:select-none lib:items-center lib:justify-center lib:rounded-md lib:px-1 lib:text-xs lib:font-medium lib:tabular-nums lib:text-sidebar-foreground",
			"lib:peer-hover/menu-button:text-sidebar-accent-foreground lib:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
			"lib:peer-data-[size=sm]/menu-button:top-1",
			"lib:peer-data-[size=default]/menu-button:top-1.5",
			"lib:peer-data-[size=lg]/menu-button:top-2.5",
			"lib:group-data-[collapsible=icon]:hidden",
			className,
		)}
		{...props}
	/>
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		showIcon?: boolean;
	}
>(({ className, showIcon = false, ...props }, ref) => {
	// Random width between 50 to 90%.
	const width = React.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);

	return (
		<div
			ref={ref}
			data-sidebar="menu-skeleton"
			className={cn(
				"lib:flex lib:h-8 lib:items-center lib:gap-2 lib:rounded-md lib:px-2",
				className,
			)}
			{...props}
		>
			{showIcon && (
				<Skeleton
					className="lib:size-4 lib:rounded-md"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="lib:h-4 lib:max-w-[--skeleton-width] lib:flex-1"
				data-sidebar="menu-skeleton-text"
				style={
					{
						"--skeleton-width": width,
					} as React.CSSProperties
				}
			/>
		</div>
	);
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		data-sidebar="menu-sub"
		className={cn(
			"lib:mx-3.5 lib:flex lib:min-w-0 lib:translate-x-px lib:flex-col lib:gap-1 lib:border-l lib:border-sidebar-border lib:px-2.5 lib:py-0.5",
			"lib:group-data-[collapsible=icon]:hidden",
			className,
		)}
		{...props}
	/>
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentProps<"a"> & {
		asChild?: boolean;
		size?: "sm" | "md";
		isActive?: boolean;
	}
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			ref={ref}
			data-sidebar="menu-sub-button"
			data-size={size}
			data-active={isActive}
			className={cn(
				"lib:flex lib:h-7 lib:min-w-0 lib:-translate-x-px lib:items-center lib:gap-2 lib:overflow-hidden lib:rounded-md lib:px-2 lib:text-sidebar-foreground lib:outline-none lib:ring-sidebar-ring lib:hover:bg-sidebar-accent lib:hover:text-sidebar-accent-foreground lib:focus-visible:ring-2 lib:active:bg-sidebar-accent lib:active:text-sidebar-accent-foreground lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:aria-disabled:pointer-events-none lib:aria-disabled:opacity-50 lib:[&>span:last-child]:truncate lib:[&>svg]:size-4 lib:[&>svg]:shrink-0 lib:[&>svg]:text-sidebar-accent-foreground",
				"lib:data-[active=true]:bg-sidebar-accent lib:data-[active=true]:text-sidebar-accent-foreground",
				size === "sm" && "lib:text-xs",
				size === "md" && "lib:text-sm",
				"lib:group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	);
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
};
