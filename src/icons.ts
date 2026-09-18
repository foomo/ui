// Re-export all phosphor icons

// lucide-react exposed its component type as `LucideIcon`; phosphor calls it `Icon`.
export type { Icon as LucideIcon } from "@phosphor-icons/react";
export * from "@phosphor-icons/react";
// Compatibility aliases for consumers written against lucide-react naming.
// Phosphor has no same-named export for these; each alias points at the
// closest phosphor glyph so existing call sites keep resolving.
export {
	ArrowCounterClockwiseIcon as RotateCcwIcon,
	ArrowsClockwiseIcon as RefreshCwIcon,
	CaretDoubleLeftIcon as ChevronsLeftIcon,
	CaretDoubleRightIcon as ChevronsRightIcon,
	CaretDownIcon as ChevronDownIcon,
	CaretLeftIcon as ChevronLeftIcon,
	CaretRightIcon as ChevronRightIcon,
	CaretUpDownIcon as ChevronsUpDownIcon,
	CaretUpIcon as ChevronUpIcon,
	CheckCircleIcon as CircleCheckIcon,
	CircleWavyIcon as BadgeIcon,
	ClockCounterClockwiseIcon as HistoryIcon,
	CloudArrowUpIcon as CloudUploadIcon,
	CubeIcon as BoxesIcon,
	DotsThreeIcon as MoreHorizontalIcon,
	GearIcon as SettingsIcon,
	GridFourIcon as LayoutGridIcon,
	MagnifyingGlassIcon as SearchIcon,
	ScalesIcon as ScaleIcon,
	SealPercentIcon as TicketPercentIcon,
	SidebarSimpleIcon as PanelLeftIcon,
	SpinnerIcon as Loader2Icon,
	SquaresFourIcon as LayoutDashboardIcon,
	StackIcon as LayersIcon,
	TrashIcon as Trash2Icon,
	WarningIcon as TriangleAlertIcon,
	WarningOctagonIcon as OctagonXIcon,
} from "@phosphor-icons/react";
