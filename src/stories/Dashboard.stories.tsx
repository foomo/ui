import {
	BellIcon,
	CircleWavyCheckIcon,
	CloudArrowUpIcon,
	CommandIcon,
	CopyIcon,
	DotsThreeIcon,
	DownloadIcon,
	EyeIcon,
	FileSearchIcon,
	FileTextIcon,
	GaugeIcon,
	GearIcon,
	LinkIcon,
	MagnifyingGlassIcon,
	MegaphoneIcon,
	PlayIcon,
	PlusIcon,
	SealPercentIcon,
	SignOutIcon,
	StackIcon,
	TrashIcon,
	TrayIcon,
	WarningCircleIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import { AppHeader } from "../components/app-shell";
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
	ChartTooltip,
	ChartTooltipContent,
} from "../components/chart";
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
import { ConfirmDialog } from "../components/confirm-dialog";
import {
	type DashboardResource,
	DashboardSection,
	DashboardTile,
} from "../components/dashboard";
import {
	createDataTableColumnHelper,
	DataTable,
	DataTableColumnHeader,
	dataTableSelectColumn,
} from "../components/data-table";
import {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
} from "../components/description-list";
import {
	Dialog,
	DialogClose,
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
import { ItemList, ItemListEntry } from "../components/item-list";
import { Kbd, KbdGroup } from "../components/kbd";
import { PageHeader } from "../components/page-header";
import { ProgressList, ProgressListItem } from "../components/progress-list";
import { RefreshButton } from "../components/refresh-button";
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
import { SidebarInset, SidebarProvider } from "../components/sidebar";
import { Skeleton } from "../components/skeleton";
import { Toaster } from "../components/sonner";
import { StatCard, StatCardRow } from "../components/stat-card";
import { Switch } from "../components/switch";
import {
	DateTimeCell,
	IdCell,
	NumberCell,
	TagCell,
} from "../components/table-cells";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Textarea } from "../components/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/tooltip";
import { ToolboxSidebar } from "./toolbox-sidebar";
import {
	ErrorCategoriesTile,
	OnlineShareTile,
	PriceRulesTile,
	ProjectionsTile,
	ready,
	type Summary,
	summary,
	TileLink,
} from "./toolbox-tiles";

/**
 * The toolbox's dashboard, built from the library alone: the app frame, the
 * page header, tabs, the dashboard kit, a data table with row actions, lists,
 * dialogs, the command palette and toasts. The sample data is the toolbox's
 * own kind: products and their import errors, promotions, price rules, and the
 * changes people made.
 */

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

type ImportError = {
	sku: string;
	product: string;
	brand: string;
	category: "validation" | "parse";
	type: string;
	occurrences: number;
	lastSeen: string;
};

// The occurrences add up to the error categories tile: 51 validation, 6 parse.
const importErrors: ImportError[] = [
	{
		sku: "BASE-100477054",
		product: "Merino crew neck jumper",
		brand: "Fancy Brand",
		category: "validation",
		type: "missing_required_field",
		occurrences: 12,
		lastSeen: "2026-11-06T08:14:00",
	},
	{
		sku: "BASE-100477061",
		product: "Linen shirt, regular fit",
		brand: "Fancy Brand",
		category: "validation",
		type: "invalid_price",
		occurrences: 9,
		lastSeen: "2026-11-06T08:14:00",
	},
	{
		sku: "BASE-101039267",
		product: "Ceramic table lamp",
		brand: "Lumen",
		category: "validation",
		type: "variant_sku_unique",
		occurrences: 8,
		lastSeen: "2026-11-06T07:52:00",
	},
	{
		sku: "BASE-101039270",
		product: "Oak side table",
		brand: "Lumen",
		category: "parse",
		type: "malformed_json",
		occurrences: 3,
		lastSeen: "2026-11-06T07:52:00",
	},
	{
		sku: "BASE-100988140",
		product: "Wool scarf, herringbone",
		brand: "Northwind",
		category: "validation",
		type: "missing_image",
		occurrences: 7,
		lastSeen: "2026-11-05T22:40:00",
	},
	{
		sku: "BASE-100988152",
		product: "Leather belt, 35 mm",
		brand: "Northwind",
		category: "validation",
		type: "missing_required_field",
		occurrences: 6,
		lastSeen: "2026-11-05T22:40:00",
	},
	{
		sku: "BASE-100731005",
		product: "Espresso cup set",
		brand: "Casa",
		category: "parse",
		type: "unknown_attribute",
		occurrences: 3,
		lastSeen: "2026-11-05T18:03:00",
	},
	{
		sku: "BASE-100731019",
		product: "Linen tea towel, 2 pcs",
		brand: "Casa",
		category: "validation",
		type: "invalid_price",
		occurrences: 5,
		lastSeen: "2026-11-05T18:03:00",
	},
	{
		sku: "BASE-100512330",
		product: "Running sock, 3 pairs",
		brand: "Stride",
		category: "validation",
		type: "missing_image",
		occurrences: 4,
		lastSeen: "2026-11-04T09:21:00",
	},
];

