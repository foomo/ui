import {
	ArrowDownIcon,
	ArrowUpIcon,
	CaretUpDownIcon,
	MagnifyingGlassIcon,
	SlidersHorizontalIcon,
} from "@phosphor-icons/react";
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
import { FilterLabelSpacer } from "@/components/filters";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/input-group";
import { DEFAULT_PAGE_SIZE, PaginationPager } from "@/components/pagination";
import { Skeleton } from "@/components/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";

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

// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
function createDataTableColumnHelper<TData extends Record<string, any>>() {
	return createColumnHelper<DataTableFeatures, TData>();
}

type DataTableColumnHeaderProps<
	// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
	TData extends Record<string, any>,
	TValue,
> = React.ComponentProps<"div"> & {
	column: Column<DataTableFeatures, TData, TValue>;
	title: string;
	align?: "start" | "end";
	/**
	 * Explains the column in a tooltip. The title gets a dotted underline and
	 * a help cursor; a sortable header shows the tooltip on its sort button.
	 */
	hint?: string;
};

function DataTableColumnHeader<
	// biome-ignore lint/suspicious/noExplicitAny: mirrors TanStack's RowData constraint.
	TData extends Record<string, any>,
	TValue,
>({
	column,
	title,
	align = "start",
	hint,
	className,
	...props
}: DataTableColumnHeaderProps<TData, TValue>) {
	const sorted = column.getIsSorted();

	if (!column.getCanSort()) {
		return (
			<div
				data-slot="data-table-column-header"
				className={cn(align === "end" && "fui:text-right", className)}
				{...props}
			>
				{hint ? (
					<Tooltip>
						<TooltipTrigger
							type="button"
							className="fui:cursor-help fui:underline fui:decoration-dotted fui:underline-offset-4"
						>
							{title}
						</TooltipTrigger>
						<TooltipContent>{hint}</TooltipContent>
					</Tooltip>
				) : (
					title
				)}
			</div>
		);
	}

	const Icon =
		sorted === "asc"
			? ArrowUpIcon
			: sorted === "desc"
				? ArrowDownIcon
				: CaretUpDownIcon;

	const sortButton = (
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
			// The sorted column is marked like the active sidebar entry: a 2px
			// line in the foreground colour under its title, with no fill. Hover
			// shows the same line in the border colour, as in the sidebar. The
			// line is a bottom border on the title (a transparent top border
			// keeps it centred), so the sort icon stays outside it; the ghost
			// variant's fill and text underline are switched off.
			className="fui:-mx-2 fui:h-7 fui:gap-1 fui:font-medium fui:no-underline fui:hover:bg-transparent fui:dark:hover:bg-transparent fui:aria-expanded:bg-transparent fui:[&>span]:border-y-2 fui:[&>span]:border-transparent fui:[&>span]:py-0.5 fui:not-data-[sorted=true]:hover:[&>span]:border-b-border fui:data-[sorted=true]:[&>span]:border-b-foreground"
			data-sorted={sorted !== false}
		>
			<span>{title}</span>
			<Icon
				data-icon="inline-end"
				className={cn(sorted === false && "fui:opacity-50")}
			/>
		</Button>
	);

	return (
		<div
			data-slot="data-table-column-header"
			className={cn(
				"fui:flex fui:items-center",
				align === "end" && "fui:justify-end",
				className,
			)}
			{...props}
		>
			{hint ? (
				<Tooltip>
					<TooltipTrigger render={sortButton} />
					<TooltipContent>{hint}</TooltipContent>
				</Tooltip>
			) : (
				sortButton
			)}
		</div>
	);
}

/**
 * The content of an expanded row, for `renderSubComponent`: padded, with an
 * optional small heading (`title`) and `description` above the detail, which
 * is usually a nested `DataTable` with `pageSize={false}`.
 */
function DataTableSubPanel({
	title,
	description,
	className,
	children,
}: {
	title?: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			data-slot="data-table-sub-panel"
			className={cn("fui:space-y-2 fui:px-4 fui:py-3", className)}
		>
			{title ? (
				<p className="fui:text-xs fui:text-muted-foreground">{title}</p>
			) : null}
			{description ? (
				<p className="fui:text-xs fui:text-muted-foreground">{description}</p>
			) : null}
			{children}
		</div>
	);
}

