# Changelog

All notable changes to `@foomo/ui` are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- `bun run watch`: development watch mode that keeps `dist/` in sync with
  `src/` (declarations, JS and `ui.css`, themes) for apps consuming the package
  through `bun link`. While it runs, the Claude Code Stop hook skips its full
  rebuild.
- Alert colour: `--alert` (yellow, D4A733 light / E1BB5C dark) in the neutral
  theme, mapped to `alert` utilities, for a state that needs a look but has
  not failed. `--alert-foreground` (yellow 800, 625125) is the readable text
  shade, since the yellow itself is too light for text on white.
- Badge: an `alert` variant, a yellow tint with `--alert-foreground` text in
  light mode and `--alert` text in dark mode. Also available on `TagCell` and
  `TagListCell`.
- Storybook: a Foundations / Colors page listing every colour token with its
  light and dark value as hex, read from the theme stylesheet so it stays
  current.
- Storybook: grouped stories for Overlays, Date Pickers, Badge, Menus,
  Toggles and Tabs, Feedback and Pagination, and a Navigation / Sidebar
  story modelled on the toolbox's left navigation. The Admin Dashboard
  showcase uses the same sidebar. `src/stories/` is excluded from the
  package build, so helpers shared between stories are not published.
- Description list: `@foomo/ui/components/description-list` exposes
  `DescriptionList`, `DescriptionListItem`, `DescriptionListTerm` and
  `DescriptionListDetails` for label and value rows, such as a record's
  details. Labels are medium weight, values regular. An empty value shows
  the table's dash.
- Pagination: `PaginationPager`, the compact pager ("Page 3 of 12" with
  first, previous, next and last buttons, an optional page-size select and a
  summary), for lists with too many pages to number. The Data Table now
  renders its pager with it, so the two stay identical; its look is
  unchanged.
- Theme: a `--tertiary` colour (EBF3FF light, 313945 dark) with
  `--tertiary-foreground` for text on it, mapped to `tertiary` utilities.
- Alert: `success`, `alert` and `info` variants, tinted like the matching
  badges and toasts.
- Table cells: `StatusTagCell` takes an `alert` status (warning sign on
  yellow, e.g. "Needs review"). `info` stays blue.

### Changed

- Status colours follow the brand palette. `--destructive` is red A12424 in
  light mode (dark mode keeps FF6467). `--success` moves from emerald to
  green 578740 light / 6FB64D dark.
- Storybook: the sidebar is grouped by purpose (Foundations, Actions, Forms,
  Data Display, Navigation, Overlays and Feedback, Showcase). Story URLs
  changed with it, so old links to a story no longer resolve.
- Button: the `secondary` variant uses `--tertiary` for its background and
  `--tertiary-foreground` for its text. `outline` and `ghost` hover (and
  open) on `--tertiary` instead of `--muted`.
- Tabs: `TabsList` defaults to the `line` variant, labels on a transparent
  row with a line in the foreground colour under the active tab. The pill
  is still there as `variant="default"`, now a white track with a black
  border and the active tab on `--tertiary`. A `TabsList` without a
  `variant` changes look; pass `variant="default"` to keep the pill.
- Toggle (`outline`, and so outline Toggle Group items) and the Button
  Group's text label have a black border, matching the outline buttons.
- Sidebar: the background (`--sidebar`) is the page background
  (`--background`) in both modes, instead of its own off-white.
  The active entry is marked by a 2px line in the foreground colour under
  its label, like a line-style tab, instead of a filled background; hover
  shows the line in the border colour, and so does an active section (an
  entry that opens a sub-menu), so only the page itself carries the dark
  line. Collapsed to icons, the active
  icon keeps a `--sidebar-accent` (`--tertiary`) tile. The brand and user
  entries keep a background on hover.
- Toggle, Toggle Group, Tabs, Calendar (and so the date pickers), Badge and
  Slider, Button Group and Progress: every `--muted` background is
  `--tertiary` instead, e.g. the tab track, a pressed toggle, the calendar's
  today and range, badge hovers, the button group's text label and the
  progress track.
- Alert: `destructive` is a light red tint with a red border instead of red
  text on the card colour, matching the new status variants.
- Toaster: `toast.success`, `toast.error`, `toast.warning` and `toast.info`
  show a light tint of the status colour with coloured text, like the
  matching badges (green, red, yellow, and the brand blue for info), instead
  of a white toast that only changed its icon. A plain `toast()` stays
  neutral.
- Filters: `FilterBar` lays its filters out in a grid of at most five
  columns, each 150px to 250px wide. Every filter (search, select,
  multi-select, date range) fills its cell, instead of a fixed width per
  kind; the toggle and "Clear filters" take a cell each. A full row sends the
  next item to a new row rather than squeezing the others, so "Clear
  filters" appearing no longer narrows the fields. A long date range is cut
  off rather than widening its field.
- Filters: `FilterBar` holds its filters and its `actions` in two
  containers side by side, 24px apart. Only the filters wrap, so the actions
  stay on the right, level with the first row of controls, instead of
  jumping when "Clear filters" appears or the row runs out of space.
- Data Table: the Columns button sits in its own container to the right of
  the search and `toolbar`, so it stays put when filters wrap. Beside a
  `FilterBar` it lines up with the first row of controls. `FilterLabelSpacer`
  is exported for any control that needs the same alignment.
- Filters: the empty state of `FilterMultiSelect` ("All brands") and
  `FilterDateRange` ("Any time") is in the foreground colour rather than
  muted, since "no restriction" is a real filter state. `FilterSearch`'s
  placeholder stays muted.
- Badge: regular weight instead of medium, so a badge and a table tag look
  the same. `TagCell` no longer overrides the weight.
- Menubar: checkbox and radio items show their check on the right, like
  Dropdown Menu and Context Menu.
- Pagination: page numbers are no longer underlined. Like calendar days,
  they opt out of the ghost button's underline because they form a row of
  positions; Previous and Next keep it.

### Fixed

- Context Menu: a submenu trigger's icon no longer touches its label.
- Button: icon-sized ghost buttons no longer underline their content, so
  an avatar in one (the header's account button) shows no line under its
  initials.
- Admin Dashboard showcase: labels the icon swap had renamed by mistake
  ("GearIcon", "MagnifyingGlassIcon everything…", "PaperPlaneTiltIcon
  invites") read "Settings", "Search …" and "Send invites" again.
- Dropdown Menu, Context Menu, Menubar and Select: removed popup classes
  that lacked the `fui:` prefix and so never generated any CSS. No visual
  change.

## 1.2.0 - 2026-10-02

### Added

- Autocomplete: `@foomo/ui/components/autocomplete` wraps the Base UI
  Autocomplete with the same trigger and popup styling as Select.
- Date picker: `@foomo/ui/components/date-picker` exposes `DatePicker`,
  `DateRangePicker` and `DatePickerTrigger`, composed from Popover and
  Calendar after the shadcn date picker example.
- Tag palette: six categorical colours, `--label-color-1` … `--label-color-6`
  in the neutral theme (mapped to `label-color-*` utilities), taken over from
  the Manor toolbox. `TagCell` and `TagListCell` take a `color` prop
  (`"label-1"` … `"label-6"`) that renders a tinted tag with no variant styles
  underneath, so callers no longer need `variant="ghost"` plus a colour class.
  In dark mode the text is the foreground white on a 50% tint, rather than
  the toolbox's muted grey. `TagListCell`'s `color` can also be a function, to
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
