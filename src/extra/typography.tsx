import { cn } from "cn";
import { Slot } from "radix-ui";
import type * as React from "react";

interface ProseProps<T extends React.ElementType = "div"> {
	asChild?: boolean;
	as?: T;
	className?: string;
}

function Prose({
	asChild = false,
	as,
	className,
	...props
}: ProseProps & React.ComponentProps<"div">) {
	const Comp = asChild ? Slot.Root : (as ?? "div");

	return (
		<Comp data-slot="prose" className={cn("lib:prose", className)} {...props} />
	);
}

export { Prose, type ProseProps };
