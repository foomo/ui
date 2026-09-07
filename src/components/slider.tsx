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
				"lib:data-horizontal:w-full lib:data-vertical:h-full",
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
			<SliderPrimitive.Control className="lib:relative lib:flex lib:w-full lib:touch-none lib:items-center lib:select-none lib:data-disabled:opacity-50 lib:data-vertical:h-full lib:data-vertical:min-h-40 lib:data-vertical:w-auto lib:data-vertical:flex-col">
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="lib:relative lib:grow lib:overflow-hidden lib:rounded-4xl lib:bg-muted lib:select-none lib:data-horizontal:h-3 lib:data-horizontal:w-full lib:data-vertical:h-full lib:data-vertical:w-3"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="lib:bg-primary lib:select-none lib:data-horizontal:h-full lib:data-vertical:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						key={index}
						className="lib:block lib:size-4 lib:shrink-0 lib:rounded-4xl lib:border lib:border-primary lib:bg-white lib:shadow-sm lib:ring-ring/50 lib:transition-colors lib:select-none lib:hover:ring-4 lib:focus-visible:ring-4 lib:focus-visible:outline-hidden lib:disabled:pointer-events-none lib:disabled:opacity-50"
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };
