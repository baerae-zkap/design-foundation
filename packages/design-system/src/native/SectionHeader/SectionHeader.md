# SectionHeader Component

> 리스트 섹션 상단에 사용되는 간단한 타이틀 컴포넌트입니다.

## Quick Reference

```tsx
// Web
import { SectionHeader } from '@baerae-zkap/design-system';
<SectionHeader title="내 자산" />

// React Native
import { SectionHeader } from '@baerae-zkap/design-system/native';
<SectionHeader title="내 자산" />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | ✅ | 섹션 타이틀 |
| `action` | `ReactNode` | - | | 우측 액션 영역 (버튼, 링크 등) |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 타이틀 크기 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Padding X | `spacing.primitive.4` | 16px |
| Padding Top | `spacing.primitive.4` | 16px |
| Padding Bottom | `spacing.primitive.2` | 8px |
| Font Size (small) | - | 13px |
| Font Size (medium) | - | 14px |
| Font Size (large) | - | 15px |
| Font Weight | - | 600 |
| Text Color | `content.base.tertiary` | #94a3b8 |

## Usage Rules

### 1. 섹션 구분
| 용도 | 예시 |
|------|------|
| 자산 카테고리 | "내 자산", "최근 거래" |
| 설정 그룹 | "계정", "보안", "알림" |
| 콘텐츠 분류 | "인기", "추천", "최신" |

### 2. Action 버튼
```tsx
// ✅ 우측에 작은 TextButton 사용
<SectionHeader
  title="최근 거래"
  action={
    <TextButton size="small" color="brandDefault" onPress={() => {}}>
      전체보기
    </TextButton>
  }
/>

// ❌ 큰 버튼 사용하지 않기
<SectionHeader
  title="최근 거래"
  action={<Button size="large">전체보기</Button>}
/>
```

### 3. 리스트와 조합
```tsx
// ✅ SectionHeader + ListCell 조합
<View style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden' }}>
  <SectionHeader title="설정" />
  <ListCell title="알림 설정" trailing={<ChevronRight />} divider />
  <ListCell title="보안" trailing={<ChevronRight />} divider />
  <ListCell title="계정 정보" trailing={<ChevronRight />} />
</View>
```

## Accessibility

1. **Semantic HTML**: Web에서는 heading 태그 고려 (필요시 래핑)
2. **Color Contrast**: 배경색과 충분한 대비 (최소 4.5:1)
3. **Text Transform**: uppercase 사용으로 가독성 주의

## Code Examples

### Basic Usage
```tsx
<SectionHeader title="내 자산" />
```

### With Action Button
```tsx
<SectionHeader
  title="최근 거래"
  action={
    <TextButton size="small" color="brandDefault" onPress={() => navigate('/transactions')}>
      전체보기
    </TextButton>
  }
/>
```

### Multiple Sections
```tsx
<View style={{ gap: 20 }}>
  {/* 자산 섹션 */}
  <View style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden' }}>
    <SectionHeader title="내 자산" />
    <ListCell
      leading={<CryptoIcon symbol="ETH" />}
      title="Ethereum"
      subtitle="0.7812 ETH"
      trailing={<Text>₩3,245,000</Text>}
      divider
    />
    <ListCell
      leading={<CryptoIcon symbol="BTC" />}
      title="Bitcoin"
      subtitle="0.0234 BTC"
      trailing={<Text>₩2,890,000</Text>}
    />
  </View>

  {/* 설정 섹션 */}
  <View style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden' }}>
    <SectionHeader title="설정" />
    <ListCell title="알림 설정" trailing={<ChevronRight />} divider />
    <ListCell title="보안" trailing={<ChevronRight />} divider />
    <ListCell title="계정 정보" trailing={<ChevronRight />} />
  </View>
</View>
```

### Size Variants
```tsx
<SectionHeader size="small" title="소형 섹션" />
<SectionHeader size="medium" title="중형 섹션" />
<SectionHeader size="large" title="대형 섹션" />
```

## Best Practices

1. **간결한 타이틀**: 2-3단어로 명확하게 표현
2. **일관된 대소문자**: uppercase 변환되므로 한글/영문 모두 동일하게 입력
3. **Action 최소화**: 우측 액션은 1개만 사용 권장
4. **여백 유지**: SectionHeader 위에 적절한 margin 추가 (섹션 간 구분)
