import { cn } from "cn";
import * as React from "react";
import { JsonView as JsonTree } from "react-json-view-lite";

import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";

/**
 * The tree's look, from the theme's tokens rather than the library's own
 * stylesheet, so it follows dark mode and needs no extra CSS import.
 *
 * Two punctuation marks in a row (`},`) drop the gap between them; the
 * `fui-json-punctuation` marker class carries no styles of its own and only
 * lets the second mark find the first.
 */
const punctuation =
	"fui-json-punctuation fui:mr-1.5 fui:font-bold fui:[.fui-json-punctuation+&]:-ml-1.5";
const label = "fui:mr-1.5 fui:font-semibold";
const expander =
	"fui:mr-1.5 fui:cursor-pointer fui:text-[1.2em] fui:select-none";

const treeStyle: React.ComponentProps<typeof JsonTree>["style"] = {
	container:
		"fui:rounded-md fui:bg-muted fui:py-1 fui:leading-[1.2] fui:whitespace-pre-wrap fui:break-words fui:text-foreground",
	basicChildStyle: "fui:m-0 fui:px-2.5",
	childFieldsContainer: "fui:m-0 fui:list-none fui:p-0",
	label,
	clickableLabel: cn(label, "fui:cursor-pointer"),
	nullValue: "fui:text-destructive",
	undefinedValue: "fui:text-destructive",
	stringValue: "fui:text-foreground",
	numberValue: "fui:text-link",
	booleanValue: "fui:text-success",
	otherValue: "fui:text-muted-foreground",
	punctuation,
	expandIcon: cn(expander, "fui:after:content-['▸']"),
	collapseIcon: cn(expander, "fui:after:content-['▾']"),
	collapsedContent:
		"fui:mr-1.5 fui:cursor-pointer fui:after:text-[0.8em] fui:after:content-['...']",
	noQuotesForStringValues: false,
	quotesForFieldNames: false,
	stringifyStringValues: false,
	ariaLables: { collapseJson: "Collapse JSON", expandJson: "Expand JSON" },
};

type TreeView = { nonce: number; expandAll: boolean | null };

/**
 * The state behind "Expand all" and "Collapse all". The tree keeps each node's
 * open state itself, so bumping the nonce remounts it: that is what lets the
 * two buttons override whatever was toggled by hand.
 */
function useTreeView() {
	const [view, setView] = React.useState<TreeView>({
		nonce: 0,
		expandAll: null,
	});
	const setExpandAll = (expandAll: boolean) =>
		setView((current) => ({ nonce: current.nonce + 1, expandAll }));
	return { view, setExpandAll };
}

function TreeControls({
	onExpandAll,
}: {
	onExpandAll: (expandAll: boolean) => void;
}) {
	// Never disabled: after expanding everything, single nodes can still be
	// closed by hand, and the reset is still wanted.
	return (
		<>
			<Button variant="link" size="sm" onClick={() => onExpandAll(true)}>
				Expand all
			</Button>
			<Button variant="link" size="sm" onClick={() => onExpandAll(false)}>
				Collapse all
			</Button>
		</>
	);
}

function Tree({
	value,
	view,
	defaultExpandedLevels,
}: {
	value: object;
	view: TreeView;
	defaultExpandedLevels: number;
}) {
	return (
		<div className="fui:font-mono fui:text-xs">
			<JsonTree
				key={view.nonce}
				data={value}
				style={treeStyle}
				// "Collapse all" keeps the root open; otherwise the whole payload
				// shrinks to one unusable `{…}` line.
				shouldExpandNode={(level) =>
					view.expandAll === null
						? level < defaultExpandedLevels
						: view.expandAll || level < 1
				}
				clickToExpandNode
			/>
		</div>
	);
}

function TreeEmpty({ children }: { children: React.ReactNode }) {
	return <p className="fui:text-sm fui:text-muted-foreground">{children}</p>;
}

/**
 * A collapsible tree of a JSON payload, such as an API response, with "Expand
 * all" and "Collapse all" above it. The first `defaultExpandedLevels` levels
 * start open (the root and its fields, by default); deeper nodes stay closed,
 * so a large payload stays scannable. Nodes open and close by click or with
 * the arrow keys.
 *
 * Shows `empty` when there is no `value`. `actions` sit at the end of the row
 * above the tree.
 */
