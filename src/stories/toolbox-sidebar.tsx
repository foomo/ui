import {
	ClockCounterClockwiseIcon,
	CloudArrowUpIcon,
	FileSearchIcon,
	FoldersIcon,
	GaugeIcon,
	GearIcon,
	ImageIcon,
	LinkIcon,
	MegaphoneIcon,
	NetworkIcon,
	PercentIcon,
	ScalesIcon,
	SealPercentIcon,
	ShapesIcon,
	ShoppingCartIcon,
	SquaresFourIcon,
	StackIcon,
	TagIcon,
	TrademarkIcon,
	UserIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import {
	AppSidebar,
	SidebarBrand,
	SidebarNav,
	type SidebarNavItem,
	SidebarUserMenu,
} from "../components/app-shell";
import { ThemeIcon, ThemeMenuGroup } from "../components/theme-menu";
import ImageFoomo from "./assets/foomo.png";

/**
 * Shared by the Sidebar story and the Admin Dashboard showcase. Lives beside
 * the stories rather than in `components`, so it is not part of the package.
 *
 * The toolbox's left navigation, rebuilt for Storybook from the same
 * components the toolbox uses (`AppSidebar`, `SidebarBrand`, `SidebarNav`,
 * `SidebarUserMenu`): the same tree and nesting rules, but local state in
 * place of the router, so clicking an entry marks it active.
 */

const navigation: SidebarNavItem[] = [
	{ name: "Dashboard", href: "/", icon: GaugeIcon },
	{ name: "Price", href: "/price", icon: PercentIcon },
	{
		name: "Catalogue",
		href: "/catalogue",
		icon: SquaresFourIcon,
		children: [
			{ name: "Products", href: "/catalogue/products", icon: StackIcon },
			{ name: "Import Errors", href: "/catalogue/errors", icon: WarningIcon },
			{
				name: "Media assets",
				href: "/catalogue/media-assets",
				icon: ImageIcon,
			},
			{ name: "Attributes", href: "/catalogue/attributes", icon: ShapesIcon },
			{ name: "Brands", href: "/catalogue/brands", icon: TrademarkIcon },
			{ name: "Categories", href: "/catalogue/categories", icon: FoldersIcon },
			{ name: "Taxonomy", href: "/catalogue/taxonomy", icon: NetworkIcon },
		],
	},
	{
		name: "Promotions",
		href: "/promotions",
		icon: MegaphoneIcon,
		children: [
			{ name: "Campaigns", href: "/promotions/campaigns", icon: TagIcon },
			{
				name: "Discounts",
				href: "/promotions/discounts",
				icon: SealPercentIcon,
				nested: true,
			},
			{
				name: "Shop price rules",
				href: "/promotions/price-rules",
				icon: ScalesIcon,
			},
			{
				name: "History",
				href: "/promotions/history",
				icon: ClockCounterClockwiseIcon,
			},
		],
	},
	{ name: "Orders", href: "/orders", icon: ShoppingCartIcon },
	{ name: "Customers", href: "/customers", icon: UserIcon },
	{ name: "Redirects", href: "/redirects", icon: LinkIcon },
	{ name: "Audit Log", href: "/auditlog", icon: FileSearchIcon },
	{ name: "Content Export", href: "/content-export", icon: CloudArrowUpIcon },
	{ name: "Settings", href: "/settings", icon: GearIcon },
];

/** The labels on the way to `path`, for the breadcrumb. */
function trail(path: string): string[] {
	for (const item of navigation) {
		if (item.href === path) return [item.name];
		const child = item.children?.find((entry) => entry.href === path);
		if (child) return [item.name, child.name];
	}
	return [];
}

type NavigateProps = { path: string; onNavigate: (path: string) => void };

function ToolboxSidebar({
	path,
	onNavigate,
	loading,
}: NavigateProps & { loading: boolean }) {
	return (
		<AppSidebar
			brand={
				<SidebarBrand
					logo={ImageFoomo}
					title="bestbytes toolbox"
					subtitle="manor"
					render={<button type="button" onClick={() => onNavigate("/")} />}
				/>
			}
			footer={
				<SidebarUserMenu
					name="Maxi Muster"
					subtitle="pricing, catalogue"
					initials="MM"
					tooltip="Account and appearance"
					trailingIcon={ThemeIcon}
				>
					{/* In the toolbox this drives the colour scheme through
					    next-themes; Storybook's toolbar switches the theme here. */}
					<ThemeMenuGroup />
				</SidebarUserMenu>
			}
		>
			{/* The toolbox filters the menu by the operator's access, so it is
			    empty until that loads. Skeleton rows hold its place. */}
			<SidebarNav
				label="Platform"
				items={navigation}
				currentPath={path}
				loading={loading}
				renderLink={(item) => (
					<button type="button" onClick={() => onNavigate(item.href)} />
				)}
			/>
		</AppSidebar>
	);
}

export { ToolboxSidebar, trail };
