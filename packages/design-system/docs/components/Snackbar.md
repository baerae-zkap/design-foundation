# Snackbar

> A brief, auto-dismissing notification rendered at the bottom of the screen via a portal — for single-line feedback messages with an optional action.

## When to Use

- Confirm that a user action has been completed: "Saved", "Copied", "Deleted".
- Offer an immediate undo or retry action after a state change.
- Communicate a brief system event that does not require the user to stop what they are doing.

## When NOT to Use

- When the message has a heading and supporting detail — use `Toast` instead.
- When the message is critical and must persist until acknowledged — use `Dialog` or `SectionMessage`.
- When the notification relates to a specific section of the page — use `SectionMessage` inline.
- When multiple concurrent notifications need to be queued — implement a queue manager on top of `Snackbar` or use a dedicated toast library.

## Import

```tsx
import { Snackbar } from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls whether the snackbar is visible. |
| `message` | `ReactNode` | **required** | The primary notification text. |
| `onClose` | `() => void` | — | Callback fired when the auto-dismiss timer fires or the close button is clicked. |
| `action` | `ReactNode` | — | Optional inline action element (e.g., a styled button for "Undo" or "Retry"). |
| `icon` | `ReactNode` | — | Optional leading icon (20×20) rendered before the message. |
| `closable` | `boolean` | `false` | When true, renders a close (×) button at the right edge. |
| `duration` | `number \| null` | `4000` | Auto-dismiss delay in milliseconds. Pass `null` to disable auto-dismiss. |
| `position` | `'bottom-center' \| 'bottom-left' \| 'bottom-right'` | `'bottom-center'` | Screen position of the snackbar. |

## Basic Usage

```tsx
import { useState } from 'react';
import { Snackbar } from '@baerae-zkap/design-system';

function SaveButton() {
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    await save();
    setOpen(true);
  };

  return (
    <>
      <Button buttonType="filled" color="primary" onClick={handleSave}>Save</Button>
      <Snackbar
        open={open}
        message="Changes saved."
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

## Examples

### With Undo Action

```tsx
<Snackbar
  open={open}
  message="Item deleted."
  action={
    <button
      onClick={handleUndo}
      style={{
        color: 'var(--inverse-content-default)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 14,
        padding: 0,
      }}
    >
      Undo
    </button>
  }
  onClose={() => setOpen(false)}
/>
```

### Persistent (No Auto-Dismiss) with Close Button

```tsx
<Snackbar
  open={open}
  message="Network error. Check your connection."
  action={<button onClick={onRetry} style={{ color: 'var(--inverse-content-default)' }}>Retry</button>}
  closable
  duration={null}
  onClose={() => setOpen(false)}
/>
```

### With Leading Icon

```tsx
<Snackbar
  open={open}
  message="Link copied to clipboard."
  icon={<CopyIcon color="var(--inverse-icon-default)" />}
  onClose={() => setOpen(false)}
/>
```

### Positioned Bottom-Right

```tsx
<Snackbar
  open={open}
  message="Draft autosaved."
  position="bottom-right"
  duration={2000}
  onClose={() => setOpen(false)}
/>
```

## Behavior

- Rendered via `createPortal` into `document.body`, layered at `zIndex.toast`.
- Enter animation: slides up 10px and fades in. Exit: slides down and fades out. Duration: `duration.fast`.
- Auto-dismiss timer starts when `open` becomes `true` and resets if `open` re-fires.
- When `duration={null}`, the Snackbar stays open until `onClose` is called by the user (requires `closable={true}` or an action button).
- Width: `min-width: 280px`, `max-width: 420px`. Center-positioned snackbars are padded from screen edges.

## Snackbar vs Toast Decision Guide

| Consideration | Use `Snackbar` | Use `Toast` |
|---------------|----------------|-------------|
| Content length | Single short message | Heading + supporting description |
| Example | "Saved." "Copied." | "Upload complete" + "Your file is ready to share." |
| Action | Undo / Retry inline button | Context link ("View file") |
| Structural complexity | Simple | Slightly richer |

Both auto-dismiss and support actions — the distinction is message complexity, not urgency.

## States

| State | Trigger |
|-------|---------|
| Hidden | `open={false}` — component returns `null` (not in DOM). |
| Entering | `open` transitions to `true` — enter animation plays. |
| Visible | Fully rendered. Auto-dismiss timer running (unless `duration={null}`). |
| Exiting | `open` transitions to `false` — exit animation plays, then unmounts. |

## Accessibility

- The snackbar wrapper has `aria-live="polite"` and `aria-atomic="true"` — screen readers announce the message when it appears.
- The inner container has `role="status"` for additional semantic signaling.
- The close button (when `closable`) has `aria-label="닫기"`.
- Custom action buttons in the `action` slot should have descriptive accessible labels.
- The `icon` slot should carry `aria-hidden="true"` on decorative icons.
- Do not use `Snackbar` for critical errors requiring immediate attention — use `role="alert"` via `SectionMessage` or `Dialog` for assertive announcements.

## Do / Don't

**Do** keep `message` text short and scannable — ideally under 60 characters. The user should be able to read it without stopping.

**Do** use an action for reversible operations (delete, archive, move) — an undo button within 4 seconds is significantly better UX than a confirmation dialog.

**Don't** show multiple Snackbars simultaneously. If several events fire in quick succession, either queue them or show only the latest.

**Don't** use `duration={null}` without also providing `closable={true}` or an `action` — otherwise the user has no way to dismiss the message.

**Don't** put critical error messages in a Snackbar. Critical errors should persist until acknowledged, using `SectionMessage` or `Dialog`.

**Don't** use Snackbar for marketing messages or promotional content — it is a system feedback component.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.inverse.surface.default` | Snackbar background (inverse dark surface) |
| `cssVarColors.inverse.content.default` | Message text color |
| `cssVarColors.inverse.content.secondary` | Close button icon color |
| `cssVarColors.inverse.icon.default` | Leading icon color |
| `radius.primitive.md` | Snackbar border radius |
| `spacing.primitive[3]` | Vertical padding |
| `spacing.primitive[4]` | Horizontal padding |
| `spacing.primitive[2]` | Gap between elements |
| `spacing.primitive[5]` | Screen edge padding (center/left/right positioning) |
| `spacing.primitive[10]` | Distance from screen bottom |
| `typography.fontSize.sm` | Message font size |
| `typography.fontWeight.medium` | Message font weight |
| `zIndex.toast` | Stacking layer |
| `duration.fast` | Animation duration |
| `easing.easeOut` | Animation easing |

## Related Components

- **Toast** — For richer notifications with a heading and description text.
- **SectionMessage** — For persistent inline status banners within a page section.
- **Dialog** — For blocking confirmations requiring explicit user acknowledgment.
- **StateView** — For full-area empty or error states.
