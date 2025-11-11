import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"lib:inline-flex lib:items-center lib:rounded-md lib:border lib:px-2.5 lib:py-0.5 lib:text-xs lib:font-semibold lib:transition-colors lib:focus:outline-none lib:focus:ring-2 lib:focus:ring-ring lib:focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"lib:border-transparent lib:bg-primary lib:text-primary-foreground lib:shadow lib:hover:bg-primary/80",
				secondary:
					"lib:border-transparent lib:bg-secondary lib:text-secondary-foreground lib:hover:bg-secondary/80",
				destructive:
					"lib:border-transparent lib:bg-destructive lib:text-destructive-foreground lib:shadow lib:hover:bg-destructive/80",
				outline: "lib:text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
