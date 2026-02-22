# BottomCTA

> Status: stable
> Import: `import { BottomCTA } from '@baerae-zkap/design-system'`

## What It Is
A sticky bottom action bar that anchors primary and optional secondary action buttons at the bottom of a screen. Handles safe area insets for notched devices and supports an optional top accessory slot for terms text or checkboxes.

## When to Use
- Form submission screens requiring a persistent "Save" or "Submit" CTA
- Checkout or payment flows with a primary action
- Dual-action screens (e.g., "Cancel" + "Confirm")
- Any full-page flow where the main CTA should remain visible during scroll

## When NOT to Use
- Inline button groups within content -- use `Button` directly with flex layout
- Navigation bars -- use `BottomNavigation`
- Floating action buttons -- not supported; use sticky positioning via `BottomCTA`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'single' \| 'double'` | `'single'` | Layout: one or two action buttons |
| `primaryAction` | `ReactNode` | -- | Primary (or only) button. **Required.** |
| `secondaryAction` | `ReactNode` | -- | Secondary button (visible only with `variant="double"`) |
| `safeAreaPadding` | `boolean` | `true` | Add bottom padding for notched device safe areas |
| `background` | `'default' \| 'transparent'` | `'default'` | Background style. Default shows surface + top border |
| `topAccessory` | `ReactNode` | -- | Content above buttons (terms checkbox, disclaimer text) |
| `style` | `CSSProperties` | -- | Additional inline styles |

## Common Patterns

### Single Action
```tsx
<BottomCTA
  primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>
      Save
    </Button>
  }
/>
```

### Dual Actions
```tsx
<BottomCTA
  variant="double"
  secondaryAction={
    <Button buttonType="weak" color="neutral" style={{ width: '100%' }}>
      Cancel
    </Button>
  }
  primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>
      Confirm
    </Button>
  }
/>
```

### With Top Accessory
```tsx
<BottomCTA
  topAccessory={
    <Checkbox
      checked={agreed}
      onChange={setAgreed}
      label="I agree to the terms and conditions"
    />
  }
  primaryAction={
    <Button buttonType="filled" color="primary" disabled={!agreed} style={{ width: '100%' }}>
      Continue
    </Button>
  }
/>
```

### Transparent Background
```tsx
<BottomCTA
  background="transparent"
  primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>
      Next
    </Button>
  }
/>
```

## Design Rules
- Position is `sticky` at the bottom of its container
- `default` background shows `surface.base.default` with a 1px top divider border
- `transparent` background removes both background color and top border
- In `double` variant, secondary action is placed left, primary action right
- Both buttons in `double` variant share equal flex space (`flex: 1`)
- Button gap in `double` variant: `spacing.primitive[2]` (8px)
- Safe area padding uses `env(safe-area-inset-bottom, 20px)` as fallback
- Top accessory has `spacing.primitive[3]` (12px) bottom margin

## Accessibility
- Container is a plain `<div>` -- ensure child buttons have proper labels
- Buttons passed as `primaryAction`/`secondaryAction` should be proper `Button` components with accessible text
- Tab order follows DOM order: secondary action first, then primary action

## Token Usage

| Property | Token |
|----------|-------|
| Background (default) | `cssVarColors.surface.base.default` |
| Top border | `1px solid var(--divider)` |
| Padding top | `spacing.primitive[3]` (12px) |
| Padding left/right | `spacing.primitive[4]` (16px) |
| Padding bottom | `spacing.primitive[5]` (20px) + safe area inset |
| Button gap (double) | `spacing.primitive[2]` (8px) |
| Top accessory margin | `spacing.primitive[3]` (12px) |
