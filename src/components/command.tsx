import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";
import { CheckIcon, SearchIcon } from "lucide-react";
import type * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/dialog";
import { InputGroup, InputGroupAddon } from "@/components/input-group";

function Command({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive>) {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn(
				"fui:flex fui:size-full fui:flex-col fui:overflow-hidden fui:rounded-4xl fui:bg-popover fui:p-1 fui:text-popover-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	className,
	showCloseButton = false,
	...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
	title?: string;
	description?: string;
	className?: string;
	showCloseButton?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<Dialog {...props}>
			<DialogHeader className="fui:sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn(
					"fui:top-1/3 fui:translate-y-0 fui:overflow-hidden fui:rounded-4xl! fui:p-0",
					className,
				)}
				showCloseButton={showCloseButton}
			>
				{children}
			</DialogContent>
		</Dialog>
	);
}

function CommandInput({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
	return (
		<div data-slot="command-input-wrapper" className="fui:p-1 fui:pb-0">
			<InputGroup className="fui:h-9 fui:bg-input/30">
				<CommandPrimitive.Input
					data-slot="command-input"
					className={cn(
						"fui:w-full fui:text-sm fui:outline-hidden fui:disabled:cursor-not-allowed fui:disabled:opacity-50",
						className,
					)}
					{...props}
				/>
				<InputGroupAddon>
					<SearchIcon className="fui:size-4 fui:shrink-0 fui:opacity-50" />
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}

function CommandList({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={cn(
				"fui:no-scrollbar fui:max-h-72 fui:scroll-py-1 fui:overflow-x-hidden fui:overflow-y-auto fui:outline-none",
				className,
			)}
			{...props}
		/>
	);
}

function CommandEmpty({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={cn("fui:py-6 fui:text-center fui:text-sm", className)}
			{...props}
		/>
	);
}

function CommandGroup({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"fui:overflow-hidden fui:p-1 fui:text-foreground fui:**:[[cmdk-group-heading]]:px-3 fui:**:[[cmdk-group-heading]]:py-2 fui:**:[[cmdk-group-heading]]:text-xs fui:**:[[cmdk-group-heading]]:font-medium fui:**:[[cmdk-group-heading]]:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CommandSeparator({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn("fui:my-1 fui:h-px fui:bg-border/50", className)}
			{...props}
		/>
	);
}

function CommandItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"fui:group/command-item fui:relative fui:flex fui:cursor-default fui:items-center fui:gap-2 fui:rounded-lg fui:px-3 fui:py-2 fui:text-sm fui:outline-hidden fui:select-none fui:in-data-[slot=dialog-content]:rounded-2xl fui:data-[disabled=true]:pointer-events-none fui:data-[disabled=true]:opacity-50 fui:data-selected:bg-muted fui:data-selected:text-foreground fui:[&_svg]:pointer-events-none fui:[&_svg]:shrink-0 fui:[&_svg:not([class*=size-])]:size-4 fui:data-selected:*:[svg]:text-foreground",
				className,
			)}
			{...props}
		>
			{children}
			<CheckIcon className="fui:ml-auto fui:opacity-0 fui:group-has-data-[slot=command-shortcut]/command-item:hidden fui:group-data-[checked=true]/command-item:opacity-100" />
		</CommandPrimitive.Item>
	);
}

function CommandShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(
				"fui:ml-auto fui:text-xs fui:tracking-widest fui:text-muted-foreground fui:group-data-selected/command-item:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
};
