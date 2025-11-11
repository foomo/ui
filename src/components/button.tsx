import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"lib:inline-flex lib:items-center lib:justify-center lib:gap-2 lib:whitespace-nowrap lib:rounded-md lib:text-sm lib:font-medium lib:transition-colors lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:size-4 lib:[&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"lib:bg-primary lib:text-primary-foreground lib:shadow lib:hover:bg-primary/90",
				destructive:
					"lib:bg-destructive lib:text-destructive-foreground lib:shadow-sm lib:hover:bg-destructive/90",
				outline:
					"lib:border lib:border-input lib:bg-background lib:shadow-sm lib:hover:bg-accent lib:hover:text-accent-foreground",
				secondary:
					"lib:bg-secondary lib:text-secondary-foreground lib:shadow-sm lib:hover:bg-secondary/80",
				ghost: "lib:hover:bg-accent lib:hover:text-accent-foreground",
				link: "lib:text-primary lib:underline-offset-4 lib:hover:underline",
			},
			size: {
				default: "lib:h-9 lib:px-4 lib:py-2",
				sm: "lib:h-8 lib:rounded-md lib:px-3 lib:text-xs",
				lg: "lib:h-10 lib:rounded-md lib:px-8",
				icon: "lib:h-9 lib:w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
