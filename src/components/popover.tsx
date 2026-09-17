import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";
import type * as React from "react";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 4,
	...props
}: PopoverPrimitive.Popup.Props &
	Pick<
		PopoverPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="fui:isolate fui:z-50"
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						"fui:z-50 fui:flex fui:w-72 fui:origin-(--transform-origin) fui:flex-col fui:gap-4 fui:rounded-2xl fui:bg-popover fui:p-4 fui:text-sm fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:outline-hidden fui:duration-100 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95",
						className,
					)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("fui:flex fui:flex-col fui:gap-1 fui:text-sm", className)}
			{...props}
		/>
	);
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn("fui:text-base fui:font-medium", className)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className,
	...props
}: PopoverPrimitive.Description.Props) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn("fui:text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
};
