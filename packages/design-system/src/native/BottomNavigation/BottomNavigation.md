# BottomNavigation

A fixed bottom navigation bar for mobile apps, supporting 3-5 tabs with icons, labels, and optional badges.

## Import

```typescript
import { BottomNavigation } from '@baerae-zkap/design-system/native';
```

## Props

### BottomNavigationItem

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | The label text displayed below the icon |
| `icon` | `React.ReactNode` | Yes | - | The icon element to display when inactive |
| `activeIcon` | `React.ReactNode` | No | `icon` | Optional icon to display when active |
| `badge` | `number \| boolean` | No | - | Badge indicator: `true` for dot, number for count |
| `disabled` | `boolean` | No | `false` | Whether the item is disabled |
| `testID` | `string` | No | - | Test identifier for automated testing |

### BottomNavigationProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `BottomNavigationItem[]` | Yes | - | Array of navigation items (3-5 recommended) |
| `selectedIndex` | `number` | Yes | - | Index of the currently selected item |
| `onSelect` | `(index: number) => void` | Yes | - | Callback when an item is selected |
| `style` | `ViewStyle` | No | - | Additional styles for the container |
| `testID` | `string` | No | - | Test identifier for the navigation bar |

## Usage

### Basic Example

```typescript
import { BottomNavigation } from '@baerae-zkap/design-system/native';
import { Home, Search, Bell, User } from 'lucide-react-native';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <BottomNavigation
      items={[
        {
          label: 'Home',
          icon: <Home size={24} color="#8E8E93" />,
          activeIcon: <Home size={24} color="#0066FF" />,
        },
        {
          label: 'Search',
          icon: <Search size={24} color="#8E8E93" />,
          activeIcon: <Search size={24} color="#0066FF" />,
        },
        {
          label: 'Notifications',
          icon: <Bell size={24} color="#8E8E93" />,
          activeIcon: <Bell size={24} color="#0066FF" />,
          badge: 5,
        },
        {
          label: 'Profile',
          icon: <User size={24} color="#8E8E93" />,
          activeIcon: <User size={24} color="#0066FF" />,
        },
      ]}
      selectedIndex={selectedTab}
      onSelect={setSelectedTab}
    />
  );
}
```

### With Badge Indicators

```typescript
<BottomNavigation
  items={[
    {
      label: 'Home',
      icon: <Home size={24} color="#8E8E93" />,
      badge: true, // Red dot indicator
    },
    {
      label: 'Messages',
      icon: <MessageCircle size={24} color="#8E8E93" />,
      badge: 12, // Number badge
    },
    {
      label: 'Settings',
      icon: <Settings size={24} color="#8E8E93" />,
      badge: 99, // Large number badge
    },
  ]}
  selectedIndex={0}
  onSelect={(index) => console.log('Tab selected:', index)}
/>
```

### With Disabled Items

```typescript
<BottomNavigation
  items={[
    {
      label: 'Home',
      icon: <Home size={24} color="#8E8E93" />,
    },
    {
      label: 'Premium',
      icon: <Star size={24} color="#8E8E93" />,
      disabled: true, // Grayed out
    },
    {
      label: 'Profile',
      icon: <User size={24} color="#8E8E93" />,
    },
  ]}
  selectedIndex={0}
  onSelect={(index) => console.log('Tab selected:', index)}
/>
```

## Design Tokens Used

### Spacing
- `spacing.component.header.height` (56px) - Container height
- `spacing.primitive[1]` (4px) - Gap between icon and label, badge padding
- `spacing.component.header.paddingX` (16px) - Item padding

### Colors
- `colors.surface.base.default` - Background color (white)
- `colors.border.base.default` - Top border color
- `colors.content.brand.default` - Active icon and label color
- `colors.content.base.alternative` - Inactive label color
- `colors.content.disabled.default` - Disabled item color
- `colors.surface.brand.default` - Badge background color
- `colors.content.base.onColor` - Badge text color

### Radius
- `radius.primitive.full` (9999px) - Badge border radius

## Best Practices

1. **Number of Items**: Use 3-5 items for optimal UX. Too many items make the bar crowded.

2. **Icon Consistency**: Maintain consistent icon sizes (24px recommended) across all items.

3. **Badge Usage**: Use badges sparingly for notifications or status indicators. Avoid overusing them.

4. **Active State**: Provide visual feedback with different icons or colors for active states.

5. **Disabled Items**: Use disabled state for features that require premium access or specific conditions.

6. **Touch Targets**: Each item has sufficient touch area (flex: 1) for easy tapping.

## Accessibility

- Each item has `accessibilityRole="tab"` for proper screen reader support
- Active state is communicated via `accessibilityState={{ selected: true }}`
- Disabled state is communicated via `accessibilityState={{ disabled: true }}`
- Each item has an `accessibilityLabel` matching its label text
- Optional `testID` props for automated testing

## Platform Support

- **iOS**: ✅ Full support
- **Android**: ✅ Full support
- **Web**: ❌ Use web navigation components instead
