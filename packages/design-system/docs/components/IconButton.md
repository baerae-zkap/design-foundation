# IconButton

> A square icon-only button with built-in press states, used for compact actions that are understood from context or an accessible label.

## When to Use
- Toolbar actions (close, menu, share, edit, delete)
- Actions where space is limited and the icon is self-explanatory
- Repeating actions in a list row (favorite, more options)

## When NOT to Use
- When the action needs a visible text label → Use `Button` instead
- Inline text link-style actions → Use `TextButton` instead
- Filter or tag toggles → Use `Chip` instead

## Import
```tsx
import { IconButton } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'ghost' \| 'weak'` | `'ghost'` | Visual style |
| `color` | `'primary' \| 'neutral' \| 'error'` | `'neutral'` | Color theme |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button and icon dimensions |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity |
| `children` | `ReactNode` | *required* | Icon element rendered inside the button |

Inherits all `ButtonHTMLAttributes<HTMLButtonElement>` except `color`. Always provide `aria-label`.

## Basic Usage
```tsx
<IconButton aria-label="Close" onClick={onClose}>
  <CloseIcon />
</IconButton>
```

## Variants

### ghost — transparent background, icon color only (default)
```tsx
<IconButton variant="ghost" color="neutral" aria-label="Menu">
  <MenuIcon />
</IconButton>
```

### filled — solid colored background
```tsx
<IconButton variant="filled" color="primary" aria-label="Add">
  <PlusIcon />
</IconButton>
```

### weak — tinted background, softer than filled
```tsx
<IconButton variant="weak" color="primary" aria-label="Edit">
  <EditIcon />
</IconButton>
```

## Colors

| Color | filled | ghost | weak |
|-------|--------|-------|------|
| `primary` | Brand solid bg, white icon | Brand icon, transparent bg | Brand tint bg, brand icon |
| `neutral` | Dark solid bg, white icon | Default icon, transparent bg | Container bg, default icon |
| `error` | Error solid bg, white icon | Error icon, transparent bg | Error tint bg, error icon |

```tsx
<IconButton variant="ghost" color="neutral" aria-label="Settings">
  <SettingsIcon />
</IconButton>

<IconButton variant="filled" color="error" aria-label="Delete">
  <TrashIcon />
</IconButton>

<IconButton variant="weak" color="error" aria-label="Remove">
  <MinusIcon />
</IconButton>
```

## Sizes

| Size | Button | Icon |
|------|--------|------|
| `small` | `iconButton.size.sm` | `iconButton.iconSize.sm` |
| `medium` | `iconButton.size.md` | `iconButton.iconSize.md` |
| `large` | `iconButton.size.lg` | `iconButton.iconSize.lg` |

```tsx
<IconButton size="small" aria-label="Close"><CloseIcon /></IconButton>
<IconButton size="medium" aria-label="Close"><CloseIcon /></IconButton>
<IconButton size="large" aria-label="Close"><CloseIcon /></IconButton>
```

## States
- **Default** — Normal interactive state
- **Hover/Pressed** — Built-in via `usePressable`; background fills with pressed token, scale 0.97 on press
- **Disabled** — `disabled={true}`; opacity reduced, cursor `not-allowed`, non-interactive

```tsx
<IconButton
  variant="ghost"
  color="neutral"
  disabled={!canEdit}
  aria-label="Edit"
  onClick={handleEdit}
>
  <EditIcon />
</IconButton>
```

## Accessibility
- Renders as native `<button type="button">`
- **Always provide `aria-label`** — the button has no visible text; screen readers depend on this
- `aria-label` should describe the action, not the icon (e.g., `"Close dialog"` not `"X icon"`)
- Keyboard: focusable via Tab, activated with Enter or Space
- `disabled` prop prevents keyboard and pointer interaction

```tsx
// Correct — descriptive label
<IconButton aria-label="Close dialog" onClick={onClose}>
  <CloseIcon />
</IconButton>

// Correct — contextual label
<IconButton aria-label="Delete item" onClick={() => deleteItem(id)}>
  <TrashIcon />
</IconButton>
```

## Do / Don't
- Do: Always provide a meaningful `aria-label`
- Do: Use `ghost` variant for toolbar/navigation contexts where icons appear on a light background
- Do: Use `filled` variant when the icon button is the primary focus (e.g., FAB-style)
- Do: Use `error` color for destructive icon actions (delete, remove)
- Don't: Omit `aria-label` — icon-only buttons are inaccessible without it
- Don't: Use `IconButton` when the action needs a visible text label — use `Button`
- Don't: Use `color="primary"` for `ghost` variant in dense icon rows — it creates too much visual weight

## Design Tokens Used
- **Colors**: `cssVarColors.surface.*`, `cssVarColors.content.*`, `cssVarColors.inverse.surface.*`, `cssVarColors.fill.*`
- **Spacing**: `spacing.component.iconButton.size.*`, `spacing.component.iconButton.iconSize.*`
- **Radius**: `radius.primitive.lg`
- **Opacity**: `opacity.disabled`

## Related Components
- `Button` — Labeled button; use when the action requires visible text
- `TextButton` — Inline text-only action; use within content flow
- `Chip` — Selectable tag or filter toggle
