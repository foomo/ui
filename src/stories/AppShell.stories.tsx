import {
	ChartBarIcon,
	GaugeIcon,
	GearIcon,
	ReceiptIcon,
	ShoppingCartIcon,
	TruckIcon,
	UserIcon,
	UsersThreeIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
	AppHeader,
	AppShell,
	AppSidebar,
	SidebarBrand,
	SidebarNav,
	type SidebarNavItem,
	SidebarUserMenu,
} from "../components/app-shell";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "../components/breadcrumb";
import { PageHeader } from "../components/page-header";
import {
	ThemeIcon,
	ThemeMenuGroup,
	ThemeMenuItems,
} from "../components/theme-menu";
import { TooltipProvider } from "../components/tooltip";
import ImageFoomo from "./assets/foomo.png";

/**
 * A made-up shop back office, so the frame reads as reusable rather than as
 * the toolbox (Navigation / Sidebar shows the toolbox's own menu).
 */
const navigation: SidebarNavItem[] = [
	{ name: "Overview", href: "/", icon: GaugeIcon },
	{
		name: "Orders",
		href: "/orders",
		icon: ShoppingCartIcon,
		children: [
			{ name: "All orders", href: "/orders/all", icon: ReceiptIcon },
			{ name: "Shipments", href: "/orders/shipments", icon: TruckIcon },
		],
	},
	{ name: "Customers", href: "/customers", icon: UsersThreeIcon },
	{ name: "Segments", href: "/segments", icon: UserIcon, nested: true },
	{ name: "Reports", href: "/reports", icon: ChartBarIcon },
	{ name: "Settings", href: "/settings", icon: GearIcon },
];

/** The entry `path` belongs to, for the header and the page title. */
function pageName(path: string) {
	for (const item of navigation) {
		const child = item.children?.find((entry) => path.startsWith(entry.href));
		if (child) return child.name;
		if (item.href === path) return item.name;
	}
	return "Overview";
}

function BackOffice({
	initialPath = "/orders/all",
	open = true,
	loading = false,
}: {
	initialPath?: string;
	open?: boolean;
	loading?: boolean;
}) {
	const [path, setPath] = React.useState(initialPath);
	const page = pageName(path);

	return (
		<TooltipProvider>
			<AppShell
				defaultOpen={open}
				sidebar={
					<AppSidebar
						brand={
							<SidebarBrand
								logo={ImageFoomo}
								title="Acme back office"
								subtitle="Production"
								render={<button type="button" onClick={() => setPath("/")} />}
							/>
						}
						footer={
							<SidebarUserMenu
								name="Alex Doe"
								subtitle="Administrator"
								initials="AD"
								tooltip="Account and appearance"
								trailingIcon={ThemeIcon}
							>
								<ThemeMenuGroup />
							</SidebarUserMenu>
						}
					>
						<SidebarNav
							label="Menu"
							items={navigation}
							currentPath={path}
							loading={loading}
							renderLink={(item) => (
								<button type="button" onClick={() => setPath(item.href)} />
							)}
						/>
					</AppSidebar>
				}
				header={
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>{page}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				}
			>
				<PageHeader title={page} description="Placeholder content." />
				<div className="fui:flex fui:min-h-80 fui:flex-1 fui:items-center fui:justify-center fui:rounded-xl fui:border fui:border-dashed fui:text-sm fui:text-muted-foreground">
					{page} page
				</div>
			</AppShell>
		</TooltipProvider>
	);
}

const meta = {
	title: "Navigation/App Shell",
	component: BackOffice,
	subcomponents: {
		AppShell,
		AppHeader,
		AppSidebar,
		SidebarBrand,
		SidebarNav,
		SidebarUserMenu,
		ThemeMenuGroup,
		ThemeMenuItems,
		ThemeIcon,
	},
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"The frame of an application, from `@foomo/ui/components/app-shell` and `theme-menu`, free of any router. `AppShell` lays out the sidebar, the sticky `AppHeader` (collapse button, then breadcrumbs or other content) and a padded content column. `AppSidebar` collapses to icons and holds `SidebarBrand` at the top, a `SidebarNav` (sections, `nested` entries, the active page from `currentPath`, `loading` skeleton rows) and `SidebarUserMenu` at the bottom, here with the `ThemeMenuGroup` colour-scheme picker and `ThemeIcon`. Links come in through `renderLink`, e.g. `(item) => <Link to={item.href} />`. The colour scheme follows next-themes' `ThemeProvider`; in Storybook the toolbar switches it.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		initialPath: {
			control: "select",
			options: navigation.flatMap((item) =>
				item.children ? item.children.map((child) => child.href) : [item.href],
			),
		},
	},
	args: {
		initialPath: "/orders/all",
		open: true,
		loading: false,
	},
} satisfies Meta<typeof BackOffice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
	args: { open: false },
};

export const LoadingNavigation: Story = {
	name: "Loading navigation",
	args: { loading: true },
};
