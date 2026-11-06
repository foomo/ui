import { cn } from "cn";
import type * as React from "react";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/card";

/**
 * Building blocks for a detail page: the page is a stack of section cards, one
 * per aspect of the record (its details, its variants, its overrides), laid
 * out two to a row by `SectionCardGrid`.
 */

/**
 * One aspect of a record: a card with an optional title, description and
 * header action (a refresh or edit button) over its content, typically a
 * `DescriptionList` or a `DataTable`.
 */
function SectionCard({
	title,
	description,
	action,
	className,
	children,
}: {
	title?: React.ReactNode;
	description?: React.ReactNode;
	/** The header's right-hand slot. */
	action?: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<Card data-slot="section-card" className={className}>
			{title || description || action ? (
				<CardHeader>
					{title ? <CardTitle>{title}</CardTitle> : null}
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
					{action ? <CardAction>{action}</CardAction> : null}
				</CardHeader>
			) : null}
			<CardContent>{children}</CardContent>
		</Card>
	);
}

/**
 * Lays out a run of `SectionCard`s two to a row from the `lg` breakpoint
 * (1024px), one per row below it, where two columns beside an open sidebar
 * would leave each card too narrow for its label column.
 *
 * A grid rather than flex-wrap: an odd last card keeps its half-width column
 * instead of stretching across the row, so the cards above stay lined up with
 * it.
 *
 * Wrap a run of sections, not a whole page: a row of stat cards or a wide
 * `DataTable` belongs beside the grid, not squeezed into one of its columns.
 *
 * The breakpoint is the viewport's rather than a container query on the grid's
 * own width: a container takes no width from its content, so the grid would
 * collapse wherever its parent sizes it to fit (`self-start` in a flex
 * column).
 */
function SectionCardGrid({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			data-slot="section-card-grid"
			className={cn("fui:grid fui:gap-6 fui:lg:grid-cols-2", className)}
		>
			{children}
		</div>
	);
}

export { SectionCard, SectionCardGrid };
