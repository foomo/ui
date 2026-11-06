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
					'The way back from a detail page to its list: a small ghost button with a left arrow, pulled left so the arrow lines up with the text edge. Free of any router: pass `onClick` (history back, with the list as a fallback) or `render` (a router link). Name the destination in the label ("Back to products").',
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
