import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";

function Progress({
	className,
	children,
	value,
	...props
}: ProgressPrimitive.Root.Props) {
	return (
		<ProgressPrimitive.Root
			value={value}
			data-slot="progress"
			className={cn("fui:flex fui:flex-wrap fui:gap-3", className)}
			{...props}
		>
			{children}
			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</ProgressPrimitive.Root>
	);
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
	return (
		<ProgressPrimitive.Track
			className={cn(
				"fui:relative fui:flex fui:h-3 fui:w-full fui:items-center fui:overflow-x-hidden fui:rounded-4xl fui:bg-muted",
				className,
			)}
			data-slot="progress-track"
			{...props}
		/>
	);
}

function ProgressIndicator({
	className,
	...props
}: ProgressPrimitive.Indicator.Props) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			className={cn("fui:h-full fui:bg-primary fui:transition-all", className)}
			{...props}
		/>
	);
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			className={cn("fui:text-sm fui:font-medium", className)}
			data-slot="progress-label"
			{...props}
		/>
	);
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			className={cn(
				"fui:ml-auto fui:text-sm fui:text-muted-foreground fui:tabular-nums",
				className,
			)}
			data-slot="progress-value"
			{...props}
		/>
	);
}

export {
	Progress,
	ProgressTrack,
	ProgressIndicator,
	ProgressLabel,
	ProgressValue,
};
