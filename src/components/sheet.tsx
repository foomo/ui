import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "cn";
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
				"fui:fixed fui:inset-0 fui:z-50 fui:bg-black/80 fui:transition-opacity fui:duration-150 fui:data-ending-style:opacity-0 fui:data-starting-style:opacity-0 fui:supports-backdrop-filter:backdrop-blur-xs",
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
					"fui:fixed fui:z-50 fui:flex fui:flex-col fui:bg-popover fui:bg-clip-padding fui:text-sm fui:text-popover-foreground fui:shadow-lg fui:transition fui:duration-200 fui:ease-in-out fui:data-ending-style:opacity-0 fui:data-starting-style:opacity-0 fui:data-[side=bottom]:inset-x-0 fui:data-[side=bottom]:bottom-0 fui:data-[side=bottom]:h-auto fui:data-[side=bottom]:border-t fui:data-[side=bottom]:data-ending-style:translate-y-[2.5rem] fui:data-[side=bottom]:data-starting-style:translate-y-[2.5rem] fui:data-[side=left]:inset-y-0 fui:data-[side=left]:left-0 fui:data-[side=left]:h-full fui:data-[side=left]:w-3/4 fui:data-[side=left]:border-r fui:data-[side=left]:data-ending-style:translate-x-[-2.5rem] fui:data-[side=left]:data-starting-style:translate-x-[-2.5rem] fui:data-[side=right]:inset-y-0 fui:data-[side=right]:right-0 fui:data-[side=right]:h-full fui:data-[side=right]:w-3/4 fui:data-[side=right]:border-l fui:data-[side=right]:data-ending-style:translate-x-[2.5rem] fui:data-[side=right]:data-starting-style:translate-x-[2.5rem] fui:data-[side=top]:inset-x-0 fui:data-[side=top]:top-0 fui:data-[side=top]:h-auto fui:data-[side=top]:border-b fui:data-[side=top]:data-ending-style:translate-y-[-2.5rem] fui:data-[side=top]:data-starting-style:translate-y-[-2.5rem] fui:data-[side=left]:sm:max-w-sm fui:data-[side=right]:sm:max-w-sm",
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
								className="fui:absolute fui:top-4 fui:right-4"
								size="icon-sm"
							/>
						}
					>
						<XIcon />
						<span className="fui:sr-only">Close</span>
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
			className={cn("fui:flex fui:flex-col fui:gap-1.5 fui:p-6", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn(
				"fui:mt-auto fui:flex fui:flex-col fui:gap-2 fui:p-6",
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
				"fui:font-heading fui:text-base fui:font-medium fui:text-foreground",
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
			className={cn("fui:text-sm fui:text-muted-foreground", className)}
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
