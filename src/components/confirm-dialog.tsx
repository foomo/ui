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

/** What a {@link ConfirmDialog}'s body content can react to. */
type ConfirmDialogState = {
	/** `confirmTwice` only: the first click has been made. */
	armed: boolean;
	/** `onConfirm` is running. */
	running: boolean;
};

/**
 * Asks before an action that cannot be taken back (deleting, cleaning up,
 * leaving the app), opened by `trigger`.
 *
 * `onConfirm` may be async. While it runs, the buttons are disabled, the
 * confirm button shows `pendingLabel`, and the dialog cannot be closed. When it
 * resolves the dialog closes; when it throws the dialog stays open and shows
 * the error (via `errorMessage`) in a destructive `Alert`, so the person can
 * try again or cancel.
 *
 * `confirmTwice` asks for a second click on the confirm button, which then
 * reads "Confirm" (or the given label), for actions where one stray click
 * would be costly. Cancel steps back from that second step first.
 *
 * `children` sits between the description and the buttons, e.g. a field the
 * action needs; as a function it gets the dialog's state, to lock the field
 * once the action is armed. `confirmDisabled` holds the confirm button until
 * that input is valid.
 *
 * Set `nativeButton={false}` when `trigger` is not a `<button>`, such as a
 * `DropdownMenuItem` in a row's actions menu, so the trigger gets the button
 * semantics it lacks.
 */
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
	nativeButton?: boolean;
	title: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode | ((state: ConfirmDialogState) => React.ReactNode);
	confirmLabel?: React.ReactNode;
	cancelLabel?: React.ReactNode;
	pendingLabel?: React.ReactNode;
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
		// The dialog cannot be closed while the action is running.
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
