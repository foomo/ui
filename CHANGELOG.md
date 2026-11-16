# Changelog

All notable changes to `@foomo/ui` are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 1.3.0-alpha.1 - 2026-11-16

### Fixed

- `SidebarNav` loading rows render the same on the server and the client, so
  server-rendered pages no longer hit a hydration mismatch.

## 1.3.0-alpha.0 - 2026-11-16

### Added

- `AppShell`, `AppHeader`, `AppSidebar`, `SidebarBrand`, `SidebarNav`
  (with `isNavItemActive`) and `SidebarUserMenu` in `components/app-shell`.
- `ThemeMenuItems`, `ThemeMenuGroup` and `ThemeIcon` in `components/theme-menu`.
- `PageHeader`, `BackButton`, `RefreshButton` and `ConfirmDialog` components.
- `SectionCard` and `SectionCardGrid` in `components/section-card`.
- `AsyncContent` for loading, error, not-found and ready states.
- `StatCard` and `StatCardRow` in `components/stat-card`.
- `DescriptionList` with `inline`, `grid` and `stacked` layouts.
- `ItemList` / `ItemListEntry` and `ProgressList` / `ProgressListItem`.
- Dashboard kit: `DashboardSection`, `DashboardTile`, `DashboardTileLink`,
  `DonutChart` and `BarListChart`.
- `JsonView`, `RawViewPanel`, `RawViewSwitch` and `JsonDetails`
  (adds the `react-json-view-lite` dependency).
- `useErrorToast(error, message)` hook.
- `lib/format`: `formatDateTime`, `formatDate`, `formatBytes`, `formatYesNo`
  and `parseDate`.
- `lib/table-state`: `toPaginationState`, `fromPaginationState`,
  `toSortingState` and `fromSortingState(sorting, fields)`, which takes the
  allowed field names and returns `field: undefined` for any other column.
- `DEFAULT_PAGE_SIZE` (50).
- `PaginationPager` and `paginationItems(current, total)`.
- Table cells: `DateTimeCell`, `NumberCell`, `TruncateCell`,
  `ExternalLinkCell`, `ThumbnailCell` and `ExpandToggleCell`; `hint` on
  `TagCell` and `StatusTagCell`; an `alert` status on `StatusTagCell`;
  `tagColorAt` and `assignTagColors`.
- `DataTable`: `loading` / `loadingRows` placeholder rows;
  `DataTableColumnHeader` `hint`; `DataTableSubPanel` for expanded rows.
- `withTime` on `FilterDateRange`.
- `FilterLabelSpacer`.
- `aspect` on `ChartContainer` (`video`, `square`, `auto`).
- `nativeButton` on `ConfirmDialog`, for a non-button `trigger`.
- `render` on `Card`.
- `DrawerBody`, a scrolling body between drawer header and footer.
- `alert` variant on `Badge`, `TagCell` and `TagListCell`; `success`,
  `alert` and `info` variants on `Alert`.
- Theme colours `--tertiary`, `--alert` and their foregrounds.
- `@foomo/ui/theme.css`, the Tailwind token mapping for host apps.
- `data-underline-links` on the document root keeps table-cell links and
  the `link` badge underlined.
- `bun run watch` keeps `dist/` in sync for `bun link` development.

### Changed

- `TabsList` default variant is now `line`; pass `variant="default"` for the
  pill.
- Sidebar active entry is an underline instead of a fill; the sidebar
  background is the page background.
- `DataTable` default page size is 50 (`DEFAULT_PAGE_SIZE`) and its pager is
  `PaginationPager`; the row count is no longer shown.
- `DataTableColumnHeader` marks the sorted column with an underline instead
  of a fill.
- `ui.css` builds utilities into the `components` cascade layer, so a
  `className` passed by the app overrides component classes.
- Toaster uses rich status colours for `toast.success`, `toast.error`,
  `toast.warning` and `toast.info`.
- `Alert` `destructive` is a light red tint with a red border.
- Filters fill their grid cell in `FilterBar` (up to five columns); the
  actions stay on the right.
- Empty filter values ("Any", "Any time") use the foreground colour.
- `--destructive` and `--success` follow the brand palette.
- `secondary` buttons, `outline` / `ghost` hovers and former `--muted`
  surfaces (tabs, toggles, calendar, badge, slider, progress) use
  `--tertiary`.
- Outline toggles and the button group label have a black border.
- `Badge` uses regular font weight.
- `DashboardSection` `title` is optional.
- Chart grid lines use the full `--border` colour.
- `Menubar` checkbox and radio items show their check on the right.
- Pagination links are no longer underlined.

### Fixed

- Context Menu submenu trigger icon no longer touches its label.
- Icon-sized ghost buttons no longer underline their content.
- Removed unprefixed popup classes from Dropdown Menu, Context Menu, Menubar
  and Select.

## 1.2.0 - 2026-10-02

### Added

- Autocomplete: `@foomo/ui/components/autocomplete` wraps the Base UI
  Autocomplete with the same trigger and popup styling as Select.
- Date picker: `@foomo/ui/components/date-picker` exposes `DatePicker`,
  `DateRangePicker` and `DatePickerTrigger`, composed from Popover and
  Calendar after the shadcn date picker example.
- Tag palette: six categorical colours, `--label-color-1` … `--label-color-6`
  in the neutral theme (mapped to `label-color-*` utilities). `TagCell` and
  `TagListCell` take a `color` prop
  (`"label-1"` … `"label-6"`) that renders a tinted tag with no variant styles
  underneath, so callers no longer need `variant="ghost"` plus a colour class.
  In dark mode the text is the foreground white on a 50% tint, rather than
  a muted grey. `TagListCell`'s `color` can also be a function, to
  colour each tag by its value. `tagColorValues` exposes the same colours as
  CSS values for chart fills.