const languageCoverage = [
	{ label: "German", value: 100 },
	{ label: "French", value: 97 },
	{ label: "Italian", value: 94 },
	{ label: "English", value: 71 },
];

const campaignLoad = [
	{ day: "6 Nov", campaigns: 9 },
	{ day: "7 Nov", campaigns: 9 },
	{ day: "8 Nov", campaigns: 11 },
	{ day: "9 Nov", campaigns: 11 },
	{ day: "10 Nov", campaigns: 14 },
	{ day: "11 Nov", campaigns: 18 },
	{ day: "12 Nov", campaigns: 18 },
	{ day: "13 Nov", campaigns: 16 },
	{ day: "14 Nov", campaigns: 22 },
	{ day: "15 Nov", campaigns: 22 },
	{ day: "16 Nov", campaigns: 19 },
	{ day: "17 Nov", campaigns: 15 },
	{ day: "18 Nov", campaigns: 12 },
	{ day: "19 Nov", campaigns: 12 },
];

const campaignLoadConfig = {
	campaigns: { label: "Campaigns live", color: "var(--chart-2)" },
} satisfies ChartConfig;

const recentChanges = [
	{
		name: "Maxi Muster",
		initials: "MM",
		action: "Changed the redirect /sale",
		time: "2m ago",
	},
	{
		name: "Jonas Weber",
		initials: "JW",
		action: "Overrode campaign CQ061681",
		time: "18m ago",
	},
	{
		name: "Priya Nair",
		initials: "PN",
		action: "Recalculated price 10003907457",
		time: "1h ago",
	},
	{
		name: "Marco Bianchi",
		initials: "MB",
		action: "Deleted product BASE-100477054",
		time: "3h ago",
	},
	{
		name: "Sara Lindqvist",
		initials: "SL",
		action: "Simulated customer 4471-2210",
		time: "5h ago",
	},
	{
		name: "Maxi Muster",
		initials: "MM",
		action: "Ran the campaign mapping",
		time: "6h ago",
	},
];

const scheduledExports = [
	{
		title: "Content export to the shop",
		description: "Every night at 02:00 · all languages",
		enabled: true,
	},
	{
		title: "Price feed for DFO",
		description: "Every hour · 41,207 variants",
		enabled: true,
	},
	{
		title: "Redirects backup",
		description: "Paused since 14.10.2026",
		enabled: false,
	},
];

const notifications = [
	{
		title: "Import failed for 12 products",
		body: "missing_required_field in the last import.",
		time: "5m ago",
		icon: WarningCircleIcon,
	},
	{
		title: "DFO upload staged",
		body: "BATCH-004: 4 files, 6.0 MB.",
		time: "1h ago",
		icon: CloudArrowUpIcon,
	},
	{
		title: "Mapping run finished",
		body: "53 price rules published.",
		time: "3h ago",
		icon: CircleWavyCheckIcon,
	},
];

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function DashboardHeader({ onOpenCommand }: { onOpenCommand: () => void }) {
	return (
		<AppHeader>
			<Breadcrumb className="fui:hidden fui:md:block">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="#">bestbytes toolbox</BreadcrumbLink>
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
					<MagnifyingGlassIcon data-icon="inline-start" />
					<span>Search the toolbox…</span>
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
									<AvatarFallback>MM</AvatarFallback>
								</Avatar>
								<span className="fui:sr-only">Account</span>
							</Button>
						}
					/>
					<DropdownMenuContent align="end" className="fui:w-56">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Maxi Muster</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<GearIcon />
								Settings
								<DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem variant="destructive">
								<SignOutIcon />
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</AppHeader>
	);
}

function NotificationsMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="icon" className="fui:relative">
						<BellIcon />
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
				<ItemList className="fui:px-3">
					{notifications.map((notification) => (
						<ItemListEntry
							key={notification.title}
							media={<notification.icon />}
							mediaVariant="icon"
							title={notification.title}
							description={notification.body}
							end={
								<span className="fui:text-xs fui:text-muted-foreground">
									{notification.time}
								</span>
							}
						/>
					))}
				</ItemList>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

