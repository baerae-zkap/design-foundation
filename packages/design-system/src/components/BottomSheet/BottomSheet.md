# BottomSheet

> Source: `src/components/BottomSheet/BottomSheet.tsx`

A sheet that slides up from the bottom of the screen. Used for supplemental actions, option selection, or contextual content that doesn't require full-page navigation.

## Anatomy

```
Overlay (backdrop)
  Sheet
    Handle (optional drag indicator)
    Header
      Title
      Description
    Content (scrollable region)
    FooterLink (optional text action)
    Actions (fixed CTA area)
```

## Import

```tsx
import { BottomSheet } from '@baerae-zkap/design-system';
```

## Basic Usage

```tsx
const [open, setOpen] = useState(false);

<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Select an option"
  description="Choose the option that best fits your needs."
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth" onClick={() => setOpen(false)}>
      Confirm
    </Button>
  }
>
  <ListCell title="Option A" onClick={() => setSelected('a')} />
  <ListCell title="Option B" onClick={() => setSelected('b')} />
  <ListCell title="Option C" onClick={() => setSelected('c')} />
</BottomSheet>
```

## With Footer Link

Use `footerLink` for a low-emphasis text action above the primary CTA — typically a "skip" or "do this later" link.

```tsx
<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Enable notifications"
  description="Get notified about important updates."
  footerLink={
    <TextButton color="muted" onClick={() => setOpen(false)}>
      Maybe later
    </TextButton>
  }
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth">
      Enable
    </Button>
  }
>
  <p style={{ color: 'var(--content-base-secondary)', fontSize: 14 }}>
    Notifications are turned off by default. You can change this in Settings.
  </p>
</BottomSheet>
```

## Scrollable Content

When content may exceed the viewport, set `scrollable` to allow the content area to scroll independently while the header and actions stay fixed.

```tsx
<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Terms of Service"
  scrollable
  maxHeight="80vh"
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth">
      Agree and Continue
    </Button>
  }
>
  {/* Long content */}
</BottomSheet>
```

## Without Handle

Set `showHandle={false}` when the sheet is not user-dismissible via drag, or when the visual handle conflicts with the content type.

```tsx
<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Required action"
  showHandle={false}
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth">
      Continue
    </Button>
  }
>
  <p>You must complete this step to continue.</p>
</BottomSheet>
```

## API Reference

### BottomSheetProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls sheet visibility |
| `onClose` | `() => void` | — | Called when backdrop is clicked |
| `title` | `ReactNode` | — | Header title text or element |
| `description` | `ReactNode` | — | Header subtitle below title |
| `children` | `ReactNode` | — | Main scrollable content area |
| `actions` | `ReactNode` | — | Fixed bottom CTA area (Button recommended) |
| `footerLink` | `ReactNode` | — | Low-emphasis action above the actions area (TextButton recommended) |
| `showHandle` | `boolean` | `true` | Shows the drag handle indicator at the top |
| `maxHeight` | `string \| number` | `'90vh'` | Maximum height of the sheet |
| `scrollable` | `boolean` | `false` | Enables vertical scrolling in the content area |
| `className` | `string` | — | Additional CSS class for the sheet container |
| `aria-labelledby` | `string` | — | ID of the element labeling this dialog for accessibility |

## Accessibility

- The sheet container has `role="dialog"` and `aria-modal="true"`.
- Use `aria-labelledby` pointing to the title element's ID for screen reader context.
- The backdrop overlay has `aria-hidden="true"` and handles click-to-close.
- If `showHandle` is true, ensure users can also close via the backdrop; the handle is visual only (no drag gesture implemented in web).

## Usage Guidelines

- Use BottomSheet for actions that are contextually related to the current screen but don't require full navigation.
- Prefer `actions` with a single primary `Button` (`buttonType="filled" color="primary"`). Add a secondary action only when users genuinely need a "cancel" path distinct from the backdrop dismiss.
- Keep content concise. For extensive content, set `scrollable` and a bounded `maxHeight`.
- Avoid nesting multiple levels of BottomSheets.
- Do not use BottomSheet for critical blocking confirmations — use `Popup` instead.

## Related Components

- **Popup** — Centered modal dialog for blocking confirmations requiring user response
- **Popover** — Lightweight floating card anchored near a trigger element
- **ActionArea** — Bottom-fixed action container within a screen (not an overlay)
