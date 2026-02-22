# ActionArea

> A bottom-anchored container that groups action buttons for modals, bottom sheets, and screen footers. Handles layout, safe area padding, and an optional gradient fade.

## When to Use
- Button groups at the bottom of a modal or dialog
- Primary CTA bar at the bottom of a bottom sheet
- Full-screen page footer with one or two action buttons
- Any grouped actions that need consistent bottom padding and safe-area handling

## When NOT to Use
- Generic tappable/clickable content areas → Use `Card` with `onClick` instead
- Single inline action within content flow → Use `Button` or `TextButton` directly
- Navigation bar at the bottom → Use `BottomNavigation` instead

## Import
```tsx
import { ActionArea } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'strong' \| 'neutral' \| 'compact'` | `'strong'` | Layout mode — see Variants section |
| `position` | `'static' \| 'sticky' \| 'fixed'` | `'static'` | CSS position behavior |
| `showGradient` | `boolean` | `true` | Shows a gradient fade above the container (only when `position` is not `static`) |
| `gradientHeight` | `number` | `48` | Height of the gradient overlay in pixels |
| `caption` | `string` | — | Small text rendered above the button group (centered) |
| `topAccessory` | `ReactNode` | — | Slot above the button group (e.g., terms checkbox, info text) |
| `useSafeArea` | `boolean` | `true` | Adds bottom padding for mobile home indicator safe area |
| `backgroundColor` | `string` | `cssVarColors.surface.base.default` | Background color of the container and gradient base |
| `aria-label` | `string` | — | Accessible label for the button group (`role="group"`) |
| `children` | `ReactNode` | *required* | `Button` and/or `TextButton` elements |

Inherits all `HTMLAttributes<HTMLDivElement>` except `children`.

## Basic Usage
```tsx
<ActionArea variant="strong" position="sticky">
  <Button buttonType="filled" color="primary" onClick={onConfirm}>
    Confirm
  </Button>
  <Button buttonType="weak" color="primary" onClick={onCancel}>
    Cancel
  </Button>
</ActionArea>
```

## Variants

### strong — vertical stack, full-width buttons (mobile screens and bottom sheets)
Buttons are stacked vertically. Each `Button` child is automatically set to `layout="fillWidth"`.

```tsx
<ActionArea variant="strong">
  <Button buttonType="filled" color="primary">Continue</Button>
  <Button buttonType="weak" color="neutral">Go Back</Button>
</ActionArea>
```

### neutral — horizontal row, equal-width buttons (mobile and web)
Buttons are arranged in a row. Each `Button` child receives `flex: 1` for equal width.

```tsx
<ActionArea variant="neutral">
  <Button buttonType="weak" color="neutral">Cancel</Button>
  <Button buttonType="filled" color="primary">Save</Button>
</ActionArea>
```

### compact — horizontal row, right-aligned, natural width (web dialogs only)
Buttons are right-aligned with their natural widths. Do not use on mobile.

```tsx
<ActionArea variant="compact">
  <Button buttonType="weak" color="neutral">Cancel</Button>
  <Button buttonType="filled" color="primary">Confirm</Button>
</ActionArea>
```

## Position

| Value | Behavior |
|-------|----------|
| `static` | Default flow position; gradient is suppressed |
| `sticky` | Sticks to the bottom of the nearest scrollable container |
| `fixed` | Fixed to the bottom of the viewport; spans full width |

```tsx
// Sticks to the bottom of a scrollable modal body
<ActionArea variant="strong" position="sticky">
  <Button buttonType="filled" color="primary">Submit</Button>
</ActionArea>

// Always visible at the bottom of the screen
<ActionArea variant="strong" position="fixed">
  <Button buttonType="filled" color="primary" layout="fillWidth">Book Now</Button>
</ActionArea>
```

## Caption
A short informational string rendered above the buttons, centered.

```tsx
<ActionArea
  variant="strong"
  caption="By continuing, you agree to our Terms of Service."
>
  <Button buttonType="filled" color="primary">Accept and Continue</Button>
</ActionArea>
```

## Top Accessory
Slot for additional content above the button group — commonly a terms checkbox or an informational banner.

```tsx
<ActionArea
  variant="strong"
  topAccessory={
    <Checkbox
      checked={agreed}
      onChange={setAgreed}
      label="I agree to the Terms and Conditions"
    />
  }
>
  <Button
    buttonType="filled"
    color="primary"
    disabled={!agreed}
    onClick={onSubmit}
  >
    Continue
  </Button>
</ActionArea>
```

## Gradient Fade
When `position` is `sticky` or `fixed`, a gradient overlay fades content into the ActionArea background. Control its height with `gradientHeight`. Set `showGradient={false}` to disable.

```tsx
<ActionArea
  variant="strong"
  position="sticky"
  showGradient={true}
  gradientHeight={64}
>
  <Button buttonType="filled" color="primary">Submit</Button>
</ActionArea>
```

## Custom Background
Override the background color (e.g., on a tinted sheet):

```tsx
<ActionArea
  variant="strong"
  backgroundColor="var(--surface-base-alternative)"
>
  <Button buttonType="filled" color="primary">Confirm</Button>
</ActionArea>
```

## States
ActionArea itself is stateless — it delegates interaction states to its `Button` and `TextButton` children. Manage button states (loading, disabled) on the children directly.

```tsx
<ActionArea variant="strong">
  <Button
    buttonType="filled"
    color="primary"
    disabled={!isValid}
    isLoading={isSubmitting}
    onClick={handleSubmit}
  >
    Submit Order
  </Button>
  <Button buttonType="weak" color="neutral" onClick={onCancel}>
    Cancel
  </Button>
</ActionArea>
```

## Accessibility
- Renders as a `<div role="group">` wrapping all button children
- `aria-label` prop labels the group for screen readers (e.g., `aria-label="Order actions"`)
- `aria-describedby` is automatically linked to the `caption` element when `caption` is provided
- The close button inside `topAccessory` children must manage their own accessibility
- Keyboard: Tab cycles through each child button in DOM order

## Do / Don't
- Do: Use `variant="strong"` for mobile full-screen and bottom sheet contexts
- Do: Use `variant="compact"` only in web modals/dialogs; never on mobile
- Do: Use `topAccessory` for terms agreements or supplementary info above buttons
- Do: Keep children to 1-2 `Button` elements; add a `TextButton` for a low-emphasis option (e.g., "Skip")
- Don't: Use `ActionArea` as a generic tappable region — use `Card` with `onClick` for that
- Don't: Place more than one `buttonType="filled" color="primary"` Button inside a single ActionArea
- Don't: Nest `ActionArea` inside another `ActionArea`
- Don't: Pass arbitrary `<div>` or `<span>` children — use `Button` or `TextButton` only

## Design Tokens Used
- **Colors**: `cssVarColors.surface.base.default`, `cssVarColors.content.base.neutral`
- **Spacing**: `spacing.component.modal.buttonGap`, `spacing.component.bottomSheet.padding`, `spacing.semantic.screen.safeAreaBottom`
- **Typography**: `typography.fontSize.sm`, `typography.lineHeight.sm`
- **Z-Index**: `zIndex.sticky`

## Related Components
- `Button` — Primary child component for ActionArea
- `TextButton` — Low-emphasis child for ActionArea (e.g., "Skip", "Maybe later")
- `BottomSheet` — Overlay sheet that typically contains an ActionArea at its footer
- `Card` — For tappable content regions; not a button group container
