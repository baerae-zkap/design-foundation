# FilterButton

필터링 옵션을 선택하는 칩 스타일 버튼입니다. 선택 상태와 배지 카운트를 표시할 수 있습니다.

## 기본 사용

```tsx
import { FilterButton } from '@baerae-zkap/design-system/native';

<FilterButton
  label="카테고리"
  active={isActive}
  onPress={() => setActive(!isActive)}
/>
```

## Props

```typescript
interface FilterButtonProps {
  /** Button label */
  label: string;
  /** Active/selected state */
  active?: boolean;
  /** Badge count (number of active filters) */
  count?: number;
  /** Disabled */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Icon */
  icon?: ReactNode;
  /** Press handler */
  onPress: () => void;
  /** Custom style */
  style?: ViewStyle;
  /** Accessibility label */
  accessibilityLabel?: string;
}
```

## 크기 (size)

| Size | Height | Usage |
|------|--------|-------|
| `small` | 32px | 컴팩트한 필터 바 |
| `medium` | 36px | 기본 (권장) |
| `large` | 40px | 강조가 필요한 경우 |

```tsx
<FilterButton label="Small" size="small" onPress={() => {}} />
<FilterButton label="Medium" size="medium" onPress={() => {}} />
<FilterButton label="Large" size="large" onPress={() => {}} />
```

## 상태 (active)

### Default (active={false})
- 회색 outlined 스타일
- 배경: 흰색 (#ffffff)
- 테두리: 회색 (#cbd5e1)
- 텍스트: 다크 그레이 (#334155)

### Active (active={true})
- 브랜드 컬러 filled 스타일
- 배경: 브랜드 블루 (#2563eb)
- 테두리: 없음
- 텍스트: 흰색 (#ffffff)

```tsx
<FilterButton label="Default" active={false} onPress={() => {}} />
<FilterButton label="Active" active={true} onPress={() => {}} />
```

## 배지 카운트 (count)

활성 필터 개수를 우측 상단 배지로 표시합니다.

```tsx
<FilterButton label="카테고리" count={3} onPress={() => {}} />
<FilterButton label="브랜드" count={12} onPress={() => {}} />
<FilterButton label="많음" count={100} onPress={() => {}} /> // "99+" 표시
```

### 배지 스타일
- 위치: 버튼 우측 상단 (-6, -6)
- 배경: 에러 레드 (#dc2626)
- 텍스트: 흰색
- 최대: 99+ (100 이상 시)
- 테두리: 흰색 2px (대비 강화)

## 아이콘 (icon)

왼쪽에 아이콘을 추가할 수 있습니다.

```tsx
<FilterButton
  label="날짜"
  icon={<CalendarIcon />}
  onPress={() => {}}
/>
```

## 비활성화 (disabled)

```tsx
<FilterButton
  label="비활성화"
  disabled
  onPress={() => {}}
/>
```

## 실제 사용 예시

### 필터 바
```tsx
function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggle = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <FilterButton
        label="카테고리"
        active={activeFilters.includes('category')}
        count={3}
        onPress={() => toggle('category')}
      />
      <FilterButton
        label="가격"
        active={activeFilters.includes('price')}
        count={1}
        onPress={() => toggle('price')}
      />
      <FilterButton
        label="브랜드"
        active={activeFilters.includes('brand')}
        onPress={() => toggle('brand')}
      />
    </View>
  );
}
```

### 탭 스타일 필터
```tsx
function TabFilter() {
  const [tab, setTab] = useState('all');

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <FilterButton
        label="전체"
        active={tab === 'all'}
        count={24}
        onPress={() => setTab('all')}
      />
      <FilterButton
        label="진행중"
        active={tab === 'inProgress'}
        count={8}
        onPress={() => setTab('inProgress')}
      />
      <FilterButton
        label="완료"
        active={tab === 'completed'}
        count={12}
        onPress={() => setTab('completed')}
      />
    </View>
  );
}
```

## Foundation Tokens 사용

모든 스타일은 Foundation 토큰 기반입니다:

### Border Radius
- `radius.component.button.sm` (8px)

### Spacing
- `spacing.semantic.inset.xs` (12px) - small
- `spacing.semantic.inset.sm` (16px) - medium
- `spacing.semantic.inset.md` (20px) - large
- `spacing.primitive[2]` (8px) - icon gap
- `spacing.primitive[1]` (4px) - badge padding

### Colors
- Active background: `#2563eb` (surface.brand.default)
- Active pressed: `#1d4ed8` (surface.brand.defaultPressed)
- Default background: `#ffffff` (surface.base.default)
- Default border: `#cbd5e1` (border.base.default)
- Badge background: `#dc2626` (surface.error.strong)

## 접근성

- `accessibilityRole="button"` 자동 설정
- `accessibilityState={{ selected, disabled }}` 자동 설정
- `accessibilityLabel` 자동 생성: "{label} (n개 선택됨)"

## 디자인 레퍼런스

[Montage Filter Button](https://montage.wanted.co.kr/docs/components/selection-and-input/filter-button/design)

## 관련 컴포넌트

- **Chip**: 입력/태그/속성 표시용 칩
- **Button**: 일반 액션 버튼
- **TextButton**: 텍스트 스타일 버튼
