import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
	"fui:group/button fui:inline-flex fui:shrink-0 fui:items-center fui:justify-center fui:rounded-4xl fui:border fui:border-transparent fui:bg-clip-padding fui:text-sm fui:font-medium fui:whitespace-nowrap fui:transition-all fui:outline-none fui:select-none fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:active:not-aria-[haspopup]:translate-y-px fui:disabled:pointer-events-none fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default:
					"fui:bg-primary fui:text-primary-foreground fui:hover:bg-primary/80",
				outline:
					"fui:border-border fui:bg-input/30 fui:hover:bg-input/50 fui:hover:text-foreground fui:aria-expanded:bg-muted fui:aria-expanded:text-foreground",
				secondary:
					"fui:bg-secondary fui:text-secondary-foreground fui:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] fui:aria-expanded:bg-secondary fui:aria-expanded:text-secondary-foreground",
				ghost:
					"fui:hover:bg-muted fui:hover:text-foreground fui:aria-expanded:bg-muted fui:aria-expanded:text-foreground fui:dark:hover:bg-muted/50",
				destructive:
					"fui:bg-destructive/10 fui:text-destructive fui:hover:bg-destructive/20 fui:focus-visible:border-destructive/40 fui:focus-visible:ring-destructive/20 fui:dark:bg-destructive/20 fui:dark:hover:bg-destructive/30 fui:dark:focus-visible:ring-destructive/40",
				link: "fui:text-link fui:underline-offset-4 fui:hover:underline",
			},
			size: {
				default:
					"fui:h-9 fui:gap-1.5 fui:px-3 fui:has-data-[icon=inline-end]:pr-2.5 fui:has-data-[icon=inline-start]:pl-2.5",
				xs: "fui:h-6 fui:gap-1 fui:px-2.5 fui:text-xs fui:has-data-[icon=inline-end]:pr-2 fui:has-data-[icon=inline-start]:pl-2 fui:[&_svg:not([class*=size-])]:size-3",
				sm: "fui:h-8 fui:gap-1 fui:px-3 fui:has-data-[icon=inline-end]:pr-2 fui:has-data-[icon=inline-start]:pl-2",
				lg: "fui:h-10 fui:gap-1.5 fui:px-4 fui:has-data-[icon=inline-end]:pr-3 fui:has-data-[icon=inline-start]:pl-3",
				icon: "fui:size-9",
				"icon-xs": "fui:size-6 fui:[&_svg:not([class*=size-])]:size-3",
				"icon-sm": "fui:size-8",
				"icon-lg": "fui:size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
