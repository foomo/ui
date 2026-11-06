import type * as React from "react";

import { ReferenceLine } from "../components/chart";
import {
	BarListChart,
	type DashboardResource,
	DashboardTile,
	DashboardTileLink,
	DonutChart,
} from "../components/dashboard";
import {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
} from "../components/description-list";

/**
 * Sample data and tiles from the toolbox's dashboard, shared by the dashboard
 * kit's story (Data Display / Dashboard) and the showcase (Showcase / Admin
 * Dashboard), so both show the same figures.
 */

type Summary = {
	variants: number;
	online: number;
	projections: { label: string; value: number; color: string }[];
	errors: { label: string; value: number; color: string }[];
	rules: { active: number; scheduled: number; disabled: number };
};

const summary: Summary = {
	variants: 41207,
	online: 38954,
	projections: [
		{ label: "Listing", value: 28410, color: "var(--chart-2)" },
		{ label: "Index", value: 41207, color: "var(--chart-3)" },
		{ label: "PDP", value: 41190, color: "var(--chart-4)" },
		{ label: "JSON-LD", value: 40876, color: "var(--chart-5)" },
	],
	errors: [
		{ label: "validation", value: 51, color: "var(--label-color-1)" },
		{ label: "parse", value: 6, color: "var(--label-color-2)" },
	],
	rules: { active: 42, scheduled: 11, disabled: 5 },
};

const ready: DashboardResource<Summary> = { state: "ready", data: summary };

function TileLink({ children }: { children: React.ReactNode }) {
	return (
		// biome-ignore lint/a11y/useAnchorContent: the button supplies the link's content.
		<DashboardTileLink render={<a href="#details" />}>
			{children}
		</DashboardTileLink>
	);
}

function OnlineShareTile({
	resource,
}: {
	resource: DashboardResource<Summary>;
}) {
	return (
		<DashboardTile
			title="Online variants"
			description="Share of all variants the shop serves"
			action={<TileLink>Products</TileLink>}
			resource={resource}
			isEmpty={(data) => data.variants === 0}
			emptyMessage="No variants imported yet."
		>
			{(data) => (
				<DonutChart
					data={[
						{ label: "Online", value: data.online, color: "var(--chart-2)" },
						{
							label: "Not online",
							value: data.variants - data.online,
							color: "var(--chart-1)",
						},
					]}
					value={`${Math.round((data.online / data.variants) * 100)}%`}
					caption={`${data.online.toLocaleString()} online`}
				/>
			)}
		</DashboardTile>
	);
}

function ProjectionsTile({
	resource,
}: {
	resource: DashboardResource<Summary>;
}) {
	return (
		<DashboardTile
			title="Catalogue projections"
			description="Entries per projection, against the variant count"
			action={<TileLink>Products</TileLink>}
			resource={resource}
		>
			{(data) => (
				<BarListChart
					data={data.projections}
					dataKey="value"
					// The top margin holds the reference line's label.
					margin={{ left: 0, right: 40, top: 16 }}
				>
					<ReferenceLine
						x={data.variants}
						stroke="var(--muted-foreground)"
						strokeDasharray="4 4"
						label={{
							value: `${data.variants.toLocaleString()} variants`,
							position: "top",
							className: "fui:fill-muted-foreground fui:text-xs",
						}}
					/>
				</BarListChart>
			)}
		</DashboardTile>
	);
}

function ErrorCategoriesTile({
	resource,
}: {
	resource: DashboardResource<Summary>;
}) {
	return (
		<DashboardTile
			title="Error categories"
			description="Import failures by the stage that rejected them"
			action={<TileLink>All errors</TileLink>}
			resource={resource}
		>
			{(data) => (
				<DonutChart
					data={data.errors}
					value={data.errors.reduce((sum, slice) => sum + slice.value, 0)}
					caption="occurrences"
					labels
				/>
			)}
		</DashboardTile>
	);
}

function PriceRulesTile({
	resource,
}: {
	resource: DashboardResource<Summary>;
}) {
	return (
		<DashboardTile
			title="Shop price rules"
			description="In effect now against scheduled"
			action={<TileLink>Price rules</TileLink>}
			resource={resource}
		>
			{({ rules }) => (
				<div className="fui:flex fui:h-full fui:items-center fui:gap-2">
					<DonutChart
						className="fui:min-w-0 fui:flex-1"
						data={[
							{
								label: "Effective now",
								value: rules.active,
								color: "var(--success)",
							},
							{
								label: "Scheduled",
								value: rules.scheduled,
								color: "var(--chart-2)",
							},
						]}
						value={rules.active + rules.scheduled}
						caption="rules"
					/>
					{/* Disabled rules overlap the two slices, so they are read out
					    beside the donut rather than drawn as a third one. */}
					<DescriptionList
						layout="stacked"
						className="fui:shrink-0 fui:pr-2 fui:text-xs"
					>
						{[
							["Effective now", rules.active],
							["Scheduled", rules.scheduled],
							["Disabled", rules.disabled],
						].map(([label, value]) => (
							<DescriptionListItem key={label}>
								<DescriptionListTerm>{label}</DescriptionListTerm>
								<DescriptionListDetails className="fui:text-base fui:font-medium fui:tabular-nums">
									{value}
								</DescriptionListDetails>
							</DescriptionListItem>
						))}
					</DescriptionList>
				</div>
			)}
		</DashboardTile>
	);
}

export {
	ErrorCategoriesTile,
	OnlineShareTile,
	PriceRulesTile,
	ProjectionsTile,
	ready,
	type Summary,
	summary,
	TileLink,
};
