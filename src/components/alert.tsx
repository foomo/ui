import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
	"lib:relative lib:w-full lib:rounded-lg lib:border lib:px-4 lib:py-3 lib:text-sm lib:[&>svg+div]:translate-y-[-3px] lib:[&>svg]:absolute lib:[&>svg]:left-4 lib:[&>svg]:top-4 lib:[&>svg]:text-foreground lib:[&>svg~*]:pl-7",
	{
		variants: {
			variant: {
				default: "lib:bg-background lib:text-foreground",
				destructive:
					"lib:border-destructive/50 lib:text-destructive lib:dark:border-destructive lib:[&>svg]:text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		role="alert"
		className={cn(alertVariants({ variant }), className)}
		{...props}
	/>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn(
			"lib:mb-1 lib:font-medium lib:leading-none lib:tracking-tight",
			className,
		)}
		{...props}
	/>
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("lib:text-sm lib:[&_p]:leading-relaxed", className)}
		{...props}
	/>
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
