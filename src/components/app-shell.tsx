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

/**
 * The frame of an application: a collapsible sidebar on the left, and a
 * sticky header above the page content on the right.
 *
 * Built from `Sidebar` and kept free of any router: links come in through
 * `renderLink` (or a `render` element) and the current page through
 * `currentPath`, so the same frame works with TanStack Router, Next.js or
 * plain anchors.
 */

type IconComponent = React.ComponentType<{ className?: string }>;

/**
 * The whole frame: provider, sidebar, header and a padded content column.
 *
 * `sidebar` is usually an {@link AppSidebar}; `header` is what sits in the
 * header after the collapse button, typically breadcrumbs.
 */
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

/**
 * The bar above the page: the sidebar's collapse button, a divider, then
 * `children`. Sticky, with the page showing blurred through it on scroll.
 */
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

/**
 * The application's sidebar: an inset sidebar that collapses to icons, with
 * `brand` at the top, `children` (usually a {@link SidebarNav}) in the middle
 * and `footer` (usually a {@link SidebarUserMenu}) at the bottom. A rail on
 * its edge toggles it too.
 */
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

/**
 * The application's mark and name at the top of the sidebar.
 *
 * `logo` is an image URL or a node. The mark sits on the sidebar's surface
 * rather than in a filled tile: a coloured logo on a filled square reads as
 * two competing badges. Pass `render` (e.g. a router link to the home page) to
 * make the entry navigate.
 */
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

/** One entry of a {@link SidebarNav}. */
type SidebarNavItem = {
	name: string;
	href: string;
	icon: IconComponent;
	/** Turns the entry into a section that opens into a sub-menu. */
	children?: SidebarNavItem[];
	/**
	 * Indents the entry as though it sat under the one above, while it stays a
	 * sibling. Real nesting would turn the entry above into a section, which is
	 * no longer a link; this only changes how the entry looks.
	 */
	nested?: boolean;
};

/**
 * Whether `href` is the current page or one of its descendants: exact for
 * `/`, which every path would otherwise match, by path segment otherwise.
 */
function isNavItemActive(href: string, currentPath: string) {
	if (href === "/") return currentPath === "/";
	return currentPath === href || currentPath.startsWith(`${href}/`);
}

/**
 * The navigation tree, as one sidebar group.
 *
 * An entry with `children` is a section that opens into a sub-menu, and starts
 * open when it holds the current page. `currentPath` marks the active entry
 * (see {@link isNavItemActive}); pass `isActive` for a different rule.
 * `renderLink` turns an entry into the router's own link, e.g.
 * `(item) => <Link to={item.href} />`.
 *
 * `loading` shows skeleton rows in place of the entries, for a menu that is
 * filtered by data still on its way, so the sidebar does not collapse to
 * nothing on first paint.
 */
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
		// A sub-entry sharing its section's path is that section's overview
		// page, so it is only active on that exact page.
		if (parent && item.href === parent.href) return currentPath === item.href;
		return isNavItemActive(item.href, currentPath);
	};

	return (
		<SidebarGroup className={className}>
			{label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
			<SidebarMenu>
				{loading
					? Array.from({ length: skeletonCount }, (_, index) => (
							// Placeholders with nothing to tell them apart but position.
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
					// The indent is dropped while collapsed to icons, where it would
					// push the icon off its rail.
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
										// The sub-menu already draws a rail, so a nested child is
										// indented against it rather than given a second border.
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

/**
 * The signed-in user at the bottom of the sidebar, opening a menu.
 *
 * The menu starts with `label` (the name, by default) and then `children`,
 * such as a `ThemeMenuGroup`. `trailingIcon` sits at the end of the entry, e.g.
 * `ThemeIcon` to show the colour scheme in use.
 */
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
