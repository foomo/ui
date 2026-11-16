import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/button";

function RefreshButton({
	pending = false,
	disabled,
	children = "Refresh",
	...props
}: Omit<React.ComponentProps<typeof Button>, "variant"> & {
	/** Disables the button and spins the icon; when a click only invalidates, pass the refetch state. */
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
