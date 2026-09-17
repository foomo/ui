import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";

function ScrollArea({
	className,
	children,
	...props
}: ScrollAreaPrimitive.Root.Props) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("fui:relative", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="fui:size-full fui:rounded-[inherit] fui:transition-[color,box-shadow] fui:outline-none fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:focus-visible:outline-1"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				"fui:flex fui:touch-none fui:p-px fui:transition-colors fui:select-none fui:data-horizontal:h-2.5 fui:data-horizontal:flex-col fui:data-horizontal:border-t fui:data-horizontal:border-t-transparent fui:data-vertical:h-full fui:data-vertical:w-2.5 fui:data-vertical:border-l fui:data-vertical:border-l-transparent",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="fui:relative fui:flex-1 fui:rounded-full fui:bg-border"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
