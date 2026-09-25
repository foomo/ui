import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { CheckIcon } from "@phosphor-icons/react";
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
				"fui:peer fui:group/switch fui:relative fui:inline-flex fui:shrink-0 fui:items-center fui:rounded-full fui:border fui:border-transparent fui:transition-all fui:outline-none fui:group-has-[:focus-visible]/field-label:border-transparent fui:group-has-[:focus-visible]/field-label:ring-0 fui:after:absolute fui:after:-inset-x-3 fui:after:-inset-y-2 fui:focus-visible:border-ring fui:focus-visible:ring-[3px] fui:focus-visible:ring-ring/50 fui:aria-invalid:border-destructive fui:aria-invalid:ring-[3px] fui:aria-invalid:ring-destructive/20 fui:data-[size=default]:h-[18.4px] fui:data-[size=default]:w-[32px] fui:data-[size=sm]:h-[14px] fui:data-[size=sm]:w-[24px] fui:dark:aria-invalid:border-destructive/50 fui:dark:aria-invalid:ring-destructive/40 fui:data-checked:bg-accent-highlight fui:data-unchecked:bg-input fui:dark:data-unchecked:bg-input/80 fui:data-disabled:cursor-not-allowed fui:data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className="fui:pointer-events-none fui:flex fui:items-center fui:justify-center fui:rounded-full fui:bg-background fui:ring-0 fui:transition-transform fui:group-data-[size=default]/switch:size-4 fui:group-data-[size=sm]/switch:size-3 fui:group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] fui:group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] fui:dark:data-checked:bg-accent-highlight-foreground fui:group-data-[size=default]/switch:data-unchecked:translate-x-0 fui:group-data-[size=sm]/switch:data-unchecked:translate-x-0 fui:dark:data-unchecked:bg-foreground"
			>
				<CheckIcon
					weight="bold"
					className="fui:text-accent-highlight fui:opacity-0 fui:transition-opacity fui:group-data-checked/switch:opacity-100 fui:group-data-[size=default]/switch:size-2.5 fui:group-data-[size=sm]/switch:size-2"
				/>
			</SwitchPrimitive.Thumb>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
