import { cn } from "cn";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";

function Accordion({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn(
				"lib:flex lib:w-full lib:flex-col lib:overflow-hidden lib:rounded-2xl lib:border",
				className,
			)}
			{...props}
		/>
	);
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(
				"lib:not-last:border-b lib:data-open:bg-muted/50",
				className,
			)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className="lib:flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"lib:group/accordion-trigger lib:relative lib:flex lib:flex-1 lib:items-start lib:justify-between lib:gap-6 lib:border lib:border-transparent lib:p-4 lib:text-left lib:text-sm lib:font-medium lib:transition-all lib:outline-none lib:hover:underline lib:disabled:pointer-events-none lib:disabled:opacity-50 lib:**:data-[slot=accordion-trigger-icon]:ml-auto lib:**:data-[slot=accordion-trigger-icon]:size-4 lib:**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon
					data-slot="accordion-trigger-icon"
					className="lib:pointer-events-none lib:shrink-0 lib:group-aria-expanded/accordion-trigger:hidden"
				/>
				<ChevronUpIcon
					data-slot="accordion-trigger-icon"
					className="lib:pointer-events-none lib:hidden lib:shrink-0 lib:group-aria-expanded/accordion-trigger:inline"
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="lib:overflow-hidden lib:px-4 lib:text-sm lib:data-open:animate-accordion-down lib:data-closed:animate-accordion-up"
			{...props}
		>
			<div
				className={cn(
					"lib:h-(--radix-accordion-content-height) lib:pt-0 lib:pb-4 lib:[&_a]:underline lib:[&_a]:underline-offset-3 lib:[&_a]:hover:text-foreground lib:[&_p:not(:last-child)]:mb-4",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
