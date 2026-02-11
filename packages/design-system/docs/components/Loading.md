# Loading (Spinner) Component

## Description

원형 회전 스피너로 진행 중인 작업을 나타냅니다. 버튼 내부, 콘텐츠 로딩 영역 등 다양한 위치에서 사용할 수 있습니다.

## Design Principles

- **1:1 Aspect Ratio**: 모든 사이즈에서 정사각형 비율 유지
- **Continuous Animation**: 작업이 완료될 때까지 부드럽게 회전
- **Context-Aware Colors**: 배경에 따라 적절한 색상 사용
- **Performance Optimized**: Native Driver 사용으로 부드러운 애니메이션

## Props

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | 스피너 크기 (small=20px, medium=32px, large=48px) |
| `color` | `'brand' \| 'base' \| 'onColor' \| 'inherit'` | `'brand'` | 스피너 색상 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `style` | `ViewStyle` | - | 커스텀 스타일 |
| `testID` | `string` | - | 테스트 ID |

## Usage Examples

### Basic Usage

```tsx
import { Loading } from '@baerae-zkap/design-system/native';
import { View } from 'react-native';

function MyComponent() {
  return (
    <View>
      <Loading size="medium" color="brand" />
    </View>
  );
}
```

### Sizes

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Loading size="small" color="brand" />
  <Loading size="medium" color="brand" />
  <Loading size="large" color="brand" />
</View>
```

### Custom Size

```tsx
<Loading size={40} color="brand" />
```

### Colors

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Loading size="medium" color="brand" />
  <Loading size="medium" color="base" />
  <Loading size="medium" color="onColor" /> {/* For dark backgrounds */}
</View>
```

### In Button

```tsx
<Pressable style={styles.button}>
  <Loading size="small" color="onColor" />
  <Text style={styles.buttonText}>Loading...</Text>
</Pressable>
```

### On Dark Background

```tsx
<View style={{ backgroundColor: '#1a2026', padding: 20 }}>
  <Loading size="medium" color="onColor" />
</View>
```

### Disabled State

```tsx
<Loading size="medium" color="brand" disabled={true} />
```

## Design Tokens Used

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `colors.surface.brand.default` | `#0066ff` | Brand spinner color |
| `colors.content.base.default` | `#3e4651` | Base spinner color |
| `colors.content.base.onColor` | `#ffffff` | On dark backgrounds |
| `colors.content.disabled.default` | `#a7adb5` | Disabled spinner |
| `colors.surface.base.container` | `#eaebed` | Track ring color |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.primitive.full` | `9999` | Circular shape |

### Size Configuration

| Size | Value | Border Thickness |
|------|-------|------------------|
| `small` | `20px` | `2px` |
| `medium` | `32px` | `3px` |
| `large` | `48px` | `5px` |
| Custom | `n px` | `Math.max(2, n/10)` |

## Animation Details

- **Duration**: 1000ms per rotation
- **Easing**: Linear (constant speed)
- **Native Driver**: Enabled for optimal performance
- **Pattern**: Continuous loop until unmounted

## Accessibility

- **accessibilityRole**: `"progressbar"`
- **accessibilityLabel**: "Loading"
- **accessibilityValue**: "Loading in progress"

## Best Practices

### Do's

- Use `small` size for inline button loading states
- Use `medium` size for content loading areas
- Use `large` size for full-screen loading overlays
- Use `onColor` variant on dark backgrounds
- Center spinner in loading areas

### Don'ts

- Don't use multiple spinners in close proximity
- Don't use without indication of what's loading
- Don't use excessively large custom sizes (>80px)
- Don't animate spinner manually (already animated)

## Related Components

- **LoadingDots**: Alternative loading indicator with dots
- **Skeleton**: Content placeholder during loading
- **Button**: Can contain loading spinner

## Technical Notes

- Uses React Native `Animated` API with `useNativeDriver: true`
- Spinner arc created with partial transparent borders
- Track ring provides visual context
- Border thickness scales with size for consistency
