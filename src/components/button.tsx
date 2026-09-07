import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
	"lib:group/button lib:inline-flex lib:shrink-0 lib:items-center lib:justify-center lib:rounded-4xl lib:border lib:border-transparent lib:bg-clip-padding lib:text-sm lib:font-medium lib:whitespace-nowrap lib:transition-all lib:outline-none lib:select-none lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:active:not-aria-[haspopup]:translate-y-px lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-[3px] lib:aria-invalid:ring-destructive/20 lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default:
					"lib:bg-primary lib:text-primary-foreground lib:hover:bg-primary/80",
				outline:
					"lib:border-border lib:bg-input/30 lib:hover:bg-input/50 lib:hover:text-foreground lib:aria-expanded:bg-muted lib:aria-expanded:text-foreground",
				secondary:
					"lib:bg-secondary lib:text-secondary-foreground lib:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] lib:aria-expanded:bg-secondary lib:aria-expanded:text-secondary-foreground",
				ghost:
					"lib:hover:bg-muted lib:hover:text-foreground lib:aria-expanded:bg-muted lib:aria-expanded:text-foreground lib:dark:hover:bg-muted/50",
				destructive:
					"lib:bg-destructive/10 lib:text-destructive lib:hover:bg-destructive/20 lib:focus-visible:border-destructive/40 lib:focus-visible:ring-destructive/20 lib:dark:bg-destructive/20 lib:dark:hover:bg-destructive/30 lib:dark:focus-visible:ring-destructive/40",
				link: "lib:text-primary lib:underline-offset-4 lib:hover:underline",
			},
			size: {
				default:
					"lib:h-9 lib:gap-1.5 lib:px-3 lib:has-data-[icon=inline-end]:pr-2.5 lib:has-data-[icon=inline-start]:pl-2.5",
				xs: "lib:h-6 lib:gap-1 lib:px-2.5 lib:text-xs lib:has-data-[icon=inline-end]:pr-2 lib:has-data-[icon=inline-start]:pl-2 lib:[&_svg:not([class*=size-])]:size-3",
				sm: "lib:h-8 lib:gap-1 lib:px-3 lib:has-data-[icon=inline-end]:pr-2 lib:has-data-[icon=inline-start]:pl-2",
				lg: "lib:h-10 lib:gap-1.5 lib:px-4 lib:has-data-[icon=inline-end]:pr-3 lib:has-data-[icon=inline-start]:pl-3",
				icon: "lib:size-9",
				"icon-xs": "lib:size-6 lib:[&_svg:not([class*=size-])]:size-3",
				"icon-sm": "lib:size-8",
				"icon-lg": "lib:size-10",
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
