# Toast Component

## Overview

Toast는 간단한 피드백 메시지를 화면 상단/하단에 일시적으로 표시하는 컴포넌트입니다. Snackbar와 달리 액션 버튼이 없고 자동으로 사라지는 간단한 알림에 적합합니다.

## Props

```typescript
interface ToastProps {
  /** Variant - default | success | error | info */
  variant?: 'default' | 'success' | 'error' | 'info';
  /** Message text */
  message: string;
  /** Duration in milliseconds (0 = manual dismiss only) */
  duration?: number;
  /** Position - top | bottom */
  position?: 'top' | 'bottom';
  /** Custom icon */
  icon?: ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Test ID for E2E testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Custom style */
  style?: ViewStyle;
}
```

## Usage

### Basic Usage

```tsx
import { Toast } from '@baerae-zkap/design-system/native';

<Toast
  variant="success"
  message="저장되었습니다"
  duration={3000}
  onDismiss={() => {}}
/>
```

### With Icon

```tsx
<Toast
  variant="info"
  message="새로운 메시지가 도착했습니다"
  icon={<MessageIcon />}
  duration={3000}
  onDismiss={() => {}}
/>
```

### Dismissible Toast

```tsx
<Toast
  variant="default"
  message="이 메시지는 직접 닫을 수 있습니다"
  dismissible
  duration={0}
  onDismiss={() => {}}
/>
```

### Position Variants

```tsx
{/* Top position (default) */}
<Toast
  message="상단에 표시됩니다"
  position="top"
  duration={3000}
  onDismiss={() => {}}
/>

{/* Bottom position */}
<Toast
  message="하단에 표시됩니다"
  position="bottom"
  duration={3000}
  onDismiss={() => {}}
/>
```

## Variants

### Default
- Background: `#131a1f` (grey.15)
- Text: `#ffffff` (white)
- Use: 일반 정보 메시지

### Success
- Background: `#14b66b` (green.50)
- Text: `#ffffff` (white)
- Use: 성공 완료 알림

### Error
- Background: `#dc2f2f` (red.50)
- Text: `#ffffff` (white)
- Use: 오류 발생 알림

### Info
- Background: `#0066ff` (blue.50)
- Text: `#ffffff` (white)
- Use: 안내 메시지

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding | `spacing.semantic.inset.sm` | 16px |
| borderRadius | `radius.component.toast.default` | 12px |
| gap | `spacing.semantic.horizontal.2xs` | 8px |
| minHeight | `spacing.primitive.12` | 48px |
| closeButton size | `spacing.primitive.6` | 24px |

## Differences from Snackbar

| Feature | Toast | Snackbar |
|---------|-------|----------|
| Action Button | ❌ No | ✅ Yes |
| Position | Top or Bottom | Bottom only |
| Auto-dismiss | ✅ Yes (default) | ✅ Yes (default) |
| Use Case | Simple feedback | Feedback with action |

## Accessibility

- Uses `accessibilityRole="alert"` for screen readers
- Supports `accessibilityLiveRegion="polite"` for automatic announcements
- Dismiss button has proper accessibility label
- Respects reduced motion preferences

## Best Practices

1. **Keep messages short** - 1-2 lines maximum
2. **Use appropriate variants** - Match variant to message severity
3. **Auto-dismiss** - Set reasonable duration (2-4 seconds)
4. **Consider position** - Top for success, bottom for errors
5. **Don't stack** - Show one toast at a time

## Examples

### Success Toast
```tsx
<Toast
  variant="success"
  message="파일이 업로드되었습니다"
  duration={3000}
  onDismiss={() => {}}
/>
```

### Error Toast
```tsx
<Toast
  variant="error"
  message="네트워크 연결을 확인해주세요"
  position="bottom"
  duration={4000}
  onDismiss={() => {}}
/>
```

### Info Toast with Icon
```tsx
<Toast
  variant="info"
  message="새로운 업데이트가 있습니다"
  icon={<InfoIcon />}
  dismissible
  duration={5000}
  onDismiss={() => {}}
/>
```
