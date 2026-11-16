import type { PaginationState, SortingState } from "@tanstack/react-table";

import { DEFAULT_PAGE_SIZE } from "@/components/pagination";

/** A list's page as its URL keeps it: `page` counts from 1. */
type PageParams = { page: number; pageSize: number };

/** A missing or invalid page is the first page; a missing or invalid size is `defaultPageSize`. */
function toPaginationState(
	{ page, pageSize }: { page?: number | null; pageSize?: number | null },
	defaultPageSize: number = DEFAULT_PAGE_SIZE,
): PaginationState {
	return {
		pageIndex: isCount(page) ? page - 1 : 0,
		pageSize: isCount(pageSize) ? pageSize : defaultPageSize,
	};
}

function fromPaginationState({
	pageIndex,
	pageSize,
}: PaginationState): PageParams {
	return { page: pageIndex + 1, pageSize };
}

function toSortingState(
	field: string | null | undefined,
	desc: boolean,
): SortingState {
	return field ? [{ id: field, desc }] : [];
}

/** The first sorted column, or `field: undefined` when sorting is cleared or its id is not in `fields`. */
function fromSortingState<Field extends string>(
	sorting: SortingState,
	fields: readonly Field[],
): { field: Field | undefined; desc: boolean } {
	const first = sorting[0];
	const field = fields.find((allowed) => allowed === first?.id);
	return { field, desc: first?.desc ?? false };
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