function JsonView({
	value,
	empty = "No data.",
	defaultExpandedLevels = 2,
	actions,
	className,
}: {
	value: object | null | undefined;
	empty?: React.ReactNode;
	defaultExpandedLevels?: number;
	actions?: React.ReactNode;
	className?: string;
}) {
	const { view, setExpandAll } = useTreeView();

	return (
		<div
			data-slot="json-view"
			className={cn("fui:flex fui:flex-col fui:gap-2", className)}
		>
			{value || actions ? (
				<div className="fui:flex fui:items-center fui:gap-2">
					{value ? <TreeControls onExpandAll={setExpandAll} /> : null}
					{actions ? <div className="fui:ml-auto">{actions}</div> : null}
				</div>
			) : null}
			{value ? (
				<Tree
					value={value}
					view={view}
					defaultExpandedLevels={defaultExpandedLevels}
				/>
			) : (
				<TreeEmpty>{empty}</TreeEmpty>
			)}
		</div>
	);
}

/**
 * The switch between a formatted view and the raw JSON behind it, labelled
 * "Raw JSON" by default. Use it on its own where the page holds the state,
 * such as one switch for every tab of a tabbed view; otherwise use
 * `RawViewPanel`.
 */
function RawViewSwitch({
	checked,
	onCheckedChange,
	label = "Raw JSON",
	className,
}: {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	label?: React.ReactNode;
	className?: string;
}) {
	const id = React.useId();

	return (
		<div
			data-slot="raw-view-switch"
			className={cn("fui:flex fui:items-center fui:gap-2", className)}
		>
			<Label
				htmlFor={id}
				className="fui:cursor-pointer fui:font-normal fui:leading-normal fui:whitespace-nowrap"
			>
				{label}
			</Label>
			<Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
		</div>
	);
}

/**
 * A formatted view with a "Raw JSON" switch above it that swaps the view for
 * the payload it was built from. With the raw view on, the switch shares a
 * row with the tree's "Expand all" and "Collapse all".
 *
 * The switch keeps its place in both views, so it keeps focus when toggled
 * from the keyboard.
 */
function RawViewPanel({
	data,
	empty = "No data.",
	children,
	className,
}: {
	data: object | null | undefined;
	empty?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) {
	const [showRaw, setShowRaw] = React.useState(false);
	const { view, setExpandAll } = useTreeView();

	return (
		<div
			data-slot="raw-view-panel"
			className={cn(
				"fui:flex fui:flex-col",
				showRaw ? "fui:gap-2" : "fui:gap-4",
				className,
			)}
		>
			<div className="fui:flex fui:items-center fui:gap-2">
				{showRaw && data ? <TreeControls onExpandAll={setExpandAll} /> : null}
				<div className="fui:ml-auto">
					<RawViewSwitch checked={showRaw} onCheckedChange={setShowRaw} />
				</div>
			</div>
			{!showRaw ? (
				children
			) : data ? (
				<Tree value={data} view={view} defaultExpandedLevels={2} />
			) : (
				<TreeEmpty>{empty}</TreeEmpty>
			)}
		</div>
	);
}

/**
 * A labelled, collapsed block with a value's JSON, pretty-printed as text: for
 * a stored document shown as is, where finding a string on the page matters
 * more than folding the structure. Opens and closes by its label.
 */
function JsonDetails({
	label,
	value,
	className,
}: {
	label: React.ReactNode;
	value: unknown;
	className?: string;
}) {
	return (
		<details
			data-slot="json-details"
			className={cn("fui:rounded-md fui:border fui:bg-card", className)}
		>
			<summary className="fui:cursor-pointer fui:px-3 fui:py-2 fui:text-sm fui:font-medium fui:select-none">
				{label}
			</summary>
			<pre className="fui:overflow-x-auto fui:border-t fui:px-3 fui:py-2 fui:text-xs fui:leading-relaxed">
				{JSON.stringify(value, null, 2)}
			</pre>
		</details>
	);
}

export { JsonDetails, JsonView, RawViewPanel, RawViewSwitch };
