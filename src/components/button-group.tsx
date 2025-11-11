import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Separator } from "@/components/separator";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
	"lib:flex lib:w-fit lib:items-stretch lib:has-[>[data-slot=button-group]]:gap-2 lib:[&>*]:focus-visible:relative lib:[&>*]:focus-visible:z-10 lib:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md lib:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit lib:[&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"lib:[&>*:not(:first-child)]:rounded-l-none lib:[&>*:not(:first-child)]:border-l-0 lib:[&>*:not(:last-child)]:rounded-r-none",
				vertical:
					"lib:flex-col lib:[&>*:not(:first-child)]:rounded-t-none lib:[&>*:not(:first-child)]:border-t-0 lib:[&>*:not(:last-child)]:rounded-b-none",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

function ButtonGroup({
	className,
	orientation,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function ButtonGroupText({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			className={cn(
				"lib:bg-muted lib:shadow-xs lib:flex lib:items-center lib:gap-2 lib:rounded-md lib:border lib:px-4 lib:text-sm lib:font-medium lib:[&_svg:not([class*=size-])]:size-4 lib:[&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function ButtonGroupSeparator({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				"lib:bg-input lib:relative lib:!m-0 lib:self-stretch lib:data-[orientation=vertical]:h-auto",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
};
