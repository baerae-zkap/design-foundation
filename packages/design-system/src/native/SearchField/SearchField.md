# SearchField Component

검색 입력을 위한 필 형태(pill-shaped) 입력 필드 컴포넌트입니다.

## Overview

SearchField는 사용자가 검색어를 입력할 수 있는 특수화된 입력 필드입니다. 왼쪽에 검색 아이콘, 오른쪽에 선택적 클리어 버튼이 있으며, 완전히 둥근(pill-shaped) 디자인이 특징입니다.

## Features

- **Pill-shaped Design**: 완전히 둥근 border-radius로 검색 필드임을 명확히 표현
- **Search Icon**: 왼쪽에 고정된 검색 아이콘 (20px)
- **Clear Button**: 텍스트 입력 시 자동으로 나타나는 클리어 버튼
- **Search Handler**: Enter 키 또는 검색 버튼으로 검색 실행
- **Size Variants**: small (36px), medium (40px), large (44px)
- **Focus State**: 포커스 시 브랜드 컬러 테두리

## Import

```typescript
// React Native
import { SearchField } from '@baerae-zkap/design-system/native';
import type { SearchFieldProps, SearchFieldSize } from '@baerae-zkap/design-system/native';
```

## Props

```typescript
export interface SearchFieldProps extends Omit<TextInputProps, 'style'> {
  /** 검색 값 */
  value: string;
  /** 변경 핸들러 */
  onChangeText: (text: string) => void;
  /** 검색 제출 핸들러 (엔터키 또는 검색 아이콘 클릭 시) */
  onSearch?: (text: string) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 클리어 버튼 표시 */
  showClearButton?: boolean;
  /** 클리어 핸들러 */
  onClear?: () => void;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: SearchFieldSize;
  /** 자동 포커스 */
  autoFocus?: boolean;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

export type SearchFieldSize = 'small' | 'medium' | 'large';
```

## Usage

### Basic Usage

```tsx
import { SearchField } from '@baerae-zkap/design-system/native';

function MyComponent() {
  const [query, setQuery] = useState('');

  return (
    <SearchField
      value={query}
      onChangeText={setQuery}
      placeholder="검색어를 입력하세요"
      size="medium"
    />
  );
}
```

### With Search Handler

```tsx
function SearchExample() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchText: string) => {
    console.log('Searching for:', searchText);
    // API 호출 등
  };

  return (
    <SearchField
      value={query}
      onChangeText={setQuery}
      onSearch={handleSearch}
      placeholder="상품 검색"
    />
  );
}
```

### With Clear Handler

```tsx
function ClearExample() {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    console.log('Search cleared');
    // 검색 결과 초기화 등
  };

  return (
    <SearchField
      value={query}
      onChangeText={setQuery}
      onClear={handleClear}
      showClearButton={true}
      placeholder="검색"
    />
  );
}
```

### Different Sizes

```tsx
// Small (36px)
<SearchField
  size="small"
  value={query}
  onChangeText={setQuery}
  placeholder="Small search"
/>

// Medium (40px) - Default
<SearchField
  size="medium"
  value={query}
  onChangeText={setQuery}
  placeholder="Medium search"
/>

// Large (44px)
<SearchField
  size="large"
  value={query}
  onChangeText={setQuery}
  placeholder="Large search"
/>
```

### Auto Focus

```tsx
<SearchField
  value={query}
  onChangeText={setQuery}
  placeholder="검색"
  autoFocus={true}
/>
```

### Disabled State

```tsx
<SearchField
  value={query}
  onChangeText={setQuery}
  placeholder="검색 불가"
  disabled={true}
/>
```

## Design Tokens

### Spacing Tokens

| Property | Token | Value | Usage |
|----------|-------|-------|-------|
| `paddingHorizontal` | `spacing.semantic.inset.sm` | 16px | 좌우 내부 패딩 |
| `gap` (icon-input) | `spacing.semantic.horizontal.2xs` | 8px | 아이콘과 입력 필드 간격 |

### Radius Tokens

