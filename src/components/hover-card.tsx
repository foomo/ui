import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "cn";

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
	return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
	return (
		<PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}

function HoverCardContent({
	className,
	side = "bottom",
	sideOffset = 4,
	align = "center",
	alignOffset = 4,
	...props
}: PreviewCardPrimitive.Popup.Props &
	Pick<
		PreviewCardPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<PreviewCardPrimitive.Portal data-slot="hover-card-portal">
			<PreviewCardPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="fui:isolate fui:z-50"
			>
				<PreviewCardPrimitive.Popup
					data-slot="hover-card-content"
					className={cn(
						"fui:z-50 fui:w-72 fui:origin-(--transform-origin) fui:rounded-2xl fui:bg-popover fui:p-4 fui:text-sm fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:outline-hidden fui:duration-100 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95",
						className,
					)}
					{...props}
				/>
			</PreviewCardPrimitive.Positioner>
		</PreviewCardPrimitive.Portal>
	);
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
