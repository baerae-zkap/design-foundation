# Select Component

드롭다운 목록에서 옵션을 선택하는 컴포넌트입니다.

## Import

```typescript
// React Native
import { Select } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
import { Select } from '@baerae-zkap/design-system/native';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState<string | null>(null);

  const options = [
    { label: '옵션 1', value: '1' },
    { label: '옵션 2', value: '2' },
    { label: '옵션 3', value: '3' },
  ];

  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      placeholder="선택하세요"
    />
  );
}
```

## Props

### SelectProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string \| null` | ✅ | - | 선택된 값 |
| `onChange` | `(value: string) => void` | ✅ | - | 변경 핸들러 |
| `options` | `SelectOption[]` | ✅ | - | 옵션 목록 |
| `placeholder` | `string` | - | `'선택하세요'` | 플레이스홀더 텍스트 |
| `label` | `string` | - | - | 라벨 텍스트 |
| `error` | `boolean` | - | `false` | 에러 상태 |
| `errorMessage` | `string` | - | - | 에러 메시지 |
| `disabled` | `boolean` | - | `false` | 비활성 상태 |
| `size` | `'small' \| 'medium' \| 'large'` | - | `'medium'` | 크기 |
| `testID` | `string` | - | - | 테스트 ID |
| `accessibilityLabel` | `string` | - | - | 접근성 라벨 |
| `style` | `ViewStyle` | - | - | 커스텀 스타일 |

### SelectOption

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | 표시될 텍스트 |
| `value` | `string` | ✅ | 옵션의 고유 값 |
| `disabled` | `boolean` | - | 비활성 상태 |

## Sizes

```tsx
// Small (36px height)
<Select size="small" value={value} onChange={setValue} options={options} />

// Medium (40px height) - default
<Select size="medium" value={value} onChange={setValue} options={options} />

// Large (44px height)
<Select size="large" value={value} onChange={setValue} options={options} />
```

## States

### Default
```tsx
<Select
  value={null}
  onChange={setValue}
  options={options}
  placeholder="선택하세요"
/>
```

### Selected
```tsx
<Select
  value="1"
  onChange={setValue}
  options={options}
/>
```

### Error
```tsx
<Select
  value={null}
  onChange={setValue}
  options={options}
  error={true}
  errorMessage="필수 항목입니다"
/>
```

### Disabled
```tsx
<Select
  value="1"
  onChange={setValue}
  options={options}
  disabled={true}
/>
```

## With Label

```tsx
<Select
  value={value}
  onChange={setValue}
  options={options}
  label="거주 도시"
  placeholder="도시를 선택하세요"
/>
```

## Disabled Options

```tsx
const options = [
  { label: '사용 가능', value: '1' },
  { label: '사용 불가', value: '2', disabled: true },
  { label: '사용 가능', value: '3' },
];

<Select
  value={value}
  onChange={setValue}
  options={options}
/>
```

## Form Validation

```tsx
import { useState } from 'react';

function FormExample() {
  const [city, setCity] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && city === null;

  return (
    <Select
      value={city}
      onChange={setCity}
      options={cityOptions}
      label="거주 도시"
      error={hasError}
      errorMessage={hasError ? "도시를 선택해주세요" : undefined}
    />
  );
}
```

## Design Tokens

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.component.input.paddingX` | 16px | 좌우 패딩 |
| `spacing.semantic.horizontal.2xs` | 8px | 내부 요소 간 간격 |
| `spacing.component.input.labelGap` | 8px | 라벨-입력 필드 간격 |
| `spacing.component.input.helperGap` | 4px | 입력 필드-에러 메시지 간격 |
| `spacing.semantic.inset.sm` | 16px | 옵션 항목 좌우 패딩 |
| `spacing.semantic.inset.xs` | 12px | 옵션 항목 상하 패딩 |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.semantic.input.default` | 8px | 입력 필드 테두리 |
| `radius.semantic.card.sm` | 12px | 드롭다운 모달 테두리 |

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `border.base.default` | #cbd5e1 | 기본 테두리 |
| `border.brand.default` | #2563eb | 포커스 테두리 |
| `border.error.default` | #ef4444 | 에러 테두리 |
| `border.disabled.default` | #e2e8f0 | 비활성 테두리 |
| `surface.base.default` | #ffffff | 기본 배경 |
| `surface.base.hover` | #f8fafc | 호버 배경 |
| `surface.brand.secondary` | #eff6ff | 선택된 옵션 배경 |
| `surface.disabled.secondary` | #f8fafc | 비활성 배경 |
| `content.base.default` | #334155 | 기본 텍스트 |
| `content.base.placeholder` | #94a3b8 | 플레이스홀더 텍스트 |
| `content.brand.default` | #2563eb | 선택된 옵션 텍스트 |
| `content.disabled.default` | #94a3b8 | 비활성 텍스트 |
| `content.error.default` | #ef4444 | 에러 메시지 |

## Accessibility

- **Role**: `button` (trigger), `list` (options)
- **States**: `disabled`, `expanded`
- **Keyboard**: Space/Enter to open, Arrow keys to navigate
- **Label**: Automatically uses `label` prop as `accessibilityLabel`

## Usage Guidelines

### Do
- ✅ 5-10개의 옵션이 있을 때 사용
- ✅ 명확한 라벨 제공
- ✅ 에러 발생 시 구체적인 메시지 표시
- ✅ 로딩 중에는 disabled 상태로 표시

### Don't
- ❌ 2-3개의 옵션에는 Radio 사용 권장
- ❌ 20개 이상의 옵션에는 검색 기능 필요
- ❌ 라벨 없이 사용 지양
- ❌ 플레이스홀더에 중요 정보 포함 금지

## Best Practices

1. **옵션 정렬**: 알파벳순 또는 사용 빈도순으로 정렬
2. **기본값 설정**: 가장 일반적인 선택을 기본값으로
3. **검색 기능**: 옵션이 많으면 Autocomplete 고려
4. **그룹화**: 관련 옵션은 섹션으로 그룹화

## Related Components

- **Radio**: 2-5개의 상호 배타적 옵션
- **Switch**: On/Off 토글
- **Checkbox**: 다중 선택
- **TextField**: 자유 텍스트 입력
