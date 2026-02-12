# Pagination

Classic page number navigation with previous/next arrow buttons. Intelligently shows page numbers with ellipsis for large page ranges.

## Overview

Pagination provides interactive navigation through multiple pages of content. It highlights the current page and provides intuitive prev/next controls. The component automatically handles large page counts with ellipsis.

## Import

### Web
```typescript
import { Pagination } from '@baerae-zkap/design-system';
```

### React Native
```typescript
import { Pagination } from '@baerae-zkap/design-system/native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `totalPages` | `number` | ✅ | - | Total number of pages |
| `currentPage` | `number` | ✅ | - | Current page number (1-indexed) |
| `onPageChange` | `(page: number) => void` | ✅ | - | Callback when page changes |
| `siblingCount` | `number` | - | `1` | Pages shown on each side of current page |
| `disabled` | `boolean` | - | `false` | Disable all interactions |
| `style` | `ViewStyle` (RN) \| `CSSProperties` (Web) | - | - | Custom styles |
| `testID` | `string` | - | - | Test identifier |

## Usage Examples

### Basic Usage

```tsx
import { useState } from 'react';

function Example() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      totalPages={10}
      currentPage={page}
      onPageChange={setPage}
    />
  );
}
```

### Few Pages (No Ellipsis)

```tsx
<Pagination
  totalPages={5}
  currentPage={3}
  onPageChange={(page) => console.log(page)}
/>
// Renders: [<] [1] [2] [3] [4] [5] [>]
```

### Many Pages (With Ellipsis)

```tsx
<Pagination
  totalPages={20}
  currentPage={10}
  onPageChange={(page) => console.log(page)}
  siblingCount={1}
/>
// Renders: [<] [1] [...] [9] [10] [11] [...] [20] [>]
```

### Custom Sibling Count

```tsx
<Pagination
  totalPages={20}
  currentPage={10}
  onPageChange={(page) => console.log(page)}
  siblingCount={2}
/>
// Renders: [<] [1] [...] [8] [9] [10] [11] [12] [...] [20] [>]
```

### Disabled State

```tsx
<Pagination
  totalPages={10}
  currentPage={5}
  onPageChange={() => {}}
  disabled={true}
/>
```

## Page Range Logic

The pagination algorithm always shows:
- **First page** (1)
- **Last page** (totalPages)
- **Current page** and **sibling pages** around it
- **Ellipsis** when there's a gap > 1

Example with `currentPage=5`, `totalPages=10`, `siblingCount=1`:
```
[<] [1] [...] [4] [5] [6] [...] [10] [>]
```

Example with `currentPage=2`, `totalPages=10`, `siblingCount=1`:
```
[<] [1] [2] [3] [...] [10] [>]
```

## Design Tokens

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.primitive[1]` | 4px | Gap between buttons |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.component.button.sm` | 8px | Page button border radius |

### Button Size

- Width: 36px
- Height: 36px

### Colors

**Active Page Button:**
- Background: `colors.surface.brand.default` (#0066ff)
- Background (pressed): `colors.surface.brand.defaultPressed` (#005cd6)
- Text: `colors.content.base.onColor` (white)

**Inactive Page Button:**
- Background: `transparent`
- Background (pressed): `colors.surface.base.container` (#eaebed)
- Text: `colors.content.base.default` (#3e4651)

**Arrow Buttons:**
- Icon color: `colors.content.base.default` (#3e4651)
- Icon color (disabled): `colors.content.disabled.default` (#a7adb5)
- Background (pressed): `colors.surface.base.container` (#eaebed)

**Ellipsis:**
- Text color: `colors.content.base.alternative` (#92999f)

**Disabled State:**
- Text color: `colors.content.disabled.default` (#a7adb5)

### Typography

| Element | Font Size | Font Weight |
|---------|-----------|-------------|
| Active page | 14px | 600 |
| Inactive page | 14px | 400 |
| Ellipsis | 14px | 400 |

## Accessibility

1. **Keyboard Navigation**: All buttons should be keyboard-accessible
2. **ARIA Labels**: Add descriptive labels for screen readers
   - Prev button: "Previous page"
   - Next button: "Next page"
   - Page button: "Page {n}"
3. **Disabled State**: Clearly indicates disabled prev/next buttons
4. **Focus Indicators**: Visible focus states for keyboard users

## Best Practices

1. **Sibling Count**:
   - Use `siblingCount={1}` for most cases (default)
   - Use `siblingCount={2}` for desktop with more space
   - Avoid values > 2 to prevent visual clutter

2. **Page Count Display**:
   - For < 7 pages: All pages shown, no ellipsis
   - For 7-20 pages: Ellipsis on one or both sides
   - For > 20 pages: Consider alternative pagination (infinite scroll, load more)

3. **Position**: Typically centered at bottom of content

4. **Mobile Considerations**:
   - Buttons are sized for touch targets (36x36px)
   - Gap provides adequate spacing for tap accuracy

## Related Components

- **PageCounter**: Display-only page indicator (e.g., "1 / 5")
- **PaginationDots**: Visual dot indicators for carousels
- **Progress Tracker**: Shows progress through multi-step flows
