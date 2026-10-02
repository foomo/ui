import {
	ActivityIcon,
	ArrowDownRightIcon,
	ArrowUpRightIcon,
	CurrencyDollarIcon,
	DotsThreeIcon,
	FileTextIcon,
	GearIcon,
	PencilIcon,
	PlusIcon,
	TrashIcon,
	TrendUpIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";

import { Avatar, AvatarFallback } from "../components/avatar";
import { Badge } from "../components/badge";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "../components/field";
import { Input } from "../components/input";
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
import { Skeleton } from "../components/skeleton";
import { Switch } from "../components/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/table";
import ImageFoomo from "./assets/foomo.png";

// Sample data mirrors the Admin Dashboard showcase so both stories stay in sync
// visually.
const stats = [
	{
		label: "Total revenue",
		value: "$342,190",
		delta: "+18.2%",
		trending: "up" as const,
		hint: "vs. previous 30 days",
		icon: CurrencyDollarIcon,
		progress: 78,
	},
	{
		label: "Subscriptions",
		value: "4,812",
		delta: "+9.4%",
		trending: "up" as const,
		hint: "412 new this month",
		icon: UsersIcon,
		progress: 64,
	},
	{
		label: "Active now",
		value: "1,204",
		delta: "+2.1%",
		trending: "up" as const,
		hint: "peak 1,540 at 14:00",
		icon: ActivityIcon,
		progress: 41,
	},
	{
		label: "Churn rate",
		value: "2.8%",
		delta: "-0.6%",
		trending: "down" as const,
		hint: "lowest in 6 months",
		icon: TrendUpIcon,
		progress: 22,
	},
];

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

const trafficShare = [
	{ source: "organic", visitors: 4820, fill: "var(--color-organic)" },
	{ source: "referral", visitors: 2140, fill: "var(--color-referral)" },
	{ source: "social", visitors: 1780, fill: "var(--color-social)" },
	{ source: "email", visitors: 1290, fill: "var(--color-email)" },
	{ source: "paid", visitors: 940, fill: "var(--color-paid)" },
];

const trafficShareConfig = {
	visitors: { label: "Visitors" },
	organic: { label: "Organic", color: "var(--chart-1)" },
	referral: { label: "Referral", color: "var(--chart-2)" },
	social: { label: "Social", color: "var(--chart-3)" },
	email: { label: "Email", color: "var(--chart-4)" },
	paid: { label: "Paid", color: "var(--chart-5)" },
} satisfies ChartConfig;

const totalVisitors = trafficShare.reduce((sum, row) => sum + row.visitors, 0);

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

const goals = [
	{ label: "Activation", value: 82 },
	{ label: "Retention (30d)", value: 68 },
	{ label: "Expansion revenue", value: 47 },
	{ label: "Support SLA", value: 94 },
];

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

const productDetails = [
	{ label: "Product ID", value: "BASE-101039267" },
	{ label: "Brand", value: "FancyBrand" },
	{ label: "Classification", value: "Other > Other > Other > Other" },
	{ label: "Language", value: "languages" },
	{ label: "Imported", value: "17.9.2026, 15:31:33" },
	{
		label: "SKUs",
		value:
			"10003907457, 10003907458, 10003907459, 10003907460, 10003907461, 10003907462, 10003907463",
	},
];

const languages = ["de", "fr", "it"];

const invoices = [
	{ id: "INV-2041", customer: "Sofia Marino", amount: "$349.00" },
	{ id: "INV-2040", customer: "Amelie Roth", amount: "$2,400.00" },
	{ id: "INV-2039", customer: "Mia Schulz", amount: "$1,188.00" },
];

// One chart color per bar, so progress bars read as part of the chart palette
// rather than the near-black primary.
const progressColors = [
	"fui:[&_[data-slot=progress-indicator]]:bg-chart-2",
	"fui:[&_[data-slot=progress-indicator]]:bg-chart-3",
	"fui:[&_[data-slot=progress-indicator]]:bg-chart-4",
	"fui:[&_[data-slot=progress-indicator]]:bg-chart-5",
];

function CardMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon-sm" aria-label="Card actions">
						<DotsThreeIcon />
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<PencilIcon />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem>
						<GearIcon />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<TrashIcon />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// Shared frame for the pie variants, after the shadcn pie chart examples.
function PieChartCard({
	title,
	children,
	...props
}: React.ComponentProps<typeof Card> & { title: string }) {
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>Unique visitors, last 30 days</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						View report
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="fui:flex-1">{children}</CardContent>
			<CardFooter className="fui:flex-col fui:gap-1 fui:text-sm">
				<div className="fui:flex fui:items-center fui:gap-2 fui:font-medium">
					Trending up by 5.2% this month
					<TrendUpIcon className="fui:size-4" />
				</div>
				<div className="fui:text-muted-foreground">
					Showing visitors by traffic source
				</div>
			</CardFooter>
		</Card>
	);
}

