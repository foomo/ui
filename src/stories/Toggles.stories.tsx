import {
	ArchiveIcon,
	CaretDownIcon,
	CaretLeftIcon,
	CaretRightIcon,
	DownloadIcon,
	SquaresFourIcon,
	StarIcon,
	TableIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Button } from "../components/button";
import { ButtonGroup, ButtonGroupText } from "../components/button-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Toggle } from "../components/toggle";
import { ToggleGroup, ToggleGroupItem } from "../components/toggle-group";

type Size = "sm" | "default" | "lg";

// Icon-only buttons take the square size matching the text buttons beside them.
const iconSize = { sm: "icon-sm", default: "icon", lg: "icon-lg" } as const;

/**
 * Four controls that look alike, ordered by what a click does: Tabs swap the
 * content, a Toggle Group changes how the same content is shown, a Toggle
 * turns one thing on or off, and a Button Group runs related actions.
 */
function ToggleGallery({ size = "default" }: { size?: Size }) {
	return (
		<div className="fui:flex fui:flex-col fui:gap-10">
			<Section
				title="Tabs"
				description="Swap the content below for a different view of the page. Exactly one tab is always active."
			>
				<PageTabs />
			</Section>

			<Section
				title="Toggle Group"
				description="Change how the same content is shown: a layout, a period. One option stays picked; the content itself stays."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-6">
					<SingleChoice
						size={size}
						label="Layout"
						initial="table"
						spacing={0}
						options={[
							{ value: "table", label: "Table", icon: TableIcon },
							{ value: "grid", label: "Grid", icon: SquaresFourIcon },
						]}
					/>
					<SingleChoice
						size={size}
						label="Period"
						initial="week"
						spacing={0}
						options={[
							{ value: "day", label: "Day" },
							{ value: "week", label: "Week" },
							{ value: "month", label: "Month" },
						]}
					/>
				</div>
			</Section>

			<Section
				title="Toggle"
				description="Turn one thing on or off, like a filter that is either applied or not."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-3">
					<Toggle size={size} variant="outline" aria-label="Starred only">
						<StarIcon />
					</Toggle>
					<Toggle size={size} variant="outline" defaultPressed>
						<ArchiveIcon data-icon="inline-start" />
						Show archived
					</Toggle>
				</div>
			</Section>

			<Section
				title="Button Group"
				description="Related actions joined into one control. Nothing stays pressed: each click does something."
			>
				<div className="fui:flex fui:flex-wrap fui:items-center fui:gap-6">
					<ButtonGroup>
						<Button
							variant="outline"
							size={iconSize[size]}
							aria-label="Previous week"
						>
							<CaretLeftIcon />
						</Button>
						<Button variant="outline" size={size}>
							Today
						</Button>
						<Button
							variant="outline"
							size={iconSize[size]}
							aria-label="Next week"
						>
							<CaretRightIcon />
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button variant="outline" size={size}>
							<DownloadIcon data-icon="inline-start" />
							Export
						</Button>
						<Button
							variant="outline"
							size={iconSize[size]}
							aria-label="Export options"
						>
							<CaretDownIcon />
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<ButtonGroupText>Page</ButtonGroupText>
						<Button variant="outline" size={size}>
							3 of 12
						</Button>
					</ButtonGroup>
				</div>
			</Section>
		</div>
	);
}

function PageTabs() {
	return (
		<Tabs defaultValue="overview">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="reports">Reports</TabsTrigger>
				<TabsTrigger value="audit" disabled>
					Audit
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<Panel>Overview: revenue, orders and stock at a glance.</Panel>
			</TabsContent>
			<TabsContent value="analytics">
				<Panel>Analytics: traffic and conversion over time.</Panel>
			</TabsContent>
			<TabsContent value="reports">
				<Panel>Reports: scheduled exports.</Panel>
			</TabsContent>
		</Tabs>
	);
}

function Panel({ children }: { children: React.ReactNode }) {
	return (
		<div className="fui:w-full fui:max-w-md fui:rounded-xl fui:border fui:border-dashed fui:border-border fui:p-4 fui:text-muted-foreground">
			{children}
		</div>
	);
}

/**
 * A toggle group that always keeps one option picked: clicking the active
 * option again would otherwise leave the group empty.
 */
function SingleChoice({
	label,
	options,
	initial,
	size,
	spacing,
}: {
	label: string;
	options: { value: string; label: string; icon?: React.ElementType }[];
	initial: string;
	size: Size;
	spacing?: number;
}) {
	const [value, setValue] = React.useState([initial]);

	return (
		<ToggleGroup
			aria-label={label}
			variant="outline"
			size={size}
			spacing={spacing}
			value={value}
			onValueChange={(next) => {
				if (next.length > 0) setValue(next);
			}}
		>
			{options.map(({ value: optionValue, label: optionLabel, icon: Icon }) => (
				<ToggleGroupItem key={optionValue} value={optionValue}>
					{Icon ? <Icon data-icon="inline-start" /> : null}
					{optionLabel}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
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
	title: "Actions/Toggles and Tabs",
	component: ToggleGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Controls that look alike but do different things on click. `Tabs` swap the content below. `ToggleGroup` changes how the same content is shown, such as Table / Grid or Day / Week / Month; `spacing={0}` joins its items. `Toggle` turns one thing on or off. `ButtonGroup` joins related actions that keep no state. `size` applies to the toggles and buttons; tabs have one size.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "default", "lg"],
		},
	},
	args: {
		size: "default",
	},
} satisfies Meta<typeof ToggleGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
