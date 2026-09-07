import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"lib:h-9 lib:w-full lib:min-w-0 lib:rounded-4xl lib:border lib:border-input lib:bg-input/30 lib:px-3 lib:py-1 lib:text-base lib:transition-colors lib:outline-none lib:file:inline-flex lib:file:h-7 lib:file:border-0 lib:file:bg-transparent lib:file:text-sm lib:file:font-medium lib:file:text-foreground lib:placeholder:text-muted-foreground lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:disabled:pointer-events-none lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-[3px] lib:aria-invalid:ring-destructive/20 lib:md:text-sm lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