- Table cells: `TagCell` takes an `icon` that leads its label, and
  `StatusTagCell` renders the default status set with one: `success` (tick on
  green, e.g. "Imported"), `destructive` (cross on red, "Failed") and `info`
  (circled tick on blue, "Resolved"). The label stays the caller's word; an
  `icon` prop swaps the glyph and keeps the colour.
- Badge: a `success` variant, the green counterpart to `destructive`, for a
  state that really is good ("Enabled", "Done"). Also available on `TagCell`
  and `TagListCell`.
- Filters: `FilterMultiSelect` picks several options from one list. An empty
  selection means no restriction; the trigger names the first pick and
  counts the rest ("FancyBrand +2").
- Hooks: `@foomo/ui/hooks/use-frame-dismiss` exposes `useFrameDismiss`, which
  calls its callback when a page inside an iframe loses focus, so custom
  popups can close on a click outside the frame.

### Changed

- Table cells: `BooleanCell` sets each glyph on a 24px square styled like
  the matching tag: outlined with no fill for `tone="neutral"`, tinted with
  10% of `--success` or `--destructive` for `tone="semantic"`. An unknown
  value shows its dash with neither, in both tones.
- Table cells: `IdCell` renders in the regular font with tabular figures
  instead of a smaller monospace, so ids read as part of the row while digit
  runs still line up. `mono` now defaults to `false` and opts back in.
- Button: the `ghost` variant underlines its text, so a text-only ghost
  button (e.g. `FilterReset`, the Data Table column headers) reads as
  clickable. Icon-only ghost buttons are unaffected. Calendar days opt out
  with `no-underline`, since they form a date grid rather than actions.
- Calendar: a selected day, and the start and end of a range, use the brand
  blue (`accent-highlight`) instead of the primary colour. Days inside a range
  keep their muted background.
- Filters: `FilterDateRange` picks its period with one two-month range
  calendar, after the shadcn range picker, instead of separate From and To
  calendars. The first click sets the start, the second the end; a Clear
  button resets both. A period can no longer be picked as "until" with no
  start, though such a value is still accepted and described. A one-day
  period reads as a single date. `to` is the start of the last day, so
  compare against `endOfDay(to)` to include it.
- Date picker: `DateRangePicker` hides outside days, so with two months side
  by side a day no longer appears in both grids. Pass
  `calendar={{ showOutsideDays: true }}` to restore them.
- Filters: the `FilterDateRange` field shows its active state like the
  search field: a foreground-coloured border while open or focused, with no
  grey fill on hover or open and no focus ring. The calendar is unchanged.
- Filters: `FilterDateRange` uses the `CalendarDots` icon, shown in the
  foreground colour even while the empty placeholder is muted, so every
  filter icon reads the same.

### Fixed

- Card and InputGroup: a bordered `CardHeader`/`CardFooter` or block
  `InputGroupAddon` now gets its spacing next to the border. The generated
  `[.border-b]`/`[.border-t]` variants never matched the prefixed
  `fui:border-*` classes.
- Filters: the `FilterDateRange` trigger now has the same border as the
  search field and selects beside it. It inherited the outline button's
  `border-current`, so its border followed the text colour (muted when
  empty, black once a period was set).
- DropdownMenu and Select: an open popup now closes when the page is embedded
  in an iframe (e.g. the Storybook canvas) and the user clicks outside the
  frame. A click on the embedding page never reaches the frame's document, so
  the popup now closes when the frame's window loses focus instead. Top-level
  pages are unaffected. When Select closes this way, `onOpenChange(false)`
  receives no event details.

## 1.1.0 - 2026-09-18

### Added

- Chart: re-exported Recharts primitives from
  `@foomo/ui/components/chart` so consumers can keep a single Recharts instance
  and React context.

### Changed

- Replaced Lucide with Phosphor icons throughout the component library.
- Changed `@foomo/ui/icons` to re-export Phosphor icons.
- Configured generated shadcn components to use Phosphor icons.

### Removed

- Removed the `lucide-react` dependency.
- Removed all Lucide icon exports and the `LucideIcon` type from
  `@foomo/ui/icons`. Consumers must switch to the corresponding Phosphor exports.

## 1.0.1 - 2026-09-17

### Added

- Project skills for OpenCode, Claude Code, and Codex.
- Publishing and changelog guidance for maintainers.

### Changed

- Expanded the README with installation, theming, Base UI composition, public
  modules, and 0.x migration guidance.

## 1.0.0 - 2026-09-17

### Added

- DataTable with sorting, filtering, selection, pagination, column visibility,
  client-driven and server-driven state, and expandable rows.
- Listing filters and reusable table cell renderers.
- Semantic link and success theme tokens.

### Changed

- Replaced Radix UI primitives with Base UI across all component wrappers.
- Replaced `asChild` composition with Base UI's `render` prop.
- Renamed the internal Tailwind prefix from `lib:` to `fui:`.
- Updated the default theme to Roboto Variable with a system sans-serif
  fallback.
- Added a dedicated dark-mode chart ramp with accessible contrast.
- Changed checkbox mixed state to the `indeterminate` prop.
- Required `ratio` on `AspectRatio` and a single element child in
  `FormControl`.

### Removed

- Removed the `radix-ui` dependency.
- Removed the `decorative` prop from `Separator`.
