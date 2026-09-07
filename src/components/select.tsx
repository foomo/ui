import { cn } from "cn";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import type * as React from "react";

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("lib:scroll-my-1 lib:p-1", className)}
			{...props}
		/>
	);
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: "sm" | "default";
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"lib:flex lib:w-fit lib:items-center lib:justify-between lib:gap-1.5 lib:rounded-4xl lib:border lib:border-input lib:bg-input/30 lib:px-3 lib:py-2 lib:text-sm lib:whitespace-nowrap lib:transition-colors lib:outline-none lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:disabled:cursor-not-allowed lib:disabled:opacity-50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-[3px] lib:aria-invalid:ring-destructive/20 lib:data-placeholder:text-muted-foreground lib:data-[size=default]:h-9 lib:data-[size=sm]:h-8 lib:*:data-[slot=select-value]:line-clamp-1 lib:*:data-[slot=select-value]:flex lib:*:data-[slot=select-value]:items-center lib:*:data-[slot=select-value]:gap-1.5 lib:dark:hover:bg-input/50 lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="lib:pointer-events-none lib:size-4 lib:text-muted-foreground" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = "item-aligned",
	align = "center",
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				data-align-trigger={position === "item-aligned"}
				className={cn(
					"lib:relative lib:z-50 lib:max-h-(--radix-select-content-available-height) lib:min-w-36 lib:origin-(--radix-select-content-transform-origin) lib:overflow-x-hidden lib:overflow-y-auto lib:rounded-2xl lib:bg-popover lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:duration-100 lib:data-[align-trigger=true]:animate-none lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95 lib:animate-none! lib:relative lib:bg-popover/70 lib:before:pointer-events-none lib:before:absolute lib:before:inset-0 lib:before:-z-1 lib:before:rounded-[inherit] lib:before:backdrop-blur-2xl lib:before:backdrop-saturate-150 lib:**:data-[slot$=-item]:focus:bg-foreground/10 lib:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 lib:**:data-[slot$=-separator]:bg-foreground/5 lib:**:data-[slot$=-trigger]:focus:bg-foreground/10 lib:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! lib:**:data-[variant=destructive]:focus:bg-foreground/10! lib:**:data-[variant=destructive]:text-accent-foreground! lib:**:data-[variant=destructive]:**:text-accent-foreground!",
					position === "popper" &&
						"lib:data-[side=bottom]:translate-y-1 lib:data-[side=left]:-translate-x-1 lib:data-[side=right]:translate-x-1 lib:data-[side=top]:-translate-y-1",
					className,
				)}
				position={position}
				align={align}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					data-position={position}
					className={cn(
						"lib:data-[position=popper]:h-(--radix-select-trigger-height) lib:data-[position=popper]:w-full lib:data-[position=popper]:min-w-(--radix-select-trigger-width)",
						position === "popper" && "lib:",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn(
				"lib:px-3 lib:py-2.5 lib:text-xs lib:text-muted-foreground",
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
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"lib:relative lib:flex lib:w-full lib:cursor-default lib:items-center lib:gap-2.5 lib:rounded-xl lib:py-2 lib:pr-8 lib:pl-3 lib:text-sm lib:outline-hidden lib:select-none lib:focus:bg-accent lib:focus:text-accent-foreground lib:not-data-[variant=destructive]:focus:**:text-accent-foreground lib:data-disabled:pointer-events-none lib:data-disabled:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4 lib:*:[span]:last:flex lib:*:[span]:last:items-center lib:*:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<span className="lib:pointer-events-none lib:absolute lib:right-2 lib:flex lib:size-4 lib:items-center lib:justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="lib:pointer-events-none" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn(
				"lib:pointer-events-none lib:-mx-1 lib:my-1 lib:h-px lib:bg-border/50",
				className,
			)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				"lib:z-10 lib:flex lib:cursor-default lib:items-center lib:justify-center lib:bg-popover lib:py-1 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				"lib:z-10 lib:flex lib:cursor-default lib:items-center lib:justify-center lib:bg-popover lib:py-1 lib:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon />
		</SelectPrimitive.ScrollDownButton>
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
