# Slider

값 범위를 선택하는 슬라이더 컴포넌트입니다.

## Import

```typescript
// React Native
import { Slider } from '@baerae-zkap/design-system/native';
```

## Props

### SliderProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `number` | - | ✅ | 현재 값 |
| `onValueChange` | `(value: number) => void` | - | ✅ | 값 변경 핸들러 |
| `minimumValue` | `number` | `0` | - | 최소 값 |
| `maximumValue` | `number` | `100` | - | 최대 값 |
| `step` | `number` | `1` | - | 증가 단위 (스냅 간격) |
| `showValue` | `boolean` | `false` | - | 값 라벨 표시 여부 |
| `disabled` | `boolean` | `false` | - | 비활성화 상태 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | - | 크기 |
| `testID` | `string` | - | - | 테스트 ID |
| `accessibilityLabel` | `string` | - | - | 접근성 라벨 |
| `style` | `ViewStyle` | - | - | 커스텀 스타일 |

## Size Variants

| Size | Track Height | Thumb Size | Use Case |
|------|--------------|------------|----------|
| `small` | 4px | 20px | 컴팩트한 UI, 좁은 공간 |
| `medium` | 6px | 24px | 기본 사용 (권장) |
| `large` | 8px | 28px | 강조된 입력, 큰 터치 영역 |

## Design Tokens

### Spacing
- Track height small: `4px` (primitive.1)
- Track height medium: `6px`
- Track height large: `8px` (primitive.2)
- Thumb size small: `20px` (primitive.5)
- Thumb size medium: `24px` (primitive.6)
- Thumb size large: `28px` (primitive.7)
- Container padding vertical: `12px` (primitive.3)
- Value label padding horizontal: `8px` (primitive.2)
- Value label padding vertical: `4px` (primitive.1)

### Radius
- Track: `9999px` (primitive.full)
- Thumb: `9999px` (primitive.full)
- Value label: `8px` (primitive.sm)

### Colors
- Track background: `#cbd5e1` (palette.grey.90)
- Fill (active): `#2563eb` (surface.brand.default)
- Thumb: `#ffffff` (palette.static.white)
- Disabled track: `#e2e8f0` (surface.disabled.default)
- Value label text: `#334155` (content.base.default)
- Value label background: `#ffffff`

## Usage Examples

### Basic Usage

```typescript
import { Slider } from '@baerae-zkap/design-system/native';
import { useState } from 'react';

function Example() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      minimumValue={0}
      maximumValue={100}
    />
  );
}
```

### With Value Label

```typescript
<Slider
  value={value}
  onValueChange={setValue}
  minimumValue={0}
  maximumValue={100}
  showValue
/>
```

### With Step Increment

```typescript
// Snaps to multiples of 10
<Slider
  value={value}
  onValueChange={setValue}
  minimumValue={0}
  maximumValue={100}
  step={10}
/>
```

### Custom Range

```typescript
<Slider
  value={value}
  onValueChange={setValue}
  minimumValue={-100}
  maximumValue={100}
  step={5}
  showValue
/>
```

### Different Sizes

```typescript
<Slider size="small" value={30} onValueChange={setValue} />
<Slider size="medium" value={50} onValueChange={setValue} />
<Slider size="large" value={70} onValueChange={setValue} />
```

### Disabled State

```typescript
<Slider
  value={50}
  onValueChange={() => {}}
  disabled
/>
```

### Real-World Example: Volume Control

```typescript
function VolumeControl() {
  const [volume, setVolume] = useState(75);

  return (
    <View style={{ gap: 16, padding: 20, backgroundColor: '#fff', borderRadius: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Volume</Text>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#2563eb' }}>
          {Math.round(volume)}%
        </Text>
      </View>
      <Slider
        size="medium"
        value={volume}
        onValueChange={setVolume}
        minimumValue={0}
        maximumValue={100}
      />
    </View>
  );
}
```

### Real-World Example: Price Range Filter

```typescript
function PriceFilter() {
  const [maxPrice, setMaxPrice] = useState(50000);

  return (
    <View style={{ gap: 16, padding: 20, backgroundColor: '#fff', borderRadius: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Max Price</Text>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>
          ₩{maxPrice.toLocaleString()}
        </Text>
      </View>
      <Slider
        size="large"
        value={maxPrice}
        onValueChange={setMaxPrice}
        minimumValue={0}
        maximumValue={100000}
        step={5000}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 12, color: '#94a3b8' }}>₩0</Text>
        <Text style={{ fontSize: 12, color: '#94a3b8' }}>₩100,000</Text>
      </View>
    </View>
  );
}
```

## Behavior

### Interaction
- **Tap**: Jump to tapped position
- **Drag**: Smoothly slide to new position
- **Step**: Value snaps to nearest step increment when `step` prop is set

### Value Constraints
- Value is automatically clamped between `minimumValue` and `maximumValue`
- When `step` is set, value rounds to nearest step increment
- Example: `step={10}` → values snap to 0, 10, 20, 30, etc.

### Accessibility
- Sets `accessibilityRole="adjustable"`
- Provides `accessibilityValue` with min, max, and current value
- Supports `accessibilityLabel` for screen readers

## Best Practices

### Do's ✅
- Use `medium` size for most cases (optimal balance)
- Show value label (`showValue`) for important selections
- Use appropriate `step` values (e.g., 1 for precision, 10 for coarse adjustment)
- Provide visible min/max labels below slider for context
- Use `large` size for touch-critical interactions

### Don'ts ❌
- Don't use slider for binary (on/off) choices → use Switch instead
- Don't use slider for discrete options (< 5 choices) → use SegmentedControl or Radio
- Don't hide value feedback completely (show value or labels)
- Don't use very small steps with large ranges (causes poor UX)

## Use Cases

| Scenario | Configuration |
|----------|---------------|
| Volume/Brightness | `min={0}`, `max={100}`, `step={1}`, `showValue={true}` |
| Price Range Filter | `min={0}`, `max={1000000}`, `step={10000}` |
| Rating Selection | `min={0}`, `max={5}`, `step={0.5}`, `showValue={true}` |
| Timeline Scrubbing | `min={0}`, `max={duration}`, `step={1}` |
| Zoom Level | `min={100}`, `max={400}`, `step={25}`, `showValue={true}` |

## Platform Notes

- Uses `PanResponder` for gesture handling (works on iOS & Android)
- Shadow styling applied for thumb (iOS uses `shadow*`, Android uses `elevation`)
- Smooth spring animation when value changes programmatically
- Respects platform-specific touch target sizes

## Related Components

- **Switch**: For binary on/off states
- **SegmentedControl**: For discrete options (2-5 choices)
- **Radio**: For mutually exclusive options
- **TextField**: For precise numeric input
