# TextField Component

## Overview
사용자 입력을 받는 텍스트 입력 필드입니다. 라벨, 도움말 텍스트, 에러 메시지, 아이콘, 글자 수 카운터 등을 지원합니다.

## Import
```typescript
// React Native
import { TextField } from '@baerae-zkap/design-system/native';
```

## Basic Usage
```tsx
import { TextField } from '@baerae-zkap/design-system/native';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <TextField
      value={value}
      onChangeText={setValue}
      placeholder="이름을 입력하세요"
      label="이름"
      size="medium"
    />
  );
}
```

## Props

### TextFieldProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | **Required.** 입력 값 |
| `onChangeText` | `(text: string) => void` | - | **Required.** 변경 핸들러 |
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `label` | `string` | - | 입력 필드 라벨 |
| `helperText` | `string` | - | 도움말 텍스트 |
| `error` | `boolean` | `false` | 에러 상태 |
| `errorMessage` | `string` | - | 에러 메시지 (error=true일 때 표시) |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 입력 필드 크기 |
| `leftIcon` | `ReactNode` | - | 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | - | 오른쪽 아이콘 |
| `maxLength` | `number` | - | 최대 입력 글자 수 |
| `showCount` | `boolean` | `false` | 글자 수 카운터 표시 |
| `secureTextEntry` | `boolean` | `false` | 비밀번호 입력 모드 |
| `keyboardType` | `TextInputProps['keyboardType']` | - | 키보드 타입 |
| `testID` | `string` | - | 테스트 ID |
| `accessibilityLabel` | `string` | - | 접근성 라벨 |
| `style` | `ViewStyle` | - | 커스텀 스타일 |

## Sizes

| Size | Height | Font Size |
|------|--------|-----------|
| `small` | 36px | 14px |
| `medium` | 40px | 14px |
| `large` | 44px | 16px |

## States

- **Default**: Grey border (`#cbd5e1`)
- **Focused**: Brand border (`#2563eb`)
- **Error**: Red border (`#ef4444`)
- **Disabled**: Grey background (`#f8fafc`), disabled text color

## Design Tokens

### Foundation Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.component.input.paddingX` | 16px | 입력 필드 좌우 패딩 |
| `spacing.component.input.labelGap` | 8px | 라벨과 입력 필드 간격 |
| `spacing.component.input.helperGap` | 4px | 입력 필드와 도움말 간격 |
| `spacing.semantic.horizontal.2xs` | 8px | 아이콘-텍스트 간격 |
| `radius.semantic.input.default` | 8px | 입력 필드 border-radius |

### Color Tokens

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | `#cbd5e1` (border.base.default) | `#ffffff` (surface.base.default) | `#334155` (content.base.default) |
| Focused | `#2563eb` (border.brand.default) | `#ffffff` | `#334155` |
| Error | `#ef4444` (border.error.default) | `#ffffff` | `#334155` |
| Disabled | `#e2e8f0` (border.disabled.default) | `#f8fafc` (surface.disabled.secondary) | `#94a3b8` (content.disabled.default) |

## Examples

### With Label and Helper Text
```tsx
<TextField
  value={email}
  onChangeText={setEmail}
  label="이메일"
  placeholder="example@email.com"
  helperText="이메일 주소를 정확히 입력해주세요"
  keyboardType="email-address"
/>
```

### With Error
```tsx
<TextField
  value={password}
  onChangeText={setPassword}
  label="비밀번호"
  error={true}
  errorMessage="비밀번호는 8자 이상이어야 합니다"
  secureTextEntry={true}
/>
```

### With Icons
```tsx
<TextField
  value={search}
  onChangeText={setSearch}
  placeholder="검색"
  leftIcon={<Icon name="search" size={20} color="#64748b" />}
  rightIcon={<Icon name="close" size={20} color="#64748b" />}
/>
```

### With Character Count
```tsx
<TextField
  value={bio}
  onChangeText={setBio}
  label="자기소개"
  placeholder="자기소개를 입력하세요"
  maxLength={100}
  showCount={true}
/>
```

### Sizes
```tsx
<TextField size="small" placeholder="Small" />
<TextField size="medium" placeholder="Medium" />
<TextField size="large" placeholder="Large" />
```

## Accessibility

- `accessibilityLabel`: 스크린 리더용 라벨 (기본값: label prop)
- `accessibilityState`: 비활성 상태 자동 전달
- 포커스 상태에서 키보드 입력 가능
- 에러 상태 시 빨간 테두리로 시각적 피드백 제공

## Best Practices

1. **Label 사용**: 입력 필드의 목적을 명확히 전달
2. **Helper Text**: 입력 형식이나 제약사항 안내
3. **Error Message**: 구체적인 에러 원인 설명
4. **Placeholder**: 입력 예시 표시
5. **Max Length**: 입력 제한이 있을 경우 `showCount`와 함께 사용

## Related Components

- **Button**: 폼 제출 버튼
- **Chip**: 입력값 태그 표시
- **Alert**: 폼 에러 알림
