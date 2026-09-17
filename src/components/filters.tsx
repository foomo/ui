import { cn } from "cn";
import { format } from "date-fns";
import { CalendarIcon, SearchIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Checkbox } from "@/components/checkbox";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/input-group";
import { Label } from "@/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/select";

/**
 * Filter controls for a listing, meant for `DataTable`'s `toolbar` slot.
 *
 * Every control is named by a label above it. A filter's *value* is a poor
 * substitute for its name — a row of dropdowns all reading "Any" says nothing
 * about what any of them narrow — so the label carries the name and the
 * control carries only the value.
 *
 * The controls are uncontrolled as to *when* they apply: each calls back on
 * change, and the caller decides whether that hits a server immediately or is
 * debounced. Text input almost always wants debouncing.
 */

type FilterOption<T extends string = string> = {
	value: T;
	label: string;
};

/**
 * The row of filters.
 *
 * Belongs in `DataTable`'s `toolbar` so the filters share a line with the
 * table's column menu: given a `toolbar`, `DataTable` renders that row whether
 * or not anything else is in it, and a row holding only the column button
 * reads as a stray gap.
 *
 * `flex-1` claims the space beside it, pushing the column menu to the far end.
 * `items-end` puts every control on a shared bottom edge, so a checkbox with
 * no label above it still lines up with the labelled selects.
 */
function FilterBar({
	className,
	children,
	actions,
}: {
	className?: string;
	children: React.ReactNode;
	actions?: React.ReactNode;
}) {
	return (
		<div
			data-slot="filter-bar"
			className={cn(
				"fui:flex fui:flex-1 fui:flex-wrap fui:items-end fui:gap-3",
				className,
			)}
		>
			{children}
			{actions ? (
				<div className="fui:ml-auto fui:flex fui:items-end fui:gap-2">
					{actions}
				</div>
			) : null}
		</div>
	);
}

/** A labelled filter control. The label sits above and is bound to the input. */
function FilterField({
	label,
	htmlFor,
	className,
	children,
}: {
	label: string;
	htmlFor?: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			data-slot="filter-field"
			className={cn("fui:flex fui:flex-col fui:gap-1", className)}
		>
			<Label
				htmlFor={htmlFor}
				className="fui:text-xs fui:font-medium fui:whitespace-nowrap fui:text-muted-foreground"
			>
				{label}
			</Label>
			{children}
		</div>
	);
}

/** Free-text filter, with the same search affordance `DataTable` uses. */
function FilterSearch({
	label = "Search",
	value,
	onValueChange,
	placeholder,
	className,
}: {
	label?: string;
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}) {
	const id = React.useId();

	return (
		<FilterField
			label={label}
			htmlFor={id}
			className={cn("fui:w-64", className)}
		>
			<InputGroup>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupInput
					id={id}
					value={value}
					placeholder={placeholder}
					onChange={(event) => onValueChange(event.target.value)}
				/>
			</InputGroup>
		</FilterField>
	);
}

/**
 * Single-choice filter.
 *
 * Derives base-ui's `items` map from `options`, which is what makes the
 * trigger show the selected option's *label*. Without it `Select.Value`
 * renders the raw value, so an enum filter reads "multibuy" rather than
 * "Multibuy".
 */
function FilterSelect<T extends string>({
	label,
	value,
	onValueChange,
	options,
	placeholder = "Any",
	className,
}: {
	label: string;
	value: T;
	onValueChange: (value: T) => void;
	options: ReadonlyArray<FilterOption<T>>;
	placeholder?: string;
	className?: string;
}) {
	const id = React.useId();
	const items = React.useMemo(
		() =>
			Object.fromEntries(options.map((option) => [option.value, option.label])),
		[options],
	);

	return (
		<FilterField label={label} htmlFor={id}>
			<Select
				items={items}
				value={value}
				onValueChange={(next) => onValueChange(next as T)}
			>
				<SelectTrigger id={id} size="sm" className={cn("fui:w-44", className)}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</FilterField>
	);
}

/**
 * A period, with either bound optional.
 *
 * Both ends are independent: "since 1 March", "up to 31 March" and "1–31
 * March" are all expressible, and so is neither.
 */
type FilterPeriod = {
	from?: Date;
	to?: Date;
};

function formatBound(date: Date) {
	return format(date, "d MMM yyyy");
}

function describePeriod(period: FilterPeriod | undefined, placeholder: string) {
	if (period?.from && period.to) {
		return `${formatBound(period.from)} – ${formatBound(period.to)}`;
	}
	if (period?.from) return `From ${formatBound(period.from)}`;
	if (period?.to) return `Until ${formatBound(period.to)}`;
	return placeholder;
}

