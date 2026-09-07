import { cn } from "cn";
import * as ResizablePrimitive from "react-resizable-panels";

function ResizablePanelGroup({
	className,
	...props
}: ResizablePrimitive.GroupProps) {
	return (
		<ResizablePrimitive.Group
			data-slot="resizable-panel-group"
			className={cn(
				"lib:flex lib:h-full lib:w-full lib:aria-[orientation=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
	return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
	withHandle,
	className,
	...props
}: ResizablePrimitive.SeparatorProps & {
	withHandle?: boolean;
}) {
	return (
		<ResizablePrimitive.Separator
			data-slot="resizable-handle"
			className={cn(
				"lib:relative lib:flex lib:w-px lib:items-center lib:justify-center lib:bg-border lib:ring-offset-background lib:after:absolute lib:after:inset-y-0 lib:after:left-1/2 lib:after:w-1 lib:after:-translate-x-1/2 lib:focus-visible:ring-1 lib:focus-visible:ring-ring lib:focus-visible:outline-hidden lib:aria-[orientation=horizontal]:h-px lib:aria-[orientation=horizontal]:w-full lib:aria-[orientation=horizontal]:after:left-0 lib:aria-[orientation=horizontal]:after:h-1 lib:aria-[orientation=horizontal]:after:w-full lib:aria-[orientation=horizontal]:after:translate-x-0 lib:aria-[orientation=horizontal]:after:-translate-y-1/2 lib:[&[aria-orientation=horizontal]>div]:rotate-90",
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div className="lib:z-10 lib:flex lib:h-6 lib:w-1 lib:shrink-0 lib:rounded-lg lib:bg-border" />
			)}
		</ResizablePrimitive.Separator>
	);
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
