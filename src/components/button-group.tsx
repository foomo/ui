import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

import { Separator } from "@/components/separator";

const buttonGroupVariants = cva(
	"lib:group/button-group lib:flex lib:w-fit lib:items-stretch lib:*:focus-visible:relative lib:*:focus-visible:z-10 lib:has-[>[data-slot=button-group]]:gap-2 lib:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-4xl lib:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit lib:[&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"lib:[&>*:not(:first-child)]:rounded-l-none lib:[&>*:not(:first-child)]:border-l-0 lib:[&>*:not(:last-child)]:rounded-r-none lib:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-4xl!",
				vertical:
					"lib:flex-col lib:[&>*:not(:first-child)]:rounded-t-none lib:[&>*:not(:first-child)]:border-t-0 lib:[&>*:not(:last-child)]:rounded-b-none lib:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-4xl!",
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
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp
			className={cn(
				"lib:flex lib:items-center lib:gap-2 lib:rounded-4xl lib:border lib:bg-muted lib:px-2.5 lib:text-sm lib:font-medium lib:[&_svg]:pointer-events-none lib:[&_svg:not([class*=size-])]:size-4",
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
				"lib:relative lib:self-stretch lib:bg-input lib:data-horizontal:mx-px lib:data-horizontal:w-auto lib:data-vertical:my-px lib:data-vertical:h-auto",
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
