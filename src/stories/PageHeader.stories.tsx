import { DownloadSimpleIcon, PlusIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../components/button";
import { PageHeader } from "../components/page-header";

const meta = {
	title: "Navigation/Page Header",
	component: PageHeader,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					'The heading of a page: an `h1` title, an optional `description` beneath, and the page\'s own `actions` on the right (a "New …" or a sync trigger, not the controls that filter a listing below). The actions wrap below the title when the row runs out of space.',
			},
		},
	},
	tags: ["autodocs"],
	args: {
		title: "Products",
		description: "Manage product catalog and inventory.",
	},
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
	name: "With actions",
	args: {
		actions: (
			<>
				<Button variant="outline">
					<DownloadSimpleIcon data-icon="inline-start" />
					Export
				</Button>
				<Button>
					<PlusIcon data-icon="inline-start" />
					New product
				</Button>
			</>
		),
	},
};

export const TitleOnly: Story = {
	name: "Title only",
	args: { description: undefined },
};
