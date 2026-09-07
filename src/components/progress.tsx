import { cn } from "cn";
import { Progress as ProgressPrimitive } from "radix-ui";
import type * as React from "react";

function Progress({
	className,
	value,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn(
				"lib:relative lib:flex lib:h-3 lib:w-full lib:items-center lib:overflow-x-hidden lib:rounded-4xl lib:bg-muted",
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className="lib:size-full lib:flex-1 lib:bg-primary lib:transition-all"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
