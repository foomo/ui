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
				"lib:group/tabs lib:flex lib:gap-2 lib:data-horizontal:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	"lib:group/tabs-list lib:inline-flex lib:w-fit lib:items-center lib:justify-center lib:rounded-4xl lib:p-[3px] lib:text-muted-foreground lib:group-data-horizontal/tabs:h-9 lib:group-data-vertical/tabs:h-fit lib:group-data-vertical/tabs:flex-col lib:group-data-vertical/tabs:rounded-2xl lib:data-[variant=line]:rounded-none",
	{
		variants: {
			variant: {
				default: "lib:bg-muted",
				line: "lib:gap-1 lib:bg-transparent",
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
				"lib:relative lib:inline-flex lib:h-[calc(100%-1px)] lib:flex-1 lib:items-center lib:justify-center lib:gap-1.5 lib:rounded-xl lib:border lib:border-transparent lib:px-2 lib:py-1 lib:text-sm lib:font-medium lib:whitespace-nowrap lib:text-foreground/60 lib:transition-all lib:group-data-vertical/tabs:w-full lib:group-data-vertical/tabs:justify-start lib:group-data-vertical/tabs:px-2.5 lib:group-data-vertical/tabs:py-1.5 lib:hover:text-foreground lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:focus-visible:outline-1 lib:focus-visible:outline-ring lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:has-data-[icon=inline-end]:pr-1.5 lib:has-data-[icon=inline-start]:pl-1.5 lib:aria-disabled:pointer-events-none lib:aria-disabled:opacity-50 lib:dark:text-muted-foreground lib:dark:hover:text-foreground lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
				"lib:group-data-[variant=line]/tabs-list:bg-transparent lib:group-data-[variant=line]/tabs-list:data-active:bg-transparent lib:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent lib:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
				"lib:data-active:bg-background lib:data-active:text-foreground lib:dark:data-active:border-input lib:dark:data-active:bg-input/30 lib:dark:data-active:text-foreground",
				"lib:after:absolute lib:after:bg-foreground lib:after:opacity-0 lib:after:transition-opacity lib:group-data-horizontal/tabs:after:inset-x-0 lib:group-data-horizontal/tabs:after:bottom-[-5px] lib:group-data-horizontal/tabs:after:h-0.5 lib:group-data-vertical/tabs:after:inset-y-0 lib:group-data-vertical/tabs:after:-right-1 lib:group-data-vertical/tabs:after:w-0.5 lib:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
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
			className={cn("lib:flex-1 lib:text-sm lib:outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
