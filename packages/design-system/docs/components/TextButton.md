# TextButton

> A text-only low-emphasis action button used for inline or link-style interactions within content.

## When to Use
- Inline low-emphasis actions within a paragraph or list (e.g., "View all", "Forgot password?")
- Secondary options below a primary form submission
- Navigation-style actions in tight spaces where a full Button would be visually heavy

## When NOT to Use
- Primary CTA on a page or section → Use `Button` instead
- Icon-only actions → Use `IconButton` instead
- Filter/tag toggles → Use `Chip` instead

## Import
```tsx
import { TextButton } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'clear' \| 'underline' \| 'arrow'` | `'clear'` | Visual decoration — plain, underlined, or with trailing arrow |
| `color` | `'primary' \| 'neutral' \| 'muted' \| 'error'` | `'primary'` | Text color theme |
| `size` | `'xSmall' \| 'small' \| 'medium' \| 'large' \| 'xLarge'` | `'medium'` | Font size |
| `disabled` | `boolean` | `false` | Disables interaction; shows disabled text color |
| `children` | `ReactNode` | — | Button label text |

Inherits all `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

## Basic Usage
```tsx
<TextButton color="primary" onClick={() => navigate('/all')}>
  View all
</TextButton>
```

## Variants

### clear — no decoration (default)
```tsx
<TextButton variant="clear" color="primary">Forgot password?</TextButton>
```

### underline — underlined text
```tsx
<TextButton variant="underline" color="neutral">Terms of Service</TextButton>
```

### arrow — trailing right-arrow icon appended automatically
```tsx
<TextButton variant="arrow" color="primary">See more</TextButton>
```

The arrow SVG is sized proportionally to the font size (0.875× font size) and inherits `currentColor`.

## Colors

| Color | Use Case |
|-------|----------|
| `primary` | Brand-colored action link; main emphasis |
| `neutral` | Default-colored action; lower emphasis than primary |
| `muted` | Faded gray; minimal emphasis, supporting text area |
| `error` | Destructive inline action (e.g., "Remove", "Undo") |

```tsx
<TextButton color="primary">Continue</TextButton>
<TextButton color="neutral">Cancel</TextButton>
<TextButton color="muted">Privacy Policy</TextButton>
<TextButton color="error">Remove</TextButton>
```

## Sizes

| Size | Font Size |
|------|-----------|
| `xSmall` | `textButton.fontSize.xs` |
| `small` | `textButton.fontSize.sm` |
| `medium` | `textButton.fontSize.md` |
| `large` | `textButton.fontSize.lg` |
| `xLarge` | `textButton.fontSize.xl` |

Match size to surrounding text for visual consistency:
```tsx
<p style={{ fontSize: 14 }}>
  By continuing, you agree to the{' '}
  <TextButton variant="underline" color="neutral" size="small">
    Terms of Service
  </TextButton>.
</p>
```

## States
- **Default** — Text renders in the chosen color
- **Hover/Pressed** — Built-in via `usePressable`; text shifts to pressed color, subtle background fill appears, scale 0.97 on press
- **Disabled** — `disabled={true}`; text renders in disabled color, cursor `not-allowed`, non-interactive

```tsx
<TextButton color="primary" disabled={!hasMore} onClick={loadMore}>
  Load more
</TextButton>
```

## Accessibility
- Renders as native `<button>` element
- `aria-disabled` mirrors the disabled state
- Keyboard: focusable via Tab, activated with Enter or Space
- `variant="arrow"` appends a decorative SVG; the SVG does not affect the accessible label
- For underlined text that resembles a hyperlink: if navigation is the intent, prefer `<a>` with appropriate styling; use `TextButton` for actions

## Do / Don't
- Do: Use `TextButton` for low-emphasis inline actions, not as the main CTA
- Do: Match the `size` prop to surrounding body text when embedding inside paragraphs
- Do: Use `variant="arrow"` to hint that an action leads to more content
- Do: Use `color="muted"` for supporting or legal links (terms, privacy)
- Don't: Use `TextButton` as the primary action on a page — use `Button`
- Don't: Stack multiple `TextButton` elements side by side as a row of CTAs — use `Button` group instead
- Don't: Use `variant="underline"` for navigation links that open new pages — prefer `<a>` elements

## Design Tokens Used
- **Colors**: `cssVarColors.content.brand.default`, `cssVarColors.content.base.*`, `cssVarColors.surface.base.*`, `cssVarColors.surface.brand.*`, `cssVarColors.surface.error.*`, `cssVarColors.content.error.default`
- **Spacing**: `spacing.primitive[1]`, `spacing.primitive[2]`, `spacing.component.textButton.fontSize.*`
- **Radius**: `radius.primitive.sm`
- **Typography**: `typography.fontWeight.medium`

## Related Components
- `Button` — Full button with solid or tinted background; use for primary and secondary CTAs
- `IconButton` — Icon-only button; use when there is no text label
- `Chip` — Selectable tag or filter toggle
