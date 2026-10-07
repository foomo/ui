import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/table";
import {
	BooleanCell,
	cellLinkClassName,
	EmptyCell,
	IdCell,
	StatusTagCell,
	type StatusTone,
	TagCell,
	type TagColor,
	TagListCell,
} from "../components/table-cells";

type Product = {
	id: string;
	name: string;
	status: "active" | "draft" | "archived";
	tags: string[];
	discountable: boolean | undefined;
	inStock: boolean | undefined;
};

const products: Product[] = [
	{
		id: "BASE-101039267",
		name: "Trail running shoe",
		status: "active",
		tags: ["Outdoor", "Bestseller"],
		discountable: true,
		inStock: true,
	},
	{
		id: "BASE-101039268",
		name: "Merino base layer",
		status: "active",
		tags: ["Apparel"],
		discountable: false,
		inStock: false,
	},
	{
		id: "BASE-101039271",
		name: "Packable rain jacket",
		status: "draft",
		tags: ["Apparel", "Outdoor", "New", "Waterproof"],
		discountable: true,
		inStock: undefined,
	},
	{
		id: "BASE-101039280",
		name: "Hiking poles",
		status: "archived",
		tags: [],
		discountable: undefined,
		inStock: false,
	},
];

const statusVariant = {
	active: "success",
	draft: "secondary",
	archived: "outline",
} as const;

// One stable colour per category, so a tag reads the same in every table.
const tagColor: Record<string, TagColor> = {
	Outdoor: "label-1",
	Apparel: "label-2",
	Bestseller: "label-3",
	New: "label-4",
	Waterproof: "label-5",
};

const meta = {
	title: "Data Display/Table Cells",
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Cell renderers for `DataTable` and `Table`: `BooleanCell`, `TagCell`, `TagListCell`, `IdCell` and `EmptyCell`, plus `cellLinkClassName` for a cell that navigates. `StatusTagCell` renders the default status set (success, destructive, alert, info) with an icon. Tags take a `color` from the tag palette (`label-1` … `label-6`, `success`) for categories that should stay apart at a glance. Values that repeat down a column read as a glyph or a tag rather than a word, and anything shown by shape or color alone also carries text for screen readers.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Product ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Tags</TableHead>
					<TableHead>Discountable</TableHead>
					<TableHead>In stock</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.id}>
						<TableCell>
							<a href={`?product=${product.id}`} className={cellLinkClassName}>
								<IdCell>{product.id}</IdCell>
							</a>
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>
							<TagCell
								variant={statusVariant[product.status]}
								className="fui:capitalize"
							>
								{product.status}
							</TagCell>
						</TableCell>
						<TableCell>
							<TagListCell
								values={product.tags}
								color={(tag) => tagColor[tag]}
							/>
						</TableCell>
						<TableCell>
							<BooleanCell value={product.discountable} label="Discountable" />
						</TableCell>
						<TableCell>
							<BooleanCell
								value={product.inStock}
								label="In stock"
								tone="semantic"
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

const booleanValues = [
	{ label: "True", value: true },
	{ label: "False", value: false },
	{ label: "Unknown", value: undefined },
];

export const Booleans: Story = {
	render: () => (
		<Table className="fui:w-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Value</TableHead>
					<TableHead>tone="neutral"</TableHead>
					<TableHead>tone="semantic"</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{booleanValues.map((row) => (
					<TableRow key={row.label}>
						<TableCell className="fui:text-muted-foreground">
							{row.label}
						</TableCell>
						<TableCell>
							<BooleanCell value={row.value} label="Neutral flag" />
						</TableCell>
						<TableCell>
							<BooleanCell
								value={row.value}
								label="Semantic flag"
								tone="semantic"
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

const tagVariants = [
	"outline",
	"default",
	"secondary",
	"destructive",
	"success",
	"ghost",
] as const;

export const Tags: Story = {
	render: () => (
		<Table className="fui:w-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Variant</TableHead>
					<TableHead>TagCell</TableHead>
					<TableHead>TagListCell</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{tagVariants.map((variant) => (
					<TableRow key={variant}>
						<TableCell className="fui:text-muted-foreground">
							{variant}
						</TableCell>
						<TableCell>
							<TagCell variant={variant}>Outdoor</TagCell>
						</TableCell>
						<TableCell className="fui:max-w-56">
							<TagListCell
								variant={variant}
								values={["Apparel", "Outdoor", "New", "Waterproof"]}
							/>
						</TableCell>
					</TableRow>
				))}
				<TableRow>
					<TableCell className="fui:text-muted-foreground">empty</TableCell>
					<TableCell>
						<TagCell>{""}</TagCell>
					</TableCell>
					<TableCell>
						<TagListCell values={[]} />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

const tagColors: { color: TagColor; example: string }[] = [
	{ color: "label-1", example: "Offer" },
	{ color: "label-2", example: "Multibuy" },
	{ color: "label-3", example: "Mix & match" },
	{ color: "label-4", example: "Threshold" },
	{ color: "label-5", example: "Listing" },
	{ color: "label-6", example: "JSON-LD" },
];

export const TagColors: Story = {
	render: () => (
		<Table className="fui:w-auto">
			<TableHeader>
				<TableRow>
					<TableHead>color</TableHead>
					<TableHead>TagCell</TableHead>
					<TableHead>TagListCell</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{tagColors.map(({ color, example }) => (
					<TableRow key={color}>
						<TableCell className="fui:text-muted-foreground">{color}</TableCell>
						<TableCell>
							<TagCell color={color}>{example}</TagCell>
						</TableCell>
						<TableCell className="fui:max-w-56">
							<TagListCell color={color} values={[example, "Second tag"]} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

const statuses: { status: StatusTone; label: string }[] = [
	{ status: "success", label: "Imported" },
	{ status: "destructive", label: "Failed" },
	{ status: "alert", label: "Needs review" },
	{ status: "info", label: "Resolved" },
];

export const StatusTags: Story = {
	render: () => (
		<Table className="fui:w-auto">
			<TableHeader>
				<TableRow>
					<TableHead>status</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{statuses.map(({ status, label }) => (
					<TableRow key={status}>
						<TableCell className="fui:text-muted-foreground">
							{status}
						</TableCell>
						<TableCell>
							<StatusTagCell status={status}>{label}</StatusTagCell>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

export const Identifiers: Story = {
	render: () => (
		<Table className="fui:w-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Usage</TableHead>
					<TableHead>Cell</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="fui:text-muted-foreground">IdCell</TableCell>
					<TableCell>
						<IdCell>BASE-101039267</IdCell>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="fui:text-muted-foreground">
						Linked, with cellLinkClassName
					</TableCell>
					<TableCell>
						<a href="?product=BASE-101039267" className={cellLinkClassName}>
							<IdCell>BASE-101039267</IdCell>
						</a>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="fui:text-muted-foreground">EmptyCell</TableCell>
					<TableCell>
						<EmptyCell />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};
