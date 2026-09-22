import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

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

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
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
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
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
			<div
				data-slot="sidebar-wrapper"
				style={
					{
						"--sidebar-width": SIDEBAR_WIDTH,
						"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
						...style,
					} as React.CSSProperties
				}
				className={cn(
					"fui:group/sidebar-wrapper fui:flex fui:min-h-svh fui:w-full fui:has-data-[variant=inset]:bg-sidebar",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
}

function Sidebar({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	className,
	children,
	dir,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={cn(
					"fui:flex fui:h-full fui:w-(--sidebar-width) fui:flex-col fui:bg-sidebar fui:text-sidebar-foreground",
					className,
				)}
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
					dir={dir}
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					className="fui:w-(--sidebar-width) fui:bg-sidebar fui:p-0 fui:text-sidebar-foreground fui:[&>button]:hidden"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
						} as React.CSSProperties
					}
					side={side}
				>
					<SheetHeader className="fui:sr-only">
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div className="fui:flex fui:h-full fui:w-full fui:flex-col">
						{children}
					</div>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<div
			className="fui:group fui:peer fui:hidden fui:text-sidebar-foreground fui:md:block"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					"fui:relative fui:w-(--sidebar-width) fui:bg-transparent fui:transition-[width] fui:duration-200 fui:ease-linear",
					"fui:group-data-[collapsible=offcanvas]:w-0",
					"fui:group-data-[side=right]:rotate-180",
					variant === "floating" || variant === "inset"
						? "fui:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
						: "fui:group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
				)}
			/>
			<div
				data-slot="sidebar-container"
				data-side={side}
				className={cn(
					"fui:fixed fui:inset-y-0 fui:z-10 fui:hidden fui:h-svh fui:w-(--sidebar-width) fui:transition-[left,right,width] fui:duration-200 fui:ease-linear fui:data-[side=left]:left-0 fui:data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] fui:data-[side=right]:right-0 fui:data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] fui:md:flex",
					// Adjust the padding for floating and inset variants.
					variant === "floating" || variant === "inset"
						? "fui:p-2 fui:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
						: "fui:group-data-[collapsible=icon]:w-(--sidebar-width-icon) fui:group-data-[side=left]:border-r fui:group-data-[side=right]:border-l",
					className,
				)}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className="fui:flex fui:size-full fui:flex-col fui:bg-sidebar fui:group-data-[variant=floating]:rounded-lg fui:group-data-[variant=floating]:shadow-sm fui:group-data-[variant=floating]:ring-1 fui:group-data-[variant=floating]:ring-sidebar-border"
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function SidebarTrigger({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon-sm"
			className={cn(className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<SidebarSimpleIcon />
			<span className="fui:sr-only">Toggle Sidebar</span>
		</Button>
	);
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar"
			className={cn(
				"fui:absolute fui:inset-y-0 fui:z-20 fui:hidden fui:w-4 fui:transition-all fui:ease-linear fui:group-data-[side=left]:-right-4 fui:group-data-[side=right]:left-0 fui:after:absolute fui:after:inset-y-0 fui:after:start-1/2 fui:after:w-[2px] fui:hover:after:bg-sidebar-border fui:sm:flex fui:ltr:-translate-x-1/2 fui:rtl:-translate-x-1/2",
				"fui:in-data-[side=left]:cursor-w-resize fui:in-data-[side=right]:cursor-e-resize",
				"fui:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize fui:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
				"fui:group-data-[collapsible=offcanvas]:translate-x-0 fui:group-data-[collapsible=offcanvas]:after:left-full fui:hover:group-data-[collapsible=offcanvas]:bg-sidebar",
				"fui:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
				"fui:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"fui:relative fui:flex fui:w-full fui:min-w-0 fui:flex-1 fui:flex-col fui:bg-background fui:md:peer-data-[variant=inset]:m-2 fui:md:peer-data-[variant=inset]:ml-0 fui:md:peer-data-[variant=inset]:rounded-xl fui:md:peer-data-[variant=inset]:shadow-sm fui:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn(
				"fui:h-8 fui:w-full fui:bg-background fui:shadow-none",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn(
				"fui:flex fui:flex-col fui:gap-2 fui:p-2 fui:[--radius:var(--radius-xl)]",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("fui:flex fui:flex-col fui:gap-2 fui:p-2", className)}
			{...props}
		/>
	);
}

function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("fui:mx-2 fui:w-auto fui:bg-sidebar-border", className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"fui:no-scrollbar fui:flex fui:min-h-0 fui:flex-1 fui:flex-col fui:gap-2 fui:overflow-auto fui:[--radius:var(--radius-xl)] fui:group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn(
				"fui:relative fui:flex fui:w-full fui:min-w-0 fui:flex-col fui:p-2",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroupLabel({
	className,
	render,
	...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"fui:flex fui:h-8 fui:shrink-0 fui:items-center fui:rounded-md fui:px-3 fui:text-xs fui:font-medium fui:text-sidebar-foreground/70 fui:ring-sidebar-ring fui:outline-hidden fui:transition-[margin,opacity] fui:duration-200 fui:ease-linear fui:group-data-[collapsible=icon]:-mt-8 fui:group-data-[collapsible=icon]:opacity-0 fui:focus-visible:ring-2 fui:[&>svg]:size-4 fui:[&>svg]:shrink-0",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label",
		},
	});
}

function SidebarGroupAction({
	className,
	render,
	...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"fui:absolute fui:top-3.5 fui:right-3 fui:flex fui:aspect-square fui:w-5 fui:items-center fui:justify-center fui:rounded-md fui:p-0 fui:text-sidebar-foreground fui:ring-sidebar-ring fui:outline-hidden fui:transition-transform fui:group-data-[collapsible=icon]:hidden fui:after:absolute fui:after:-inset-2 fui:hover:bg-sidebar-accent fui:hover:text-sidebar-accent-foreground fui:focus-visible:ring-2 fui:md:after:hidden fui:[&>svg]:size-4 fui:[&>svg]:shrink-0",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-group-action",
			sidebar: "group-action",
		},
	});
}

function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("fui:w-full fui:text-sm", className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn(
				"fui:flex fui:w-full fui:min-w-0 fui:flex-col fui:gap-1",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("fui:group/menu-item fui:relative", className)}
			{...props}
		/>
	);
}

