import { cn } from "cn";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"lib:pointer-events-none lib:inline-flex lib:h-5 lib:w-fit lib:min-w-5 lib:items-center lib:justify-center lib:gap-1 lib:rounded-sm lib:bg-muted lib:px-1 lib:font-sans lib:text-xs lib:font-medium lib:text-muted-foreground lib:select-none lib:in-data-[slot=tooltip-content]:bg-background/20 lib:in-data-[slot=tooltip-content]:text-background lib:dark:in-data-[slot=tooltip-content]:bg-background/10 lib:[&_svg:not([class*=size-])]:size-3",
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
			className={cn("lib:inline-flex lib:items-center lib:gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
