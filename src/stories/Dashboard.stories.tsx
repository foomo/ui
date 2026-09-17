import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
	BadgeCheck,
	BarChart3,
	Bell,
	Building2,
	ChevronRight,
	ChevronsUpDown,
	CircleAlert,
	Command as CommandIcon,
	CreditCard,
	DollarSign,
	Download,
	Ellipsis,
	Eye,
	FileText,
	Inbox,
	LayoutDashboard,
	LifeBuoy,
	LogOut,
	Package,
	Pencil,
	Plus,
	Rocket,
	Search,
	Send,
	Settings,
	ShoppingCart,
	Sparkles,
	Trash2,
	TrendingUp,
	Users,
} from "lucide-react";
import * as React from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
} from "recharts";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../components/alert-dialog";
import { Avatar, AvatarFallback } from "../components/avatar";
import { Badge } from "../components/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../components/breadcrumb";
import { Button } from "../components/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "../components/chart";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../components/collapsible";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "../components/command";
import {
	createDataTableColumnHelper,
	DataTable,
	DataTableColumnHeader,
	dataTableSelectColumn,
} from "../components/data-table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "../components/dropdown-menu";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../components/empty";
import { Field, FieldGroup, FieldLabel } from "../components/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../components/input-group";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "../components/item";
import { Kbd, KbdGroup } from "../components/kbd";
import { Progress } from "../components/progress";
import { ScrollArea } from "../components/scroll-area";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/select";
import { Separator } from "../components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from "../components/sidebar";
import { Skeleton } from "../components/skeleton";
import { Toaster } from "../components/sonner";
import { Switch } from "../components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Textarea } from "../components/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/tooltip";

const revenueByMonth = [
	{ month: "Jan", revenue: 18600, expenses: 11400 },
	{ month: "Feb", revenue: 30500, expenses: 14200 },
	{ month: "Mar", revenue: 23700, expenses: 12900 },
	{ month: "Apr", revenue: 27300, expenses: 16100 },
	{ month: "May", revenue: 41200, expenses: 18700 },
	{ month: "Jun", revenue: 38900, expenses: 17400 },
	{ month: "Jul", revenue: 52400, expenses: 21300 },
	{ month: "Aug", revenue: 47800, expenses: 20100 },
	{ month: "Sep", revenue: 61500, expenses: 24800 },
];

const revenueChartConfig = {
	revenue: { label: "Revenue", color: "var(--chart-2)" },
	expenses: { label: "Expenses", color: "var(--chart-4)" },
} satisfies ChartConfig;

const trafficBySource = [
	{ source: "Organic", visitors: 4820 },
	{ source: "Referral", visitors: 2140 },
	{ source: "Social", visitors: 1780 },
	{ source: "Email", visitors: 1290 },
	{ source: "Paid", visitors: 940 },
];

const trafficChartConfig = {
	visitors: { label: "Visitors", color: "var(--chart-3)" },
} satisfies ChartConfig;

type OrderStatus = "paid" | "pending" | "refunded" | "failed";

type Order = {
	id: string;
	customer: string;
	email: string;
	plan: "Starter" | "Pro" | "Enterprise";
	status: OrderStatus;
	/** ISO date so the column can sort chronologically, not alphabetically. */
	date: string;
	amount: number;
};

