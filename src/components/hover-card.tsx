import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
	<HoverCardPrimitive.Content
		ref={ref}
		align={align}
		sideOffset={sideOffset}
		className={cn(
			"lib:z-50 lib:w-64 lib:rounded-md lib:border lib:bg-popover lib:p-4 lib:text-popover-foreground lib:shadow-md lib:outline-none lib:data-[state=open]:animate-in lib:data-[state=closed]:animate-out lib:data-[state=closed]:fade-out-0 lib:data-[state=open]:fade-in-0 lib:data-[state=closed]:zoom-out-95 lib:data-[state=open]:zoom-in-95 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:origin-[--radix-hover-card-content-transform-origin]",
			className,
		)}
		{...props}
	/>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
