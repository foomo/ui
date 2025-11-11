import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			"lib:peer lib:inline-flex lib:h-5 lib:w-9 lib:shrink-0 lib:cursor-pointer lib:items-center lib:rounded-full lib:border-2 lib:border-transparent lib:shadow-sm lib:transition-colors lib:focus-visible:outline-none lib:focus-visible:ring-2 lib:focus-visible:ring-ring lib:focus-visible:ring-offset-2 lib:focus-visible:ring-offset-background lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:data-[state=checked]:bg-primary lib:data-[state=unchecked]:bg-input",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"lib:pointer-events-none lib:block lib:h-4 lib:w-4 lib:rounded-full lib:bg-background lib:shadow-lg lib:ring-0 lib:transition-transform lib:data-[state=checked]:translate-x-4 lib:data-[state=unchecked]:translate-x-0",
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