const orders: Order[] = [
	{
		id: "INV-2401",
		customer: "Amelie Roth",
		email: "amelie@northwind.dev",
		plan: "Enterprise",
		status: "paid",
		date: "2025-09-12",
		amount: 2400,
	},
	{
		id: "INV-2402",
		customer: "Jonas Weber",
		email: "j.weber@lumenlabs.io",
		plan: "Pro",
		status: "pending",
		date: "2025-09-12",
		amount: 149,
	},
	{
		id: "INV-2403",
		customer: "Priya Nair",
		email: "priya@ferrofoundry.com",
		plan: "Pro",
		status: "paid",
		date: "2025-09-11",
		amount: 149,
	},
	{
		id: "INV-2404",
		customer: "Marco Bianchi",
		email: "marco@atlasgrid.eu",
		plan: "Starter",
		status: "refunded",
		date: "2025-09-10",
		amount: 29,
	},
	{
		id: "INV-2405",
		customer: "Sara Lindqvist",
		email: "sara@kolmarden.se",
		plan: "Enterprise",
		status: "failed",
		date: "2025-09-09",
		amount: 2400,
	},
	{
		id: "INV-2406",
		customer: "Tobias Krause",
		email: "tobias@helioworks.de",
		plan: "Pro",
		status: "paid",
		date: "2025-09-09",
		amount: 149,
	},
	{
		id: "INV-2407",
		customer: "Yuki Tanaka",
		email: "yuki@sorabyte.jp",
		plan: "Enterprise",
		status: "paid",
		date: "2025-09-08",
		amount: 2400,
	},
	{
		id: "INV-2408",
		customer: "Nadia Haddad",
		email: "nadia@cedarpoint.ma",
		plan: "Starter",
		status: "pending",
		date: "2025-09-08",
		amount: 29,
	},
	{
		id: "INV-2409",
		customer: "Oliver Grant",
		email: "oliver@brightmoor.uk",
		plan: "Pro",
		status: "paid",
		date: "2025-09-07",
		amount: 149,
	},
	{
		id: "INV-2410",
		customer: "Elif Demir",
		email: "elif@marmaralabs.tr",
		plan: "Enterprise",
		status: "refunded",
		date: "2025-09-06",
		amount: 2400,
	},
	{
		id: "INV-2411",
		customer: "Lucas Moreau",
		email: "lucas@verrerie.fr",
		plan: "Starter",
		status: "paid",
		date: "2025-09-05",
		amount: 29,
	},
	{
		id: "INV-2412",
		customer: "Hanna Vogel",
		email: "hanna@nordlicht.at",
		plan: "Pro",
		status: "failed",
		date: "2025-09-04",
		amount: 149,
	},
];

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const shortDate = new Intl.DateTimeFormat("en-US", {
	day: "2-digit",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

const initials = (name: string) =>
	name
		.split(" ")
		.map((part) => part[0])
		.join("");

const statusVariant: Record<
	OrderStatus,
	"default" | "secondary" | "destructive" | "outline"
> = {
	paid: "default",
	pending: "secondary",
	refunded: "outline",
	failed: "destructive",
};

const recentActivity = [
	{
		name: "Amelie Roth",
		initials: "AR",
		action: "upgraded to Enterprise",
		amount: "+$2,400.00",
		time: "2m ago",
	},
	{
		name: "Jonas Weber",
		initials: "JW",
		action: "started a Pro trial",
		amount: "—",
		time: "18m ago",
	},
	{
		name: "Priya Nair",
		initials: "PN",
		action: "renewed Pro",
		amount: "+$149.00",
		time: "1h ago",
	},
	{
		name: "Marco Bianchi",
		initials: "MB",
		action: "requested a refund",
		amount: "-$29.00",
		time: "3h ago",
	},
	{
		name: "Sara Lindqvist",
		initials: "SL",
		action: "payment failed",
		amount: "$2,400.00",
		time: "5h ago",
	},
];

const stats = [
	{
		label: "Total revenue",
		value: "$342,190",
		delta: "+18.2%",
		trending: "up" as const,
		hint: "vs. previous 30 days",
		icon: DollarSign,
		progress: 78,
	},
	{
		label: "Subscriptions",
		value: "4,812",
		delta: "+9.4%",
		trending: "up" as const,
		hint: "412 new this month",
		icon: Users,
		progress: 64,
	},
	{
		label: "Active now",
		value: "1,204",
		delta: "+2.1%",
		trending: "up" as const,
		hint: "peak 1,540 at 14:00",
		icon: Activity,
		progress: 41,
	},
	{
		label: "Churn rate",
		value: "2.8%",
		delta: "-0.6%",
		trending: "down" as const,
		hint: "lowest in 6 months",
		icon: TrendingUp,
		progress: 22,
	},
];

function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<SidebarMenuButton size="lg" tooltip="Switch workspace">
										<div className="fui:flex fui:aspect-square fui:size-8 fui:items-center fui:justify-center fui:rounded-lg fui:bg-sidebar-primary fui:text-sidebar-primary-foreground">
											<Building2 className="fui:size-4" />
										</div>
										<div className="fui:grid fui:flex-1 fui:text-left fui:text-sm fui:leading-tight">
											<span className="fui:truncate fui:font-medium">
												Foomo Inc.
											</span>
											<span className="fui:truncate fui:text-xs fui:text-sidebar-foreground/70">
												Enterprise
											</span>
										</div>
										<ChevronsUpDown className="fui:ml-auto fui:size-4" />
									</SidebarMenuButton>
								}
							/>
							<DropdownMenuContent align="start" className="fui:w-56">
								<DropdownMenuGroup>
									<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
									<DropdownMenuItem>
										<Building2 />
										Foomo Inc.
										<DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Rocket />
										Skunkworks
										<DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Plus />
										New workspace
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton isActive tooltip="Dashboard">
								<LayoutDashboard />
								<span>Dashboard</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Analytics">
								<BarChart3 />
								<span>Analytics</span>
							</SidebarMenuButton>
						</SidebarMenuItem>

						<Collapsible defaultOpen className="fui:group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger
									render={
										<SidebarMenuButton tooltip="Projects">
											<Package />
											<span>Projects</span>
											<ChevronRight className="fui:ml-auto fui:size-4 fui:transition-transform fui:duration-200 fui:group-data-open/collapsible:rotate-90" />
										</SidebarMenuButton>
									}
								/>
								<CollapsibleContent>
									<SidebarMenuSub>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton href="#">
												Storefront
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton href="#">
												Checkout API
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton href="#">
												Design system
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>

						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Customers">
								<Users />
								<span>Customers</span>
							</SidebarMenuButton>
							<SidebarMenuBadge>128</SidebarMenuBadge>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Orders">
								<ShoppingCart />
								<span>Orders</span>
							</SidebarMenuButton>
							<SidebarMenuBadge>12</SidebarMenuBadge>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				<SidebarSeparator />

				<SidebarGroup>
					<SidebarGroupLabel>Workspace</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Invoices">
								<FileText />
								<span>Invoices</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Billing">
								<CreditCard />
								<span>Billing</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Settings">
								<Settings />
								<span>Settings</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="sm" tooltip="Support">
							<LifeBuoy />
							<span>Support</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<SidebarMenuButton size="lg" tooltip="Account">
										<Avatar className="fui:size-8 fui:rounded-lg">
											<AvatarFallback className="fui:rounded-lg">
												LB
											</AvatarFallback>
										</Avatar>
										<div className="fui:grid fui:flex-1 fui:text-left fui:text-sm fui:leading-tight">
											<span className="fui:truncate fui:font-medium">
												Lena Brandt
											</span>
											<span className="fui:truncate fui:text-xs fui:text-sidebar-foreground/70">
												lena@foomo.org
											</span>
										</div>
										<ChevronsUpDown className="fui:ml-auto fui:size-4" />
									</SidebarMenuButton>
								}
							/>
							<DropdownMenuContent
								side="top"
								align="start"
								className="fui:w-56"
							>
								<DropdownMenuGroup>
									<DropdownMenuLabel>My account</DropdownMenuLabel>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Sparkles />
										Upgrade to Pro
									</DropdownMenuItem>
									<DropdownMenuItem>
										<BadgeCheck />
										Account
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCard />
										Billing
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem variant="destructive">
										<LogOut />
										Log out
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}

