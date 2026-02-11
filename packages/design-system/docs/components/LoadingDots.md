# LoadingDots Component

## Description

세 개의 점이 물결 모양으로 애니메이션되며 진행 중인 작업을 나타냅니다. 버튼 내부, 채팅 입력 표시, 콘텐츠 로딩 등 Loading 스피너보다 간결한 표현이 필요한 곳에 사용할 수 있습니다.

## Design Principles

- **Wave Pattern**: 세 점이 순차적으로 물결치듯 애니메이션
- **Subtle Feedback**: 스피너보다 시각적으로 덜 강한 로딩 표시
- **Compact Size**: 작은 공간에서도 효과적으로 사용 가능
- **Performance Optimized**: Native Driver 사용으로 부드러운 애니메이션

## Props

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `palette.static.white` | 점의 색상 |
| `size` | `number` | `6` | 점의 크기 (지름, px) |
| `gap` | `number` | `6` | 점 사이 간격 (px) |
| `style` | `ViewStyle` | - | 커스텀 스타일 |
| `testID` | `string` | - | 테스트 ID |

## Usage Examples

### Basic Usage

```tsx
import { LoadingDots } from '@baerae-zkap/design-system/native';
import { View } from 'react-native';

function MyComponent() {
  return (
    <View>
      <LoadingDots size={6} color="#ffffff" />
    </View>
  );
}
```

### Sizes

```tsx
<View style={{ flexDirection: 'column', gap: 16 }}>
  <LoadingDots size={4} color="#2563eb" />
  <LoadingDots size={6} color="#2563eb" />
  <LoadingDots size={8} color="#2563eb" />
</View>
```

### Colors

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <LoadingDots size={6} color="#2563eb" />
  <LoadingDots size={6} color="#ffffff" />
  <LoadingDots size={6} color="#334155" />
</View>
```

### In Button

```tsx
<Pressable style={styles.button}>
  <Text style={styles.buttonText}>Sending</Text>
  <LoadingDots size={4} color="#ffffff" />
</Pressable>
```

### Chat Input Indicator

```tsx
<View style={{ padding: 12, backgroundColor: '#f1f5f9', borderRadius: 12 }}>
  <LoadingDots size={6} color="#64748b" />
</View>
```

### Custom Gap

```tsx
<LoadingDots size={6} color="#2563eb" gap={8} />
```

## Design Tokens Used

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `palette.static.white` | `#ffffff` | Default dot color |
| `colors.surface.brand.default` | `#2563eb` | Brand colored dots |
| `colors.content.base.default` | `#334155` | Base colored dots |
| `colors.content.base.subtle` | `#64748b` | Subtle colored dots |

### Animation Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Pulse Duration | 400ms | Fade in/out duration |
| Stagger | 160ms | Delay between dots |
| Total Cycle | 1120ms | Complete wave cycle |
| Opacity Range | 0.3 → 1.0 | Fade animation range |
| Scale Range | 0.8 → 1.0 | Scale animation range |

## Animation Details

- **Pattern**: Wave effect from left to right
- **Easing**: `Easing.inOut(Easing.ease)` for smooth transitions
- **Native Driver**: Enabled for optimal performance
- **Loop**: Continuous until unmounted

**Animation Sequence per Dot:**
1. Pre-delay (0ms, 160ms, 320ms for dots 1, 2, 3)
2. Fade in + scale up (400ms)
3. Fade out + scale down (400ms)
4. Post-delay (320ms, 160ms, 0ms for dots 1, 2, 3)
5. Repeat

## Accessibility

- **accessibilityRole**: `"progressbar"` (recommended to wrap in View)
- **accessibilityLabel**: "Loading" or custom label
- **accessibilityValue**: "Loading in progress"

## Best Practices

### Do's

- Use when space is limited (buttons, inline text)
- Use for chat/typing indicators
- Use on dark backgrounds with light colors
- Keep size small (4-8px) for most use cases

### Don'ts

- Don't use for full-page loading (use Loading spinner)
- Don't use excessively large dots (>10px)
- Don't overlap multiple LoadingDots close together
- Don't use as the only loading indicator for critical actions

## Related Components

- **Loading**: Circular spinner for general loading states
- **Skeleton**: Content placeholder during loading
- **Button**: Can contain loading dots

## Technical Notes

- Uses React Native `Animated` API with `useNativeDriver: true`
- Three independent animated dots with staggered timing
- Opacity interpolation: 0.3 (rest) → 1.0 (peak)
- Scale interpolation: 0.8 (rest) → 1.0 (peak)
- Cleanup on unmount prevents memory leaks
