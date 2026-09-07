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
			className={cn("lib:relative", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="lib:size-full lib:rounded-[inherit] lib:transition-[color,box-shadow] lib:outline-none lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:focus-visible:outline-1"
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
				"lib:flex lib:touch-none lib:p-px lib:transition-colors lib:select-none lib:data-horizontal:h-2.5 lib:data-horizontal:flex-col lib:data-horizontal:border-t lib:data-horizontal:border-t-transparent lib:data-vertical:h-full lib:data-vertical:w-2.5 lib:data-vertical:border-l lib:data-vertical:border-l-transparent",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="lib:relative lib:flex-1 lib:rounded-full lib:bg-border"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
