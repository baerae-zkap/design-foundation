# BottomSheet

A presentational overlay component that appears at the bottom of the screen, commonly used for actions, options, or additional content.

## Overview

The BottomSheet component provides a modal-like interface that slides up from the bottom of the screen. It includes an optional drag handle, title, content area, and action buttons.

## Anatomy

```
┌─────────────────────────────┐
│        [Handle]             │  ← Optional drag handle
│                             │
│  Title                      │  ← Optional title
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │  ← Content area
│  │     Content           │  │
│  │                       │  │
│  └───────────────────────┘  │
│  ─────────────────────────  │  ← Optional separator
│  [Cancel]  [Confirm]        │  ← Optional action area
└─────────────────────────────┘
```

### Components

1. **Scrim (Backdrop)**: Semi-transparent overlay behind the sheet
2. **Handle**: Draggable pill-shaped indicator (optional)
3. **Title**: Header text (optional)
4. **Content Area**: Main content container
5. **Action Area**: Button area at the bottom (optional)
6. **Container**: The sheet itself with rounded top corners

## Handle Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| **With Handle** | Shows drag handle | User can dismiss by dragging down |
| **Without Handle** | No drag handle | Button-only dismissal, more formal actions |

## Resize Types

| Type | Description | Behavior |
|------|-------------|----------|
| **Hug** | Content-sized | Height matches content (default) |
| **Flexible** | Starts at 50%, expandable | User can expand to full height |
| **Fill** | Full screen | Takes up entire viewport |
| **Fixed** | Fixed height | Specific height set by developer |

> **Note**: Current implementation supports **Hug** type with maxHeight of 90% screen height.

## Action Area Variants

| Variant | Description | Layout |
|---------|-------------|--------|
| **Strong** | Vertical buttons | Stacked buttons, equal width |
| **Neutral** | Side-by-side buttons | Horizontal layout (Cancel + Confirm) |
| **Cancel** | Single button | Single dismiss button |

## Props

### Common Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `visible` | `boolean` | ✅ | - | Whether the bottom sheet is visible |
| `onClose` | `() => void` | ✅ | - | Callback when the sheet is closed |
| `children` | `ReactNode` | ✅ | - | Content to display in the sheet |
| `title` | `string` | - | - | Optional title for the sheet |
| `showHandle` | `boolean` | - | `true` | Whether to show the drag handle |
| `actionArea` | `ReactNode` | - | - | Optional action buttons at the bottom |
| `scrimColor` | `string` | - | `colors.overlay.dim` | Custom scrim background color |
| `style` | `ViewStyle` | - | - | Additional container styles |
| `testID` | `string` | - | - | Test ID for testing |

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `colors.surface.base.default` | `#ffffff` | Sheet background |
| `colors.surface.base.container` | `#eaebed` | Handle color |
| `colors.overlay.dim` | `rgba(19, 26, 31, 0.40)` | Scrim background |
| `colors.content.base.default` | `#3e4651` | Title text |
| `colors.border.base.default` | `#d6d9dd` | Action area separator |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.component.bottomSheet.padding` | `20px` | Sheet horizontal/bottom padding |
| `spacing.component.bottomSheet.handleGap` | `16px` | Handle to content gap |
| `spacing.component.modal.buttonGap` | `12px` | Button spacing in action area |
| `spacing.primitive[3]` | `12px` | Handle container top padding |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.component.bottomSheet.default` | `20px` | Sheet top corners |
| `radius.primitive.full` | `9999px` | Handle pill shape |

### Dimensions

| Element | Size | Description |
|---------|------|-------------|
| Handle | `36px × 4px` | Pill-shaped drag indicator |
| Max Height | `90% of screen` | Sheet cannot exceed this height |

## Usage Examples

### Basic Usage

```tsx
import { BottomSheet, Button } from '@baerae-zkap/design-system/native';
import { useState } from 'react';

function MyComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        Open Sheet
      </Button>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Text>Sheet content goes here</Text>
      </BottomSheet>
    </>
  );
}
```

### With Title

```tsx
<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Sheet Title"
  showHandle={true}
>
  <Text>Content with title</Text>
</BottomSheet>
```

### With Action Area (Neutral Layout)

```tsx
<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Confirm Action"
  actionArea={
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Button
        buttonType="filled"
        color="baseContainer"
        onPress={() => setVisible(false)}
        style={{ flex: 1 }}
      >
        Cancel
      </Button>
      <Button
        buttonType="filled"
        color="brandDefault"
        onPress={handleConfirm}
        style={{ flex: 1 }}
      >
        Confirm
      </Button>
    </View>
  }
>
  <Text>Are you sure?</Text>
</BottomSheet>
```

### Without Handle

```tsx
<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Important Action"
  showHandle={false}
  actionArea={
    <Button
      buttonType="filled"
      color="brandDefault"
      onPress={() => setVisible(false)}
    >
      Close
    </Button>
  }
>
  <Text>This sheet requires button dismissal</Text>
</BottomSheet>
```

### Scrollable Content

```tsx
<BottomSheet
  visible={visible}
  onClose={() => setVisible(false)}
  title="Terms and Conditions"
>
  <ScrollView style={{ maxHeight: 400 }}>
    {longContent.map((paragraph, i) => (
      <Text key={i}>{paragraph}</Text>
    ))}
  </ScrollView>
</BottomSheet>
```

## Usage Guidelines

### When to Use

| Scenario | Recommendation |
|----------|----------------|
| Contextual actions | ✅ Use for quick actions related to current content |
| Options selection | ✅ Use for presenting list of choices |
| Form inputs | ✅ Use for short forms (3-5 fields max) |
| Confirmations | ✅ Use for destructive action confirmations |
| Additional info | ✅ Use for supplementary content |

### When Not to Use

| Scenario | Alternative |
|----------|-------------|
| Complex multi-step flows | Use full-screen Modal |
| Long forms | Use dedicated screen |
| Critical alerts | Use Alert component |
| Error messages | Use Toast or Snackbar |

## Design Principles

1. **Clear Dismissal**: Always provide an obvious way to close (handle, scrim, or button)
2. **Appropriate Content**: Keep content concise and focused
3. **Action Clarity**: Action buttons should have clear, specific labels
4. **Accessibility**: Ensure touch targets are at least 44px
5. **Performance**: Use for lightweight overlays, not heavy content

## Accessibility

- **Focus Management**: Focus moves to sheet when opened, returns to trigger when closed
- **Keyboard Navigation**: ESC key closes the sheet (web)
- **Screen Readers**: Announced as "dialog" or "menu" depending on content
- **Touch Targets**: Handle and buttons meet minimum 44px size
- **Color Contrast**: Text meets WCAG AA standards (4.5:1)

## Animation

| Phase | Duration | Timing |
|-------|----------|--------|
| Slide Up | Spring animation | damping: 30, stiffness: 300 |
| Scrim Fade In | 250ms | ease-in-out |
| Slide Down | 200ms | ease-in-out |
| Scrim Fade Out | 200ms | ease-in-out |

## Platform Considerations

### iOS
- Respects Safe Area insets
- Native spring animation feel
- Gesture-driven dismissal (with handle)

### Android
- Material Design backdrop behavior
- Hardware back button closes sheet
- Elevation shadow for depth

## Related Components

- **Modal**: For full-screen overlays
- **Popup**: For centered dialogs
- **ActionArea**: For button layouts inside sheet
- **Button**: For action buttons
