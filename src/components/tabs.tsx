import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"lib:inline-flex lib:h-9 lib:items-center lib:justify-center lib:rounded-lg lib:bg-muted lib:p-1 lib:text-muted-foreground",
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"lib:inline-flex lib:items-center lib:justify-center lib:whitespace-nowrap lib:rounded-md lib:px-3 lib:py-1 lib:text-sm lib:font-medium lib:ring-offset-background lib:transition-all lib:focus-visible:outline-none lib:focus-visible:ring-2 lib:focus-visible:ring-ring lib:focus-visible:ring-offset-2 lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:data-[state=active]:bg-background lib:data-[state=active]:text-foreground lib:data-[state=active]:shadow",
			className,
		)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"lib:mt-2 lib:ring-offset-background lib:focus-visible:outline-none lib:focus-visible:ring-2 lib:focus-visible:ring-ring lib:focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
