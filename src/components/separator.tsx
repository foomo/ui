"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "cn";

function Separator({
	className,
	orientation = "horizontal",
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
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
