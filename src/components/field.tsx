"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { useMemo } from "react";

import { Label } from "@/components/label";
import { Separator } from "@/components/separator";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
	return (
		<fieldset
			data-slot="field-set"
			className={cn(
				"fui:flex fui:flex-col fui:gap-6 fui:has-[>[data-slot=checkbox-group]]:gap-3 fui:has-[>[data-slot=radio-group]]:gap-3",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLegend({
	className,
	variant = "legend",
	...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
	return (
		<legend
			data-slot="field-legend"
			data-variant={variant}
			className={cn(
				"fui:mb-3 fui:font-medium fui:data-[variant=label]:text-sm fui:data-[variant=legend]:text-base",
				className,
			)}
			{...props}
		/>
	);
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-group"
			className={cn(
				"fui:group/field-group fui:@container/field-group fui:flex fui:w-full fui:flex-col fui:gap-7 fui:data-[slot=checkbox-group]:gap-3 fui:*:data-[slot=field-group]:gap-4",
				className,
			)}
			{...props}
		/>
	);
}

const fieldVariants = cva(
	"fui:group/field fui:flex fui:w-full fui:gap-3 fui:data-[invalid=true]:text-destructive",
	{
		variants: {
			orientation: {
				vertical: "fui:flex-col fui:*:w-full fui:[&>.sr-only]:w-auto",
				horizontal:
					"fui:flex-row fui:items-center fui:has-[>[data-slot=field-content]]:items-start fui:*:data-[slot=field-label]:flex-auto fui:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				responsive:
					"fui:flex-col fui:*:w-full fui:@md/field-group:flex-row fui:@md/field-group:items-center fui:@md/field-group:*:w-auto fui:@md/field-group:has-[>[data-slot=field-content]]:items-start fui:@md/field-group:*:data-[slot=field-label]:flex-auto fui:[&>.sr-only]:w-auto fui:@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	},
);

function Field({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
	return (
		<div
			role="group"
			data-slot="field"
			data-orientation={orientation}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-content"
			className={cn(
				"fui:group/field-content fui:flex fui:flex-1 fui:flex-col fui:gap-1 fui:leading-snug",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLabel({
	className,
	...props
}: React.ComponentProps<typeof Label>) {
	return (
		<Label
			data-slot="field-label"
			className={cn(
				"fui:group/field-label fui:peer/field-label fui:flex fui:w-fit fui:gap-2 fui:leading-snug fui:group-data-[disabled=true]/field:opacity-50 fui:has-data-checked:border-primary/30 fui:has-data-checked:bg-primary/5 fui:has-[>[data-slot=field]]:rounded-xl fui:has-[>[data-slot=field]]:border fui:has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40 fui:has-[>[data-slot=field]]:has-[:focus-visible]:border-ring fui:has-[>[data-slot=field]]:has-[:focus-visible]:ring-[3px] fui:has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 fui:*:data-[slot=field]:p-4 fui:dark:has-data-checked:border-primary/20 fui:dark:has-data-checked:bg-primary/10",
				"fui:has-[>[data-slot=field]]:w-full fui:has-[>[data-slot=field]]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-label"
			className={cn(
				"fui:flex fui:w-fit fui:items-center fui:gap-2 fui:text-sm fui:font-medium fui:group-data-[disabled=true]/field:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="field-description"
			className={cn(
				"fui:text-left fui:text-sm fui:leading-normal fui:font-normal fui:text-muted-foreground fui:group-has-data-horizontal/field:text-balance fui:[[data-variant=legend]+&]:-mt-1.5",
				"fui:last:mt-0 fui:nth-last-2:-mt-1",
				"fui:[&>a]:underline fui:[&>a]:underline-offset-4 fui:[&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function FieldSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"div"> & {
	children?: React.ReactNode;
}) {
	return (
		<div
			data-slot="field-separator"
			data-content={!!children}
			className={cn(
				"fui:relative fui:-my-2 fui:h-5 fui:text-sm fui:group-data-[variant=outline]/field-group:-mb-2",
				className,
			)}
			{...props}
		>
			<Separator className="fui:absolute fui:inset-0 fui:top-1/2" />
			{children && (
				<span
					className="fui:relative fui:mx-auto fui:block fui:w-fit fui:bg-background fui:px-2 fui:text-muted-foreground"
					data-slot="field-separator-content"
				>
					{children}
				</span>
			)}
		</div>
	);
}

function FieldError({
	className,
	children,
	errors,
	...props
}: React.ComponentProps<"div"> & {
	errors?: Array<{ message?: string } | undefined>;
}) {
	const content = useMemo(() => {
		if (children) {
			return children;
		}

		if (!errors?.length) {
			return null;
		}

		const uniqueErrors = [
			...new Map(errors.map((error) => [error?.message, error])).values(),
		];

		if (uniqueErrors?.length === 1) {
			return uniqueErrors[0]?.message;
		}

		return (
			<ul className="fui:ml-4 fui:flex fui:list-disc fui:flex-col fui:gap-1">
				{uniqueErrors.map(
					(error, index) =>
						error?.message && <li key={index}>{error.message}</li>,
				)}
			</ul>
		);
	}, [children, errors]);

	if (!content) {
		return null;
	}

	return (
		<div
			role="alert"
			data-slot="field-error"
			className={cn(
				"fui:text-sm fui:font-normal fui:text-destructive",
				className,
			)}
			{...props}
		>
			{content}
		</div>
	);
}

export {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldContent,
	FieldTitle,
};