const sidebarMenuButtonVariants = cva(
	"fui:peer/menu-button fui:group/menu-button fui:flex fui:w-full fui:items-center fui:gap-2 fui:overflow-hidden fui:rounded-lg fui:px-3 fui:py-2 fui:text-left fui:text-sm fui:ring-sidebar-ring fui:outline-hidden fui:transition-[width,height,padding] fui:group-has-data-[sidebar=menu-action]/menu-item:pr-8 fui:group-data-[collapsible=icon]:size-8! fui:group-data-[collapsible=icon]:p-2! fui:hover:bg-sidebar-accent fui:hover:text-sidebar-accent-foreground fui:focus-visible:ring-2 fui:active:bg-sidebar-accent fui:active:text-sidebar-accent-foreground fui:disabled:pointer-events-none fui:disabled:opacity-50 fui:aria-disabled:pointer-events-none fui:aria-disabled:opacity-50 fui:data-open:hover:bg-sidebar-accent fui:data-open:hover:text-sidebar-accent-foreground fui:data-active:bg-sidebar-accent fui:data-active:font-medium fui:data-active:text-sidebar-accent-foreground fui:[&_svg]:size-4 fui:[&_svg]:shrink-0 fui:[&>span:last-child]:truncate",
	{
		variants: {
			variant: {
				default:
					"fui:hover:bg-sidebar-accent fui:hover:text-sidebar-accent-foreground",
				outline:
					"fui:bg-background fui:shadow-[0_0_0_1px_var(--sidebar-border)] fui:hover:bg-sidebar-accent fui:hover:text-sidebar-accent-foreground fui:hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
			},
			size: {
				default: "fui:h-9 fui:text-sm",
				sm: "fui:h-8 fui:text-xs",
				lg: "fui:h-14 fui:px-3 fui:text-sm fui:group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function SidebarMenuButton({
	render,
	isActive = false,
	variant = "default",
	size = "default",
	tooltip,
	className,
	...props
}: useRender.ComponentProps<"button"> &
	React.ComponentProps<"button"> & {
		isActive?: boolean;
		tooltip?: string | React.ComponentProps<typeof TooltipContent>;
	} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(sidebarMenuButtonVariants({ variant, size }), className),
			},
			props,
		),
		render: !tooltip ? render : <TooltipTrigger render={render} />,
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive,
		},
	});

	if (!tooltip) {
		return comp;
	}

	if (typeof tooltip === "string") {
		tooltip = {
			children: tooltip,
		};
	}

	return (
		<Tooltip>
			{comp}
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	);
}

