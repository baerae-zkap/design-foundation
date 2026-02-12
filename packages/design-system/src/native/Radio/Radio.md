# Radio Component

## Overview

사용자가 여러 옵션 중 **하나만 선택**할 수 있는 라디오 버튼 컴포넌트입니다. Checkbox와 달리 그룹 내에서 배타적 선택(mutually exclusive)을 제공합니다.

## Design Principles

1. **명확한 선택 상태**: 원형 디자인으로 선택/비선택 상태를 직관적으로 표시
2. **그룹 단위 사용**: 여러 라디오 버튼을 함께 사용하여 하나의 선택지 제공
3. **시각적 일관성**: Checkbox와 구분되는 원형 모양 사용
4. **터치 친화적**: 충분한 터치 영역 제공 (최소 44x44 포인트)

## Visual Design

### Structure
```
Radio Button
├── Outer Circle (Border)
│   ├── 2px border
│   └── borderRadius: full (9999px)
└── Inner Circle (Selected indicator)
    ├── Filled circle when selected
    └── borderRadius: full (9999px)
```

### Sizes

| Size | Outer Circle | Inner Circle | Gap | Font Size |
|------|-------------|-------------|-----|-----------|
| Small | 16px | 6px | 8px | 13px |
| Medium (default) | 20px | 8px | 8px | 14px |
| Large | 24px | 10px | 12px | 15px |

## Props API

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | - | **Required**. 선택 상태 |
| `onPress` | `() => void` | - | **Required**. 클릭 핸들러 |
| `label` | `string` | - | 라벨 텍스트 (선택) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `testID` | `string` | - | 테스트 ID |
| `accessibilityLabel` | `string` | - | 접근성 라벨 |
| `style` | `ViewStyle` | - | 커스텀 스타일 |

## Foundation Tokens

### Spacing Tokens

| Property | Token | Value | Usage |
|----------|-------|-------|-------|
| `gap` (small/medium) | `spacing.semantic.horizontal.2xs` | 8px | 라디오-라벨 간격 |
| `gap` (large) | `spacing.semantic.horizontal.xs` | 12px | 라디오-라벨 간격 (대형) |

### Radius Tokens

| Property | Token | Value | Usage |
|----------|-------|-------|-------|
| `borderRadius` | `radius.primitive.full` | 9999px | 완전 원형 |

### Color Tokens

| State | Property | Token | Value |
|-------|----------|-------|-------|
| **Normal** | borderColor | `colors.border.base.default` | #d6d9dd |
| | backgroundColor | `colors.surface.base.default` | #ffffff |
| **Selected** | borderColor | `colors.border.brand.default` | #0066ff |
| | innerCircle | `colors.surface.brand.default` | #0066ff |
| **Disabled** | borderColor | `colors.border.disabled.default` | #bcc1c7 |
| | backgroundColor | `colors.surface.disabled.default` | #d6d9dd |
| | innerCircle | `colors.content.disabled.default` | #a7adb5 |
| **Label** | color (normal) | `colors.content.base.default` | #3e4651 |
| | color (disabled) | `colors.content.disabled.default` | #a7adb5 |

## Usage Examples

### React Native

```tsx
import { Radio } from '@baerae-zkap/design-system/native';
import { View } from 'react-native';
import { useState } from 'react';

function PaymentMethodSelector() {
  const [method, setMethod] = useState('card');

  return (
    <View style={{ gap: 12 }}>
      <Radio
        selected={method === 'card'}
        onPress={() => setMethod('card')}
        label="신용카드"
      />
      <Radio
        selected={method === 'bank'}
        onPress={() => setMethod('bank')}
        label="계좌이체"
      />
      <Radio
        selected={method === 'phone'}
        onPress={() => setMethod('phone')}
        label="휴대폰 결제"
      />
    </View>
  );
}
```

### Sizes

```tsx
// Small
<Radio size="small" label="Small" selected={selected} onPress={() => {}} />

// Medium (default)
<Radio size="medium" label="Medium" selected={selected} onPress={() => {}} />

// Large
<Radio size="large" label="Large" selected={selected} onPress={() => {}} />
```

