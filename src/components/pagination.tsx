import {
	CaretDoubleLeftIcon,
	CaretDoubleRightIcon,
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
	// Page numbers opt out of the ghost button's underline, like calendar days:
	// they form a row of positions rather than text actions.
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
			className={cn("fui:pl-2! fui:underline", className)}
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
			className={cn("fui:pr-2! fui:underline", className)}
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
 * The compact pager: "Page 3 of 12" with first, previous, next and last
 * buttons, plus an optional page-size select and a summary on the left. The
 * Data Table pages with it; use it for any list where page numbers would be
 * too many to show, or where the page size can change.
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
	summary,
	className,
}: {
	page: number;
	pageCount: number;
	onPageChange: (page: number) => void;
	pageSize?: number;
	pageSizeOptions?: number[];
	onPageSizeChange?: (pageSize: number) => void;
	pageSizeLabel?: string;
	summary?: React.ReactNode;
	className?: string;
}) {
	const lastPage = Math.max(pageCount, 1);
	const atStart = page <= 1;
	const atEnd = page >= lastPage;

	return (
		<div
			data-slot="pagination-pager"
			className={cn(
				"fui:flex fui:flex-wrap fui:items-center fui:justify-between fui:gap-3",
				className,
			)}
		>
			<p className="fui:text-sm fui:text-muted-foreground">{summary}</p>

			<div className="fui:flex fui:items-center fui:gap-4">
				{onPageSizeChange && pageSize !== undefined ? (
					<div className="fui:flex fui:items-center fui:gap-2">
						<span className="fui:text-sm fui:text-muted-foreground">
							{pageSizeLabel}
						</span>
						<Select
							value={String(pageSize)}
							onValueChange={(value) => onPageSizeChange(Number(value))}
						>
							<SelectTrigger
								size="sm"
								className="fui:w-18"
								aria-label={pageSizeLabel}
							>
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

				<span className="fui:text-sm fui:tabular-nums fui:text-muted-foreground">
					Page {page} of {lastPage}
				</span>

				<div className="fui:flex fui:items-center fui:gap-1">
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(1)}
						disabled={atStart}
					>
						<CaretDoubleLeftIcon />
						<span className="fui:sr-only">First page</span>
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(page - 1)}
						disabled={atStart}
					>
						<CaretLeftIcon />
						<span className="fui:sr-only">Previous page</span>
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(page + 1)}
						disabled={atEnd}
					>
						<CaretRightIcon />
						<span className="fui:sr-only">Next page</span>
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(lastPage)}
						disabled={atEnd}
					>
						<CaretDoubleRightIcon />
						<span className="fui:sr-only">Last page</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPager,
	PaginationPrevious,
};
