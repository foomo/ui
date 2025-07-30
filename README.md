# @foomo/ui

A modern React component library built with Tailwind CSS v4, TypeScript, and Radix UI primitives.

## Features

- 🎨 Built with Tailwind CSS v4
- 🔧 Full TypeScript support
- 📦 Tree-shakeable - import only what you need
- 🎯 No barrel exports - better performance
- 🌗 Dark mode support
- ♿ Accessible components via Radix UI

## Installation

```bash
npm install @foomo/ui
```

## Usage

Import the CSS file once in your app:

```tsx
// In your app's entry file (e.g., App.tsx or main.tsx)
import "@foomo/ui/ui.css";
```

Import components individually:

```tsx
import { Button } from "@foomo/ui/components/button";
import { cn } from "@foomo/ui/lib/utils";

function App() {
  return (
    <div>
      <Button variant="outline" size="lg">
        Get Started
      </Button>

      <Button variant="destructive" className={cn("mt-4")}>
        Delete Item
      </Button>
    </div>
  );
}
```

## Development

```bash
# Install dependencies
bun install

# Start Storybook
bun run storybook

# Build the library
bun run build
```

