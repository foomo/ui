import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"lib:grid lib:place-content-center lib:peer lib:h-4 lib:w-4 lib:shrink-0 lib:rounded-sm lib:border lib:border-primary lib:shadow lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:data-[state=checked]:bg-primary lib:data-[state=checked]:text-primary-foreground",
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn("lib:grid lib:place-content-center lib:text-current")}
		>
			<Check className="lib:h-4 lib:w-4" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
