import type { PaginationState, SortingState } from "@tanstack/react-table";

import { DEFAULT_PAGE_SIZE } from "@/components/pagination";

/**
 * Converts between a server-driven `DataTable`'s state and the way a list page
 * keeps it in its URL: a 1-based `page` and a `pageSize`, a sort `field` and
 * whether it runs descending.
 *
 * The table counts pages from 0 and holds sorting as a list of columns; a URL
 * reads better with page 1 as the first page and a single sort field. These
 * helpers keep that conversion in one place instead of in every list page.
 *
 * ```tsx
 * <DataTable
 *   pagination={toPaginationState(search)}
 *   onPaginationChange={(next) =>
 *     navigate({ search: { ...search, ...fromPaginationState(next) } })
 *   }
 *   sorting={toSortingState(search.sort, search.order === "desc")}
 *   onSortingChange={(next) => {
 *     const { field, desc } = fromSortingState(next);
 *     // A new order starts over on page 1: the page the user was on may now
 *     // show different rows.
 *     navigate({ search: { ...search, sort: field, order: desc ? "desc" : "asc", page: 1 } });
 *   }}
 * />
 * ```
 */

/** A list's page as its URL keeps it: `page` counts from 1. */
type PageParams = { page: number; pageSize: number };

/**
 * The URL's page as the table's pagination. A missing or invalid page is the
 * first page, a missing or invalid page size `DEFAULT_PAGE_SIZE`.
 */
function toPaginationState(
	{ page, pageSize }: { page?: number | null; pageSize?: number | null },
	defaultPageSize: number = DEFAULT_PAGE_SIZE,
): PaginationState {
	return {
		pageIndex: isCount(page) ? page - 1 : 0,
		pageSize: isCount(pageSize) ? pageSize : defaultPageSize,
	};
}

/** The table's pagination as the URL's page. */
function fromPaginationState({
	pageIndex,
	pageSize,
}: PaginationState): PageParams {
	return { page: pageIndex + 1, pageSize };
}

/**
 * The URL's sort field and direction as the table's sorting. No field means
 * the table shows no column as sorted.
 */
function toSortingState(
	field: string | null | undefined,
	desc: boolean,
): SortingState {
	return field ? [{ id: field, desc }] : [];
}

/**
 * The table's sorting as the URL's sort field and direction: the first sorted
 * column, or no field when sorting was cleared. `Field` narrows the column id
 * to the field names the URL accepts.
 */
function fromSortingState<Field extends string = string>(
	sorting: SortingState,
): { field: Field | undefined; desc: boolean } {
	const first = sorting[0];
	return { field: first?.id as Field | undefined, desc: first?.desc ?? false };
}

function isCount(value: number | null | undefined): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 1;
}

export {
	fromPaginationState,
	fromSortingState,
	type PageParams,
	toPaginationState,
	toSortingState,
};
