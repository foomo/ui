import * as React from "react";

import { Alert, AlertDescription } from "@/components/alert";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/alert-dialog";
import { Button } from "@/components/button";

type ConfirmDialogState = {
	/** With `confirmTwice`, the first click has been made. */
	armed: boolean;
	running: boolean;
};

/** An async `onConfirm` keeps the dialog open while it runs, and shows the error if it throws. */
function ConfirmDialog({
	trigger,
	nativeButton = true,
	title,
	description,
	children,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	pendingLabel,
	confirmTwice = false,
	destructive = true,
	confirmDisabled = false,
	errorMessage = (error) =>
		error instanceof Error ? error.message : String(error),
	onConfirm,
	onOpenChange,
}: {
	trigger: React.ReactElement;
	/** `false` for a non-`<button>` trigger; a `DropdownMenuItem` trigger also needs `closeOnClick={false}`. */
	nativeButton?: boolean;
	title: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode | ((state: ConfirmDialogState) => React.ReactNode);
	confirmLabel?: React.ReactNode;
	cancelLabel?: React.ReactNode;
	pendingLabel?: React.ReactNode;
	/** Asks for a second click on confirm; a node is that second click's label. */
	confirmTwice?: boolean | React.ReactNode;
	destructive?: boolean;
	confirmDisabled?: boolean;
	errorMessage?: (error: unknown) => React.ReactNode;
	onConfirm: () => unknown | Promise<unknown>;
	onOpenChange?: (open: boolean) => void;
}) {
	const [open, setOpen] = React.useState(false);
	const [armed, setArmed] = React.useState(false);
	const [running, setRunning] = React.useState(false);
	const [error, setError] = React.useState<{ value: unknown } | null>(null);

	const close = () => {
		setOpen(false);
		setArmed(false);
		setError(null);
		onOpenChange?.(false);
	};

	const changeOpen = (next: boolean) => {
		if (running) return;
		if (next) {
			setOpen(true);
			onOpenChange?.(true);
		} else {
			close();
		}
	};

	const confirm = async () => {
		if (confirmTwice && !armed) {
			setArmed(true);
			return;
		}
		setRunning(true);
		setError(null);
		try {
			await onConfirm();
			setRunning(false);
			close();
		} catch (caught) {
			setRunning(false);
			setArmed(false);
			setError({ value: caught });
		}
	};

	const secondLabel =
		typeof confirmTwice === "boolean" ? "Confirm" : confirmTwice;

	return (
		<AlertDialog open={open} onOpenChange={changeOpen}>
			<AlertDialogTrigger render={trigger} nativeButton={nativeButton} />
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description ? (
						<AlertDialogDescription>{description}</AlertDialogDescription>
					) : null}
				</AlertDialogHeader>

				{typeof children === "function"
					? children({ armed, running })
					: children}

				{error ? (
					<Alert variant="destructive">
						<AlertDescription>{errorMessage(error.value)}</AlertDescription>
					</Alert>
				) : null}

				<AlertDialogFooter>
					<Button
						variant="outline"
						disabled={running}
						onClick={() => (armed ? setArmed(false) : changeOpen(false))}
					>
						{cancelLabel}
					</Button>
					<Button
						variant={destructive ? "destructive" : "default"}
						disabled={running || confirmDisabled}
						onClick={confirm}
					>
						{running && pendingLabel
							? pendingLabel
							: armed
								? secondLabel
								: confirmLabel}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export { ConfirmDialog, type ConfirmDialogState };
