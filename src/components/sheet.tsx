import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/button";

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
	return (
		<SheetPrimitive.Backdrop
			data-slot="sheet-overlay"
			className={cn(
				"lib:fixed lib:inset-0 lib:z-50 lib:bg-black/80 lib:transition-opacity lib:duration-150 lib:data-ending-style:opacity-0 lib:data-starting-style:opacity-0 lib:supports-backdrop-filter:backdrop-blur-xs",
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = "right",
	showCloseButton = true,
	...props
}: SheetPrimitive.Popup.Props & {
	side?: "top" | "right" | "bottom" | "left";
	showCloseButton?: boolean;
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Popup
				data-slot="sheet-content"
				data-side={side}
				className={cn(
					"lib:fixed lib:z-50 lib:flex lib:flex-col lib:bg-popover lib:bg-clip-padding lib:text-sm lib:text-popover-foreground lib:shadow-lg lib:transition lib:duration-200 lib:ease-in-out lib:data-ending-style:opacity-0 lib:data-starting-style:opacity-0 lib:data-[side=bottom]:inset-x-0 lib:data-[side=bottom]:bottom-0 lib:data-[side=bottom]:h-auto lib:data-[side=bottom]:border-t lib:data-[side=bottom]:data-ending-style:translate-y-[2.5rem] lib:data-[side=bottom]:data-starting-style:translate-y-[2.5rem] lib:data-[side=left]:inset-y-0 lib:data-[side=left]:left-0 lib:data-[side=left]:h-full lib:data-[side=left]:w-3/4 lib:data-[side=left]:border-r lib:data-[side=left]:data-ending-style:translate-x-[-2.5rem] lib:data-[side=left]:data-starting-style:translate-x-[-2.5rem] lib:data-[side=right]:inset-y-0 lib:data-[side=right]:right-0 lib:data-[side=right]:h-full lib:data-[side=right]:w-3/4 lib:data-[side=right]:border-l lib:data-[side=right]:data-ending-style:translate-x-[2.5rem] lib:data-[side=right]:data-starting-style:translate-x-[2.5rem] lib:data-[side=top]:inset-x-0 lib:data-[side=top]:top-0 lib:data-[side=top]:h-auto lib:data-[side=top]:border-b lib:data-[side=top]:data-ending-style:translate-y-[-2.5rem] lib:data-[side=top]:data-starting-style:translate-y-[-2.5rem] lib:data-[side=left]:sm:max-w-sm lib:data-[side=right]:sm:max-w-sm",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<SheetPrimitive.Close
						data-slot="sheet-close"
						render={
							<Button
								variant="ghost"
								className="lib:absolute lib:top-4 lib:right-4"
								size="icon-sm"
							/>
						}
					>
						<XIcon />
						<span className="lib:sr-only">Close</span>
					</SheetPrimitive.Close>
				)}
			</SheetPrimitive.Popup>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("lib:flex lib:flex-col lib:gap-1.5 lib:p-6", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn(
				"lib:mt-auto lib:flex lib:flex-col lib:gap-2 lib:p-6",
				className,
			)}
			{...props}
		/>
	);
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn(
				"lib:font-heading lib:text-base lib:font-medium lib:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: SheetPrimitive.Description.Props) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("lib:text-sm lib:text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
