# ProgressIndicator

A linear progress bar component that visually represents completion percentage with smooth animations and customizable appearance.

## Import

```typescript
import { ProgressIndicator } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number` | **Required** | Progress value from 0 to 100 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Height of the progress bar (2px/4px/6px) |
| `color` | `'brand' \| 'success' \| 'error'` | `'brand'` | Color variant of the progress indicator |
| `showLabel` | `boolean` | `false` | Show percentage label below the bar |
| `animated` | `boolean` | `true` | Enable smooth progress animations |
| `style` | `ViewStyle` | - | Custom container styles |
| `testID` | `string` | `'progress-indicator'` | Test identifier |

## Usage Examples

### Basic Usage

```tsx
<ProgressIndicator progress={50} />
```

### Different Sizes

```tsx
<ProgressIndicator progress={75} size="small" />
<ProgressIndicator progress={75} size="medium" />
<ProgressIndicator progress={75} size="large" />
```

### Color Variants

```tsx
<ProgressIndicator progress={60} color="brand" />
<ProgressIndicator progress={80} color="success" />
<ProgressIndicator progress={40} color="error" />
```

### With Percentage Label

```tsx
<ProgressIndicator progress={65} showLabel />
```

### Animated Progress

```tsx
const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress(prev => (prev >= 100 ? 0 : prev + 10));
  }, 500);
  return () => clearInterval(timer);
}, []);

<ProgressIndicator progress={progress} animated />
```

### Static (No Animation)

```tsx
<ProgressIndicator progress={45} animated={false} />
```

## Design Tokens Used

### Spacing
- `spacing.primitive[1]` (4px) - Label margin top

### Radius
- `radius.primitive.full` (9999px) - Track and indicator border radius

### Colors
- Track: `colors.surface.base.container` (#eaebed)
- Brand indicator: `colors.surface.brand.default` (#0066ff)
- Success indicator: `colors.content.success.default` (green)
- Error indicator: `colors.content.error.default` (red)
- Label text: `colors.content.base.secondary` (#68707a)

## Accessibility

- The component automatically clamps progress values between 0 and 100
- Progress percentage is exposed via accessible label when `showLabel` is true
- Smooth animations provide visual feedback without causing disorientation
- High contrast between track and indicator ensures visibility
- Test IDs provided for automation testing

## Best Practices

1. **Loading States**: Use brand color for general loading/upload progress
2. **Success States**: Use success color when showing completion of successful operations
3. **Error States**: Use error color when showing progress toward a critical threshold
4. **Labels**: Enable `showLabel` when exact percentage matters to users
5. **Size Selection**: Use small for compact UIs, medium for standard progress, large for prominent progress displays
6. **Animation**: Keep `animated={true}` (default) for smooth user experience unless performance is critical

## Animation Details

- Transition duration: 300ms
- Easing: Default timing function
- Animates width from current to target progress
- Can be disabled with `animated={false}` for instant updates
