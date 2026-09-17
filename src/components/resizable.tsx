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
				"fui:flex fui:h-full fui:w-full fui:aria-[orientation=vertical]:flex-col",
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
				"fui:relative fui:flex fui:w-px fui:items-center fui:justify-center fui:bg-border fui:ring-offset-background fui:after:absolute fui:after:inset-y-0 fui:after:left-1/2 fui:after:w-1 fui:after:-translate-x-1/2 fui:focus-visible:ring-1 fui:focus-visible:ring-ring fui:focus-visible:outline-hidden fui:aria-[orientation=horizontal]:h-px fui:aria-[orientation=horizontal]:w-full fui:aria-[orientation=horizontal]:after:left-0 fui:aria-[orientation=horizontal]:after:h-1 fui:aria-[orientation=horizontal]:after:w-full fui:aria-[orientation=horizontal]:after:translate-x-0 fui:aria-[orientation=horizontal]:after:-translate-y-1/2 fui:[&[aria-orientation=horizontal]>div]:rotate-90",
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div className="fui:z-10 fui:flex fui:h-6 fui:w-1 fui:shrink-0 fui:rounded-lg fui:bg-border" />
			)}
		</ResizablePrimitive.Separator>
	);
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
