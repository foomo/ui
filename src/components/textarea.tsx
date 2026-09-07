import { cn } from "cn";
import type * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"lib:flex lib:field-sizing-content lib:min-h-16 lib:w-full lib:resize-none lib:rounded-xl lib:border lib:border-input lib:bg-input/30 lib:px-3 lib:py-3 lib:text-base lib:transition-colors lib:outline-none lib:placeholder:text-muted-foreground lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-[3px] lib:aria-invalid:ring-destructive/20 lib:md:text-sm lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
