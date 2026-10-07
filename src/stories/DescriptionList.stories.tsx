import { CheckCircleIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
} from "../components/description-list";

type Detail = { label: string; value?: React.ReactNode };

const details: Detail[] = [
	{ label: "ID", value: "price-001" },
	{ label: "SKU", value: "SKU-12345" },
	{
		label: "Supplier",
		value: (
			<a
				href="#supplier-001"
				className="fui:text-link fui:underline fui:underline-offset-2 fui:hover:no-underline"
			>
				Manor AG (supplier-001)
			</a>
		),
	},
	{ label: "Reference unit", value: "500 g" },
	{ label: "Valid from", value: "20.04.2025, 02:00" },
	{ label: "Valid until", value: "19.06.2025, 02:00" },
	{
		label: "Discountable",
		value: (
			<Badge variant="success">
				<CheckCircleIcon data-icon="inline-start" />
				Yes
			</Badge>
		),
	},
];

// Prices from one supplier, where not every field is set.
const supplierPrices: Detail[] = [
	{ label: "Amount", value: "CHF 12.90" },
	{ label: "Cross amount" },
	{ label: "Suggested amount" },
	{ label: "Recent best amount", value: "CHF 19.90" },
];

function Details({ items }: { items: Detail[] }) {
	return (
		<DescriptionList>
			{items.map((item) => (
				<DescriptionListItem key={item.label}>
					<DescriptionListTerm>{item.label}</DescriptionListTerm>
					<DescriptionListDetails className="fui:tabular-nums">
						{item.value}
					</DescriptionListDetails>
				</DescriptionListItem>
			))}
		</DescriptionList>
	);
}

/**
 * The list on its own, then in cards side by side as on a detail page. Empty
 * values show a dash.
 */
function DescriptionListGallery() {
	return (
		<div className="fui:flex fui:flex-col fui:gap-10">
			<section className="fui:flex fui:max-w-2xl fui:flex-col fui:gap-3">
				<h3 className="fui:text-sm fui:font-medium">On its own</h3>
				<Details items={details} />
			</section>

			<section className="fui:flex fui:flex-col fui:gap-3">
				<h3 className="fui:text-sm fui:font-medium">In cards</h3>
				<div className="fui:grid fui:gap-6 fui:lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Details</CardTitle>
						</CardHeader>
						<CardContent>
							<Details items={details} />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Prices (Manor AG)</CardTitle>
						</CardHeader>
						<CardContent>
							<Details items={supplierPrices} />
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}

const meta = {
	title: "Data Display/Description List",
	component: DescriptionListGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Label and value pairs in rows, for the details of one record. Compose `DescriptionList` with a `DescriptionListItem` per row, holding a `DescriptionListTerm` and a `DescriptionListDetails`. An empty value shows the same dash as an empty table cell. Rows stack on narrow screens and sit side by side from `sm` up.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DescriptionListGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
