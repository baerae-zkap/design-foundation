# Tab

> Underline-style tab strip for switching between views within a section.

## When to Use

- Switching between sibling content views on the same page (e.g., Overview / Reviews / Details).
- Section-level navigation inside a screen, below the top navigation bar.
- When content categories are known and finite (not dynamically filtered).

## When NOT to Use

- Top-level app navigation between major sections — use `BottomNavigation` instead.
- Scrollable category filtering with pill-shaped chips — use `CategoryNavigation` instead.
- Exclusive option selection with 2–5 choices rendered as equal-width pill segments — use `SegmentedControl` instead.

## Import

```tsx
import { Tab } from '@baerae-zkap/design-system';
import type { TabItem, TabSize, TabResize, TabProps } from '@baerae-zkap/design-system';
```

## Props

### TabProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `TabItem[]` | — | Yes | Tab definitions. Renders nothing if empty. |
| `value` | `string` | — | Yes | `value` of the currently selected tab. Falls back to the first item if no match is found. |
| `onChange` | `(value: string) => void` | — | Yes | Called with the selected tab's `value` when clicked. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Controls tab height and font size. |
| `resize` | `'hug' \| 'fill'` | `'hug'` | No | `hug` sizes tabs to their text with horizontal scroll; `fill` distributes tabs equally across the container width. |
| `fixedPadding` | `boolean` | `false` | No | When `true`, uses fixed horizontal padding on the tab strip instead of the default flush edges. |
| `iconButton` | `ReactNode` | — | No | Optional icon button pinned to the trailing edge with a gradient fade. |
| `className` | `string` | — | No | Additional CSS class on the root wrapper `<div>`. |

### TabItem

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | Yes | Display text for the tab. |
| `value` | `string` | — | Yes | Unique identifier used as the selection key. |
| `disabled` | `boolean` | `false` | No | When `true`, the tab is non-interactive and styled with disabled text color. |

### Size Reference

| Size | Height | Font Size |
|------|--------|-----------|
| `sm` | input.sm | `xs` |
| `md` | input.md | `sm` |
| `lg` | input.lg | `md` |

## Basic Usage

```tsx
import { Tab } from '@baerae-zkap/design-system';

function ProductDetail() {
  const [tab, setTab] = useState('overview');

  return (
    <>
      <Tab
        items={[
          { label: 'Overview', value: 'overview' },
          { label: 'Reviews', value: 'reviews' },
          { label: 'Details', value: 'details' },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === 'overview' && <Overview />}
      {tab === 'reviews' && <Reviews />}
      {tab === 'details' && <Details />}
    </>
  );
}
```

## Variants

### Fill Resize

Tabs expand equally to fill the container width — best for 2–4 short-label tabs.

```tsx
<Tab
  items={[
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Done', value: 'done' },
  ]}
  value={selected}
  onChange={setSelected}
  resize="fill"
/>
```

### Hug Resize with Scroll

Default behavior — tabs size to their text content and the strip scrolls horizontally when tabs overflow.

```tsx
<Tab items={manyTabs} value={selected} onChange={setSelected} resize="hug" />
```

### With Trailing Icon Button

```tsx
<Tab
  items={tabs}
  value={selected}
  onChange={setSelected}
  iconButton={
    <IconButton aria-label="More options" onClick={openMenu}>
      <MoreIcon />
    </IconButton>
  }
/>
```

### Disabled Tab

```tsx
<Tab
  items={[
    { label: 'Available', value: 'a' },
    { label: 'Locked', value: 'b', disabled: true },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

### Sizes

```tsx
<Tab items={tabs} value={v} onChange={setV} size="sm" />
<Tab items={tabs} value={v} onChange={setV} size="lg" />
```

## States

| State | Behavior |
|-------|----------|
| Selected | Brand-colored underline border; text in `content.brand.default`; font weight `medium`. |
| Unselected (default) | No underline; text in `content.base.secondary`; font weight `regular`. |
| Unselected (hover/press) | Text shifts to `content.base.default`. |
| Disabled | Text in `content.disabled.default`; cursor `not-allowed`; not keyboard-focusable. |
| Strip bottom border | Full-width `border.base.default` line always visible beneath the tab row. |

## Accessibility

- The scrollable strip renders as `<nav role="tablist">`.
- Each button has `role="tab"`, `aria-selected`, and `aria-disabled` set accordingly.
- The selected tab has `tabIndex={0}`; unselected and disabled tabs have `tabIndex={-1}`.
- Disabled tabs are excluded from keyboard focus entirely.
- Scrollbar is visually hidden but scroll remains functional via touch/trackpad.

## Do / Don't

**Do** use `resize="fill"` for short labels (2–4 tabs) to create a balanced, full-width appearance.

**Don't** use `resize="fill"` with long labels — text will be truncated; prefer `resize="hug"` with scroll.

**Do** keep tab labels short and noun-based (e.g., "Reviews", "Details") rather than verb-based.

**Don't** disable tabs to hide content — if content is conditionally unavailable, consider omitting the tab from the `items` array entirely.

**Do** sync the selected tab value with the URL (query param or path segment) for shareable deep links.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.content.brand.default` | Selected tab text |
| `cssVarColors.content.base.secondary` | Unselected tab text |
| `cssVarColors.content.base.default` | Hovered/pressed unselected tab text |
| `cssVarColors.content.disabled.default` | Disabled tab text |
| `cssVarColors.surface.brand.default` | Selected tab underline border |
| `cssVarColors.border.base.default` | Full-width strip bottom border |
| `cssVarColors.surface.base.default` | Trailing icon gradient fade end color |
| `borderWidth.strong` | Selected tab underline thickness |
| `borderWidth.default` | Strip bottom border thickness |
| `spacing.component.input.height.*` | Tab heights per size |
| `spacing.primitive[3]`, `spacing.primitive[4]`, `spacing.primitive[5]` | Horizontal padding per size |
| `spacing.primitive[14]` | Trailing icon slot reserved width |
| `typography.fontWeight.medium`, `typography.fontWeight.regular` | Selected vs unselected font weight |

## Related Components

- `CategoryNavigation` — Pill-chip scrollable row for content category filtering.
- `SegmentedControl` — Pill-shaped exclusive option selector for 2–5 mode choices.
- `BottomNavigation` — Fixed bottom tab bar for top-level app section switching.