### With Disabled State

```tsx
<Radio
  label="비활성화된 옵션"
  selected={false}
  disabled
  onPress={() => {}}
/>

<Radio
  label="선택된 비활성화 옵션"
  selected
  disabled
  onPress={() => {}}
/>
```

### Radio Group Pattern

```tsx
function RadioGroup() {
  const [selected, setSelected] = useState('option1');

  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  return (
    <View style={{ gap: 12 }}>
      {options.map(option => (
        <Radio
          key={option.value}
          label={option.label}
          selected={selected === option.value}
          onPress={() => setSelected(option.value)}
        />
      ))}
    </View>
  );
}
```

## Behavior

### Selection Logic

- **배타적 선택**: 그룹 내에서 하나만 선택 가능
- **상태 관리**: 부모 컴포넌트에서 선택 상태 관리 필요
- **선택 해제 불가**: 한번 선택하면 다른 옵션 선택 전까지 해제 불가

### Interaction States

| State | Behavior |
|-------|----------|
| **Normal** | 회색 테두리, 흰색 배경 |
| **Hover** | (웹) 약간의 배경색 변화 |
| **Pressed** | opacity 0.8 적용 |
| **Selected** | 파란색 테두리 + 내부 원 표시 |
| **Disabled** | 회색 처리, 클릭 불가 |

## Accessibility

### Screen Reader Support

```tsx
<Radio
  accessibilityRole="radio"
  accessibilityState={{ checked: selected, disabled }}
  accessibilityLabel="신용카드 결제"
/>
```

### Keyboard Navigation

- **Space/Enter**: 선택
- **Arrow keys**: 그룹 내 이동 (RadioGroup 컴포넌트 사용 시)

### Touch Target

- 최소 44x44 포인트 터치 영역 보장
- 라벨 클릭 시에도 선택 가능

## Design Guidelines

### When to Use

✅ **적합한 경우:**
- 여러 옵션 중 **하나만 선택**해야 할 때
- 선택지가 2-6개일 때
- 모든 옵션을 한눈에 보여줘야 할 때

❌ **부적합한 경우:**
- 여러 항목 동시 선택 가능 → Checkbox 사용
- 선택지가 7개 이상 → Select 사용
- 선택지가 2개 + 명확한 대립 관계 → Switch 사용

### Radio vs Checkbox

| Feature | Radio | Checkbox |
|---------|-------|----------|
| **선택** | 하나만 선택 | 여러 개 선택 |
| **모양** | 원형 | 사각형 |
| **해제** | 불가 (다른 선택 필요) | 클릭으로 해제 가능 |
| **용도** | 배타적 선택 | 독립적 선택 |

## AI Implementation Guide

### Component Location

- **React Native**: `packages/design-system/src/native/Radio.tsx`
- **Storybook**: `zkap-rn-mvp/stories/baerae-design-system/Radio.stories.tsx`
- **Docs**: `packages/design-system/docs/components/Radio.md`

### Token Import

```tsx
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
```

### Key Implementation Points

1. **원형 디자인**: `borderRadius: radius.primitive.full` (9999px)
2. **내부 원 표시**: selected일 때만 inner circle 렌더링
3. **Pressable 사용**: pressed 상태 처리 (opacity 0.8)
4. **접근성**: accessibilityRole="radio", accessibilityState 설정
5. **토큰 기반**: 모든 스타일 값은 Foundation 토큰 사용

### Foundation Token Validation

✅ **Required tokens:**
- `radius.primitive.full` (9999)
- `spacing.semantic.horizontal.2xs` (8)
- `spacing.semantic.horizontal.xs` (12)
- `colors.border.brand.default` (#0066ff)
- `colors.surface.brand.default` (#0066ff)
- `colors.border.base.default` (#d6d9dd)

## Version History

- **v0.1.9** (2025-02-06): Radio component 추가, Foundation 토큰 기반 구현
