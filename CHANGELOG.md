# Changelog

All notable changes to `@foomo/ui` are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

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