function DashboardHeader({ onOpenCommand }: { onOpenCommand: () => void }) {
	return (
		<header className="fui:sticky fui:top-0 fui:z-10 fui:flex fui:h-16 fui:shrink-0 fui:items-center fui:gap-2 fui:border-b fui:bg-background/80 fui:px-4 fui:backdrop-blur">
			<SidebarTrigger className="fui:-ml-1" />
			<Separator
				orientation="vertical"
				className="fui:mr-2 fui:h-4 fui:self-center!"
			/>

			<Breadcrumb className="fui:hidden fui:md:block">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="#">Foomo Inc.</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="fui:ml-auto fui:flex fui:items-center fui:gap-2">
				<Button
					variant="outline"
					onClick={onOpenCommand}
					className="fui:hidden fui:w-64 fui:justify-start fui:font-normal fui:text-muted-foreground fui:lg:inline-flex"
				>
					<Search data-icon="inline-start" />
					<span>Search everything…</span>
					<KbdGroup className="fui:ml-auto">
						<Kbd>⌘</Kbd>
						<Kbd>K</Kbd>
					</KbdGroup>
				</Button>

				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								onClick={onOpenCommand}
								className="fui:lg:hidden"
							>
								<CommandIcon />
								<span className="fui:sr-only">Open command palette</span>
							</Button>
						}
					/>
					<TooltipContent>Command palette</TooltipContent>
				</Tooltip>

				<NotificationsMenu />

				<Separator
					orientation="vertical"
					className="fui:h-4 fui:self-center!"
				/>

				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant="ghost" size="icon" className="fui:rounded-full">
								<Avatar className="fui:size-7">
									<AvatarFallback>LB</AvatarFallback>
								</Avatar>
							</Button>
						}
					/>
					<DropdownMenuContent align="end" className="fui:w-56">
						<DropdownMenuGroup>
							<DropdownMenuLabel>lena@foomo.org</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings />
								Preferences
								<DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem variant="destructive">
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}

