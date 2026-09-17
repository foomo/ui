import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

import { toggleVariants } from "@/components/toggle";

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
	}
>({
	size: "default",
	variant: "default",
	spacing: 2,
	orientation: "horizontal",
});

function ToggleGroup({
	className,
	variant,
	size,
	spacing = 2,
	orientation = "horizontal",
	children,
	...props
}: ToggleGroupPrimitive.Props &
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: "horizontal" | "vertical";
	}) {
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={variant}
			data-size={size}
			data-spacing={spacing}
			data-orientation={orientation}
			style={{ "--gap": spacing } as React.CSSProperties}
			className={cn(
				"fui:group/toggle-group fui:flex fui:w-fit fui:flex-row fui:items-center fui:gap-[--spacing(var(--gap))] fui:data-[spacing=0]:data-[variant=outline]:rounded-4xl fui:data-vertical:flex-col fui:data-vertical:items-stretch",
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider
				value={{ variant, size, spacing, orientation }}
			>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	);
}

function ToggleGroupItem({
	className,
	children,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	const context = React.useContext(ToggleGroupContext);

	return (
		<TogglePrimitive
			data-slot="toggle-group-item"
			data-variant={context.variant || variant}
			data-size={context.size || size}
			data-spacing={context.spacing}
			className={cn(
				"fui:shrink-0 fui:group-data-[spacing=0]/toggle-group:rounded-none fui:group-data-[spacing=0]/toggle-group:px-3 fui:group-data-[spacing=0]/toggle-group:shadow-none fui:focus:z-10 fui:focus-visible:z-10 fui:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-2.5 fui:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-2.5 fui:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-3xl fui:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-3xl fui:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-3xl fui:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-3xl fui:data-[state=on]:bg-muted fui:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 fui:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 fui:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l fui:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</TogglePrimitive>
	);
}

export { ToggleGroup, ToggleGroupItem };
