import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav"> & {
		separator?: React.ReactNode;
	}
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
	<ol
		ref={ref}
		className={cn(
			"lib:flex lib:flex-wrap lib:items-center lib:gap-1.5 lib:break-words lib:text-sm lib:text-muted-foreground lib:sm:gap-2.5",
			className,
		)}
		{...props}
	/>
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		className={cn("lib:inline-flex lib:items-center lib:gap-1.5", className)}
		{...props}
	/>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & {
		asChild?: boolean;
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			ref={ref}
			className={cn(
				"lib:transition-colors lib:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		role="link"
		aria-disabled="true"
		aria-current="page"
		className={cn("lib:font-normal lib:text-foreground", className)}
		{...props}
	/>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
	children,
	className,
	...props
}: React.ComponentProps<"li">) => (
	<li
		role="presentation"
		aria-hidden="true"
		className={cn("lib:[&>svg]:w-3.5 lib:[&>svg]:h-3.5", className)}
		{...props}
	>
		{children ?? <ChevronRight />}
	</li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		role="presentation"
		aria-hidden="true"
		className={cn(
			"lib:flex lib:h-9 lib:w-9 lib:items-center lib:justify-center",
			className,
		)}
		{...props}
	>
		<MoreHorizontal className="lib:h-4 lib:w-4" />
		<span className="lib:sr-only">More</span>
	</span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
