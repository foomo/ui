import {
	CaretRightIcon,
	ClockCounterClockwiseIcon,
	CloudArrowUpIcon,
	FileSearchIcon,
	FoldersIcon,
	GaugeIcon,
	GearIcon,
	type Icon,
	ImageIcon,
	LinkIcon,
	MegaphoneIcon,
	MonitorIcon,
	MoonIcon,
	NetworkIcon,
	PercentIcon,
	ScalesIcon,
	SealPercentIcon,
	ShapesIcon,
	ShoppingCartIcon,
	SquaresFourIcon,
	StackIcon,
	SunIcon,
	TagIcon,
	TrademarkIcon,
	UserIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import * as React from "react";

import { Avatar, AvatarFallback } from "../components/avatar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../components/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "../components/sidebar";
import ImageFoomo from "./assets/foomo.png";

/**
 * Shared by the Sidebar story and the Admin Dashboard showcase. Lives beside
 * the stories rather than in `components`, so it is not part of the package.
 *
 * The toolbox's left navigation, rebuilt for Storybook from its app shell:
 * the same tree, the same nesting rules, but local state in place of the
 * router, so clicking an entry marks it active.
 */

type NavigationItem = {
	name: string;
	to: string;
	icon: Icon;
	children?: NavigationItem[];
	/**
	 * Indented as though it sat under the entry above, while staying a
	 * sibling. Real nesting would turn the parent into an accordion that is no
	 * longer a link, so this only changes how the item looks.
	 */
	nested?: boolean;
};

const navigation: NavigationItem[] = [
	{ name: "Dashboard", to: "/", icon: GaugeIcon },
	{ name: "Price", to: "/price", icon: PercentIcon },
	{
		name: "Catalogue",
		to: "/catalogue",
		icon: SquaresFourIcon,
		children: [
			{ name: "Products", to: "/catalogue/products", icon: StackIcon },
			{ name: "Import Errors", to: "/catalogue/errors", icon: WarningIcon },
			{ name: "Media assets", to: "/catalogue/media-assets", icon: ImageIcon },
			{ name: "Attributes", to: "/catalogue/attributes", icon: ShapesIcon },
			{ name: "Brands", to: "/catalogue/brands", icon: TrademarkIcon },
			{ name: "Categories", to: "/catalogue/categories", icon: FoldersIcon },
			{ name: "Taxonomy", to: "/catalogue/taxonomy", icon: NetworkIcon },
		],
	},
	{
		name: "Promotions",
		to: "/promotions",
		icon: MegaphoneIcon,
		children: [
			{ name: "Campaigns", to: "/promotions/campaigns", icon: TagIcon },
			{
				name: "Discounts",
				to: "/promotions/discounts",
				icon: SealPercentIcon,
				nested: true,
			},
			{
				name: "Shop price rules",
				to: "/promotions/price-rules",
				icon: ScalesIcon,
			},
			{
				name: "History",
				to: "/promotions/history",
				icon: ClockCounterClockwiseIcon,
			},
		],
	},
	{ name: "Orders", to: "/orders", icon: ShoppingCartIcon },
	{ name: "Customers", to: "/customers", icon: UserIcon },
	{ name: "Redirects", to: "/redirects", icon: LinkIcon },
	{ name: "Audit Log", to: "/auditlog", icon: FileSearchIcon },
	{ name: "Content Export", to: "/content-export", icon: CloudArrowUpIcon },
	{ name: "Settings", to: "/settings", icon: GearIcon },
];

const themes = [
	{ value: "light", label: "Light", Icon: SunIcon },
	{ value: "dark", label: "Dark", Icon: MoonIcon },
	{ value: "system", label: "System", Icon: MonitorIcon },
] as const;

/** Exact for `/`, prefix otherwise, as the toolbox matches routes. */
function isActive(to: string, path: string) {
	return to === "/" ? path === "/" : path.startsWith(to);
}

/** The labels on the way to `path`, for the breadcrumb. */
function trail(path: string): string[] {
	for (const item of navigation) {
		if (item.to === path) return [item.name];
		const child = item.children?.find((entry) => entry.to === path);
		if (child) return [item.name, child.name];
	}
	return [];
}

type NavigateProps = { path: string; onNavigate: (path: string) => void };

function NavItem({
	item,
	path,
	onNavigate,
}: NavigateProps & { item: NavigationItem }) {
	const active = isActive(item.to, path);

	if (!item.children?.length) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton
					isActive={active}
					tooltip={item.name}
					onClick={() => onNavigate(item.to)}
					// Dropped while collapsed to icons, where an indent would push the
					// icon off its rail.
					className={
						item.nested
							? "fui:ml-4 fui:border-l fui:pl-2 fui:group-data-[collapsible=icon]:ml-0 fui:group-data-[collapsible=icon]:border-l-0 fui:group-data-[collapsible=icon]:pl-2"
							: undefined
					}
				>
					<item.icon />
					<span>{item.name}</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	return (
		<Collapsible defaultOpen={active} className="fui:group/collapsible">
			<SidebarMenuItem>
				<CollapsibleTrigger
					render={
						<SidebarMenuButton isActive={active} tooltip={item.name}>
							<item.icon />
							<span>{item.name}</span>
							<CaretRightIcon className="fui:ml-auto fui:size-4 fui:transition-transform fui:duration-200 fui:group-data-open/collapsible:rotate-90" />
						</SidebarMenuButton>
					}
				/>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.children.map((child) => (
							<SidebarMenuSubItem key={child.to}>
								<SidebarMenuSubButton
									isActive={path.startsWith(child.to)}
									render={<button type="button" />}
									onClick={() => onNavigate(child.to)}
									// The sub-menu already draws a rail, so a nested child is
									// indented against it rather than given a second border.
									className={child.nested ? "fui:ml-3" : undefined}
								>
									<child.icon />
									<span>{child.name}</span>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}

function UserMenu() {
	const [theme, setTheme] = React.useState<string>("system");
	const ThemeIcon =
		themes.find((entry) => entry.value === theme)?.Icon ?? MonitorIcon;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton size="lg" tooltip="Account and appearance">
								<Avatar>
									<AvatarFallback>MM</AvatarFallback>
								</Avatar>
								<div className="fui:grid fui:flex-1 fui:text-left fui:text-sm fui:leading-tight">
									<span className="fui:truncate fui:font-medium">
										Maxi Muster
									</span>
									<span className="fui:truncate fui:text-xs fui:text-sidebar-foreground/70">
										pricing, catalogue
									</span>
								</div>
								<ThemeIcon className="fui:ml-auto fui:size-4" />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent side="top" align="start" className="fui:w-56">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Maxi Muster</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel>Appearance</DropdownMenuLabel>
							{/* In the toolbox this drives the colour scheme; here it only
							    shows the choice. Storybook's toolbar switches the theme. */}
							<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
								{themes.map(({ value, label, Icon: ItemIcon }) => (
									<DropdownMenuRadioItem key={value} value={value}>
										<ItemIcon />
										{label}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function ToolboxSidebar({
	path,
	onNavigate,
	loading,
}: NavigateProps & { loading: boolean }) {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							tooltip="bestbytes toolbox"
							onClick={() => onNavigate("/")}
						>
							{/* The mark sits on the sidebar's surface rather than in a
							    filled tile, so it does not read as a second badge. */}
							<img
								src={ImageFoomo}
								alt=""
								className="fui:size-8 fui:shrink-0 fui:rounded-lg"
							/>
							<div className="fui:grid fui:flex-1 fui:text-left fui:text-sm fui:leading-tight">
								<span className="fui:truncate fui:font-medium">
									bestbytes toolbox
								</span>
								<span className="fui:truncate fui:text-xs fui:text-sidebar-foreground/70">
									manor
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarMenu>
						{/* The toolbox filters the menu by the operator's access, so it
						    is empty until that loads. Skeleton rows hold its place. */}
						{loading
							? Array.from({ length: 6 }, (_, index) => (
									// Placeholders with nothing to tell them apart but position.
									// biome-ignore lint/suspicious/noArrayIndexKey: static list
									<SidebarMenuItem key={index}>
										<SidebarMenuSkeleton showIcon />
									</SidebarMenuItem>
								))
							: navigation.map((item) => (
									<NavItem
										key={item.to}
										item={item}
										path={path}
										onNavigate={onNavigate}
									/>
								))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<UserMenu />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}

export { ToolboxSidebar, trail };
