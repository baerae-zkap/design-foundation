# CategoryNavigation

> Horizontally scrollable chip row for filtering or navigating between content categories.

## When to Use

- Letting users filter a content feed by category (e.g., All, Fashion, Food, Travel).
- Providing top-level section switching within a page where full Tab styling is too heavy.
- Lists with many categories that don't all fit on one screen width.

## When NOT to Use

- Fewer than 2 categories — a single chip is meaningless.
- Exclusive view/mode switching with 2–5 options where equal-width tabs make more sense — use `Tab` instead.
- Multi-select filter behavior where multiple chips can be active simultaneously — use `Chip` independently.

## Import

```tsx
import { CategoryNavigation } from '@baerae-zkap/design-system';
import type {
  CategoryNavigationItem,
  CategoryNavigationSize,
  CategoryNavigationProps,
} from '@baerae-zkap/design-system';
```

## Props

### CategoryNavigationProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `CategoryNavigationItem[]` | — | Yes | List of category items. Renders nothing if empty. |
| `value` | `string` | — | Yes | `value` of the currently selected item. Falls back to the first item if no match is found. |
| `onChange` | `(value: string) => void` | — | Yes | Called with the selected item's `value` when a chip is clicked. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | No | Controls chip height, font size, and padding. |
| `iconButton` | `ReactNode` | — | No | Optional icon button pinned to the trailing edge with a fade gradient. |
| `fixedPadding` | `boolean` | `false` | No | When `true`, uses a fixed horizontal padding instead of a responsive `clamp()` range. |
| `className` | `string` | — | No | Additional CSS class applied to the root wrapper `<div>`. |

### CategoryNavigationItem

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | Yes | Display text for the chip. |
| `value` | `string` | — | Yes | Unique identifier used as the selection key. |

### Size Reference

| Size | Height | Font Size |
|------|--------|-----------|
| `sm` | chip.sm | `xs` |
| `md` | chip.md | `sm` |
| `lg` | chip.lg | `md` |
| `xl` | 48px | `lg` |

## Basic Usage

```tsx
import { CategoryNavigation } from '@baerae-zkap/design-system';

function Feed() {
  const [category, setCategory] = useState('all');

  return (
    <CategoryNavigation
      items={[
        { label: 'All', value: 'all' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Food', value: 'food' },
        { label: 'Travel', value: 'travel' },
        { label: 'Tech', value: 'tech' },
      ]}
      value={category}
      onChange={setCategory}
    />
  );
}
```

## Variants

### With Trailing Icon Button

Pass `iconButton` to show a button (e.g., a filter icon) pinned to the trailing edge. A gradient fade masks the scroll area behind it.

```tsx
<CategoryNavigation
  items={categories}
  value={selected}
  onChange={setSelected}
  iconButton={
    <IconButton aria-label="Filter" onClick={openFilterSheet}>
      <FilterIcon />
    </IconButton>
  }
/>
```

### Fixed Padding

When the container width is known and stable, use `fixedPadding` to prevent chip padding from scaling with viewport width.

```tsx
<CategoryNavigation
  items={categories}
  value={selected}
  onChange={setSelected}
  fixedPadding
/>
```

### Size Variants

```tsx
<CategoryNavigation size="sm" items={items} value={v} onChange={setV} />
<CategoryNavigation size="lg" items={items} value={v} onChange={setV} />
```

## States

| State | Behavior |
|-------|----------|
| Selected | Chip background becomes `surface.brand.default`; text becomes `content.base.onColor`. |
| Selected + Pressed | Background shifts to `surface.brand.defaultPressed`. |
| Unselected | Transparent background; text is `content.base.default`. |
| Unselected + Hover/Press | Background becomes `surface.base.defaultPressed`. |
| Pressed (any) | Chip scales to `0.97` with a 150ms ease transition. |

## Accessibility

- The scrollable area renders as `<nav role="tablist">`.
- Each chip button has `role="tab"` and `aria-selected` reflecting its selection state.
- The selected chip has `tabIndex={0}`; all others have `tabIndex={-1}` (roving tabindex).
- Scrollbar is hidden visually (`scrollbar-width: none`) but scroll remains functional via touch/trackpad.

## Do / Don't

**Do** keep `value` stable across re-renders — it drives the controlled selection state.

**Don't** pass duplicate `value` strings across items; only the first match will be considered selected.

**Do** use `iconButton` for a supplementary action (filter, sort) that relates to the category list.

**Don't** use CategoryNavigation as a multi-select filter — it supports only single selection. Use `Chip` with independent state for multi-select.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.brand.default` | Selected chip background |
| `cssVarColors.surface.brand.defaultPressed` | Selected chip pressed background |
| `cssVarColors.surface.base.defaultPressed` | Unselected chip hover/press background |
| `cssVarColors.content.base.onColor` | Selected chip text |
| `cssVarColors.content.base.default` | Unselected chip text |
| `cssVarColors.surface.base.default` | Trailing fade gradient end color |
| `radius.primitive.full` | Pill shape for each chip |
| `spacing.component.chip.height.*` | Chip heights per size |
| `spacing.component.chip.paddingX.*` | Chip horizontal padding per size |
| `spacing.primitive[2]`, `spacing.primitive[3]` | Inter-chip gap per size |
| `spacing.primitive[14]` | Trailing icon slot reserved width |

## Related Components

- `Tab` — Underline-style tab strip with equal-width or hug-content layout.
- `Chip` — Individual filter/tag chip for multi-select or standalone use.
- `SegmentedControl` — Pill-shaped exclusive selector for 2–5 options.
