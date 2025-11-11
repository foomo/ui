"use client";

import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
	className,
	...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
	<ResizablePrimitive.PanelGroup
		className={cn(
			"lib:flex lib:h-full lib:w-full lib:data-[panel-group-direction=vertical]:flex-col",
			className,
		)}
		{...props}
	/>
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
	withHandle,
	className,
	...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
	withHandle?: boolean;
}) => (
	<ResizablePrimitive.PanelResizeHandle
		className={cn(
			"lib:relative lib:flex lib:w-px lib:items-center lib:justify-center lib:bg-border lib:after:absolute lib:after:inset-y-0 lib:after:left-1/2 lib:after:w-1 lib:after:-translate-x-1/2 lib:focus-visible:outline-none lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:focus-visible:ring-offset-1 lib:data-[panel-group-direction=vertical]:h-px lib:data-[panel-group-direction=vertical]:w-full lib:data-[panel-group-direction=vertical]:after:left-0 lib:data-[panel-group-direction=vertical]:after:h-1 lib:data-[panel-group-direction=vertical]:after:w-full lib:data-[panel-group-direction=vertical]:after:-translate-y-1/2 lib:data-[panel-group-direction=vertical]:after:translate-x-0 lib:[&[data-panel-group-direction=vertical]>div]:rotate-90",
			className,
		)}
		{...props}
	>
		{withHandle && (
			<div className="lib:z-10 lib:flex lib:h-4 lib:w-3 lib:items-center lib:justify-center lib:rounded-sm lib:border lib:bg-border">
				<GripVertical className="lib:h-2.5 lib:w-2.5" />
			</div>
		)}
	</ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
