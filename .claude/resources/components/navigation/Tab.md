# Tab

> Status: stable
> Import: `import { Tab } from '@baerae-zkap/design-system'`

## What It Is

An underline-style tab strip for switching between content views. Supports horizontal scrolling (hug mode) or equal-width distribution (fill mode), with an optional trailing icon button slot.

## When to Use

- Switching between content panels within the same page section
- View mode switching (e.g., "List" / "Grid" / "Map")
- Sub-navigation within a page (below the top navigation)

## When NOT to Use

- Category/filter selection with pill shapes -- use `CategoryNavigation`
- App-level bottom navigation -- use `BottomNavigation`
- Exclusive mode toggle with 2-5 solid segments -- use `SegmentedControl`

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `TabItem[]` | -- | Yes | Tab definitions |
| `value` | `string` | -- | Yes | Currently selected tab value |
| `onChange` | `(value: string) => void` | -- | Yes | Selection change callback |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Tab height and font size preset |
| `resize` | `'hug' \| 'fill'` | `'hug'` | No | `hug`: text-width tabs with overflow scroll. `fill`: equal-width tabs filling container |
| `fixedPadding` | `boolean` | `false` | No | Add horizontal padding to scroll container |
| `iconButton` | `ReactNode` | -- | No | Trailing icon button with gradient fade overlay |
| `className` | `string` | -- | No | CSS class on root |

### TabItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | Yes | Tab label text |
| `value` | `string` | Yes | Unique identifier for selection |
| `disabled` | `boolean` | No | Disables this tab |

## Common Patterns

### Basic tab strip

```tsx
const [view, setView] = useState('all');

<Tab
  items={[
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]}
  value={view}
  onChange={setView}
/>
```

### Fill mode for fixed-width container

```tsx
<Tab
  items={[
    { label: 'Overview', value: 'overview' },
    { label: 'Reviews', value: 'reviews' },
  ]}
  value={selected}
  onChange={setSelected}
  resize="fill"
/>
```

### With disabled tab

```tsx
<Tab
  items={[
    { label: 'Info', value: 'info' },
    { label: 'Settings', value: 'settings' },
    { label: 'Admin', value: 'admin', disabled: true },
  ]}
  value={tab}
  onChange={setTab}
/>
```

### With trailing icon button

```tsx
<Tab
  items={tabs}
  value={active}
  onChange={setActive}
  iconButton={<IconButton aria-label="More"><MoreIcon /></IconButton>}
/>
```

## Design Rules

- Selected tab: brand-colored underline (`borderWidth.strong`) + `content.brand.default` text + medium weight.
- Unselected tab: transparent underline + `content.base.secondary` text + regular weight.
- Disabled tab: `content.disabled.default` color + `cursor: not-allowed`.
- Hover/press on unselected: text shifts to `content.base.default`.
- The entire tab strip has a bottom border (`borderWidth.default` + `border.base.default`).
- `hug` mode: tabs are text-width with horizontal scroll and hidden scrollbar.
- `fill` mode: tabs are equally distributed across the container width; no scroll.
- If `value` doesn't match any item's value, the component silently selects the first item (no error thrown).
- Size presets map to input height tokens (`spacing.component.input.height.*`).

## Accessibility

- Root: `<nav role="tablist" aria-label="...">`
- Each tab: `<button role="tab" aria-selected={selected} aria-disabled={disabled}>`
- Roving tabindex: selected tab `tabIndex={0}`, others `tabIndex={-1}`, disabled `tabIndex={-1}`.
- Disabled tabs are announced via `aria-disabled` but remain in the DOM.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.content.brand.default` | -- | Selected tab text color |
| `cssVarColors.content.base.secondary` | -- | Unselected tab text color |
| `cssVarColors.content.base.default` | -- | Hover/press text color |
| `cssVarColors.content.disabled.default` | -- | Disabled tab text color |
| `cssVarColors.surface.brand.default` | -- | Selected underline color |
| `cssVarColors.border.base.default` | -- | Tab strip bottom border |
| `cssVarColors.surface.base.default` | -- | Icon button fade gradient target |
| `borderWidth.default` | 1px | Tab strip bottom border |
| `borderWidth.strong` | -- | Selected tab underline thickness |
| `spacing.component.input.height.sm` | -- | Small tab height |
| `spacing.component.input.height.md` | -- | Medium tab height |
| `spacing.component.input.height.lg` | -- | Large tab height |
| `spacing.primitive[3]` | 12px | Small tab horizontal padding |
| `spacing.primitive[4]` | 16px | Medium tab horizontal padding |
| `spacing.primitive[5]` | 20px | Large tab horizontal padding |
| `typography.fontWeight.medium` | -- | Selected tab weight |
| `typography.fontWeight.regular` | -- | Unselected tab weight |
| `transitions.all` | -- | Color and border transitions |
