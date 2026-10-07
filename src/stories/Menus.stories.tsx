import {
	CopyIcon,
	DotsThreeIcon,
	DownloadIcon,
	PencilIcon,
	TagIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Button } from "../components/button";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "../components/context-menu";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../components/dropdown-menu";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "../components/menubar";

const channels = ["Webshop", "Marketplace", "Outlet"];

/**
 * The three menus side by side, each holding the same kinds of item: a label,
 * items with an icon and a shortcut, a submenu, a checkbox and a destructive
 * item. They share one set of item styles, so they should look alike.
 */
function MenuGallery() {
	return (
		<div className="fui:grid fui:gap-6 fui:lg:grid-cols-3">
			<MenuCase
				name="Dropdown Menu"
				use="Actions for one thing, behind a button. The usual row menu in a table."
			>
				<RowActionsMenu />
			</MenuCase>
			<MenuCase
				name="Context Menu"
				use="The same actions on right-click, as a shortcut for power users. Never the only way in."
			>
				<RowContextMenu />
			</MenuCase>
			<MenuCase
				name="Menubar"
				use="App-level commands grouped into menus along the top of an editor-like screen."
			>
				<EditorMenubar />
			</MenuCase>
		</div>
	);
}

function MenuCase({
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

function RowActionsMenu() {
	const [listed, setListed] = React.useState(true);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="outline" size="icon" aria-label="Actions" />}
			>
				<DotsThreeIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="fui:w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>FB-10422</DropdownMenuLabel>
					<DropdownMenuItem>
						<PencilIcon />
						Edit
						<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CopyIcon />
						Duplicate
						<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<TagIcon />
							Move to channel
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							{channels.map((channel) => (
								<DropdownMenuItem key={channel}>{channel}</DropdownMenuItem>
							))}
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={listed} onCheckedChange={setListed}>
					Listed in webshop
				</DropdownMenuCheckboxItem>
				<DropdownMenuItem disabled>
					<DownloadIcon />
					Export (no data yet)
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<TrashIcon />
					Delete
					<DropdownMenuShortcut>⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function RowContextMenu() {
	const [listed, setListed] = React.useState(true);

	return (
		<ContextMenu>
			<ContextMenuTrigger className="fui:flex fui:h-24 fui:w-full fui:items-center fui:justify-center fui:rounded-xl fui:border fui:border-dashed fui:border-border fui:text-sm fui:text-muted-foreground">
				Right-click here
			</ContextMenuTrigger>
			<ContextMenuContent className="fui:w-56">
				<ContextMenuGroup>
					<ContextMenuLabel>FB-10422</ContextMenuLabel>
					<ContextMenuItem>
						<PencilIcon />
						Edit
						<ContextMenuShortcut>⌘E</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						<CopyIcon />
						Duplicate
						<ContextMenuShortcut>⌘D</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSub>
						<ContextMenuSubTrigger>
							<TagIcon />
							Move to channel
						</ContextMenuSubTrigger>
						<ContextMenuSubContent>
							{channels.map((channel) => (
								<ContextMenuItem key={channel}>{channel}</ContextMenuItem>
							))}
						</ContextMenuSubContent>
					</ContextMenuSub>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuCheckboxItem checked={listed} onCheckedChange={setListed}>
					Listed in webshop
				</ContextMenuCheckboxItem>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">
					<TrashIcon />
					Delete
					<ContextMenuShortcut>⌫</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

function EditorMenubar() {
	const [showPrices, setShowPrices] = React.useState(true);
	const [density, setDensity] = React.useState("comfortable");

	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarItem>
							New product
							<MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Import CSV
							<MenubarShortcut>⌘I</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarItem variant="destructive">Discard changes</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo
						<MenubarShortcut>⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Redo
						<MenubarShortcut>⇧⌘Z</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarCheckboxItem
						checked={showPrices}
						onCheckedChange={setShowPrices}
					>
						Show prices
					</MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarRadioGroup value={density} onValueChange={setDensity}>
						<MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
						<MenubarRadioItem value="compact">Compact</MenubarRadioItem>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}

const meta = {
	title: "Navigation/Menus",
	component: MenuGallery,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Lists of actions that open on demand: `DropdownMenu` behind a button, `ContextMenu` on right-click, and `Menubar` for app-level menus along the top. They share one set of item parts (label, item with icon and shortcut, submenu, checkbox and radio items, separator, and a `destructive` item), so a menu looks the same wherever it opens.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof MenuGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
