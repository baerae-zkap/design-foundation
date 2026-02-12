# FramedStyle Component

입력 필드를 감싸는 프레임 스타일 래퍼 컴포넌트입니다. 라벨, 도움말 텍스트, 에러 메시지를 일관성 있게 표시합니다.

## Reference

Montage Framed Style: https://montage.wanted.co.kr/docs/components/selection-and-input/framed-style/design

## Props

```typescript
export interface FramedStyleProps {
  /** Child input component */
  children: ReactNode;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Disabled */
  disabled?: boolean;
  /** Required indicator */
  required?: boolean;
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Custom style */
  style?: ViewStyle;
}
```

## Foundation Tokens

| Property | Token | Value |
|----------|-------|-------|
| `padding` | `spacing.semantic.inset.sm` | 16px |
| `borderRadius` | `radius.primitive.sm` | 8px |
| `gap` | `spacing.primitive.2` | 8px |
| `label.fontSize` | `typography.fontSize.sm` | 14px |
| `label.fontWeight` | `typography.fontWeight.medium` | 500 |
| `label.marginBottom` | `spacing.primitive.2` | 8px |
| `helperText.marginTop` | `spacing.primitive.1` | 4px |

## Usage

### Basic Usage

```tsx
import { FramedStyle, TextField } from '@baerae-zkap/design-system/native';

function App() {
  const [value, setValue] = useState('');

  return (
    <FramedStyle label="이름" helperText="이름을 입력하세요">
      <TextField
        value={value}
        onChangeText={setValue}
        placeholder="홍길동"
      />
    </FramedStyle>
  );
}
```

### With Required Indicator

```tsx
<FramedStyle label="이메일" helperText="필수 입력 항목" required>
  <TextField
    value={email}
    onChangeText={setEmail}
    placeholder="email@example.com"
  />
</FramedStyle>
```

### With Error State

```tsx
<FramedStyle
  label="전화번호"
  error
  errorMessage="올바른 전화번호가 아닙니다"
>
  <TextField
    value={phone}
    onChangeText={setPhone}
    placeholder="010-0000-0000"
    error
  />
</FramedStyle>
```

### With TextArea

```tsx
<FramedStyle label="설명" helperText="자세한 설명을 입력하세요">
  <TextArea
    value={description}
    onChangeText={setDescription}
    placeholder="설명 입력"
    numberOfLines={5}
  />
</FramedStyle>
```

### With Select

```tsx
<FramedStyle label="국가" helperText="국가를 선택하세요">
  <Select
    value={country}
    onChange={setCountry}
    options={[
      { label: '대한민국', value: 'kr' },
      { label: '미국', value: 'us' },
    ]}
    placeholder="국가 선택"
  />
</FramedStyle>
```

## Use Cases

- **Form Layouts**: 폼에서 일관된 입력 필드 스타일 제공
- **Label Positioning**: 라벨을 입력 필드 위에 표시
- **Error Display**: 에러 메시지를 입력 필드 아래에 표시
- **Helper Text**: 도움말 텍스트로 사용자 가이드 제공
- **Required Indicator**: 필수 입력 항목 표시

## Design Principles

1. **Container Role**: 입력 컴포넌트를 감싸는 프레임 역할
2. **Consistent Spacing**: Foundation 토큰 기반 일관된 간격
3. **Visual Hierarchy**: 라벨 → 입력 필드 → 도움말 순서
4. **Error Emphasis**: 에러 상태 시 빨간 테두리와 메시지
5. **Required Indicator**: 빨간 별표(*)로 필수 항목 표시

## Accessibility

- `accessibilityLabel`: 프레임 전체를 설명하는 라벨
- `testID`: 테스트 자동화를 위한 ID
- Required indicator: 필수 입력 항목을 시각적으로 표시
- Error messages: 에러 상태를 명확하게 전달
- Helper text: 입력 가이드 제공

## Color Tokens

| State | Border | Background | Text |
|-------|--------|------------|------|
| Normal | `#e2e8f0` (grey.95) | `#ffffff` (white) | `#334155` (grey.30) |
| Error | `#ef4444` (red.50) | `#ffffff` (white) | `#ef4444` (red.50) |
| Disabled | `#e2e8f0` (grey.95) | `#f8fafc` (grey.99) | `#94a3b8` (grey.80) |
| Helper Text | - | - | `#64748b` (grey.60) |
| Required (*) | - | - | `#ef4444` (red.50) |

## Component Composition

FramedStyle은 다음 입력 컴포넌트들과 함께 사용됩니다:

- **TextField**: 단일 줄 텍스트 입력
- **TextArea**: 여러 줄 텍스트 입력
- **Select**: 드롭다운 선택
- **Checkbox**: 체크박스 (향후)
- **Radio**: 라디오 버튼 (향후)

## Best Practices

✅ **DO**
- 폼 레이아웃에서 일관된 입력 필드 스타일링에 사용
- 필수 항목에 `required` prop 사용
- 에러 발생 시 명확한 에러 메시지 제공
- 입력 가이드가 필요한 경우 `helperText` 사용

❌ **DON'T**
- 라벨 없이 사용하지 않기 (접근성)
- 에러 메시지를 너무 길게 작성하지 않기
- 중첩해서 사용하지 않기 (FramedStyle 안에 FramedStyle)
- 입력 컴포넌트가 아닌 요소를 children으로 전달하지 않기
