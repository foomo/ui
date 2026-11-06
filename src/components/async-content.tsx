import { SpinnerIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { Alert, AlertDescription } from "@/components/alert";

/**
 * Content that has to be fetched first, such as the record on a detail page.
 * Shows one of four states, checked in this order:
 *
 * - `loading`: a spinner with "Loading…".
 * - `error`: the message in a destructive `Alert`. Pass it only when loading
 *   failed; leave it `undefined` (or `null`, `false`) otherwise.
 * - no `data` (`null` or `undefined`): the `notFound` text, muted. The request
 *   worked and there is no such record, which is not an error.
 * - otherwise `children(data)`.
 *
 * `children` receives the data with `null` and `undefined` ruled out, so it
 * can use the record without checking it again.
 *
 * For a dashboard tile, use `DashboardTile`, which handles the same states
 * inside a card of fixed height.
 */
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
	/** Applied to the loading, error and not-found states, not to `children`. */
	className?: string;
	children: (data: NonNullable<T>) => React.ReactNode;
}) {
	if (loading) {
		return (
			// An <output> is a status region, so the label is announced once. The
			// icon is the spinner's own glyph, hidden: `Spinner` is a status
			// region itself, which would announce "Loading" a second time.
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