/** Checkbox column. Spread it as the first entry of `columns`. */
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
				checked={table.getIsAllPageRowsSelected()}
				indeterminate={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
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
	/**
	 * Height of the toolbar's own controls — the search field and the column
	 * menu. Match it to the `size` of a `FilterBar` passed as `toolbar`, so
	 * every control on that row shares a bottom edge.
	 */
	toolbarSize?: "default" | "sm";
	/** Show pagination controls. Pass `false` to render every row. */
	pageSize?: number | false;
	pageSizeOptions?: number[];
	enableRowSelection?: boolean;
	onRowSelectionChange?: (rows: TData[]) => void;
	/** Rendered in place of the table body when there are no matching rows. */
	empty?: React.ReactNode;
	/**
	 * The rows are being fetched. While there are none to show yet, placeholder
	 * rows stand in for them, instead of `empty`, which would claim there is
	 * nothing to show. Rows already on screen stay during a refetch, so a
	 * query's `isFetching` and `isLoading` both work.
	 */
	loading?: boolean;
	/** How many placeholder rows `loading` shows. */
	loadingRows?: number;
	/** Extra controls rendered in the toolbar, after the search field. */
	toolbar?: React.ReactNode;
	/** Optional detail row rendered directly below each data row. */
	renderSubComponent?: (row: DataTableRow<TData>) => React.ReactNode;

	/* ------------------------------ server-driven ----------------------------- */
	/*
	 * Each of the three concerns below is controlled when its state prop is
	 * passed, and the table then stops doing that work itself — TanStack's
	 * `manualSorting` / `manualPagination` / `manualFiltering`. Leave them out
	 * and everything happens client-side over `data`, as before.
	 *
	 * This is what a table whose rows come back a page at a time needs: sorting
	 * or filtering the rows already fetched would only reorder the current
	 * window while presenting it as the whole result.
	 */

	/**
	 * Sort state owned by the caller. Implies the sort is the server's, unless
	 * `manualSorting` says otherwise.
	 */
	sorting?: SortingState;
	onSortingChange?: (sorting: SortingState) => void;
	/**
	 * Page state owned by the caller. Implies paging is the server's, unless
	 * `manualPagination` says otherwise.
	 */
	pagination?: PaginationState;
	onPaginationChange?: (pagination: PaginationState) => void;
	/**
	 * Total unpaged rows, as reported by the server. Required alongside
	 * `pagination` — without it the table cannot know how many pages exist, and
	 * "Next" would stop working after the first one.
	 */
	rowCount?: number;
	/**
	 * Search term owned by the caller. Implies filtering is the server's, unless
	 * `manualFiltering` says otherwise.
	 */
	globalFilter?: string;
	onGlobalFilterChange?: (value: string) => void;

	/*
	 * Who does the work, when that is not the same question as who holds the
	 * state. Each defaults to "the server" when the matching state prop is
	 * passed, which is the common case.
	 *
	 * Set one to `false` alongside its state prop for a table that holds the
	 * complete result but keeps the state elsewhere — a listing that persists
	 * its search in the URL, say. The table then still sorts, filters and pages
	 * its rows itself, and the caller only stores the state.
	 */
	manualSorting?: boolean;
	manualPagination?: boolean;
	manualFiltering?: boolean;
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
	toolbarSize = "default",
	pageSize = DEFAULT_PAGE_SIZE,
	pageSizeOptions = [5, 10, 20, 50],
	enableRowSelection = false,
	onRowSelectionChange,
	empty = "No results.",
	loading = false,
	loadingRows = 5,
	toolbar,
	renderSubComponent,
	className,
	sorting: sortingProp,
	onSortingChange: onSortingChangeProp,
	pagination: paginationProp,
	onPaginationChange: onPaginationChangeProp,
	rowCount,
	globalFilter: globalFilterProp,
	onGlobalFilterChange: onGlobalFilterChangeProp,
	manualSorting: manualSortingProp,
	manualPagination: manualPaginationProp,
	manualFiltering: manualFilteringProp,
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

	// Server-driven by default whenever the caller holds the state, but a
	// caller with the complete result can opt back out.
	const manualSorting = manualSortingProp ?? sortingProp !== undefined;
	const manualPagination = manualPaginationProp ?? paginationProp !== undefined;
	const manualFiltering = manualFilteringProp ?? globalFilterProp !== undefined;

	/**
	 * TanStack hands updaters through as `T | ((old: T) => T)`, so resolve them
	 * against the current value before calling the caller's plain setter.
	 */
	const resolve = <T,>(updater: T | ((old: T) => T), current: T): T =>
		typeof updater === "function"
			? (updater as (old: T) => T)(current)
			: updater;

	const table = useTable({
		features: dataTableFeatures,
		columns,
		data,
		getRowId,
		enableRowSelection,
		manualSorting,
		manualPagination,
		manualFiltering,
		// Only meaningful under `manualPagination`; TanStack derives it from the
		// row count otherwise.
		rowCount: manualPagination ? rowCount : undefined,
		state: {
			sorting: sortingProp ?? sorting,
			columnFilters,
			globalFilter: globalFilterProp ?? globalFilter,
			columnVisibility,
			rowSelection,
			pagination: paginationProp ?? pagination,
		},
		onSortingChange: (updater) => {
			if (onSortingChangeProp) {
				onSortingChangeProp(resolve(updater, sortingProp ?? sorting));
				return;
			}
			setSorting(updater);
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: (updater) => {
			if (onGlobalFilterChangeProp) {
				onGlobalFilterChangeProp(resolve(updater, globalFilterProp ?? ""));
				return;
			}
			setGlobalFilter(updater);
		},
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: (updater) => {
			if (onPaginationChangeProp) {
				onPaginationChangeProp(resolve(updater, paginationProp ?? pagination));
				return;
			}
			setPagination(updater);
		},
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
			className={cn("fui:flex fui:flex-col fui:gap-3", className)}
			{...props}
		>
			{showToolbar && (
				// The search and `toolbar` wrap on the left; the column menu sits in
				// its own container on the right, so it stays put when the filters
				// wrap or "Clear filters" appears. Beside labelled filters it gets a
				// label-high spacer, so it lines up with their first row.
				<div className="fui:group/toolbar fui:flex fui:items-start fui:gap-6">
					<div className="fui:flex fui:min-w-0 fui:flex-1 fui:flex-wrap fui:items-end fui:gap-2">
						{searchable !== false && (
							<InputGroup
								className={cn(
									"fui:w-full fui:sm:w-64",
									toolbarSize === "sm" && "fui:h-8",
								)}
							>
								<InputGroupAddon>
									<MagnifyingGlassIcon />
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
					</div>
					{hideableColumns && (
						<div className="fui:flex fui:shrink-0 fui:flex-col fui:gap-1">
							<FilterLabelSpacer className="fui:hidden fui:group-has-data-[slot=filter-field]/toolbar:block" />
							<DropdownMenu>
								<DropdownMenuTrigger
									render={
										<Button variant="outline" size={toolbarSize}>
											<SlidersHorizontalIcon data-icon="inline-start" />
											Columns
										</Button>
									}
								/>
								<DropdownMenuContent align="end" className="fui:w-44">
									<DropdownMenuGroup>
										<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
									</DropdownMenuGroup>
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
													className="fui:capitalize"
												>
													{column.id}
												</DropdownMenuCheckboxItem>
											))}
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>
			)}

			<div className="fui:overflow-hidden fui:rounded-lg fui:border fui:bg-card">
				<Table aria-busy={loading || undefined}>
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
						{loading && rows.length === 0 ? (
							Array.from({ length: loadingRows }, (_, index) => (
								// Placeholders with nothing to tell them apart but position.
								// biome-ignore lint/suspicious/noArrayIndexKey: static list
								<TableRow key={index} className="fui:hover:bg-transparent">
									{table.getVisibleLeafColumns().map((column, columnIndex) => (
										<TableCell key={column.id}>
											<Skeleton className="fui:h-4 fui:w-full fui:max-w-32 fui:rounded" />
											{index === 0 && columnIndex === 0 ? (
												<span className="fui:sr-only">Loading…</span>
											) : null}
										</TableCell>
									))}
								</TableRow>
							))
						) : rows.length === 0 ? (
							<TableRow className="fui:hover:bg-transparent">
								<TableCell
									colSpan={table.getAllLeafColumns().length}
									className="fui:h-28 fui:text-center fui:text-muted-foreground"
								>
									{empty}
								</TableCell>
							</TableRow>
						) : (
							rows.map((row: DataTableRow<TData>) => {
								const subComponent = renderSubComponent?.(row);

								return (
									<React.Fragment key={row.id}>
										<TableRow
											data-state={row.getIsSelected() ? "selected" : undefined}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													<table.FlexRender cell={cell} />
												</TableCell>
											))}
										</TableRow>
										{subComponent && (
											<TableRow className="fui:hover:bg-transparent">
												<TableCell
													colSpan={row.getVisibleCells().length}
													className="fui:bg-muted/50 fui:p-0"
												>
													{subComponent}
												</TableCell>
											</TableRow>
										)}
									</React.Fragment>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>

			{pageSize !== false && (
				<PaginationPager
					page={table.state.pagination.pageIndex + 1}
					pageCount={table.getPageCount()}
					onPageChange={(page) => table.setPageIndex(page - 1)}
					pageSize={table.state.pagination.pageSize}
					pageSizeOptions={pageSizeOptions}
					onPageSizeChange={(size) => table.setPageSize(size)}
				/>
			)}
		</div>
	);
}

export {
	createDataTableColumnHelper,
	DataTableSubPanel,
	DataTable,
	type DataTableColumnDef,
	DataTableColumnHeader,
	type DataTableFeatures,
	type DataTableInstance,
	type DataTableProps,
	type DataTableRow,
	dataTableFeatures,
	dataTableSelectColumn,
};
