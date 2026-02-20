# Toast

> Status: stable
> Import: `import { Toast } from '@baerae-zkap/design-system'`

## What It Is
A richer transient notification than Snackbar, supporting a two-line heading + description layout. Rendered via React Portal. Dark inverse background. Auto-dismisses after 4 seconds by default.

## When to Use
- Richer feedback requiring a title AND supporting description
- "저장 완료" + "파일이 클라우드에 업로드됐어요" — two pieces of info
- Action results where heading = outcome, description = detail

## When NOT to Use
- Single-line simple feedback — use `Snackbar` instead
- Inline/contextual messages — use `SectionMessage`
- Modal confirmations — use `AlertDialog`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | Controls visibility |
| `heading` | `ReactNode` | — | Bold heading text |
| `description` | `ReactNode` | — | Supporting description text |
| `onClose` | `() => void` | — | Called on auto-dismiss or close button |
| `icon` | `ReactNode` | — | Leading icon slot (24×24 recommended) |
| `action` | `ReactNode` | — | Trailing action slot |
| `closable` | `boolean` | `false` | Show close (X) button |
| `duration` | `number \| null` | `4000` | Auto-dismiss delay. `null` = no auto-dismiss |
| `position` | `'bottom-center' \| 'bottom-left' \| 'bottom-right'` | `'bottom-center'` | Screen position |

At least one of `heading` or `description` should be provided.

## Common Patterns

### Two-line (heading + description)
```tsx
<Toast
  open={isOpen}
  heading="저장 완료"
  description="변경사항이 성공적으로 저장되었습니다."
  onClose={() => setOpen(false)}
/>
```

### Heading only (single line)
```tsx
<Toast
  open={isOpen}
  heading="링크가 복사되었습니다."
  onClose={() => setOpen(false)}
/>
```

### With icon and action
```tsx
<Toast
  open={isOpen}
  heading="파일 업로드 완료"
  description="profile.jpg가 업로드됐습니다."
  icon={<CheckIcon />}
  action={<button onClick={onView}>보기</button>}
  onClose={() => setOpen(false)}
/>
```

## Snackbar vs Toast Decision

| Situation | Use |
|-----------|-----|
| Single short message ("저장됐어요") | `Snackbar` |
| Outcome + detail ("저장 완료" + "클라우드에 업로드됐어요") | `Toast` |
| Message with undo action | `Snackbar` |
| Result with context action ("파일 보기") | `Toast` |

## Design Rules
- `hasTwoLines = Boolean(heading && description)` — affects padding and alignment
- `alignItems: flex-start` when two lines, `center` when one line
- Icon size: 24×24 (larger than Snackbar's 20px)
- Max 1 Toast visible at a time

## Accessibility
- `aria-live="polite"` + `aria-atomic="true"` on wrapper
- `role="status"` on box
- Close button: `aria-label="닫기"`

## Token Usage
| Property | Token |
|----------|-------|
| Background | `cssVarColors.inverse.surface.default` |
| Heading color | `cssVarColors.inverse.content.default` |
| Description color | `cssVarColors.inverse.content.secondary` |
| Icon color | `cssVarColors.inverse.icon.default` |
| Border radius | `radius.primitive.md` (12px) |
| Padding (two-line) | `spacing.primitive[4]` × `spacing.primitive[4]` (16×16px) |
| Padding (one-line) | `spacing.primitive[3]` × `spacing.primitive[4]` (12×16px) |
| Min width | 280px |
| Max width | 420px |
| z-index | `zIndex.toast` (1200) |
| Animation | 220ms cubic-bezier(0.16, 1, 0.3, 1) |
