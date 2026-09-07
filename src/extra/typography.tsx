import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import type * as React from "react";

interface ProseProps {
	as?: keyof React.JSX.IntrinsicElements;
}

function Prose({
	as = "div",
	className,
	render,
	...props
}: ProseProps & useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: as,
		render,
		props: mergeProps<"div">(
			{
				className: cn("lib:prose", className),
			} as React.ComponentProps<"div">,
			props,
		),
		state: {
			slot: "prose",
		},
	});
}

export { Prose, type ProseProps };
