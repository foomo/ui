import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

function Tabs({
	className,
	orientation = "horizontal",
	...props
}: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			className={cn(
				"fui:group/tabs fui:flex fui:gap-2 fui:data-horizontal:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	"fui:group/tabs-list fui:inline-flex fui:w-fit fui:items-center fui:justify-center fui:rounded-4xl fui:p-[3px] fui:text-muted-foreground fui:group-data-horizontal/tabs:h-9 fui:group-data-vertical/tabs:h-fit fui:group-data-vertical/tabs:flex-col fui:group-data-vertical/tabs:rounded-2xl fui:data-[variant=line]:rounded-none",
	{
		variants: {
			variant: {
				default: "fui:bg-muted",
				line: "fui:gap-1 fui:bg-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function TabsList({
	className,
	variant = "default",
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		/>
	);
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				"fui:relative fui:inline-flex fui:h-[calc(100%-1px)] fui:flex-1 fui:items-center fui:justify-center fui:gap-1.5 fui:rounded-xl fui:border fui:border-transparent fui:px-2 fui:py-1 fui:text-sm fui:font-medium fui:whitespace-nowrap fui:text-foreground/60 fui:transition-all fui:group-data-vertical/tabs:w-full fui:group-data-vertical/tabs:justify-start fui:group-data-vertical/tabs:px-2.5 fui:group-data-vertical/tabs:py-1.5 fui:hover:text-foreground fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:focus-visible:outline-1 fui:focus-visible:outline-ring fui:disabled:pointer-events-none fui:disabled:opacity-50 fui:has-data-[icon=inline-end]:pr-1.5 fui:has-data-[icon=inline-start]:pl-1.5 fui:aria-disabled:pointer-events-none fui:aria-disabled:opacity-50 fui:dark:text-muted-foreground fui:dark:hover:text-foreground fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				"fui:group-data-[variant=line]/tabs-list:bg-transparent fui:group-data-[variant=line]/tabs-list:data-active:bg-transparent fui:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent fui:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
				"fui:data-active:bg-background fui:data-active:text-foreground fui:dark:data-active:border-input fui:dark:data-active:bg-input/30 fui:dark:data-active:text-foreground",
				"fui:after:absolute fui:after:bg-foreground fui:after:opacity-0 fui:after:transition-opacity fui:group-data-horizontal/tabs:after:inset-x-0 fui:group-data-horizontal/tabs:after:bottom-[-5px] fui:group-data-horizontal/tabs:after:h-0.5 fui:group-data-vertical/tabs:after:inset-y-0 fui:group-data-vertical/tabs:after:-right-1 fui:group-data-vertical/tabs:after:w-0.5 fui:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn("fui:flex-1 fui:text-sm fui:outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
