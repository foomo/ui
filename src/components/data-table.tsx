"use client";

import {
	type Column,
	type ColumnDef,
	type ColumnFiltersState,
	type ColumnVisibilityState,
	columnFilteringFeature,
	columnVisibilityFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	globalFilteringFeature,
	type PaginationState,
	type ReactTable,
	type Row,
	type RowSelectionState,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	type SortingState,
	sortFn_alphanumeric,
	sortFn_datetime,
	sortFn_text,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { cn } from "cn";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	ChevronsUpDownIcon,
	SearchIcon,
	Settings2Icon,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";

/**
 * Feature set for `DataTable`. TanStack Table v9 is opt-in: features and their
 * row models are registered here, and the resulting type parameterises every
 * column definition. Row-model factories take no arguments, and the core row
 * model is implicit — never register it.
 */
const dataTableFeatures = tableFeatures({
	columnFilteringFeature,
	columnVisibilityFeature,
	globalFilteringFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	filterFns: { includesString: filterFn_includesString },
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
});

type DataTableFeatures = typeof dataTableFeatures;

// biome-ignore lint/suspicious/noExplicitAny: column values are intentionally unconstrained.
type DataTableColumnDef<TData extends Record<string, any>> = ColumnDef<
	DataTableFeatures,
	TData,
	// biome-ignore lint/suspicious/noExplicitAny: matches TanStack's own TValue default.
	any
>;

// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
type DataTableRow<TData extends Record<string, any>> = Row<
	DataTableFeatures,
	TData
>;

// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
type DataTableInstance<TData extends Record<string, any>> = ReactTable<
	DataTableFeatures,
	TData
>;

/**
 * Typed column helper bound to the `DataTable` feature set.
 *
 * @example
 * const column = createDataTableColumnHelper<Invoice>();
 * const columns = column.columns([
 *   column.accessor("amount", { header: "Amount", sortFn: "alphanumeric" }),
 * ]);
 */
// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
function createDataTableColumnHelper<TData extends Record<string, any>>() {
	return createColumnHelper<DataTableFeatures, TData>();
}

/* -------------------------------------------------------------------------- */
/*                                column header                               */
/* -------------------------------------------------------------------------- */

type DataTableColumnHeaderProps<
	// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
	TData extends Record<string, any>,
	TValue,
> = React.ComponentProps<"div"> & {
	/** `Column` is invariant in `TData`/`TValue`, so both must be generic here. */
	column: Column<DataTableFeatures, TData, TValue>;
	title: string;
	align?: "start" | "end";
};

/**
 * Sortable header cell. Renders plain text when the column cannot be sorted so
 * it stays out of the tab order.
 */
function DataTableColumnHeader<
	// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
	TData extends Record<string, any>,
	TValue,
>({
	column,
	title,
	align = "start",
	className,
	...props
}: DataTableColumnHeaderProps<TData, TValue>) {
	const sorted = column.getIsSorted();

	if (!column.getCanSort()) {
		return (
			<div
				data-slot="data-table-column-header"
				className={cn(align === "end" && "lib:text-right", className)}
				{...props}
			>
				{title}
			</div>
		);
	}

	const Icon =
		sorted === "asc"
			? ArrowUpIcon
			: sorted === "desc"
				? ArrowDownIcon
				: ChevronsUpDownIcon;

	return (
		<div
			data-slot="data-table-column-header"
			className={cn(
				"lib:flex lib:items-center",
				align === "end" && "lib:justify-end",
				className,
			)}
			{...props}
		>
			<Button
				variant="ghost"
				size="sm"
				onClick={column.getToggleSortingHandler()}
				aria-label={
					sorted === "asc"
						? `${title}, sorted ascending`
						: sorted === "desc"
							? `${title}, sorted descending`
							: `${title}, not sorted`
				}
				className="lib:-mx-2 lib:h-7 lib:gap-1 lib:font-medium lib:data-[sorted=true]:text-foreground"
				data-sorted={sorted !== false}
			>
				{title}
				<Icon
					data-icon="inline-end"
					className={cn(sorted === false && "lib:opacity-50")}
				/>
			</Button>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*                              selection column                              */
/* -------------------------------------------------------------------------- */

/**
 * Ready-made checkbox column. Spread it as the first entry of `columns`.
 */
function dataTableSelectColumn<
	// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
	TData extends Record<string, any>,
>(): DataTableColumnDef<TData> {
	return {
		id: "select",
		enableSorting: false,
		enableHiding: false,
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(value === true)
				}
				aria-label="Select all rows on this page"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				disabled={!row.getCanSelect()}
				onCheckedChange={(value) => row.toggleSelected(value === true)}
				aria-label={`Select row ${row.id}`}
			/>
		),
	};
}

/* -------------------------------------------------------------------------- */
/*                                 data table                                 */
/* -------------------------------------------------------------------------- */

// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
type DataTableProps<TData extends Record<string, any>> = Omit<
	React.ComponentProps<"div">,
	"children"
> & {
	columns: Array<DataTableColumnDef<TData>>;
	data: TData[];
	/** Stable row identity — required for selection to survive sorting. */
	getRowId?: (row: TData, index: number) => string;
	/** Show the search field. Pass a string to override the placeholder. */
	searchable?: boolean | string;
	/** Show the column visibility menu. */
	hideableColumns?: boolean;
	/** Show pagination controls. Pass `false` to render every row. */
	pageSize?: number | false;
	pageSizeOptions?: number[];
	enableRowSelection?: boolean;
	onRowSelectionChange?: (rows: TData[]) => void;
	/** Rendered in place of the table body when there are no matching rows. */
	empty?: React.ReactNode;
	/** Extra controls rendered in the toolbar, after the search field. */
	toolbar?: React.ReactNode;
};

function DataTable<
	// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
	TData extends Record<string, any>,
>({
	columns,
	data,
	getRowId,
	searchable = false,
	hideableColumns = false,
	pageSize = 10,
	pageSizeOptions = [5, 10, 20, 50],
	enableRowSelection = false,
	onRowSelectionChange,
	empty = "No results.",
	toolbar,
	className,
	...props
}: DataTableProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [columnVisibility, setColumnVisibility] =
		React.useState<ColumnVisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: pageSize === false ? Infinity : pageSize,
	});

	const table = useTable({
		features: dataTableFeatures,
		columns,
		data,
		getRowId,
		enableRowSelection,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			columnVisibility,
			rowSelection,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
	});

	const selectedRows = table.getSelectedRowModel().rows;

	// biome-ignore lint/correctness/useExhaustiveDependencies: rowSelection is the trigger; the table instance is recreated every render.
	React.useEffect(() => {
		onRowSelectionChange?.(
			selectedRows.map((row: DataTableRow<TData>) => row.original),
		);
	}, [rowSelection]);

	const rows = table.getRowModel().rows;
	const showToolbar = searchable !== false || hideableColumns || !!toolbar;

	return (
		<div
			data-slot="data-table"
			className={cn("lib:flex lib:flex-col lib:gap-3", className)}
			{...props}
		>
			{showToolbar && (
				<div className="lib:flex lib:flex-wrap lib:items-center lib:gap-2">
					{searchable !== false && (
						<InputGroup className="lib:w-full lib:sm:w-64">
							<InputGroupAddon>
								<SearchIcon />
							</InputGroupAddon>
							<InputGroupInput
								value={globalFilter}
								onChange={(event) => setGlobalFilter(event.target.value)}
								placeholder={
									typeof searchable === "string" ? searchable : "Search…"
								}
								aria-label="Search table"
							/>
						</InputGroup>
					)}
					{toolbar}
					{hideableColumns && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="lib:ml-auto">
									<Settings2Icon data-icon="inline-start" />
									Columns
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="lib:w-44">
								<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									{table
										.getAllColumns()
										.filter((column) => column.getCanHide())
										.map((column) => (
											<DropdownMenuCheckboxItem
												key={column.id}
												checked={column.getIsVisible()}
												onCheckedChange={(value) =>
													column.toggleVisibility(!!value)
												}
												onSelect={(event) => event.preventDefault()}
												className="lib:capitalize"
											>
												{column.id}
											</DropdownMenuCheckboxItem>
										))}
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			)}

			<div className="lib:overflow-hidden lib:rounded-lg lib:border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										aria-sort={
											header.column.getIsSorted() === "asc"
												? "ascending"
												: header.column.getIsSorted() === "desc"
													? "descending"
													: undefined
										}
									>
										{header.isPlaceholder ? null : (
											<table.FlexRender header={header} />
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{rows.length === 0 ? (
							<TableRow className="lib:hover:bg-transparent">
								<TableCell
									colSpan={table.getAllLeafColumns().length}
									className="lib:h-28 lib:text-center lib:text-muted-foreground"
								>
									{empty}
								</TableCell>
							</TableRow>
						) : (
							rows.map((row: DataTableRow<TData>) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() ? "selected" : undefined}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{pageSize !== false && (
				<div className="lib:flex lib:flex-wrap lib:items-center lib:justify-between lib:gap-3">
					<p className="lib:text-sm lib:text-muted-foreground">
						{enableRowSelection
							? `${selectedRows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected`
							: `${table.getFilteredRowModel().rows.length} row(s)`}
					</p>

					<div className="lib:flex lib:items-center lib:gap-4">
						<div className="lib:flex lib:items-center lib:gap-2">
							<span className="lib:text-sm lib:text-muted-foreground">
								Rows per page
							</span>
							<Select
								value={String(table.state.pagination.pageSize)}
								onValueChange={(value) => table.setPageSize(Number(value))}
							>
								<SelectTrigger size="sm" className="lib:w-18">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{pageSizeOptions.map((option) => (
											<SelectItem key={option} value={String(option)}>
												{option}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<span className="lib:text-sm lib:tabular-nums lib:text-muted-foreground">
							Page {table.state.pagination.pageIndex + 1} of{" "}
							{Math.max(table.getPageCount(), 1)}
						</span>

						<div className="lib:flex lib:items-center lib:gap-1">
							<Button
								variant="outline"
								size="icon-sm"
								onClick={() => table.firstPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<ChevronsLeftIcon />
								<span className="lib:sr-only">First page</span>
							</Button>
							<Button
								variant="outline"
								size="icon-sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<ChevronLeftIcon />
								<span className="lib:sr-only">Previous page</span>
							</Button>
							<Button
								variant="outline"
								size="icon-sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								<ChevronRightIcon />
								<span className="lib:sr-only">Next page</span>
							</Button>
							<Button
								variant="outline"
								size="icon-sm"
								onClick={() => table.lastPage()}
								disabled={!table.getCanNextPage()}
							>
								<ChevronsRightIcon />
								<span className="lib:sr-only">Last page</span>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export {
	DataTable,
	DataTableColumnHeader,
	createDataTableColumnHelper,
	dataTableFeatures,
	dataTableSelectColumn,
	type DataTableColumnDef,
	type DataTableFeatures,
	type DataTableInstance,
	type DataTableProps,
	type DataTableRow,
};
