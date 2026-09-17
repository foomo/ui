import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"fui:flex fui:w-full fui:min-w-0 fui:flex-1 fui:flex-col fui:items-center fui:justify-center fui:gap-4 fui:rounded-lg fui:border-dashed fui:p-12 fui:text-center fui:text-balance",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-header"
			className={cn(
				"fui:flex fui:max-w-sm fui:flex-col fui:items-center fui:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

const emptyMediaVariants = cva(
	"fui:mb-2 fui:flex fui:shrink-0 fui:items-center fui:justify-center fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "fui:bg-transparent",
				icon: "fui:flex fui:size-10 fui:shrink-0 fui:items-center fui:justify-center fui:rounded-lg fui:bg-muted fui:text-foreground fui:[&_svg:not([class*=size-])]:size-6",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function EmptyMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
	return (
		<div
			data-slot="empty-icon"
			data-variant={variant}
			className={cn(emptyMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-title"
			className={cn(
				"fui:font-heading fui:text-lg fui:font-medium fui:tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<div
			data-slot="empty-description"
			className={cn(
				"fui:text-sm/relaxed fui:text-muted-foreground fui:[&>a]:underline fui:[&>a]:underline-offset-4 fui:[&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-content"
			className={cn(
				"fui:flex fui:w-full fui:max-w-sm fui:min-w-0 fui:flex-col fui:items-center fui:gap-4 fui:text-sm fui:text-balance",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
	EmptyContent,
	EmptyMedia,
};