const meta = {
	title: "Card",
	component: Card,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Surface for grouping related content. Compose `CardHeader` (with `CardTitle`, `CardDescription` and an optional `CardAction`), `CardContent` and `CardFooter`. The variants below are the patterns used across the Admin Dashboard showcase.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["default", "sm"],
		},
	},
	args: {
		size: "default",
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-sm">
			<CardHeader>
				<CardTitle>Upgrade your plan</CardTitle>
				<CardDescription>
					Unlock unlimited workspaces and priority support.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					Your team is using 9 of 10 seats. Upgrade to Pro to add more members
					and get advanced analytics.
				</p>
			</CardContent>
			<CardFooter className="fui:gap-2">
				<Button size="sm">Upgrade</Button>
				<Button variant="ghost" size="sm">
					Maybe later
				</Button>
			</CardFooter>
		</Card>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="fui:grid fui:max-w-2xl fui:gap-4 fui:sm:grid-cols-2">
			{(["default", "sm"] as const).map((size) => (
				<Card key={size} size={size}>
					<CardHeader>
						<CardTitle>size="{size}"</CardTitle>
						<CardDescription>
							{size === "sm" ? "Compact spacing" : "Regular spacing"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						The size prop controls padding and the gap between sections.
					</CardContent>
					<CardFooter>
						<Button variant="outline" size="sm" className="fui:w-full">
							Action
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	),
};

export const WithHeaderAction: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-sm">
			<CardHeader>
				<CardTitle>Project Apollo</CardTitle>
				<CardDescription>Updated 2 hours ago</CardDescription>
				<CardAction>
					<CardMenu />
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="fui:text-muted-foreground">
					<code>CardAction</code> sits in the top-right corner of the header,
					next to the title and description.
				</p>
			</CardContent>
		</Card>
	),
};

export const WithHeaderCTA: Story = {
	name: "With Header CTA",
	render: (args) => (
		<Card {...args} className="fui:max-w-md">
			<CardHeader>
				<CardTitle>Team members</CardTitle>
				<CardDescription>3 of 10 seats in use</CardDescription>
				<CardAction>
					<Button size="sm">
						<PlusIcon data-icon="inline-start" />
						Invite
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<ItemGroup>
					{recentActivity.slice(0, 3).map((entry, index) => (
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
								</ItemContent>
							</Item>
						</React.Fragment>
					))}
				</ItemGroup>
			</CardContent>
		</Card>
	),
};

export const WithImage: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-sm">
			<img
				src={ImageFoomo}
				alt="Foomo"
				className="fui:aspect-video fui:w-full fui:object-cover"
			/>
			<CardHeader>
				<CardTitle>Foomo UI</CardTitle>
				<CardDescription>
					An image as the first child removes the top padding and rounds its
					corners.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button size="sm">Read more</Button>
			</CardFooter>
		</Card>
	),
};

export const Stat: Story = {
	render: () => (
		<div className="fui:grid fui:gap-4 fui:sm:grid-cols-2 fui:xl:grid-cols-4">
			{stats.map((stat, index) => (
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
									<ArrowUpRightIcon data-icon="inline-start" />
								) : (
									<ArrowDownRightIcon data-icon="inline-start" />
								)}
								{stat.delta}
							</Badge>
						</div>
						<Progress
							value={stat.progress}
							className={`fui:h-1.5 ${progressColors[index % progressColors.length]}`}
						/>
						<p className="fui:text-xs fui:text-muted-foreground">{stat.hint}</p>
					</CardContent>
				</Card>
			))}
		</div>
	),
};

