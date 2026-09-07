import { cn } from "cn";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { Slot } from "radix-ui";
import type * as React from "react";

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={cn(className)}
			{...props}
		/>
	);
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"lib:flex lib:flex-wrap lib:items-center lib:gap-1.5 lib:text-sm lib:wrap-break-word lib:text-muted-foreground lib:sm:gap-2.5",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("lib:inline-flex lib:items-center lib:gap-1.5", className)}
			{...props}
		/>
	);
}

function BreadcrumbLink({
	asChild,
	className,
	...props
}: React.ComponentProps<"a"> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot.Root : "a";

	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn(
				"lib:transition-colors lib:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("lib:font-normal lib:text-foreground", className)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("lib:[&>svg]:size-3.5", className)}
			{...props}
		>
			{children ?? <ChevronRightIcon />}
		</li>
	);
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn(
				"lib:flex lib:size-5 lib:items-center lib:justify-center lib:[&>svg]:size-4",
				className,
			)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="lib:sr-only">More</span>
		</span>
	);
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
