import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/button";

/**
 * Fetches a page's or a section's data again: a small outline button with the
 * clockwise arrows and "Refresh" (or `children`).
 *
 * `pending` marks a refresh in progress: the button is disabled, so a second
 * click cannot queue another, and its arrows spin. When a click only marks the
 * data stale and it refetches on its own, pass whether that data is being
 * fetched, so the arrows still spin until it is back.
 */
function RefreshButton({
	pending = false,
	disabled,
	children = "Refresh",
	...props
}: Omit<React.ComponentProps<typeof Button>, "variant"> & {
	pending?: boolean;
}) {
	return (
		<Button
			variant="outline"
			size="sm"
			disabled={pending || disabled}
			aria-busy={pending || undefined}
			{...props}
		>
			<ArrowsClockwiseIcon className={cn(pending && "fui:animate-spin")} />
			{children}
		</Button>
	);
}

export { RefreshButton };
