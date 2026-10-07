import {
	ArrowDownRightIcon,
	ArrowSquareOutIcon,
	ArrowUpRightIcon,
	CheckIcon,
	WarningIcon,
	XIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";

import { Badge } from "../components/badge";

const variants = [
	{ variant: "default", use: "Strongest emphasis, used sparingly" },
	{ variant: "secondary", use: "Neutral counts and trends" },
	{ variant: "outline", use: "Categories, the default for tags" },
	{ variant: "ghost", use: "Quietest, no fill or border" },
	{ variant: "success", use: "A state that really is good" },
	{ variant: "alert", use: "Needs a look, but has not failed" },
	{ variant: "destructive", use: "A state that really is bad" },
	{ variant: "link", use: "Reads as a link" },
] as const;

function BadgeGallery() {
	return (
		<div className="fui:flex fui:flex-col fui:gap-10">
			<Section
				title="Variants"
				description="Pick by meaning: success, alert and destructive only for states that really are good, worth a look, or bad."
			>
				<div className="fui:grid fui:grid-cols-[auto_1fr] fui:items-center fui:gap-x-6 fui:gap-y-3 fui:text-sm">
					{variants.map(({ variant, use }) => (
						<Row key={variant} label={variant} use={use}>
							<Badge variant={variant}>
								{variant[0].toUpperCase() + variant.slice(1)}
							</Badge>
						</Row>
					))}
				</div>
			</Section>

			<Section
				title="With an icon"
				description="Mark the icon with data-icon, so the badge tightens its padding on that side."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-3">
					<Badge variant="success">
						<CheckIcon data-icon="inline-start" />
						Imported
					</Badge>
					<Badge variant="alert">
						<WarningIcon data-icon="inline-start" />
						Needs review
					</Badge>
					<Badge variant="destructive">
						<XIcon data-icon="inline-start" />
						Failed
					</Badge>
					<Badge variant="outline">
						Docs
						<ArrowSquareOutIcon data-icon="inline-end" />
					</Badge>
				</div>
			</Section>

			<Section
				title="Trends and counts"
				description="Beside a figure on a stat card, or after a heading."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-6">
					<div className="fui:flex fui:items-center fui:gap-2">
						<span className="fui:text-2xl fui:font-medium fui:tabular-nums">
							€48,210
						</span>
						<Badge variant="secondary">
							<ArrowUpRightIcon data-icon="inline-start" />
							+12.4%
						</Badge>
					</div>
					<div className="fui:flex fui:items-center fui:gap-2">
						<span className="fui:text-2xl fui:font-medium fui:tabular-nums">
							1,284
						</span>
						<Badge variant="secondary">
							<ArrowDownRightIcon data-icon="inline-start" />
							-3.1%
						</Badge>
					</div>
					<div className="fui:flex fui:items-center fui:gap-2">
						<span className="fui:text-sm fui:font-medium">Notifications</span>
						<Badge variant="secondary">3 new</Badge>
					</div>
				</div>
			</Section>

			<Section
				title="As a link"
				description="Pass render={<a />} to make the whole badge clickable. It gains a hover fill."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-3">
					<Badge
						variant="outline"
						render={(props) => <a href="#brand" {...props} />}
					>
						FancyBrand
					</Badge>
					<Badge
						variant="success"
						render={(props) => <a href="#status" {...props} />}
					>
						Active
					</Badge>
				</div>
			</Section>
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

function Row({
	label,
	use,
	children,
}: {
	label: string;
	use: string;
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="fui:flex">{children}</div>
			<div className="fui:flex fui:gap-3">
				<span className="fui:w-24 fui:text-muted-foreground">{label}</span>
				<span className="fui:text-muted-foreground">{use}</span>
			</div>
		</>
	);
}

const meta = {
	title: "Data Display/Badge",
	component: Badge,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A short label for a state, a category or a count. `variant` sets its meaning: `success`, `alert` and `destructive` for states that are good, worth a look, or bad; `secondary` for neutral counts and trends; `outline` for categories. In tables, use `TagCell` and `StatusTagCell`, which build on it.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: variants.map(({ variant }) => variant),
		},
	},
	args: {
		variant: "default",
		children: "Badge",
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
	parameters: { controls: { disable: true } },
	render: () => <BadgeGallery />,
};

export const Playground: Story = {};
