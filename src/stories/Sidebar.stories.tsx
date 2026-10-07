import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../components/breadcrumb";
import { Separator } from "../components/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "../components/sidebar";
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
			<SidebarProvider defaultOpen={open}>
				<ToolboxSidebar path={path} onNavigate={setPath} loading={loading} />
				<SidebarInset className="fui:min-w-0">
					<header className="fui:sticky fui:top-0 fui:z-10 fui:flex fui:h-16 fui:shrink-0 fui:items-center fui:gap-2 fui:border-b fui:bg-background/80 fui:px-4 fui:backdrop-blur">
						<SidebarTrigger className="fui:-ml-1" />
						<Separator
							orientation="vertical"
							className="fui:mr-2 fui:h-4 fui:self-center!"
						/>
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
					</header>
					<div className="fui:flex fui:flex-1 fui:flex-col fui:gap-4 fui:p-4 fui:md:p-6">
						<div className="fui:flex fui:min-h-80 fui:flex-1 fui:items-center fui:justify-center fui:rounded-xl fui:border fui:border-dashed fui:text-sm fui:text-muted-foreground">
							{crumbs.at(-1)} page
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
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
					'The left navigation of the toolbox, built from `Sidebar`: a brand entry, one "Platform" group of links, sections that open into a sub-menu (Catalogue, Promotions), and the signed-in user with the colour-scheme picker at the bottom. An entry can be indented under the one above without becoming its child (Discounts under Campaigns). The sidebar collapses to icons with the button in the header or the rail on its edge, and shows skeleton rows while the menu loads.',
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
