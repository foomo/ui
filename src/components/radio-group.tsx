"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "cn";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn("lib:grid lib:w-full lib:gap-3", className)}
			{...props}
		/>
	);
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
	return (
		<RadioPrimitive.Root
			data-slot="radio-group-item"
			className={cn(
				"lib:group/radio-group-item lib:peer lib:relative lib:flex lib:aspect-square lib:size-4 lib:shrink-0 lib:rounded-full lib:border lib:border-input lib:outline-none lib:group-has-[:focus-visible]/field-label:ring-0 lib:group-has-[:focus-visible]/field-label:not-data-checked:border-input lib:after:absolute lib:after:-inset-x-3 lib:after:-inset-y-2 lib:focus-visible:border-ring lib:focus-visible:ring-3 lib:focus-visible:ring-ring/50 lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-3 lib:aria-invalid:ring-destructive/20 lib:aria-invalid:aria-checked:border-primary lib:dark:bg-input/30 lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40 lib:data-checked:border-primary lib:data-checked:bg-primary lib:data-checked:text-primary-foreground lib:group-has-[:focus-visible]/field-label:data-checked:border-primary lib:dark:data-checked:bg-primary",
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="lib:flex lib:size-4 lib:items-center lib:justify-center"
			>
				<span className="lib:absolute lib:top-1/2 lib:left-1/2 lib:size-2 lib:-translate-x-1/2 lib:-translate-y-1/2 lib:rounded-full lib:bg-primary-foreground" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}

export { RadioGroup, RadioGroupItem };
