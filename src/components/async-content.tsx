import { SpinnerIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Alert, AlertDescription } from "@/components/alert";

/** Checks `loading`, then `error`, then missing `data` (`notFound`), before rendering `children(data)`. */
function AsyncContent<T>({
	loading = false,
	error,
	data,
	notFound = "Not found.",
	loadingLabel = "Loading…",
	className,
	children,
}: {
	loading?: boolean;
	error?: React.ReactNode;
	data: T | null | undefined;
	notFound?: React.ReactNode;
	loadingLabel?: React.ReactNode;
	/** Applies to the loading, error and not-found states, not to `children`. */
	className?: string;
	children: (data: NonNullable<T>) => React.ReactNode;
}) {
	if (loading) {
		return (
			// Not `Spinner`: it is a status region itself and would announce twice.
			<output
				data-slot="async-content"
				data-state="loading"
				className={cn(
					"fui:flex fui:items-center fui:gap-2 fui:text-sm fui:text-muted-foreground",
					className,
				)}
			>
				<SpinnerIcon aria-hidden className="fui:size-4 fui:animate-spin" />
				{loadingLabel}
			</output>
		);
	}

	if (error !== undefined && error !== null && error !== false) {
		return (
			<Alert
				data-slot="async-content"
				data-state="error"
				variant="destructive"
				className={className}
			>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	if (data === null || data === undefined) {
		return (
			<p
				data-slot="async-content"
				data-state="not-found"
				className={cn("fui:text-sm fui:text-muted-foreground", className)}
			>
				{notFound}
			</p>
		);
	}

	return children(data);
}

export { AsyncContent };
