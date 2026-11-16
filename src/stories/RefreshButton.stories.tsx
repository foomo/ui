import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { RefreshButton } from "../components/refresh-button";

function RefreshingDemo() {
	const [pending, setPending] = React.useState(false);

	return (
		<RefreshButton
			pending={pending}
			onClick={() => {
				setPending(true);
				setTimeout(() => setPending(false), 1500);
			}}
		/>
	);
}

const meta = {
	title: "Actions/Refresh Button",
	component: RefreshButton,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"An outline refresh button whose arrows spin and which is disabled while `pending`.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof RefreshButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pending: Story = {
	args: { pending: true },
};

export const OnClick: Story = {
	name: "On click",
	render: () => <RefreshingDemo />,
};
