# CategoryNavigation

> Status: stable
> Import: `import { CategoryNavigation } from '@baerae-zkap/design-system'`

## What It Is

A horizontally scrollable row of pill-shaped category chips. The selected chip gets a brand-colored fill; unselected chips use a subtle alternative background.

## When to Use

- Filtering content by category (e.g., "All", "Food", "Fashion", "Tech")
- Horizontally scrollable tag-style navigation above a content feed

## When NOT to Use

- View/mode switching with underline indicator -- use `Tab`
- Exclusive mode toggle with 2-5 solid segments -- use `SegmentedControl`
- Multi-select filtering -- use `Chip` with selection state
- Bottom-level app navigation -- use `BottomNavigation`

**CategoryNavigation vs Tab vs SegmentedControl:**
- `CategoryNavigation`: horizontally scrollable pill chips for **filtering content by category** (many items OK, single-select)
- `Tab`: underline-style strip for **switching between content views/panels** within a page section
- `SegmentedControl`: solid segmented bar for **exclusive mode/view toggle** (2-5 options, fixed width)

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `CategoryNavigationItem[]` | -- | Yes | Category options |
| `value` | `string` | -- | Yes | Currently selected category value |
| `onChange` | `(value: string) => void` | -- | Yes | Selection change callback |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | No | Chip size preset |
| `iconButton` | `ReactNode` | -- | No | Trailing icon button (e.g., filter) with fade overlay |
| `fixedPadding` | `boolean` | `false` | No | Use fixed horizontal padding instead of responsive clamp |
| `className` | `string` | -- | No | CSS class on root |

### CategoryNavigationItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | Yes | Display text |
| `value` | `string` | Yes | Unique identifier for selection |

## Common Patterns

### Basic category filter

```tsx
const [category, setCategory] = useState('all');

<CategoryNavigation
  items={[
    { label: 'All', value: 'all' },
    { label: 'Food', value: 'food' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Tech', value: 'tech' },
  ]}
  value={category}
  onChange={setCategory}
/>
```

### With trailing filter icon button

```tsx
<CategoryNavigation
  items={categories}
  value={selected}
  onChange={setSelected}
  iconButton={<IconButton aria-label="Filter"><FilterIcon /></IconButton>}
/>
```

## Design Rules

- Chips are pill-shaped (`radius.primitive.full`).
- Selected chip: brand surface background + onColor text.
- Unselected chip: alternative fill background + default text.
- Press/hover on unselected shows `fill.normal` background.
- Horizontal scroll with hidden scrollbar; `iconButton` slot has a gradient fade overlay.
- Size presets map to chip token heights (`sm`/`md`/`lg` use `spacing.component.chip.height.*`, `xl` uses `spacing.primitive[12]`).

## Accessibility

- Root: `<nav role="tablist" aria-label="...">`
- Each chip: `<button role="tab" aria-selected={selected}>`
- Roving tabindex: selected chip gets `tabIndex={0}`, others `tabIndex={-1}`.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.surface.brand.default` | -- | Selected chip background |
| `cssVarColors.surface.brand.defaultPressed` | -- | Selected chip pressed background |
| `cssVarColors.content.base.onColor` | -- | Selected chip text color |
| `cssVarColors.content.base.default` | -- | Unselected chip text color |
| `cssVarColors.fill.alternative` | -- | Unselected chip background |
| `cssVarColors.fill.normal` | -- | Unselected chip hover/press background |
| `cssVarColors.surface.base.default` | -- | Icon button fade gradient target |
| `radius.primitive.full` | 9999px | Chip border radius |
| `spacing.component.chip.height.*` | -- | Chip heights per size |
| `spacing.component.chip.paddingX.*` | -- | Chip horizontal padding per size |
| `spacing.primitive[2]` | 8px | Gap between chips (sm/md) |
| `spacing.primitive[3]` | 12px | Gap between chips (lg/xl) |
| `typography.fontWeight.medium` | -- | Chip label weight |
| `transitions.all` | -- | Color/bg transition |
