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
				className="fui:isolate fui:z-50"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"fui:z-50 fui:inline-flex fui:w-fit fui:max-w-xs fui:origin-(--transform-origin) fui:items-center fui:gap-1.5 fui:rounded-2xl fui:bg-foreground fui:px-3 fui:py-1.5 fui:text-xs fui:text-background fui:has-data-[slot=kbd]:pr-1.5 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:**:data-[slot=kbd]:relative fui:**:data-[slot=kbd]:isolate fui:**:data-[slot=kbd]:z-50 fui:**:data-[slot=kbd]:rounded-4xl fui:data-[state=delayed-open]:animate-in fui:data-[state=delayed-open]:fade-in-0 fui:data-[state=delayed-open]:zoom-in-95 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95",
						className,
					)}
					{...props}
				>
					{children}
					<TooltipPrimitive.Arrow className="fui:z-50 fui:size-2.5 fui:translate-y-[calc(-50%-2px)] fui:rotate-45 fui:rounded-[2px] fui:bg-foreground fui:fill-foreground fui:data-[side=bottom]:top-1 fui:data-[side=inline-end]:top-1/2! fui:data-[side=inline-end]:-left-1 fui:data-[side=inline-end]:translate-x-[1.5px] fui:data-[side=inline-end]:-translate-y-1/2 fui:data-[side=inline-start]:top-1/2! fui:data-[side=inline-start]:-right-1 fui:data-[side=inline-start]:translate-x-[-1.5px] fui:data-[side=inline-start]:-translate-y-1/2 fui:data-[side=left]:top-1/2! fui:data-[side=left]:-right-1 fui:data-[side=left]:translate-x-[-1.5px] fui:data-[side=left]:-translate-y-1/2 fui:data-[side=right]:top-1/2! fui:data-[side=right]:-left-1 fui:data-[side=right]:translate-x-[1.5px] fui:data-[side=right]:-translate-y-1/2 fui:data-[side=top]:-bottom-2.5" />
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
