# Changelog

All notable changes to `@foomo/ui` are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Progress lists: `@foomo/ui/components/progress-list`. `ProgressList` holds a
  `ProgressListItem` per labelled bar: the label and the value as a percentage
  on one line, the bar under them. `color` sets a bar's colour as any CSS
  value, e.g. `var(--chart-2)`. Storybook: Data Display / Card / Progress
  List.
- Item lists: `@foomo/ui/components/item-list`. `ItemList` holds an
  `ItemListEntry` per entry: a title, an optional description, an optional
  avatar or icon in front (`media`) and an optional slot at the end (`end`),
  such as a time or a switch. `variant="divided"` (the default) splits compact
  entries with a line, for a feed; `variant="outline"` frames each entry, for
  a short list of things to act on. A real `<ul>`/`<li>` list. Storybook: Data
  Display / Card / Activity Feed and Settings List.
- Confirm dialogs from a menu: `nativeButton={false}` on `ConfirmDialog` for a
  `trigger` that is not a `<button>`, such as a `DropdownMenuItem` in a row's
  actions menu.

- Section cards: `@foomo/ui/components/section-card`. `SectionCard` is one
  aspect of a record on a detail page, a card with an optional `title`,
  `description` and header `action` over its content. `SectionCardGrid` lays
  them out two to a row from `lg`, one per row below it. Storybook: Data
  Display / Section Card.
- Async content: `@foomo/ui/components/async-content`. `AsyncContent` shows
  fetched content in one of four states: a spinner with "Loading…", the error
  in a destructive `Alert`, a muted "not found" text when there is no data, or
  `children(data)`. Storybook: Overlays and Feedback / Async Content.
- Text formatters: `@foomo/ui/lib/format`. `formatDateTime` (date and time),
  `formatDate` (the day, month spelled short), `formatBytes` (B to GB) and
  `formatYesNo` (a flag as "Yes"/"No", `undefined` when unknown). Each gives an
  empty result for a value that is not set, so `DescriptionListDetails` shows
  the dash. `parseDate` is the parser they share with `DateTimeCell`
  (`parseCellDate` stays as an alias).
- Table state in the URL: `@foomo/ui/lib/table-state`. `toPaginationState` and
  `fromPaginationState` convert between a server-driven `DataTable`'s
  pagination and a 1-based `page` with a `pageSize`, falling back to page 1 and
  `DEFAULT_PAGE_SIZE` for a missing or invalid value. `toSortingState` and
  `fromSortingState` do the same for a single sort field and direction.
- Tag colours by position: `tagColorAt(index)` gives the tag palette colour for
  the `index`-th category, starting over after the sixth, and
  `assignTagColors(keys)` maps each key to one in the order given. Both in
  `@foomo/ui/components/table-cells`.

- JSON views: `@foomo/ui/components/json-view`. `JsonView` is a collapsible
  tree of a payload with "Expand all" and "Collapse all", styled with the
  theme's tokens (so it follows dark mode) and an `empty` state. `RawViewPanel`
  puts a "Raw JSON" switch over a formatted view that swaps it for its payload;
  `RawViewSwitch` is the switch on its own. `JsonDetails` is a labelled,
  collapsed block with the value pretty-printed as text. Adds the
  `react-json-view-lite` dependency. Storybook: Data Display / JSON View.
- Dashboard kit: `@foomo/ui/components/dashboard`. `DashboardSection` sets a
  heading over a grid of tiles (`columns` 2 or 3). `DashboardTile` is a card
  whose fixed-height body renders a `DashboardResource` (idle, loading, error,
  empty or ready). `DashboardTileLink` is the secondary button with an arrow
  out that leads to the page behind a tile. `DonutChart` is a donut with a
  figure in its hole (`labels` names the slices outside the ring), and
  `BarListChart` one horizontal bar per category. Storybook: Data Display /
  Dashboard.
- Stacked description lists: `layout="stacked"` on `DescriptionList` puts each
  label above its value, for figures read out beside a chart.
- Importable theme mapping: `@foomo/ui/theme.css` maps the theme's CSS
  variables onto Tailwind (`@theme inline`) and declares the `dark` variant, so
  a host app's own utilities resolve against the same tokens without copying
  the mapping. `src/index.css` imports it; `ui.css` is unchanged. See README,
  "Tailwind in the host application".
- Underlined links option: with `data-underline-links` on the document root,
  table-cell links (`cellLinkClassName`, `ExternalLinkCell`) and the `link`
  badge stay underlined instead of only on hover. The `link` button keeps its
  hover-only underline. Storybook: Data Display / Table Cells / Text and
  links.
- Date-range filter with time of day: `withTime` on `FilterDateRange` adds a
  start and an end time under the calendar, for a period that does not follow
  whole days. Each end is then an exact moment included in the period: a newly
  picked start day begins at 00:00, a newly picked end day runs until 23:59.
  Storybook: Forms / Filters / With time of day.
