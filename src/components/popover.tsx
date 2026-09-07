import { cn } from "cn";
import { Popover as PopoverPrimitive } from "radix-ui";
import type * as React from "react";

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"lib:z-50 lib:flex lib:w-72 lib:origin-(--radix-popover-content-transform-origin) lib:flex-col lib:gap-4 lib:rounded-2xl lib:bg-popover lib:p-4 lib:text-sm lib:text-popover-foreground lib:shadow-2xl lib:ring-1 lib:ring-foreground/5 lib:outline-hidden lib:duration-100 lib:data-[side=bottom]:slide-in-from-top-2 lib:data-[side=left]:slide-in-from-right-2 lib:data-[side=right]:slide-in-from-left-2 lib:data-[side=top]:slide-in-from-bottom-2 lib:data-open:animate-in lib:data-open:fade-in-0 lib:data-open:zoom-in-95 lib:data-closed:animate-out lib:data-closed:fade-out-0 lib:data-closed:zoom-out-95",
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("lib:flex lib:flex-col lib:gap-1 lib:text-sm", className)}
			{...props}
		/>
	);
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<div
			data-slot="popover-title"
			className={cn("lib:text-base lib:font-medium", className)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="popover-description"
			className={cn("lib:text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
};
