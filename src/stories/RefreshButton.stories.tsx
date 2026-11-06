import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { RefreshButton } from "../components/refresh-button";

/** Refreshes for a moment, so the pending state can be seen. */
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
					"Fetches a page's or a section's data again: a small outline button with the clockwise arrows and \"Refresh\" (or `children`). `pending` disables it, so a second click cannot queue another refresh, and spins its arrows. When a click only marks the data stale and it refetches on its own, pass whether that data is being fetched, so the arrows still spin until it is back.",
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
