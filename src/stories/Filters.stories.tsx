import { DownloadIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { endOfDay } from "date-fns";
import * as React from "react";

import { Button } from "../components/button";
import {
	createDataTableColumnHelper,
	DataTable,
	DataTableColumnHeader,
} from "../components/data-table";
import {
	FilterBar,
	FilterDateRange,
	FilterMultiSelect,
	type FilterOption,
	type FilterPeriod,
	FilterReset,
	FilterSearch,
	FilterSelect,
	type FilterSize,
	FilterToggle,
} from "../components/filters";
import {
	BooleanCell,
	cellLinkClassName,
	IdCell,
	TagCell,
} from "../components/table-cells";

type Status = "active" | "draft" | "archived";

type Product = {
	id: string;
	name: string;
	brand: string;
	status: Status;
	discountable: boolean;
	importedAt: Date;
};

const products: Product[] = [
	{
		id: "BASE-101039267",
		name: "Trail running shoe",
		brand: "FancyBrand",
		status: "active",
		discountable: true,
		importedAt: new Date("2026-09-17T15:31:33Z"),
	},
	{
		id: "BASE-101039268",
		name: "Merino base layer",
		brand: "Northwise",
		status: "active",
		discountable: false,
		importedAt: new Date("2026-09-12T09:04:10Z"),
	},
	{
		id: "BASE-101039271",
		name: "Packable rain jacket",
		brand: "FancyBrand",
		status: "draft",
		discountable: true,
		importedAt: new Date("2026-09-03T11:48:52Z"),
	},
	{
		id: "BASE-101039275",
		name: "Insulated bottle",
		brand: "Hydra",
		status: "active",
		discountable: true,
		importedAt: new Date("2026-08-28T07:15:00Z"),
	},
	{
		id: "BASE-101039280",
		name: "Hiking poles",
		brand: "Northwise",
		status: "archived",
		discountable: false,
		importedAt: new Date("2026-08-14T13:22:41Z"),
	},
	{
		id: "BASE-101039284",
		name: "Daypack 22L",
		brand: "Hydra",
		status: "draft",
		discountable: false,
		importedAt: new Date("2026-08-02T16:09:27Z"),
	},
];

const brandOptions: FilterOption<string>[] = [
	{ value: "FancyBrand", label: "FancyBrand" },
	{ value: "Northwise", label: "Northwise" },
	{ value: "Hydra", label: "Hydra" },
];

const statusOptions: FilterOption<Status | "all">[] = [
	{ value: "all", label: "Any status" },
	{ value: "active", label: "Active" },
	{ value: "draft", label: "Draft" },
	{ value: "archived", label: "Archived" },
];

type FilterState = {
	search: string;
	brands: string[];
	status: Status | "all";
	period: FilterPeriod | undefined;
	discountableOnly: boolean;
};

const initialFilters: FilterState = {
	search: "",
	brands: [],
	status: "all",
	period: undefined,
	discountableOnly: false,
};

function isFiltered(filters: FilterState) {
	return (
		filters.search !== "" ||
		filters.brands.length > 0 ||
		filters.status !== "all" ||
		filters.period !== undefined ||
		filters.discountableOnly
	);
}

function applyFilters(rows: Product[], filters: FilterState) {
	const query = filters.search.trim().toLowerCase();
	return rows.filter(
		(product) =>
			(query === "" ||
				product.name.toLowerCase().includes(query) ||
				product.id.toLowerCase().includes(query)) &&
			(filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
			(filters.status === "all" || product.status === filters.status) &&
			(!filters.period?.from || product.importedAt >= filters.period.from) &&
			(!filters.period?.to ||
				product.importedAt <= endOfDay(filters.period.to)) &&
			(!filters.discountableOnly || product.discountable),
	);
}

function ProductFilterBar({
	filters,
	onFiltersChange,
	size,
	actions,
}: {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	size?: FilterSize;
	actions?: React.ReactNode;
}) {
	const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
		onFiltersChange({ ...filters, [key]: value });

	return (
		<FilterBar size={size} actions={actions}>
			<FilterSearch
				label="Search"
				placeholder="Name or product ID"
				value={filters.search}
				onValueChange={(value) => set("search", value)}
			/>
			<FilterMultiSelect
				label="Brand"
				placeholder="All brands"
				value={filters.brands}
				onValueChange={(value) => set("brands", value)}
				options={brandOptions}
			/>
			<FilterSelect
				label="Status"
				value={filters.status}
				onValueChange={(value) => set("status", value)}
				options={statusOptions}
			/>
			<FilterDateRange
				label="Imported"
				value={filters.period}
				onValueChange={(period) => set("period", period)}
			/>
			<FilterToggle
				label="Discountable only"
				checked={filters.discountableOnly}
				onCheckedChange={(checked) => set("discountableOnly", checked)}
			/>
			<FilterReset
				active={isFiltered(filters)}
				onReset={() => onFiltersChange(initialFilters)}
			/>
		</FilterBar>
	);
}

/** Holds the filter state so each story can be clicked through. */
function ProductFilters({
	size = "default",
	withActions = false,
	initial = initialFilters,
}: {
	size?: FilterSize;
	withActions?: boolean;
	initial?: FilterState;
}) {
	const [filters, setFilters] = React.useState(initial);

	return (
		<ProductFilterBar
			filters={filters}
			onFiltersChange={setFilters}
			size={size}
			actions={
				withActions ? (
					<Button variant="outline" size={size}>
						<DownloadIcon data-icon="inline-start" />
						Export
					</Button>
				) : undefined
			}
		/>
	);
}

const dateTime = new Intl.DateTimeFormat("en-US", {
	day: "2-digit",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

const statusVariant = {
	active: "default",
	draft: "secondary",
	archived: "outline",
} as const;

const column = createDataTableColumnHelper<Product>();

const columns = column.columns([
	column.accessor("id", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Product ID" />
		),
		cell: (info) => (
			<a href={`?product=${info.getValue()}`} className={cellLinkClassName}>
				<IdCell>{info.getValue()}</IdCell>
			</a>
		),
		sortFn: "text",
	}),
	column.accessor("name", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		sortFn: "text",
	}),
	column.accessor("brand", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Brand" />
		),
		sortFn: "text",
	}),
	column.accessor("status", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: (info) => (
			<TagCell
				variant={statusVariant[info.getValue()]}
				className="fui:capitalize"
			>
				{info.getValue()}
			</TagCell>
		),
		sortFn: "text",
	}),
	column.accessor("discountable", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Discountable" />
		),
		cell: (info) => (
			<BooleanCell value={info.getValue()} label="Discountable" />
		),
	}),
	column.accessor("importedAt", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Imported" />
		),
		cell: (info) => (
			<span className="fui:whitespace-nowrap fui:text-muted-foreground">
				{dateTime.format(info.getValue())}
			</span>
		),
		sortFn: "datetime",
	}),
]);

