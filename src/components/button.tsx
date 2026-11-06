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
					"fui:border-current fui:bg-background fui:text-foreground fui:hover:bg-tertiary fui:aria-expanded:bg-tertiary",
				secondary:
					"fui:bg-tertiary fui:text-tertiary-foreground fui:hover:bg-[color-mix(in_oklch,var(--tertiary),var(--foreground)_5%)] fui:aria-expanded:bg-tertiary fui:aria-expanded:text-tertiary-foreground",
				ghost:
					"fui:underline fui:underline-offset-4 fui:hover:bg-tertiary fui:hover:text-foreground fui:aria-expanded:bg-tertiary fui:aria-expanded:text-foreground fui:dark:hover:bg-tertiary/50",
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
				// Square buttons hold an icon or an avatar, never a label, so they
				// opt out of the ghost variant's underline: it would otherwise run
				// under an avatar's initials.
				icon: "fui:size-9 fui:no-underline",
				"icon-xs":
					"fui:size-6 fui:no-underline fui:[&_svg:not([class*=size-])]:size-3",
				"icon-sm": "fui:size-8 fui:no-underline",
				"icon-lg": "fui:size-10 fui:no-underline",
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
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