function SidebarMenuAction({
	className,
	render,
	showOnHover = false,
	...props
}: useRender.ComponentProps<"button"> &
	React.ComponentProps<"button"> & {
		showOnHover?: boolean;
	}) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"fui:absolute fui:top-1.5 fui:right-1 fui:flex fui:aspect-square fui:w-5 fui:items-center fui:justify-center fui:rounded-md fui:p-0 fui:text-sidebar-foreground fui:ring-sidebar-ring fui:outline-hidden fui:transition-transform fui:group-data-[collapsible=icon]:hidden fui:peer-hover/menu-button:text-sidebar-accent-foreground fui:peer-data-[size=default]/menu-button:top-2 fui:peer-data-[size=lg]/menu-button:top-2.5 fui:peer-data-[size=sm]/menu-button:top-1 fui:after:absolute fui:after:-inset-2 fui:hover:bg-sidebar-accent fui:hover:text-sidebar-accent-foreground fui:focus-visible:ring-2 fui:md:after:hidden fui:[&>svg]:size-4 fui:[&>svg]:shrink-0",
					showOnHover &&
						"group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-menu-action",
			sidebar: "menu-action",
		},
	});
}

function SidebarMenuBadge({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				"fui:pointer-events-none fui:absolute fui:right-1 fui:flex fui:h-5 fui:min-w-5 fui:items-center fui:justify-center fui:rounded-md fui:px-1 fui:text-xs fui:font-medium fui:text-sidebar-foreground fui:tabular-nums fui:select-none fui:group-data-[collapsible=icon]:hidden fui:peer-hover/menu-button:text-sidebar-accent-foreground fui:peer-data-[size=default]/menu-button:top-1.5 fui:peer-data-[size=lg]/menu-button:top-2.5 fui:peer-data-[size=sm]/menu-button:top-1 fui:peer-data-active/menu-button:text-sidebar-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: React.ComponentProps<"div"> & {
	showIcon?: boolean;
}) {
	// Random width between 50 to 90%.
	const [width] = React.useState(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	});

	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn(
				"fui:flex fui:h-8 fui:items-center fui:gap-2 fui:rounded-md fui:px-2",
				className,
			)}
			{...props}
		>
			{showIcon && (
				<Skeleton
					className="fui:size-4 fui:rounded-md"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="fui:h-4 fui:max-w-(--skeleton-width) fui:flex-1"
				data-sidebar="menu-skeleton-text"
				style={
					{
						"--skeleton-width": width,
					} as React.CSSProperties
				}
			/>
		</div>
	);
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn(
				"fui:mx-3.5 fui:flex fui:min-w-0 fui:translate-x-px fui:flex-col fui:gap-1 fui:border-l fui:border-sidebar-border fui:px-2.5 fui:py-0.5 fui:group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarMenuSubItem({
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-sub-item"
			data-sidebar="menu-sub-item"
			className={cn("fui:group/menu-sub-item fui:relative", className)}
			{...props}
		/>
	);
}

function SidebarMenuSubButton({
	render,
	size = "md",
	isActive = false,
	className,
	...props
}: useRender.ComponentProps<"a"> &
	React.ComponentProps<"a"> & {
		size?: "sm" | "md";
		isActive?: boolean;
	}) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps<"a">(
			{
				className: cn(
					"fui:flex fui:h-7 fui:min-w-0 fui:-translate-x-px fui:items-center fui:gap-2 fui:overflow-hidden fui:rounded-md fui:px-2 fui:text-sidebar-foreground fui:ring-sidebar-ring fui:outline-hidden fui:group-data-[collapsible=icon]:hidden fui:hover:bg-sidebar-accent fui:hover:text-sidebar-accent-foreground fui:focus-visible:ring-2 fui:active:bg-sidebar-accent fui:active:text-sidebar-accent-foreground fui:disabled:pointer-events-none fui:disabled:opacity-50 fui:aria-disabled:pointer-events-none fui:aria-disabled:opacity-50 fui:data-[size=md]:text-sm fui:data-[size=sm]:text-xs fui:data-active:bg-sidebar-accent fui:data-active:text-sidebar-accent-foreground fui:[&>span:last-child]:truncate fui:[&>svg]:size-4 fui:[&>svg]:shrink-0 fui:[&>svg]:text-sidebar-accent-foreground",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "sidebar-menu-sub-button",
			sidebar: "menu-sub-button",
			size,
			active: isActive,
		},
	});
}

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
