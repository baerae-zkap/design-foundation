# ContentBadge Component

> 콘텐츠의 상태, 카테고리, 라벨을 표시하는 비인터랙티브 요소입니다.

## Quick Reference

```tsx
// Web
import { ContentBadge } from '@baerae-zkap/design-system';
<ContentBadge color="brandDefault">NEW</ContentBadge>
<ContentBadge color="errorDefault" variant="outlined">품절</ContentBadge>
<ContentBadge color="successDefault" dot>진행중</ContentBadge>

// React Native
import { ContentBadge } from '@baerae-zkap/design-system/native';
<ContentBadge color="brandDefault">NEW</ContentBadge>
<ContentBadge color="errorDefault" variant="outlined">품절</ContentBadge>
<ContentBadge color="successDefault" dot>진행중</ContentBadge>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"filled"` \| `"outlined"` \| `"subtle"` | `"filled"` | | 스타일 변형 |
| `color` | `"brandDefault"` \| `"baseDefault"` \| `"successDefault"` \| `"errorDefault"` \| `"warningDefault"` \| `"infoDefault"` | `"baseDefault"` | | 색상 테마 |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 크기 |
| `dot` | `boolean` | `false` | | 상태 점 표시 |
| `leftIcon` | `ReactNode` | - | | 좌측 아이콘 (dot과 배타적) |
| `children` | `ReactNode` | - | | Badge 텍스트 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `style` | `CSSProperties` | 커스텀 스타일 |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `style` | `ViewStyle` | 커스텀 스타일 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Height (small) | - | 18px |
| Height (medium) | - | 22px |
| Height (large) | - | 26px |
| Padding X (small) | `spacing.primitive.1.5` | 6px |
| Padding X (medium) | `spacing.primitive.2` | 8px |
| Padding X (large) | `spacing.primitive.2.5` | 10px |
| Border Radius | `radius.primitive.xs` | 4px |
| Gap (dot/icon-text) | `spacing.primitive.1` | 4px |
| Font Weight | - | 600 |
| Dot Size (small) | - | 4px |
| Dot Size (medium/large) | - | 6px |

## Color Values

### Filled Variant
| Color | Background | Text |
|-------|------------|------|
| `brandDefault` | `#2563eb` (palette.blue.50) | `#ffffff` |
| `baseDefault` | `#64748b` (palette.grey.50) | `#ffffff` |
| `successDefault` | `#16a34a` (palette.green.45) | `#ffffff` |
| `errorDefault` | `#dc2626` (palette.red.45) | `#ffffff` |
| `warningDefault` | `#d97706` (palette.orange.45) | `#ffffff` |
| `infoDefault` | `#0891b2` (palette.cyan.45) | `#ffffff` |

### Outlined Variant
| Color | Background | Border | Text |
|-------|------------|--------|------|
| `brandDefault` | transparent | `#2563eb` | `#2563eb` |
| `baseDefault` | transparent | `#94a3b8` | `#475569` |
| `successDefault` | transparent | `#22c55e` | `#16a34a` |
| `errorDefault` | transparent | `#ef4444` | `#dc2626` |
| `warningDefault` | transparent | `#f59e0b` | `#d97706` |
| `infoDefault` | transparent | `#06b6d4` | `#0891b2` |

### Subtle Variant
| Color | Background | Text |
|-------|------------|------|
| `brandDefault` | `#dbeafe` (palette.blue.95) | `#1e40af` (palette.blue.40) |
| `baseDefault` | `#f1f5f9` (palette.grey.97) | `#334155` (palette.grey.30) |
| `successDefault` | `#dcfce7` (palette.green.95) | `#166534` (palette.green.30) |
| `errorDefault` | `#fee2e2` (palette.red.95) | `#991b1b` (palette.red.30) |
| `warningDefault` | `#fef3c7` (palette.orange.95) | `#92400e` (palette.orange.30) |
| `infoDefault` | `#cffafe` (palette.cyan.95) | `#155e75` (palette.cyan.30) |

## ContentBadge vs Chip

| Feature | ContentBadge | Chip |
|---------|--------------|------|
| 인터랙션 | 없음 (정보 표시용) | 클릭/탭 가능 |
| 요소 | `<span>` / `<View>` | `<button>` / `<Pressable>` |
| 선택 상태 | 없음 | `selected` prop |
| 닫기 버튼 | 없음 | `onClose` prop |
| 사용 목적 | 라벨, 상태 표시, 카테고리 | 필터, 태그 입력, 선택 |
| 형태 | 직사각형 (4px radius) | 필 형태 (height/2 radius) |

## Usage Rules

### 1. 색상 선택 기준
| 상황 | 권장 색상 | 예시 |
|------|----------|------|
| 새 콘텐츠/프로모션 | `brandDefault` | NEW, 추천 |
| 일반 정보/카테고리 | `baseDefault` | 공지, 일반 |
| 성공/완료/진행중 | `successDefault` | 완료, 진행중, 판매중 |
| 오류/경고/품절 | `errorDefault` | 품절, 판매종료 |
| 주의/알림 | `warningDefault` | 주의, 곧 종료 |
| 정보/안내 | `infoDefault` | 안내, 팁 |

### 2. Variant 선택 기준
| Variant | 사용 상황 |
|---------|----------|
| `filled` | 강조가 필요한 상태 (NEW, 품절) |
| `outlined` | 카테고리, 태그 구분 |
| `subtle` | 보조적 정보, 배경과 조화 |

### 3. Dot 사용 규칙
```tsx
// ✅ 실시간 상태 표시
<ContentBadge color="successDefault" dot>온라인</ContentBadge>
<ContentBadge color="errorDefault" dot>오프라인</ContentBadge>

// ✅ 진행 상태
<ContentBadge color="brandDefault" dot>진행중</ContentBadge>
```

## Accessibility

1. **Non-interactive**: 인터랙션이 없으므로 버튼 역할 불필요
2. **Color Contrast**: 모든 색상 조합이 WCAG AA 기준 충족
3. **Semantic**: 보조 정보로 `aria-label`이나 시각적 컨텍스트와 함께 사용

## Do & Don't

### ✅ Do
- 상태나 카테고리를 명확하게 표시
- 짧은 텍스트 사용 (1-2 단어)
- 한 영역에 동일한 variant 사용
- dot은 실시간/상태 표시에만 사용

### ❌ Don't
- 클릭 가능한 요소로 사용 금지 (Chip 사용)
- 긴 텍스트 넣지 않기
- 같은 영역에 여러 색상/variant 혼용 금지
- dot과 leftIcon 동시 사용 금지

## Code Examples

### Status Indicators
```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <ContentBadge color="successDefault" dot>판매중</ContentBadge>
  <ContentBadge color="errorDefault" dot>품절</ContentBadge>
  <ContentBadge color="warningDefault" dot>곧 종료</ContentBadge>
</View>
```

### Category Labels
```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  <ContentBadge variant="subtle" color="brandDefault">전자제품</ContentBadge>
  <ContentBadge variant="subtle" color="baseDefault">생활용품</ContentBadge>
</View>
```

### Promotional Badges
```tsx
<ContentBadge color="brandDefault">NEW</ContentBadge>
<ContentBadge color="errorDefault">HOT</ContentBadge>
<ContentBadge color="successDefault">BEST</ContentBadge>
```

### With Icon
```tsx
<ContentBadge
  color="infoDefault"
  leftIcon={<Icon name="info" size={12} />}
>
  안내
</ContentBadge>
```
