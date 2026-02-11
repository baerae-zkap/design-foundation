# FallbackView

빈 상태, 에러 상태, 연결 없음 등의 fallback 화면을 표시하는 컴포넌트입니다.

## Import

```typescript
import { FallbackView } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | 'empty' \| 'error' \| 'noConnection' \| 'noResults' | No | 'empty' | 상태 유형 |
| icon | ReactNode | No | variant별 기본 이모지 | 커스텀 아이콘 |
| title | string | Yes | - | 제목 텍스트 |
| description | string | No | - | 설명 텍스트 |
| primaryAction | { label: string; onPress: () => void } | No | - | 주요 액션 버튼 |
| secondaryAction | { label: string; onPress: () => void } | No | - | 보조 액션 버튼 |
| testID | string | No | - | E2E 테스트 ID |
| accessibilityLabel | string | No | - | 스크린 리더 라벨 |
| accessibilityHint | string | No | - | 스크린 리더 힌트 |
| style | ViewStyle | No | - | 커스텀 스타일 |

## Foundation Tokens Used

| Property | Token | Value |
|----------|-------|-------|
| padding | spacing.semantic.inset.lg | 24px |
| gap (vertical) | spacing.semantic.vertical.md | 20px |
| gap (buttons) | spacing.semantic.horizontal.xs | 12px |
| title fontSize | typography.fontSize.lg | 18px |
| description fontSize | typography.fontSize.md | 16px |
| description lineHeight | typography.lineHeight.md | 24px |
| description marginTop | spacing.primitive[2] | 8px |

## Usage

```tsx
// Empty state
<FallbackView
  variant="empty"
  title="데이터가 없습니다"
  description="추가하려면 버튼을 눌러주세요"
  primaryAction={{ label: '추가하기', onPress: () => {} }}
/>

// Error state with retry
<FallbackView
  variant="error"
  title="오류가 발생했습니다"
  description="다시 시도해주세요"
  primaryAction={{ label: '재시도', onPress: () => retry() }}
  secondaryAction={{ label: '홈으로', onPress: () => goHome() }}
/>

// No connection state
<FallbackView
  variant="noConnection"
  title="네트워크 연결이 없습니다"
  description="인터넷 연결을 확인해주세요"
  testID="fallback-no-connection"
  accessibilityLabel="네트워크 연결 없음"
/>

// Custom icon
<FallbackView
  variant="noResults"
  icon={<CustomIcon />}
  title="검색 결과가 없습니다"
  description="다른 키워드로 검색해보세요"
/>
```

## Variants

| Variant | Icon | Use Case |
|---------|------|----------|
| **empty** | 📭 | 빈 상태 (데이터 없음) |
| **error** | ⚠️ | 에러 발생 |
| **noConnection** | 📡 | 네트워크 연결 없음 |
| **noResults** | 🔍 | 검색 결과 없음 |

## Accessibility

- `accessibilityLabel`을 제공하여 스크린 리더에게 상태를 명확히 전달하세요
- `testID`를 제공하여 E2E 테스트에서 식별할 수 있도록 하세요
- 버튼에는 명확한 액션 레이블을 사용하세요 (예: "재시도", "홈으로")

## Design Principles

1. **Clear Communication**: 사용자에게 현재 상태와 다음 행동을 명확히 전달
2. **Action Oriented**: 가능하면 문제를 해결할 수 있는 액션 버튼 제공
3. **Visual Hierarchy**: 아이콘 → 제목 → 설명 → 액션 순서로 정보 전달
4. **Consistent Iconography**: variant별 일관된 아이콘 사용
