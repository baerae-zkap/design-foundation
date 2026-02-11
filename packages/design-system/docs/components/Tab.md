# Tab Component

Horizontal tab navigation with animated underline indicator for switching between content views.

## Overview

Tab provides a clear and intuitive way to organize content into separate views. Features animated indicator, disabled states, icons, and badge support following Montage design system principles.

## Usage

```tsx
import { TabList } from '@baerae-zkap/design-system/native';
import { useState } from 'react';

function MyComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = [
    { label: 'Home' },
    { label: 'Profile' },
    { label: 'Settings' }
  ];

  return (
    <TabList
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    >
      {tabs}
    </TabList>
  );
}
```

## Props

### TabList Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `TabItemProps[]` | ✅ | - | Array of tab configurations |
| `selectedIndex` | `number` | ✅ | - | Currently selected tab index |
| `onSelect` | `(index: number) => void` | ✅ | - | Callback when tab is selected |
| `style` | `ViewStyle` | - | - | Custom container style |
| `testID` | `string` | - | - | Test ID for automation |

### TabItemProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | ✅ | - | Tab label text |
| `disabled` | `boolean` | - | `false` | Whether the tab is disabled |
| `icon` | `ReactNode` | - | - | Optional icon element |
| `badge` | `number` | - | - | Optional badge number (max 99) |

## Examples

### Basic Tabs

```tsx
const [selectedIndex, setSelectedIndex] = useState(0);

const tabs = [
  { label: 'Home' },
  { label: 'Profile' },
  { label: 'Settings' }
];

<TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
  {tabs}
</TabList>
```

### With Disabled State

```tsx
const tabs = [
  { label: 'Available' },
  { label: 'Disabled', disabled: true },
  { label: 'Active' }
];

<TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
  {tabs}
</TabList>
```

### With Badge

```tsx
const tabs = [
  { label: 'Messages', badge: 5 },
  { label: 'Notifications', badge: 12 },
  { label: 'Archive' }
];

<TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
  {tabs}
</TabList>
```

### With Icon

```tsx
const HomeIcon = () => <Text>🏠</Text>;
const UserIcon = () => <Text>👤</Text>;

const tabs = [
  { label: 'Home', icon: <HomeIcon /> },
  { label: 'Profile', icon: <UserIcon /> }
];

<TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
  {tabs}
</TabList>
```

### Scrollable Tabs

```tsx
const tabs = [
  { label: 'Trending' },
  { label: 'Technology' },
  { label: 'Business' },
  { label: 'Entertainment' },
  { label: 'Sports' },
  { label: 'Health' }
];

<TabList selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
  {tabs}
</TabList>
```

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `colors.content.base.strong` | `#131a1f` | Selected tab text |
| `colors.content.base.alternative` | `#92999f` | Unselected tab text |
| `colors.content.disabled.default` | `#a7adb5` | Disabled tab text |
| `colors.surface.brand.default` | `#0066ff` | Indicator color |
| `colors.border.base.default` | `#d6d9dd` | Bottom border line |
| `colors.surface.base.default` | `#ffffff` | Background |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.component.tabBar.height` | `48px` | Tab bar height |
| `spacing.semantic.horizontal.xs` | `12px` | Tab horizontal padding |
| `spacing.semantic.inset.sm` | `16px` | Vertical padding |
| `spacing.primitive[5]` | `20px` | Gap between tabs |
| `spacing.primitive[2]` | `8px` | Icon-text gap |
| `spacing.primitive[1]` | `4px` | Badge vertical padding |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.primitive.none` | `0px` | No radius for tabs |
| `radius.component.badge.pill` | `9999px` | Badge pill shape |

### Typography

| Property | Value |
|----------|-------|
| Font size | `17px` |
| Font weight | `600` |
| Letter spacing | `-0.01em` |

## States

### Default
- Unselected tabs show alternative text color
- No underline indicator

### Selected
- Strong text color (`#131a1f`)
- Brand-colored underline indicator (2px height)
- Animated slide transition (0.2s spring)

### Hover/Pressed
- Reduced opacity (0.7)
- Smooth transition (0.2s ease)

### Disabled
- Disabled text color (`#a7adb5`)
- No press interaction
- Maintains position in layout

## Accessibility

- **Keyboard Navigation**: Support arrow key navigation between tabs
- **Screen Readers**: Announce selected tab and total count
- **Touch Target**: Minimum 48px height for tap targets
- **Focus State**: Clear visual indicator for keyboard focus
- **ARIA Roles**: Use `role="tablist"` and `role="tab"` attributes
- **Selection State**: Announce current selection state

## Best Practices

### Do
- Use 3-7 tabs for optimal usability
- Keep tab labels concise (1-2 words)
- Use consistent label lengths
- Enable horizontal scrolling for many tabs
- Provide clear visual feedback on selection

### Don't
- Don't use more than 10 tabs
- Don't use long, multi-word labels
- Don't hide critical actions in tabs
- Don't change tab order dynamically
- Don't use tabs for sequential navigation

## Platform Notes

### React Native
- Uses `ScrollView` for horizontal scrolling
- Animated indicator with `Animated.spring`
- Press feedback with `Pressable` opacity
- Layout measurement with `onLayout` event
- Smooth 60fps animations with native driver

### Performance
- Efficient layout measurement caching
- Native driver for transform animations
- Optimized re-render with `useLayoutEffect`
- Minimal style recalculations
