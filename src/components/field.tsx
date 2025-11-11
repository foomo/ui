"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";
import { Label } from "@/components/label";
import { Separator } from "@/components/separator";
import { cn } from "@/lib/utils";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
	return (
		<fieldset
			data-slot="field-set"
			className={cn(
				"lib:flex lib:flex-col lib:gap-6",
				"lib:has-[>[data-slot=checkbox-group]]:gap-3 lib:has-[>[data-slot=radio-group]]:gap-3",
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
				"lib:mb-3 lib:font-medium",
				"lib:data-[variant=legend]:text-base",
				"lib:data-[variant=label]:text-sm",
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
				"lib:group/field-group lib:@container/field-group lib:flex lib:w-full lib:flex-col lib:gap-7 lib:data-[slot=checkbox-group]:gap-3 lib:[&>[data-slot=field-group]]:gap-4",
				className,
			)}
			{...props}
		/>
	);
}

const fieldVariants = cva(
	"lib:group/field lib:data-[invalid=true]:text-destructive lib:flex lib:w-full lib:gap-3",
	{
		variants: {
			orientation: {
				vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
				horizontal: [
					"flex-row items-center",
					"[&>[data-slot=field-label]]:flex-auto",
					"has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start",
				],
				responsive: [
					"@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto",
					"@md/field-group:[&>[data-slot=field-label]]:flex-auto",
					"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				],
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
				"lib:group/field-content lib:flex lib:flex-1 lib:flex-col lib:gap-1.5 lib:leading-snug",
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
				"lib:group/field-label lib:peer/field-label lib:flex lib:w-fit lib:gap-2 lib:leading-snug lib:group-data-[disabled=true]/field:opacity-50",
				"lib:has-[>[data-slot=field]]:w-full lib:has-[>[data-slot=field]]:flex-col lib:has-[>[data-slot=field]]:rounded-md lib:has-[>[data-slot=field]]:border lib:[&>[data-slot=field]]:p-4",
				"lib:has-data-[state=checked]:bg-primary/5 lib:has-data-[state=checked]:border-primary lib:dark:has-data-[state=checked]:bg-primary/10",
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
				"lib:flex lib:w-fit lib:items-center lib:gap-2 lib:text-sm lib:font-medium lib:leading-snug lib:group-data-[disabled=true]/field:opacity-50",
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
				"lib:text-muted-foreground lib:text-sm lib:font-normal lib:leading-normal lib:group-has-[[data-orientation=horizontal]]/field:text-balance",
				"lib:nth-last-2:-mt-1 lib:last:mt-0 lib:[[data-variant=legend]+&]:-mt-1.5",
				"lib:[&>a:hover]:text-primary lib:[&>a]:underline lib:[&>a]:underline-offset-4",
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
				"lib:relative lib:-my-2 lib:h-5 lib:text-sm lib:group-data-[variant=outline]/field-group:-mb-2",
				className,
			)}
			{...props}
		>
			<Separator className="lib:absolute lib:inset-0 lib:top-1/2" />
			{children && (
				<span
					className="lib:bg-background lib:text-muted-foreground lib:relative lib:mx-auto lib:block lib:w-fit lib:px-2"
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

		if (!errors) {
			return null;
		}

		if (errors?.length === 1 && errors[0]?.message) {
			return errors[0].message;
		}

		return (
			<ul className="lib:ml-4 lib:flex lib:list-disc lib:flex-col lib:gap-1">
				{errors.map(
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
				"lib:text-destructive lib:text-sm lib:font-normal",
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
