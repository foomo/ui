import { useEffect, useRef } from "react";
import { toast } from "sonner";

/** Toasts when `error` turns truthy: pass `isError` for one toast per failure, `error` for one per distinct error. */
export function useErrorToast(
	error: unknown,
	message: string | ((error: unknown) => string),
): void {
	// A ref, so a message built inline on every render does not re-fire the toast.
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
