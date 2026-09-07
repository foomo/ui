"use client";

import { cn } from "cn";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import type * as React from "react";

function TooltipProvider({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delayDuration={delayDuration}
			{...props}
		/>
	);
}

function Tooltip({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	sideOffset = 0,
	children,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				data-slot="tooltip-content"
				sideOffset={sideOffset}
				className={cn(
					"lib:z-50 lib:inline-flex lib:w-fit lib:max-w-xs lib:origin-(--radix-tooltip-content-transform-origin) lib:items-center lib:gap-1.5 lib:rounded-2xl lib:bg-foreground lib:px-3 lib:py-1.5 lib:text-xs lib:text-background lib:has-data-[slot=kbd]:pr-1.5 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:**:data-[slot=kbd]:relative lib:**:data-[slot=kbd]:isolate lib:**:data-[slot=kbd]:z-50 lib:**:data-[slot=kbd]:rounded-4xl lib:data-[state=delayed-open]:animate-in lib:data-[state=delayed-open]:fade-in-0 lib:data-[state=delayed-open]:zoom-in-95 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95",
					className,
				)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow className="lib:z-50 lib:size-2.5 lib:translate-y-[calc(-50%_-_2px)] lib:rotate-45 lib:rounded-[2px] lib:bg-foreground lib:fill-foreground lib:data-[side=left]:translate-x-[-1.5px] lib:data-[side=right]:translate-x-[1.5px]" />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
