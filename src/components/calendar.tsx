import { cn } from "cn";
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
	type Locale,
} from "react-day-picker";
import { Button, buttonVariants } from "@/components/button";

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	locale,
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
				"lib:group/calendar lib:bg-background lib:p-3 lib:[--cell-radius:var(--radius-4xl)] lib:[--cell-size:--spacing(8)] lib:in-data-[slot=card-content]:bg-transparent lib:in-data-[slot=popover-content]:bg-transparent",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
			)}
			captionLayout={captionLayout}
			locale={locale}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString(locale?.code, { month: "short" }),
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
					"lib:size-(--cell-size) lib:p-0 lib:select-none lib:aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"lib:size-(--cell-size) lib:p-0 lib:select-none lib:aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"lib:flex lib:h-(--cell-size) lib:w-full lib:items-center lib:justify-center lib:px-(--cell-size)",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"lib:flex lib:h-(--cell-size) lib:w-full lib:items-center lib:justify-center lib:gap-1.5 lib:text-sm lib:font-medium",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"lib:relative lib:rounded-(--cell-radius)",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn(
					"lib:absolute lib:inset-0 lib:bg-popover lib:opacity-0",
					defaultClassNames.dropdown,
				),
				caption_label: cn(
					"lib:font-medium lib:select-none",
					captionLayout === "label"
						? "lib:text-sm"
						: "lib:flex lib:items-center lib:gap-1 lib:rounded-(--cell-radius) lib:text-sm lib:[&>svg]:size-3.5 lib:[&>svg]:text-muted-foreground",
					defaultClassNames.caption_label,
				),
				month_grid: cn(
					"lib:w-full lib:border-collapse",
					defaultClassNames.month_grid,
				),
				weekdays: cn("lib:flex", defaultClassNames.weekdays),
				weekday: cn(
					"lib:flex-1 lib:rounded-(--cell-radius) lib:text-[0.8rem] lib:font-normal lib:text-muted-foreground lib:select-none",
					defaultClassNames.weekday,
				),
				week: cn("lib:mt-2 lib:flex lib:w-full", defaultClassNames.week),
				week_number_header: cn(
					"lib:w-(--cell-size) lib:select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"lib:text-[0.8rem] lib:text-muted-foreground lib:select-none",
					defaultClassNames.week_number,
				),
				day: cn(
					"lib:group/day lib:relative lib:aspect-square lib:h-full lib:w-full lib:rounded-(--cell-radius) lib:p-0 lib:text-center lib:select-none lib:[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
					props.showWeekNumber
						? "lib:[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
						: "lib:[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
					defaultClassNames.day,
				),
				range_start: cn(
					"lib:relative lib:isolate lib:z-0 lib:rounded-l-(--cell-radius) lib:bg-muted lib:after:absolute lib:after:inset-y-0 lib:after:right-0 lib:after:w-4 lib:after:bg-muted",
					defaultClassNames.range_start,
				),
				range_middle: cn("lib:rounded-none", defaultClassNames.range_middle),
				range_end: cn(
					"lib:relative lib:isolate lib:z-0 lib:rounded-r-(--cell-radius) lib:bg-muted lib:after:absolute lib:after:inset-y-0 lib:after:left-0 lib:after:w-4 lib:after:bg-muted",
					defaultClassNames.range_end,
				),
				today: cn(
					"lib:rounded-(--cell-radius) lib:bg-muted lib:text-foreground lib:data-[selected=true]:rounded-none",
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
				DayButton: ({ ...props }) => (
					<CalendarDayButton locale={locale} {...props} />
				),
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="lib:flex lib:size-(--cell-size) lib:items-center lib:justify-center lib:text-center">
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
	locale,
	...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
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
			data-day={day.date.toLocaleDateString(locale?.code)}
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
				"lib:relative lib:isolate lib:z-10 lib:flex lib:aspect-square lib:size-auto lib:w-full lib:min-w-(--cell-size) lib:flex-col lib:gap-1 lib:border-0 lib:leading-none lib:font-normal lib:group-data-[focused=true]/day:relative lib:group-data-[focused=true]/day:z-10 lib:group-data-[focused=true]/day:border-ring lib:group-data-[focused=true]/day:ring-[3px] lib:group-data-[focused=true]/day:ring-ring/50 lib:data-[range-end=true]:rounded-(--cell-radius) lib:data-[range-end=true]:rounded-r-(--cell-radius) lib:data-[range-end=true]:bg-primary lib:data-[range-end=true]:text-primary-foreground lib:data-[range-middle=true]:rounded-none lib:data-[range-middle=true]:bg-muted lib:data-[range-middle=true]:text-foreground lib:data-[range-start=true]:rounded-(--cell-radius) lib:data-[range-start=true]:rounded-l-(--cell-radius) lib:data-[range-start=true]:bg-primary lib:data-[range-start=true]:text-primary-foreground lib:data-[selected-single=true]:bg-primary lib:data-[selected-single=true]:text-primary-foreground lib:dark:hover:text-foreground lib:[&>span]:text-xs lib:[&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
