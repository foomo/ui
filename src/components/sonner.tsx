import {
	CheckCircleIcon,
	InfoIcon,
	SpinnerIcon,
	WarningIcon,
	WarningOctagonIcon,
} from "@phosphor-icons/react";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Status toasts as a light tint with coloured text, like the matching badges:
 * success, error and warning take `--success`, `--destructive` and `--alert`,
 * info takes the brand blue of `--link`. The tint is mixed into the popover
 * colour rather than laid over it, so a toast stays opaque above the page.
 * The mix is in oklab: in oklch the popover's white counts as hue 0, which
 * pulls every tint towards pink.
 *
 * Sonner reads these variables from its toaster element, where its own theme
 * selector would win on specificity; hence the `!`. The yellow is too light
 * for text on white, so light mode sets alert text in `--alert-foreground`.
 *
 * Literal strings, not built from a template: Tailwind only emits CSS for
 * class names it finds verbatim in the source.
 */
const toneVariables = [
	"fui:[--success-bg:color-mix(in_oklab,var(--success)_10%,var(--popover))]! fui:dark:[--success-bg:color-mix(in_oklab,var(--success)_20%,var(--popover))]! fui:[--success-border:color-mix(in_oklab,var(--success)_25%,var(--popover))]! fui:[--success-text:var(--success)]!",
	"fui:[--error-bg:color-mix(in_oklab,var(--destructive)_10%,var(--popover))]! fui:dark:[--error-bg:color-mix(in_oklab,var(--destructive)_20%,var(--popover))]! fui:[--error-border:color-mix(in_oklab,var(--destructive)_25%,var(--popover))]! fui:[--error-text:var(--destructive)]!",
	"fui:[--warning-bg:color-mix(in_oklab,var(--alert)_15%,var(--popover))]! fui:dark:[--warning-bg:color-mix(in_oklab,var(--alert)_20%,var(--popover))]! fui:[--warning-border:color-mix(in_oklab,var(--alert)_40%,var(--popover))]! fui:[--warning-text:var(--alert-foreground)]! fui:dark:[--warning-text:var(--alert)]!",
	"fui:[--info-bg:color-mix(in_oklab,var(--link)_10%,var(--popover))]! fui:dark:[--info-bg:color-mix(in_oklab,var(--link)_20%,var(--popover))]! fui:[--info-border:color-mix(in_oklab,var(--link)_25%,var(--popover))]! fui:[--info-text:var(--link)]!",
];

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			richColors
			className={cn("fui:toaster fui:group", toneVariables)}
			icons={{
				success: <CheckCircleIcon className="fui:size-4" />,
				info: <InfoIcon className="fui:size-4" />,
				warning: <WarningIcon className="fui:size-4" />,
				error: <WarningOctagonIcon className="fui:size-4" />,
				loading: <SpinnerIcon className="fui:size-4 fui:animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: "cn-toast",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
