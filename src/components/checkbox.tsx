"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"lib:peer lib:relative lib:flex lib:size-4 lib:shrink-0 lib:items-center lib:justify-center lib:rounded-[6px] lib:border lib:border-input lib:transition-shadow lib:outline-none lib:group-has-disabled/field:opacity-50 lib:group-has-[:focus-visible]/field-label:ring-0 lib:group-has-[:focus-visible]/field-label:not-data-checked:border-input lib:after:absolute lib:after:-inset-x-3 lib:after:-inset-y-2 lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-[3px] lib:aria-invalid:ring-destructive/20 lib:aria-invalid:aria-checked:border-primary lib:dark:bg-input/30 lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40 lib:data-checked:border-primary lib:data-checked:bg-primary lib:data-checked:text-primary-foreground lib:group-has-[:focus-visible]/field-label:data-checked:border-primary lib:dark:data-checked:bg-primary",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="lib:grid lib:place-content-center lib:text-current lib:transition-none lib:[&>svg]:size-3.5"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
