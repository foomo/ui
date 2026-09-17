"use client";

import { cn } from "cn";
import type * as React from "react";

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			className={cn(
				"fui:flex fui:items-center fui:gap-2 fui:text-sm fui:leading-none fui:font-medium fui:select-none fui:group-data-[disabled=true]:pointer-events-none fui:group-data-[disabled=true]:opacity-50 fui:peer-disabled:cursor-not-allowed fui:peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
