import { ArrowLeftIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/button";

function BackButton({
	className,
	children,
	...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<Button
			variant="ghost"
			size="sm"
			// `-ml-2` aligns the arrow with the text edge; `w-fit` stops a flex column stretching it.
			className={cn("fui:-ml-2 fui:w-fit", className)}
			{...props}
		>
			<ArrowLeftIcon />
			{children}
		</Button>
	);
}

export { BackButton };