export const NumberStat: Story = {
	render: () => (
		<div className="fui:grid fui:gap-4 fui:sm:grid-cols-2 fui:xl:grid-cols-4">
			{stats.map((stat) => (
				<Card key={stat.label}>
					<CardHeader>
						<CardTitle className="fui:text-4xl fui:font-bold fui:tabular-nums fui:text-accent-highlight">
							{stat.value}
						</CardTitle>
						<CardDescription className="fui:text-base fui:text-foreground">
							{stat.label}
						</CardDescription>
						<CardAction>
							<stat.icon className="fui:size-4 fui:text-muted-foreground" />
						</CardAction>
					</CardHeader>
				</Card>
			))}
		</div>
	),
};

export const AreaChartCard: Story = {
	name: "Area Chart",
	render: (args) => (
		<Card {...args} className="fui:max-w-3xl">
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
							<linearGradient id="cardFillRevenue" x1="0" y1="0" x2="0" y2="1">
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
							<linearGradient id="cardFillExpenses" x1="0" y1="0" x2="0" y2="1">
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
							fill="url(#cardFillExpenses)"
							stroke="var(--color-expenses)"
							stackId="a"
							isAnimationActive={false}
						/>
						<Area
							dataKey="revenue"
							type="natural"
							fill="url(#cardFillRevenue)"
							stroke="var(--color-revenue)"
							stackId="a"
							isAnimationActive={false}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	),
};

export const BarChartCard: Story = {
	name: "Bar Chart",
	render: (args) => (
		<Card {...args} className="fui:max-w-3xl">
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
	),
};

function PieChartBasic() {
	return (
		<PieChartCard title="Pie Chart">
			<ChartContainer
				config={trafficShareConfig}
				className="fui:mx-auto fui:aspect-square fui:max-h-[250px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={trafficShare}
						dataKey="visitors"
						nameKey="source"
						isAnimationActive={false}
					/>
				</PieChart>
			</ChartContainer>
		</PieChartCard>
	);
}

function PieChartDonut() {
	return (
		<PieChartCard title="Pie Chart - Donut">
			<ChartContainer
				config={trafficShareConfig}
				className="fui:mx-auto fui:aspect-square fui:max-h-[250px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={trafficShare}
						dataKey="visitors"
						nameKey="source"
						innerRadius={60}
						isAnimationActive={false}
					/>
				</PieChart>
			</ChartContainer>
		</PieChartCard>
	);
}

function PieChartDonutWithText() {
	return (
		<PieChartCard title="Pie Chart - Donut with Text">
			<ChartContainer
				config={trafficShareConfig}
				className="fui:mx-auto fui:aspect-square fui:max-h-[250px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={trafficShare}
						dataKey="visitors"
						nameKey="source"
						innerRadius={60}
						strokeWidth={5}
						isAnimationActive={false}
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fui:fill-foreground fui:text-3xl fui:font-bold"
											>
												{totalVisitors.toLocaleString("en-US")}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fui:fill-muted-foreground"
											>
												Visitors
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
		</PieChartCard>
	);
}

function PieChartCustomLabel() {
	return (
		<PieChartCard title="Pie Chart - Custom Label">
			<ChartContainer
				config={trafficShareConfig}
				className="fui:mx-auto fui:aspect-square fui:max-h-[250px] fui:px-0"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent nameKey="visitors" hideLabel />}
					/>
					<Pie
						data={trafficShare}
						dataKey="visitors"
						nameKey="source"
						labelLine={false}
						outerRadius={80}
						isAnimationActive={false}
						label={({ payload, ...props }) => (
							<text
								cx={props.cx}
								cy={props.cy}
								x={props.x}
								y={props.y}
								textAnchor={props.textAnchor}
								dominantBaseline={props.dominantBaseline}
								className="fui:fill-foreground fui:text-xs"
							>
								{payload.visitors.toLocaleString("en-US")}
							</text>
						)}
					/>
				</PieChart>
			</ChartContainer>
		</PieChartCard>
	);
}

