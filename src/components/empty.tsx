import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"lib:flex lib:min-w-0 lib:flex-1 lib:flex-col lib:items-center lib:justify-center lib:gap-6 lib:text-balance lib:rounded-lg lib:border-dashed lib:p-6 lib:text-center lib:md:p-12",
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
				"lib:flex lib:max-w-sm lib:flex-col lib:items-center lib:gap-2 lib:text-center",
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
				icon: "lib:bg-muted lib:text-foreground lib:flex lib:size-10 lib:shrink-0 lib:items-center lib:justify-center lib:rounded-lg lib:[&_svg:not([class*=size-])]:size-6",
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
				"lib:text-lg lib:font-medium lib:tracking-tight",
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
				"lib:text-muted-foreground lib:[&>a:hover]:text-primary lib:text-sm/relaxed lib:[&>a]:underline lib:[&>a]:underline-offset-4",
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
				"lib:flex lib:w-full lib:min-w-0 lib:max-w-sm lib:flex-col lib:items-center lib:gap-4 lib:text-balance lib:text-sm",
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
