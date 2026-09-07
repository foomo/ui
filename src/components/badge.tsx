import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
	"lib:group/badge lib:inline-flex lib:h-5 lib:w-fit lib:shrink-0 lib:items-center lib:justify-center lib:gap-1 lib:overflow-hidden lib:rounded-4xl lib:border lib:border-transparent lib:px-2 lib:py-0.5 lib:text-xs lib:font-medium lib:whitespace-nowrap lib:transition-all lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:has-data-[icon=inline-end]:pr-1.5 lib:has-data-[icon=inline-start]:pl-1.5 lib:aria-invalid:border-destructive lib:aria-invalid:ring-destructive/20 lib:dark:aria-invalid:ring-destructive/40 lib:[&>svg]:pointer-events-none lib:[&>svg]:size-3!",
	{
		variants: {
			variant: {
				default:
					"lib:bg-primary lib:text-primary-foreground lib:[a]:hover:bg-primary/80",
				secondary:
					"lib:bg-secondary lib:text-secondary-foreground lib:[a]:hover:bg-secondary/80",
				destructive:
					"lib:bg-destructive/10 lib:text-destructive lib:focus-visible:ring-destructive/20 lib:dark:bg-destructive/20 lib:dark:focus-visible:ring-destructive/40 lib:[a]:hover:bg-destructive/20",
				outline:
					"lib:border-border lib:bg-input/30 lib:text-foreground lib:[a]:hover:bg-muted lib:[a]:hover:text-muted-foreground",
				ghost:
					"lib:hover:bg-muted lib:hover:text-muted-foreground lib:dark:hover:bg-muted/50",
				link: "lib:text-primary lib:underline-offset-4 lib:hover:underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant = "default",
	render,
	...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant }), className),
			},
			props,
		),
		render,
		state: {
			slot: "badge",
			variant,
		},
	});
}

export { Badge, badgeVariants };
