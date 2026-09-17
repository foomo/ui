import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
	"fui:group/badge fui:inline-flex fui:h-5 fui:w-fit fui:shrink-0 fui:items-center fui:justify-center fui:gap-1 fui:overflow-hidden fui:rounded-4xl fui:border fui:border-transparent fui:px-2 fui:py-0.5 fui:text-xs fui:font-medium fui:whitespace-nowrap fui:transition-all fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:has-data-[icon=inline-end]:pr-1.5 fui:has-data-[icon=inline-start]:pl-1.5 fui:aria-invalid:border-destructive fui:aria-invalid:ring-destructive/20 fui:dark:aria-invalid:ring-destructive/40 fui:[&>svg]:pointer-events-none fui:[&>svg]:size-3!",
	{
		variants: {
			variant: {
				default:
					"fui:bg-primary fui:text-primary-foreground fui:[a]:hover:bg-primary/80",
				secondary:
					"fui:bg-secondary fui:text-secondary-foreground fui:[a]:hover:bg-secondary/80",
				destructive:
					"fui:bg-destructive/10 fui:text-destructive fui:focus-visible:ring-destructive/20 fui:dark:bg-destructive/20 fui:dark:focus-visible:ring-destructive/40 fui:[a]:hover:bg-destructive/20",
				outline:
					"fui:border-border fui:bg-input/30 fui:text-foreground fui:[a]:hover:bg-muted fui:[a]:hover:text-muted-foreground",
				ghost:
					"fui:hover:bg-muted fui:hover:text-muted-foreground fui:dark:hover:bg-muted/50",
				link: "fui:text-link fui:underline-offset-4 fui:hover:underline",
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
