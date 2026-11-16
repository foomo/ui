import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackButton } from "../components/back-button";
import { PageHeader } from "../components/page-header";

const meta = {
	title: "Navigation/Back Button",
	component: BackButton,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A small ghost button leading from a detail page back to its list. Pass `onClick` or a router link through `render`.",
			},
		},
	},
	tags: ["autodocs"],
	args: {
		children: "Back to products",
	},
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnADetailPage: Story = {
	name: "On a detail page",
	render: (args) => (
		<div className="fui:flex fui:flex-col fui:gap-4">
			<PageHeader title="PROD-001" description="Product details." />
			<BackButton {...args} />
		</div>
	),
};
