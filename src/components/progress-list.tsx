import { cn } from "cn";
import type * as React from "react";

import { Progress, ProgressLabel, ProgressValue } from "@/components/progress";

function ProgressList({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="progress-list"
			className={cn("fui:flex fui:flex-col fui:gap-5", className)}
			{...props}
		/>
	);
}

/** `color` is any CSS colour, e.g. `var(--chart-2)`; the primary colour by default. */
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
