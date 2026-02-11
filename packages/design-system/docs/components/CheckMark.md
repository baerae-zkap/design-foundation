# CheckMark Component

체크 표시 아이콘으로 성공, 완료, 선택 상태를 나타냅니다.

## Overview

CheckMark는 간단한 체크 아이콘(✓)을 원형 배경과 함께 표시하는 컴포넌트입니다. 성공 메시지, 완료된 작업, 기능 목록 등에서 시각적 확인을 제공합니다.

## Props

```typescript
export interface CheckMarkProps {
  /** Checked state (true일 때만 표시) */
  checked: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  color?: 'brand' | 'success' | 'error' | 'base';
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Custom style */
  style?: ViewStyle;
}
```

## Sizes

| Size | Container | Icon | 용도 |
|------|-----------|------|------|
| small | 16px | 10px | 리스트 아이템, 작은 인라인 표시 |
| medium | 20px | 12px | 기본 사용, 일반 메시지 |
| large | 24px | 14px | 강조 메시지, 큰 카드 |

## Colors

| Color | Background | Check | 용도 |
|-------|------------|-------|------|
| brand | #2563eb | #ffffff | 브랜드 강조, 선택된 항목 |
| success | #22c55e | #ffffff | 성공 메시지, 완료 상태 (권장) |
| error | #ef4444 | #ffffff | 오류 확인, 경고 확인 |
| base | #64748b | #ffffff | 중립적 표시, 일반 체크 |

## Design Tokens

### Size Tokens
- container: 16px (small), 20px (medium), 24px (large)
- icon: 10px (small), 12px (medium), 14px (large)
- strokeWidth: 2px (small/medium), 2.5px (large)

### Radius Token
- borderRadius: 9999px (radius.primitive.full) - 원형

### Color Tokens
| Color | Token | Value |
|-------|-------|-------|
| brand bg | palette.blue.50 | #2563eb |
| success bg | palette.green.50 | #22c55e |
| error bg | palette.red.50 | #ef4444 |
| base bg | palette.grey.60 | #64748b |
| check icon | palette.static.white | #ffffff |

## Usage Examples

### Basic Usage (React Native)

```tsx
import { CheckMark } from '@baerae-zkap/design-system/native';

// Success indicator
<CheckMark checked={true} size="medium" color="success" />

// Hidden when unchecked
<CheckMark checked={false} size="medium" color="success" />
// → renders null
```

### Success Message

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <CheckMark checked={true} size="medium" color="success" />
  <Text>Payment completed successfully</Text>
</View>
```

### Feature List

```tsx
<View style={{ gap: 12 }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <CheckMark checked={true} size="small" color="brand" />
    <Text>Unlimited projects</Text>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <CheckMark checked={true} size="small" color="brand" />
    <Text>Priority support</Text>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <CheckMark checked={true} size="small" color="brand" />
    <Text>Advanced analytics</Text>
  </View>
</View>
```

### Task Completion

```tsx
<View style={{ gap: 12 }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <CheckMark checked={true} size="medium" color="success" />
    <Text style={{ textDecorationLine: 'line-through' }}>
      Complete onboarding
    </Text>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <CheckMark checked={true} size="medium" color="success" />
    <Text style={{ textDecorationLine: 'line-through' }}>
      Verify email address
    </Text>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#cbd5e1' }} />
    <Text>Add payment method</Text>
  </View>
</View>
```

## Design Guidelines

### When to Use
- ✅ 성공 메시지와 함께
- ✅ 완료된 작업 표시
- ✅ 기능 목록에서 포함된 항목 표시
- ✅ 선택된 항목 강조

### When Not to Use
- ❌ 인터랙티브한 선택 UI (대신 Checkbox 사용)
- ❌ 라디오 버튼 대체 (대신 Radio 사용)
- ❌ 토글 스위치 대체 (대신 Switch 사용)

### Color Selection
- **success**: 성공 메시지, 완료 상태 (가장 일반적)
- **brand**: 브랜드 강조가 필요한 경우
- **error**: 오류 확인 시 (예: "오류를 해결했습니다")
- **base**: 중립적인 표시가 필요한 경우

### Size Selection
- **small (16px)**: 리스트 아이템, 밀집된 레이아웃
- **medium (20px)**: 기본 사용 (권장)
- **large (24px)**: 강조 메시지, 큰 카드

## Accessibility

- `accessibilityRole="image"` 자동 적용
- `accessibilityLabel` 기본값: "Check mark"
- 시각적 표시이므로 반드시 텍스트와 함께 사용
- 색상만으로 의미를 전달하지 않기 (항상 텍스트 레이블 포함)

## Platform Notes

### React Native
- checked={false}일 때 null 반환 (렌더링 안함)
- View 기반으로 순수 CSS checkmark 구현
- 외부 아이콘 라이브러리 불필요

## Comparison with Similar Components

| Component | Use Case |
|-----------|----------|
| **CheckMark** | 정적 표시, 읽기 전용 상태 |
| **Checkbox** | 인터랙티브 선택, 폼 입력 |
| **Radio** | 단일 선택 (그룹 중 하나) |
| **Switch** | 토글 스위치 (켜기/끄기) |

## Storybook

CheckMark 컴포넌트의 모든 변형은 Storybook에서 확인할 수 있습니다:

```bash
pnpm storybook
```

**스토리 목록:**
- Default: Controls로 조정 가능한 기본 스토리
- Sizes: 사이즈별 비교 (small/medium/large)
- Colors: 색상별 비교 (brand/success/error/base)
- States: 상태별 비교 (checked/unchecked)
- UseCases: 실제 사용 사례 (Success Message, Feature List, Task Completion)
- AllColors: 색상 그리드 (hex 값 포함)
