# SectionMessage

> Status: stable
> Import: `import { SectionMessage } from '@baerae-zkap/design-system'`

## What It Is
An inline banner component for displaying important information, warnings, errors, or success states within a page section. Renders in the document flow (not a portal). Supports heading, description, action CTA, and dismissal.

## When to Use
- Inline feedback within forms (validation errors, success confirmation)
- Persistent notices within a page section (update info, warnings)
- Status messages that don't interrupt the user's flow

## When NOT to Use
- For global/system-level alerts — use `AlertDialog`
- For transient feedback (auto-dismiss) — use `Snackbar` or `Toast`
- For full-page empty/error states — use `StateView`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Status variant — controls background and default icon |
| `heading` | `ReactNode` | — | Bold heading text |
| `description` | `ReactNode` | — | Body description |
| `icon` | `ReactNode` | — | Custom icon (overrides variant default) |
| `action` | `ReactNode` | — | CTA slot (TextButton or Button) |
| `onClose` | `() => void` | — | Renders close (X) button when provided |

At least one of `heading` or `description` must be provided.

## Common Patterns

### Basic info message
```tsx
<SectionMessage
  heading="업데이트 안내"
  description="새로운 기능이 추가되었습니다."
/>
```

### Error with retry action
```tsx
<SectionMessage
  variant="error"
  heading="연결 오류"
  description="서버에 연결할 수 없습니다."
  action={<TextButton color="primary" onClick={onRetry}>다시 시도</TextButton>}
/>
```

### Dismissible warning
```tsx
const [visible, setVisible] = useState(true);
{visible && (
  <SectionMessage
    variant="warning"
    heading="미저장 변경 사항"
    description="페이지를 떠나면 변경 사항이 사라집니다."
    onClose={() => setVisible(false)}
  />
)}
```

## Design Rules
- Use `variant="error"` or `variant="warning"` for critical messages (auto-applies `role="alert"`)
- Use `variant="info"` or `variant="success"` for informational (auto-applies `role="status"`)
- Always pair heading with a concise description for clarity
- Action slot: use `TextButton` for low-emphasis CTAs, `Button` for primary

## Accessibility
- `role="alert"` + `aria-live="assertive"` for error/warning variants
- `role="status"` + `aria-live="polite"` for default/info/success variants
- Close button auto-labeled `aria-label="닫기"`

## Token Usage
| Property | Token |
|----------|-------|
| Container radius | `radius.component.card.md` (16px) |
| Container padding | `spacing.primitive[4]` (16px) |
| Icon ↔ content gap | `spacing.primitive[3]` (12px) |
| Heading color | `cssVarColors.content.base.strong` |
| Description color | `cssVarColors.content.base.secondary` |
| Info bg | `cssVarColors.surface.info.default` |
| Success bg | `cssVarColors.surface.success.default` |
| Warning bg | `cssVarColors.surface.warning.default` |
| Error bg | `cssVarColors.surface.error.default` |
| Default bg | `cssVarColors.surface.brand.secondary` |
