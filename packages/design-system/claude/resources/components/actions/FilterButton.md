# FilterButton

> Source: `src/components/FilterButton/FilterButton.tsx`

> A compact filter selection button with label and trailing chevron icon. Changes visual appearance when active (selected).

## When to Use
- Filtering content lists, search results, or data tables
- Quick single/multi-select filter controls above content
- Triggering dropdown menus or bottom sheets for filter options

## When NOT to Use
- General action buttons — use Button
- Tag display or multi-select tokens — use Chip
- Tab-like exclusive mode switching — use SegmentedControl
- Form field selection — use Radio/RadioGroup

## Import
```tsx
import { FilterButton } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Button style. `filled` = solid background, `outlined` = border only. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size. |
| `active` | `boolean` | `false` | Whether the filter is active/selected. |
| `activeLabel` | `ReactNode` | — | Label shown when active (replaces `children`). |
| `expanded` | `boolean` | `false` | Dropdown open state. Rotates chevron 180°. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `children` | `ReactNode` | — | **Required.** Label text. |
| `style` | `React.CSSProperties` | — | Additional inline styles. |

## Basic Usage

```tsx
import { FilterButton } from '@baerae-zkap/design-system';

// Default
<FilterButton>Category</FilterButton>

// Outlined variant
<FilterButton variant="outlined">Price</FilterButton>

// Active with label
<FilterButton active activeLabel="Seoul">Location</FilterButton>

// Expanded (dropdown open)
<FilterButton expanded>Sort</FilterButton>

// Disabled state
<FilterButton disabled>Filters</FilterButton>
```

## Sizes

| Size | Height | Font Size | Icon Size |
|------|--------|-----------|-----------|
| `small` | 32px | 13px | 16px |
| `medium` | 36px | 14px | 16px |
| `large` | 40px | 16px | 18px |

```tsx
// Size variants
<FilterButton size="small">Small</FilterButton>
<FilterButton size="medium">Medium</FilterButton>
<FilterButton size="large">Large</FilterButton>
```

## Anatomy

```
[Container: paddingLeft | Label text | gap | Chevron ▼ | paddingRight]
```

The chevron rotates 180° when `expanded={true}`.

## States

| State | When | Styling |
|-------|------|---------|
| `default` | Not selected | Standard appearance |
| `hover` | Cursor over button | Subtle background change |
| `pressed` | Mouse/touch down | Pressed state from `usePressable` |
| `active` | `active={true}` | Inverted colors (filled default) or brand tint (outlined) |
| `expanded` | `expanded={true}` | Chevron rotates 180° |
| `disabled` | `disabled={true}` | Opacity 0.38, pointer-events disabled |

## Variants

### Filled (Default)

Used for primary filter controls.

```tsx
// Default (not active)
<FilterButton>Category</FilterButton>

// Active (inverted)
<FilterButton active activeLabel="Electronics">Category</FilterButton>
```

**Behavior:**
- Default: Gray container background + default text
- Active: Dark background + white text (inverted)
- Hover: Subtle lightening/darkening
- Disabled: Opacity 0.38

### Outlined

Used for secondary or less-prominent filters.

```tsx
// Default (not active)
<FilterButton variant="outlined">Price Range</FilterButton>

// Active (brand tint)
<FilterButton variant="outlined" active activeLabel="$0-50">Price Range</FilterButton>
```

**Behavior:**
- Default: Transparent background + border + default text
- Active: Brand tint background + brand border + brand text
- Hover: Subtle border color change
- Disabled: Opacity 0.38

## Usage Guidelines

### Dropdown Integration

Use with a popover or bottom sheet to filter content:

```tsx
const [categoryFilter, setCategoryFilter] = useState(null);
const [filterOpen, setFilterOpen] = useState(false);

<div style={{ display: 'flex', gap: 8 }}>
  <FilterButton
    active={!!categoryFilter}
    activeLabel={categoryFilter}
    expanded={filterOpen}
    onClick={() => setFilterOpen(!filterOpen)}
  >
    Category
  </FilterButton>

  {filterOpen && (
    <Popover anchorEl={filterRef.current} onClose={() => setFilterOpen(false)}>
      <Radio value="electronics" label="Electronics" onChange={(val) => { setCategoryFilter(val); setFilterOpen(false); }} />
      <Radio value="clothing" label="Clothing" onChange={(val) => { setCategoryFilter(val); setFilterOpen(false); }} />
    </Popover>
  )}
</div>
```

### Multiple Filters

Show multiple filter buttons in a row:

```tsx
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <FilterButton
    active={sortBy === 'newest'}
    activeLabel="Newest"
    onClick={() => setSortBy('newest')}
  >
    Sort
  </FilterButton>

  <FilterButton
    active={!!priceRange}
    activeLabel={priceRange}
    onClick={() => setPriceOpen(!priceOpen)}
    expanded={priceOpen}
  >
    Price
  </FilterButton>

  <FilterButton
    variant="outlined"
    active={!!category}
    activeLabel={category}
    onClick={() => setCategoryOpen(!categoryOpen)}
    expanded={categoryOpen}
  >
    Category
  </FilterButton>
</div>
```

### Best Practices

**Do:**
- Use `activeLabel` to show the selected value inside the button
- Group related filters together horizontally
- Provide visual feedback when a filter is active
- Use `expanded` to indicate dropdown state
- Keep filter labels short and scannable

**Don't:**
- Use FilterButton for general-purpose actions — use Button
- Nest FilterButton inside another interactive element
- Use both `children` and `activeLabel` with conflicting meanings — activeLabel should be brief and replace children when active
- Place more than 4-5 filter buttons in a single row on mobile — allow wrapping or scrolling

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.surface.base.container` | Filled default background |
| `cssVarColors.content.base.default` | Default text, filled active background |
| `cssVarColors.content.base.onColor` | Filled active text (white) |
| `cssVarColors.surface.brand.secondary` | Outlined active background |
| `cssVarColors.content.brand.default` | Outlined active text and border |
| `cssVarColors.border.solid.default` | Outlined default border |
| `cssVarColors.border.brand.default` | Outlined active border |
| `spacing.component.filterButton.paddingX` | Horizontal padding |
| `spacing.component.filterButton.paddingY` | Vertical padding |
| `spacing.component.filterButton.gap` | Gap between label and chevron |
| `spacing.component.filterButton.iconSize` | Chevron icon size |
| `radius.component.filterButton.sm` | Border radius for small |
| `radius.component.filterButton.md` | Border radius for medium |
| `radius.component.filterButton.lg` | Border radius for large |
| `opacity.disabled` | Opacity when disabled (0.38) |

## Accessibility

- Renders as a `<button>` element with proper semantic role.
- Uses `aria-pressed="true"` when active to indicate selected state.
- Uses `aria-expanded="true"` when expanded to indicate dropdown open state.
- Keyboard accessible: Tab to focus, Enter or Space to activate.
- Chevron icon provides visual indicator of dropdown state.
- Sufficient color contrast in both light and dark modes.

```tsx
<FilterButton
  active={isActive}
  aria-pressed={isActive}
  expanded={isOpen}
  aria-expanded={isOpen}
>
  Filter
</FilterButton>
```

## Related Components
- `Chip` — Tag or filter token display with close/select behavior; supports multi-color and multi-select
- `SegmentedControl` — Exclusive tab-like switching between 2-5 options
- `Button` — General-purpose action button with more prominence
- `Radio` / `RadioGroup` — Single-select from a group of options (often paired with FilterButton for dropdown content)
