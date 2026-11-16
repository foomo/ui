import {
	CheckCircleIcon,
	InfoIcon,
	WarningIcon,
	WarningOctagonIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { toast } from "sonner";

import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "../components/alert";
import { Button } from "../components/button";
import { Toaster } from "../components/sonner";
import { Spinner } from "../components/spinner";
import { useErrorToast } from "../hooks/use-error-toast";

function recalculate() {
	return new Promise<void>((resolve) => setTimeout(resolve, 1500));
}

function FeedbackGallery() {
	return (
		<div className="fui:flex fui:flex-col fui:gap-10">
			<Section
				title="Toast"
				description="The outcome of an action, in a corner of the screen. It does not interrupt and closes by itself. Render one Toaster per app and call toast() from anywhere."
			>
				<div className="fui:flex fui:flex-wrap fui:gap-3">
					<Button
						variant="outline"
						onClick={() => toast.success("Recalculation was successful")}
					>
						Success
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.error("Recalculation failed", {
								description: "The supplier price list could not be reached.",
							})
						}
					>
						Error
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.warning("Recalculated with missing data", {
								description: "3 products have no reference unit.",
							})
						}
					>
						Alert
					</Button>
					<Button
						variant="outline"
						onClick={() => toast.info("A new price list is available")}
					>
						Info
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast("price-001 archived", {
								action: { label: "Undo", onClick: () => {} },
							})
						}
					>
						With an action
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.promise(recalculate(), {
								loading: "Recalculating…",
								success: "Recalculation was successful",
								error: "Recalculation failed",
							})
						}
					>
						Loading, then success
					</Button>
				</div>
			</Section>

			<Section
				title="Alert"
				description="A message that belongs to the page and stays there, like a notice above a listing or an error above a form. The status variants match the toasts and badges."
			>
				<div className="fui:flex fui:max-w-xl fui:flex-col fui:gap-4">
					<Alert>
						<InfoIcon />
						<AlertTitle>Prices are recalculated every night</AlertTitle>
						<AlertDescription>
							Changes made today show in the webshop tomorrow morning.
						</AlertDescription>
					</Alert>
					<Alert variant="success">
						<CheckCircleIcon />
						<AlertTitle>All prices are up to date</AlertTitle>
						<AlertDescription>
							Last recalculated today at 02:00.
						</AlertDescription>
					</Alert>
					<Alert variant="alert">
						<WarningIcon />
						<AlertTitle>3 products have no reference unit</AlertTitle>
						<AlertDescription>
							Their reference amount is left out until a unit is set.
						</AlertDescription>
					</Alert>
					<Alert variant="destructive">
						<WarningOctagonIcon />
						<AlertTitle>The price could not be saved</AlertTitle>
						<AlertDescription>
							Valid until must be after valid from.
						</AlertDescription>
					</Alert>
					<Alert variant="info">
						<InfoIcon />
						<AlertTitle>A new price list is available</AlertTitle>
						<AlertDescription>
							Imported from Acme Supply at 02:00.
						</AlertDescription>
						<AlertAction>
							<Button size="sm" variant="outline">
								Review
							</Button>
						</AlertAction>
					</Alert>
				</div>
			</Section>

			<Section
				title="Spinner"
				description="Something is still running. In a button, it replaces the icon and the button is disabled until the action settles."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-6">
					<Spinner />
					<Spinner className="fui:size-6 fui:text-muted-foreground" />
					<Button disabled>
						<Spinner data-icon="inline-start" />
						Recalculating…
					</Button>
					<div className="fui:flex fui:items-center fui:gap-2 fui:text-sm fui:text-muted-foreground">
						<Spinner />
						Loading prices…
					</div>
				</div>
			</Section>

			<Toaster />
		</div>
	);
}

function Section({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<section className="fui:flex fui:flex-col fui:gap-4">
			<div className="fui:flex fui:flex-col fui:gap-1">
				<h3 className="fui:text-sm fui:font-medium">{title}</h3>
				<p className="fui:text-sm fui:text-muted-foreground">{description}</p>
			</div>
			{children}
		</section>
	);
}

const meta = {
	title: "Overlays and Feedback/Feedback",
	component: FeedbackGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Toasts for the outcome of an action, alerts for messages that belong to the page, and a spinner for work in progress.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof FeedbackGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function ErrorToastDemo() {
	const [state, setState] = React.useState<
		"idle" | "loading" | "failed" | "loaded"
	>("idle");

	useErrorToast(
		state === "failed",
		"Failed to load prices. Please try again later.",
	);

	const load = (fail: boolean) => {
		setState("loading");
		setTimeout(() => setState(fail ? "failed" : "loaded"), 600);
	};

	return (
		<div className="fui:flex fui:flex-col fui:gap-4">
			<div className="fui:flex fui:gap-2">
				<Button variant="outline" onClick={() => load(true)}>
					Load, failing
				</Button>
				<Button variant="outline" onClick={() => load(false)}>
					Load
				</Button>
			</div>
			<p className="fui:text-sm fui:text-muted-foreground">State: {state}</p>
			<Toaster />
		</div>
	);
}

export const ErrorToast: Story = {
	name: "Error toast (useErrorToast)",
	parameters: {
		docs: {
			description: {
				story:
					"`useErrorToast(error, message)` shows one error toast each time `error` turns truthy.",
			},
		},
	},
	render: () => <ErrorToastDemo />,
};
