import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "cn";

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/input-group";

const Autocomplete = AutocompletePrimitive.Root;
const useAutocompleteFilter = AutocompletePrimitive.useFilter;

function AutocompleteValue(props: AutocompletePrimitive.Value.Props) {
	return <AutocompletePrimitive.Value {...props} />;
}

function AutocompleteTrigger({
	className,
	children,
	...props
}: AutocompletePrimitive.Trigger.Props) {
	return (
		<AutocompletePrimitive.Trigger
			data-slot="autocomplete-trigger"
			className={cn("fui:[&_svg:not([class*=size-])]:size-4", className)}
			{...props}
		>
			{children}
			<CaretDownIcon className="fui:pointer-events-none fui:size-4 fui:text-muted-foreground" />
		</AutocompletePrimitive.Trigger>
	);
}

function AutocompleteClear({
	className,
	...props
}: AutocompletePrimitive.Clear.Props) {
	return (
		<AutocompletePrimitive.Clear
			data-slot="autocomplete-clear"
			render={<InputGroupButton variant="ghost" size="icon-xs" />}
			className={cn(className)}
			{...props}
		>
			<XIcon className="fui:pointer-events-none" />
		</AutocompletePrimitive.Clear>
	);
}

function AutocompleteInput({
	className,
	children,
	disabled = false,
	size = "default",
	showTrigger = true,
	showClear = false,
	...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> & {
	size?: "sm" | "default";
	showTrigger?: boolean;
	showClear?: boolean;
}) {
	return (
		<InputGroup
			data-slot="autocomplete-input-group"
			data-size={size}
			className={cn("fui:w-auto fui:data-[size=sm]:h-8", className)}
		>
			<AutocompletePrimitive.Input
				data-slot="autocomplete-input"
				disabled={disabled}
				render={<InputGroupInput />}
				{...props}
			/>
			<InputGroupAddon align="inline-end">
				{showTrigger && (
					<AutocompleteTrigger
						render={<InputGroupButton size="icon-xs" variant="ghost" />}
						className="fui:group-has-data-[slot=autocomplete-clear]/input-group:hidden fui:data-pressed:bg-transparent"
						disabled={disabled}
					/>
				)}
				{showClear && <AutocompleteClear disabled={disabled} />}
			</InputGroupAddon>
			{children}
		</InputGroup>
	);
}

function AutocompleteContent({
	className,
	side = "bottom",
	sideOffset = 4,
	align = "start",
	alignOffset = 0,
	anchor,
	...props
}: AutocompletePrimitive.Popup.Props &
	Pick<
		AutocompletePrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset" | "anchor"
	>) {
	return (
		<AutocompletePrimitive.Portal>
			<AutocompletePrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				anchor={anchor}
				className="fui:isolate fui:z-50"
			>
				<AutocompletePrimitive.Popup
					data-slot="autocomplete-content"
					className={cn(
						"fui:group/autocomplete-content fui:relative fui:isolate fui:z-50 fui:max-h-(--available-height) fui:w-(--anchor-width) fui:max-w-(--available-width) fui:min-w-36 fui:origin-(--transform-origin) fui:overflow-hidden fui:rounded-2xl fui:bg-popover fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95",
						className,
					)}
					{...props}
				/>
			</AutocompletePrimitive.Positioner>
		</AutocompletePrimitive.Portal>
	);
}

function AutocompleteList({
	className,
	...props
}: AutocompletePrimitive.List.Props) {
	return (
		<AutocompletePrimitive.List
			data-slot="autocomplete-list"
			className={cn(
				"fui:max-h-[min(--spacing(72),var(--available-height))] fui:scroll-py-1 fui:overflow-y-auto fui:overscroll-contain fui:p-1 fui:data-empty:p-0",
				className,
			)}
			{...props}
		/>
	);
}

function AutocompleteItem({
	className,
	...props
}: AutocompletePrimitive.Item.Props) {
	return (
		<AutocompletePrimitive.Item
			data-slot="autocomplete-item"
			className={cn(
				"fui:relative fui:flex fui:w-full fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:px-3 fui:py-2 fui:text-sm fui:outline-hidden fui:select-none fui:data-highlighted:bg-accent fui:data-highlighted:text-accent-foreground fui:data-highlighted:**:text-accent-foreground fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function AutocompleteGroup({
	className,
	...props
}: AutocompletePrimitive.Group.Props) {
	return (
		<AutocompletePrimitive.Group
			data-slot="autocomplete-group"
			className={cn("fui:scroll-my-1", className)}
			{...props}
		/>
	);
}

function AutocompleteLabel({
	className,
	...props
}: AutocompletePrimitive.GroupLabel.Props) {
	return (
		<AutocompletePrimitive.GroupLabel
			data-slot="autocomplete-label"
			className={cn(
				"fui:px-3 fui:py-2.5 fui:text-xs fui:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function AutocompleteCollection(props: AutocompletePrimitive.Collection.Props) {
	return <AutocompletePrimitive.Collection {...props} />;
}

// Base UI keeps Empty and Status mounted as live regions and only swaps
// their children, so padding is applied to the content rather than hiding
// the element itself.
function AutocompleteEmpty({
	className,
	...props
}: AutocompletePrimitive.Empty.Props) {
	return (
		<AutocompletePrimitive.Empty
			data-slot="autocomplete-empty"
			className={cn(
				"fui:w-full fui:text-center fui:text-sm fui:text-muted-foreground fui:not-empty:py-2",
				className,
			)}
			{...props}
		/>
	);
}

function AutocompleteStatus({
	className,
	...props
}: AutocompletePrimitive.Status.Props) {
	return (
		<AutocompletePrimitive.Status
			data-slot="autocomplete-status"
			className={cn(
				"fui:px-3 fui:text-sm fui:text-muted-foreground fui:not-empty:py-2",
				className,
			)}
			{...props}
		/>
	);
}

function AutocompleteSeparator({
	className,
	...props
}: AutocompletePrimitive.Separator.Props) {
	return (
		<AutocompletePrimitive.Separator
			data-slot="autocomplete-separator"
			className={cn(
				"fui:pointer-events-none fui:-mx-1 fui:my-1 fui:h-px fui:bg-border/50",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Autocomplete,
	AutocompleteClear,
	AutocompleteCollection,
	AutocompleteContent,
	AutocompleteEmpty,
	AutocompleteGroup,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteLabel,
	AutocompleteList,
	AutocompleteSeparator,
	AutocompleteStatus,
	AutocompleteTrigger,
	AutocompleteValue,
	useAutocompleteFilter,
};
