import { CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Avatar, AvatarFallback } from "@/components/avatar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Separator } from "@/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/components/sidebar";

type IconComponent = React.ComponentType<{ className?: string }>;

function AppShell({
	sidebar,
	header,
	defaultOpen,
	className,
	children,
}: {
	sidebar: React.ReactNode;
	header?: React.ReactNode;
	defaultOpen?: boolean;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			{sidebar}
			<SidebarInset className={className}>
				<AppHeader>{header}</AppHeader>
				<div
					data-slot="app-content"
					className="fui:flex fui:flex-1 fui:flex-col fui:gap-4 fui:p-4 fui:md:p-6"
				>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

function AppHeader({
	className,
	children,
	...props
}: React.ComponentProps<"header">) {
	return (
		<header
			data-slot="app-header"
			className={cn(
				"fui:sticky fui:top-0 fui:z-10 fui:flex fui:h-16 fui:shrink-0 fui:items-center fui:gap-2 fui:border-b fui:bg-background/80 fui:px-4 fui:backdrop-blur",
				className,
			)}
			{...props}
		>
			<SidebarTrigger className="fui:-ml-1" />
			<Separator
				orientation="vertical"
				className="fui:mr-2 fui:h-4 fui:self-center!"
			/>
			{children}
		</header>
	);
}

function AppSidebar({
	brand,
	footer,
	children,
	...props
}: React.ComponentProps<typeof Sidebar> & {
	brand?: React.ReactNode;
	footer?: React.ReactNode;
}) {
	return (
		<Sidebar collapsible="icon" variant="inset" {...props}>
			{brand ? <SidebarHeader>{brand}</SidebarHeader> : null}
			<SidebarContent>{children}</SidebarContent>
			{footer ? <SidebarFooter>{footer}</SidebarFooter> : null}
			<SidebarRail />
		</Sidebar>
	);
}

/** A string `logo` is used as an image URL. */
function SidebarBrand({
	logo,
	title,
	subtitle,
	tooltip,
	render,
}: {
	logo?: React.ReactNode;
	title: string;
	subtitle?: React.ReactNode;
	tooltip?: string;
	render?: React.ReactElement;
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" tooltip={tooltip ?? title} render={render}>
					{typeof logo === "string" ? (
						<img
							src={logo}
							alt=""
							className="fui:size-8 fui:shrink-0 fui:rounded-lg"
						/>
					) : (
						logo
					)}
					<div className="fui:grid fui:flex-1 fui:text-left fui:text-sm fui:leading-tight">
						<span className="fui:truncate fui:font-medium">{title}</span>
						{subtitle ? (
							<span className="fui:truncate fui:text-xs fui:text-sidebar-foreground/70">
								{subtitle}
							</span>
						) : null}
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

type SidebarNavItem = {
	name: string;
	href: string;
	icon: IconComponent;
	children?: SidebarNavItem[];
	/** Indents the entry under the one above while keeping both as links. */
	nested?: boolean;
};

/** Matches `href` and its descendants by path segment; `/` matches only itself. */
function isNavItemActive(href: string, currentPath: string) {
	if (href === "/") return currentPath === "/";
	return currentPath === href || currentPath.startsWith(`${href}/`);
}

/** Sections start open when they hold the current page. */
function SidebarNav({
	items,
	renderLink,
	currentPath,
	isActive,
	label,
	loading = false,
	skeletonCount = 6,
	className,
}: {
	items: ReadonlyArray<SidebarNavItem>;
	renderLink: (item: SidebarNavItem) => React.ReactElement;
	currentPath?: string;
	isActive?: (item: SidebarNavItem) => boolean;
	label?: React.ReactNode;
	loading?: boolean;
	skeletonCount?: number;
	className?: string;
}) {
	const active = (item: SidebarNavItem, parent?: SidebarNavItem) => {
		if (isActive) return isActive(item);
		if (currentPath === undefined) return false;
		// A sub-entry on its section's path is the overview: active on exact match only.
		if (parent && item.href === parent.href) return currentPath === item.href;
		return isNavItemActive(item.href, currentPath);
	};

	return (
		<SidebarGroup className={className}>
			{label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
			<SidebarMenu>
				{loading
					? Array.from({ length: skeletonCount }, (_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static list
							<SidebarMenuItem key={index}>
								<SidebarMenuSkeleton showIcon />
							</SidebarMenuItem>
						))
					: items.map((item) => (
							<SidebarNavEntry
								key={item.href}
								item={item}
								active={active}
								renderLink={renderLink}
							/>
						))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

function SidebarNavEntry({
	item,
	active,
	renderLink,
}: {
	item: SidebarNavItem;
	active: (item: SidebarNavItem, parent?: SidebarNavItem) => boolean;
	renderLink: (item: SidebarNavItem) => React.ReactElement;
}) {
	const Icon = item.icon;
	const isActive = active(item);

	if (!item.children?.length) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton
					isActive={isActive}
					tooltip={item.name}
					render={renderLink(item)}
					// No indent when collapsed to icons: it would push the icon off its rail.
					className={
						item.nested
							? "fui:ml-4 fui:border-l fui:pl-2 fui:group-data-[collapsible=icon]:ml-0 fui:group-data-[collapsible=icon]:border-l-0 fui:group-data-[collapsible=icon]:pl-2"
							: undefined
					}
				>
					<Icon />
					<span>{item.name}</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	return (
		<Collapsible defaultOpen={isActive} className="fui:group/collapsible">
			<SidebarMenuItem>
				<CollapsibleTrigger
					render={
						<SidebarMenuButton isActive={isActive} tooltip={item.name}>
							<Icon />
							<span>{item.name}</span>
							<CaretRightIcon className="fui:ml-auto fui:size-4 fui:transition-transform fui:duration-200 fui:group-data-open/collapsible:rotate-90" />
						</SidebarMenuButton>
					}
				/>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.children.map((child) => {
							const ChildIcon = child.icon;
							return (
								<SidebarMenuSubItem key={child.href}>
									<SidebarMenuSubButton
										isActive={active(child, item)}
										render={renderLink(child)}
										// The sub-menu already draws a rail, so no second border.
										className={child.nested ? "fui:ml-3" : undefined}
									>
										<ChildIcon />
										<span>{child.name}</span>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							);
						})}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}

function SidebarUserMenu({
	name,
	subtitle,
	initials,
	label,
	tooltip = "Account",
	trailingIcon: TrailingIcon,
	children,
}: {
	name: string;
	subtitle?: React.ReactNode;
	initials: string;
	label?: React.ReactNode;
	tooltip?: string;
	trailingIcon?: IconComponent;
	children?: React.ReactNode;
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton size="lg" tooltip={tooltip}>
								<Avatar className="fui:size-8 fui:rounded-lg">
									<AvatarFallback className="fui:rounded-lg">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="fui:grid fui:flex-1 fui:text-left fui:text-sm fui:leading-tight">
									<span className="fui:truncate fui:font-medium">{name}</span>
									{subtitle ? (
										<span className="fui:truncate fui:text-xs fui:text-sidebar-foreground/70">
											{subtitle}
										</span>
									) : null}
								</div>
								{TrailingIcon ? (
									<TrailingIcon className="fui:ml-auto fui:size-4" />
								) : null}
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent side="top" align="start" className="fui:w-56">
						<DropdownMenuGroup>
							<DropdownMenuLabel>{label ?? name}</DropdownMenuLabel>
						</DropdownMenuGroup>
						{children ? (
							<>
								<DropdownMenuSeparator />
								{children}
							</>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export {
	AppHeader,
	AppShell,
	AppSidebar,
	isNavItemActive,
	SidebarBrand,
	SidebarNav,
	type SidebarNavItem,
	SidebarUserMenu,
};
