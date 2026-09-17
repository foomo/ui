import { cn } from "cn";
import type * as React from "react";

function AspectRatio({
	ratio,
	className,
	...props
}: React.ComponentProps<"div"> & { ratio: number }) {
	return (
		<div
			data-slot="aspect-ratio"
			style={
				{
					"--ratio": ratio,
				} as React.CSSProperties
			}
			className={cn("fui:relative fui:aspect-(--ratio)", className)}
			{...props}
		/>
	);
}

export { AspectRatio };
