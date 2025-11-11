import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"lib:flex lib:h-9 lib:w-full lib:rounded-md lib:border lib:border-input lib:bg-transparent lib:px-3 lib:py-1 lib:text-base lib:shadow-sm lib:transition-colors lib:file:border-0 lib:file:bg-transparent lib:file:text-sm lib:file:font-medium lib:file:text-foreground lib:placeholder:text-muted-foreground lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:md:text-sm",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
