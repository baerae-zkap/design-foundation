# Button

> A clickable element used to trigger primary and secondary actions with label text.

## When to Use
- Submitting a form (filled + primary)
- Confirming or completing a key action
- Providing a secondary/cancel path alongside a primary CTA
- Destructive actions that require deliberate intent (filled or weak + error)
- Social login (kakao, google colors)

## When NOT to Use
- Icon-only actions → Use `IconButton` instead
- Inline text link-style actions within prose → Use `TextButton` instead
- Filter/tag/selection toggles → Use `Chip` instead
- Group of buttons at the bottom of a modal or sheet → Wrap in `ActionArea`

## Import
```tsx
import { Button } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonType` | `'filled' \| 'weak'` | `'filled'` | Visual style — filled (solid background) or weak (tinted, no border) |
| `color` | `'primary' \| 'neutral' \| 'success' \| 'error' \| 'kakao' \| 'google'` | `'primary'` | Color theme |
| `size` | `'small' \| 'medium' \| 'large' \| 'xLarge'` | `'medium'` | Button height and font size |
| `layout` | `'hug' \| 'fillWidth'` | `'hug'` | Width behavior — hug content or fill container width |
| `isLoading` | `boolean` | `false` | Shows animated loading dots; disables interaction |
| `disabled` | `boolean` | `false` | Disables the button; reduces opacity |
| `leftContent` | `ReactNode` | — | Content rendered to the left of the label (icon, etc.) |
| `rightContent` | `ReactNode` | — | Content rendered to the right of the label (icon, etc.) |
| `children` | `ReactNode` | — | Button label text or content |

Inherits all `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

## Basic Usage
```tsx
<Button buttonType="filled" color="primary" onClick={() => handleSubmit()}>
  Save Changes
</Button>
```

## Variants

### filled — solid background, high emphasis
```tsx
<Button buttonType="filled" color="primary">Confirm</Button>
<Button buttonType="filled" color="error">Delete</Button>
```

### weak — tinted background, no border, lower emphasis
```tsx
<Button buttonType="weak" color="primary">Learn More</Button>
<Button buttonType="weak" color="neutral">Cancel</Button>
```

## Colors

| Color | Use Case |
|-------|----------|
| `primary` | Main CTA, brand actions |
| `neutral` | Secondary/cancel actions |
| `success` | Positive confirmation |
| `error` | Destructive actions |
| `kakao` | Kakao social login only |
| `google` | Google social login only |

```tsx
<Button buttonType="filled" color="primary">Continue</Button>
<Button buttonType="weak" color="neutral">Cancel</Button>
<Button buttonType="filled" color="error">Delete Account</Button>
<Button buttonType="filled" color="kakao">Continue with Kakao</Button>
<Button buttonType="filled" color="google">Continue with Google</Button>
```

## Sizes

| Size | Height | Font | Typical Use |
|------|--------|------|-------------|
| `small` | 36px | 14px | Compact contexts, dense UI |
| `medium` | 40px | 14px | Default, most UI |
| `large` | 44px | 14px | Touch-friendly primary CTAs |
| `xLarge` | 48px | 16px | Hero / full-width CTAs |

```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
<Button size="xLarge">Extra Large</Button>
```

## Layout
```tsx
// Hug content (default)
<Button layout="hug">Save</Button>

// Fill container width
<Button layout="fillWidth">Sign In</Button>
```

## With Icons
```tsx
<Button leftContent={<PlusIcon />} color="primary">
  Add Item
</Button>

<Button rightContent={<ArrowRightIcon />} color="primary">
  Continue
</Button>
```

## States
- **Default** — Normal interactive state
- **Hover/Pressed** — Built-in via `usePressable`; background shifts to pressed token, scale 0.97
- **Disabled** — `disabled={true}`; opacity drops, cursor `not-allowed`, non-interactive
- **Loading** — `isLoading={true}`; renders animated dot pulse, sets `aria-busy`, blocks interaction

```tsx
// Form submit pattern
<Button
  buttonType="filled"
  color="primary"
  disabled={!isFormValid}
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>
```

## Accessibility
- Renders as native `<button>` element
- `aria-busy={true}` set when `isLoading` is active
- `aria-disabled` mirrors the disabled state
- Keyboard: focusable via Tab, activated with Enter or Space
- Loading state replaces children with dots; ensure the parent context still describes the action (e.g., keep `aria-label` if needed)

## Do / Don't
- Do: Use at most one `buttonType="filled" color="primary"` per action group
- Do: Pair filled primary with weak neutral for primary/secondary pairs
- Do: Use `isLoading` during async submission to prevent double-submit
- Do: Use `color="error"` for destructive actions
- Don't: Hardcode colors via inline `style`; use the `color` prop
- Don't: Place two `color="primary"` buttons side by side
- Don't: Use `Button` for icon-only actions — use `IconButton`

## Design Tokens Used
- **Colors**: `cssVarColors.surface.*`, `cssVarColors.content.*`, `cssVarColors.fill.*`
- **Spacing**: `spacing.component.button.paddingX.*`, `spacing.component.button.gap`, `spacing.primitive[10]`, `spacing.primitive[12]`
- **Radius**: `radius.component.button.sm`, `radius.component.button.lg`
- **Typography**: `typography.fontSize.sm`, `typography.fontSize.md`, `typography.fontWeight.semibold`
- **Opacity**: `opacity.disabled`
- **Motion**: `easing.easeInOut`

## Related Components
- `IconButton` — Icon-only circular button; use when there is no label
- `TextButton` — Text-only low-emphasis action; use for inline or link-style actions
- `Chip` — Selectable tag/filter; use for toggle behavior
- `ActionArea` — Bottom-fixed button group container for modals, sheets, and screen footers
