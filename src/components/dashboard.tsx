import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type * as React from "react";

import { buttonVariants } from "@/components/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/card";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Label,
	LabelList,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "@/components/chart";
import { Skeleton } from "@/components/skeleton";

/** A tile's data state, independent of how the data is fetched. */
type DashboardResource<T> =
	| { state: "idle" }
	| { state: "loading" }
	| { state: "error"; message: string }
	| { state: "ready"; data: T };

/** An optional heading over a responsive grid of tiles. */
function DashboardSection({
	title,
	columns = 3,
	className,
	children,
}: {
	title?: React.ReactNode;
	columns?: 2 | 3;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<section
			data-slot="dashboard-section"
			className={cn("fui:flex fui:flex-col fui:gap-3", className)}
		>
			{title ? (
				<h2 className="fui:font-heading fui:text-base fui:font-medium">
					{title}
				</h2>
			) : null}
			<div
				className={cn(
					"fui:grid fui:gap-4 fui:md:grid-cols-2",
					columns === 3 && "fui:xl:grid-cols-3",
				)}
			>
				{children}
			</div>
		</section>
	);
}

/**
 * A card that renders whichever state `resource` is in, so one failing source
 * does not blank the whole dashboard. The body has a fixed `height` so the
 * grid does not reflow as data arrives.
 */
function DashboardTile<T>({
	title,
	description,
	action,
	resource,
	isEmpty,
	emptyMessage = "Nothing to show.",
	idle,
	height = 220,
	className,
	children,
}: {
	title: React.ReactNode;
	description?: React.ReactNode;
	action?: React.ReactNode;
	resource: DashboardResource<T>;
	isEmpty?: (data: T) => boolean;
	emptyMessage?: React.ReactNode;
	idle?: React.ReactNode;
	height?: number | string;
	className?: string;
	children: (data: T) => React.ReactNode;
}) {
	return (
		<Card data-slot="dashboard-tile" className={className}>
			<CardHeader>
				<CardTitle className="fui:text-sm fui:font-medium">{title}</CardTitle>
				{description ? (
					<CardDescription className="fui:text-xs">
						{description}
					</CardDescription>
				) : null}
				{action ? <CardAction>{action}</CardAction> : null}
			</CardHeader>
			<CardContent>
				<div className="fui:w-full" style={{ height }}>
					<DashboardTileBody
						resource={resource}
						isEmpty={isEmpty}
						emptyMessage={emptyMessage}
						idle={idle}
					>
						{children}
					</DashboardTileBody>
				</div>
			</CardContent>
		</Card>
	);
}

function DashboardTileBody<T>({
	resource,
	isEmpty,
	emptyMessage,
	idle,
	children,
}: {
	resource: DashboardResource<T>;
	isEmpty?: (data: T) => boolean;
	emptyMessage: React.ReactNode;
	idle?: React.ReactNode;
	children: (data: T) => React.ReactNode;
}) {
	switch (resource.state) {
		case "idle":
			return <TileMessage>{idle}</TileMessage>;
		case "loading":
			return <Skeleton className="fui:h-full fui:w-full" />;
		case "error":
			return (
				<TileMessage>
					<span className="fui:text-destructive">{resource.message}</span>
				</TileMessage>
			);
		case "ready":
			return isEmpty?.(resource.data) ? (
				<TileMessage>{emptyMessage}</TileMessage>
			) : (
				children(resource.data)
			);
	}
}

function TileMessage({ children }: { children: React.ReactNode }) {
	return (
		<div className="fui:flex fui:h-full fui:w-full fui:items-center fui:justify-center fui:text-center fui:text-sm fui:text-muted-foreground">
			{children}
		</div>
	);
}

/** A link styled as a secondary button for a tile's `action`; pass the router's link via `render`. */
function DashboardTileLink({
	className,
	children,
	render,
	...props
}: useRender.ComponentProps<"a">) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps<"a">(
			{
				className: cn(buttonVariants({ variant: "secondary" }), className),
				children: (
					<>
						{children}
						<ArrowUpRightIcon />
					</>
				),
			},
			props,
		),
		render,
		state: { slot: "dashboard-tile-link" },
	});
}

