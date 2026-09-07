"use client";

import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from "react-hook-form";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/field";

/**
 * `form` was removed from the shadcn registry in favour of `field`. These
 * bindings keep the react-hook-form API this package already exported, but
 * render through the `Field` primitives so they match the rest of the library.
 */

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
	null,
);

function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
	const value = React.useMemo(() => ({ name: props.name }), [props.name]);

	return (
		<FormFieldContext.Provider value={value}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
}

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function useFormField() {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	if (!itemContext) {
		throw new Error("useFormField should be used within <FormItem>");
	}

	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
}

function FormItem({ className, ...props }: React.ComponentProps<typeof Field>) {
	const id = React.useId();
	const value = React.useMemo(() => ({ id }), [id]);

	return (
		<FormItemContext.Provider value={value}>
			<Field data-slot="form-item" className={className} {...props} />
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof FieldLabel>) {
	const { error, formItemId } = useFormField();

	return (
		<FieldLabel
			data-slot="form-label"
			data-error={!!error}
			className={cn("lib:data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot.Root
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

function FormDescription({
	className,
	...props
}: React.ComponentProps<typeof FieldDescription>) {
	const { formDescriptionId } = useFormField();

	return (
		<FieldDescription
			data-slot="form-description"
			id={formDescriptionId}
			className={className}
			{...props}
		/>
	);
}

function FormMessage({
	className,
	children,
	...props
}: React.ComponentProps<typeof FieldError>) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;

	if (!body) {
		return null;
	}

	return (
		<FieldError
			data-slot="form-message"
			id={formMessageId}
			className={className}
			{...props}
		>
			{body}
		</FieldError>
	);
}

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};
