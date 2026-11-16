import { TrashIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "../components/button";
import { ConfirmDialog } from "../components/confirm-dialog";
import { Field, FieldLabel } from "../components/field";
import { Input } from "../components/input";
import { Toaster } from "../components/sonner";

function pretendRequest(fail = false) {
	return new Promise<void>((resolve, reject) =>
		setTimeout(
			() =>
				fail
					? reject(new Error("The catalogue service did not respond."))
					: resolve(),
			800,
		),
	);
}

const meta = {
	title: "Overlays and Feedback/Confirm Dialog",
	component: ConfirmDialog,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A dialog that confirms an action before it runs, with async `onConfirm`, a pending state and the error shown inline. Variants cover a double confirmation and a confirmation that needs input first.",
			},
		},
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<>
				<Story />
				<Toaster />
			</>
		),
	],
	args: {
		trigger: (
			<Button variant="destructive" size="sm">
				<TrashIcon />
				Delete
			</Button>
		),
		title: "Delete product",
		description:
			"Permanently remove product PROD-001. This action cannot be undone.",
		confirmLabel: "Delete",
		pendingLabel: "Deleting…",
		onConfirm: async () => {
			await pretendRequest();
			toast.success("Product PROD-001 deleted.");
		},
	},
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ConfirmTwice: Story = {
	name: "Confirm twice",
	args: { confirmTwice: true },
};

export const Failing: Story = {
	args: {
		onConfirm: () => pretendRequest(true),
		errorMessage: (error) =>
			`Failed to delete product. ${error instanceof Error ? error.message : ""}`,
	},
};

function CleanupDialog() {
	const [olderThan, setOlderThan] = React.useState("");

	return (
		<ConfirmDialog
			trigger={
				<Button>
					<TrashIcon />
					Cleanup products
				</Button>
			}
			title="Cleanup products"
			description="Permanently remove products that have not been updated since the selected date. This action cannot be undone."
			confirmLabel="Clean"
			confirmTwice
			confirmDisabled={!olderThan}
			onOpenChange={(open) => {
				if (!open) setOlderThan("");
			}}
			onConfirm={async () => {
				await pretendRequest();
				toast.success(`Removed 12 products not updated since ${olderThan}.`);
			}}
		>
			{({ armed, running }) => (
				<Field className="fui:w-auto">
					<FieldLabel>Older than</FieldLabel>
					<Input
						type="date"
						className="fui:w-48"
						value={olderThan}
						disabled={armed || running}
						onChange={(event) => setOlderThan(event.target.value)}
					/>
				</Field>
			)}
		</ConfirmDialog>
	);
}

export const WithAField: Story = {
	name: "With a field",
	render: () => <CleanupDialog />,
};

export const NotDestructive: Story = {
	name: "Not destructive",
	args: {
		trigger: <Button size="sm">Simulate</Button>,
		title: "Continue as this customer?",
		description:
			"You will be signed in as customer-guest and see their basket. Your own session is restored when you exit via the banner in the shop.",
		confirmLabel: "Continue",
		pendingLabel: undefined,
		destructive: false,
		onConfirm: async () => {
			toast("Continuing as customer-guest.");
		},
	},
};
