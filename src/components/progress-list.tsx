import { cn } from "cn";
import type * as React from "react";

import { Progress, ProgressLabel, ProgressValue } from "@/components/progress";

/**
 * Labelled progress bars in a column, for how far several things are toward
 * their target: goals for the quarter, the share of variants each projection
 * covers. Compose a `ProgressListItem` per bar.
 */
function ProgressList({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="progress-list"
			className={cn("fui:flex fui:flex-col fui:gap-5", className)}
			{...props}
		/>
	);
}

/**
 * One bar: its `label` and the value as a percentage on one line, the bar
 * under them. `value` counts toward `max` (100 by default). `color` sets the
 * bar's colour as a CSS value, e.g. `var(--chart-2)`, so a list can follow a
 * chart's palette; without it the bar takes the primary colour.
 *
 * The bar is a labelled progress element, so a screen reader announces the
 * label with the value.
 */
function ProgressListItem({
	label,
	value,
	max = 100,
	color,
	className,
}: {
	label: React.ReactNode;
	value: number;
	max?: number;
	color?: string;
	className?: string;
}) {
	return (
		<li data-slot="progress-list-item" className={className}>
			<Progress
				value={value}
				max={max}
				// The bar's colour comes in through a variable, so any CSS colour
				// works without a class per colour.
				style={
					color
						? ({ "--progress-color": color } as React.CSSProperties)
						: undefined
				}
				className={cn(
					"fui:gap-2",
					color &&
						"fui:[&_[data-slot=progress-indicator]]:bg-(--progress-color)",
				)}
			>
				<ProgressLabel className="fui:font-normal">{label}</ProgressLabel>
				<ProgressValue />
			</Progress>
		</li>
	);
}

export { ProgressList, ProgressListItem };
