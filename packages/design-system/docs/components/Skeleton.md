# Skeleton

콘텐츠 로딩 중 레이아웃 시프트를 방지하는 플레이스홀더 컴포넌트입니다.

## 특징

- **레이아웃 안정성**: 콘텐츠 로딩 중 레이아웃 시프트 방지
- **3가지 Variant**: text (텍스트 줄), rectangle (이미지/카드), circle (아바타/아이콘)
- **멀티라인 지원**: Text variant에서 여러 줄 표시 + 정렬 옵션
- **펄스 애니메이션**: 2초 주기로 opacity 0.5 ↔ 1.0 반복
- **커스터마이징**: width, height, color, borderRadius 조정 가능
- **Foundation 토큰**: 모든 스타일 값이 토큰 기반

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'rectangle' \| 'circle'` | `'text'` | Skeleton 타입 |
| `width` | `number \| string` | variant별 상이 | 너비 (px 또는 '100%') |
| `height` | `number` | variant별 상이 | 높이 (px) |
| `lines` | `number` | `1` | 텍스트 줄 수 (text variant만) |
| `lineHeight` | `number` | `14` | 텍스트 줄 높이 (text variant) |
| `lineGap` | `number` | `4` | 줄 사이 간격 (text variant) |
| `align` | `'leading' \| 'center' \| 'trailing'` | `'leading'` | 텍스트 정렬 (text variant) |
| `borderRadius` | `number` | variant별 상이 | Border radius 오버라이드 |
| `color` | `string` | `#eaebed` | 배경색 오버라이드 |
| `animated` | `boolean` | `true` | 펄스 애니메이션 활성화 |
| `style` | `ViewStyle` | - | 커스텀 스타일 |
| `testID` | `string` | - | 테스트 ID |

## Default Dimensions

| Variant | Width | Height | Border Radius |
|---------|-------|--------|---------------|
| `text` | `'100%'` | `14px` | `4px` (skeleton.text) |
| `rectangle` | `'100%'` | `100px` | `12px` (skeleton.image) |
| `circle` | `48px` | `48px` | `9999px` (primitive.full) |

## Design Tokens

### Colors
- `colors.surface.base.container` (#eaebed) - 기본 배경색

### Spacing
- `spacing.semantic.vertical['3xs']` (4px) - 기본 lineGap

### Radius
- `radius.component.skeleton.text` (4px) - 텍스트 skeleton radius
- `radius.component.skeleton.image` (12px) - 이미지/카드 skeleton radius
- `radius.primitive.full` (9999px) - 원형 skeleton

## 사용 예제

### Basic Usage

```tsx
import { Skeleton } from '@baerae-zkap/design-system/native';

// Single text line
<Skeleton variant="text" />

// Rectangle (image placeholder)
<Skeleton variant="rectangle" width="100%" height={200} />

// Circle (avatar placeholder)
<Skeleton variant="circle" width={48} height={48} />
```

### Multi-line Text

```tsx
// 3줄 텍스트 스켈레톤 (마지막 줄은 70% 너비)
<Skeleton variant="text" lines={3} width="100%" />

// 정렬 옵션
<Skeleton variant="text" lines={3} align="center" />
<Skeleton variant="text" lines={3} align="trailing" />
```

### Card Skeleton (Composition)

```tsx
<View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, gap: 16 }}>
  {/* Header: Avatar + Text */}
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <Skeleton variant="circle" width={40} height={40} />
    <View style={{ flex: 1, gap: 8 }}>
      <Skeleton variant="text" width="60%" height={14} />
      <Skeleton variant="text" width="40%" height={12} />
    </View>
  </View>

  {/* Image */}
  <Skeleton variant="rectangle" width="100%" height={180} />

  {/* Text content */}
  <Skeleton variant="text" lines={3} width="100%" />
</View>
```

### List Skeleton

```tsx
{Array.from({ length: 5 }).map((_, index) => (
  <View key={index} style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
    <Skeleton variant="circle" width={48} height={48} />
    <View style={{ flex: 1, gap: 8 }}>
      <Skeleton variant="text" width="70%" height={14} />
      <Skeleton variant="text" width="50%" height={12} />
    </View>
  </View>
))}
```

### Customization

```tsx
// Custom color
<Skeleton variant="rectangle" color="#d6d9dd" />

// Custom border radius
<Skeleton variant="rectangle" borderRadius={20} />

// No animation
<Skeleton variant="text" animated={false} />
```

## Accessibility

- Skeleton은 시각적 플레이스홀더로 스크린 리더에 노출되지 않습니다.
- 실제 콘텐츠가 로드되면 Skeleton을 완전히 교체해야 합니다.
- 로딩 상태를 알리려면 별도의 접근성 공지가 필요합니다.

## Animation Details

- **Duration**: 2000ms (1000ms fade in + 1000ms fade out)
- **Easing**: `Easing.inOut(Easing.ease)`
- **Range**: opacity 0.5 → 1.0 → 0.5
- **Native Driver**: `useNativeDriver: true` (성능 최적화)

## Notes

- Text variant에서 `lines > 1`이면 마지막 줄은 자동으로 70% 너비로 렌더링됩니다.
- Circle variant는 width와 height를 동일하게 설정해야 정원이 됩니다.
- 애니메이션을 비활성화하려면 `animated={false}`를 사용하세요 (스토리북 스냅샷 테스트 등).
