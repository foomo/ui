import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Show an error toast when `error` turns truthy, such as when a request fails.
 *
 * Pass a query's `isError` for one toast per failure (it fires again only after
 * the query has recovered and failed anew), or its `error` for one toast per
 * distinct error. `message` is the toast's text, or a function that builds it
 * from the error.
 *
 * Kept free of any data library: it reacts to a value, not to a query, so it
 * works with TanStack Query, SWR or plain state. Needs one `Toaster` rendered
 * in the app.
 */
export function useErrorToast(
	error: unknown,
	message: string | ((error: unknown) => string),
): void {
	// The latest message is held in a ref, so a message built inline on every
	// render does not re-fire the toast.
	const latest = useRef(message);

	useEffect(() => {
		latest.current = message;
	}, [message]);

	useEffect(() => {
		if (!error) return;
		const current = latest.current;
		toast.error(typeof current === "function" ? current(error) : current);
	}, [error]);
}
