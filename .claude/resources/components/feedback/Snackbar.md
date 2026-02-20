# Snackbar

> Status: stable
> Import: `import { Snackbar } from '@baerae-zkap/design-system'`

## What It Is
A transient notification that appears at the bottom of the screen. Rendered via React Portal on `document.body`. Dark inverse background, single-line message, optional icon/action/close. Auto-dismisses after 4 seconds by default.

## When to Use
- Brief, non-critical feedback: "저장되었습니다", "복사했어요", "삭제했어요"
- Single-line status messages that disappear automatically
- Undoable action feedback (with action="실행 취소" button)

## When NOT to Use
- When a heading + description is needed — use `Toast`
- For inline/contextual messages — use `SectionMessage`
- For modal confirmation — use `AlertDialog`
- For persistent content that stays until explicitly closed — use `SectionMessage`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | Controls visibility |
| `message` | `ReactNode` | (required) | Message text |
| `onClose` | `() => void` | — | Called on auto-dismiss or close button |
| `icon` | `ReactNode` | — | Leading icon slot (20×20 recommended) |
| `action` | `ReactNode` | — | Trailing action slot (inline button) |
| `closable` | `boolean` | `false` | Show close (X) button |
| `duration` | `number \| null` | `4000` | Auto-dismiss delay (ms). `null` = no auto-dismiss |
| `position` | `'bottom-center' \| 'bottom-left' \| 'bottom-right'` | `'bottom-center'` | Screen position |

## Common Patterns

### Basic (auto-dismiss)
```tsx
<Snackbar
  open={isOpen}
  message="변경사항이 저장되었습니다."
  onClose={() => setOpen(false)}
/>
```

### With undo action
```tsx
<Snackbar
  open={isOpen}
  message="항목이 삭제되었습니다."
  action={
    <button style={{ color: 'var(--inverse-content-default)', fontWeight: 600 }} onClick={onUndo}>
      실행 취소
    </button>
  }
  onClose={() => setOpen(false)}
/>
```

### Persistent (no auto-dismiss)
```tsx
<Snackbar
  open={isOpen}
  message="네트워크 오류가 발생했습니다."
  duration={null}
  closable
  onClose={() => setOpen(false)}
/>
```

## Design Rules
- Max 1 Snackbar visible at a time — queue multiple messages
- Message should be ≤ 2 lines (compact by design)
- Action text should be ≤ 2 words
- Use `closable` only when `duration={null}` (persistent messages need manual dismiss)
- Dark inverse background adapts automatically to light/dark mode via `cssVarColors.inverse.*`

## Accessibility
- `aria-live="polite"` + `aria-atomic="true"` on wrapper
- `role="status"` on box
- Close button: `aria-label="닫기"`

## Token Usage
| Property | Token |
|----------|-------|
| Background | `cssVarColors.inverse.surface.default` |
| Message color | `cssVarColors.inverse.content.default` |
| Icon color | `cssVarColors.inverse.icon.default` |
| Close icon color | `cssVarColors.inverse.content.secondary` |
| Border radius | `radius.primitive.md` (12px) |
| Padding | `spacing.primitive[3]` × `spacing.primitive[4]` (12×16px) |
| Min width | 280px |
| Max width | 420px |
| z-index | `zIndex.toast` (1200) |
| Animation | 220ms cubic-bezier(0.16, 1, 0.3, 1) |