function LanguageCoverageTile({
	resource,
}: {
	resource: DashboardResource<typeof languageCoverage>;
}) {
	return (
		<DashboardTile
			title="Texts per language"
			description="Share of products with texts in each language"
			action={<TileLink>Products</TileLink>}
			resource={resource}
		>
			{(data) => (
				<ProgressList className="fui:justify-center fui:h-full fui:gap-4">
					{data.map((entry, index) => (
						<ProgressListItem
							key={entry.label}
							label={entry.label}
							value={entry.value}
							color={`var(--chart-${index + 2})`}
						/>
					))}
				</ProgressList>
			)}
		</DashboardTile>
	);
}

// ---------------------------------------------------------------------------
// Catalogue health
// ---------------------------------------------------------------------------

function ImportHealthTile({
	resource,
}: {
	resource: DashboardResource<Summary>;
}) {
	const failures = importErrors.reduce((sum, row) => sum + row.occurrences, 0);

	return (
		<DashboardTile
			title="Import health"
			description="Freshness of the last catalogue import"
			action={<TileLink>Import errors</TileLink>}
			resource={resource}
		>
			{() => (
				<div className="fui:flex fui:h-full fui:flex-col fui:justify-center fui:gap-4">
					<div>
						<div className="fui:font-heading fui:text-3xl fui:font-medium fui:text-destructive fui:tabular-nums">
							{failures}
						</div>
						<div className="fui:text-xs fui:text-muted-foreground">
							failures in the last 24 hours
						</div>
					</div>
					<DescriptionList layout="grid" className="fui:text-xs">
						<DescriptionListItem>
							<DescriptionListTerm>Last import</DescriptionListTerm>
							<DescriptionListDetails>
								<DateTimeCell value="2026-11-06T08:14:00" />
							</DescriptionListDetails>
						</DescriptionListItem>
						<DescriptionListItem>
							<DescriptionListTerm>Last failure</DescriptionListTerm>
							<DescriptionListDetails>
								<DateTimeCell value="2026-11-06T08:14:00" />
							</DescriptionListDetails>
						</DescriptionListItem>
					</DescriptionList>
				</div>
			)}
		</DashboardTile>
	);
}

// The import errors table.

const column = createDataTableColumnHelper<ImportError>();

const importErrorColumns = [
	dataTableSelectColumn<ImportError>(),
	column.accessor("sku", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="SKU" />
		),
		cell: (info) => <IdCell>{info.getValue()}</IdCell>,
		sortFn: "text",
	}),
	column.accessor("product", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Product" />
		),
		sortFn: "text",
	}),
	column.accessor("brand", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Brand" />
		),
		sortFn: "text",
	}),
	column.accessor("category", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Category" />
		),
		// The same colours as the error categories donut.
		cell: (info) => (
			<TagCell color={info.getValue() === "validation" ? "label-1" : "label-2"}>
				{info.getValue()}
			</TagCell>
		),
		sortFn: "text",
	}),
	column.accessor("type", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Error type" />
		),
		cell: (info) => <TagCell>{info.getValue()}</TagCell>,
		sortFn: "text",
	}),
	column.accessor("occurrences", {
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Occurrences" align="end" />
		),
		cell: (info) => <NumberCell value={info.getValue()} />,
	}),
	// The accessor returns a Date so the column sorts chronologically rather
	// than on the rendered text.
	column.accessor((row) => new Date(row.lastSeen), {
		id: "lastSeen",
		header: ({ column: col }) => (
			<DataTableColumnHeader column={col} title="Last seen" />
		),
		cell: (info) => <DateTimeCell value={info.getValue()} />,
		sortFn: "datetime",
	}),
	column.display({
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button variant="ghost" size="icon-sm">
							<DotsThreeIcon />
							<span className="fui:sr-only">
								Actions for {row.original.sku}
							</span>
						</Button>
					}
				/>
				<DropdownMenuContent align="end" className="fui:w-44">
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<EyeIcon />
							View product
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => toast(`${row.original.sku} copied`)}
						>
							<CopyIcon />
							Copy SKU
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<ConfirmDialog
							nativeButton={false}
							trigger={
								<DropdownMenuItem variant="destructive" closeOnClick={false}>
									<TrashIcon />
									Delete product
								</DropdownMenuItem>
							}
							title={`Delete ${row.original.sku}?`}
							description="This removes the product and all of its variants from the catalogue. The next import brings it back if the PIM still delivers it."
							confirmLabel="Delete product"
							destructive
							onConfirm={() => toast.success(`${row.original.sku} deleted`)}
						/>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	}),
];

