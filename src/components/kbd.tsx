import { cn } from "cn";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"fui:pointer-events-none fui:inline-flex fui:h-5 fui:w-fit fui:min-w-5 fui:items-center fui:justify-center fui:gap-1 fui:rounded-sm fui:bg-muted fui:px-1 fui:font-sans fui:text-xs fui:font-medium fui:text-muted-foreground fui:select-none fui:in-data-[slot=tooltip-content]:bg-background/20 fui:in-data-[slot=tooltip-content]:text-background fui:dark:in-data-[slot=tooltip-content]:bg-background/10 fui:[&_svg:not([class*=size-])]:size-3",
				className,
			)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("fui:inline-flex fui:items-center fui:gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
