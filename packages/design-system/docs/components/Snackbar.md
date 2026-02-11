# Snackbar

하단에 나타나는 짧은 피드백 메시지 컴포넌트입니다.

## Import

```typescript
import { Snackbar } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | 'default' \| 'success' \| 'error' | No | 'default' | 스낵바 유형 |
| message | string | Yes | - | 메시지 텍스트 |
| actionLabel | string | No | - | 액션 버튼 라벨 |
| onAction | () => void | No | - | 액션 버튼 핸들러 |
| duration | number | No | 3000 | 자동 닫힘 시간 (ms) |
| onDismiss | () => void | No | - | 닫힘 핸들러 |
| testID | string | No | - | E2E 테스트 ID |
| accessibilityLabel | string | No | message 값 | 스크린 리더 라벨 |
| accessibilityHint | string | No | - | 스크린 리더 힌트 |
| style | ViewStyle | No | - | 커스텀 스타일 |

## Foundation Tokens Used

| Property | Token | Value |
|----------|-------|-------|
| padding | spacing.semantic.inset.sm | 16px |
| borderRadius | radius.component.toast.default | 12px |
| gap | spacing.semantic.horizontal.2xs | 8px |
| minHeight | spacing.primitive.12 | 48px |
| shadowOpacity | - | 0.15 |

## Usage

```tsx
// Basic snackbar
<Snackbar
  variant="default"
  message="파일이 저장되었습니다"
/>

// With action
<Snackbar
  variant="success"
  message="메시지가 삭제되었습니다"
  actionLabel="취소"
  onAction={() => undo()}
/>

// Custom duration
<Snackbar
  variant="error"
  message="네트워크 오류"
  actionLabel="재시도"
  onAction={() => retry()}
  duration={5000}
/>
```

## Variants

- **default**: 일반 피드백 (다크 그레이)
- **success**: 성공 메시지 (초록색)
- **error**: 에러 메시지 (빨간색)

## Accessibility

- accessibilityRole: "alert"
- accessibilityLiveRegion: "polite" (자동 알림)
- 자동 닫힘 시 onDismiss 호출
