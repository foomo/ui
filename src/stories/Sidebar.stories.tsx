import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { AppShell } from "../components/app-shell";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../components/breadcrumb";
import { TooltipProvider } from "../components/tooltip";
import { ToolboxSidebar, trail } from "./toolbox-sidebar";

function ToolboxNavigation({
	initialPath = "/catalogue/products",
	open = true,
	loading = false,
}: {
	initialPath?: string;
	open?: boolean;
	loading?: boolean;
}) {
	const [path, setPath] = React.useState(initialPath);
	const crumbs = trail(path);

	return (
		<TooltipProvider>
			<AppShell
				defaultOpen={open}
				sidebar={
					<ToolboxSidebar path={path} onNavigate={setPath} loading={loading} />
				}
				header={
					<Breadcrumb>
						<BreadcrumbList>
							{crumbs.map((crumb, index) => (
								<React.Fragment key={crumb}>
									{index > 0 ? <BreadcrumbSeparator /> : null}
									<BreadcrumbItem>
										<BreadcrumbPage>{crumb}</BreadcrumbPage>
									</BreadcrumbItem>
								</React.Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				}
			>
				<div className="fui:flex fui:min-h-80 fui:flex-1 fui:items-center fui:justify-center fui:rounded-xl fui:border fui:border-dashed fui:text-sm fui:text-muted-foreground">
					{crumbs.at(-1)} page
				</div>
			</AppShell>
		</TooltipProvider>
	);
}

const meta = {
	title: "Navigation/Sidebar",
	component: ToolboxNavigation,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					'The toolbox\'s frame, built from `@foomo/ui/components/app-shell`: `AppShell` (sidebar, sticky `AppHeader` and content), `AppSidebar` with `SidebarBrand`, `SidebarNav` and `SidebarUserMenu`, and `ThemeMenuGroup` from `theme-menu`. The sidebar has a brand entry, one "Platform" group of links, sections that open into a sub-menu (Catalogue, Promotions), and the signed-in user with the colour-scheme picker at the bottom. An entry can be indented under the one above without becoming its child (Discounts under Campaigns). The sidebar collapses to icons with the button in the header or the rail on its edge, and shows skeleton rows while the menu loads.',
			},
		},
	},
	argTypes: {
		initialPath: {
			control: "select",
			options: [
				"/",
				"/price",
				"/catalogue/products",
				"/promotions/discounts",
				"/settings",
			],
		},
		open: { control: "boolean" },
		loading: { control: "boolean" },
	},
	args: {
		initialPath: "/catalogue/products",
		open: true,
		loading: false,
	},
} satisfies Meta<typeof ToolboxNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
	args: { open: false },
};

export const Loading: Story = {
	args: { loading: true },
};