/**
 * Period filter: one control for a span, in place of a "from" box and a "to"
 * box.
 *
 * Two calendars in single-date mode rather than one in range mode, because a
 * range calendar can only be drawn start-then-end: it cannot express "up to
 * this date" with no start, and it forces a start-only pick to collapse into a
 * single day. Here each bound is set and cleared on its own.
 *
 * Each calendar disables the days that would invert the period, so an
 * unusable span cannot be selected in the first place.
 *
 * Values are exchanged as `Date`s. A caller storing the period in a URL or a
 * query converts at its own boundary, since the format that belongs there is
 * the caller's concern.
 */
function FilterDateRange({
	label,
	value,
	onValueChange,
	placeholder = "Any time",
	className,
}: {
	label: string;
	value: FilterPeriod | undefined;
	onValueChange: (period: FilterPeriod | undefined) => void;
	placeholder?: string;
	className?: string;
}) {
	const id = React.useId();

	const update = (next: FilterPeriod) =>
		onValueChange(next.from || next.to ? next : undefined);

	return (
		<FilterField label={label} htmlFor={id}>
			<Popover>
				<PopoverTrigger
					render={
						<Button
							id={id}
							type="button"
							variant="outline"
							size="sm"
							// `font-normal` and the muted empty state make it read as a
							// field showing a value, not as an action.
							className={cn(
								"fui:w-64 fui:justify-start fui:font-normal",
								!value?.from && !value?.to && "fui:text-muted-foreground",
								className,
							)}
						>
							<CalendarIcon />
							{describePeriod(value, placeholder)}
						</Button>
					}
				/>
				<PopoverContent align="start" className="fui:w-auto fui:p-0">
					<div className="fui:flex fui:flex-col fui:divide-y fui:sm:flex-row fui:sm:divide-x fui:sm:divide-y-0">
						<PeriodBound
							title="From"
							selected={value?.from}
							defaultMonth={value?.from ?? value?.to}
							disabled={value?.to ? { after: value.to } : undefined}
							onSelect={(from) => update({ from, to: value?.to })}
						/>
						<PeriodBound
							title="To"
							selected={value?.to}
							defaultMonth={value?.to ?? value?.from}
							disabled={value?.from ? { before: value.from } : undefined}
							onSelect={(to) => update({ from: value?.from, to })}
						/>
					</div>
				</PopoverContent>
			</Popover>
		</FilterField>
	);
}

function PeriodBound({
	title,
	selected,
	defaultMonth,
	disabled,
	onSelect,
}: {
	title: string;
	selected: Date | undefined;
	defaultMonth: Date | undefined;
	disabled: React.ComponentProps<typeof Calendar>["disabled"];
	onSelect: (date: Date | undefined) => void;
}) {
	return (
		<div className="fui:flex fui:flex-col">
			<div className="fui:flex fui:items-center fui:justify-between fui:gap-2 fui:px-3 fui:pt-3">
				<span className="fui:text-xs fui:font-medium fui:text-muted-foreground">
					{title}
				</span>
				{selected ? (
					<Button
						type="button"
						variant="ghost"
						size="xs"
						onClick={() => onSelect(undefined)}
					>
						<XIcon />
						Clear
					</Button>
				) : null}
			</div>
			<Calendar
				mode="single"
				selected={selected}
				defaultMonth={defaultMonth}
				disabled={disabled}
				onSelect={onSelect}
			/>
		</div>
	);
}

/**
 * Boolean filter.
 *
 * Its caption follows the box rather than sitting above it: a checkbox reads
 * as "[x] Active only", and a label overhead would detach the words from the
 * control they toggle. The height matches the controls beside it so the shared
 * bottom edge still holds.
 */
function FilterToggle({
	label,
	checked,
	onCheckedChange,
}: {
	label: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}) {
	const id = React.useId();

	return (
		<div
			data-slot="filter-toggle"
			className="fui:flex fui:h-8 fui:items-center fui:gap-2"
		>
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={(next) => onCheckedChange(!!next)}
			/>
			<Label
				htmlFor={id}
				className="fui:text-sm fui:font-normal fui:whitespace-nowrap"
			>
				{label}
			</Label>
		</div>
	);
}

/**
 * Clears every filter at once.
 *
 * Rendered only when something is actually filtered: where filters apply on
 * change it is easy to narrow a result and have no obvious way back, while a
 * permanently visible "Clear" is another dead control in the row.
 */
function FilterReset({
	active,
	onReset,
	label = "Clear filters",
}: {
	active: boolean;
	onReset: () => void;
	label?: string;
}) {
	if (!active) return null;

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={onReset}
			className="fui:h-8"
		>
			<XIcon />
			{label}
		</Button>
	);
}

export {
	FilterBar,
	FilterDateRange,
	FilterField,
	type FilterOption,
	type FilterPeriod,
	FilterReset,
	FilterSearch,
	FilterSelect,
	FilterToggle,
};