function ImportErrorsCard({ loading }: { loading: boolean }) {
	const [selected, setSelected] = React.useState<ImportError[]>([]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Import errors</CardTitle>
				<CardDescription>
					{selected.length > 0
						? `${selected.length} of ${importErrors.length} selected`
						: "Products the last imports rejected, newest first"}
				</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						<DownloadIcon data-icon="inline-start" />
						Export
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<DataTable
					columns={importErrorColumns}
					data={importErrors}
					getRowId={(row) => row.sku}
					searchable="Search SKUs, products or brands…"
					hideableColumns
					enableRowSelection
					onRowSelectionChange={setSelected}
					loading={loading}
					pageSize={5}
					pageSizeOptions={[5, 10, 20]}
					empty="No import errors match your search."
				/>
			</CardContent>
		</Card>
	);
}

// ---------------------------------------------------------------------------
// Promotions
// ---------------------------------------------------------------------------

function CampaignLoadCard({ loading }: { loading: boolean }) {
	const [days, setDays] = React.useState("14");
	const data = campaignLoad.slice(0, Number(days));

	return (
		<Card>
			<CardHeader>
				<CardTitle>Campaign load ahead</CardTitle>
				<CardDescription>Campaigns live per day</CardDescription>
				<CardAction>
					<Select
						// `items` gives the trigger each value's label to show.
						items={{ "7": "Next 7 days", "14": "Next 14 days" }}
						value={days}
						onValueChange={(value) => setDays(value ?? "14")}
					>
						<SelectTrigger className="fui:w-36" size="sm">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="7">Next 7 days</SelectItem>
								<SelectItem value="14">Next 14 days</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent>
				{loading ? (
					<Skeleton className="fui:h-[220px] fui:w-full" />
				) : (
					<ChartContainer
						config={campaignLoadConfig}
						aspect="auto"
						className="fui:h-[220px] fui:w-full"
					>
						<AreaChart data={data} margin={{ left: 4, right: 4 }}>
							<defs>
								<linearGradient id="fillCampaigns" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-campaigns)"
										stopOpacity={0.6}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-campaigns)"
										stopOpacity={0.05}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="day"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								width={32}
								allowDecimals={false}
							/>
							<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
							<Area
								dataKey="campaigns"
								type="monotone"
								fill="url(#fillCampaigns)"
								stroke="var(--color-campaigns)"
								isAnimationActive={false}
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}

// ---------------------------------------------------------------------------
// Activity
// ---------------------------------------------------------------------------

function RecentChangesCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent changes</CardTitle>
				<CardDescription>Last 24 hours, from the audit log</CardDescription>
			</CardHeader>
			<CardContent className="fui:px-0">
				<ScrollArea className="fui:h-[280px]">
					<ItemList className="fui:px-6">
						{recentChanges.map((entry) => (
							<ItemListEntry
								key={`${entry.name}-${entry.time}`}
								media={
									<Avatar className="fui:size-8">
										<AvatarFallback>{entry.initials}</AvatarFallback>
									</Avatar>
								}
								title={entry.name}
								description={entry.action}
								end={
									<span className="fui:text-xs fui:text-muted-foreground">
										{entry.time}
									</span>
								}
							/>
						))}
					</ItemList>
				</ScrollArea>
			</CardContent>
			<CardFooter>
				<Button variant="outline" size="sm" className="fui:w-full">
					<FileSearchIcon data-icon="inline-start" />
					Open the audit log
				</Button>
			</CardFooter>
		</Card>
	);
}

function ScheduledExportsCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Scheduled exports</CardTitle>
				<CardDescription>
					Exports run on the server and land in the shop's storage.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ItemList variant="outline">
					{scheduledExports.map((entry) => (
						<ItemListEntry
							key={entry.title}
							media={<FileTextIcon />}
							mediaVariant="icon"
							title={entry.title}
							description={entry.description}
							end={
								<Switch
									defaultChecked={entry.enabled}
									aria-label={`Run ${entry.title}`}
									onCheckedChange={(checked) =>
										toast(
											checked
												? `${entry.title} resumed`
												: `${entry.title} paused`,
										)
									}
								/>
							}
						/>
					))}
				</ItemList>
			</CardContent>
		</Card>
	);
}

