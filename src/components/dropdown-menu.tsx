import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
	return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
	return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
	align = "start",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 4,
	className,
	...props
}: MenuPrimitive.Popup.Props &
	Pick<
		MenuPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				className="fui:isolate fui:z-50 fui:outline-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(
						"fui: fui: fui:z-50 fui:max-h-(--available-height) fui:w-(--anchor-width) fui:min-w-48 fui:origin-(--transform-origin) fui:overflow-x-hidden fui:overflow-y-auto fui:rounded-2xl fui:bg-popover fui:p-1 fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:outline-none fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=inline-end]:slide-in-from-left-2 fui:data-[side=inline-start]:slide-in-from-right-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:dark:ring-foreground/10 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:overflow-hidden fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
	className,
	inset,
	...props
}: MenuPrimitive.GroupLabel.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={cn(
				"fui:px-3 fui:py-2.5 fui:text-xs fui:text-muted-foreground fui:data-inset:pl-9.5",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"fui:group/dropdown-menu-item fui:relative fui:flex fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:px-3 fui:py-2 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:not-data-[variant=destructive]:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-[variant=destructive]:text-destructive fui:data-[variant=destructive]:focus:bg-destructive/10 fui:data-[variant=destructive]:focus:text-destructive fui:dark:data-[variant=destructive]:focus:bg-destructive/20 fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4 fui:data-[variant=destructive]:*:[svg]:text-destructive",
				className,
			)}
			{...props}
		/>
	);
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"fui:flex fui:cursor-default fui:items-center fui:gap-2 fui:rounded-xl fui:px-3 fui:py-2 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:not-data-[variant=destructive]:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-popup-open:bg-accent fui:data-popup-open:text-accent-foreground fui:data-open:bg-accent fui:data-open:text-accent-foreground fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="fui:ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}

function DropdownMenuSubContent({
	align = "start",
	alignOffset = -3,
	side = "right",
	sideOffset = 0,
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
	return (
		<DropdownMenuContent
			data-slot="dropdown-menu-sub-content"
			className={cn(
				"fui: fui: fui:w-auto fui:min-w-36 fui:rounded-2xl fui:bg-popover fui:p-1 fui:text-popover-foreground fui:shadow-2xl fui:ring-1 fui:ring-foreground/5 fui:duration-100 fui:data-[side=bottom]:slide-in-from-top-2 fui:data-[side=left]:slide-in-from-right-2 fui:data-[side=right]:slide-in-from-left-2 fui:data-[side=top]:slide-in-from-bottom-2 fui:data-open:animate-in fui:data-open:fade-in-0 fui:data-open:zoom-in-95 fui:data-closed:animate-out fui:data-closed:fade-out-0 fui:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
				className,
			)}
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	inset,
	...props
}: MenuPrimitive.CheckboxItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			data-inset={inset}
			className={cn(
				"fui:relative fui:flex fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:py-2 fui:pr-8 fui:pl-3 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span
				className="fui:pointer-events-none fui:absolute fui:right-2 fui:flex fui:items-center fui:justify-center"
				data-slot="dropdown-menu-checkbox-item-indicator"
			>
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
	return (
		<MenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

function DropdownMenuRadioItem({
	className,
	children,
	inset,
	...props
}: MenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-inset={inset}
			className={cn(
				"fui:relative fui:flex fui:cursor-default fui:items-center fui:gap-2.5 fui:rounded-xl fui:py-2 fui:pr-8 fui:pl-3 fui:text-sm fui:outline-hidden fui:select-none fui:focus:bg-accent fui:focus:text-accent-foreground fui:focus:**:text-accent-foreground fui:data-inset:pl-9.5 fui:data-disabled:pointer-events-none fui:data-disabled:opacity-50 fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4",
				className,
			)}
			{...props}
		>
			<span
				className="fui:pointer-events-none fui:absolute fui:right-2 fui:flex fui:items-center fui:justify-center"
				data-slot="dropdown-menu-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("fui:-mx-1 fui:my-1 fui:h-px fui:bg-border/50", className)}
			{...props}
		/>
	);
}

function DropdownMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn(
				"fui:ml-auto fui:text-xs fui:tracking-widest fui:text-muted-foreground fui:group-focus/dropdown-menu-item:text-accent-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
};
