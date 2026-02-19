# ActionArea

> Status: stable
> Import: `import { ActionArea } from '@baerae-zkap/design-system'`

## What It Is
A bottom-fixed container for action button groups in modals, bottom sheets, and screen footers. Automatically manages button layout, sizing, and visual hierarchy. Supports gradient overlay for smooth scroll transition.

## When to Use
- Use at the bottom of modals and bottom sheets to hold confirm/cancel buttons
- Use as a sticky footer CTA bar on long scrollable pages
- Use when you need consistent button group layout with proper spacing

## When NOT to Use
- Do NOT use for inline button groups within page content -- just use flex layout with Buttons directly
- Do NOT nest ActionArea inside another ActionArea
- Do NOT use as a generic tappable area -- that is not what this component does

## Decision Rules

| Intent | variant | position |
|--------|---------|----------|
| Bottom sheet with single primary CTA | `strong` | `sticky` |
| Modal confirm/cancel (equal weight) | `neutral` | `static` |
| Desktop dialog footer (compact) | `compact` | `static` |
| Long scrollable page with fixed CTA | `strong` | `fixed` |
| Inline form actions (no sticky) | `compact` | `static` |

**Rule**: Use ActionArea for button groups at the bottom of modals, sheets, and pages. For inline button groups within content, use flex layout with Buttons directly.
**Rule**: Do NOT nest Button inside ActionArea for the same action that ActionArea itself wraps. ActionArea manages child Button layout automatically.
**Rule**: Maximum 3 buttons per ActionArea. Use `strong` when one action is clearly primary; `neutral` for equal-weight pairs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"strong" \| "neutral" \| "compact"` | `"strong"` | Layout mode. `strong`=vertical stack (main on top), `neutral`=horizontal equal width, `compact`=horizontal right-aligned |
| `position` | `"static" \| "sticky" \| "fixed"` | `"static"` | Positioning. `sticky`/`fixed` pin to bottom with optional gradient |
| `showGradient` | `boolean` | `true` | Show fade gradient above (only for sticky/fixed) |
| `gradientHeight` | `number` | `48` | Gradient height in px |
| `caption` | `string` | -- | Helper text above the buttons (centered) |
| `useSafeArea` | `boolean` | `true` | Add bottom padding for mobile home indicator area |
| `backgroundColor` | `string` | `cssVarColors.surface.base.default` | Background color |
| `aria-label` | `string` | -- | Accessibility label for the button group |
| `children` | `ReactNode` | (required) | Button and TextButton components |

## Variant Guide
- `strong` -- Vertical column layout. Main (filled) button on top, alternative below. Best for mobile bottom sheets with a clear primary action.
- `neutral` -- Horizontal row layout with equal-width buttons (flex: 1). Best for dialogs with confirm/cancel of equal importance.
- `compact` -- Horizontal row, right-aligned. Best for desktop dialogs or inline forms where buttons should not span full width.

## Auto-Layout Behavior
ActionArea automatically adjusts child components:
- **Button children**: In `strong` and `neutral` variants, Buttons are set to `layout="fillWidth"`. In `neutral`, each Button gets `flex: 1` for equal width.
- **TextButton children**: Automatically centered with `alignSelf: 'center'`.
- In `compact` variant, Buttons keep their natural width and align to the right.

## Common Patterns

### Modal with primary + alternative
```tsx
<ActionArea variant="neutral">
  <Button buttonType="weak" color="neutral" size="xLarge" onClick={onCancel}>
    Cancel
  </Button>
  <Button buttonType="filled" color="primary" size="xLarge" onClick={onConfirm}>
    Confirm
  </Button>
</ActionArea>
```

### Bottom sheet with primary + sub action
```tsx
<ActionArea variant="strong" position="sticky">
  <Button buttonType="filled" color="primary" size="xLarge" onClick={onSubmit}>
    Submit
  </Button>
  <TextButton color="muted" onClick={onSkip}>
    Skip for now
  </TextButton>
</ActionArea>
```

### Compact dialog footer
```tsx
<ActionArea variant="compact">
  <Button buttonType="weak" color="neutral" size="medium" onClick={onCancel}>
    Cancel
  </Button>
  <Button buttonType="filled" color="primary" size="medium" onClick={onSave}>
    Save
  </Button>
</ActionArea>
```

### With caption text
```tsx
<ActionArea variant="strong" caption="By continuing, you agree to our Terms of Service">
  <Button buttonType="filled" color="primary" size="xLarge" onClick={onAgree}>
    Agree and Continue
  </Button>
</ActionArea>
```

### Fixed bottom CTA
```tsx
<ActionArea variant="strong" position="fixed" useSafeArea>
  <Button buttonType="filled" color="primary" size="xLarge" onClick={onCheckout}>
    Proceed to Checkout
  </Button>
</ActionArea>
```

## Do / Don't

- DO: Use `strong` variant when there is one clear primary action (main on top)
- DON'T: Use `strong` variant with two equally important actions -- use `neutral` instead
- DO: Use `neutral` variant for confirm/cancel pairs of equal weight
- DON'T: Mix more than 3 buttons in a single ActionArea
- DO: Use `position="sticky"` or `"fixed"` for bottom-pinned CTA bars
- DON'T: Use `position="fixed"` without `useSafeArea={true}` on mobile -- home indicator will overlap
- DO: Use Button and TextButton as direct children
- DON'T: Place arbitrary divs or non-button elements as children

## Token Usage
| Property | Token |
|----------|-------|
| Background | `cssVarColors.surface.base.default` |
| Caption text color | `cssVarColors.content.base.neutral` |
| Caption font size | `typography.fontSize.sm` |
| Inner padding | `spacing.component.bottomSheet.padding` |
| Safe area bottom | `spacing.semantic.screen.safeAreaBottom` |
| Button gap | `spacing.component.modal.buttonGap` |
| Z-index (sticky/fixed) | `zIndex.sticky` |

## Accessibility
- Renders with `role="group"` to communicate the button group semantics
- `caption` text is linked via `aria-describedby` to the group
- Individual buttons inside retain their own keyboard and screen reader behavior
- Gradient overlay has `pointerEvents: 'none'` so it does not block interaction
