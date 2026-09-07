import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "cn";

function TooltipProvider({
	delay = 0,
	...props
}: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			{...props}
		/>
	);
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	side = "top",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	children,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<
		TooltipPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="lib:isolate lib:z-50"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"lib:z-50 lib:inline-flex lib:w-fit lib:max-w-xs lib:origin-(--transform-origin) lib:items-center lib:gap-1.5 lib:rounded-2xl lib:bg-foreground lib:px-3 lib:py-1.5 lib:text-xs lib:text-background lib:has-data-[slot=kbd]:pr-1.5 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=inline-end]:slide-in-from-left-2 lib:data-[side=inline-start]:slide-in-from-right-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:**:data-[slot=kbd]:relative lib:**:data-[slot=kbd]:isolate lib:**:data-[slot=kbd]:z-50 lib:**:data-[slot=kbd]:rounded-4xl lib:data-[state=delayed-open]:animate-in lib:data-[state=delayed-open]:fade-in-0 lib:data-[state=delayed-open]:zoom-in-95 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95",
						className,
					)}
					{...props}
				>
					{children}
					<TooltipPrimitive.Arrow className="lib:z-50 lib:size-2.5 lib:translate-y-[calc(-50%-2px)] lib:rotate-45 lib:rounded-[2px] lib:bg-foreground lib:fill-foreground lib:data-[side=bottom]:top-1 lib:data-[side=inline-end]:top-1/2! lib:data-[side=inline-end]:-left-1 lib:data-[side=inline-end]:translate-x-[1.5px] lib:data-[side=inline-end]:-translate-y-1/2 lib:data-[side=inline-start]:top-1/2! lib:data-[side=inline-start]:-right-1 lib:data-[side=inline-start]:translate-x-[-1.5px] lib:data-[side=inline-start]:-translate-y-1/2 lib:data-[side=left]:top-1/2! lib:data-[side=left]:-right-1 lib:data-[side=left]:translate-x-[-1.5px] lib:data-[side=left]:-translate-y-1/2 lib:data-[side=right]:top-1/2! lib:data-[side=right]:-left-1 lib:data-[side=right]:translate-x-[1.5px] lib:data-[side=right]:-translate-y-1/2 lib:data-[side=top]:-bottom-2.5" />
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
