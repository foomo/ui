import {
	CaretLeftIcon,
	CaretRightIcon,
	DotsThreeIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";
import { Button } from "@/components/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/select";

/** Rows per page a paged list starts with, the Data Table's included. */
const DEFAULT_PAGE_SIZE = 50;

/**
 * The pages to show: always the first and last, the current one with a
 * neighbour on each side, and an ellipsis for each gap. Short lists show
 * every page.
 */
function paginationItems(
	current: number,
	total: number,
): (number | "gap-start" | "gap-end")[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

	const middle = [current - 1, current, current + 1].filter(
		(page) => page > 1 && page < total,
	);
	const items: (number | "gap-start" | "gap-end")[] = [1];
	if (middle[0] > 2) items.push("gap-start");
	items.push(...middle);
	if (middle[middle.length - 1] < total - 1) items.push("gap-end");
	items.push(total);
	return items;
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn(
				"fui:mx-auto fui:flex fui:w-full fui:justify-center",
				className,
			)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("fui:flex fui:items-center fui:gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	// Page numbers, and Previous and Next, opt out of the ghost button's
	// underline, like calendar days: they are navigation, not text actions.
	return (
		<Button
			variant={isActive ? "outline" : "ghost"}
			size={size}
			className={cn("fui:no-underline", className)}
			render={
				<a
					aria-current={isActive ? "page" : undefined}
					data-slot="pagination-link"
					data-active={isActive}
					{...props}
				/>
			}
		/>
	);
}

function PaginationPrevious({
	className,
	text = "Previous",
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("fui:pl-2!", className)}
			{...props}
		>
			<CaretLeftIcon data-icon="inline-start" />
			<span className="fui:hidden fui:sm:block">{text}</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	text = "Next",
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("fui:pr-2!", className)}
			{...props}
		>
			<span className="fui:hidden fui:sm:block">{text}</span>
			<CaretRightIcon data-icon="inline-end" />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"fui:flex fui:size-9 fui:items-center fui:justify-center fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<DotsThreeIcon />
			<span className="fui:sr-only">More pages</span>
		</span>
	);
}

/**
 * The pager for a list driven by state rather than URLs: an optional
 * page-size select on the left, and on the right Previous, the page numbers
 * (first, last, the current page with a neighbour on each side, an ellipsis
 * for each gap) and Next. The Data Table pages with it.
 *
 * It looks like the numbered composition above, but its controls are
 * buttons, so the ends can be truly `disabled`; compose `PaginationLink`s
 * instead when each page should have its own URL.
 *
 * `page` counts from 1. The page-size select only shows with
 * `onPageSizeChange`.
 */
function PaginationPager({
	page,
	pageCount,
	onPageChange,
	pageSize,
	pageSizeOptions = [5, 10, 20, 50],
	onPageSizeChange,
	pageSizeLabel = "Rows per page",
	previousLabel = "Previous",
	nextLabel = "Next",
	className,
}: {
	page: number;
	pageCount: number;
	onPageChange: (page: number) => void;
	pageSize?: number;
	pageSizeOptions?: number[];
	onPageSizeChange?: (pageSize: number) => void;
	pageSizeLabel?: string;
	previousLabel?: string;
	nextLabel?: string;
	className?: string;
}) {
	const lastPage = Math.max(pageCount, 1);
	const current = Math.min(Math.max(page, 1), lastPage);
	const atStart = current <= 1;
	const atEnd = current >= lastPage;

	return (
		<div
			data-slot="pagination-pager"
			className={cn(
				"fui:flex fui:flex-wrap fui:items-center fui:justify-between fui:gap-3",
				className,
			)}
		>
			{onPageSizeChange && pageSize !== undefined ? (
				<div className="fui:flex fui:items-center fui:gap-2">
					<span className="fui:text-sm fui:text-muted-foreground">
						{pageSizeLabel}
					</span>
					<Select
						value={String(pageSize)}
						onValueChange={(value) => onPageSizeChange(Number(value))}
					>
						<SelectTrigger className="fui:w-18" aria-label={pageSizeLabel}>
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
			) : null}

			{/* The same buttons `PaginationPrevious`, `PaginationLink` and
			    `PaginationNext` render, without the anchor. `ml-auto` keeps it
			    on the right when there is no page-size select beside it. */}
			<nav
				aria-label="pagination"
				data-slot="pagination"
				className="fui:ml-auto"
			>
				<PaginationContent>
					<PaginationItem>
						<Button
							variant="ghost"
							aria-label="Go to previous page"
							onClick={() => onPageChange(current - 1)}
							disabled={atStart}
							className="fui:pl-2! fui:no-underline"
						>
							<CaretLeftIcon data-icon="inline-start" />
							<span className="fui:hidden fui:sm:block">{previousLabel}</span>
						</Button>
					</PaginationItem>
					{paginationItems(current, lastPage).map((item) =>
						typeof item === "string" ? (
							<PaginationItem key={item}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={item}>
								<Button
									variant={item === current ? "outline" : "ghost"}
									size="icon"
									aria-current={item === current ? "page" : undefined}
									data-active={item === current}
									onClick={() => onPageChange(item)}
									className="fui:tabular-nums fui:no-underline"
								>
									{item}
								</Button>
							</PaginationItem>
						),
					)}
					<PaginationItem>
						<Button
							variant="ghost"
							aria-label="Go to next page"
							onClick={() => onPageChange(current + 1)}
							disabled={atEnd}
							className="fui:pr-2! fui:no-underline"
						>
							<span className="fui:hidden fui:sm:block">{nextLabel}</span>
							<CaretRightIcon data-icon="inline-end" />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</nav>
		</div>
	);
}

export {
	DEFAULT_PAGE_SIZE,
	paginationItems,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPager,
	PaginationPrevious,
};
