# ListCell

> A single-row horizontal list item for settings menus, option lists, and navigation rows.

## When to Use
- Settings screens with label + current value pairs
- Navigation menus where each row leads to a sub-screen
- Option lists with a leading icon or avatar and a trailing control
- Any list where each item is a simple horizontal label + trailing element

## When NOT to Use
- Rows with a large thumbnail image — use `ListCard` instead
- A standalone tappable content block with custom layout — use `Card` instead
- Table-style data with multiple columns — use a semantic `<table>` instead

## Import
```tsx
import { ListCell } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Main label text. Truncated with ellipsis when too long. |
| `leading` | `ReactNode` | — | Left slot — icon, avatar, or any node. Flex-shrink: 0. |
| `description` | `ReactNode` | — | Secondary text below the title. Smaller and secondary-colored. |
| `trailing` | `ReactNode` | — | Right slot — value string, `Switch`, `ContentBadge`, or icon. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls min-height, padding, and font sizes. |
| `verticalAlign` | `'top' \| 'center'` | `'center'` | Vertical alignment of the row contents. Use `top` when description is multi-line. |
| `onClick` | `() => void` | — | Optional. Makes the row interactive with press states. |
| `withArrow` | `boolean` | `false` | Appends a right-facing chevron icon to the trailing area. |
| `divider` | `boolean` | `false` | Reserved prop — dividers are not currently rendered visually. |
| `style` | `React.CSSProperties` | — | Additional inline styles on the container. |

## Basic Usage

```tsx
import { ListCell, Switch, ContentBadge } from '@baerae-zkap/design-system';

// Navigation row with arrow
<ListCell
  title="Language"
  trailing="English"
  withArrow
  onClick={() => navigate('/settings/language')}
/>

// Setting with a Switch trailing
<ListCell
  title="Push Notifications"
  description="Receive alerts for new activity"
  trailing={<Switch checked={notifications} onChange={setNotifications} />}
  verticalAlign="top"
/>

// With a leading icon
<ListCell
  leading={<UserIcon size={24} />}
  title="hong@example.com"
  description="Primary account"
  withArrow
  onClick={() => navigate('/profile')}
/>

// Static info row (no onClick)
<ListCell
  title="App Version"
  trailing="2.4.1"
/>
```

## Sizes

| Size | Min Height | Padding Y | Title Size | Description Size |
|------|-----------|-----------|------------|-----------------|
| `small` | from token `listCell.minHeight.sm` | 8px | 14px | 12px |
| `medium` | from token `listCell.minHeight.md` | 12px | 16px | 14px |
| `large` | from token `listCell.minHeight.lg` | 16px | 16px | 14px |

## Toss-Style Inset Press Area

ListCell implements an inset pressed region — the interactive background is applied with a small horizontal margin (`4px` each side) and rounded corners (`radius.primitive.md`). This means the pressed highlight does not bleed to the screen edges, matching the Toss design system's list cell behavior. No visible dividers are used between cells.

## States

| State | Behavior |
|-------|----------|
| Default | Transparent background |
| Hovered (interactive) | `surface.base.defaultPressed` background on inset area |
| Pressed (interactive) | Same tint + `scale(0.97)` transform |
| Focused (keyboard) | 2px brand-colored outline with 2px offset |
| Static (no `onClick`) | No hover, default cursor |

## Accessibility

- When `onClick` is provided, renders as `role="button"` with `tabIndex={0}`.
- `Enter` activates on `keyDown`; `Space` activates on `keyUp`.
- Focus ring appears only on keyboard navigation (`:focus-visible` check with safe fallback).
- If `leading` is an icon without accompanying label text, provide `aria-label` on the `ListCell` or ensure the title describes the row.
- If `trailing` is a `Switch`, the Switch handles its own aria state — do not add redundant roles to the cell.

## Do / Don't
- Do: Use `withArrow` to signal that the row navigates to a new screen.
- Do: Use `trailing={<Switch>}` for immediate-effect settings; use `trailing={<Checkbox>}` for form-submitted values.
- Do: Set `verticalAlign="top"` when `description` is long or multi-line.
- Don't: Place a full `Button` in the `trailing` slot — use a small `IconButton` or `ContentBadge`.
- Don't: Use `ListCell` for media-heavy rows with large thumbnails — use `ListCard`.
- Don't: Add custom bottom borders or divider `<hr>` elements between cells.

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.surface.base.defaultPressed` | Hover/pressed background |
| `cssVarColors.content.base.default` | Title text |
| `cssVarColors.content.base.secondary` | Description text |
| `cssVarColors.content.base.neutral` | Trailing chevron icon color |
| `cssVarColors.content.brand.default` | Focus ring color |
| `radius.primitive.md` | Inset pressed area corner radius |
| `spacing.primitive[1]` (4) | Inset margin |
| `spacing.primitive[4]` (16) | Horizontal padding |
| `typography.fontWeight.medium` | Title font weight |
| `typography.fontWeight.regular` | Description font weight |

## Related Components
- `ListCard` — horizontal rows with thumbnail images
- `SectionHeader` — section title above a group of `ListCell` rows
- `Switch` — common trailing element for toggle settings
- `ContentBadge` — compact label for trailing status indicators
