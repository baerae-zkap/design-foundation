# Toast

> A temporary notification that appears at the bottom of the screen, supporting a bold heading and a supporting description line. Rendered via React Portal.

## When to Use

- Confirming a multi-step action with context (e.g., "Save complete" + "Uploaded to cloud")
- Surfacing richer feedback that benefits from a heading and description pair
- Non-blocking notifications that disappear automatically after a set duration
- Adding an inline action button alongside the message (e.g., "View file")

## When NOT to Use

- Single short messages ("Saved", "Copied") — use `Snackbar` instead
- Messages that require immediate user acknowledgment — use `Dialog`
- Inline content-area status — use `SectionMessage`
- Persistent status the user needs to act on later — use `SectionMessage`

### Toast vs Snackbar Decision Guide

| Use `Toast` | Use `Snackbar` |
|-------------|----------------|
| Heading + supporting description | Single short message only |
| "저장 완료" + "파일이 클라우드에 업로드됐어요" | "저장됐어요" |
| Richer context needed | Minimal feedback |
| Optional leading icon slot | Optional action (Undo) |

## Import

```tsx
import { Toast } from '@baerae-zkap/design-system';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | — | Yes | Controls visibility. Set to `true` to show the toast. |
| `onClose` | `() => void` | — | No | Called when the toast closes (auto-dismiss or close button click). |
| `heading` | `ReactNode` | — | No | Bold primary text. At minimum, provide `heading` or `description`. |
| `description` | `ReactNode` | — | No | Smaller secondary text shown below `heading`. |
| `icon` | `ReactNode` | — | No | Leading icon slot. Recommend 24×24 SVG icons. |
| `action` | `ReactNode` | — | No | Trailing action slot (e.g., a `TextButton`). |
| `closable` | `boolean` | `false` | No | When `true`, shows an × button that calls `onClose`. |
| `duration` | `number \| null` | `4000` | No | Auto-dismiss delay in ms. Pass `null` to disable auto-dismiss. |
| `position` | `'bottom-center' \| 'bottom-left' \| 'bottom-right'` | `'bottom-center'` | No | Screen position of the toast. |

## Basic Usage

```tsx
import { useState } from 'react';
import { Toast, Button } from '@baerae-zkap/design-system';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button buttonType="filled" color="primary" onClick={() => setOpen(true)}>
        Save
      </Button>

      <Toast
        open={open}
        heading="Save complete"
        description="Your changes have been uploaded to the cloud."
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

## Variants

### Heading only

```tsx
<Toast
  open={open}
  heading="Profile updated"
  onClose={() => setOpen(false)}
/>
```

### Heading + description (two-line)

```tsx
<Toast
  open={open}
  heading="Save complete"
  description="Your file has been uploaded successfully."
  onClose={() => setOpen(false)}
/>
```

### With leading icon

```tsx
<Toast
  open={open}
  heading="Connection restored"
  description="You are back online."
  icon={<WifiIcon />}
  onClose={() => setOpen(false)}
/>
```

### With action button

```tsx
<Toast
  open={open}
  heading="File deleted"
  action={
    <TextButton color="primary" onClick={onUndo}>
      Undo
    </TextButton>
  }
  onClose={() => setOpen(false)}
/>
```

### Persistent (no auto-dismiss)

```tsx
<Toast
  open={open}
  heading="Update available"
  description="Restart the app to apply the latest update."
  duration={null}
  closable
  onClose={() => setOpen(false)}
/>
```

### Positioned variants

```tsx
<Toast open={open} heading="Saved" position="bottom-left" onClose={() => setOpen(false)} />
<Toast open={open} heading="Saved" position="bottom-right" onClose={() => setOpen(false)} />
```

## States

| State | Behavior |
|-------|----------|
| **Entering** | Fades in with a 10px upward slide animation |
| **Visible** | Stays visible for the `duration` period |
| **Exiting** | Fades out with a downward slide, then unmounts |
| **Persistent** | With `duration={null}`, stays until `onClose` is called |
| **Closable** | With `closable={true}`, shows an × button |

## Accessibility

- The wrapper uses `aria-live="polite"` and `aria-atomic="true"` so screen readers announce the toast without interrupting the current reading flow.
- The inner container has `role="status"`.
- The close button is a native `<button>` with `aria-label="닫기"`.
- Focus is not moved to the toast — it is non-blocking and does not trap focus.
- Respects `prefers-reduced-motion`: the animation keyframe duration collapses to 0s.

## Do / Don't

**Do** trigger a toast after a user-initiated action completes (save, submit, share).

**Don't** use a toast for error messages that require user action — use `SectionMessage` or `Dialog`.

**Do** keep `heading` to one short phrase (3–5 words).

**Don't** put long paragraphs in `description`. Keep it to one sentence.

**Do** use `duration={null}` with `closable` when the message is important and timing is uncertain.

**Don't** stack multiple toasts simultaneously. Queue them sequentially.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.inverse.surface.default` | Toast background (dark inverse surface) |
| `cssVarColors.inverse.content.default` | Heading text and icon color |
| `cssVarColors.inverse.content.secondary` | Description text and close icon color |
| `radius.primitive.md` | Toast corner radius |
| `spacing.primitive[3]`, `spacing.primitive[4]` | Internal padding |
| `spacing.primitive[10]` | Bottom offset from viewport edge |
| `zIndex.toast` | Stacking order above other content |
| `duration.fast` | Enter/exit animation duration |
| `easing.easeOut` | Animation easing |

## Related Components

- `Snackbar` — single-message auto-dismiss notification
- `SectionMessage` — inline persistent status within page content
- `Dialog` — blocking confirmation requiring user action
- `StateView` — full empty/error/success state for a content area
