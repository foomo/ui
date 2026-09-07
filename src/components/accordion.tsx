import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
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

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
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
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="lib:flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"lib:group/accordion-trigger lib:relative lib:flex lib:flex-1 lib:items-start lib:justify-between lib:gap-6 lib:border lib:border-transparent lib:p-4 lib:text-left lib:text-sm lib:font-medium lib:transition-all lib:outline-none lib:hover:underline lib:aria-disabled:pointer-events-none lib:aria-disabled:opacity-50 lib:**:data-[slot=accordion-trigger-icon]:ml-auto lib:**:data-[slot=accordion-trigger-icon]:size-4 lib:**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
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
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className="lib:overflow-hidden lib:px-4 lib:text-sm lib:data-open:animate-accordion-down lib:data-closed:animate-accordion-up"
			{...props}
		>
			<div
				className={cn(
					"lib:h-(--accordion-panel-height) lib:pt-0 lib:pb-4 lib:data-ending-style:h-0 lib:data-starting-style:h-0 lib:[&_a]:underline lib:[&_a]:underline-offset-3 lib:[&_a]:hover:text-foreground lib:[&_p:not(:last-child)]:mb-4",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
