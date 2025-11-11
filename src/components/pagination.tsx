import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { type ButtonProps, buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		aria-label="pagination"
		className={cn(
			"lib:mx-auto lib:flex lib:w-full lib:justify-center",
			className,
		)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn(
			"lib:flex lib:flex-row lib:items-center lib:gap-1",
			className,
		)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("lib:", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentProps<"a">;

const PaginationLink = ({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) => (
	<a
		aria-current={isActive ? "page" : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? "outline" : "ghost",
				size,
			}),
			className,
		)}
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={cn("lib:gap-1 lib:pl-2.5", className)}
		{...props}
	>
		<ChevronLeft className="lib:h-4 lib:w-4" />
		<span>Previous</span>
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={cn("lib:gap-1 lib:pr-2.5", className)}
		{...props}
	>
		<span>Next</span>
		<ChevronRight className="lib:h-4 lib:w-4" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={cn(
			"lib:flex lib:h-9 lib:w-9 lib:items-center lib:justify-center",
			className,
		)}
		{...props}
	>
		<MoreHorizontal className="lib:h-4 lib:w-4" />
		<span className="lib:sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
