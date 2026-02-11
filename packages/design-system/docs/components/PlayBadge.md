# PlayBadge Component

## Description

비디오 콘텐츠를 나타내는 재생 아이콘 오버레이 배지입니다. 썸네일 위에 중앙 배치되어 재생 가능한 콘텐츠임을 시각적으로 표시합니다.

## Anatomy

```
PlayBadge
└── Container (circular background)
    └── Play Icon (triangle)
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'normal' \| 'alternative'` | `'normal'` | No | Visual variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Size of the badge |
| `onPress` | `() => void` | - | No | Press handler |
| `disabled` | `boolean` | `false` | No | Disabled state |
| `testID` | `string` | - | No | Test identifier |
| `accessibilityLabel` | `string` | `'Play video'` | No | Accessibility label |
| `style` | `ViewStyle` | - | No | Custom style |

## Variants

### Normal
- Dark semi-transparent background (overlay.dim)
- White play icon (content.base.onColor)
- Use on thumbnails or video content

### Alternative
- White background (surface.base.default)
- Dark play icon (content.base.default)
- Use on light backgrounds

## Sizes

| Size | Container | Triangle Base | Use Case |
|------|-----------|---------------|----------|
| `small` | 32px | 10px | Small thumbnails, list items |
| `medium` | 48px | 16px | Standard video cards |
| `large` | 64px | 20px | Featured content, hero videos |

## Usage Examples

### Basic Usage

```tsx
import { PlayBadge } from '@baerae-zkap/design-system/native';

<PlayBadge
  variant="normal"
  size="medium"
  onPress={() => console.log('Play video')}
/>
```

### On Thumbnail

```tsx
<View style={{ position: 'relative' }}>
  <Image source={videoThumbnail} style={{ width: 200, height: 120 }} />
  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
    <PlayBadge
      variant="normal"
      size="medium"
      onPress={handlePlayVideo}
    />
  </View>
</View>
```

### Alternative Variant

```tsx
<PlayBadge
  variant="alternative"
  size="large"
  onPress={handlePlay}
/>
```

### Disabled State

```tsx
<PlayBadge
  variant="normal"
  size="medium"
  disabled
/>
```

## Design Tokens Used

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `colors.overlay.dim` | `rgba(17, 26, 31, 0.4)` | Normal variant background |
| `colors.surface.base.default` | `#ffffff` | Alternative variant background |
| `colors.content.base.onColor` | `#ffffff` | Normal variant icon |
| `colors.content.base.default` | `#3e4651` | Alternative variant icon |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.primitive[1]` | `4px` | Triangle visual centering offset |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.primitive.full` | `9999px` | Circular container |

## Behavior

### Interaction States

- **Default**: Badge visible at 100% opacity
- **Pressed**: Badge fades out (opacity: 0) - provides feedback that the press was registered
- **Disabled**: No interaction, badge remains visible

### Positioning

The PlayBadge should always be:
- Centered horizontally and vertically on the thumbnail
- Positioned absolutely over the video thumbnail
- Uses `position: 'absolute'` in parent container

## Accessibility

- Default `accessibilityRole`: `"button"`
- Default `accessibilityLabel`: `"Play video"`
- Supports custom accessibility labels
- Disabled state prevents interaction

## Platform Support

- ✅ React Native (iOS, Android)
- ❌ Web (not applicable - use web video controls)

## Related Components

- **Thumbnail**: Container for video thumbnails
- **Card**: Often used together in video card layouts