export const PieCharts: Story = {
	render: () => (
		<div className="fui:grid fui:gap-4 fui:md:grid-cols-2 fui:2xl:grid-cols-4">
			<PieChartBasic />
			<PieChartDonut />
			<PieChartDonutWithText />
			<PieChartCustomLabel />
		</div>
	),
};

export const ProgressList: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-md">
			<CardHeader>
				<CardTitle>Quarterly goals</CardTitle>
				<CardDescription>Progress toward Q3 targets</CardDescription>
			</CardHeader>
			<CardContent className="fui:flex fui:flex-col fui:gap-5">
				{goals.map((goal, index) => (
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
						<Progress
							value={goal.value}
							className={progressColors[index % progressColors.length]}
						/>
					</div>
				))}
			</CardContent>
		</Card>
	),
};

export const ActivityFeed: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-md">
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
	),
};

export const SettingsList: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-xl">
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
								<FileTextIcon />
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
	),
};

export const DetailsList: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-2xl">
			<CardHeader>
				<CardTitle>Product details</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="fui:divide-y">
					{productDetails.map((detail) => (
						<div
							key={detail.label}
							className="fui:grid fui:items-center fui:gap-1 fui:px-3 fui:py-3 fui:sm:grid-cols-[minmax(8rem,1fr)_2fr] fui:sm:gap-4"
						>
							<dt className="fui:font-medium">{detail.label}</dt>
							<dd className="fui:break-words">
								{detail.value === "languages" ? (
									<span className="fui:flex fui:gap-1.5">
										{languages.map((language) =>
											language === "de" ? (
												<a
													key={language}
													href={`?lang=${language}`}
													aria-current="page"
													className="fui:font-semibold fui:underline"
												>
													{language}
												</a>
											) : (
												<a
													key={language}
													href={`?lang=${language}`}
													className="fui:text-link fui:underline fui:underline-offset-2 fui:hover:no-underline"
												>
													{language}
												</a>
											),
										)}
									</span>
								) : (
									detail.value
								)}
							</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	),
};

export const WithTable: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-xl">
			<CardHeader>
				<CardTitle>Latest invoices</CardTitle>
				<CardDescription>Paid in the last 7 days</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						Export
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead className="fui:text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell>{invoice.id}</TableCell>
								<TableCell>{invoice.customer}</TableCell>
								<TableCell className="fui:text-right fui:tabular-nums">
									{invoice.amount}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	),
};

export const WithForm: Story = {
	render: (args) => (
		<Card {...args} className="fui:max-w-sm">
			<CardHeader>
				<CardTitle>Invite a teammate</CardTitle>
				<CardDescription>
					They'll get an email with a join link.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="card-invite-name">Name</FieldLabel>
						<Input id="card-invite-name" placeholder="Amelie Roth" />
					</Field>
					<Field>
						<FieldLabel htmlFor="card-invite-email">Email</FieldLabel>
						<Input
							id="card-invite-email"
							type="email"
							placeholder="amelie@example.com"
						/>
					</Field>
				</FieldGroup>
			</CardContent>
			<CardFooter className="fui:justify-end fui:gap-2">
				<Button variant="ghost" size="sm">
					Cancel
				</Button>
				<Button size="sm">Send invite</Button>
			</CardFooter>
		</Card>
	),
};

export const Loading: Story = {
	render: () => (
		<div className="fui:flex fui:max-w-3xl fui:flex-col fui:gap-4">
			<div className="fui:grid fui:gap-4 fui:sm:grid-cols-2">
				{stats.slice(0, 2).map((stat) => (
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
			<Card>
				<CardHeader>
					<Skeleton className="fui:h-5 fui:w-36" />
				</CardHeader>
				<CardContent className="fui:flex fui:flex-col fui:gap-4">
					{recentActivity.slice(0, 3).map((entry) => (
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
	),
};
