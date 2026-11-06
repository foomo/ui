import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "../components/calendar";
import { DatePicker, DateRangePicker } from "../components/date-picker";
import { Field, FieldDescription, FieldLabel } from "../components/field";

// Fixed dates, so the story looks the same whichever day it is opened.
const today = new Date(2026, 9, 5);
const pickedDay = new Date(2026, 9, 14);
const pickedRange: DateRange = {
	from: new Date(2026, 9, 8),
	to: new Date(2026, 9, 21),
};
const weekendsAndPast = [{ dayOfWeek: [0, 6] }, { before: today }];

/**
 * The bare `Calendar` in its three everyday modes, then the two pickers that
 * wrap it in a popover, empty and with a value.
 */
function DatePickerGallery({ size = "default" }: { size?: "default" | "sm" }) {
	const [day, setDay] = React.useState<Date | undefined>(pickedDay);
	const [range, setRange] = React.useState<DateRange | undefined>(pickedRange);
	const [workday, setWorkday] = React.useState<Date | undefined>();

	return (
		<div className="fui:flex fui:flex-col fui:gap-10">
			<Section
				title="Calendar"
				description="The grid on its own, for a page that shows dates inline."
			>
				<CalendarCase name="Single date">
					<Calendar
						mode="single"
						today={today}
						defaultMonth={today}
						selected={day}
						onSelect={setDay}
					/>
				</CalendarCase>
				<CalendarCase name="Range">
					<Calendar
						mode="range"
						today={today}
						defaultMonth={today}
						selected={range}
						onSelect={setRange}
						showOutsideDays={false}
					/>
				</CalendarCase>
				<CalendarCase name="Disabled days (weekends and past)">
					<Calendar
						mode="single"
						today={today}
						defaultMonth={today}
						selected={workday}
						onSelect={setWorkday}
						disabled={weekendsAndPast}
					/>
				</CalendarCase>
			</Section>

			<Section
				title="Pickers"
				description="The calendar in a popover, behind a field-sized trigger. A range shows two months."
			>
				<div className="fui:grid fui:w-full fui:max-w-2xl fui:gap-6 fui:sm:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="date-empty">Date</FieldLabel>
						<DatePicker id="date-empty" size={size} className="fui:w-full" />
					</Field>
					<Field>
						<FieldLabel htmlFor="date-filled">Date, picked</FieldLabel>
						<DatePicker
							id="date-filled"
							size={size}
							className="fui:w-full"
							defaultValue={pickedDay}
							calendar={{ today }}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="range-empty">Date range</FieldLabel>
						<DateRangePicker
							id="range-empty"
							size={size}
							className="fui:w-full"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="range-filled">Date range, picked</FieldLabel>
						<DateRangePicker
							id="range-filled"
							size={size}
							className="fui:w-full"
							defaultValue={pickedRange}
							calendar={{ today }}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="date-workday">Delivery date</FieldLabel>
						<DatePicker
							id="date-workday"
							size={size}
							className="fui:w-full"
							placeholder="Pick a workday"
							calendar={{
								today,
								defaultMonth: today,
								disabled: weekendsAndPast,
							}}
						/>
						<FieldDescription>
							Weekends and past days are disabled.
						</FieldDescription>
					</Field>
					<Field>
						<FieldLabel htmlFor="date-disabled">Date, disabled</FieldLabel>
						<DatePicker
							id="date-disabled"
							size={size}
							className="fui:w-full"
							defaultValue={pickedDay}
							disabled
						/>
					</Field>
				</div>
			</Section>
		</div>
	);
}

function Section({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<section className="fui:flex fui:flex-col fui:gap-4">
			<div className="fui:flex fui:flex-col fui:gap-1">
				<h3 className="fui:text-sm fui:font-medium">{title}</h3>
				<p className="fui:text-sm fui:text-muted-foreground">{description}</p>
			</div>
			<div className="fui:flex fui:flex-wrap fui:gap-6">{children}</div>
		</section>
	);
}

function CalendarCase({
	name,
	children,
}: {
	name: string;
	children: React.ReactNode;
}) {
	return (
		<div className="fui:flex fui:flex-col fui:gap-2">
			<span className="fui:text-xs fui:font-medium fui:text-muted-foreground">
				{name}
			</span>
			<div className="fui:rounded-2xl fui:border fui:border-border">
				{children}
			</div>
		</div>
	);
}

const meta = {
	title: "Forms/Date Pickers",
	component: DatePickerGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"`Calendar` is the bare grid. `DatePicker` and `DateRangePicker` put it in a popover behind a field-sized trigger: the single picker closes once a day is picked, the range picker shows two months, hides the days that spill over from the next month, and stays open until it is dismissed. Anything the calendar accepts, such as `disabled` days, passes through the pickers' `calendar` prop.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["default", "sm"],
		},
	},
	args: {
		size: "default",
	},
} satisfies Meta<typeof DatePickerGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
