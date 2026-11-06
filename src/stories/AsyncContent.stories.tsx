import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";

import { AsyncContent } from "../components/async-content";
import {
	DescriptionList,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
} from "../components/description-list";

type Brand = { id: string; name: string };

function BrandDetails({ brand }: { brand: Brand }) {
	return (
		<DescriptionList>
			<DescriptionListItem>
				<DescriptionListTerm>ID</DescriptionListTerm>
				<DescriptionListDetails>{brand.id}</DescriptionListDetails>
			</DescriptionListItem>
			<DescriptionListItem>
				<DescriptionListTerm>Name</DescriptionListTerm>
				<DescriptionListDetails>{brand.name}</DescriptionListDetails>
			</DescriptionListItem>
		</DescriptionList>
	);
}

function State({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<section className="fui:flex fui:flex-col fui:gap-2">
			<h3 className="fui:text-xs fui:font-medium fui:text-muted-foreground">
				{label}
			</h3>
			{children}
		</section>
	);
}

function AsyncContentGallery() {
	return (
		<div className="fui:flex fui:max-w-xl fui:flex-col fui:gap-8">
			<State label="Loading">
				<AsyncContent<Brand>
					loading
					data={undefined}
					notFound="Brand not found."
				>
					{(brand) => <BrandDetails brand={brand} />}
				</AsyncContent>
			</State>
			<State label="Error">
				<AsyncContent<Brand>
					error="Failed to load brands. Please try again later."
					data={undefined}
					notFound="Brand not found."
				>
					{(brand) => <BrandDetails brand={brand} />}
				</AsyncContent>
			</State>
			<State label="Not found">
				<AsyncContent<Brand> data={undefined} notFound="Brand not found.">
					{(brand) => <BrandDetails brand={brand} />}
				</AsyncContent>
			</State>
			<State label="Loaded">
				<AsyncContent
					data={{ id: "BRAND-0042", name: "Northwind" }}
					notFound="Brand not found."
				>
					{(brand) => <BrandDetails brand={brand} />}
				</AsyncContent>
			</State>
		</div>
	);
}

const meta = {
	title: "Overlays and Feedback/Async Content",
	component: AsyncContentGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					'Content that has to be fetched first, such as the record on a detail page. `AsyncContent` shows a spinner with "Loading…" while `loading`, the `error` message in a destructive `Alert` when loading failed, the muted `notFound` text when the request worked but `data` is empty, and otherwise calls `children` with the data, `null` and `undefined` ruled out. A missing record is not an error, so it is not red. For a dashboard tile, `DashboardTile` handles the same states in a card of fixed height.',
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AsyncContentGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
