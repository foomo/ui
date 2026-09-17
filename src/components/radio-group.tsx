"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "cn";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn("fui:grid fui:w-full fui:gap-3", className)}
			{...props}
		/>
	);
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
	return (
		<RadioPrimitive.Root
			data-slot="radio-group-item"
			className={cn(
				"fui:group/radio-group-item fui:peer fui:relative fui:flex fui:aspect-square fui:size-4 fui:shrink-0 fui:rounded-full fui:border fui:border-input fui:outline-none fui:group-has-[:focus-visible]/field-label:ring-0 fui:group-has-[:focus-visible]/field-label:not-data-checked:border-input fui:after:absolute fui:after:-inset-x-3 fui:after:-inset-y-2 fui:focus-visible:border-ring fui:focus-visible:ring-3 fui:focus-visible:ring-ring/50 fui:disabled:cursor-not-allowed fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-3 fui:aria-invalid:ring-destructive/20 fui:aria-invalid:aria-checked:border-primary fui:dark:bg-input/30 fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40 fui:data-checked:border-primary fui:data-checked:bg-primary fui:data-checked:text-primary-foreground fui:group-has-[:focus-visible]/field-label:data-checked:border-primary fui:dark:data-checked:bg-primary",
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="fui:flex fui:size-4 fui:items-center fui:justify-center"
			>
				<span className="fui:absolute fui:top-1/2 fui:left-1/2 fui:size-2 fui:-translate-x-1/2 fui:-translate-y-1/2 fui:rounded-full fui:bg-primary-foreground" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}

export { RadioGroup, RadioGroupItem };
