# Category Component

Horizontal scrollable category filter with pill and underline variants, designed for filtering content by category.

## Overview

The Category component provides a horizontal list of selectable category items with two visual styles:
- **Pill**: Filled rounded chips (default)
- **Underline**: Text items with animated underline indicator (similar to Tab)

## Import

```tsx
// React Native
import { Category } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { Category } from '@baerae-zkap/design-system/native';

function MyComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Category
      items={[
        { label: 'All' },
        { label: 'Technology' },
        { label: 'Design' },
        { label: 'Business' },
      ]}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
      variant="pill"
      size="medium"
    />
  );
}
```

## Variants

### Pill (Default)
Filled rounded chips with active/inactive states.

```tsx
<Category
  items={categories}
  selectedIndex={selectedIndex}
  onSelect={setSelectedIndex}
  variant="pill"
/>
```

### Underline
Text items with animated underline indicator, similar to Tab component.

```tsx
<Category
  items={categories}
  selectedIndex={selectedIndex}
  onSelect={setSelectedIndex}
  variant="underline"
/>
```

## Sizes

### Small
Compact size for dense layouts.

```tsx
<Category
  items={categories}
  selectedIndex={selectedIndex}
  onSelect={setSelectedIndex}
  size="small"
/>
```

### Medium (Default)
Standard size for general use.

```tsx
<Category
  items={categories}
  selectedIndex={selectedIndex}
  onSelect={setSelectedIndex}
  size="medium"
/>
```

## States

### Default
Normal interactive state.

### Disabled
Individual items can be disabled.

```tsx
<Category
  items={[
    { label: 'All' },
    { label: 'Premium', disabled: true },
    { label: 'Featured' },
  ]}
  selectedIndex={selectedIndex}
  onSelect={setSelectedIndex}
/>
```

### Pressed
Active item uses `colors.surface.brand.defaultPressed`, inactive uses `colors.surface.base.containerPressed`.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `CategoryItem[]` | Yes | - | Array of category items |
| `selectedIndex` | `number` | Yes | - | Currently selected category index (0-indexed) |
| `onSelect` | `(index: number) => void` | Yes | - | Callback when category is selected |
| `variant` | `'pill' \| 'underline'` | No | `'pill'` | Visual variant |
| `size` | `'small' \| 'medium'` | No | `'medium'` | Size variant |
| `style` | `ViewStyle` | No | - | Custom container style |
| `testID` | `string` | No | - | Test ID for automation |

### CategoryItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Category label text |
| `disabled` | `boolean` | No | Whether the category is disabled |

## Design Tokens Used

### Pill Variant

| Property | Token | Value |
|----------|-------|-------|
| Border Radius | `radius.component.chip.pill` | 9999px |
| Gap (between items) | `spacing.primitive[2]` | 8px |
| Small Padding X | `spacing.semantic.horizontal.xs` | 12px |
| Small Padding Y | `spacing.primitive[1]` | 4px |
| Medium Padding X | `spacing.semantic.horizontal.sm` | 16px |
| Medium Padding Y | `spacing.primitive[2]` | 8px |
| Container Padding X | `spacing.semantic.horizontal.sm` | 16px |
| Container Padding Y | `spacing.primitive[2]` | 8px |

#### Colors (Pill)
- Active Background: `colors.surface.brand.default` (#0066ff)
- Active Pressed: `colors.surface.brand.defaultPressed` (#005cd6)
- Inactive Background: `colors.surface.base.container` (#eaebed)
- Inactive Pressed: `colors.surface.base.containerPressed` (#d6d9dd)
- Active Text: `colors.content.base.onColor` (#ffffff)
- Inactive Text: `colors.content.base.default` (#3e4651)
- Disabled Text: `colors.content.disabled.default` (#a7adb5)

### Underline Variant

| Property | Token | Value |
|----------|-------|-------|
| Height | `spacing.component.tabBar.height` | 48px |
| Gap (between items) | `spacing.primitive[5]` | 20px |
| Item Padding X | `spacing.semantic.horizontal.xs` | 12px |
| Item Padding Y | `spacing.semantic.inset.sm` | 16px |
| Container Padding X | `spacing.semantic.horizontal.xs` | 12px |
| Border Radius | `radius.primitive.none` | 0px |
| Indicator Height | - | 2px |

#### Colors (Underline)
- Active Text: `colors.content.base.strong` (#131a1f)
- Inactive Text: `colors.content.base.alternative` (#92999f)
- Disabled Text: `colors.content.disabled.default` (#a7adb5)
- Bottom Border: `colors.border.base.default` (#d6d9dd)
- Indicator: `colors.surface.brand.default` (#0066ff)

## Accessibility

- Uses `Pressable` for proper touch feedback
- Disabled items are non-interactive
- Minimum touch target size maintained
- Supports keyboard navigation (web)
- Proper ARIA labels (web)

## Best Practices

### When to Use
- Filtering content by category
- Showing multiple content sections
- Navigation between related views
- Tag-based filtering

### Pill vs Underline
- **Pill**: More visual weight, standalone filtering
- **Underline**: Lighter weight, primary navigation

### Do's
✅ Use 3-7 categories for optimal UX
✅ Keep labels short and clear
✅ Use consistent labeling convention
✅ Consider horizontal scrolling for many categories

### Don'ts
❌ Don't use for primary navigation (use Tab instead)
❌ Don't use more than 10 categories without search
❌ Don't mix variants in the same context
❌ Don't use long category names (truncate if needed)
