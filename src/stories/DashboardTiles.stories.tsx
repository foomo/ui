import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Badge } from "../components/badge";
import { Button } from "../components/button";
import {
	BarListChart,
	type DashboardResource,
	DashboardSection,
	DashboardTile,
} from "../components/dashboard";
import {
	ErrorCategoriesTile,
	OnlineShareTile,
	PriceRulesTile,
	ProjectionsTile,
	ready,
	type Summary,
	summary,
	TileLink,
} from "./admin-tiles";

function OnRequestTile() {
	const [resource, setResource] = React.useState<DashboardResource<Summary>>({
		state: "idle",
	});

	return (
		<DashboardTile
			title="Category index latency"
			description="Loaded on request"
			action={
				resource.state === "idle" ? (
					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							setResource({ state: "loading" });
							setTimeout(() => setResource(ready), 1200);
						}}
					>
						Load
					</Button>
				) : (
					<TileLink>Categories</TileLink>
				)
			}
			resource={resource}
			idle="Not loaded — this one is heavier than the rest."
		>
			{(data) => <BarListChart data={data.projections} dataKey="value" />}
		</DashboardTile>
	);
}

function DashboardKit() {
	return (
		<div className="fui:flex fui:flex-col fui:gap-8">
			<DashboardSection title="Catalogue">
				<OnlineShareTile resource={ready} />
				<ProjectionsTile resource={ready} />
				<ErrorCategoriesTile resource={ready} />
			</DashboardSection>
			<DashboardSection title="Shop output" columns={2}>
				<PriceRulesTile resource={ready} />
				<OnRequestTile />
			</DashboardSection>
		</div>
	);
}

const meta = {
	title: "Data Display/Dashboard",
	component: DashboardKit,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Dashboard building blocks: `DashboardSection`, `DashboardTile` with its loading, error, empty and idle states, `DonutChart` and `BarListChart`.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DashboardKit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every state a tile's data can be in. */
export const TileStates: Story = {
	name: "Tile states",
	render: () => (
		<DashboardSection title="States">
			<OnlineShareTile resource={{ state: "loading" }} />
			<OnlineShareTile
				resource={{ state: "error", message: "Failed to load the summary." }}
			/>
			<OnlineShareTile
				resource={{
					state: "ready",
					data: { ...summary, variants: 0, online: 0 },
				}}
			/>
		</DashboardSection>
	),
};

/** A badge beside the link, as a caveat about the tile's figures. */
export const WithBadge: Story = {
	name: "Action with a badge",
	render: () => (
		<div className="fui:max-w-md">
			<DashboardTile
				title="Campaign load ahead"
				description="Campaigns live per day, next 30 days"
				action={
					<div className="fui:flex fui:items-center fui:gap-1">
						<Badge variant="outline">Lower bound</Badge>
						<TileLink>Campaigns</TileLink>
					</div>
				}
				resource={ready}
				height={160}
			>
				{(data) => <BarListChart data={data.projections} dataKey="value" />}
			</DashboardTile>
		</div>
	),
};
