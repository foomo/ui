import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { Separator } from "@/components/separator";

const buttonGroupVariants = cva(
	"lib:flex lib:w-fit lib:items-stretch lib:*:focus-visible:relative lib:*:focus-visible:z-10 lib:has-[>[data-slot=button-group]]:gap-2 lib:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-4xl lib:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit lib:[&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"lib:*:data-slot:rounded-r-none lib:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-4xl! lib:[&>[data-slot]~[data-slot]]:rounded-l-none lib:[&>[data-slot]~[data-slot]]:border-l-0",
				vertical:
					"lib:flex-col lib:*:data-slot:rounded-b-none lib:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-4xl! lib:[&>[data-slot]~[data-slot]]:rounded-t-none lib:[&>[data-slot]~[data-slot]]:border-t-0",
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
					"flex items-center gap-2 rounded-4xl border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
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
