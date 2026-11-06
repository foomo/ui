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

/**
 * Building blocks for a dashboard: sections of tiles, each tile a card that
 * shows its own loading, error and empty states, and the two chart shapes
 * dashboards reach for most, a donut and a list of horizontal bars.
 */

/**
 * Where a tile's data is: not asked for yet (`idle`), on its way, failed with
 * a message, or there. An app converts its own fetch result into this at its
 * boundary, so a tile does not depend on how the data is fetched.
 */
type DashboardResource<T> =
	| { state: "idle" }
	| { state: "loading" }
	| { state: "error"; message: string }
	| { state: "ready"; data: T };

/**
 * One stage of a dashboard: a heading over a grid of tiles. The grid has one
 * column on small screens, two from `md` and, with `columns={3}` (the
 * default), three from `xl`.
 *
 * Leave out `title` where something else already names the stage, such as the
 * tab it sits in; the grid then starts at the top.
 */
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
 * A dashboard tile: a card with a title, an optional description and action,
 * and a body that renders whatever state `resource` is in.
 *
 * - `idle`: the `idle` text, for data fetched only on request.
 * - `loading`: a placeholder filling the body.
 * - `error`: the message, in the destructive colour.
 * - `ready`: `children(data)`, or `emptyMessage` when `isEmpty(data)` holds.
 *
 * Each tile owning its states, rather than the page waiting on all of its
 * data, keeps one unreachable source from blanking the whole dashboard.
 *
 * The body has a fixed `height` (220px by default) rather than its content's,
 * so tiles in a row stay aligned while their data arrives: a placeholder the
 * size of the chart it becomes keeps the grid from reflowing.
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
	/** The header's right-hand slot: a `DashboardTileLink`, a badge, a button. */
	action?: React.ReactNode;
	resource: DashboardResource<T>;
	/** Tells "loaded, nothing to show" apart from "loaded". */
	isEmpty?: (data: T) => boolean;
	emptyMessage?: React.ReactNode;
	/** Shown while data fetched only on request has not been asked for. */
	idle?: React.ReactNode;
	/** The body's height, in pixels or any CSS length. */
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

/**
 * A tile's way to the page behind it, for its `action` slot: a link in the
 * secondary button's look, with the label and an arrow out.
 *
 * Takes the app's link element through `render`, so the app keeps its own
 * router: `<DashboardTileLink render={<Link to="/products" />}>Products`. It
 * stays a link for assistive tech, not a button.
 */
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

/** Recharts' label formatter, defaulting to a localised number. */
type ChartValueFormatter = React.ComponentProps<typeof LabelList>["formatter"];

const formatChartValue = (value: unknown) =>
	typeof value === "number" ? value.toLocaleString() : String(value ?? "");

/** One slice of a `DonutChart`. */
type DonutChartSlice = { label: string; value: number; color: string };

/**
 * A donut with a figure in its hole: a part-of-whole at a glance, such as the
 * share of variants online. Fills its parent, so it sizes to a tile's body.
 *
 * `value` is the large figure in the middle and `caption` the line under it.
 * `labels` names each slice outside the ring; the ring then shrinks to make
 * room for the names.
 *
 * Draw only slices that add up to the figure the donut stands for. A count
 * that overlaps them, or falls outside, belongs beside the chart.
 */
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
	/** Colours and labels for the tooltip, as for `ChartContainer`. */
	config?: ChartConfig;
	className?: string;
}) {
	// Percentages of the room the chart has, so the ring shrinks to fit a
	// narrow spot instead of being cut off. In a tile's 220px body they come to
	// an 80px ring with a 55px hole (75px and 45px with labels).
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

/**
 * Horizontal bars, one per category: the names down the left, each bar in its
 * row's `color`, and its value at the bar's end. For a total broken down by
 * kind, such as price rules by type. Fills its parent.
 *
 * `children` renders extra chart elements, such as a `ReferenceLine`, inside
 * the same chart.
 */
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
	/** The field holding each bar's value. */
	dataKey: keyof T & string;
	/** Colours and labels for the tooltip, as for `ChartContainer`. */
	config?: ChartConfig;
	/** The width of the category names' column, in pixels. */
	labelWidth?: number;
	/** Room around the bars; `right` holds the values at their ends. */
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
				{/* Recharts infers `dataKey`'s type from `Bar`'s own generic, which it
				    cannot unify with `T`, so the sound `keyof T & string` is cast. */}
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
