"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import * as React from "react";
import { Label } from "@/components/label";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"fui:peer fui:relative fui:flex fui:size-4 fui:shrink-0 fui:items-center fui:justify-center fui:rounded-[6px] fui:border fui:border-input fui:transition-shadow fui:outline-none fui:group-has-disabled/field:opacity-50 fui:group-has-[:focus-visible]/field-label:ring-0 fui:group-has-[:focus-visible]/field-label:not-data-checked:border-input fui:after:absolute fui:after:-inset-x-3 fui:after:-inset-y-2 fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:disabled:cursor-not-allowed fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:aria-invalid:aria-checked:border-primary fui:dark:bg-input/30 fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40 fui:data-checked:border-primary fui:data-checked:bg-primary fui:data-checked:text-primary-foreground fui:group-has-[:focus-visible]/field-label:data-checked:border-primary fui:dark:data-checked:bg-primary",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="fui:grid fui:place-content-center fui:text-current fui:transition-none fui:[&>svg]:size-3.5"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

type CheckboxWithLabelProps = CheckboxPrimitive.Root.Props & {
	label: React.ReactNode;
	labelClassName?: string;
	wrapperClassName?: string;
};

/**
 * A checkbox and its caption as one labelled control.
 *
 * Keeps the id wiring — a generated id tying the label to the input — in one
 * place instead of at every call site.
 *
 * Deliberately not built on `Field`: a caller may already be inside one, and
 * a `Field` nested in a `Field` picks up the bordered card treatment.
 */
function CheckboxWithLabel({
	id,
	label,
	disabled,
	className,
	labelClassName,
	wrapperClassName,
	...props
}: CheckboxWithLabelProps) {
	const reactId = React.useId();
	const inputId = id ?? reactId;

	return (
		<div
			data-slot="checkbox-with-label"
			data-disabled={disabled ? "" : undefined}
			className={cn(
				"fui:group fui:inline-flex fui:items-center fui:gap-2",
				wrapperClassName,
			)}
		>
			<Checkbox
				id={inputId}
				disabled={disabled}
				className={className}
				{...props}
			/>
			<Label htmlFor={inputId} className={labelClassName}>
				{label}
			</Label>
		</div>
	);
}

export { Checkbox, CheckboxWithLabel, type CheckboxWithLabelProps };
