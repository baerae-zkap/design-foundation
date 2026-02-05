# Card Component

> 콘텐츠를 담는 카드 컨테이너입니다.

## Quick Reference

```tsx
// Web
import { Card } from '@baerae-zkap/design-system';
<Card
  variant="elevated"
  padding="medium"
  onClick={() => {}}
>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

// React Native
import { Card } from '@baerae-zkap/design-system/native';
<Card
  variant="elevated"
  padding="medium"
  onPress={() => {}}
>
  <Text>Card Title</Text>
  <Text>Card content...</Text>
</Card>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"elevated"` \| `"outlined"` \| `"filled"` | `"elevated"` | | 스타일 변형 |
| `padding` | `"none"` \| `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 내부 패딩 크기 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `children` | `ReactNode` | - | ✅ | 카드 콘텐츠 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 (클릭 가능한 카드) |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(event) => void` | 탭 핸들러 (클릭 가능한 카드) |
| `onLongPress` | `(event) => void` | 길게 누르기 핸들러 |

## Variants

| Variant | 용도 | 특징 |
|---------|------|------|
| `elevated` | 기본, 강조 콘텐츠 | 그림자로 떠있는 느낌 |
| `outlined` | 그룹화, 구분 | 테두리로 경계 표시 |
| `filled` | 보조 콘텐츠 | 채워진 배경 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Border Radius | `card.sm` | 12px |
| Padding (none) | - | 0px |
| Padding (small) | - | 12px |
| Padding (medium) | `inset.sm` | 16px |
| Padding (large) | `inset.lg` | 24px |

## Variant Values

### Elevated Variant
| Property | Value |
|----------|-------|
| Background | `white` (#ffffff) |
| Background (Pressed) | `#f8fafc` |
| Shadow | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` |

### Outlined Variant
| Property | Value |
|----------|-------|
| Background | `white` (#ffffff) |
| Background (Pressed) | `#f8fafc` |
| Border | `1px solid #e2e8f0` |

### Filled Variant
| Property | Value |
|----------|-------|
| Background | `#f8fafc` |
| Background (Pressed) | `#e2e8f0` |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Hover | 마우스 오버 (클릭 가능한 카드만) | - |
| Pressed | 누르고 있는 상태 (클릭 가능한 카드만) | 배경 어두워짐 |
| Disabled | 비활성화 | opacity: 0.5 |

## Usage Guidelines

### 사용 시기
- 관련된 정보를 그룹화할 때
- 콘텐츠를 명확하게 구분해야 할 때
- 클릭 가능한 콘텐츠 블록을 표시할 때 (onClick/onPress 제공 시)

### Variant 선택 기준
| 상황 | Variant | 예시 |
|------|---------|------|
| 주요 콘텐츠 강조 | `elevated` | 프로필 카드, 주요 정보 |
| 리스트 아이템 | `outlined` | 설정 그룹, 옵션 목록 |
| 보조 정보 | `filled` | 힌트, 배경 정보 |

### Padding 선택 기준
| 상황 | Padding | 예시 |
|------|---------|------|
| 이미지/풀블리드 | `none` | 썸네일 카드 |
| 작은 콘텐츠 | `small` | 태그, 뱃지 |
| 일반 콘텐츠 | `medium` | 기본 카드 |
| 큰 콘텐츠 | `large` | 폼, 상세 정보 |

## Accessibility

1. **Interactive Cards**: onClick/onPress가 있는 카드는 자동으로 cursor: pointer 적용
2. **Disabled State**: disabled 상태에서 클릭 이벤트 차단
3. **Semantic HTML**: 필요시 `<article>` 또는 `<section>` 태그와 함께 사용 권장
4. **Touch Target**: 클릭 가능한 카드는 충분한 크기 확보 (최소 44x44px 권장)

## Do & Don't

### ✅ Do
- 관련된 콘텐츠를 함께 그룹화
- 적절한 패딩으로 가독성 확보
- 클릭 가능한 카드에만 onClick/onPress 제공
- 일관된 variant 사용

### ❌ Don't
- 너무 많은 중첩 카드 사용 금지
- 클릭할 수 없는데 클릭 가능해 보이는 스타일 사용 금지
- 너무 작은 패딩으로 답답한 느낌 주지 않기
- 한 화면에 너무 많은 elevated 카드 사용 금지 (그림자 남용)

## Code Examples

### Basic Usage (Non-clickable)
```tsx
<Card variant="elevated" padding="medium">
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
    Card Title
  </Text>
  <Text style={{ color: '#64748b' }}>
    Card description text goes here.
  </Text>
</Card>
```

### Clickable Card
```tsx
<Card
  variant="elevated"
  padding="medium"
  onPress={() => console.log('Card pressed')}
>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
    Tap me
  </Text>
</Card>
```

### Variants
```tsx
<View style={{ gap: 16 }}>
  <Card variant="elevated" padding="medium">
    <Text>Elevated Card</Text>
  </Card>
  <Card variant="outlined" padding="medium">
    <Text>Outlined Card</Text>
  </Card>
  <Card variant="filled" padding="medium">
    <Text>Filled Card</Text>
  </Card>
</View>
```

### Padding Sizes
```tsx
<View style={{ gap: 16 }}>
  <Card variant="elevated" padding="none">
    <View style={{ padding: 16 }}>
      <Text>No padding (custom padding applied)</Text>
    </View>
  </Card>
  <Card variant="elevated" padding="small">
    <Text>Small padding</Text>
  </Card>
  <Card variant="elevated" padding="medium">
    <Text>Medium padding (default)</Text>
  </Card>
  <Card variant="elevated" padding="large">
    <Text>Large padding</Text>
  </Card>
</View>
```

### With Image (Full-bleed)
```tsx
<Card variant="elevated" padding="none">
  <Image
    source={{ uri: 'https://example.com/image.jpg' }}
    style={{ width: '100%', height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
  />
  <View style={{ padding: 16 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Image Card</Text>
    <Text style={{ color: '#64748b' }}>Description text</Text>
  </View>
</Card>
```

### Disabled State
```tsx
<Card
  variant="elevated"
  padding="medium"
  onPress={() => {}}
  disabled
>
  <Text>Disabled Card</Text>
</Card>
```