const notifications = [
	{
		title: "Payment failed",
		body: "Sara Lindqvist's card was declined.",
		time: "5h ago",
		icon: CircleAlert,
	},
	{
		title: "New enterprise lead",
		body: "Northwind requested a demo.",
		time: "1d ago",
		icon: Rocket,
	},
	{
		title: "Deploy succeeded",
		body: "storefront@v2.14.0 is live.",
		time: "2d ago",
		icon: BadgeCheck,
	},
];

function NotificationsMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon" className="fui:relative">
						<Bell />
						<span className="fui:absolute fui:top-1.5 fui:right-1.5 fui:size-2 fui:rounded-full fui:bg-destructive" />
						<span className="fui:sr-only">Notifications</span>
					</Button>
				}
			/>
			<DropdownMenuContent align="end" className="fui:w-80 fui:p-0">
				<div className="fui:flex fui:items-center fui:justify-between fui:px-3 fui:py-2">
					<span className="fui:text-sm fui:font-medium">Notifications</span>
					<Badge variant="secondary">3 new</Badge>
				</div>
				<Separator />
				<ItemGroup>
					{notifications.map((notification) => (
						<Item key={notification.title} size="sm">
							<ItemMedia variant="icon">
								<notification.icon />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>{notification.title}</ItemTitle>
								<ItemDescription>{notification.body}</ItemDescription>
							</ItemContent>
							<ItemActions>
								<span className="fui:text-xs fui:text-muted-foreground">
									{notification.time}
								</span>
							</ItemActions>
						</Item>
					))}
				</ItemGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function StatCards() {
	return (
		<div className="fui:grid fui:gap-4 fui:sm:grid-cols-2 fui:xl:grid-cols-4">
			{stats.map((stat) => (
				<Card key={stat.label} size="sm">
					<CardHeader>
						<CardDescription>{stat.label}</CardDescription>
						<CardAction>
							<stat.icon className="fui:size-4 fui:text-muted-foreground" />
						</CardAction>
					</CardHeader>
					<CardContent className="fui:flex fui:flex-col fui:gap-3">
						<div className="fui:flex fui:items-center fui:gap-2">
							<span className="fui:font-heading fui:text-2xl fui:font-medium fui:tabular-nums">
								{stat.value}
							</span>
							<Badge variant="secondary">
								{stat.trending === "up" ? (
									<ArrowUpRight data-icon="inline-start" />
								) : (
									<ArrowDownRight data-icon="inline-start" />
								)}
								{stat.delta}
							</Badge>
						</div>
						<Progress value={stat.progress} className="fui:h-1.5" />
						<p className="fui:text-xs fui:text-muted-foreground">{stat.hint}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function RevenueChartCard() {
	return (
		<Card className="fui:xl:col-span-4">
			<CardHeader>
				<CardTitle>Revenue vs. expenses</CardTitle>
				<CardDescription>Rolling nine months, EUR</CardDescription>
				<CardAction>
					<Select defaultValue="9m">
						<SelectTrigger className="fui:w-36" size="sm">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="3m">Last 3 months</SelectItem>
								<SelectItem value="6m">Last 6 months</SelectItem>
								<SelectItem value="9m">Last 9 months</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={revenueChartConfig}
					className="fui:aspect-auto fui:h-[260px] fui:w-full"
				>
					<AreaChart data={revenueByMonth} margin={{ left: 4, right: 4 }}>
						<defs>
							<linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-revenue)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-revenue)"
									stopOpacity={0.05}
								/>
							</linearGradient>
							<linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-expenses)"
									stopOpacity={0.6}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-expenses)"
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							width={48}
							tickFormatter={(value: number) => `${value / 1000}k`}
						/>
						<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							dataKey="expenses"
							type="natural"
							fill="url(#fillExpenses)"
							stroke="var(--color-expenses)"
							stackId="a"
							isAnimationActive={false}
						/>
						<Area
							dataKey="revenue"
							type="natural"
							fill="url(#fillRevenue)"
							stroke="var(--color-revenue)"
							stackId="a"
							isAnimationActive={false}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

function ActivityCard() {
	return (
		<Card className="fui:xl:col-span-3">
			<CardHeader>
				<CardTitle>Recent activity</CardTitle>
				<CardDescription>Last 24 hours across all workspaces</CardDescription>
			</CardHeader>
			<CardContent className="fui:px-0">
				<ScrollArea className="fui:h-[260px]">
					<ItemGroup className="fui:px-4">
						{recentActivity.map((entry, index) => (
							<React.Fragment key={entry.name}>
								{index > 0 && <ItemSeparator />}
								<Item size="sm" className="fui:px-0">
									<ItemMedia>
										<Avatar className="fui:size-8">
											<AvatarFallback>{entry.initials}</AvatarFallback>
										</Avatar>
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{entry.name}</ItemTitle>
										<ItemDescription>{entry.action}</ItemDescription>
									</ItemContent>
									<ItemActions className="fui:flex-col fui:items-end fui:gap-0.5">
										<span className="fui:text-sm fui:font-medium fui:tabular-nums">
											{entry.amount}
										</span>
										<span className="fui:text-xs fui:text-muted-foreground">
											{entry.time}
										</span>
									</ItemActions>
								</Item>
							</React.Fragment>
						))}
					</ItemGroup>
				</ScrollArea>
			</CardContent>
			<CardFooter>
				<Button variant="outline" size="sm" className="fui:w-full">
					View all activity
				</Button>
			</CardFooter>
		</Card>
	);
}

const column = createDataTableColumnHelper<Order>();

const orderColumns = [
	dataTableSelectColumn<Order>(),
	column.accessor("id", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Invoice" />
		),
		cell: (info) => <span className="fui:font-medium">{info.getValue()}</span>,
		sortFn: "text",
	}),
	column.accessor("customer", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Customer" />
		),
		cell: ({ row }) => (
			<div className="fui:flex fui:items-center fui:gap-2">
				<Avatar className="fui:size-6">
					<AvatarFallback className="fui:text-[10px]">
						{initials(row.original.customer)}
					</AvatarFallback>
				</Avatar>
				<div className="fui:leading-tight">
					<div>{row.original.customer}</div>
					<div className="fui:text-xs fui:text-muted-foreground">
						{row.original.email}
					</div>
				</div>
			</div>
		),
		sortFn: "text",
	}),
	column.accessor("plan", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Plan" />
		),
		cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
		sortFn: "text",
	}),
	column.accessor("status", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Status" />
		),
		cell: (info) => (
			<Badge
				variant={statusVariant[info.getValue()]}
				className="fui:capitalize"
			>
				{info.getValue()}
			</Badge>
		),
		sortFn: "text",
	}),
	// Accessor returns a Date so the column sorts chronologically rather than
	// alphabetically on the rendered label.
	column.accessor((order) => new Date(order.date), {
		id: "date",
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Date" />
		),
		cell: (info) => (
			<span className="fui:whitespace-nowrap fui:text-muted-foreground">
				{shortDate.format(info.getValue())}
			</span>
		),
		sortFn: "datetime",
	}),
	column.accessor("amount", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Amount" align="end" />
		),
		cell: (info) => (
			<div className="fui:text-right fui:tabular-nums">
				{currency.format(info.getValue())}
			</div>
		),
	}),
	column.display({
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button variant="ghost" size="icon-sm">
							<Ellipsis />
							<span className="fui:sr-only">Actions for {row.original.id}</span>
						</Button>
					}
				/>
				<DropdownMenuContent align="end" className="fui:w-44">
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Eye />
							View invoice
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Pencil />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Send />
							Resend email
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DeleteOrderDialog invoice={row.original.id} />
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	}),
];

