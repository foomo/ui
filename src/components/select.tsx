import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CaretDownIcon, CaretUpIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("fui:scroll-my-1 fui:p-1", className)}
			{...props}
		/>
	);
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn("fui:flex fui:flex-1 fui:text-left", className)}
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: SelectPrimitive.Trigger.Props & {
	size?: "sm" | "default";
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"fui:flex fui:w-fit fui:items-center fui:justify-between fui:gap-1.5 fui:rounded-4xl fui:border fui:border-input fui:bg-background fui:dark:bg-input/30 fui:px-3 fui:py-2 fui:text-sm fui:whitespace-nowrap fui:transition-colors fui:outline-none fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:disabled:cursor-not-allowed fui:disabled:opacity-50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:data-placeholder:text-muted-foreground fui:data-[size=default]:h-9 fui:data-[size=sm]:h-8 fui:*:data-[slot=select-value]:line-clamp-1 fui:*:data-[slot=select-value]:flex fui:*:data-[slot=select-value]:items-center fui:*:data-[slot=select-value]:gap-1.5 fui:dark:hover:bg-input/50 fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				render={
					<CaretDownIcon className="fui:pointer-events-none fui:size-4 fui:text-muted-foreground" />
				}
			/>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	side = "bottom",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	alignItemWithTrigger = true,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
	>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				alignItemWithTrigger={alignItemWithTrigger}
				className="fui:isolate fui:z-50"
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					data-align-trigger={alignItemWithTrigger}
					className={cn(
						"fui: fui: fui:relative fui:isolate fui:z-50 fui:max-h-(--available-height) fui:w-(--anchor-width) fui:min-w-36 fui:origin-(--transform-origin) fui:overflow-x-hidden fui:overflow-y-auto fui:rounded-2xl fui:bg-popover fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:data-[align-trigger=true]:animate-none fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
						className,
					)}
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List>{children}</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn(
				"fui:px-3 fui:py-2.5 fui:text-xs fui:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"fui:relative fui:flex fui:w-full fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:py-2 fui:pr-8 fui:pl-3 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:not-data-[variant=destructive]:focus:**:text-accent-foreground fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4 fui:*:[span]:last:flex fui:*:[span]:last:items-center fui:*:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText className="fui:flex fui:flex-1 fui:shrink-0 fui:gap-2 fui:whitespace-nowrap">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator
				render={
					<span className="fui:pointer-events-none fui:absolute fui:right-2 fui:flex fui:size-4 fui:items-center fui:justify-center" />
				}
			>
				<CheckIcon className="fui:pointer-events-none" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn(
				"fui:pointer-events-none fui:-mx-1 fui:my-1 fui:h-px fui:bg-border/50",
				className,
			)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={cn(
				"fui:top-0 fui:z-10 fui:flex fui:w-full fui:cursor-default fui:items-center fui:justify-center fui:bg-popover fui:py-1 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<CaretUpIcon />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={cn(
				"fui:bottom-0 fui:z-10 fui:flex fui:w-full fui:cursor-default fui:items-center fui:justify-center fui:bg-popover fui:py-1 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<CaretDownIcon />
		</SelectPrimitive.ScrollDownArrow>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
