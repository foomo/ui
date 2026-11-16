import { PencilSimpleIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../components/button";
import {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
} from "../components/description-list";
import { SectionCard, SectionCardGrid } from "../components/section-card";
import { formatDateTime, formatYesNo } from "../lib/format";

type Detail = { label: string; value?: string };

function Details({ items }: { items: Detail[] }) {
	return (
		<DescriptionList>
			{items.map((item) => (
				<DescriptionListItem key={item.label}>
					<DescriptionListTerm>{item.label}</DescriptionListTerm>
					<DescriptionListDetails>{item.value}</DescriptionListDetails>
				</DescriptionListItem>
			))}
		</DescriptionList>
	);
}

const discount: Detail[] = [
	{ label: "Offer ID", value: "DO0125581" },
	{ label: "Name", value: "Autumn knitwear -20%" },
	{ label: "Valid from", value: formatDateTime("2026-10-01T00:00:00") },
	{ label: "Valid to", value: formatDateTime("2026-10-31T23:59:59") },
	{ label: "Active", value: formatYesNo(true) },
	{ label: "Coupon required", value: formatYesNo(false) },
];

const override: Detail[] = [
	{ label: "Valid from", value: formatDateTime("2026-10-05T00:00:00") },
	{ label: "Valid to" },
	{ label: "Active", value: formatYesNo(null) },
];

const campaign: Detail[] = [
	{ label: "Campaign ID", value: "CMP-1042" },
	{ label: "Name", value: "Autumn 2026" },
	{ label: "Active", value: formatYesNo(true) },
];

function SectionCardGallery() {
	return (
		<SectionCardGrid>
			<SectionCard title="Discount details">
				<Details items={discount} />
			</SectionCard>
			<SectionCard
				title="Discount overrides"
				description="Values set here replace the imported ones."
				action={
					<Button variant="outline" size="sm">
						<PencilSimpleIcon />
						Edit
					</Button>
				}
			>
				<Details items={override} />
			</SectionCard>
			<SectionCard title="Campaign">
				<Details items={campaign} />
			</SectionCard>
		</SectionCardGrid>
	);
}

const meta = {
	title: "Data Display/Section Card",
	component: SectionCardGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Detail-page sections: `SectionCard` holds one aspect of a record, and `SectionCardGrid` lays them out two per row from `lg` up.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof SectionCardGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
