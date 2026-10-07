import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../components/alert-dialog";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../components/drawer";
import { Field, FieldGroup, FieldLabel } from "../components/field";
import { Input } from "../components/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/sheet";
import { Textarea } from "../components/textarea";

type Side = "top" | "right" | "bottom" | "left";

/**
 * One trigger per overlay, each labelled with what it is for, so the four can
 * be opened and compared in one place.
 */
function OverlayGallery({
	sheetSide = "right",
	drawerDirection = "bottom",
}: {
	sheetSide?: Side;
	drawerDirection?: Side;
}) {
	return (
		<div className="fui:grid fui:gap-6 fui:sm:grid-cols-2">
			<OverlayCase
				name="Dialog"
				use="A short task that needs a few inputs, like renaming a product."
			>
				<RenameDialog />
			</OverlayCase>
			<OverlayCase
				name="Alert Dialog"
				use="Confirming an action that cannot be undone. Only closes through its buttons."
			>
				<DeleteAlertDialog />
			</OverlayCase>
			<OverlayCase
				name="Sheet"
				use="A detail panel next to the listing, so the table stays in view."
			>
				<DetailSheet side={sheetSide} />
			</OverlayCase>
			<OverlayCase
				name="Drawer"
				use="A panel that can be dragged closed, mainly for touch screens."
			>
				<QuickActionsDrawer direction={drawerDirection} />
			</OverlayCase>
		</div>
	);
}

function OverlayCase({
	name,
	use,
	children,
}: {
	name: string;
	use: string;
	children: React.ReactNode;
}) {
	return (
		<div className="fui:flex fui:flex-col fui:items-start fui:gap-3 fui:rounded-2xl fui:border fui:border-border fui:p-5">
			<div className="fui:flex fui:flex-col fui:gap-1">
				<span className="fui:text-sm fui:font-medium">{name}</span>
				<span className="fui:text-sm fui:text-muted-foreground">{use}</span>
			</div>
			{children}
		</div>
	);
}

function RenameDialog() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Rename product
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename product</DialogTitle>
					<DialogDescription>
						The new name shows in the webshop after the next import.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="rename-name">Name</FieldLabel>
						<Input id="rename-name" defaultValue="Hydra Daily Moisturiser" />
					</Field>
					<Field>
						<FieldLabel htmlFor="rename-note">Note</FieldLabel>
						<Textarea
							id="rename-note"
							placeholder="Why is it changing?"
							rows={3}
						/>
					</Field>
				</FieldGroup>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<DialogClose render={<Button />}>Save</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function DeleteAlertDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="destructive" />}>
				Delete product
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete FB-10422?</AlertDialogTitle>
					<AlertDialogDescription>
						This removes the product and its price history from every channel.
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{/* `AlertDialogAction` is a plain button, so a real caller closes
					    the dialog once its request settles. Here it only closes. */}
					<AlertDialogCancel variant="destructive">
						Delete product
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

const productDetails = [
	["Product ID", "FB-10422"],
	["Brand", "FancyBrand"],
	["Imported", "2 Oct 2026, 14:05"],
	["Price", "€24.90"],
] as const;

function DetailSheet({ side }: { side: Side }) {
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>
				Open details
			</SheetTrigger>
			<SheetContent side={side}>
				<SheetHeader>
					<SheetTitle>Hydra Daily Moisturiser</SheetTitle>
					<SheetDescription>
						Product details, as last imported from the PIM.
					</SheetDescription>
				</SheetHeader>
				<dl className="fui:grid fui:grid-cols-[auto_1fr] fui:gap-x-6 fui:gap-y-3 fui:px-6 fui:text-sm">
					{productDetails.map(([term, value]) => (
						<React.Fragment key={term}>
							<dt className="fui:text-muted-foreground">{term}</dt>
							<dd className="fui:tabular-nums">{value}</dd>
						</React.Fragment>
					))}
					<dt className="fui:text-muted-foreground">Status</dt>
					<dd>
						<Badge variant="success">Active</Badge>
					</dd>
				</dl>
				<SheetFooter>
					<Button>Edit product</Button>
					<SheetClose render={<Button variant="outline" />}>Close</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

function QuickActionsDrawer({ direction }: { direction: Side }) {
	return (
		<Drawer direction={direction}>
			<DrawerTrigger asChild>
				<Button variant="outline">Quick actions</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Quick actions</DrawerTitle>
					<DrawerDescription>
						Applies to the 3 selected products.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button>Mark as discountable</Button>
					<Button variant="outline">Export as CSV</Button>
					<DrawerClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

const meta = {
	title: "Overlays and Feedback/Overlays",
	component: OverlayGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Panels that open over the page: `Dialog` for a short task, `AlertDialog` to confirm something that cannot be undone, `Sheet` for a detail panel beside the listing, and `Drawer` for a panel that can be dragged closed. Each composes a header (title and description), its content and a footer of actions. `side` on `SheetContent` and `direction` on `Drawer` pick the edge it opens from.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		sheetSide: {
			control: "select",
			options: ["right", "left", "top", "bottom"],
		},
		drawerDirection: {
			control: "select",
			options: ["bottom", "right", "left", "top"],
		},
	},
	args: {
		sheetSide: "right",
		drawerDirection: "bottom",
	},
} satisfies Meta<typeof OverlayGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
