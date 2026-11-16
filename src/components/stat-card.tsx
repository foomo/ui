import { cn } from "cn";
import type * as React from "react";

import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/card";

// Flex, not grid: a row that does not divide evenly leaves no dead space.
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
	sm: {
		value: "fui:text-2xl fui:tracking-tight",
		label: "fui:text-xs",
		header: "fui:gap-0",
	},
} as const;

/** A number `value` is locale-formatted; `onClick` makes the card a toggle button pressed by `active`. */
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
