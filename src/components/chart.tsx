import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
	[k in string]: {
		label?: React.ReactNode;
		icon?: React.ComponentType;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error("useChart must be used within a <ChartContainer />");
	}

	return context;
}

const ChartContainer = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		config: ChartConfig;
		children: React.ComponentProps<
			typeof RechartsPrimitive.ResponsiveContainer
		>["children"];
	}
>(({ id, className, children, config, ...props }, ref) => {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-chart={chartId}
				ref={ref}
				className={cn(
					"lib:flex lib:aspect-video lib:justify-center lib:text-xs lib:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground lib:[&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50 lib:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border lib:[&_.recharts-dot[stroke=#fff]]:stroke-transparent lib:[&_.recharts-layer]:outline-none lib:[&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border lib:[&_.recharts-radial-bar-background-sector]:fill-muted lib:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted lib:[&_.recharts-reference-line_[stroke=#ccc]]:stroke-border lib:[&_.recharts-sector[stroke=#fff]]:stroke-transparent lib:[&_.recharts-sector]:outline-none lib:[&_.recharts-surface]:outline-none",
					className,
				)}
				{...props}
			>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer>
					{children}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
	const colorConfig = Object.entries(config).filter(
		([, config]) => config.theme || config.color,
	);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color =
			itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
			itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join("\n")}
}
`,
					)
					.join("\n"),
			}}
		/>
	);
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
		React.ComponentProps<"div"> & {
			hideLabel?: boolean;
			hideIndicator?: boolean;
			indicator?: "line" | "dot" | "dashed";
			nameKey?: string;
			labelKey?: string;
		}
>(
	(
		{
			active,
			payload,
			className,
			indicator = "dot",
			hideLabel = false,
			hideIndicator = false,
			label,
			labelFormatter,
			labelClassName,
			formatter,
			color,
			nameKey,
			labelKey,
		},
		ref,
	) => {
		const { config } = useChart();

		const tooltipLabel = React.useMemo(() => {
			if (hideLabel || !payload?.length) {
				return null;
			}

			const [item] = payload;
			const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
			const itemConfig = getPayloadConfigFromPayload(config, item, key);
			const value =
				!labelKey && typeof label === "string"
					? config[label as keyof typeof config]?.label || label
					: itemConfig?.label;

			if (labelFormatter) {
				return (
					<div className={cn("lib:font-medium", labelClassName)}>
						{labelFormatter(value, payload)}
					</div>
				);
			}

			if (!value) {
				return null;
			}

			return (
				<div className={cn("lib:font-medium", labelClassName)}>{value}</div>
			);
		}, [
			label,
			labelFormatter,
			payload,
			hideLabel,
			labelClassName,
			config,
			labelKey,
		]);

		if (!active || !payload?.length) {
			return null;
		}

		const nestLabel = payload.length === 1 && indicator !== "dot";

		return (
			<div
				ref={ref}
				className={cn(
					"lib:grid lib:min-w-[8rem] lib:items-start lib:gap-1.5 lib:rounded-lg lib:border lib:border-border/50 lib:bg-background lib:px-2.5 lib:py-1.5 lib:text-xs lib:shadow-xl",
					className,
				)}
			>
				{!nestLabel ? tooltipLabel : null}
				<div className="lib:grid lib:gap-1.5">
					{payload
						.filter((item) => item.type !== "none")
						.map((item, index) => {
							const key = `${nameKey || item.name || item.dataKey || "value"}`;
							const itemConfig = getPayloadConfigFromPayload(config, item, key);
							const indicatorColor = color || item.payload.fill || item.color;

							return (
								<div
									key={item.dataKey}
									className={cn(
										"lib:flex lib:w-full lib:flex-wrap lib:items-stretch lib:gap-2 lib:[&>svg]:h-2.5 lib:[&>svg]:w-2.5 lib:[&>svg]:text-muted-foreground",
										indicator === "dot" && "lib:items-center",
									)}
								>
									{formatter && item?.value !== undefined && item.name ? (
										formatter(item.value, item.name, item, index, item.payload)
									) : (
										<>
											{itemConfig?.icon ? (
												<itemConfig.icon />
											) : (
												!hideIndicator && (
													<div
														className={cn(
															"lib:shrink-0 lib:rounded-[2px] lib:border-[--color-border] lib:bg-[--color-bg]",
															{
																"h-2.5 w-2.5": indicator === "dot",
																"w-1": indicator === "line",
																"w-0 border-[1.5px] border-dashed bg-transparent":
																	indicator === "dashed",
																"my-0.5": nestLabel && indicator === "dashed",
															},
														)}
														style={
															{
																"--color-bg": indicatorColor,
																"--color-border": indicatorColor,
															} as React.CSSProperties
														}
													/>
												)
											)}
											<div
												className={cn(
													"lib:flex lib:flex-1 lib:justify-between lib:leading-none",
													nestLabel ? "lib:items-end" : "lib:items-center",
												)}
											>
												<div className="lib:grid lib:gap-1.5">
													{nestLabel ? tooltipLabel : null}
													<span className="lib:text-muted-foreground">
														{itemConfig?.label || item.name}
													</span>
												</div>
												{item.value && (
													<span className="lib:font-mono lib:font-medium lib:tabular-nums lib:text-foreground">
														{item.value.toLocaleString()}
													</span>
												)}
											</div>
										</>
									)}
								</div>
							);
						})}
				</div>
			</div>
		);
	},
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> &
		Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
			hideIcon?: boolean;
			nameKey?: string;
		}
>(
	(
		{ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
		ref,
	) => {
		const { config } = useChart();

		if (!payload?.length) {
			return null;
		}

		return (
			<div
				ref={ref}
				className={cn(
					"lib:flex lib:items-center lib:justify-center lib:gap-4",
					verticalAlign === "top" ? "lib:pb-3" : "lib:pt-3",
					className,
				)}
			>
				{payload
					.filter((item) => item.type !== "none")
					.map((item) => {
						const key = `${nameKey || item.dataKey || "value"}`;
						const itemConfig = getPayloadConfigFromPayload(config, item, key);

						return (
							<div
								key={item.value}
								className={cn(
									"lib:flex lib:items-center lib:gap-1.5 lib:[&>svg]:h-3 lib:[&>svg]:w-3 lib:[&>svg]:text-muted-foreground",
								)}
							>
								{itemConfig?.icon && !hideIcon ? (
									<itemConfig.icon />
								) : (
									<div
										className="lib:h-2 lib:w-2 lib:shrink-0 lib:rounded-[2px]"
										style={{
											backgroundColor: item.color,
										}}
									/>
								)}
								{itemConfig?.label}
							</div>
						);
					})}
			</div>
		);
	},
);
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
	config: ChartConfig,
	payload: unknown,
	key: string,
) {
	if (typeof payload !== "object" || payload === null) {
		return undefined;
	}

	const payloadPayload =
		"payload" in payload &&
		typeof payload.payload === "object" &&
		payload.payload !== null
			? payload.payload
			: undefined;

	let configLabelKey: string = key;

	if (
		key in payload &&
		typeof payload[key as keyof typeof payload] === "string"
	) {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (
		payloadPayload &&
		key in payloadPayload &&
		typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
	) {
		configLabelKey = payloadPayload[
			key as keyof typeof payloadPayload
		] as string;
	}

	return configLabelKey in config
		? config[configLabelKey]
		: config[key as keyof typeof config];
}

export {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	ChartStyle,
};
