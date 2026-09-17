import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props) {
	const _values = Array.isArray(value)
		? value
		: Array.isArray(defaultValue)
			? defaultValue
			: [min, max];

	return (
		<SliderPrimitive.Root
			className={cn(
				"fui:data-horizontal:w-full fui:data-vertical:h-full",
				className,
			)}
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control className="fui:relative fui:flex fui:w-full fui:touch-none fui:items-center fui:select-none fui:data-disabled:opacity-50 fui:data-vertical:h-full fui:data-vertical:min-h-40 fui:data-vertical:w-auto fui:data-vertical:flex-col">
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="fui:relative fui:grow fui:overflow-hidden fui:rounded-4xl fui:bg-muted fui:select-none fui:data-horizontal:h-3 fui:data-horizontal:w-full fui:data-vertical:h-full fui:data-vertical:w-3"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="fui:bg-primary fui:select-none fui:data-horizontal:h-full fui:data-vertical:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						key={index}
						className="fui:block fui:size-4 fui:shrink-0 fui:rounded-4xl fui:border fui:border-primary fui:bg-white fui:shadow-sm fui:ring-ring/50 fui:transition-colors fui:select-none fui:hover:ring-4 fui:focus-visible:ring-4 fui:focus-visible:outline-hidden fui:disabled:pointer-events-none fui:disabled:opacity-50"
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
