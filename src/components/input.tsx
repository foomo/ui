import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				"fui:h-9 fui:w-full fui:min-w-0 fui:rounded-4xl fui:border fui:border-input fui:bg-background fui:dark:bg-input/30 fui:px-3 fui:py-1 fui:text-base fui:transition-colors fui:outline-none fui:file:inline-flex fui:file:h-7 fui:file:border-0 fui:file:bg-transparent fui:file:text-sm fui:file:font-medium fui:file:text-foreground fui:placeholder:text-muted-foreground fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:disabled:pointer-events-none fui:disabled:cursor-not-allowed fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:md:text-sm fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
