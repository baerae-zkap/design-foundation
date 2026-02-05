# @zkap/design-system

ZKAP Design System - React & React Native Components with AI-readable documentation.

## Installation

```bash
npm install @zkap/design-system
# or
yarn add @zkap/design-system
# or
pnpm add @zkap/design-system
```

## Usage

### Web (React)

```tsx
import { Button, TextButton } from '@zkap/design-system';

function App() {
  return (
    <>
      <Button
        buttonType="filled"
        color="brandDefault"
        size="medium"
        onClick={() => console.log('clicked')}
      >
        Confirm
      </Button>

      <TextButton
        variant="arrow"
        color="brandDefault"
        onClick={() => console.log('clicked')}
      >
        Learn More
      </TextButton>
    </>
  );
}
```

### React Native

```tsx
import { Button, TextButton } from '@zkap/design-system/native';

function App() {
  return (
    <>
      <Button
        buttonType="filled"
        color="brandDefault"
        size="medium"
        onPress={() => console.log('pressed')}
      >
        Confirm
      </Button>

      <TextButton
        variant="arrow"
        color="brandDefault"
        onPress={() => console.log('pressed')}
      >
        Learn More
      </TextButton>
    </>
  );
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary action button with filled/outlined variants |
| `TextButton` | Lightweight text-based action button |
| `ActionArea` | Layout pattern for button groups (see docs) |

## AI Documentation

This package includes AI-readable documentation for "vibe coding" workflows.

### Accessing Documentation

AI tools can read the component design rules from the included markdown files:

```
node_modules/@zkap/design-system/docs/COMPONENTS.md  # Main entry point
node_modules/@zkap/design-system/docs/components/Button.md
node_modules/@zkap/design-system/docs/components/TextButton.md
node_modules/@zkap/design-system/docs/components/ActionArea.md
```

### For AI Assistants

When implementing UI with this design system:

1. **Read the docs first**: Check `docs/COMPONENTS.md` for the component overview
2. **Follow design rules**: Each component's `.md` file contains:
   - Anatomy and structure
   - Available variants, sizes, colors
   - Design tokens and spacing rules
   - Usage guidelines and best practices
   - Accessibility requirements

3. **Platform differences**:
   - Web: Use `onClick` for event handlers
   - React Native: Use `onPress` for event handlers

## Design Tokens

### Button Sizes

| Size | Height | Font Size | Horizontal Padding |
|------|--------|-----------|-------------------|
| small | 36px | 14px | 16px |
| medium | 40px | 14px | 16px |
| large | 44px | 14px | 20px |
| xLarge | 48px | 16px | 24px |

### Button Colors

| Color | Use Case |
|-------|----------|
| `brandDefault` | Primary actions |
| `brandSecondary` | Secondary brand actions |
| `baseContainer` | Neutral/tertiary actions |
| `successDefault` | Success/confirmation actions |
| `errorDefault` | Destructive/warning actions |

### TextButton Sizes

| Size | Font Size |
|------|-----------|
| xSmall | 12px |
| small | 14px |
| medium | 16px |
| large | 18px |
| xLarge | 20px |

## Peer Dependencies

- `react` >= 18.0.0
- `react-native` >= 0.70.0 (optional, for native usage)

## License

MIT
