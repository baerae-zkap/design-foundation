# Segmented Control

여러 옵션 중 하나를 선택하는 컴포넌트입니다. 탭과 유사하지만 더 컴팩트하고 선택 가능한 버튼 그룹으로 표시됩니다.

## Import

```typescript
import { SegmentedControl } from '@baerae-zkap/design-system/native';
import type { SegmentedControlProps, SegmentItem } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
const [selectedIndex, setSelectedIndex] = useState(0);

<SegmentedControl
  segments={[
    { label: '옵션 1', value: '1' },
    { label: '옵션 2', value: '2' },
    { label: '옵션 3', value: '3' },
  ]}
  selectedIndex={selectedIndex}
  onChange={setSelectedIndex}
/>
```

## Props

### SegmentedControlProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `segments` | `SegmentItem[]` | ✅ | - | 세그먼트 배열 |
| `selectedIndex` | `number` | ✅ | - | 선택된 세그먼트 인덱스 |
| `onChange` | `(index: number) => void` | ✅ | - | 선택 변경 핸들러 |
| `disabled` | `boolean` | ❌ | `false` | 전체 비활성화 여부 |
| `size` | `'small' \| 'medium' \| 'large'` | ❌ | `'medium'` | 크기 |
| `fullWidth` | `boolean` | ❌ | `false` | 전체 너비 사용 여부 |
| `testID` | `string` | ❌ | - | 테스트 ID |
| `accessibilityLabel` | `string` | ❌ | - | 접근성 라벨 |
| `style` | `ViewStyle` | ❌ | - | 커스텀 스타일 |

### SegmentItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | 세그먼트 라벨 |
| `value` | `string` | ✅ | 세그먼트 값 |
| `icon` | `ReactNode` | ❌ | 좌측 아이콘 |
| `disabled` | `boolean` | ❌ | 개별 세그먼트 비활성화 |

## Sizes

```tsx
// Small (32px)
<SegmentedControl
  size="small"
  segments={segments}
  selectedIndex={0}
  onChange={() => {}}
/>

// Medium (36px) - Default
<SegmentedControl
  size="medium"
  segments={segments}
  selectedIndex={0}
  onChange={() => {}}
/>

// Large (44px)
<SegmentedControl
  size="large"
  segments={segments}
  selectedIndex={0}
  onChange={() => {}}
/>
```

## Full Width

```tsx
<SegmentedControl
  fullWidth
  segments={[
    { label: '일', value: 'day' },
    { label: '주', value: 'week' },
    { label: '월', value: 'month' },
    { label: '년', value: 'year' },
  ]}
  selectedIndex={0}
  onChange={() => {}}
/>
```

## States

### Normal
```tsx
<SegmentedControl
  segments={segments}
  selectedIndex={0}
  onChange={() => {}}
/>
```

### Segment Disabled
```tsx
<SegmentedControl
  segments={[
    { label: '옵션 1', value: '1' },
    { label: '옵션 2', value: '2', disabled: true },
    { label: '옵션 3', value: '3' },
  ]}
  selectedIndex={0}
  onChange={() => {}}
/>
```

### All Disabled
```tsx
<SegmentedControl
  disabled
  segments={segments}
  selectedIndex={0}
  onChange={() => {}}
/>
```

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Container borderRadius | `radius.primitive.sm` | 8px |
| Container padding | - | 2px |
| Container backgroundColor | `colors.surface.base.container` | #eaebed (palette.grey.97) |
| Segment borderRadius | - | 6px (container radius - gap) |
| Selected backgroundColor | `colors.surface.brand.default` | #0066ff (palette.blue.50) |
| Icon-text gap | `spacing.primitive.2` | 8px |
| **Small** | | |
| - height | - | 32px |
| - fontSize | - | 13px |
| - paddingHorizontal | `spacing.semantic.inset.xs` | 12px |
| **Medium** | | |
| - height | - | 36px |
| - fontSize | - | 14px |
| - paddingHorizontal | `spacing.semantic.inset.sm` | 16px |
| **Large** | | |
| - height | - | 44px |
| - fontSize | - | 15px |
| - paddingHorizontal | `spacing.semantic.inset.md` | 20px |

## Usage Guidelines

### When to Use
- 2-5개의 상호 배타적인 옵션을 선택할 때
- 페이지 전환 없이 뷰를 변경할 때 (예: 일/주/월 차트)
- 필터나 정렬 옵션을 제공할 때

### When Not to Use
- 6개 이상의 옵션이 있을 때 → Select 또는 Radio 사용
- 다중 선택이 필요할 때 → Checkbox 사용
- 페이지 간 네비게이션이 필요할 때 → Tab 사용

### Best Practices
1. **짧은 라벨 사용**: 각 세그먼트는 1-2단어가 이상적
2. **동일한 너비 고려**: `fullWidth` 사용 시 모든 세그먼트가 동일한 너비를 가짐
3. **논리적 순서**: 시간순, 중요도순 등 의미 있는 순서로 배치
4. **적절한 개수**: 2-5개의 옵션이 가장 효과적

## Accessibility

- `accessibilityRole="tablist"` (컨테이너)
- `accessibilityRole="tab"` (각 세그먼트)
- `accessibilityState={{ selected, disabled }}` 지원
- `accessibilityLabel`로 각 세그먼트 설명 제공
- 키보드 네비게이션 지원 (웹 환경)

## Examples

### 기간 선택
```tsx
const [timeRange, setTimeRange] = useState(0);

<SegmentedControl
  fullWidth
  segments={[
    { label: '일간', value: 'day' },
    { label: '주간', value: 'week' },
    { label: '월간', value: 'month' },
    { label: '연간', value: 'year' },
  ]}
  selectedIndex={timeRange}
  onChange={setTimeRange}
/>
```

### 뷰 모드 전환
```tsx
const [viewMode, setViewMode] = useState(0);

<SegmentedControl
  segments={[
    { label: '리스트', value: 'list' },
    { label: '그리드', value: 'grid' },
    { label: '차트', value: 'chart' },
  ]}
  selectedIndex={viewMode}
  onChange={setViewMode}
/>
```

### 정렬 옵션
```tsx
const [sortOrder, setSortOrder] = useState(0);

<SegmentedControl
  size="small"
  segments={[
    { label: '최신순', value: 'recent' },
    { label: '인기순', value: 'popular' },
    { label: '가격순', value: 'price' },
  ]}
  selectedIndex={sortOrder}
  onChange={setSortOrder}
/>
```

## Related Components

- **Tab**: 페이지 간 네비게이션이 필요할 때
- **Radio**: 더 많은 옵션이 있고 수직 레이아웃이 필요할 때
- **Select**: 5개 이상의 옵션을 선택할 때
- **Filter Button**: 여러 필터를 동시에 적용할 때
