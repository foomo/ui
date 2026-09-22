import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const toggleVariants = cva(
	"fui:group/toggle fui:inline-flex fui:items-center fui:justify-center fui:gap-1 fui:rounded-4xl fui:text-sm fui:font-medium fui:whitespace-nowrap fui:transition-colors fui:outline-none fui:hover:bg-muted fui:hover:text-foreground fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:disabled:pointer-events-none fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-destructive/20 fui:aria-pressed:bg-muted fui:dark:aria-invalid:ring-destructive/40 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default: "fui:bg-transparent",
				outline:
					"fui:border fui:border-input fui:bg-transparent fui:hover:bg-muted",
			},
			size: {
				default:
					"fui:h-9 fui:min-w-9 fui:px-3 fui:has-data-[icon=inline-end]:pr-2.5 fui:has-data-[icon=inline-start]:pl-2.5",
				sm: "fui:h-8 fui:min-w-8 fui:px-3 fui:has-data-[icon=inline-end]:pr-2 fui:has-data-[icon=inline-start]:pl-2",
				lg: "fui:h-10 fui:min-w-10 fui:px-4 fui:has-data-[icon=inline-end]:pr-3 fui:has-data-[icon=inline-start]:pl-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
