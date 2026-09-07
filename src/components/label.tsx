"use client";

import { cn } from "cn";
import type * as React from "react";

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			className={cn(
				"lib:flex lib:items-center lib:gap-2 lib:text-sm lib:leading-none lib:font-medium lib:select-none lib:group-data-[disabled=true]:pointer-events-none lib:group-data-[disabled=true]:opacity-50 lib:peer-disabled:cursor-not-allowed lib:peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
