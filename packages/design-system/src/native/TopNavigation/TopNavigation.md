# TopNavigation

A top navigation bar with title and action buttons, supporting two size variants: medium (compact) and large (prominent title).

## Import

```typescript
import { TopNavigation } from '@baerae-zkap/design-system/native';
```

## Props

### TopNavigationProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | - | The main title text |
| `subtitle` | `string` | No | - | Subtitle text (only shown in large size) |
| `size` | `'medium' \| 'large'` | No | `'medium'` | Size variant: medium (56px) or large (96px) |
| `leftAction` | `React.ReactNode` | No | - | Custom left action element (overrides back button) |
| `rightActions` | `React.ReactNode[]` | No | `[]` | Array of right action elements (max 2 recommended) |
| `onBackPress` | `() => void` | No | - | Callback for back button press (shows back button if provided) |
| `borderVisible` | `boolean` | No | `false` | Whether to show bottom border |
| `style` | `ViewStyle` | No | - | Additional styles for the container |
| `testID` | `string` | No | - | Test identifier |

## Usage

### Basic Example

```typescript
import { TopNavigation } from '@baerae-zkap/design-system/native';

function Screen() {
  return (
    <TopNavigation
      title="Screen Title"
      borderVisible
    />
  );
}
```

### With Back Button

```typescript
import { TopNavigation } from '@baerae-zkap/design-system/native';

function Screen() {
  const navigation = useNavigation();

  return (
    <TopNavigation
      title="Details"
      onBackPress={() => navigation.goBack()}
      borderVisible
    />
  );
}
```

### With Action Buttons

```typescript
import { TopNavigation } from '@baerae-zkap/design-system/native';
import { MoreVertical, Share } from 'lucide-react-native';
import { Pressable } from 'react-native';

function Screen() {
  return (
    <TopNavigation
      title="Article"
      onBackPress={() => navigation.goBack()}
      rightActions={[
        <Pressable onPress={() => console.log('Share')}>
          <Share size={20} color="#000" />
        </Pressable>,
        <Pressable onPress={() => console.log('More')}>
          <MoreVertical size={20} color="#000" />
        </Pressable>,
      ]}
      borderVisible
    />
  );
}
```

### Large Size with Subtitle

```typescript
<TopNavigation
  title="My Profile"
  subtitle="Manage your account settings"
  size="large"
  onBackPress={() => navigation.goBack()}
  rightActions={[
    <Pressable onPress={() => console.log('Edit')}>
      <Edit size={20} color="#000" />
    </Pressable>,
  ]}
/>
```

### With Custom Left Action

```typescript
import { TopNavigation } from '@baerae-zkap/design-system/native';
import { Menu } from 'lucide-react-native';
import { Pressable } from 'react-native';

function Screen() {
  return (
    <TopNavigation
      title="Dashboard"
      leftAction={
        <Pressable onPress={() => console.log('Menu')}>
          <Menu size={24} color="#000" />
        </Pressable>
      }
      borderVisible
    />
  );
}
```

## Design Tokens Used

### Spacing
- `spacing.component.header.height` (56px) - Medium size height
- `spacing.component.header.paddingX` (16px) - Horizontal padding
- `spacing.primitive[1]` (4px) - Gap between right actions, subtitle gap
- `spacing.primitive[2]` (8px) - Large size vertical padding, center section padding

### Colors
- `colors.surface.base.default` - Background color (white)
- `colors.border.base.default` - Bottom border color
- `colors.content.base.strong` - Title text color
- `colors.content.base.secondary` - Subtitle text color
- `colors.content.base.default` - Back button icon color

## Size Variants

### Medium (56px)
- Compact horizontal layout
- Centered title
- Left action or back button
- Right actions aligned to the right
- Ideal for most screens

### Large (96px)
- Vertical layout with prominent title
- Larger title text (24px, weight 700)
- Optional subtitle below title
- Top row for actions
- Bottom section for title content
- Ideal for profile screens, dashboards, or screens with important headings

## Best Practices

1. **Action Buttons**: Limit right actions to 2 buttons for clean UI. More actions should go in a menu.

2. **Back Button**: Use `onBackPress` for navigation. The component automatically shows a chevron-left icon.

3. **Custom Actions**: Use `leftAction` to override the back button with custom elements (menu button, logo, etc.).

4. **Border Usage**: Enable `borderVisible` to separate navigation from content below.

5. **Size Selection**:
   - Use `medium` for standard screens
   - Use `large` for profile pages, dashboards, or when the title needs emphasis

6. **Touch Targets**: All action buttons have 44x44px touch targets with proper hitSlop.

7. **Title Length**: Keep titles concise. Long titles are truncated with ellipsis.

## Accessibility

- Back button has `accessibilityRole="button"` and `accessibilityLabel="Go back"`
- Touch targets meet minimum size requirements (44x44px)
- Hit slop areas provide comfortable tap zones
- Proper semantic structure for screen readers

## Platform Support

- **iOS**: ✅ Full support
- **Android**: ✅ Full support
- **Web**: ❌ Use web navigation components instead

## Related Components

- **BottomNavigation**: For bottom tab navigation
- **TabBar**: For horizontal tab switching within content
