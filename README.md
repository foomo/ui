# @foomo/ui

React 19 components built with Base UI, Tailwind CSS v4, and TypeScript. The
package exposes each component separately so applications only import what they
use.

## Installation

```bash
npm install @foomo/ui tailwindcss tailwind-merge
```

`react` and `react-dom` 19 are also required peer dependencies.

## Setup

Import the component CSS once in the application entry point. Import the
default neutral theme, or replace it with your own theme variables.

```tsx
import "@foomo/ui/ui.css";
import "@foomo/ui/themes/neutral.css";
```

The default theme uses Roboto Variable when available. To load it from npm,
install `@fontsource-variable/roboto` and import it before the UI styles.
Without that optional import, the theme falls back to the system sans-serif
font.

Dark mode is class-based. Add `dark` to an ancestor, usually the document root:

```ts
document.documentElement.classList.toggle("dark", isDarkMode);
```

### Tailwind in the host application

An application that writes Tailwind classes of its own imports the theme's
Tailwind mapping after Tailwind, so `bg-card`, `text-muted-foreground` or
`rounded-lg` resolve to the same tokens as the components' classes:

```css
@import "tailwindcss";
@import "@foomo/ui/theme.css";
@import "@foomo/ui/themes/neutral.css";
@import "@foomo/ui/ui.css";
```

`theme.css` holds no token values, only the mapping and the variants (`dark`,
`underline-links`), so it pairs with any theme.

### Underlined links

Table-cell links (`cellLinkClassName`, `ExternalLinkCell`) and the `link`
badge underline on hover. To keep them underlined, set `data-underline-links`
on the document root:

```html
<html data-underline-links>
```

The `link` button keeps its hover-only underline.

## Usage

Import components from their individual package paths. There is intentionally
no root barrel export.

```tsx
import { Button } from "@foomo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@foomo/ui/components/dialog";

export function EditProject() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>Update the project details.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Base UI composition uses `render`, not Radix UI's former `asChild` prop:

```tsx
import { Button } from "@foomo/ui/components/button";

<Button render={<a href="/settings" />}>Settings</Button>;
```

Utilities are available from their own paths:

```tsx
import { useMobile } from "@foomo/ui/hooks/use-mobile";
import { Prose } from "@foomo/ui/extra/typography";
import { cn } from "@foomo/ui/lib/utils";
```

## Theming

To provide a custom theme, import `@foomo/ui/ui.css` but omit
`@foomo/ui/themes/neutral.css`. Define the same CSS variables in the host
application for both light and dark modes. The required token set can be copied
from [`src/themes/neutral.css`](https://github.com/foomo/ui/blob/main/src/themes/neutral.css).
To adjust only a few tokens, import the neutral theme and declare just those
variables after it. A token of the application's own, such as an extra chart
colour, can sit beside the theme's.

Component utilities use the `fui:` prefix internally to avoid collisions with
host applications. Application classes passed through `className` should use
the application's normal, unprefixed Tailwind syntax, and they override the
component's own classes: `ui.css` puts the library's utilities in the
`components` cascade layer, below the application's `utilities`, so
`<Input className="w-48" />` is 12rem wide whatever the input's default width.

See the [shadcn theming guide](https://ui.shadcn.com/docs/theming) for the token
model.

## Migrating From 0.x

Version 1 replaces Radix UI with Base UI. The main consumer changes are:

- Replace `asChild` with Base UI's `render` prop.
- Replace internal `lib:` utility references with `fui:`. Application utility
  classes remain unprefixed.
- Pass checkbox mixed state through `indeterminate`.
- Pass the required `ratio` to `AspectRatio`.
- Remove the `decorative` prop from `Separator`.
- Give `FormControl` exactly one React element child.
- Keep menu labels inside a menu `Group` or `RadioGroup`.

See the [migration record](https://github.com/foomo/ui/blob/main/.migration/project.md)
for the complete API changes.

## Public Modules

- `@foomo/ui/components/*` - UI components, including DataTable and filters
- `@foomo/ui/hooks/*` - shared React hooks
- `@foomo/ui/lib/*` - utilities such as `cn`
- `@foomo/ui/extra/typography` - the `Prose` component
- `@foomo/ui/icons` - package icon exports
- `@foomo/ui/ui.css` - component styles
- `@foomo/ui/theme.css` - the theme's Tailwind mapping, for host Tailwind builds
- `@foomo/ui/themes/neutral.css` - default theme tokens

## Development

```bash
bun install
bun run storybook
bun run build
```

To work on the package from an app that consumes it, link it and run the
watch mode, which rebuilds `dist/` incrementally on every change under `src/`:

```bash
bun link            # in this repo
bun link @foomo/ui  # in the app
bun run watch       # in this repo
```

The project-local `foomo-ui` agent skill documents component selection and the
v1 composition conventions. It is available for OpenCode, Claude Code, and
Codex under `.opencode/skills`, `.claude/skills`, and `.agents/skills`
respectively. Restart the active agent after pulling changes so it reloads the
skill.

Maintainers should follow the
[publishing guide](https://github.com/foomo/ui/blob/main/docs/PUBLISHING.md) for
version, changelog, tag, and npm publication steps. Release history is recorded
in [`CHANGELOG.md`](https://github.com/foomo/ui/blob/main/CHANGELOG.md).
