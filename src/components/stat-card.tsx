import { cn } from "cn";
import type * as React from "react";

import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/card";

/**
 * A row of {@link StatCard}s sharing the available width evenly.
 *
 * Flex rather than a grid: a grid column is sized independently of its
 * content, so a row that does not divide evenly leaves dead space beside the
 * last card, while `flex-1` items share what is there. It wraps, with a
 * minimum width on each card, so six cards beside an expanded sidebar do not
 * shrink past the point where the figure still fits.
 */
function StatCardRow({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="stat-card-row"
			className={cn("fui:flex fui:flex-wrap fui:gap-3", className)}
			{...props}
		/>
	);
}

const statCardSizes = {
	default: {
		value: "fui:text-4xl",
		label: "fui:text-base",
		header: undefined,
	},
	// No gap between figure and label: the compact card is read as one unit.
	sm: {
		value: "fui:text-2xl fui:tracking-tight",
		label: "fui:text-xs",
		header: "fui:gap-0",
	},
} as const;

/**
 * A key figure: a large number in the highlight colour above its label, on a
 * `Card`.
 *
 * `size="sm"` is the compact card for a row of figures above a listing (a
 * 24px figure and a small label on the small card); the default is the
 * dashboard's larger one. `icon` sits in the top-right corner, muted. A number
 * `value` is formatted for the reader's locale (`12.438`, `12,438`); anything
 * else renders as given.
 *
 * With `onClick` the card is a button, for a figure that also filters the
 * listing below it (clicking "PIM-managed" shows only those rows): it gets a
 * hover state, and `active` marks it pressed with a ring in the primary
 * colour.
 */
function StatCard({
	label,
	value,
	icon: Icon,
	size = "default",
	onClick,
	active,
	className,
}: {
	label: React.ReactNode;
	value: React.ReactNode;
	icon?: React.ComponentType<{ className?: string }>;
	size?: keyof typeof statCardSizes;
	onClick?: () => void;
	active?: boolean;
	className?: string;
}) {
	const sizes = statCardSizes[size];

	return (
		<Card
			size={size}
			render={
				onClick ? (
					<button type="button" onClick={onClick} aria-pressed={active} />
				) : undefined
			}
			// `max-w-125` (500px) keeps a row of two from stretching each card
			// across half the viewport.
			className={cn(
				"fui:min-w-40 fui:max-w-125 fui:flex-1",
				onClick &&
					"fui:text-left fui:transition-colors fui:hover:bg-tertiary fui:focus-visible:outline-none fui:focus-visible:ring-2 fui:focus-visible:ring-ring",
				active && "fui:ring-primary",
				className,
			)}
		>
			<CardHeader className={sizes.header}>
				<CardTitle
					className={cn(
						"fui:font-bold fui:tabular-nums fui:text-accent-highlight",
						sizes.value,
					)}
				>
					{typeof value === "number" ? value.toLocaleString() : value}
				</CardTitle>
				<CardDescription className={cn("fui:text-foreground", sizes.label)}>
					{label}
				</CardDescription>
				{Icon ? (
					<CardAction>
						<Icon className="fui:size-4 fui:text-muted-foreground" />
					</CardAction>
				) : null}
			</CardHeader>
		</Card>
	);
}

export { StatCard, StatCardRow };
