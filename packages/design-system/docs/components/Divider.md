# Divider

콘텐츠를 시각적으로 구분하는 구분선 컴포넌트입니다.

## Import

```tsx
import { Divider, DividerInset, DividerSection } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 구분선 방향 |
| `color` | `'default' \| 'strong' \| 'subtle'` | `'default'` | 색상 강도 |
| `thickness` | `number` | `1` | 두께 (px) |
| `inset` | `number \| { left?: number; right?: number }` | `0` | 인셋 (좌우 여백) |
| `spacing` | `number` | `0` | 상하 여백 (horizontal) 또는 좌우 여백 (vertical) |
| `style` | `ViewStyle` | - | 스타일 오버라이드 |

## Color Variants

| Variant | Token | Description |
|---------|-------|-------------|
| `default` | `colors.border.base.default` | 기본 구분선 |
| `strong` | `colors.border.solid.default` | 강조 구분선 |
| `subtle` | `colors.border.solid.alternative` | 미약한 구분선 |

## Presets

### DividerInset

화면 좌우 패딩에 맞춘 인셋 구분선입니다.

```tsx
<DividerInset />
// = <Divider inset={20} />  (spacing.semantic.screen.paddingX)
```

### DividerSection

섹션 간 구분용 여백이 포함된 구분선입니다.

```tsx
<DividerSection />
// = <Divider spacing={16} />  (spacing.component.divider.marginY)
```

## Usage Examples

### Basic

```tsx
<Divider />
```

### List separator with inset

```tsx
{items.map((item, i, arr) => (
  <React.Fragment key={item.id}>
    <ListCell title={item.title} />
    {i < arr.length - 1 && <Divider inset={20} />}
  </React.Fragment>
))}
```

### Avatar list with asymmetric inset

```tsx
<Divider inset={{ left: 56, right: 0 }} />
```

### Section break (thick + subtle)

```tsx
<Divider thickness={8} color="subtle" />
```

### Vertical divider in toolbar

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text>Bold</Text>
  <Divider orientation="vertical" spacing={8} />
  <Text>Italic</Text>
</View>
```

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Default color | `colors.border.base.default` | grey[95] |
| Strong color | `colors.border.solid.default` | grey[90] |
| Subtle color | `colors.border.solid.alternative` | grey[97] |
| Screen inset | `spacing.semantic.screen.paddingX` | 20px |
| Section margin | `spacing.component.divider.marginY` | 16px |
