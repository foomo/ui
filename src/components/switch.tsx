import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "cn";

function Switch({
	className,
	size = "default",
	...props
}: SwitchPrimitive.Root.Props & {
	size?: "sm" | "default";
}) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(
				"lib:peer lib:group/switch lib:relative lib:inline-flex lib:shrink-0 lib:items-center lib:rounded-full lib:border lib:border-transparent lib:transition-all lib:outline-none lib:group-has-[:focus-visible]/field-label:border-transparent lib:group-has-[:focus-visible]/field-label:ring-0 lib:after:absolute lib:after:-inset-x-3 lib:after:-inset-y-2 lib:focus-visible:border-ring lib:focus-visible:ring-[3px] lib:focus-visible:ring-ring/50 lib:aria-invalid:border-destructive lib:aria-invalid:ring-[3px] lib:aria-invalid:ring-destructive/20 lib:data-[size=default]:h-[18.4px] lib:data-[size=default]:w-[32px] lib:data-[size=sm]:h-[14px] lib:data-[size=sm]:w-[24px] lib:dark:aria-invalid:border-destructive/50 lib:dark:aria-invalid:ring-destructive/40 lib:data-checked:bg-primary lib:data-unchecked:bg-input lib:dark:data-unchecked:bg-input/80 lib:data-disabled:cursor-not-allowed lib:data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className="lib:pointer-events-none lib:block lib:rounded-full lib:bg-background lib:ring-0 lib:transition-transform lib:group-data-[size=default]/switch:size-4 lib:group-data-[size=sm]/switch:size-3 lib:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] lib:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] lib:dark:data-checked:bg-primary-foreground lib:group-data-[size=default]/switch:data-unchecked:translate-x-0 lib:group-data-[size=sm]/switch:data-unchecked:translate-x-0 lib:dark:data-unchecked:bg-foreground"
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