function OrdersTableCard() {
	const [selected, setSelected] = React.useState<Order[]>([]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent orders</CardTitle>
				<CardDescription>
					{selected.length > 0
						? `${selected.length} of ${orders.length} selected`
						: "Sortable, filterable and paginated with TanStack Table"}
				</CardDescription>
				<CardAction>
					<div className="fui:flex fui:items-center fui:gap-2">
						<Button variant="outline" size="sm">
							<Download data-icon="inline-start" />
							Export
						</Button>
						<NewProjectDialog />
					</div>
				</CardAction>
			</CardHeader>
			<CardContent>
				<DataTable
					columns={orderColumns}
					data={orders}
					getRowId={(order) => order.id}
					searchable="Search invoices…"
					hideableColumns
					enableRowSelection
					onRowSelectionChange={setSelected}
					pageSize={5}
					pageSizeOptions={[5, 10, 20]}
					empty="No invoices match your filters."
				/>
			</CardContent>
		</Card>
	);
}

function DeleteOrderDialog({ invoice }: { invoice: string }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<DropdownMenuItem
						variant="destructive"
						onSelect={(event) => event.preventDefault()}
					>
						<Trash2 />
						Delete
					</DropdownMenuItem>
				}
			/>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {invoice}?</AlertDialogTitle>
					<AlertDialogDescription>
						This permanently removes the invoice and its payment history. This
						action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => toast.success(`${invoice} deleted`)}
					>
						Delete invoice
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function NewProjectDialog() {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button size="sm">
						<Plus data-icon="inline-start" />
						New project
					</Button>
				}
			/>
			<DialogContent className="fui:sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Create project</DialogTitle>
					<DialogDescription>
						Projects group deployments, environments and billing.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="project-name">Name</FieldLabel>
						<InputGroup>
							<InputGroupAddon>
								<Package />
							</InputGroupAddon>
							<InputGroupInput id="project-name" placeholder="storefront-eu" />
						</InputGroup>
					</Field>
					<Field>
						<FieldLabel htmlFor="project-region">Region</FieldLabel>
						<Select defaultValue="eu-central">
							<SelectTrigger id="project-region">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="eu-central">Europe (Frankfurt)</SelectItem>
									<SelectItem value="us-east">US East (Virginia)</SelectItem>
									<SelectItem value="ap-south">Asia (Singapore)</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
					<Field>
						<FieldLabel htmlFor="project-notes">Notes</FieldLabel>
						<Textarea
							id="project-notes"
							placeholder="What is this project for?"
							rows={3}
						/>
					</Field>
					<Field orientation="horizontal">
						<FieldLabel htmlFor="project-preview">
							Preview deployments
						</FieldLabel>
						<Switch id="project-preview" defaultChecked />
					</Field>
				</FieldGroup>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button onClick={() => toast.success("Project created")}>
						Create project
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

const goals = [
	{ label: "Activation", value: 82 },
	{ label: "Retention (30d)", value: 68 },
	{ label: "Expansion revenue", value: 47 },
	{ label: "Support SLA", value: 94 },
];

function AnalyticsTab() {
	return (
		<div className="fui:grid fui:gap-4 fui:xl:grid-cols-7">
			<Card className="fui:xl:col-span-4">
				<CardHeader>
					<CardTitle>Traffic by source</CardTitle>
					<CardDescription>Unique visitors, last 30 days</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={trafficChartConfig}
						className="fui:aspect-auto fui:h-[240px] fui:w-full"
					>
						<BarChart data={trafficBySource} margin={{ left: 4, right: 4 }}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="source"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<Bar
								dataKey="visitors"
								fill="var(--color-visitors)"
								radius={6}
								isAnimationActive={false}
							/>
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>

			<Card className="fui:xl:col-span-3">
				<CardHeader>
					<CardTitle>Quarterly goals</CardTitle>
					<CardDescription>Progress toward Q3 targets</CardDescription>
				</CardHeader>
				<CardContent className="fui:flex fui:flex-col fui:gap-5">
					{goals.map((goal) => (
						<div
							key={goal.label}
							className="fui:flex fui:flex-col fui:gap-2 fui:text-sm"
						>
							<div className="fui:flex fui:items-center fui:justify-between">
								<span>{goal.label}</span>
								<span className="fui:tabular-nums fui:text-muted-foreground">
									{goal.value}%
								</span>
							</div>
							<Progress value={goal.value} />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

const reports = [
	{
		title: "Weekly revenue digest",
		description: "Every Monday at 07:00 CET · 12 recipients",
		enabled: true,
	},
	{
		title: "Churn cohort breakdown",
		description: "First of the month · 4 recipients",
		enabled: true,
	},
	{
		title: "Infrastructure cost report",
		description: "Paused since Aug 14",
		enabled: false,
	},
];

function ReportsTab() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Scheduled reports</CardTitle>
				<CardDescription>
					Reports are generated nightly and emailed to your team.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ItemGroup className="fui:gap-2">
					{reports.map((report) => (
						<Item key={report.title} variant="outline">
							<ItemMedia variant="icon">
								<FileText />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>{report.title}</ItemTitle>
								<ItemDescription>{report.description}</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Switch
									defaultChecked={report.enabled}
									aria-label={`Toggle ${report.title}`}
								/>
							</ItemActions>
						</Item>
					))}
				</ItemGroup>
			</CardContent>
		</Card>
	);
}

function AuditTab() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Audit log</CardTitle>
				<CardDescription>No events recorded in this range.</CardDescription>
			</CardHeader>
			<CardContent>
				<Empty className="fui:border">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<Inbox />
						</EmptyMedia>
						<EmptyTitle>Nothing to audit yet</EmptyTitle>
						<EmptyDescription>
							Once teammates start changing settings, every action shows up here
							with a full diff.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button variant="outline" size="sm">
							<Settings data-icon="inline-start" />
							Configure audit retention
						</Button>
					</EmptyContent>
				</Empty>
			</CardContent>
		</Card>
	);
}

function CommandPalette({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<CommandDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Command palette"
			description="Search for a command to run"
		>
			{/*
			 * CommandDialog only renders <Dialog><DialogContent>{children}</…>.
			 * The <Command> root (which owns the cmdk store) is NOT included, so
			 * it has to be supplied here — otherwise CommandInput/CommandList throw
			 * "Cannot read properties of undefined (reading 'subscribe')".
			 */}
			<Command>
				<CommandInput placeholder="Type a command or search…" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Navigation">
						<CommandItem>
							<LayoutDashboard />
							Dashboard
							<CommandShortcut>⌘D</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<BarChart3 />
							Analytics
							<CommandShortcut>⌘A</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Users />
							Customers
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Actions">
						<CommandItem onSelect={() => toast.info("Invite sent")}>
							<Plus />
							Invite teammate
						</CommandItem>
						<CommandItem onSelect={() => toast.info("Export queued")}>
							<Download />
							Export invoices
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	);
}

function InviteDialog() {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button size="sm">
						<Plus data-icon="inline-start" />
						Invite
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite teammates</DialogTitle>
					<DialogDescription>
						They will receive an email with a join link valid for 7 days.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="invite-emails">Email addresses</FieldLabel>
						<Textarea
							id="invite-emails"
							rows={3}
							placeholder="ada@example.com, grace@example.com"
						/>
					</Field>
				</FieldGroup>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button onClick={() => toast.success("Invitations sent")}>
						Send invites
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function LoadingSkeleton() {
	return (
		<div className="fui:flex fui:flex-col fui:gap-4">
			<div className="fui:grid fui:gap-4 fui:sm:grid-cols-2 fui:xl:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.label} size="sm">
						<CardHeader>
							<Skeleton className="fui:h-4 fui:w-24" />
						</CardHeader>
						<CardContent className="fui:flex fui:flex-col fui:gap-3">
							<Skeleton className="fui:h-7 fui:w-32" />
							<Skeleton className="fui:h-1.5 fui:w-full" />
							<Skeleton className="fui:h-3 fui:w-40" />
						</CardContent>
					</Card>
				))}
			</div>
			<div className="fui:grid fui:gap-4 fui:xl:grid-cols-7">
				<Card className="fui:xl:col-span-4">
					<CardHeader>
						<Skeleton className="fui:h-5 fui:w-48" />
					</CardHeader>
					<CardContent>
						<Skeleton className="fui:h-[260px] fui:w-full" />
					</CardContent>
				</Card>
				<Card className="fui:xl:col-span-3">
					<CardHeader>
						<Skeleton className="fui:h-5 fui:w-36" />
					</CardHeader>
					<CardContent className="fui:flex fui:flex-col fui:gap-4">
						{recentActivity.map((entry) => (
							<div
								key={entry.name}
								className="fui:flex fui:items-center fui:gap-3"
							>
								<Skeleton className="fui:size-8 fui:rounded-full" />
								<div className="fui:flex fui:flex-1 fui:flex-col fui:gap-1.5">
									<Skeleton className="fui:h-3.5 fui:w-32" />
									<Skeleton className="fui:h-3 fui:w-48" />
								</div>
								<Skeleton className="fui:h-3.5 fui:w-16" />
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

type DashboardProps = {
	/** Start with the sidebar collapsed to icons. */
	sidebarOpen?: boolean;
	/** Render skeleton placeholders instead of data. */
	loading?: boolean;
};

function Dashboard({ sidebarOpen = true, loading = false }: DashboardProps) {
	const [commandOpen, setCommandOpen] = React.useState(false);

	React.useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setCommandOpen((value) => !value);
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<TooltipProvider>
			<SidebarProvider defaultOpen={sidebarOpen}>
				<AppSidebar />
				<SidebarInset>
					<DashboardHeader onOpenCommand={() => setCommandOpen(true)} />

					<div className="fui:flex fui:flex-1 fui:flex-col fui:gap-4 fui:p-4 fui:md:p-6">
						<div className="fui:flex fui:flex-wrap fui:items-center fui:justify-between fui:gap-3">
							<div className="fui:flex fui:flex-col fui:gap-1">
								<h1 className="fui:font-heading fui:text-xl fui:font-medium">
									Good afternoon, Lena
								</h1>
								<p className="fui:text-sm fui:text-muted-foreground">
									Here is what happened across Foomo Inc. today.
								</p>
							</div>
							<div className="fui:flex fui:items-center fui:gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										toast("Report scheduled", {
											description: "You will get it by email in a few minutes.",
											action: { label: "Undo", onClick: () => undefined },
										})
									}
								>
									<Send data-icon="inline-start" />
									Email report
								</Button>
								<InviteDialog />
							</div>
						</div>

						<Alert>
							<Sparkles />
							<AlertTitle>Usage-based billing is now available</AlertTitle>
							<AlertDescription>
								Switch any project to metered pricing and only pay for what you
								ship.
							</AlertDescription>
						</Alert>

						{loading ? (
							<LoadingSkeleton />
						) : (
							<>
								<StatCards />

								<Tabs defaultValue="overview">
									<div className="fui:flex fui:flex-wrap fui:items-center fui:justify-between fui:gap-2">
										<TabsList>
											<TabsTrigger value="overview">Overview</TabsTrigger>
											<TabsTrigger value="analytics">Analytics</TabsTrigger>
											<TabsTrigger value="reports">Reports</TabsTrigger>
											<TabsTrigger value="audit">Audit</TabsTrigger>
										</TabsList>
										<span className="fui:hidden fui:items-center fui:gap-1.5 fui:text-xs fui:text-muted-foreground fui:sm:flex">
											Press
											<KbdGroup>
												<Kbd>⌘</Kbd>
												<Kbd>K</Kbd>
											</KbdGroup>
											to search
										</span>
									</div>

									<TabsContent
										value="overview"
										className="fui:flex fui:flex-col fui:gap-4"
									>
										<div className="fui:grid fui:gap-4 fui:xl:grid-cols-7">
											<RevenueChartCard />
											<ActivityCard />
										</div>
										<OrdersTableCard />
									</TabsContent>

									<TabsContent value="analytics">
										<AnalyticsTab />
									</TabsContent>

									<TabsContent value="reports">
										<ReportsTab />
									</TabsContent>

									<TabsContent value="audit">
										<AuditTab />
									</TabsContent>
								</Tabs>
							</>
						)}
					</div>
				</SidebarInset>

				<CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
				<Toaster />
			</SidebarProvider>
		</TooltipProvider>
	);
}

const meta = {
	title: "Showcase/Admin Dashboard",
	component: Dashboard,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A full admin surface composed from the library: sidebar navigation, breadcrumbs, command palette, charts, data table, dialogs, toasts and empty states.",
			},
		},
	},
	argTypes: {
		sidebarOpen: { control: "boolean" },
		loading: { control: "boolean" },
	},
	args: {
		sidebarOpen: true,
		loading: false,
	},
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CollapsedSidebar: Story = {
	args: { sidebarOpen: false },
};

export const Loading: Story = {
	args: { loading: true },
};
