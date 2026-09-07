"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const toggleVariants = cva(
	"lib:group/toggle lib:inline-flex lib:items-center lib:justify-center lib:gap-1 lib:rounded-4xl lib:text-sm lib:font-medium lib:whitespace-nowrap lib:transition-colors lib:outline-none lib:hover:bg-muted lib:hover:text-foreground lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-destructive/20 lib:aria-pressed:bg-muted lib:dark:aria-invalid:ring-destructive/40 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default: "lib:bg-transparent",
				outline:
					"lib:border lib:border-input lib:bg-transparent lib:hover:bg-muted",
			},
			size: {
				default:
					"lib:h-9 lib:min-w-9 lib:px-3 lib:has-data-[icon=inline-end]:pr-2.5 lib:has-data-[icon=inline-start]:pl-2.5",
				sm: "lib:h-8 lib:min-w-8 lib:px-3 lib:has-data-[icon=inline-end]:pr-2 lib:has-data-[icon=inline-start]:pl-2",
				lg: "lib:h-10 lib:min-w-10 lib:px-4 lib:has-data-[icon=inline-end]:pr-3 lib:has-data-[icon=inline-start]:pl-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