function FilteredProductTable({ size = "default" }: { size?: FilterSize }) {
	const [filters, setFilters] = React.useState(initialFilters);
	const rows = React.useMemo(() => applyFilters(products, filters), [filters]);

	return (
		<DataTable
			columns={columns}
			data={rows}
			getRowId={(product) => product.id}
			searchable={false}
			hideableColumns
			toolbarSize={size}
			toolbar={
				<ProductFilterBar
					filters={filters}
					onFiltersChange={setFilters}
					size={size}
				/>
			}
			empty="No products match these filters."
		/>
	);
}

const meta = {
	title: "Forms/Filters",
	component: ProductFilters,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Labelled filter controls for a listing: `FilterSearch`, `FilterSelect`, `FilterMultiSelect`, `FilterDateRange`, `FilterToggle` and `FilterReset`, laid out by `FilterBar`. The bar's `size` sets every control's height so they share a bottom edge. `FilterReset` only appears once something is filtered.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["default", "sm"],
		},
		withActions: { control: "boolean" },
		initial: { table: { disable: true } },
	},
	args: {
		size: "default",
		withActions: false,
	},
} satisfies Meta<typeof ProductFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: { size: "sm" },
};

export const WithActions: Story = {
	args: { withActions: true },
};

export const Active: Story = {
	args: {
		initial: {
			search: "",
			brands: ["FancyBrand", "Hydra"],
			status: "all",
			period: {
				from: new Date("2026-09-01T00:00:00Z"),
				to: new Date("2026-09-30T00:00:00Z"),
			},
			discountableOnly: true,
		},
	},
};

export const InDataTable: Story = {
	name: "In Data Table",
	render: (args) => <FilteredProductTable size={args.size} />,
};
