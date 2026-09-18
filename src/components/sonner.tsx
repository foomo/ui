"use client";

import {
	CheckCircleIcon,
	InfoIcon,
	SpinnerIcon,
	WarningIcon,
	WarningOctagonIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="fui:toaster fui:group"
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
