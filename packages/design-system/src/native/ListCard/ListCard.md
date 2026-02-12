# ListCard Component

> 리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.

## Quick Reference

```tsx
// Web
import { ListCard } from '@baerae-zkap/design-system';
<ListCard
  thumbnail={<img src="product.jpg" />}
  title="상품명"
  subtitle="상품 설명"
  meta="₩59,000"
  onClick={() => {}}
/>

// React Native
import { ListCard } from '@baerae-zkap/design-system/native';
<ListCard
  thumbnail={<Image source={{ uri: 'product.jpg' }} />}
  title="상품명"
  subtitle="상품 설명"
  meta="₩59,000"
  onPress={() => {}}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"elevated"` \| `"outlined"` \| `"filled"` | `"elevated"` | | 카드 스타일 |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 크기 |
| `thumbnail` | `ReactNode` | - | | 좌측 썸네일 영역 |
| `title` | `ReactNode` | - | ✅ | 메인 타이틀 |
| `subtitle` | `ReactNode` | - | | 서브타이틀 |
| `meta` | `ReactNode` | - | | 메타 정보 (가격, 날짜) |
| `badges` | `ReactNode` | - | | 상단 뱃지 영역 |
| `action` | `ReactNode` | - | | 우측 액션 영역 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `() => void` | 탭 핸들러 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Border Radius | `radius.semantic.card.sm` | 12px |
| Thumbnail Radius | `radius.primitive.sm` | 8px |
| Padding (small) | `spacing.primitive.3` | 12px |
| Padding (medium/large) | `spacing.primitive.4` | 16px |
| Thumbnail (small) | - | 56px |
| Thumbnail (medium) | - | 80px |
| Thumbnail (large) | - | 100px |
| Gap (small/medium) | `spacing.primitive.3` | 12px |
| Gap (large) | `spacing.primitive.4` | 16px |
| Content Gap | `spacing.primitive.1` | 4px |

## Variant Styles

| Variant | 특징 | 사용 상황 |
|---------|------|----------|
| `elevated` | 그림자 효과 | 카드가 강조되어야 할 때 |
| `outlined` | 테두리 | 배경과 구분이 필요할 때 |
| `filled` | 배경색 | 부드러운 구분이 필요할 때 |

## Usage Rules

### 1. 썸네일 규격
| Size | 썸네일 크기 | 용도 |
|------|------------|------|
| small | 56px | 압축된 목록 |
| medium | 80px | 기본 상품 목록 |
| large | 100px | 강조 상품 카드 |

### 2. Badge 사용
```tsx
<ListCard
  badges={
    <>
      <ContentBadge color="brandDefault" size="small">NEW</ContentBadge>
      <ContentBadge color="errorDefault" size="small">HOT</ContentBadge>
    </>
  }
  thumbnail={...}
  title="상품명"
  meta="₩59,000"
/>
```

### 3. Action 영역
| 컨텐츠 | 용도 |
|--------|------|
| IconButton | 즐겨찾기, 더보기 |
| Button | 바로구매, 장바구니 |
| Text | 수량, 상태 |

## Accessibility

1. **Interactive Card**: onClick/onPress 있으면 `role="button"` 설정
2. **Image Alt**: 썸네일 이미지에 적절한 alt 텍스트 제공
3. **Title Hierarchy**: title은 주요 정보로 스크린 리더에서 먼저 읽힘

## Code Examples

### Product List
```tsx
{products.map((product) => (
  <ListCard
    key={product.id}
    thumbnail={<Image source={{ uri: product.image }} style={{ width: '100%', height: '100%' }} />}
    badges={product.isNew && <ContentBadge color="brandDefault" size="small">NEW</ContentBadge>}
    title={product.name}
    subtitle={product.description}
    meta={`₩${product.price.toLocaleString()}`}
    onPress={() => navigate('product', { id: product.id })}
  />
))}
```

### Article List
```tsx
<ListCard
  variant="outlined"
  size="small"
  thumbnail={<Image source={{ uri: article.thumbnail }} />}
  title={article.title}
  subtitle={article.author}
  meta={formatDate(article.createdAt)}
  onPress={() => openArticle(article.id)}
/>
```

### With Action Button
```tsx
<ListCard
  thumbnail={<Image source={{ uri: product.image }} />}
  title={product.name}
  meta={`₩${product.price}`}
  action={
    <IconButton
      icon={<HeartIcon />}
      variant="ghost"
      onPress={() => toggleFavorite(product.id)}
    />
  }
  onPress={() => navigate('product', { id: product.id })}
/>
```
