import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"lib:bg-muted lib:text-muted-foreground lib:pointer-events-none lib:inline-flex lib:h-5 lib:w-fit lib:min-w-5 lib:select-none lib:items-center lib:justify-center lib:gap-1 lib:rounded-sm lib:px-1 lib:font-sans lib:text-xs lib:font-medium",
				"lib:[&_svg:not([class*=size-])]:size-3",
				"lib:[[data-slot=tooltip-content]_&]:bg-background/20 lib:[[data-slot=tooltip-content]_&]:text-background lib:dark:[[data-slot=tooltip-content]_&]:bg-background/10",
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
