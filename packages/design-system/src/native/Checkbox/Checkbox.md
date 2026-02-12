# Checkbox Component

> 사용자가 옵션을 선택하거나 해제할 수 있는 체크박스입니다.

## Quick Reference

```tsx
// Web
import { Checkbox } from '@baerae-zkap/design-system';
<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="동의합니다" />

// React Native
import { Checkbox } from '@baerae-zkap/design-system/native';
<Checkbox checked={checked} onPress={() => setChecked(!checked)} label="동의합니다" />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `checked` | `boolean` | - | ✅ | 체크 상태 |
| `label` | `string` | - | | 라벨 텍스트 |
| `indeterminate` | `boolean` | `false` | | 부분 선택 상태 (대시 표시) |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 크기 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onChange` | `(event) => void` | 체크 상태 변경 핸들러 |
| `name` | `string` | Form input name |
| `value` | `string` | Form input value |
| `aria-label` | `string` | 스크린 리더용 레이블 (label 없을 시 필수) |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `() => void` | 체크박스 탭 핸들러 |
| `accessibilityLabel` | `string` | 스크린 리더용 레이블 (label 없을 시 필수) |
| `testID` | `string` | 테스트 ID |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Box size (small) | - | 16px |
| Box size (medium) | - | 20px |
| Box size (large) | - | 24px |
| Border radius | `primitive.xs` | 4px |
| Border width | - | 2px |
| Icon-Label gap (small/medium) | `horizontal.2xs` | 8px |
| Icon-Label gap (large) | `horizontal.xs` | 12px |
| Checkmark color | `content.base.onColor` | #ffffff |
| Border (unchecked) | `border.base.default` | #cbd5e1 |
| Border (checked) | `border.brand.default` | #2563eb |
| Background (checked) | `surface.brand.default` | #2563eb |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Unchecked | 기본 상태 | 테두리만 표시 |
| Checked | 선택됨 | 배경색 채워짐 + 체크마크 |
| Indeterminate | 부분 선택 | 배경색 채워짐 + 대시 아이콘 |
| Disabled | 비활성화 | 회색 처리, 상호작용 불가 |
| Pressed | 눌림 | 투명도 80% |

## Usage Guidelines

### 1. 언제 사용하는가?
| 상황 | 사용 여부 |
|------|----------|
| 여러 옵션 중 복수 선택 가능 | ✅ Use |
| 단일 옵션 on/off 토글 | ✅ Use |
| 여러 옵션 중 하나만 선택 | ❌ Use Radio instead |
| 즉시 적용되는 설정 | ❌ Use Switch instead |

### 2. Indeterminate 상태
부모 체크박스가 자식 체크박스 그룹을 제어할 때 사용:
- 자식이 모두 선택됨 → 부모 `checked=true`
- 자식이 일부 선택됨 → 부모 `indeterminate=true`
- 자식이 모두 해제됨 → 부모 `checked=false`

### 3. 라벨 작성 규칙
```tsx
// ✅ 올바른 라벨 - 명확하고 구체적
<Checkbox label="이용약관에 동의합니다" />
<Checkbox label="마케팅 정보 수신 (선택)" />

// ❌ 잘못된 라벨 - 불명확하거나 중복
<Checkbox label="동의" />  // 무엇을 동의하는지 불명확
<Checkbox label="체크해주세요" />  // 동작 설명 포함하지 않기
```

## Accessibility

1. **Label Association**: 체크박스는 항상 label과 연결되어야 합니다.
2. **Keyboard Navigation**: Tab 키로 포커스 이동, Space 키로 토글
3. **Focus Visible**: 키보드 포커스 시 outline 표시
4. **ARIA States**: `aria-checked="true|false|mixed"` (indeterminate는 "mixed")

## Do & Don't

### ✅ Do
- 라벨은 체크박스 우측에 배치
- 복수 선택 가능한 옵션에 사용
- indeterminate 상태로 부모-자식 관계 표현

### ❌ Don't
- 라벨 없이 체크박스만 단독으로 사용하지 않기 (accessibilityLabel 필수)
- 단일 선택 옵션에 체크박스 사용하지 않기 (Radio 사용)
- 체크박스로 즉시 적용되는 설정 변경하지 않기 (Switch 사용)

## Code Examples

### Basic
```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onPress={() => setChecked(!checked)}  // RN
  // onChange={(e) => setChecked(e.target.checked)}  // Web
  label="이용약관에 동의합니다"
/>
```

### Sizes
```tsx
<Checkbox checked={true} onPress={() => {}} label="Small" size="small" />
<Checkbox checked={true} onPress={() => {}} label="Medium" size="medium" />
<Checkbox checked={true} onPress={() => {}} label="Large" size="large" />
```

### States
```tsx
<Checkbox checked={false} onPress={() => {}} label="Unchecked" />
<Checkbox checked={true} onPress={() => {}} label="Checked" />
<Checkbox checked={false} indeterminate={true} onPress={() => {}} label="Indeterminate" />
<Checkbox checked={true} disabled={true} onPress={() => {}} label="Disabled" />
```

### Checkbox Group with Indeterminate Parent
```tsx
const [items, setItems] = useState([
  { id: 1, label: '옵션 1', checked: false },
  { id: 2, label: '옵션 2', checked: true },
  { id: 3, label: '옵션 3', checked: false },
]);

const allChecked = items.every(item => item.checked);
const someChecked = items.some(item => item.checked) && !allChecked;

<Checkbox
  checked={allChecked}
  indeterminate={someChecked}
  onPress={() => {
    const newState = !allChecked;
    setItems(items.map(item => ({ ...item, checked: newState })));
  }}
  label="전체 선택"
/>

{items.map(item => (
  <Checkbox
    key={item.id}
    checked={item.checked}
    onPress={() => {
      setItems(items.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i));
    }}
    label={item.label}
  />
))}
```

### Without Label (Accessibility Label Required)
```tsx
<Checkbox
  checked={checked}
  onPress={() => setChecked(!checked)}
  accessibilityLabel="이용약관 동의"  // RN - 필수!
  // aria-label="이용약관 동의"  // Web - 필수!
/>
```
