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
				"lib:flex lib:size-full lib:flex-col lib:overflow-hidden lib:rounded-4xl lib:bg-popover lib:p-1 lib:text-popover-foreground",
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
}: React.ComponentProps<typeof Dialog> & {
	title?: string;
	description?: string;
	className?: string;
	showCloseButton?: boolean;
}) {
	return (
		<Dialog {...props}>
			<DialogHeader className="lib:sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent
				className={cn(
					"lib:top-1/3 lib:translate-y-0 lib:overflow-hidden lib:rounded-4xl! lib:p-0",
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
		<div data-slot="command-input-wrapper" className="lib:p-1 lib:pb-0">
			<InputGroup className="lib:h-9 lib:bg-input/30">
				<CommandPrimitive.Input
					data-slot="command-input"
					className={cn(
						"lib:w-full lib:text-sm lib:outline-hidden lib:disabled:cursor-not-allowed lib:disabled:opacity-50",
						className,
					)}
					{...props}
				/>
				<InputGroupAddon>
					<SearchIcon className="lib:size-4 lib:shrink-0 lib:opacity-50" />
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
				"lib:no-scrollbar lib:max-h-72 lib:scroll-py-1 lib:overflow-x-hidden lib:overflow-y-auto lib:outline-none",
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
			className={cn("lib:py-6 lib:text-center lib:text-sm", className)}
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
				"lib:overflow-hidden lib:p-1 lib:text-foreground lib:**:[[cmdk-group-heading]]:px-3 lib:**:[[cmdk-group-heading]]:py-2 lib:**:[[cmdk-group-heading]]:text-xs lib:**:[[cmdk-group-heading]]:font-medium lib:**:[[cmdk-group-heading]]:text-muted-foreground",
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
			className={cn("lib:my-1 lib:h-px lib:bg-border/50", className)}
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
				"lib:group/command-item lib:relative lib:flex lib:cursor-default lib:items-center lib:gap-2 lib:rounded-lg lib:px-3 lib:py-2 lib:text-sm lib:outline-hidden lib:select-none lib:in-data-[slot=dialog-content]:rounded-2xl lib:data-[disabled=true]:pointer-events-none lib:data-[disabled=true]:opacity-50 lib:data-selected:bg-muted lib:data-selected:text-foreground lib:[&_svg]:pointer-events-none lib:[&_svg]:shrink-0 lib:[&_svg:not([class*=size-])]:size-4 lib:data-selected:*:[svg]:text-foreground",
				className,
			)}
			{...props}
		>
			{children}
			<CheckIcon className="lib:ml-auto lib:opacity-0 lib:group-has-data-[slot=command-shortcut]/command-item:hidden lib:group-data-[checked=true]/command-item:opacity-100" />
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
				"lib:ml-auto lib:text-xs lib:tracking-widest lib:text-muted-foreground lib:group-data-selected/command-item:text-foreground",
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
