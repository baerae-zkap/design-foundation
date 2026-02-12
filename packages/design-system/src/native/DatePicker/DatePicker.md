# DatePicker Component

날짜를 선택하는 입력 필드 컴포넌트입니다.

## Import

```typescript
import { DatePicker } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `Date \| null` | ✅ | - | 선택된 날짜 |
| `onChange` | `(date: Date) => void` | ✅ | - | 날짜 변경 핸들러 |
| `minimumDate` | `Date` | - | - | 선택 가능한 최소 날짜 |
| `maximumDate` | `Date` | - | - | 선택 가능한 최대 날짜 |
| `label` | `string` | - | - | 라벨 텍스트 |
| `placeholder` | `string` | - | `'날짜를 선택하세요'` | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | - | `false` | 비활성 상태 |
| `size` | `'small' \| 'medium' \| 'large'` | - | `'medium'` | 크기 |
| `testID` | `string` | - | - | 테스트 ID |
| `accessibilityLabel` | `string` | - | - | 접근성 라벨 |
| `style` | `ViewStyle` | - | - | 커스텀 스타일 |

## Basic Usage

```tsx
import React, { useState } from 'react';
import { DatePicker } from '@baerae-zkap/design-system/native';

function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      label="생년월일"
      placeholder="날짜를 선택하세요"
      size="medium"
    />
  );
}
```

## Sizes

```tsx
<DatePicker value={date} onChange={setDate} size="small" />
<DatePicker value={date} onChange={setDate} size="medium" />
<DatePicker value={date} onChange={setDate} size="large" />
```

## With Date Range

```tsx
const today = new Date();
const minDate = new Date(today.getFullYear() - 100, 0, 1);
const maxDate = today;

<DatePicker
  value={date}
  onChange={setDate}
  minimumDate={minDate}
  maximumDate={maxDate}
  label="생년월일"
/>
```

## Disabled State

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  label="날짜"
  disabled
/>
```

## Design Tokens

### Spacing
- Input height (small): `36px`
- Input height (medium): `40px`
- Input height (large): `44px`
- Padding horizontal: `16px` (`spacing.component.input.paddingX`)
- Label gap: `8px` (`spacing.component.input.labelGap`)
- Icon gap: `8px` (`spacing.semantic.horizontal.2xs`)
- Modal padding: `24px` (`spacing.component.modal.padding`)
- Modal button gap: `12px` (`spacing.component.modal.buttonGap`)

### Radius
- Input: `8px` (`radius.semantic.input.default`)
- Modal: `24px` (`radius.semantic.modal.default`)
- Button: `12px` (`radius.semantic.button.lg`)

### Colors
- Border (default): `#cbd5e1` (palette.grey.90)
- Border (disabled): `#e2e8f0` (palette.grey.95)
- Background (default): `#ffffff` (palette.static.white)
- Background (pressed): `#f8fafc` (palette.grey.99)
- Background (disabled): `#f8fafc` (palette.grey.99)
- Text (default): `#334155` (palette.grey.30)
- Text (disabled): `#94a3b8` (palette.grey.80)
- Placeholder: `#94a3b8` (palette.grey.80)
- Icon: `#64748b` (palette.grey.60)
- Modal overlay: `rgba(0, 0, 0, 0.5)`

## Platform Differences

### iOS
- Modal picker with spinner display
- Requires confirmation (취소/확인 buttons)
- Full modal overlay

### Android
- Native system date picker
- Auto-confirms on selection
- No modal overlay

## Accessibility

- Uses `accessibilityRole="button"` for trigger
- Supports `accessibilityLabel` for screen readers
- Disabled state reflected in `accessibilityState`
- Label automatically used as accessibility label if not provided

## Dependencies

Requires `@react-native-community/datetimepicker`:

```bash
npm install @react-native-community/datetimepicker
# or
yarn add @react-native-community/datetimepicker
```

## Notes

- Date format: `YYYY-MM-DD`
- Platform-specific picker implementation
- iOS uses modal with spinner
- Android uses native date picker dialog
- Supports date range constraints with `minimumDate` and `maximumDate`
