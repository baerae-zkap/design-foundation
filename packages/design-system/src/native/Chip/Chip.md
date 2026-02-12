# Chip Component

> 입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소입니다.

## Quick Reference

```tsx
// Web
import { Chip } from '@baerae-zkap/design-system';
<Chip
    color="brandDefault"
  selected={isSelected}
  onClick={() => toggleFilter()}
>
  전자제품
</Chip>

// React Native
import { Chip } from '@baerae-zkap/design-system/native';
<Chip
    color="brandDefault"
  selected={isSelected}
  onPress={() => toggleFilter()}
>
  전자제품
</Chip>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"filled"` \| `"outlined"` | `"filled"` | | 스타일 변형 |
| `color` | `"brandDefault"` \| `"baseDefault"` \| `"successDefault"` \| `"errorDefault"` \| `"warningDefault"` | `"baseDefault"` | | 색상 테마 |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 크기 |
| `selected` | `boolean` | `false` | | 선택 상태 (체크 아이콘 표시) |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `leftIcon` | `ReactNode` | - | | 좌측 아이콘 |
| `avatar` | `ReactNode` | - | | 아바타 (leftIcon과 배타적) |
| `onClose` | `() => void` | - | | 닫기 버튼 핸들러 (X 버튼 표시) |
| `closeIcon` | `ReactNode` | - | | 커스텀 닫기 아이콘 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 |
| `aria-pressed` | `boolean` | 선택 상태 (selected 시 자동 설정) |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(event) => void` | 탭 핸들러 |
| `onLongPress` | `(event) => void` | 길게 누르기 핸들러 |
| `accessibilityState` | `object` | 접근성 상태 (자동 설정) |

## Behaviors

| Prop | 용도 | 특징 |
|------|------|------|
| `selected` | 필터 선택, 카테고리 | 선택 시 체크 아이콘 표시, 진한 배경 + 흰색 텍스트 |
| `onClose` | 태그 입력, 선택된 항목 | 닫기(X) 버튼으로 삭제 가능 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Height (small) | - | 24px |
| Height (medium) | - | 32px |
| Height (large) | - | 40px |
| Horizontal Padding (small) | - | 8px |
| Horizontal Padding (medium) | - | 12px |
| Horizontal Padding (large) | - | 16px |
| Icon Size (small) | - | 14px |
| Icon Size (medium) | - | 18px |
| Icon Size (large) | - | 22px |
| Border Radius | - | height / 2 (pill shape) |
| Gap (icon-text) | - | 4px |
| Font Weight | - | 500 |

## Color Values

### Filled Variant
| Color | Background | Pressed | Selected | Text | Text Selected |
|-------|------------|---------|----------|------|---------------|
| `brandDefault` | `#dbeafe` | `#bfdbfe` | `#2563eb` | `#1e40af` | `#ffffff` |
| `baseDefault` | `#f1f5f9` | `#e2e8f0` | `#334155` | `#334155` | `#ffffff` |
| `successDefault` | `#dcfce7` | `#bbf7d0` | `#16a34a` | `#166534` | `#ffffff` |
| `errorDefault` | `#fee2e2` | `#fecaca` | `#dc2626` | `#991b1b` | `#ffffff` |
| `warningDefault` | `#fef9c3` | `#fef08a` | `#ca8a04` | `#854d0e` | `#ffffff` |

### Outlined Variant
| Color | Background | Pressed | Selected | Border | Text | Text Selected |
|-------|------------|---------|----------|--------|------|---------------|
| `brandDefault` | transparent | `rgba(37,99,235,0.08)` | `#2563eb` | `#2563eb` | `#2563eb` | `#ffffff` |
| `baseDefault` | transparent | `rgba(0,0,0,0.04)` | `#334155` | `#cbd5e1` | `#334155` | `#ffffff` |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Pressed | 누르고 있는 상태 | 배경 어두워짐 |
| Selected | 선택된 상태 | 진한 배경 + 흰색 텍스트 |
| Disabled | 비활성화 | opacity: 0.5, 회색 텍스트 |

## Usage Rules

### 1. Behavior 선택 기준
| 상황 | Prop | 예시 |
|------|------|------|
| 필터 선택 | `selected` | 카테고리 필터, 태그 필터 |
| 입력된 값 표시 | `onClose` | 선택된 태그, 검색 키워드 |

### 2. Chip 조합 규칙
```tsx
// ✅ 필터 그룹 - 같은 색상으로 통일
<View style={{ flexDirection: 'row', gap: 8 }}>
  <Chip color="brandDefault" selected>전체</Chip>
  <Chip color="brandDefault">전자제품</Chip>
  <Chip color="brandDefault">의류</Chip>
</View>

// ✅ 입력 태그 - baseDefault 권장
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Chip onClose={() => remove('React')}>React</Chip>
  <Chip onClose={() => remove('TypeScript')}>TypeScript</Chip>
</View>
```

### 3. 간격 규칙
```tsx
// Chip 간 간격: 8px
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Chip>...</Chip>
  <Chip>...</Chip>
</View>
```

## Accessibility

1. **Selected 상태**: `aria-pressed` 속성으로 선택 상태 전달
2. **Close Button**: 별도 탭 타겟으로 접근 가능 (Enter/Space로 삭제)
3. **Disabled State**: `aria-disabled` 또는 `accessibilityState.disabled` 설정
4. **Minimum Touch Target**: hitSlop으로 충분한 터치 영역 확보

## Do & Don't

### ✅ Do
- 필터 그룹은 같은 색상으로 통일
- 삭제 가능한 chip에는 반드시 `onClose` 제공
- 선택 가능한 chip은 `selected` prop 사용
- chip 텍스트는 간결하게 (2-3 단어 이내)

### ❌ Don't
- 한 그룹에 여러 색상의 chip 혼용 금지
- chip 내부에 긴 텍스트 넣지 않기
- chip을 주요 CTA 버튼으로 사용하지 않기
- selected 상태와 disabled 상태 동시 사용 금지

## Code Examples

### Selectable Chips (Toggle)
```tsx
const [selected, setSelected] = useState<string[]>(['전자제품']);

const toggle = (filter: string) => {
  setSelected(prev =>
    prev.includes(filter)
      ? prev.filter(f => f !== filter)
      : [...prev, filter]
  );
};

<View style={{ flexDirection: 'row', gap: 8 }}>
  {['전자제품', '의류', '식품'].map(filter => (
    <Chip
      key={filter}
      color="brandDefault"
      selected={selected.includes(filter)}
      onPress={() => toggle(filter)}  // RN
      // onClick={() => toggle(filter)}  // Web
    >
      {filter}
    </Chip>
  ))}
</View>
```

### Removable Chips (Tags)
```tsx
const [tags, setTags] = useState(['React', 'TypeScript']);

const remove = (tag: string) => {
  setTags(prev => prev.filter(t => t !== tag));
};

<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  {tags.map(tag => (
    <Chip
      key={tag}
      onClose={() => remove(tag)}
    >
      {tag}
    </Chip>
  ))}
</View>
```

### With Avatar
```tsx
<Chip
    avatar={<Avatar src="user.jpg" size={24} />}
  onClose={() => {}}
>
  홍길동
</Chip>
```

### With Icon
```tsx
<Chip
    leftIcon={<Icon name="location" size={18} />}
  onPress={() => {}}
>
  위치 추가
</Chip>
```
