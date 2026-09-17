import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { Separator } from "@/components/separator";

const buttonGroupVariants = cva(
	"fui:flex fui:w-fit fui:items-stretch fui:*:focus-visible:relative fui:*:focus-visible:z-10 fui:has-[>[data-slot=button-group]]:gap-2 fui:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-4xl fui:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit fui:[&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"fui:*:data-slot:rounded-r-none fui:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-4xl! fui:[&>[data-slot]~[data-slot]]:rounded-l-none fui:[&>[data-slot]~[data-slot]]:border-l-0",
				vertical:
					"fui:flex-col fui:*:data-slot:rounded-b-none fui:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-4xl! fui:[&>[data-slot]~[data-slot]]:rounded-t-none fui:[&>[data-slot]~[data-slot]]:border-t-0",
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
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"fui:flex fui:items-center fui:gap-2 fui:rounded-4xl fui:border fui:bg-muted fui:px-2.5 fui:text-sm fui:font-medium fui:[&_svg]:pointer-events-none fui:[&_svg:not([class*='size-'])]:size-4",
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: "button-group-text",
		},
	});
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
				"fui:relative fui:self-stretch fui:bg-input fui:data-horizontal:mx-px fui:data-horizontal:w-auto fui:data-vertical:my-px fui:data-vertical:h-auto",
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
