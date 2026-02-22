# Chip

> A compact interactive element used for filters, tags, and selectable labels. Supports avatars, icons, selection state, and a dismissible close button.

## When to Use
- Category filters (multi-select or single-select)
- Selectable tags that toggle on/off
- Input tokens that can be dismissed (e.g., selected recipients in a compose field)
- Status or attribute labels that the user can interact with

## When NOT to Use
- Exclusive mode/view switching (2-5 options) → Use `SegmentedControl` instead
- Non-interactive status labels → Use `ContentBadge` instead
- Primary or secondary action CTAs → Use `Button` instead

## Import
```tsx
import { Chip } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'weak'` | `'filled'` | Visual style — filled (solid bg) or weak (tinted bg) |
| `color` | `'primary' \| 'neutral' \| 'success' \| 'error' \| 'warning'` | `'neutral'` | Color theme |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Chip height, font size, and icon size |
| `selected` | `boolean` | `false` | Selected state — shows check icon (when `onClose` is absent) and shifts to selected bg/text |
| `leftIcon` | `ReactNode` | — | Icon rendered to the left of the label (mutually exclusive with `avatar`) |
| `avatar` | `ReactNode` | — | Avatar element rendered to the left (mutually exclusive with `leftIcon`) |
| `onClose` | `() => void` | — | When provided, renders an X button for dismissing the chip |
| `closeIcon` | `ReactNode` | — | Custom icon to replace the default X icon in the close button |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity |
| `children` | `ReactNode` | — | Chip label text |

Inherits all `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

## Basic Usage
```tsx
<Chip onClick={() => toggleFilter('electronics')}>
  Electronics
</Chip>
```

## Variants

### filled — solid background (default)
```tsx
<Chip variant="filled" color="primary">Active</Chip>
<Chip variant="filled" color="neutral">Default</Chip>
```

### weak — tinted background, lower visual weight
```tsx
<Chip variant="weak" color="primary">Category</Chip>
<Chip variant="weak" color="success">Verified</Chip>
```

## Colors

| Color | Typical Use |
|-------|-------------|
| `primary` | Selected filter, brand-accented tag |
| `neutral` | Default unselected filter chip |
| `success` | Positive status tag |
| `error` | Error or warning removable token |
| `warning` | Caution status tag |

```tsx
<Chip color="primary" selected>Electronics</Chip>
<Chip color="neutral">All</Chip>
<Chip color="success" variant="weak">Verified</Chip>
<Chip color="error" variant="weak">Flagged</Chip>
<Chip color="warning" variant="weak">Pending</Chip>
```

## Sizes

| Size | Height | Font |
|------|--------|------|
| `small` | `chip.height.sm` | `typography.fontSize.xs` |
| `medium` | `chip.height.md` | `typography.fontSize.sm` |
| `large` | `chip.height.lg` | `typography.fontSize.md` |

```tsx
<Chip size="small">Small</Chip>
<Chip size="medium">Medium</Chip>
<Chip size="large">Large</Chip>
```

## Selection State (Filter Pattern)
When `selected={true}` and no `onClose` is provided, a check icon appears to the right of the label. Background and text shift to the selected token pair.

```tsx
const [selected, setSelected] = useState(false);

<Chip
  color="primary"
  variant="weak"
  selected={selected}
  onClick={() => setSelected(s => !s)}
>
  Electronics
</Chip>
```

## Dismissible Chip (Input Token Pattern)
When `onClose` is provided, an X button appears. The check icon is suppressed. Clicking X calls `onClose` without propagating to the chip's own `onClick`.

```tsx
<Chip
  color="neutral"
  onClose={() => removeTag('react')}
>
  React
</Chip>

// With custom close icon
<Chip
  color="primary"
  onClose={() => removeTag('design')}
  closeIcon={<MyCloseIcon />}
>
  Design
</Chip>
```

## With Left Icon or Avatar
```tsx
// Left icon
<Chip leftIcon={<StarIcon />} color="warning" variant="weak">
  Featured
</Chip>

// Avatar (mutually exclusive with leftIcon)
<Chip avatar={<Avatar src="/user.png" size="xs" />} color="neutral">
  Alice
</Chip>
```

## States
- **Default** — Normal interactive state
- **Hover/Pressed** — Built-in via `usePressable`; background shifts to pressed token, scale 0.97 on press
- **Selected** — `selected={true}`; background and text shift to selected token pair, check icon shown (filter mode)
- **Disabled** — `disabled={true}`; opacity reduced, cursor `not-allowed`, non-interactive

## Accessibility
- Renders as native `<button>` element
- `aria-pressed={selected}` is set when chip is in selected state (filter mode)
- `aria-disabled` mirrors the disabled state
- Close button (`onClose`) renders as `role="button"` with `tabIndex={0}` and keyboard handler (Enter / Space)
- Keyboard: Tab to focus the chip, Enter/Space to toggle; Tab again to reach close button if present

## Do / Don't
- Do: Use `selected` + `onClick` for filter toggle behavior
- Do: Use `onClose` for dismissible input tokens (e.g., chosen recipients, applied tags)
- Do: Use `avatar` for person-chip patterns; use `leftIcon` for category icons
- Do: Use `variant="weak"` for unselected filters that transition to `filled`/`selected` on activation
- Don't: Use `Chip` for exclusive mode switching (2-5 options) — use `SegmentedControl`
- Don't: Provide both `avatar` and `leftIcon` — they are mutually exclusive (`avatar` takes precedence)
- Don't: Use `Chip` as a non-interactive display badge — use `ContentBadge`

## Design Tokens Used
- **Colors**: `cssVarColors.surface.*`, `cssVarColors.content.*`, `cssVarColors.fill.*`
- **Spacing**: `spacing.component.chip.height.*`, `spacing.component.chip.paddingX.*`, `spacing.component.chip.gap`, `spacing.component.chip.iconSize.*`
- **Radius**: `radius.primitive.full`
- **Typography**: `typography.fontSize.xs/sm/md`, `typography.fontWeight.medium`
- **Opacity**: `opacity.disabled`

## Related Components
- `SegmentedControl` — Exclusive tab-style selector; use when only one option can be active
- `ContentBadge` — Non-interactive status or category label
- `Button` — Primary or secondary CTA; use when the action has more weight than a filter toggle
- `Avatar` + `AvatarGroup` — Profile image used inside Chip avatar slot