function FailedExportsCard() {
	return (
		<Card className="fui:xl:col-span-2">
			<CardHeader>
				<CardTitle>Failed exports</CardTitle>
				<CardDescription>Last 7 days</CardDescription>
			</CardHeader>
			<CardContent>
				<Empty className="fui:border">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<TrayIcon />
						</EmptyMedia>
						<EmptyTitle>No failed exports</EmptyTitle>
						<EmptyDescription>
							Every export in the last 7 days went through. A failed one shows
							up here with the reason the shop gave.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button variant="outline" size="sm">
							<GearIcon data-icon="inline-start" />
							Open the content export
						</Button>
					</EmptyContent>
				</Empty>
			</CardContent>
		</Card>
	);
}

// ---------------------------------------------------------------------------
// Dialogs and the command palette
// ---------------------------------------------------------------------------

/** The redirect status codes, with the label the select shows for each. */
const statusCodes = {
	"301": "301 Moved permanently",
	"302": "302 Found",
	"307": "307 Temporary redirect",
	"308": "308 Permanent redirect",
};

function NewRedirectDialog() {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button size="sm">
						<PlusIcon data-icon="inline-start" />
						New redirect
					</Button>
				}
			/>
			<DialogContent className="fui:sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>New redirect</DialogTitle>
					<DialogDescription>
						Sends visitors from an old path to a new one. It takes effect within
						a minute.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="redirect-source">Source path</FieldLabel>
						<InputGroup>
							<InputGroupAddon>
								<LinkIcon />
							</InputGroupAddon>
							<InputGroupInput id="redirect-source" placeholder="/sale" />
						</InputGroup>
					</Field>
					<Field>
						<FieldLabel htmlFor="redirect-target">Target path</FieldLabel>
						<InputGroup>
							<InputGroupAddon>
								<LinkIcon />
							</InputGroupAddon>
							<InputGroupInput id="redirect-target" placeholder="/aktionen" />
						</InputGroup>
					</Field>
					<Field>
						<FieldLabel htmlFor="redirect-code">Status code</FieldLabel>
						<Select defaultValue="301" items={statusCodes}>
							<SelectTrigger id="redirect-code">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="301">301 Moved permanently</SelectItem>
									<SelectItem value="302">302 Found</SelectItem>
									<SelectItem value="307">307 Temporary redirect</SelectItem>
									<SelectItem value="308">308 Permanent redirect</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
					<Field>
						<FieldLabel htmlFor="redirect-notes">Notes</FieldLabel>
						<Textarea
							id="redirect-notes"
							placeholder="Why this redirect exists"
							rows={3}
						/>
					</Field>
					<Field orientation="horizontal">
						<FieldLabel htmlFor="redirect-active">Active</FieldLabel>
						<Switch id="redirect-active" defaultChecked />
					</Field>
				</FieldGroup>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<DialogClose
						render={<Button />}
						onClick={() => toast.success("Redirect created")}
					>
						Create redirect
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
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
			description="Search for a page or an action"
		>
			{/*
			 * CommandDialog only renders <Dialog><DialogContent>{children}</…>.
			 * The <Command> root (which owns the cmdk store) is NOT included, so
			 * it has to be supplied here — otherwise CommandInput/CommandList throw
			 * "Cannot read properties of undefined (reading 'subscribe')".
			 */}
			<Command>
				<CommandInput placeholder="Type a page or an action…" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Pages">
						<CommandItem>
							<GaugeIcon />
							Dashboard
							<CommandShortcut>⌘D</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<StackIcon />
							Products
						</CommandItem>
						<CommandItem>
							<WarningIcon />
							Import errors
						</CommandItem>
						<CommandItem>
							<MegaphoneIcon />
							Campaigns
						</CommandItem>
						<CommandItem>
							<SealPercentIcon />
							Price rules
						</CommandItem>
						<CommandItem>
							<LinkIcon />
							Redirects
						</CommandItem>
						<CommandItem>
							<FileSearchIcon />
							Audit log
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Actions">
						<CommandItem onSelect={() => toast.info("Mapping run started")}>
							<PlayIcon />
							Run the campaign mapping
						</CommandItem>
						<CommandItem onSelect={() => toast.info("Export queued")}>
							<DownloadIcon />
							Export import errors
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	);
}

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

