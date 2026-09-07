import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"lib:flex lib:w-full lib:min-w-0 lib:flex-1 lib:flex-col lib:items-center lib:justify-center lib:gap-4 lib:rounded-lg lib:border-dashed lib:p-12 lib:text-center lib:text-balance",
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
				"lib:flex lib:max-w-sm lib:flex-col lib:items-center lib:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

const emptyMediaVariants = cva(
	"lib:mb-2 lib:flex lib:shrink-0 lib:items-center lib:justify-center lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "lib:bg-transparent",
				icon: "lib:flex lib:size-10 lib:shrink-0 lib:items-center lib:justify-center lib:rounded-lg lib:bg-muted lib:text-foreground lib:[&_svg:not([class*=size-])]:size-6",
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
				"lib:font-heading lib:text-lg lib:font-medium lib:tracking-tight",
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
				"lib:text-sm/relaxed lib:text-muted-foreground lib:[&>a]:underline lib:[&>a]:underline-offset-4 lib:[&>a:hover]:text-primary",
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
				"lib:flex lib:w-full lib:max-w-sm lib:min-w-0 lib:flex-col lib:items-center lib:gap-4 lib:text-sm lib:text-balance",
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
