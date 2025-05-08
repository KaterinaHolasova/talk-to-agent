# ui

## Purpose

The `ui` library provides reusable user interface components for the project. It is designed to ensure consistency and efficiency in building the application's UI.

## Features

- Reusable and customizable UI components.
- Consistent design system across the application.
- Easy integration with other libraries in the project.

## Installation

To use the `ui` library in your project, import the required components:

```typescript
import { IconLabel } from '@talk-to-agent/ui';
```

## Example Usage

Here is an example of how to use a component from the `ui` library:

```typescript
import { Coins } from '@talk-to-agent/assets';
import { IconLabel } from '@project/ui';

export function App() {
  return <IconLabel Icon={Coins} label="Reduce costs by 40%." />;
}
```
