import type { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import { format as formatDate, type Locale } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";

type CalendarProps = React.ComponentProps<typeof Calendar>;

type DatePickerTriggerProps = Omit<
	PopoverPrimitive.Trigger.Props,
	"value" | "defaultValue" | "children"
> & {
	size?: "sm" | "default";
	/** Marks the trigger as showing its placeholder. */
	empty?: boolean;
	children?: React.ReactNode;
};

function DatePickerTrigger({
	className,
	size = "default",
	empty = false,
	children,
	...props
}: DatePickerTriggerProps) {
	return (
		<PopoverTrigger
			data-slot="date-picker-trigger"
			data-size={size}
			data-empty={empty}
			className={cn(
				"fui:flex fui:w-fit fui:items-center fui:justify-between fui:gap-1.5 fui:rounded-4xl fui:border fui:border-input fui:bg-background fui:dark:bg-input/30 fui:px-3 fui:py-2 fui:text-sm fui:whitespace-nowrap fui:transition-colors fui:outline-none fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:disabled:cursor-not-allowed fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:data-[empty=true]:text-muted-foreground fui:data-[size=default]:h-9 fui:data-[size=sm]:h-8 fui:dark:hover:bg-input/50 fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<span
				data-slot="date-picker-value"
				className="fui:flex fui:flex-1 fui:items-center fui:gap-1.5 fui:truncate fui:text-left"
			>
				{children}
			</span>
			<CaretDownIcon className="fui:pointer-events-none fui:size-4 fui:text-muted-foreground" />
		</PopoverTrigger>
	);
}

type DateFormat = string | ((date: Date) => string);

function applyFormat(date: Date, format: DateFormat, locale?: Locale) {
	return typeof format === "function"
		? format(date)
		: formatDate(date, format, { locale });
}

function useControllable<T>(
	props: { value?: T; defaultValue?: T },
	onChange?: (value: T) => void,
) {
	const [inner, setInner] = React.useState(props.defaultValue);
	const controlled = "value" in props;
	const current = controlled ? props.value : inner;
	const set = React.useCallback(
		(next: T) => {
			if (!controlled) setInner(next);
			onChange?.(next);
		},
		[controlled, onChange],
	);
	return [current, set] as const;
}

type DatePickerBaseProps = Omit<DatePickerTriggerProps, "empty"> & {
	placeholder?: React.ReactNode;
	locale?: Locale;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	align?: React.ComponentProps<typeof PopoverContent>["align"];
	side?: React.ComponentProps<typeof PopoverContent>["side"];
	contentClassName?: string;
};

type DatePickerProps = DatePickerBaseProps & {
	value?: Date;
	defaultValue?: Date;
	onValueChange?: (date: Date | undefined) => void;
	/** A date-fns format string or a custom formatter. Defaults to `PPP`. */
	format?: DateFormat;
	/** Whether the popover closes once a day is picked. */
	closeOnSelect?: boolean;
	calendar?: Omit<
		Extract<CalendarProps, { mode?: "single" }>,
		"mode" | "selected" | "onSelect" | "locale" | "required"
	>;
};

function DatePicker(props: DatePickerProps) {
	const {
		value: _value,
		defaultValue: _defaultValue,
		onValueChange,
		format = "PPP",
		placeholder = "Pick a date",
		locale,
		open: _open,
		defaultOpen,
		onOpenChange,
		align = "start",
		side,
		contentClassName,
		closeOnSelect = true,
		calendar,
		...trigger
	} = props;

	const [date, setDate] = useControllable<Date | undefined>(
		props,
		onValueChange,
	);
	const [open, setOpen] = useControllable<boolean>(
		{
			...("open" in props ? { value: _open } : {}),
			defaultValue: defaultOpen ?? false,
		},
		onOpenChange,
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<DatePickerTrigger empty={!date} {...trigger}>
				{date ? applyFormat(date, format, locale) : placeholder}
			</DatePickerTrigger>
			<PopoverContent
				align={align}
				side={side}
				className={cn(
					"fui:w-auto fui:overflow-hidden fui:p-0",
					contentClassName,
				)}
			>
				<Calendar
					defaultMonth={date}
					{...calendar}
					mode="single"
					locale={locale}
					selected={date}
					onSelect={(next) => {
						setDate(next);
						if (closeOnSelect && next) setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}

type DateRangePickerProps = DatePickerBaseProps & {
	value?: DateRange;
	defaultValue?: DateRange;
	onValueChange?: (range: DateRange | undefined) => void;
	/** A date-fns format string or a custom formatter. Defaults to `LLL dd, y`. */
	format?: DateFormat;
	/** Whether the popover closes once both ends are picked. */
	closeOnSelect?: boolean;
	calendar?: Omit<
		Extract<CalendarProps, { mode?: "range" }>,
		"mode" | "selected" | "onSelect" | "locale" | "required"
	>;
};

function DateRangePicker(props: DateRangePickerProps) {
	const {
		value: _value,
		defaultValue: _defaultValue,
		onValueChange,
		format = "LLL dd, y",
		placeholder = "Pick a date range",
		locale,
		open: _open,
		defaultOpen,
		onOpenChange,
		align = "start",
		side,
		contentClassName,
		closeOnSelect = false,
		calendar,
		...trigger
	} = props;

	const [range, setRange] = useControllable<DateRange | undefined>(
		props,
		onValueChange,
	);
	const [open, setOpen] = useControllable<boolean>(
		{
			...("open" in props ? { value: _open } : {}),
			defaultValue: defaultOpen ?? false,
		},
		onOpenChange,
	);

	const label = range?.from
		? range.to
			? `${applyFormat(range.from, format, locale)} – ${applyFormat(range.to, format, locale)}`
			: applyFormat(range.from, format, locale)
		: placeholder;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<DatePickerTrigger empty={!range?.from} {...trigger}>
				{label}
			</DatePickerTrigger>
			<PopoverContent
				align={align}
				side={side}
				className={cn(
					"fui:w-auto fui:overflow-hidden fui:p-0",
					contentClassName,
				)}
			>
				<Calendar
					defaultMonth={range?.from}
					numberOfMonths={2}
					{...calendar}
					mode="range"
					locale={locale}
					selected={range}
					onSelect={(next) => {
						setRange(next);
						if (closeOnSelect && next?.from && next.to) setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}

export {
	DatePicker,
	DatePickerTrigger,
	DateRangePicker,
	type DatePickerProps,
	type DateRangePickerProps,
};