type DashboardProps = {
	/** Start with the sidebar collapsed to icons. */
	sidebarOpen?: boolean;
	/** Show every tile, chart and table while their data loads. */
	loading?: boolean;
};

function Dashboard({ sidebarOpen = true, loading = false }: DashboardProps) {
	const [commandOpen, setCommandOpen] = React.useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	// The toolbox navigation, with the dashboard itself as the active page.
	const [path, setPath] = React.useState("/");

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

	const resource: DashboardResource<Summary> =
		loading || refreshing ? { state: "loading" } : ready;
	const coverage: DashboardResource<typeof languageCoverage> =
		loading || refreshing
			? { state: "loading" }
			: { state: "ready", data: languageCoverage };
	const figure = (value: number) =>
		loading ? (
			<Skeleton className="fui:h-6 fui:w-20" />
		) : (
			value.toLocaleString()
		);

	return (
		<TooltipProvider>
			<SidebarProvider defaultOpen={sidebarOpen}>
				<ToolboxSidebar path={path} onNavigate={setPath} loading={false} />
				<SidebarInset>
					<DashboardHeader onOpenCommand={() => setCommandOpen(true)} />

					<div className="fui:flex fui:flex-1 fui:flex-col fui:gap-6 fui:p-4 fui:md:p-6">
						<PageHeader
							title="Dashboard"
							description="The state of the catalogue, its promotions, and the prices the shop serves."
							actions={
								<>
									<RefreshButton
										pending={refreshing}
										onClick={() => {
											setRefreshing(true);
											setTimeout(() => {
												setRefreshing(false);
												toast("Dashboard refreshed");
											}, 1200);
										}}
									/>
									<NewRedirectDialog />
								</>
							}
						/>

						<Alert variant="info">
							<CloudArrowUpIcon />
							<AlertTitle>DFO upload in progress</AlertTitle>
							<AlertDescription>
								BATCH-004: 4 files staged (6.0 MB). The next import picks them
								up at 02:00.
							</AlertDescription>
						</Alert>

						<StatCardRow>
							<StatCard size="sm" label="Products" value={figure(12438)} />
							<StatCard
								size="sm"
								label="Variants"
								value={figure(summary.variants)}
							/>
							<StatCard size="sm" label="Import errors" value={figure(57)} />
							<StatCard
								size="sm"
								label="Price rules"
								value={figure(summary.rules.active + summary.rules.scheduled)}
							/>
						</StatCardRow>

						<Tabs defaultValue="catalogue" className="fui:gap-6">
							<div className="fui:flex fui:flex-wrap fui:items-center fui:justify-between fui:gap-2">
								<TabsList>
									<TabsTrigger value="catalogue">Catalogue</TabsTrigger>
									<TabsTrigger value="health">Catalogue health</TabsTrigger>
									<TabsTrigger value="promotions">Promotions</TabsTrigger>
									<TabsTrigger value="activity">Activity</TabsTrigger>
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

							<TabsContent value="catalogue">
								<DashboardSection>
									<OnlineShareTile resource={resource} />
									<ProjectionsTile resource={resource} />
									<LanguageCoverageTile resource={coverage} />
								</DashboardSection>
							</TabsContent>

							<TabsContent
								value="health"
								className="fui:flex fui:flex-col fui:gap-4"
							>
								<DashboardSection columns={2}>
									<ImportHealthTile resource={resource} />
									<ErrorCategoriesTile resource={resource} />
								</DashboardSection>
								<ImportErrorsCard loading={loading} />
							</TabsContent>

							<TabsContent value="promotions">
								<div className="fui:grid fui:gap-4 fui:md:grid-cols-2">
									<PriceRulesTile resource={resource} />
									<CampaignLoadCard loading={loading} />
								</div>
							</TabsContent>

							<TabsContent value="activity">
								<div className="fui:grid fui:gap-4 fui:xl:grid-cols-2">
									<RecentChangesCard />
									<ScheduledExportsCard />
									<FailedExportsCard />
								</div>
							</TabsContent>
						</Tabs>
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
					"The toolbox's dashboard, composed from the library alone: the app frame with sidebar navigation and breadcrumbs, the page header with a refresh button and a dialog, an info alert, stat cards, tabs over dashboard tiles (donut and bar charts, a progress list), a data table with search, selection, sorting, paging and row actions behind a confirm dialog, an area chart, item lists, an empty state, the command palette (⌘K) and toasts. The sample data is the toolbox's kind: products and their import errors, promotions, price rules and the changes people made.",
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
