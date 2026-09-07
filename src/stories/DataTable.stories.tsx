import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../components/badge";
import {
	createDataTableColumnHelper,
	DataTable,
	DataTableColumnHeader,
	type DataTableProps,
	dataTableSelectColumn,
} from "../components/data-table";

type Project = {
	id: string;
	name: string;
	owner: string;
	status: "active" | "paused" | "archived";
	updatedAt: string;
	deployments: number;
};

const projects: Project[] = [
	{
		id: "PRJ-1042",
		name: "Storefront",
		owner: "Amelie Roth",
		status: "active",
		updatedAt: "2026-09-04T08:42:00Z",
		deployments: 184,
	},
	{
		id: "PRJ-1038",
		name: "Checkout API",
		owner: "Jonas Weber",
		status: "active",
		updatedAt: "2026-09-03T15:18:00Z",
		deployments: 96,
	},
	{
		id: "PRJ-1031",
		name: "Customer portal",
		owner: "Priya Nair",
		status: "paused",
		updatedAt: "2026-09-01T10:05:00Z",
		deployments: 61,
	},
	{
		id: "PRJ-1027",
		name: "Design system",
		owner: "Marco Bianchi",
		status: "active",
		updatedAt: "2026-08-29T12:30:00Z",
		deployments: 147,
	},
	{
		id: "PRJ-1019",
		name: "Partner dashboard",
		owner: "Sara Lindqvist",
		status: "paused",
		updatedAt: "2026-08-24T09:11:00Z",
		deployments: 38,
	},
	{
		id: "PRJ-1014",
		name: "Documentation",
		owner: "Tobias Krause",
		status: "active",
		updatedAt: "2026-08-20T16:47:00Z",
		deployments: 73,
	},
	{
		id: "PRJ-1008",
		name: "Legacy billing",
		owner: "Yuki Tanaka",
		status: "archived",
		updatedAt: "2026-08-12T11:22:00Z",
		deployments: 212,
	},
	{
		id: "PRJ-1003",
		name: "Internal tools",
		owner: "Nadia Haddad",
		status: "archived",
		updatedAt: "2026-07-30T14:09:00Z",
		deployments: 45,
	},
];

const dateTime = new Intl.DateTimeFormat("en-US", {
	day: "2-digit",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

const statusVariant = {
	active: "default",
	paused: "secondary",
	archived: "outline",
} as const;

const column = createDataTableColumnHelper<Project>();

const columns = column.columns([
	dataTableSelectColumn<Project>(),
	column.accessor("name", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Project" />
		),
		cell: ({ row }) => (
			<div className="lib:flex lib:flex-col">
				<span className="lib:font-medium">{row.original.name}</span>
				<span className="lib:text-xs lib:text-muted-foreground">
					{row.original.id}
				</span>
			</div>
		),
		sortFn: "text",
	}),
	column.accessor("owner", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Owner" />
		),
		sortFn: "text",
	}),
	column.accessor("status", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: (info) => (
			<Badge
				variant={statusVariant[info.getValue()]}
				className="lib:capitalize"
			>
				{info.getValue()}
			</Badge>
		),
		sortFn: "text",
	}),
	column.accessor((project) => new Date(project.updatedAt), {
		id: "updatedAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Updated" />
		),
		cell: (info) => (
			<span className="lib:whitespace-nowrap lib:text-muted-foreground">
				{dateTime.format(info.getValue())}
			</span>
		),
		sortFn: "datetime",
	}),
	column.accessor("deployments", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Deployments" align="end" />
		),
		cell: (info) => (
			<div className="lib:text-right lib:tabular-nums">{info.getValue()}</div>
		),
	}),
]);

function ProjectDataTable(props: DataTableProps<Project>) {
	return <DataTable {...props} />;
}

const meta = {
	title: "Data Table",
	component: ProjectDataTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="lib:mx-auto lib:w-full lib:max-w-5xl">
				<Story />
			</div>
		),
	],
	args: {
		columns,
		data: projects,
		getRowId: (project) => project.id,
		searchable: "Search projects...",
		hideableColumns: true,
		enableRowSelection: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 20],
		empty: "No projects match your search.",
	},
} satisfies Meta<typeof ProjectDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
