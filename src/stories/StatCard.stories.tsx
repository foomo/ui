import {
	ChartBarIcon,
	PackageIcon,
	StackIcon,
	TagIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { StatCard, StatCardRow } from "../components/stat-card";

const catalogue = [
	{ label: "Products", value: 12438 },
	{ label: "Variants", value: 41207 },
	{ label: "Listing items", value: 41207 },
	{ label: "Index items", value: 41207 },
	{ label: "PDP entries", value: 41207 },
	{ label: "JSON-LD entries", value: 41207 },
];

const origins = [
	{ key: "all", label: "Attributes", value: 214 },
	{ key: "system", label: "System-generated", value: 4 },
	{ key: "pim", label: "PIM-managed", value: 210 },
] as const;

function FilterCards() {
	const [origin, setOrigin] =
		React.useState<(typeof origins)[number]["key"]>("all");

	return (
		<StatCardRow>
			{origins.map((entry) => (
				<StatCard
					key={entry.key}
					size="sm"
					label={entry.label}
					value={entry.value}
					active={origin === entry.key}
					onClick={() =>
						setOrigin(
							origin === entry.key && entry.key !== "all" ? "all" : entry.key,
						)
					}
				/>
			))}
		</StatCardRow>
	);
}

const meta = {
	title: "Data Display/Stat Card",
	component: StatCard,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Key figures on cards in two sizes, laid out by `StatCardRow`. With `onClick` a card becomes a filter button and `active` marks the selected one.",
			},
		},
	},
	tags: ["autodocs"],
	args: { label: "Products", value: 12438 },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<StatCardRow>
			{catalogue.slice(0, 4).map((entry) => (
				<StatCard key={entry.label} label={entry.label} value={entry.value} />
			))}
		</StatCardRow>
	),
};

export const WithIcons: Story = {
	name: "With icons",
	render: () => (
		<StatCardRow>
			<StatCard label="Products" value={12438} icon={PackageIcon} />
			<StatCard label="Variants" value={41207} icon={StackIcon} />
			<StatCard label="Campaigns" value={58} icon={TagIcon} />
			<StatCard label="Price rules" value={1204} icon={ChartBarIcon} />
		</StatCardRow>
	),
};

export const Compact: Story = {
	render: () => (
		<StatCardRow>
			{catalogue.map((entry) => (
				<StatCard
					key={entry.label}
					size="sm"
					label={entry.label}
					value={entry.value}
				/>
			))}
		</StatCardRow>
	),
};

export const AsFilter: Story = {
	name: "As filter",
	render: () => <FilterCards />,
};
