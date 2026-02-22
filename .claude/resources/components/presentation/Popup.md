# Popup

> Status: stable
> Import: `import { Popup } from '@baerae-zkap/design-system'`

## What It Is

A centered modal dialog that interrupts the current task to demand the user's immediate attention, used for confirmations, settings panels, and any interaction requiring focused input before continuing.

## When to Use / When NOT to Use

**Use when:**
- Requiring a blocking confirmation before a destructive or irreversible action
- Showing a settings panel or form that needs focused attention
- Presenting content that must be explicitly dismissed before proceeding
- Displaying structured content with navigation bar and action buttons

**Do NOT use when:**
- Showing supplementary options that don't block the flow (use BottomSheet)
- Displaying a brief hint or feature callout (use Popover or Tooltip)
- Showing a transient status message (use Snackbar or Toast)
- The content is simple enough for an inline SectionMessage

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls popup visibility |
| `onClose` | `() => void` | **required** | Close callback (Escape key, close button, or dimmer click when `closeOnDimmerClick` is true) |
| `title` | `ReactNode` | - | Navigation bar title (hidden when navigation is `'floating'`) |
| `navigation` | `'normal' \| 'emphasize' \| 'floating'` | Auto: `'normal'` if title exists, `'floating'` otherwise | Navigation bar style |
| `children` | `ReactNode` | **required** | Scrollable body content |
| `actions` | `PopupAction[]` | - | Array of action button configs |
| `actionLayout` | `'strong' \| 'neutral' \| 'cancel' \| 'compact'` | Auto: `'strong'` for 1 action, `'neutral'` for 2+ | Action button layout strategy |
| `size` | `'medium' \| 'large' \| 'xlarge'` | `'medium'` | Width and padding preset |
| `type` | `'fixed' \| 'hug'` | `'hug'` | Height strategy: fixed height or hug content |
| `closeOnDimmerClick` | `boolean` | `false` | Whether clicking the backdrop closes the popup |
| `aria-label` | `string` | - | Accessibility label when no visible title |

### PopupAction

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | **required** | Button text |
| `onClick` | `() => void` | **required** | Click handler |
| `color` | `ButtonColor` | Last button: `'primary'`, others: `'neutral'` | Button color |
| `variant` | `'filled' \| 'weak'` | Last button: `'filled'`, others: `'weak'` | Button type |

### Size Config

| Size | Max Width | Content Padding | Fixed Height | Hug Max Height |
|------|-----------|-----------------|--------------|----------------|
| `medium` | 400px | 20px | 480px | 760px |
| `large` | 560px | 24px | 480px | 760px |
| `xlarge` | 640px | 32px | 560px | 760px |

## Common Patterns

### Confirmation dialog

```tsx
<Popup
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Delete item?"
  actions={[
    { label: 'Cancel', onClick: () => setOpen(false) },
    { label: 'Delete', onClick: handleDelete, color: 'error' },
  ]}
>
  <p>This action cannot be undone. The item will be permanently removed.</p>
</Popup>
```

### Single strong CTA

```tsx
<Popup
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Welcome"
  navigation="emphasize"
  actions={[{ label: 'Get started', onClick: handleStart }]}
>
  <p>Here is what you need to know to get started.</p>
</Popup>
```

### Floating close (no title bar)

```tsx
<Popup
  open={isOpen}
  onClose={() => setOpen(false)}
  navigation="floating"
  aria-label="Announcement"
  size="large"
>
  <div>Rich content without a title bar, close button floats in top-right.</div>
</Popup>
```

### Dismissible backdrop

```tsx
<Popup
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Settings"
  closeOnDimmerClick
>
  <div>Settings form content</div>
</Popup>
```

## Design Rules

- Renders via `createPortal` to `document.body` for proper stacking.
- Body scroll is locked (`overflow: hidden`) while the popup is open.
- Entrance/exit animations: backdrop fades in/out, container slides up and fades.
- Navigation bar has a bottom divider; action area has a top divider.
- `navigation="normal"`: centered title with close button on the right.
- `navigation="emphasize"`: left-aligned larger/bolder title with close button on the right.
- `navigation="floating"`: no title bar; close button floats absolutely in the top-right of the container.
- Action buttons are always `size="large"` and `layout="fillWidth"`.
- With `actionLayout="strong"` (1 action): single full-width filled button.
- With `actionLayout="neutral"` (2+ actions): last button is `filled/primary`, preceding buttons are `weak/neutral`.
- `actionLayout="cancel"`: same layout as `neutral` (secondary + primary button pair). Use for cancel/confirm patterns.
- `actionLayout="compact"`: same layout as `neutral`. Reserved for future compact styling.

## Accessibility

- Renders with `role="dialog"` and `aria-modal="true"`.
- `aria-labelledby` is set automatically when `title` is visible (non-floating navigation).
- `aria-label` prop is used when there is no visible title (floating navigation).
- Escape key closes the popup.
- Body scroll is locked (`overflow: hidden`) to prevent background interaction.
- Close buttons have `aria-label="닫기"`.
- Container has `tabIndex={-1}` for programmatic focus management. **No built-in focus trap** -- tab key can escape the dialog. Add a focus-trap library externally if strict modal trapping is required.
- Screen reader users are informed this is a modal dialog via `aria-modal="true"`.

## Token Usage

| Element | Token | Value |
|---------|-------|-------|
| Backdrop background | `cssVarColors.overlay.dim` | Dim overlay |
| Container background | `cssVarColors.surface.base.default` | White / dark surface |
| Container border-radius | `radius.primitive['2xl']` | Large rounded corners |
| Container box-shadow | `cssVarShadow.semantic.modal.default` | Modal elevation |
| Nav title color | `cssVarColors.content.base.default` | Primary text |
| Nav title font (normal) | `typography.fontSize.md` + `fontWeight.semibold` | 16px semibold |
| Nav title font (emphasize) | `typography.fontSize.lg` + `fontWeight.bold` | 18px bold |
| Close button color | `cssVarColors.content.base.default` | Primary text |
| Close button radius | `radius.primitive.sm` | Small rounded |
| Divider borders | `borderWidth.default` + `var(--divider)` | 1px divider line |
| Action area padding | `spacing.primitive[4]` top, size-based horizontal | 16px top |
| Action button gap | `spacing.primitive[2]` | 8px |
| z-index | `zIndex.modal` | Modal layer |
| Entrance animation | `duration.fast` + `easing.easeOut` | Slide-up + fade |
| Backdrop animation | `duration.fast` + `easing.easeInOut` | Fade in/out |