- Chart container: `aspect` on `ChartContainer` sets the chart's shape:
  `video` (16:9, the default), `square`, or `auto`, which drops the ratio so
  the chart fills its parent or takes a height from `className`. Storybook:
  the chart examples in Card and Dashboard use it.
- Tag hints: `hint` on `TagCell` and `StatusTagCell` explains the tag in a
  tooltip on hover, the same tooltip a column header's `hint` shows.
  Storybook: Data Display / Table Cells / Tags.
- Compact description lists: `layout` on `DescriptionList`. `inline` sets the
  pairs side by side in a wrapping line, for a summary above a table; `grid`
  sets them in a tight two-column grid, for a table cell or a small tile. Both
  take the surrounding text size. `rows` stays the default. Storybook: Data
  Display / Description List / Compact layouts.
- Refresh button: `@foomo/ui/components/refresh-button` `RefreshButton`, a
  small outline button with the clockwise arrows and "Refresh" (or its
  children). `pending` disables it and spins the arrows while a refresh runs.
  Storybook: Actions / Refresh Button.
- Drawer: `DrawerBody`, the content between header and footer. It takes the
  free space and scrolls, so long content no longer pushes the footer off
  screen, with side padding matching the header and footer.
- Confirm dialog: `@foomo/ui/components/confirm-dialog` `ConfirmDialog`
  asks before an action that cannot be taken back, opened by `trigger`.
  `onConfirm` may be async: while it runs the buttons are disabled, the
  confirm button shows `pendingLabel` and the dialog cannot be closed; it
  closes when the action resolves and shows the error in a destructive
  `Alert` when it throws. `confirmTwice` asks for a second click, `children`
  adds content such as a field (as a function of the dialog's state), and
  `confirmDisabled` holds the button until it is valid. Storybook: Overlays
  and Feedback / Confirm Dialog.
- Back button: `@foomo/ui/components/back-button` `BackButton`, the way
  back from a detail page to its list (a small ghost button with a left
  arrow, pulled left so the arrow lines up with the text edge). Free of any
  router: `onClick` or `render`. Storybook: Navigation / Back Button.
- Data Table: `DataTableColumnHeader` takes a `hint`, shown in a tooltip on
  the title (dotted underline, help cursor) or on the sort button.
  `DataTableSubPanel` is the padded content of an expanded row, with an
  optional `title` and `description` above the detail. Table cells:
  `ExpandToggleCell` turns a value into the toggle for that row (a small
  outline button with a caret, `aria-expanded`), or plain text when
  `expandable` is false. Storybook: Data Display / Data Table, "Expandable
  rows and header hints".
- Data Table: `loading` shows placeholder rows (`loadingRows`, 5 by default,
  a skeleton bar per visible column) while there are no rows to show yet,
  and marks the table `aria-busy`, so a table still fetching no longer
  claims there is nothing to show. Rows already on screen stay during a
  refetch. Storybook: Data Display / Data Table,
  "Loading".
- Hook: `@foomo/ui/hooks/use-error-toast` `useErrorToast(error, message)`
  shows `toast.error(message)` when `error` turns truthy, such as a query's
  `isError` (one toast per failure) or its `error` (one per distinct error).
  `message` can be a function of the error. Free of any data library; needs
  one `Toaster`. Storybook: Overlays and Feedback / Feedback, "Error toast".
- Table cells: `DateTimeCell` (day in the foreground, time muted; takes a
  raw `Date`, ISO string or Unix ms, formats with `Intl.DateTimeFormat` in
  the reader's locale or a given `locale`, `dateFormat` and `timeFormat`, and
  shows `empty` for an unset value, including `0` and the `0001-01-01` zero
  time), `NumberCell` (right-aligned tabular figures, locale-formatted),
  `TruncateCell` (one line at 16rem with the full text as tooltip),
  `ExternalLinkCell` (opens in a new tab; breaks or, with `truncate`, cuts
  long URLs) and `ThumbnailCell` (a contained image on white at `sm` / `md`
  / `lg`, optionally `bordered`, with a placeholder when there is no
  image). `parseCellDate` is the unset-date rule `DateTimeCell` uses.
  Storybook: Data Display / Table Cells.
- Page header: `@foomo/ui/components/page-header` `PageHeader`, a page's
  `h1` title with an optional description beneath and the page's own
  `actions` on the right, wrapping below the title when space runs out. The
  Admin Dashboard showcase uses it. Storybook: Navigation / Page Header.
- Stat card: `@foomo/ui/components/stat-card` `StatCard`, a key figure in the
  highlight colour above its label on a `Card` (a number is formatted for the
  reader's locale), with an optional `icon`. The default size is the
  dashboard's larger figure (formerly the Card story's "Number stat", which
  now renders this component); `size="sm"` is the compact card for a row of
  figures above a listing. `StatCardRow` shares the width evenly and wraps.
  With `onClick` the card is a button that filters the listing below,
  `active` marking the selected one. Storybook: Data Display / Stat Card.
- Card: `render` swaps the card's `<div>` for another element (e.g. a
  `<button>` for a card that is itself a control), keeping its styling.
