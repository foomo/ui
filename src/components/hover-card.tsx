import { cn } from "cn";
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import type * as React from "react";

function HoverCard({
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
	return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
	return (
		<HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}

function HoverCardContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
	return (
		<HoverCardPrimitive.Portal data-slot="hover-card-portal">
			<HoverCardPrimitive.Content
				data-slot="hover-card-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"lib:z-50 lib:w-72 lib:origin-(--radix-hover-card-content-transform-origin) lib:rounded-2xl lib:bg-popover lib:p-4 lib:text-sm lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:outline-hidden lib:duration-100 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95",
					className,
				)}
				{...props}
			/>
		</HoverCardPrimitive.Portal>
	);
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
