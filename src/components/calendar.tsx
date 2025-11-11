"use client";

import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import * as React from "react";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames,
} from "react-day-picker";
import { Button, buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	formatters,
	components,
	...props
}: React.ComponentProps<typeof DayPicker> & {
	buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"lib:bg-background lib:group/calendar lib:p-3 lib:[--cell-size:2rem] lib:[[data-slot=card-content]_&]:bg-transparent lib:[[data-slot=popover-content]_&]:bg-transparent",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString("default", { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("lib:w-fit", defaultClassNames.root),
				months: cn(
					"lib:relative lib:flex lib:flex-col lib:gap-4 lib:md:flex-row",
					defaultClassNames.months,
				),
				month: cn(
					"lib:flex lib:w-full lib:flex-col lib:gap-4",
					defaultClassNames.month,
				),
				nav: cn(
					"lib:absolute lib:inset-x-0 lib:top-0 lib:flex lib:w-full lib:items-center lib:justify-between lib:gap-1",
					defaultClassNames.nav,
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"lib:h-[--cell-size] lib:w-[--cell-size] lib:select-none lib:p-0 lib:aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"lib:h-[--cell-size] lib:w-[--cell-size] lib:select-none lib:p-0 lib:aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"lib:flex lib:h-[--cell-size] lib:w-full lib:items-center lib:justify-center lib:px-[--cell-size]",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"lib:flex lib:h-[--cell-size] lib:w-full lib:items-center lib:justify-center lib:gap-1.5 lib:text-sm lib:font-medium",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"lib:has-focus:border-ring lib:border-input lib:shadow-xs lib:has-focus:ring-ring/50 lib:has-focus:ring-[3px] lib:relative lib:rounded-md lib:border",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn(
					"lib:bg-popover lib:absolute lib:inset-0 lib:opacity-0",
					defaultClassNames.dropdown,
				),
				caption_label: cn(
					"lib:select-none lib:font-medium",
					captionLayout === "label"
						? "lib:text-sm"
						: "lib:[&>svg]:text-muted-foreground lib:flex lib:h-8 lib:items-center lib:gap-1 lib:rounded-md lib:pl-2 lib:pr-1 lib:text-sm lib:[&>svg]:size-3.5",
					defaultClassNames.caption_label,
				),
				table: "lib:w-full lib:border-collapse",
				weekdays: cn("lib:flex", defaultClassNames.weekdays),
				weekday: cn(
					"lib:text-muted-foreground lib:flex-1 lib:select-none lib:rounded-md lib:text-[0.8rem] lib:font-normal",
					defaultClassNames.weekday,
				),
				week: cn("lib:mt-2 lib:flex lib:w-full", defaultClassNames.week),
				week_number_header: cn(
					"lib:w-[--cell-size] lib:select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"lib:text-muted-foreground lib:select-none lib:text-[0.8rem]",
					defaultClassNames.week_number,
				),
				day: cn(
					"lib:group/day lib:relative lib:aspect-square lib:h-full lib:w-full lib:select-none lib:p-0 lib:text-center lib:[&:first-child[data-selected=true]_button]:rounded-l-md lib:[&:last-child[data-selected=true]_button]:rounded-r-md",
					defaultClassNames.day,
				),
				range_start: cn(
					"lib:bg-accent lib:rounded-l-md",
					defaultClassNames.range_start,
				),
				range_middle: cn("lib:rounded-none", defaultClassNames.range_middle),
				range_end: cn(
					"lib:bg-accent lib:rounded-r-md",
					defaultClassNames.range_end,
				),
				today: cn(
					"lib:bg-accent lib:text-accent-foreground lib:rounded-md lib:data-[selected=true]:rounded-none",
					defaultClassNames.today,
				),
				outside: cn(
					"lib:text-muted-foreground lib:aria-selected:text-muted-foreground",
					defaultClassNames.outside,
				),
				disabled: cn(
					"lib:text-muted-foreground lib:opacity-50",
					defaultClassNames.disabled,
				),
				hidden: cn("lib:invisible", defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cn(className)}
							{...props}
						/>
					);
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<ChevronLeftIcon
								className={cn("lib:size-4", className)}
								{...props}
							/>
						);
					}

					if (orientation === "right") {
						return (
							<ChevronRightIcon
								className={cn("lib:size-4", className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon
							className={cn("lib:size-4", className)}
							{...props}
						/>
					);
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="lib:flex lib:size-[--cell-size] lib:items-center lib:justify-center lib:text-center">
								{children}
							</div>
						</td>
					);
				},
				...components,
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>) {
	const defaultClassNames = getDefaultClassNames();

	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				"lib:data-[selected-single=true]:bg-primary lib:data-[selected-single=true]:text-primary-foreground lib:data-[range-middle=true]:bg-accent lib:data-[range-middle=true]:text-accent-foreground lib:data-[range-start=true]:bg-primary lib:data-[range-start=true]:text-primary-foreground lib:data-[range-end=true]:bg-primary lib:data-[range-end=true]:text-primary-foreground lib:group-data-[focused=true]/day:border-ring lib:group-data-[focused=true]/day:ring-ring/50 lib:flex lib:aspect-square lib:h-auto lib:w-full lib:min-w-[--cell-size] lib:flex-col lib:gap-1 lib:font-normal lib:leading-none lib:data-[range-end=true]:rounded-md lib:data-[range-middle=true]:rounded-none lib:data-[range-start=true]:rounded-md lib:group-data-[focused=true]/day:relative lib:group-data-[focused=true]/day:z-10 lib:group-data-[focused=true]/day:ring-[3px] lib:[&>span]:text-xs lib:[&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