- App frame: `@foomo/ui/components/app-shell`, the frame the toolbox and the
  Sidebar story share, free of any router (links come in through
  `renderLink` or a `render` element, the current page through
  `currentPath`):
  - `AppShell`: sidebar provider, sidebar, sticky header and a padded
    content column. `AppHeader` is the header on its own (collapse button,
    divider, then its children).
  - `AppSidebar`: an inset sidebar that collapses to icons, with `brand`,
    content and `footer` slots and a rail.
  - `SidebarBrand`: logo, name and subtitle at the top.
  - `SidebarNav`: the navigation tree as one group. Entries with `children`
    open into a sub-menu (open when they hold the current page), `nested`
    entries are indented without becoming children, and `loading` shows
    skeleton rows. `isNavItemActive` is its matching rule: exact for `/`,
    by path segment otherwise.
  - `SidebarUserMenu`: the signed-in user with avatar, name and subtitle,
    opening a menu.

  Storybook: Navigation / App Shell (a neutral demo app, with a props tab
  per component); Navigation / Sidebar shows the toolbox's own menu.
- Theme menu: `@foomo/ui/components/theme-menu` with `ThemeMenuItems` (the
  light / dark / system picker as dropdown radio items, through
  next-themes), `ThemeMenuGroup` (the same under an "Appearance" label) and
  `ThemeIcon` (the icon of the scheme in use).
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
- Pagination: `PaginationPager`, a pager driven by state rather than URLs:
  an optional page-size select on the left, and on the right Previous, the
  page numbers (first, last, the current page with a neighbour on each side,
  an ellipsis for each gap) and Next. It looks like the numbered
  `PaginationLink` composition, but its controls are buttons, so the ends
  can be disabled. `paginationItems(current, total)` is the page-number
  logic it uses, exported for custom pagers.
- `DEFAULT_PAGE_SIZE` (50), the rows per page a paged list starts with.
- Theme: a `--tertiary` colour (EBF3FF light, 313945 dark) with
  `--tertiary-foreground` for text on it, mapped to `tertiary` utilities.
- Alert: `success`, `alert` and `info` variants, tinted like the matching
  badges and toasts.
- Table cells: `StatusTagCell` takes an `alert` status (warning sign on
  yellow, e.g. "Needs review"). `info` stays blue.

### Changed

- `DashboardSection`'s `title` is optional. Without it the section is the grid
  alone, for a stage that a tab or another heading already names.
- Chart grid lines use the full `--border` colour instead of half of it, the
  colour apps were setting on each `CartesianGrid` by hand. `BarListChart` no
  longer sets it itself.
- Host classes win over component defaults: `ui.css` now builds the library's
  utilities into the `components` cascade layer instead of `utilities`. A
  class an app passes through `className` lands in the app's own `utilities`
  layer, which outranks `components`, so it now overrides a component's
  built-in class that sets the same property (`w-44` on a filter, `text-xs`
  on a description list). Before, both shared `utilities` and the library's,
  coming later in the app's stylesheet, won. Check any `className` that was
  silently ignored until now: it takes effect with this release.
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
- Data Table: sortable column headers (`DataTableColumnHeader`) mark the
  sorted column the way the sidebar marks its active entry: a 2px line in the
  foreground colour under the title, with no fill (was a `--muted`
  background). Hover shows the same line in the border colour. They opt out of
  the `ghost` button's underline and fill.
- Filters: the empty state of `FilterSelect` and `FilterMultiSelect`
  ("Any", "All brands") and `FilterDateRange` ("Any time") is in the
  foreground colour rather than muted, since "no restriction" is a real
  filter state. `FilterSearch`'s placeholder stays muted.
- Badge: regular weight instead of medium, so a badge and a table tag look
  the same. `TagCell` no longer overrides the weight.
- Menubar: checkbox and radio items show their check on the right, like
  Dropdown Menu and Context Menu.
- Pagination: page numbers, Previous and Next are no longer underlined.
  Like calendar days, they opt out of the ghost button's underline because
  they are navigation rather than text actions.
- Data Table: the pager shows Previous, the page numbers and Next (via
  `PaginationPager`) instead of "Page 3 of 12" with first, previous, next
  and last buttons. The rows-per-page select moves to the left, where the
  row count ("12 row(s)", "2 of 12 row(s) selected") was; the count is no
  longer shown. `pageSize` defaults to
  `DEFAULT_PAGE_SIZE` (50) instead of 10, so a table that does not pass one
  shows more rows per page.

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
