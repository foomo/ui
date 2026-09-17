import { cn } from "cn";
import type * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"fui:flex fui:field-sizing-content fui:min-h-16 fui:w-full fui:resize-none fui:rounded-xl fui:border fui:border-input fui:bg-input/30 fui:px-3 fui:py-3 fui:text-base fui:transition-colors fui:outline-none fui:placeholder:text-muted-foreground fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:disabled:cursor-not-allowed fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:md:text-sm fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
