import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { cn } from "cn";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn(
				"fui:flex fui:w-full fui:flex-col fui:overflow-hidden fui:rounded-2xl fui:border",
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
				"fui:not-last:border-b fui:data-open:bg-muted/50",
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
		<AccordionPrimitive.Header className="fui:flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"fui:group/accordion-trigger fui:relative fui:flex fui:flex-1 fui:items-start fui:justify-between fui:gap-6 fui:border fui:border-transparent fui:p-4 fui:text-left fui:text-sm fui:font-medium fui:transition-all fui:outline-none fui:hover:underline fui:aria-disabled:pointer-events-none fui:aria-disabled:opacity-50 fui:**:data-[slot=accordion-trigger-icon]:ml-auto fui:**:data-[slot=accordion-trigger-icon]:size-4 fui:**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children}
				<CaretDownIcon
					data-slot="accordion-trigger-icon"
					className="fui:pointer-events-none fui:shrink-0 fui:group-aria-expanded/accordion-trigger:hidden"
				/>
				<CaretUpIcon
					data-slot="accordion-trigger-icon"
					className="fui:pointer-events-none fui:hidden fui:shrink-0 fui:group-aria-expanded/accordion-trigger:inline"
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
			className="fui:overflow-hidden fui:px-4 fui:text-sm fui:data-open:animate-accordion-down fui:data-closed:animate-accordion-up"
			{...props}
		>
			<div
				className={cn(
					"fui:h-(--accordion-panel-height) fui:pt-0 fui:pb-4 fui:data-ending-style:h-0 fui:data-starting-style:h-0 fui:[&_a]:underline fui:[&_a]:underline-offset-3 fui:[&_a]:hover:text-foreground fui:[&_p:not(:last-child)]:mb-4",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
