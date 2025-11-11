import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"lib:inline-flex lib:items-center lib:justify-center lib:gap-2 lib:rounded-md lib:text-sm lib:font-medium lib:transition-colors lib:hover:bg-muted lib:hover:text-muted-foreground lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:data-[state=on]:bg-accent lib:data-[state=on]:text-accent-foreground lib:[&_svg]:pointer-events-none lib:[&_svg]:size-4 lib:[&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "lib:bg-transparent",
				outline:
					"lib:border lib:border-input lib:bg-transparent lib:shadow-sm lib:hover:bg-accent lib:hover:text-accent-foreground",
			},
			size: {
				default: "lib:h-9 lib:px-2 lib:min-w-9",
				sm: "lib:h-8 lib:px-1.5 lib:min-w-8",
				lg: "lib:h-10 lib:px-2.5 lib:min-w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
