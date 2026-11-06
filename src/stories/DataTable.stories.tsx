import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Badge } from "../components/badge";
import {
	createDataTableColumnHelper,
	DataTable,
	DataTableColumnHeader,
	type DataTableProps,
	DataTableSubPanel,
	dataTableSelectColumn,
} from "../components/data-table";
import { ExpandToggleCell, IdCell } from "../components/table-cells";

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
			<div className="fui:flex fui:flex-col">
				<span>{row.original.name}</span>
				<span className="fui:text-xs fui:text-muted-foreground">
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
				className="fui:capitalize"
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
			<span className="fui:whitespace-nowrap fui:text-muted-foreground">
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
			<div className="fui:text-right fui:tabular-nums">{info.getValue()}</div>
		),
	}),
]);

function ProjectDataTable(props: DataTableProps<Project>) {
	return <DataTable {...props} />;
}

const meta = {
	title: "Data Display/Data Table",
	component: ProjectDataTable,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="fui:mx-auto fui:w-full fui:max-w-5xl">
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

export const Loading: Story = {
	args: { loading: true, data: [] },
};

type Batch = {
	id: string;
	state: string;
	fileCount: number;
	files: { name: string; kind: string }[];
	openedAt: string;
};

const batches: Batch[] = [
	{
		id: "BATCH-004",
		state: "open",
		fileCount: 3,
		files: [
			{ name: "discount/1b77.xml", kind: "discount" },
			{ name: "discount/1b78.xml", kind: "discount" },
			{ name: "discount-line/9f01.xml", kind: "discount-line" },
		],
		openedAt: "2026-05-20 01:50",
	},
	{
		id: "BATCH-003",
		state: "consumed",
		fileCount: 1,
		files: [{ name: "campaign/77aa.xml", kind: "campaign" }],
		openedAt: "2026-05-19 22:10",
	},
	// Recorded before the file list was kept: a count with nothing behind it.
	{
		id: "BATCH-002",
		state: "consumed",
		fileCount: 4,
		files: [],
		openedAt: "2026-05-18 08:00",
	},
];

const batchColumn = createDataTableColumnHelper<Batch>();

/**
 * Hinted headers, and a count that opens the batch's files in a detail row:
 * `DataTableColumnHeader` with `hint`, `ExpandToggleCell` and
 * `DataTableSubPanel`.
 */
function BatchTable() {
	const [open, setOpen] = React.useState<string | null>("BATCH-004");

	const columns = [
		batchColumn.accessor("id", {
			header: "Batch",
			cell: (info) => <IdCell>{info.getValue()}</IdCell>,
		}),
		batchColumn.accessor("state", {
			enableSorting: false,
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="State"
					hint="Open until a successful sync consumes the batch."
				/>
			),
		}),
		batchColumn.accessor("openedAt", {
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Opened at"
					hint="When the batch's first file arrived."
				/>
			),
		}),
		batchColumn.accessor("fileCount", {
			enableSorting: false,
			header: "Files",
			cell: ({ row, getValue }) => (
				<ExpandToggleCell
					expandable={row.original.files.length > 0}
					expanded={open === row.original.id}
					onToggle={() =>
						setOpen(open === row.original.id ? null : row.original.id)
					}
				>
					{getValue()}
				</ExpandToggleCell>
			),
		}),
	];

	return (
		<DataTable
			columns={columns}
			data={batches}
			getRowId={(batch) => batch.id}
			pageSize={false}
			renderSubComponent={(row) =>
				open === row.original.id ? (
					<DataTableSubPanel
						title={`Uploaded files — ${row.original.files.length}`}
					>
						<DataTable
							columns={fileColumns}
							data={row.original.files}
							getRowId={(file) => file.name}
							pageSize={false}
						/>
					</DataTableSubPanel>
				) : null
			}
		/>
	);
}

const fileColumn = createDataTableColumnHelper<Batch["files"][number]>();
const fileColumns = [
	fileColumn.accessor("kind", { header: "Kind" }),
	fileColumn.accessor("name", {
		header: "File",
		cell: (info) => <IdCell>{info.getValue()}</IdCell>,
	}),
];

export const ExpandableRows: Story = {
	name: "Expandable rows and header hints",
	parameters: {
		docs: {
			description: {
				story:
					"`DataTableColumnHeader` takes a `hint`, shown in a tooltip on the title (dotted underline) or on the sort button. `ExpandToggleCell` turns a value into a toggle for a detail row, plain text when `expandable` is false; `renderSubComponent` renders the detail in a `DataTableSubPanel`.",
			},
		},
	},
	render: () => <BatchTable />,
};
