import { useEffect, useRef } from "react";

function isFramed(): boolean {
	return typeof window !== "undefined" && window.self !== window.top;
}

/**
 * Dismisses an open layer when the frame the page lives in loses the focus —
 * the stand-in for the outside click a framed page never sees.
 *
 * Base UI closes a popup from two listeners, and both go quiet inside an iframe
 * (e.g. the Storybook canvas): the outside-press listener is bound to the
 * frame's own document, which never receives a pointer event from the
 * embedding page, and the focus-out fallback bails whenever `relatedTarget` is
 * null, which is exactly what leaving the frame reports. What does arrive is a
 * `blur` on the frame's own window.
 *
 * Only a framed document subscribes: at the top level the browser already
 * delivers those clicks, and dismissing on blur there would also close the
 * layer whenever the user switches tab or application.
 */
export function useFrameDismiss(onDismiss: () => void): void {
	const onDismissRef = useRef(onDismiss);
	onDismissRef.current = onDismiss;

	useEffect(() => {
		if (!isFramed()) return;

		const onBlur = () => onDismissRef.current();
		window.addEventListener("blur", onBlur);
		return () => window.removeEventListener("blur", onBlur);
	}, []);
}
