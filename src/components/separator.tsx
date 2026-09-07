"use client";

import { cn } from "cn";
import { Separator as SeparatorPrimitive } from "radix-ui";
import type * as React from "react";

function Separator({
	className,
	orientation = "horizontal",
	decorative = true,
	...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
	return (
		<SeparatorPrimitive.Root
			data-slot="separator"
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"lib:shrink-0 lib:bg-border lib:data-horizontal:h-px lib:data-horizontal:w-full lib:data-vertical:w-px lib:data-vertical:self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
