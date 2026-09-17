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
				"fui:shrink-0 fui:bg-border fui:data-horizontal:h-px fui:data-horizontal:w-full fui:data-vertical:w-px fui:data-vertical:self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
