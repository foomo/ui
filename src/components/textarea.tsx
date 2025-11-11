import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"lib:flex lib:min-h-[60px] lib:w-full lib:rounded-md lib:border lib:border-input lib:bg-transparent lib:px-3 lib:py-2 lib:text-base lib:shadow-sm lib:placeholder:text-muted-foreground lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:md:text-sm",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
