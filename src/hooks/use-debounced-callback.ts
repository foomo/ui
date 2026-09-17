import { useCallback, useEffect, useRef } from "react";

/**
 * Defer `callback` until `delay` ms have passed without another call.
 *
 * Filters that apply as they are touched cost a request per keystroke without
 * this. Selects and checkboxes change one value at a time and need no delay;
 * text input does.
 *
 * The latest callback is held in a ref, so the returned function is stable and
 * safe to hand to a memoised child without restarting the timer on every
 * render.
 */
export function useDebouncedCallback<Args extends unknown[]>(
	callback: (...args: Args) => void,
	delay = 300,
): (...args: Args) => void {
	const latest = useRef(callback);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => {
		latest.current = callback;
	}, [callback]);

	// A pending call must not fire after the caller has gone.
	useEffect(() => () => clearTimeout(timer.current), []);

	return useCallback(
		(...args: Args) => {
			clearTimeout(timer.current);
			timer.current = setTimeout(() => latest.current(...args), delay);
		},
		[delay],
	);
}
