import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

interface ProseProps<T extends React.ElementType = "div"> {
	asChild?: boolean;
	as?: T;
	className?: string;
}

const Prose = React.forwardRef<
	HTMLDivElement,
	ProseProps & React.ComponentPropsWithoutRef<"div">
>(({ asChild = false, as, className, ...props }, ref) => {
	if (asChild) {
		return (
			<Slot ref={ref} className={`lib:prose ${className || ""}`} {...props} />
		);
	}

	const Component = as || "div";

	return (
		<Component
			ref={ref}
			className={`lib:prose ${className || ""}`}
			{...props}
		/>
	);
});

Prose.displayName = "Prose";

export { Prose, type ProseProps };
