# PageCounter

A display component that shows current page position in "current / total" format (e.g., "1 / 5"). Typically overlaid on images or carousels.

## Overview

PageCounter is a non-interactive display component with a pill-shaped container. It supports two visual variants (frosted glass or solid background) and two sizes.

## Import

### Web
```typescript
import { PageCounter } from '@baerae-zkap/design-system';
```

### React Native
```typescript
import { PageCounter } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentPage` | `number` | ✅ | - | Current page number (1-indexed) |
| `totalPages` | `number` | ✅ | - | Total number of pages |
| `variant` | `'normal' \| 'alternative'` | - | `'normal'` | Visual variant (frosted glass or solid) |
| `size` | `'small' \| 'medium'` | - | `'medium'` | Size of the counter |
| `style` | `ViewStyle` (RN) \| `CSSProperties` (Web) | - | - | Custom styles |
| `testID` | `string` | - | - | Test identifier |

## Usage Examples

### Basic Usage

```tsx
<PageCounter currentPage={1} totalPages={5} />
```

### Alternative Variant

```tsx
<PageCounter
  currentPage={2}
  totalPages={10}
  variant="alternative"
/>
```

### Small Size

```tsx
<PageCounter
  currentPage={3}
  totalPages={5}
  size="small"
/>
```

### Overlaid on Image

```tsx
<View style={{ position: 'relative' }}>
  <Image source={...} />
  <PageCounter
    currentPage={1}
    totalPages={5}
    style={{ position: 'absolute', top: 16, right: 16 }}
  />
</View>
```

## Design Tokens

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.primitive[2]` | 8px | Small size horizontal padding |
| `spacing.semantic.horizontal.xs` | 12px | Medium size horizontal padding |
| `spacing.primitive[1]` | 4px | Vertical padding (both sizes) |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.primitive.full` | 9999px | Pill-shaped container |

### Colors

**Normal Variant (frosted glass):**
- Background: `colors.overlay.dim` (grey 15 + 40% alpha) - rgba(0,0,0,0.4)
- Text: `palette.static.white` (#ffffff)

**Alternative Variant (solid):**
- Background: `colors.surface.base.container` (#eaebed)
- Text: `colors.content.base.strong` (#131a1f)

### Typography

| Size | Font Size |
|------|-----------|
| Small | 11px |
| Medium | 13px |

Font Weight:
- Current page: 700 (bold)
- Divider " / ": 400 (regular, 80% opacity)
- Total pages: 400 (regular)

## Accessibility

- Non-interactive component (no focus or tap states)
- Clear contrast ratios for both variants
- Consider adding aria-label in web implementations: `"Page {current} of {total}"`

## Best Practices

1. **Positioning**: Typically positioned in top-right corner of images or carousels
2. **Variant Selection**:
   - Use `normal` (frosted glass) over dark images
   - Use `alternative` (solid) over light backgrounds
3. **Size Selection**:
   - Use `small` for compact UI or mobile
   - Use `medium` for desktop or larger screens
4. **Pagination**: Always pair with swipeable/clickable pagination controls for interaction

## Related Components

- **Pagination**: Interactive page navigation with prev/next buttons
- **PaginationDots**: Visual dot indicators for pagination
- **Progress Indicator**: Shows progress through a multi-step flow
