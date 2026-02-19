# AlertDialog

> Status: stable
> Import: `import { AlertDialog } from '@baerae-zkap/design-system'`

## What It Is
A modal dialog for critical confirmations and important notices. Uses React Portal to render on `document.body` with backdrop, enter/exit CSS animations, and body scroll lock.

## When to Use
- Before destructive actions (delete, remove, logout) that can't be undone
- When you need explicit user confirmation before proceeding
- For important notices requiring acknowledgment
- When the action affects data or state that's hard to recover

## When NOT to Use
- For non-critical notifications — use a Toast instead
- For complex forms or multi-step flows — use a full Modal
- For inline confirmations that don't need interruption

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | Controls dialog visibility |
| `onClose` | `() => void` | (required) | Called on Esc key, backdrop click (if enabled), or button click |
| `actions` | `AlertDialogAction[]` | (required) | 1–2 action buttons |
| `title` | `ReactNode` | -- | Optional heading (if omitted, `aria-label` is required) |
| `description` | `ReactNode` | -- | Body content |
| `closeOnDimmerClick` | `boolean` | `false` | Allow backdrop click to close |
| `aria-label` | `string` | -- | Accessibility label when `title` is not provided |

## AlertDialogAction

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | (required) | Button text |
| `onClick` | `() => void` | (required) | Click handler |
| `color` | `ButtonColor` | auto | Last button defaults to `primary`, others `neutral` |
| `variant` | `'filled' \| 'weak'` | auto | Last button defaults to `filled`, others `weak` |

## Common Patterns

### Destructive confirmation (2 actions)
```tsx
<AlertDialog
  open={isOpen}
  onClose={() => setOpen(false)}
  title="삭제하시겠어요?"
  description="이 작업은 되돌릴 수 없습니다."
  actions={[
    { label: '취소', onClick: () => setOpen(false), color: 'neutral', variant: 'weak' },
    { label: '삭제', onClick: handleDelete, color: 'error', variant: 'filled' },
  ]}
/>
```

### Simple notice (1 action)
```tsx
<AlertDialog
  open={isOpen}
  onClose={() => setOpen(false)}
  title="업데이트 완료"
  description="앱이 최신 버전으로 업데이트되었습니다."
  actions={[
    { label: '확인', onClick: () => setOpen(false) },
  ]}
/>
```

### Without title (aria-label required)
```tsx
<AlertDialog
  open={isOpen}
  onClose={() => setOpen(false)}
  aria-label="로그아웃 확인"
  description="정말 로그아웃하시겠어요?"
  actions={[
    { label: '취소', onClick: () => setOpen(false), color: 'neutral', variant: 'weak' },
    { label: '로그아웃', onClick: handleLogout, color: 'error', variant: 'filled' },
  ]}
/>
```

## Design Rules
- Cancel/safe action: always `color="neutral" variant="weak"` (left/first)
- Destructive confirm: always `color="error" variant="filled"` (right/last)
- Non-destructive confirm: `color="primary" variant="filled"` (right/last)
- `closeOnDimmerClick` stays `false` for destructive dialogs
- Backdrop is always `rgba(0,0,0,0.5)` — no theming

## Accessibility
- `role="alertdialog"` + `aria-modal="true"`
- `aria-labelledby` auto-wired when `title` is provided
- `aria-describedby` auto-wired when `description` is provided
- Esc key always calls `onClose`
- Body scroll locked while open

## Token Usage
| Property | Token |
|----------|-------|
| Container radius | `radius.primitive['2xl']` (24px) |
| Container padding | `spacing.primitive[6]` (24px) |
| Max width | 360px |
| Shadow | `cssVarShadow.semantic.modal.default` |
| z-index | `zIndex.modal` (1100) |
| Animation duration | 180ms |
