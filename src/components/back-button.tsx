import { ArrowLeftIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/button";

/**
 * The way back from a detail page to its list, at the top left of the page: a
 * small ghost button with a left arrow and the destination in its label
 * ("Back to products").
 *
 * Pulled left by its own padding so the arrow lines up with the page's text
 * edge. `w-fit` keeps a flex column parent from stretching it across the page
 * while leaving its vertical alignment to the parent, so it also sits centred
 * in an `items-center` row beside the page's actions.
 *
 * Free of any router: pass `onClick` (e.g. history back, with the list as a
 * fallback when there is no history) or `render` (the router's link).
 */
function BackButton({
	className,
	children,
	...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<Button
			variant="ghost"
			size="sm"
			className={cn("fui:-ml-2 fui:w-fit", className)}
			{...props}
		>
			<ArrowLeftIcon />
			{children}
		</Button>
	);
}

export { BackButton };
