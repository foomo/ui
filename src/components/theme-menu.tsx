import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import {
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/dropdown-menu";

/**
 * The colour schemes an app offers. "System" follows the operating system and
 * is what `next-themes` falls back to before a choice is made.
 */
const themeOptions = [
	{ value: "light", label: "Light", icon: SunIcon },
	{ value: "dark", label: "Dark", icon: MoonIcon },
	{ value: "system", label: "System", icon: MonitorIcon },
] as const;

/**
 * The colour-scheme picker, as radio items for a dropdown menu.
 *
 * The choice goes through `next-themes` rather than a hand-rolled class
 * toggle: `Toaster` reads the same provider, so going through it is what keeps
 * toasts in step with the page. Wrap the app in next-themes' `ThemeProvider`
 * (`attribute="class"`) for the choice to apply.
 *
 * Renders menu items, so it must sit inside a `DropdownMenuContent`.
 */
function ThemeMenuItems() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenuRadioGroup value={theme ?? "system"} onValueChange={setTheme}>
			{themeOptions.map(({ value, label, icon: Icon }) => (
				<DropdownMenuRadioItem key={value} value={value}>
					<Icon />
					{label}
				</DropdownMenuRadioItem>
			))}
		</DropdownMenuRadioGroup>
	);
}

/** {@link ThemeMenuItems} under a group label, ready to drop into a menu. */
function ThemeMenuGroup({ label = "Appearance" }: { label?: string }) {
	return (
		<DropdownMenuGroup>
			<DropdownMenuLabel>{label}</DropdownMenuLabel>
			<ThemeMenuItems />
		</DropdownMenuGroup>
	);
}

/**
 * The icon of the colour scheme in use, for the control that opens the picker,
 * so the current choice shows without opening the menu.
 */
function ThemeIcon({ className }: { className?: string }) {
	const { theme } = useTheme();
	const Icon =
		themeOptions.find((option) => option.value === (theme ?? "system"))?.icon ??
		MonitorIcon;

	return <Icon className={className} aria-hidden />;
}

export { ThemeIcon, ThemeMenuGroup, ThemeMenuItems, themeOptions };
