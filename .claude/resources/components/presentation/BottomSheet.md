# BottomSheet

> Status: stable
> Import: `import { BottomSheet } from '@baerae-zkap/design-system'`

## What It Is

A modal sheet that slides up from the bottom of the screen to present supplementary information, option selections, or action menus without navigating away from the current context.

## When to Use / When NOT to Use

**Use when:**
- Presenting a list of options or actions triggered by a user tap
- Showing supplementary content that doesn't warrant a full page
- Collecting a quick confirmation with action buttons at the bottom
- Displaying filters or sort options on mobile

**Do NOT use when:**
- The content requires a full-screen experience (use a page or Popup instead)
- Showing a brief notification (use Snackbar or Toast)
- Displaying a simple confirmation with 1-2 buttons (use Popup / AlertDialog)
- The overlay blocks critical background information the user needs to reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls sheet visibility |
| `onClose` | `() => void` | - | Callback when backdrop is clicked |
| `title` | `ReactNode` | - | Header title text or node |
| `description` | `ReactNode` | - | Header description text below the title |
| `actions` | `ReactNode` | - | Fixed bottom action area (e.g. a CTA Button) |
| `footerLink` | `ReactNode` | - | Secondary text link area above actions (e.g. TextButton) |
| `children` | `ReactNode` | - | Scrollable content area |
| `showHandle` | `boolean` | `true` | Whether to show the drag handle bar |
| `maxHeight` | `string \| number` | `'90vh'` | Maximum height of the sheet |
| `scrollable` | `boolean` | `false` | Whether the content area allows vertical scrolling |
| `className` | `string` | - | Additional CSS class |
| `aria-labelledby` | `string` | - | Accessibility label ID for the dialog |

## Common Patterns

### Basic with title and actions

```tsx
<BottomSheet
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Select an option"
  description="Choose the option that best fits your needs."
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth">
      Confirm
    </Button>
  }
>
  <div>Option list content here</div>
</BottomSheet>
```

### Scrollable content with footer link

```tsx
<BottomSheet
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Terms of Service"
  scrollable
  footerLink={<TextButton color="muted">Skip for now</TextButton>}
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth">
      Agree and continue
    </Button>
  }
>
  <div style={{ minHeight: 400 }}>Long scrollable content...</div>
</BottomSheet>
```

### No handle, custom max height

```tsx
<BottomSheet
  open={isOpen}
  onClose={() => setOpen(false)}
  showHandle={false}
  maxHeight="60vh"
>
  <div>Compact content</div>
</BottomSheet>
```

## Design Rules

- The sheet always renders at the bottom of the viewport with `position: fixed`.
- Overlay backdrop uses `cssVarColors.overlay.dim` and clicking it triggers `onClose`.
- When `open` is `false`, the component returns `null` (no DOM output).
- The header section only renders if `title` or `description` is provided.
- Actions area is pinned to the bottom and does not scroll.
- Content area respects `scrollable` -- defaults to `overflow: hidden`.

## Accessibility

- Renders with `role="dialog"` and `aria-modal="true"`.
- Supports `aria-labelledby` prop for screen reader labeling.
- Backdrop overlay is marked `aria-hidden="true"`.
- Close is triggered by clicking the overlay; **no built-in Escape key handler** (add `onKeyDown` externally if needed).
- **No built-in focus trap** -- tab key can escape the sheet. Add a focus-trap library externally for strict modal trapping.
- **No scroll lock** on the body -- the sheet content scrolls via `scrollable` prop but the background page may still scroll. Lock body scroll externally if needed.

## Overlay Stacking Order (all presentation components)

| Component | z-index Token | Behavior |
|-----------|---------------|----------|
| `Popover` | None (consumer-managed) | Non-modal, no backdrop |
| `BottomSheet` | `zIndex.modal` | Modal with dim backdrop |
| `Popup` | `zIndex.modal` | Modal with dim backdrop |
| `Tooltip` | `zIndex.toast` | Above modals, non-modal |

## Token Usage

| Element | Token | Value |
|---------|-------|-------|
| Overlay background | `cssVarColors.overlay.dim` | Dim backdrop |
| Sheet background | `cssVarColors.surface.base.default` | White / dark surface |
| Sheet border-radius | `radius.primitive.xl` | Top-left and top-right corners |
| Handle color | `cssVarColors.fill.normal` | Neutral fill |
| Handle border-radius | `radius.primitive.full` | Pill shape |
| Title font size | `typography.fontSize.lg` | 18px |
| Title font weight | `typography.fontWeight.bold` | Bold |
| Title color | `cssVarColors.content.base.default` | Primary text |
| Description font size | `typography.fontSize.sm` | 14px |
| Description color | `cssVarColors.content.base.secondary` | Secondary text |
| Content padding-inline | `spacing.semantic.screen.paddingX` | 20px |
| Actions padding-bottom | `spacing.primitive[6]` | 24px |
| Actions gap | `spacing.primitive[2]` | 8px |
| z-index | `zIndex.modal` | Modal layer |
| Slide-up animation | `duration.normal` + `cubic-bezier(0.32, 0.72, 0, 1)` | Smooth entrance |
| Fade-in animation | `duration.fast` + `easing.easeInOut` | Overlay fade |
