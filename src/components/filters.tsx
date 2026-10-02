import {
	CalendarDotsIcon,
	MagnifyingGlassIcon,
	XIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { format, isSameDay } from "date-fns";
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
 * How tall the row's controls are.
 *
 * `default` is 36px, matching `FilterSearch`'s input; `sm` is 32px for a
 * denser bar. Held on the row rather than passed to each control, because the
 * one thing that must not vary is the controls *disagreeing*: a select at
 * 32px beside an input at 36px breaks the shared bottom edge the whole
 * layout rests on.
 */
type FilterSize = "default" | "sm";

const FilterSizeContext = React.createContext<FilterSize>("default");

function useFilterSize(): FilterSize {
	return React.useContext(FilterSizeContext);
}

/** Height utility for a control that is not a Button or a SelectTrigger. */
const filterControlHeight: Record<FilterSize, string> = {
	default: "fui:h-9",
	sm: "fui:h-8",
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
	size = "default",
}: {
	className?: string;
	children: React.ReactNode;
	actions?: React.ReactNode;
	size?: FilterSize;
}) {
	return (
		<FilterSizeContext.Provider value={size}>
			<div
				data-slot="filter-bar"
				data-size={size}
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
		</FilterSizeContext.Provider>
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
	const size = useFilterSize();

	return (
		<FilterField
			label={label}
			htmlFor={id}
			className={cn("fui:w-64", className)}
		>
			{/* InputGroup is 36px by default; the height utility below is a no-op
			    at that size and shrinks it for a compact bar. */}
			<InputGroup className={filterControlHeight[size]}>
				<InputGroupAddon>
					<MagnifyingGlassIcon />
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
	const size = useFilterSize();
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
				<SelectTrigger
					id={id}
					size={size}
					className={cn("fui:w-44", className)}
				>
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
 * Multiple-choice filter: the same control as `FilterSelect`, but each option
 * toggles, and the popup stays open while picking.
 *
 * An empty selection means "no restriction" and shows the placeholder, so the
 * options list needs no "All" entry. The trigger names the first pick and
 * counts the rest ("FancyBrand +2") rather than listing them all, which would
 * widen the control and push its neighbours around as picks are added.
 */
function FilterMultiSelect<T extends string>({
	label,
	value,
	onValueChange,
	options,
	placeholder = "Any",
	className,
}: {
	label: string;
	value: ReadonlyArray<T>;
	onValueChange: (value: T[]) => void;
	options: ReadonlyArray<FilterOption<T>>;
	placeholder?: string;
	className?: string;
}) {
	const id = React.useId();
	const size = useFilterSize();
	const labels = React.useMemo(
		() => new Map(options.map((option) => [option.value, option.label])),
		[options],
	);

	const describe = (selected: ReadonlyArray<T>) => {
		if (selected.length === 0) return placeholder;
		const first = labels.get(selected[0]) ?? selected[0];
		return selected.length === 1 ? first : `${first} +${selected.length - 1}`;
	};

	return (
		<FilterField label={label} htmlFor={id}>
			<Select
				multiple
				value={[...value]}
				onValueChange={(next) => onValueChange(next as T[])}
			>
				<SelectTrigger
					id={id}
					size={size}
					className={cn("fui:w-44", className)}
				>
					<SelectValue>
						{(selected: T[]) => (
							<span
								className={cn(
									"fui:truncate",
									selected.length === 0 && "fui:text-muted-foreground",
								)}
							>
								{describe(selected)}
							</span>
						)}
					</SelectValue>
				</SelectTrigger>
				{/* Opens below rather than over the trigger: the popup stays open
				    while picking, and the trigger's summary should stay in view. */}
				<SelectContent alignItemWithTrigger={false} align="start">
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
 * A period: a start and an end day.
 *
 * Picked as a range, so a period has a start before it has an end: "1–31
 * March" and, while the second click is pending, "from 1 March". A `to` with
 * no `from` is still accepted and described ("Until 31 March"), so a value
 * restored from a URL keeps working, but the calendar itself only produces
 * start-first periods.
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
		// The first click of a range picks one day as both ends.
		if (isSameDay(period.from, period.to)) return formatBound(period.from);
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
 * A range calendar over two months, after the shadcn range picker: the first
 * click sets the start, the second the end, and the days between are shaded so
 * the span reads at a glance. A clear button resets both ends at once.
 *
 * Values are exchanged as `Date`s at the start of each picked day, so `to`
 * is midnight *opening* the last day: compare against `endOfDay(to)` to include
 * it. A caller storing the period in a URL or a query converts at its own
 * boundary, since the format that belongs there is the caller's concern.
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
	const size = useFilterSize();
	const empty = !value?.from && !value?.to;

	return (
		<FilterField label={label} htmlFor={id}>
			<Popover>
				<PopoverTrigger
					render={
						<Button
							id={id}
							type="button"
							variant="outline"
							size={size}
							// `font-normal` and the muted empty state make it read as a
							// field showing a value, not as an action. `border-input`
							// overrides the outline button's `border-current`, which would
							// otherwise follow the text colour and not match the inputs.
							//
							// Active like the search field beside it: a dark border while
							// open or focused, no grey fill and no focus ring. The `!`
							// beats the outline variant's own hover/open fill and the
							// button's focus border, which share these variants and would
							// otherwise win on source order.
							className={cn(
								"fui:w-64 fui:justify-start fui:border-input fui:font-normal fui:dark:bg-input/30",
								"fui:hover:bg-background! fui:aria-expanded:bg-background! fui:dark:hover:bg-input/30! fui:dark:aria-expanded:bg-input/30!",
								"fui:aria-expanded:border-foreground! fui:focus-visible:border-foreground! fui:focus-visible:ring-0!",
								empty && "fui:text-muted-foreground",
								className,
							)}
						>
							{/* Black even while the label is muted, like the other filter icons. */}
							<CalendarDotsIcon className="fui:text-foreground" />
							{describePeriod(value, placeholder)}
						</Button>
					}
				/>
				<PopoverContent align="start" className="fui:w-auto fui:p-0">
					<Calendar
						mode="range"
						numberOfMonths={2}
						// With two months side by side, outside days would show the
						// overlap twice: an end day highlighted in both grids.
						showOutsideDays={false}
						defaultMonth={value?.from ?? value?.to}
						selected={empty ? undefined : { from: value?.from, to: value?.to }}
						onSelect={(range) =>
							onValueChange(
								range?.from || range?.to
									? { from: range.from, to: range.to }
									: undefined,
							)
						}
					/>
					{empty ? null : (
						<div className="fui:flex fui:justify-end fui:border-t fui:px-3 fui:py-2">
							<Button
								type="button"
								variant="ghost"
								size="xs"
								onClick={() => onValueChange(undefined)}
							>
								<XIcon />
								Clear
							</Button>
						</div>
					)}
				</PopoverContent>
			</Popover>
		</FilterField>
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
	const size = useFilterSize();

	return (
		<div
			data-slot="filter-toggle"
			className={cn(
				"fui:flex fui:items-center fui:gap-2",
				filterControlHeight[size],
			)}
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
	const size = useFilterSize();

	if (!active) return null;

	return (
		<Button type="button" variant="ghost" size={size} onClick={onReset}>
			<XIcon />
			{label}
		</Button>
	);
}

export {
	FilterBar,
	FilterDateRange,
	FilterField,
	FilterMultiSelect,
	type FilterOption,
	type FilterPeriod,
	FilterReset,
	FilterSearch,
	FilterSelect,
	type FilterSize,
	FilterToggle,
};
