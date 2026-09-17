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
				"fui:group/calendar fui:bg-background fui:p-3 fui:[--cell-radius:var(--radius-4xl)] fui:[--cell-size:--spacing(8)] fui:in-data-[slot=card-content]:bg-transparent fui:in-data-[slot=popover-content]:bg-transparent",
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
				root: cn("fui:w-fit", defaultClassNames.root),
				months: cn(
					"fui:relative fui:flex fui:flex-col fui:gap-4 fui:md:flex-row",
					defaultClassNames.months,
				),
				month: cn(
					"fui:flex fui:w-full fui:flex-col fui:gap-4",
					defaultClassNames.month,
				),
				nav: cn(
					"fui:absolute fui:inset-x-0 fui:top-0 fui:flex fui:w-full fui:items-center fui:justify-between fui:gap-1",
					defaultClassNames.nav,
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"fui:size-(--cell-size) fui:p-0 fui:select-none fui:aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"fui:size-(--cell-size) fui:p-0 fui:select-none fui:aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"fui:flex fui:h-(--cell-size) fui:w-full fui:items-center fui:justify-center fui:px-(--cell-size)",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"fui:flex fui:h-(--cell-size) fui:w-full fui:items-center fui:justify-center fui:gap-1.5 fui:text-sm fui:font-medium",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"fui:relative fui:rounded-(--cell-radius)",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn(
					"fui:absolute fui:inset-0 fui:bg-popover fui:opacity-0",
					defaultClassNames.dropdown,
				),
				caption_label: cn(
					"fui:font-medium fui:select-none",
					captionLayout === "label"
						? "fui:text-sm"
						: "fui:flex fui:items-center fui:gap-1 fui:rounded-(--cell-radius) fui:text-sm fui:[&>svg]:size-3.5 fui:[&>svg]:text-muted-foreground",
					defaultClassNames.caption_label,
				),
				month_grid: cn(
					"fui:w-full fui:border-collapse",
					defaultClassNames.month_grid,
				),
				weekdays: cn("fui:flex", defaultClassNames.weekdays),
				weekday: cn(
					"fui:flex-1 fui:rounded-(--cell-radius) fui:text-[0.8rem] fui:font-normal fui:text-muted-foreground fui:select-none",
					defaultClassNames.weekday,
				),
				week: cn("fui:mt-2 fui:flex fui:w-full", defaultClassNames.week),
				week_number_header: cn(
					"fui:w-(--cell-size) fui:select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"fui:text-[0.8rem] fui:text-muted-foreground fui:select-none",
					defaultClassNames.week_number,
				),
				day: cn(
					"fui:group/day fui:relative fui:aspect-square fui:h-full fui:w-full fui:rounded-(--cell-radius) fui:p-0 fui:text-center fui:select-none fui:[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
					props.showWeekNumber
						? "fui:[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
						: "fui:[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
					defaultClassNames.day,
				),
				range_start: cn(
					"fui:relative fui:isolate fui:z-0 fui:rounded-l-(--cell-radius) fui:bg-muted fui:after:absolute fui:after:inset-y-0 fui:after:right-0 fui:after:w-4 fui:after:bg-muted",
					defaultClassNames.range_start,
				),
				range_middle: cn("fui:rounded-none", defaultClassNames.range_middle),
				range_end: cn(
					"fui:relative fui:isolate fui:z-0 fui:rounded-r-(--cell-radius) fui:bg-muted fui:after:absolute fui:after:inset-y-0 fui:after:left-0 fui:after:w-4 fui:after:bg-muted",
					defaultClassNames.range_end,
				),
				today: cn(
					"fui:rounded-(--cell-radius) fui:bg-muted fui:text-foreground fui:data-[selected=true]:rounded-none",
					defaultClassNames.today,
				),
				outside: cn(
					"fui:text-muted-foreground fui:aria-selected:text-muted-foreground",
					defaultClassNames.outside,
				),
				disabled: cn(
					"fui:text-muted-foreground fui:opacity-50",
					defaultClassNames.disabled,
				),
				hidden: cn("fui:invisible", defaultClassNames.hidden),
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
								className={cn("fui:size-4", className)}
								{...props}
							/>
						);
					}

					if (orientation === "right") {
						return (
							<ChevronRightIcon
								className={cn("fui:size-4", className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon
							className={cn("fui:size-4", className)}
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
							<div className="fui:flex fui:size-(--cell-size) fui:items-center fui:justify-center fui:text-center">
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
				"fui:relative fui:isolate fui:z-10 fui:flex fui:aspect-square fui:size-auto fui:w-full fui:min-w-(--cell-size) fui:flex-col fui:gap-1 fui:border-0 fui:leading-none fui:font-normal fui:group-data-[focused=true]/day:relative fui:group-data-[focused=true]/day:z-10 fui:group-data-[focused=true]/day:border-ring fui:group-data-[focused=true]/day:ring-[3px] fui:group-data-[focused=true]/day:ring-ring/50 fui:data-[range-end=true]:rounded-(--cell-radius) fui:data-[range-end=true]:rounded-r-(--cell-radius) fui:data-[range-end=true]:bg-primary fui:data-[range-end=true]:text-primary-foreground fui:data-[range-middle=true]:rounded-none fui:data-[range-middle=true]:bg-muted fui:data-[range-middle=true]:text-foreground fui:data-[range-start=true]:rounded-(--cell-radius) fui:data-[range-start=true]:rounded-l-(--cell-radius) fui:data-[range-start=true]:bg-primary fui:data-[range-start=true]:text-primary-foreground fui:data-[selected-single=true]:bg-primary fui:data-[selected-single=true]:text-primary-foreground fui:dark:hover:text-foreground fui:[&>span]:text-xs fui:[&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
