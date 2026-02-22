# Popover

A floating card that appears near a trigger or in a fixed position on screen. Used for feature announcements, onboarding hints, and brief contextual messages that do not block the UI.

## Anatomy

```
Container (floating card)
  Close button (optional)
  Heading (optional)
  Description (required)
  Actions
    SubAction (left)
    Action (right)
```

## Import

```tsx
import { Popover } from '@baerae-zkap/design-system';
```

## Basic Usage

```tsx
const [open, setOpen] = useState(true);

<Popover
  open={open}
  description="Tap the bell icon to manage your notification preferences."
  onClose={() => setOpen(false)}
/>
```

## With Heading and Actions

```tsx
<Popover
  open={open}
  heading="New feature available"
  description="You can now export your data as a CSV file directly from the dashboard."
  action={<TextButton color="primary" onClick={onConfirm}>Got it</TextButton>}
  subAction={<TextButton color="muted" onClick={onDismiss}>Remind me later</TextButton>}
  showClose
  onClose={() => setOpen(false)}
/>
```

## Sizes

Popover comes in two max-width sizes:

```tsx
// sm — 240px max width, for short hints
<Popover size="sm" description="Click here to filter results." />

// md — 320px max width (default), for longer explanations
<Popover size="md" description="This section shows your account activity over the last 30 days." />
```

## Positioning

Popover is a presentational component with no built-in anchor logic. Use the `style` prop to position it relative to a trigger:

```tsx
<div style={{ position: 'relative', display: 'inline-block' }}>
  <IconButton aria-label="Help">
    <HelpIcon />
  </IconButton>
  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, zIndex: 100 }}>
    <Popover
      open={showHint}
      description="Click here to learn about this feature."
      action={<TextButton color="primary" onClick={() => setShowHint(false)}>Dismiss</TextButton>}
    />
  </div>
</div>
```

## Controlled vs Uncontrolled Visibility

By default `open` is `true`. Manage visibility with state:

```tsx
// Show once, then dismiss permanently
const [shown, setShown] = useState(!localStorage.getItem('hint-dismissed'));

<Popover
  open={shown}
  heading="Pro tip"
  description="You can drag and drop items to reorder them."
  showClose
  onClose={() => {
    setShown(false);
    localStorage.setItem('hint-dismissed', '1');
  }}
/>
```

## API Reference

### PopoverProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `string` | — | **Required.** Main body text of the popover |
| `open` | `boolean` | `true` | Controls popover visibility |
| `onClose` | `() => void` | — | Called when the close button is clicked |
| `heading` | `string` | — | Optional bold title above the description |
| `action` | `ReactNode` | — | Primary action, right-aligned (TextButton recommended) |
| `subAction` | `ReactNode` | — | Secondary action, left-aligned (TextButton color="muted" recommended) |
| `showClose` | `boolean` | `false` | Shows an X close button in the top-right corner |
| `size` | `'sm' \| 'md'` | `'md'` | Controls max width: sm=240px, md=320px |
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles, commonly used for positioning |

### PopoverSize

| Value | Max Width |
|-------|-----------|
| `sm` | 240px |
| `md` | 320px |

## Accessibility

- The container has `role="dialog"` and `aria-modal="false"` (non-blocking).
- If `showClose` is true, the close button has `aria-label="닫기"`.
- Popover does not trap focus — it is a non-modal overlay.
- When used as an onboarding hint, ensure it does not obscure critical interactive elements.

## Usage Guidelines

- Use Popover for non-blocking contextual guidance. It should not interrupt user flow.
- Always provide `onClose` when `showClose` is true, or when an action dismisses the popover.
- Keep `description` brief — one to two sentences. For longer content, consider a BottomSheet or Popup.
- Use `action` with a `TextButton color="primary"` for the primary dismiss/confirm call to action.
- Use `subAction` with a `TextButton color="muted"` for a lower-emphasis option like "Later" or "Skip".
- Do not stack multiple Popovers on screen simultaneously.
- Prefer `size="sm"` for single-sentence hints anchored near small UI elements.

## Related Components

- **Tooltip** — Minimal hover/tap label for icon identification, no actions
- **BottomSheet** — Full-width overlay for richer content and primary actions
- **Popup** — Blocking modal dialog requiring user response
- **SectionMessage** — Inline contextual status within the page content flow
