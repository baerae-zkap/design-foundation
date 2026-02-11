# PaginationDots Component

Dot-based page indicator for carousels, sliders, and multi-step flows with smooth animated transitions.

## Overview

The PaginationDots component displays a horizontal row of dots representing pages. The active dot is highlighted, and distant dots scale down progressively when there are many pages.

## Import

```tsx
// React Native
import { PaginationDots } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { PaginationDots } from '@baerae-zkap/design-system/native';

function MyCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PaginationDots
      totalPages={5}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      size="medium"
    />
  );
}
```

## Sizes

### Small
Compact dots for dense layouts or small carousels.

```tsx
<PaginationDots
  totalPages={5}
  currentPage={currentPage}
  size="small"
/>
```

**Dot size**: 6px

### Medium (Default)
Standard dots for general use.

```tsx
<PaginationDots
  totalPages={5}
  currentPage={currentPage}
  size="medium"
/>
```

**Dot size**: 8px

## Interactive vs Passive

### Passive (Default)
Dots are non-interactive, purely for indication.

```tsx
<PaginationDots
  totalPages={5}
  currentPage={currentPage}
/>
```

### Interactive
Dots are pressable to navigate to specific pages.

```tsx
<PaginationDots
  totalPages={5}
  currentPage={currentPage}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

## Progressive Scaling

When `totalPages > maxVisibleDots`, dots far from the current page scale down to 0.6x.

```tsx
<PaginationDots
  totalPages={10}
  currentPage={currentPage}
  maxVisibleDots={5}
/>
```

**Default `maxVisibleDots`**: 5

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `totalPages` | `number` | Yes | - | Total number of pages |
| `currentPage` | `number` | Yes | - | Currently active page (0-indexed) |
| `onPageChange` | `(page: number) => void` | No | - | Callback when dot is pressed (makes dots interactive) |
| `size` | `'small' \| 'medium'` | No | `'medium'` | Size variant |
| `maxVisibleDots` | `number` | No | `5` | Maximum visible dots before progressive scaling |
| `style` | `ViewStyle` | No | - | Custom container style |
| `testID` | `string` | No | - | Test ID for automation |

## Design Tokens Used

| Property | Token | Value |
|----------|-------|-------|
| Gap (between dots) | `spacing.primitive[2]` | 8px |
| Container Padding Y | `spacing.primitive[2]` | 8px |
| Border Radius | `radius.primitive.full` | 9999px |
| Small Dot Size | - | 6px |
| Medium Dot Size | - | 8px |
| Touch Target Size | - | 24px (when interactive) |
| Far Dot Scale | - | 0.6 |

### Colors

- Active Dot: `colors.content.base.strong` (#131a1f)
- Inactive Dot: `colors.fill.normal` (rgba(104, 112, 122, 0.22))
- Inactive Opacity: 0.4

## Animations

### Dot Scale
Spring animation when dot becomes far/near from active.
- **Tension**: 300
- **Friction**: 25

### Dot Opacity
Timing animation on active state change.
- **Duration**: 300ms

## Accessibility

- Interactive dots have 24px minimum touch target
- Active dot has higher opacity for better visibility
- Animated state changes are smooth and not jarring
- Non-interactive mode for passive indication

## Best Practices

### When to Use
- Image carousels
- Multi-step forms
- Onboarding flows
- Content sliders

### Do's
✅ Use 3-10 dots for optimal UX
✅ Keep dots at bottom center of carousel
✅ Use passive mode when swipe is the primary navigation
✅ Use interactive mode for touch-based navigation
✅ Consider progressive scaling for many pages

### Don'ts
❌ Don't use for more than 15 pages (use page counter instead)
❌ Don't use in navigation bars (use Tab instead)
❌ Don't make dots too small (minimum 6px)
❌ Don't use without visual container context
❌ Don't animate too aggressively (jarring for users)

## Related Components

- **Tab**: For primary navigation with labels
- **Category**: For category filtering with labels
- **Progress Tracker**: For linear multi-step flows with labels
- **Page Counter**: For text-based page indication (e.g., "3/10")
