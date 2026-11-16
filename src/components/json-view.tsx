import { cn } from "cn";
import * as React from "react";
import { JsonView as JsonTree } from "react-json-view-lite";

import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";

// Theme tokens instead of the library's stylesheet, so the tree follows dark mode.
// `fui-json-punctuation` is an unstyled marker so a second mark in a row (`},`) drops the gap.
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

// The tree owns each node's open state, so expand/collapse all bump a nonce to remount it.
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
				// "Collapse all" keeps the root open, or the payload shrinks to one `{…}` line.
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

/** A "Raw JSON" switch that swaps `children` for a JSON tree of `data`. */
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

/** Pretty-printed JSON text in a collapsed `<details>`, so the browser's find reaches every string. */
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
