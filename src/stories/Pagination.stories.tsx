import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Badge } from "../components/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/card";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPager,
	PaginationPrevious,
} from "../components/pagination";

const promotions = Array.from({ length: 34 }, (_, index) => ({
	id: `promo-${String(index + 1).padStart(3, "0")}`,
	name: [
		"Autumn sale",
		"Multibuy 3 for 2",
		"Weekend deal",
		"Member price",
		"Clearance",
	][index % 5],
	active: index % 3 !== 2,
}));

/**
 * The pages to show: always the first and last, the current one with a
 * neighbour on each side, and an ellipsis for each gap. Short lists show
 * every page.
 */
function pageItems(
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

function Pager({
	page,
	total,
	onPageChange,
}: {
	page: number;
	total: number;
	onPageChange: (page: number) => void;
}) {
	const go = (next: number) => (event: React.MouseEvent) => {
		event.preventDefault();
		if (next >= 1 && next <= total) onPageChange(next);
	};
	// An `<a>` has no `disabled`, so the ends are marked with `aria-disabled`.
	const atStart = page === 1;
	const atEnd = page === total;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={go(page - 1)}
						aria-disabled={atStart}
						className={atStart ? "fui:pointer-events-none fui:opacity-50" : ""}
					/>
				</PaginationItem>
				{pageItems(page, total).map((item) =>
					typeof item === "string" ? (
						<PaginationItem key={item}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={item}>
							<PaginationLink
								href="#"
								isActive={item === page}
								onClick={go(item)}
							>
								{item}
							</PaginationLink>
						</PaginationItem>
					),
				)}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={go(page + 1)}
						aria-disabled={atEnd}
						className={atEnd ? "fui:pointer-events-none fui:opacity-50" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

const pageSizeOptions = [3, 6, 12, 24];

/**
 * A list of cards, for content that is not a table, with one of the two
 * pagers below: numbered pages, or the compact pager the Data Table uses,
 * which can also change the page size.
 */
function PaginatedCards({
	pager = "numbered",
	pageSize: initialPageSize = 6,
}: {
	pager?: "numbered" | "compact";
	pageSize?: number;
}) {
	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(initialPageSize);
	React.useEffect(() => setPageSize(initialPageSize), [initialPageSize]);

	const total = Math.ceil(promotions.length / pageSize);
	const current = Math.min(page, total);
	const visible = promotions.slice(
		(current - 1) * pageSize,
		current * pageSize,
	);

	return (
		<div className="fui:flex fui:flex-col fui:gap-6">
			<div className="fui:grid fui:gap-4 fui:sm:grid-cols-2 fui:lg:grid-cols-3">
				{visible.map((promotion) => (
					<Card key={promotion.id} size="sm">
						<CardHeader>
							<CardTitle>{promotion.name}</CardTitle>
							<CardDescription className="fui:flex fui:items-center fui:justify-between fui:tabular-nums">
								{promotion.id}
								<Badge variant={promotion.active ? "success" : "outline"}>
									{promotion.active ? "Active" : "Ended"}
								</Badge>
							</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
			{pager === "numbered" ? (
				<Pager page={current} total={total} onPageChange={setPage} />
			) : (
				<PaginationPager
					page={current}
					pageCount={total}
					onPageChange={setPage}
					pageSize={pageSize}
					pageSizeOptions={pageSizeOptions}
					onPageSizeChange={(size) => {
						setPageSize(size);
						setPage(1);
					}}
					pageSizeLabel="Cards per page"
					summary={`${promotions.length} promotions`}
				/>
			)}
		</div>
	);
}

const meta = {
	title: "Navigation/Pagination",
	component: PaginatedCards,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					'Two ways to page through a list. Numbered pages suit a short run of pages: compose `PaginationPrevious`, `PaginationLink` (with `isActive` on the current page), `PaginationEllipsis` for skipped pages and `PaginationNext`; the links are anchors, so each page can have its own URL. `PaginationPager` is the compact alternative the Data Table uses: "Page 3 of 12" with first, previous, next and last buttons, an optional page-size select (`onPageSizeChange`, `pageSizeLabel`) and a `summary` on the left.',
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		pager: {
			control: "inline-radio",
			options: ["numbered", "compact"],
		},
		pageSize: {
			control: "select",
			options: pageSizeOptions,
		},
	},
	args: {
		pager: "numbered",
		pageSize: 6,
	},
} satisfies Meta<typeof PaginatedCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
	args: { pager: "compact" },
};