type ChartValueFormatter = React.ComponentProps<typeof LabelList>["formatter"];

const formatChartValue = (value: unknown) =>
	typeof value === "number" ? value.toLocaleString() : String(value ?? "");

type DonutChartSlice = { label: string; value: number; color: string };

/** A donut with `value` and `caption` in its hole; fills its parent. */
function DonutChart({
	data,
	value,
	caption,
	labels = false,
	config = {},
	className,
}: {
	data: DonutChartSlice[];
	value?: string | number;
	caption?: string;
	labels?: boolean;
	config?: ChartConfig;
	className?: string;
}) {
	// Percentages, so the ring shrinks in a narrow spot instead of being cut off.
	const ring = labels
		? { innerRadius: "43%", outerRadius: "71%", value: "fui:text-xl", gap: 18 }
		: {
				innerRadius: "52%",
				outerRadius: "76%",
				value: "fui:text-2xl",
				gap: 20,
			};

	return (
		<ChartContainer
			config={config}
			aspect="auto"
			className={cn("fui:h-full fui:w-full", className)}
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie
					data={data}
					dataKey="value"
					nameKey="label"
					innerRadius={ring.innerRadius}
					outerRadius={ring.outerRadius}
					stroke="var(--card)"
					strokeWidth={2}
					isAnimationActive={false}
				>
					{data.map((slice) => (
						<Cell key={slice.label} fill={slice.color} />
					))}
					{labels ? (
						<LabelList
							dataKey="label"
							position="outside"
							className="fui:fill-muted-foreground fui:text-[10px]"
						/>
					) : null}
					{value !== undefined ? (
						<Label
							content={({ viewBox }) => {
								if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
									return null;
								}
								const { cx = 0, cy = 0 } = viewBox;
								return (
									<text x={cx} y={cy} textAnchor="middle">
										<tspan
											x={cx}
											y={cy}
											className={cn(
												"fui:fill-foreground fui:font-bold fui:tabular-nums",
												ring.value,
											)}
										>
											{value}
										</tspan>
										{caption ? (
											<tspan
												x={cx}
												y={cy + ring.gap}
												className="fui:fill-muted-foreground fui:text-xs"
											>
												{caption}
											</tspan>
										) : null}
									</text>
								);
							}}
						/>
					) : null}
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}

/** Horizontal bars, one per category, each in its row's `color`; fills its parent. */
function BarListChart<T extends { label: string; color: string }>({
	data,
	dataKey,
	config = {},
	labelWidth = 128,
	margin = { left: 0, right: 40 },
	tooltip = <ChartTooltipContent hideLabel />,
	formatter = formatChartValue,
	className,
	children,
}: {
	data: T[];
	dataKey: keyof T & string;
	config?: ChartConfig;
	labelWidth?: number;
	margin?: { left?: number; right?: number; top?: number; bottom?: number };
	tooltip?: React.ComponentProps<typeof ChartTooltip>["content"];
	formatter?: ChartValueFormatter;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<ChartContainer
			config={config}
			aspect="auto"
			className={cn("fui:h-full fui:w-full", className)}
		>
			<BarChart data={data} layout="vertical" margin={margin}>
				<CartesianGrid horizontal={false} />
				<XAxis type="number" hide />
				<YAxis
					type="category"
					dataKey="label"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					width={labelWidth}
					className="fui:text-xs"
				/>
				<ChartTooltip content={tooltip} />
				{children}
				{/* Recharts cannot unify `Bar`'s own generic with `T`. */}
				<Bar dataKey={dataKey as never} radius={3} isAnimationActive={false}>
					{data.map((entry) => (
						<Cell key={entry.label} fill={entry.color} />
					))}
					<LabelList
						dataKey={dataKey as never}
						position="right"
						className="fui:fill-muted-foreground fui:text-xs"
						formatter={formatter}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}

export {
	BarListChart,
	type DashboardResource,
	DashboardSection,
	DashboardTile,
	DashboardTileLink,
	DonutChart,
	type DonutChartSlice,
};
