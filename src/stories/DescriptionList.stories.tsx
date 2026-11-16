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
				Acme Supply (supplier-001)
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

const supplierPrices: Detail[] = [
	{ label: "Amount", value: "EUR 12.90" },
	{ label: "Cross amount" },
	{ label: "Suggested amount" },
	{ label: "Recent best amount", value: "EUR 19.90" },
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
							<CardTitle>Prices (Acme Supply)</CardTitle>
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
					"Label and value pairs for the details of one record, with `inline`, `grid` and `stacked` compact layouts. Empty values show a dash.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DescriptionListGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const summary: Detail[] = [
	{ label: "Effective now", value: 42 },
	{ label: "Scheduled", value: 11 },
	{ label: "Disabled", value: 5 },
	{ label: "Next to start", value: "15.10.2026, 16:05" },
	{ label: "Next to end" },
];

const variantAttributes: Detail[] = [
	{ label: "Colour", value: "Navy" },
	{ label: "Size", value: "M" },
	{ label: "Fit", value: "Regular" },
];

function CompactLists({
	layout,
	items,
	className,
}: {
	layout: "inline" | "grid" | "stacked";
	items: Detail[];
	className?: string;
}) {
	return (
		<DescriptionList layout={layout} className={className}>
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
 * `inline` as a summary line above a table, `grid` in a table cell, `stacked`
 * beside a chart.
 */
export const CompactLayouts: Story = {
	name: "Compact layouts",
	render: () => (
		<div className="fui:flex fui:max-w-2xl fui:flex-col fui:gap-10">
			<section className="fui:flex fui:flex-col fui:gap-3">
				<h3 className="fui:text-sm fui:font-medium">Inline</h3>
				<CompactLists layout="inline" items={summary} className="fui:text-sm" />
			</section>
			<section className="fui:flex fui:flex-col fui:gap-3">
				<h3 className="fui:text-sm fui:font-medium">Grid</h3>
				<CompactLists
					layout="grid"
					items={variantAttributes}
					className="fui:w-fit fui:text-sm"
				/>
			</section>
			<section className="fui:flex fui:flex-col fui:gap-3">
				<h3 className="fui:text-sm fui:font-medium">Stacked</h3>
				<CompactLists
					layout="stacked"
					items={summary.slice(0, 3)}
					className="fui:text-xs"
				/>
			</section>
		</div>
	),
};
