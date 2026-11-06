import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
} from "../components/description-list";
import { JsonDetails, JsonView, RawViewPanel } from "../components/json-view";

const campaign = {
	id: "CAMP-001",
	name: "Summer Sale 2026",
	active: true,
	firstDayOfSale: "2026-05-10T02:00:00Z",
	lastDayOfSale: null,
	discounts: [
		{
			offerId: "OFF-1001",
			type: "percentage",
			value: 20,
			tiers: [
				{ minQuantity: 1, value: 20 },
				{ minQuantity: 3, value: 30 },
			],
		},
		{ offerId: "OFF-1002", type: "fixed", value: 5, tiers: [] },
	],
	override: { isActive: false, validFrom: null },
};

const meta = {
	title: "Data Display/JSON View",
	component: JsonView,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					'Raw payloads. `JsonView` is a collapsible tree with "Expand all" and "Collapse all"; the first `defaultExpandedLevels` levels start open, and `empty` shows when there is no value. `RawViewPanel` puts a "Raw JSON" switch over a formatted view that swaps it for its payload; `RawViewSwitch` is that switch on its own, for a page that holds the state. `JsonDetails` is a labelled, collapsed block with the value pretty-printed as text.',
			},
		},
	},
	tags: ["autodocs"],
	args: { value: campaign },
} satisfies Meta<typeof JsonView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
	args: { value: null },
};

/** A formatted view, with the switch to the payload behind it. */
export const WithRawSwitch: Story = {
	name: "Raw view switch",
	render: () => (
		<div className="fui:max-w-2xl">
			<RawViewPanel data={campaign}>
				<DescriptionList>
					<DescriptionListItem>
						<DescriptionListTerm>Campaign ID</DescriptionListTerm>
						<DescriptionListDetails>{campaign.id}</DescriptionListDetails>
					</DescriptionListItem>
					<DescriptionListItem>
						<DescriptionListTerm>Name</DescriptionListTerm>
						<DescriptionListDetails>{campaign.name}</DescriptionListDetails>
					</DescriptionListItem>
					<DescriptionListItem>
						<DescriptionListTerm>Discounts</DescriptionListTerm>
						<DescriptionListDetails>
							{campaign.discounts.length}
						</DescriptionListDetails>
					</DescriptionListItem>
				</DescriptionList>
			</RawViewPanel>
		</div>
	),
};

/** Stored documents, each collapsed under its label. */
export const Details: Story = {
	name: "JSON details",
	render: () => (
		<div className="fui:flex fui:max-w-2xl fui:flex-col fui:gap-2">
			<JsonDetails label="campaign" value={campaign} />
			<JsonDetails label="discounts" value={campaign.discounts} />
		</div>
	),
};
