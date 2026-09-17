---
name: foomo-ui
description: Use @foomo/ui components to build or update React interfaces. Trigger when a task mentions @foomo/ui, Foomo UI, its component imports, DataTable, filters, or this repository's UI components.
---

# Foomo UI

Build with the package's existing components before introducing custom UI.

## Start Here

1. Read `README.md` for consumer setup and theming.
2. Search `src/components` for the component named in the task.
3. Read its exports and prop types before composing it. Do not infer APIs from
   Radix UI or older shadcn examples.
4. Check `src/stories` for a working composition when using compound components.

## Imports

Import each module directly. There is no root barrel.

```tsx
import { Button } from "@foomo/ui/components/button";
import { Dialog, DialogContent } from "@foomo/ui/components/dialog";
import { useMobile } from "@foomo/ui/hooks/use-mobile";
import { cn } from "@foomo/ui/lib/utils";
```

Use package paths in consumer code and `@/components/...` aliases inside this
repository.

## Composition Rules

- The primitives use Base UI. Use `render={<Element />}` to replace an element;
  never use Radix UI's `asChild` prop.
- Pass event handlers and state using the exported component's Base UI props.
- Keep `DropdownMenuLabel`, `ContextMenuLabel`, and `MenubarLabel` inside their
  corresponding `Group` or `RadioGroup`.
- Pass checkbox indeterminate state through `indeterminate`, not
  `checked="indeterminate"`.
- `FormControl` requires exactly one React element child.
- `AspectRatio` requires `ratio`.
- `AlertDialogAction` is a styled button and does not close the dialog by
  itself. Control the root state or compose the required close behaviour.
- Keep accessible names on icon-only buttons and preserve Title/Description
  parts in dialogs.

## Styling And Themes

- Consumers import `@foomo/ui/ui.css` once and either import
  `@foomo/ui/themes/neutral.css` or provide the complete token set themselves.
- Dark mode is selected by a `.dark` ancestor.
- Internal utility classes use `fui:`. Consumer `className` values use the host
  application's normal unprefixed Tailwind utilities.
- Prefer component variants and explicit component props over selectors aimed
  at compiled classes or `data-slot` internals.
- Use semantic tokens such as `text-destructive`, `text-success`, and
  `text-link`; do not hardcode palette colours when a token exists.

## Tables And Filters

- Build columns with `createDataTableColumnHelper` from
  `@foomo/ui/components/data-table`.
- Add `dataTableSelectColumn()` when row selection is required and provide a
  stable `getRowId` if selection must survive sorting.
- Use `FilterBar` and the filter controls from
  `@foomo/ui/components/filters` in the DataTable `toolbar` slot.
- Match `DataTable.toolbarSize` to `FilterBar.size`.
- Controlled `sorting`, `pagination`, or `globalFilter` imply server-driven
  handling unless the corresponding `manual*` prop is explicitly `false`.
- Reuse `BooleanCell`, `TagCell`, `TagListCell`, `IdCell`, `EmptyCell`, and
  `cellLinkClassName` from `@foomo/ui/components/table-cells`.

## Verification

For changes in this repository, run:

```bash
bunx tsc -p tsconfig.json --noEmit
bunx biome check ./src
bun run build
bun run build-storybook
```

Exercise changed overlays in Storybook in light and dark modes. Check keyboard
operation, focus restoration, viewport positioning, and browser console errors.