| Property | Token | Value | Usage |
|----------|-------|-------|-------|
| `borderRadius` | `radius.semantic.input.search` | 9999px | Pill-shaped 디자인 |

### Size Configuration

| Size | Height | Font Size | Icon Size |
|------|--------|-----------|-----------|
| `small` | 36px | 14px | 20px |
| `medium` | 40px | 14px | 20px |
| `large` | 44px | 16px | 20px |

### Colors

| State | Property | Color | Hex |
|-------|----------|-------|-----|
| Default | Background | `surface.base.alternative` | #f1f5f9 |
| Default | Border | Transparent | - |
| Default | Text | `content.base.default` | #334155 |
| Default | Icon | `content.base.secondary` | #64748b |
| Default | Placeholder | `content.base.placeholder` | #94a3b8 |
| Focused | Border | `border.brand.default` | #2563eb |
| Disabled | Background | `surface.disabled.secondary` | #f8fafc |
| Disabled | Border | `border.disabled.default` | #e2e8f0 |
| Disabled | Text | `content.disabled.default` | #94a3b8 |
| Clear Button | Background | `palette.grey.90` | #cbd5e1 |
| Clear Button | Icon | `content.base.secondary` | #64748b |

## States

### Default
- 회색 배경 (#f1f5f9)
- 테두리 없음 (transparent)
- 검색 아이콘 표시

### Focused
- 브랜드 컬러 테두리 (#2563eb)
- 배경색 유지

### With Value
- 클리어 버튼 자동 표시 (showClearButton=true)
- 텍스트 입력 시 즉시 나타남

### Disabled
- 비활성화 배경색 (#f8fafc)
- 회색 테두리 (#e2e8f0)
- 클리어 버튼 숨김
- 입력 불가

## Behavior

### Search Submission
- Enter 키 누르면 `onSearch` 호출
- `returnKeyType="search"` 키보드 표시

### Clear Button
- `value.length > 0` 일 때만 표시
- disabled 상태에서는 숨김
- 클릭 시 `onChangeText('')` 호출 후 `onClear` 콜백 실행

### Icons
- **Search Icon**: 왼쪽 고정, 항상 표시
- **Clear Icon**: 오른쪽, 조건부 표시

## Accessibility

- `accessibilityLabel`: 컴포넌트 용도 설명
- Clear button: `accessibilityRole="button"`, `accessibilityLabel="검색어 지우기"`
- 키보드 네비게이션 지원
- 충분한 터치 영역 (`hitSlop={8}`)

## Best Practices

### When to Use
✅ 리스트나 그리드에서 항목 필터링
✅ 전역 검색 기능
✅ 카테고리 내 검색
✅ 자동완성 입력

### When Not to Use
❌ 일반 텍스트 입력이 필요한 경우 → TextField 사용
❌ 복잡한 필터링 UI → Filter 컴포넌트 조합 사용

### Design Guidelines

1. **Placement**: 화면 상단이나 리스트 위에 배치
2. **Width**: 일반적으로 full-width 또는 최소 280px 이상
3. **Placeholder**: 검색 대상을 명확히 표현 ("상품 검색", "사용자 검색")
4. **Feedback**: 검색 결과는 즉시 표시하거나 로딩 인디케이터 사용

## Examples

### Search with Results

```tsx
function SearchWithResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (searchText: string) => {
    const data = await fetchResults(searchText);
    setResults(data);
  };

  return (
    <View>
      <SearchField
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
        placeholder="검색어를 입력하세요"
      />
      <ResultsList results={results} />
    </View>
  );
}
```

### Real-time Search

```tsx
function RealtimeSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <SearchField
      value={query}
      onChangeText={setQuery}
      placeholder="실시간 검색"
    />
  );
}
```

## Related Components

- **TextField**: 일반 텍스트 입력
- **TextArea**: 여러 줄 텍스트 입력
- **Select**: 드롭다운 선택

## References

- Montage Design System: [Search field](https://montage.wanted.co.kr/docs/components/selection-and-input/search-field)
- Foundation Tokens: `public/spacing-tokens.json`, `public/radius-tokens.json`
