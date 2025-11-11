import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:w-full lib:touch-none lib:select-none lib:items-center",
			className,
		)}
		{...props}
	>
		<SliderPrimitive.Track className="lib:relative lib:h-1.5 lib:w-full lib:grow lib:overflow-hidden lib:rounded-full lib:bg-primary/20">
			<SliderPrimitive.Range className="lib:absolute lib:h-full lib:bg-primary" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="lib:block lib:h-4 lib:w-4 lib:rounded-full lib:border lib:border-primary/50 lib:bg-background lib:shadow lib:transition-colors lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:disabled:pointer-events-none lib:disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
