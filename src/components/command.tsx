"use client";

import type { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";
import { Dialog, DialogContent } from "@/components/dialog";
import { cn } from "@/lib/utils";

const Command = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
	<CommandPrimitive
		ref={ref}
		className={cn(
			"lib:flex lib:h-full lib:w-full lib:flex-col lib:overflow-hidden lib:rounded-md lib:bg-popover lib:text-popover-foreground",
			className,
		)}
		{...props}
	/>
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
	return (
		<Dialog {...props}>
			<DialogContent className="lib:overflow-hidden lib:p-0">
				<Command className="lib:[&_[cmdk-group-heading]]:px-2 lib:[&_[cmdk-group-heading]]:font-medium lib:[&_[cmdk-group-heading]]:text-muted-foreground lib:[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 lib:[&_[cmdk-group]]:px-2 lib:[&_[cmdk-input-wrapper]_svg]:h-5 lib:[&_[cmdk-input-wrapper]_svg]:w-5 lib:[&_[cmdk-input]]:h-12 lib:[&_[cmdk-item]]:px-2 lib:[&_[cmdk-item]]:py-3 lib:[&_[cmdk-item]_svg]:h-5 lib:[&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

const CommandInput = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
	<div
		className="lib:flex lib:items-center lib:border-b lib:px-3"
		cmdk-input-wrapper=""
	>
		<Search className="lib:mr-2 lib:h-4 lib:w-4 lib:shrink-0 lib:opacity-50" />
		<CommandPrimitive.Input
			ref={ref}
			className={cn(
				"lib:flex lib:h-10 lib:w-full lib:rounded-md lib:bg-transparent lib:py-3 lib:text-sm lib:outline-none lib:placeholder:text-muted-foreground lib:disabled:cursor-not-allowed lib:disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	</div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.List
		ref={ref}
		className={cn(
			"lib:max-h-[300px] lib:overflow-y-auto lib:overflow-x-hidden",
			className,
		)}
		{...props}
	/>
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
	<CommandPrimitive.Empty
		ref={ref}
		className="lib:py-6 lib:text-center lib:text-sm"
		{...props}
	/>
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Group
		ref={ref}
		className={cn(
			"lib:overflow-hidden lib:p-1 lib:text-foreground lib:[&_[cmdk-group-heading]]:px-2 lib:[&_[cmdk-group-heading]]:py-1.5 lib:[&_[cmdk-group-heading]]:text-xs lib:[&_[cmdk-group-heading]]:font-medium lib:[&_[cmdk-group-heading]]:text-muted-foreground",
			className,
		)}
		{...props}
	/>
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Separator
		ref={ref}
		className={cn("lib:-mx-1 lib:h-px lib:bg-border", className)}
		{...props}
	/>
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Item
		ref={ref}
		className={cn(
			"lib:relative lib:flex lib:cursor-default lib:gap-2 lib:select-none lib:items-center lib:rounded-sm lib:px-2 lib:py-1.5 lib:text-sm lib:outline-none lib:data-[disabled=true]:pointer-events-none lib:data-[selected=true]:bg-accent lib:data-[selected=true]:text-accent-foreground lib:data-[disabled=true]:opacity-50 lib:[&_svg]:pointer-events-none lib:[&_svg]:size-4 lib:[&_svg]:shrink-0",
			className,
		)}
		{...props}
	/>
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				"lib:ml-auto lib:text-xs lib:tracking-widest lib:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
};
CommandShortcut.displayName = "CommandShortcut";

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
