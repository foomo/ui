import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import {
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/dropdown-menu";

const themeOptions = [
	{ value: "light", label: "Light", icon: SunIcon },
	{ value: "dark", label: "Dark", icon: MoonIcon },
	{ value: "system", label: "System", icon: MonitorIcon },
] as const;

/** Needs next-themes' `ThemeProvider` (`attribute="class"`), which `Toaster` reads too. */
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

function ThemeMenuGroup({ label = "Appearance" }: { label?: string }) {
	return (
		<DropdownMenuGroup>
			<DropdownMenuLabel>{label}</DropdownMenuLabel>
			<ThemeMenuItems />
		</DropdownMenuGroup>
	);
}

function ThemeIcon({ className }: { className?: string }) {
	const { theme } = useTheme();
	const Icon =
		themeOptions.find((option) => option.value === (theme ?? "system"))?.icon ??
		MonitorIcon;

	return <Icon className={className} aria-hidden />;
}

export { ThemeIcon, ThemeMenuGroup, ThemeMenuItems, themeOptions };
