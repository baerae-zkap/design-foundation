# Menu

A dropdown action menu for presenting contextual actions and options.

## Import

```typescript
import { Menu } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactNode` | - | Element that opens the menu |
| `items` | `MenuContent[]` | - | Array of menu items or dividers |
| `visible` | `boolean` | - | Controlled visibility state |
| `onVisibleChange` | `(visible: boolean) => void` | - | Callback when visibility changes |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Menu position relative to trigger |
| `style` | `ViewStyle` | - | Container style override |
| `testID` | `string` | `'menu'` | Test identifier |

### MenuItem

```typescript
interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}
```

### MenuDivider

```typescript
interface MenuDivider {
  type: 'divider';
}
```

## Usage

### Basic

```tsx
import { Menu } from '@baerae-zkap/design-system/native';
import { MoreVertical } from 'lucide-react-native';

<Menu
  trigger={<MoreVertical size={24} />}
  items={[
    { label: 'Edit', onPress: () => console.log('Edit') },
    { label: 'Share', onPress: () => console.log('Share') },
    { label: 'Delete', onPress: () => console.log('Delete') },
  ]}
/>
```

### With Icons

```tsx
import { Edit, Share2, Trash2 } from 'lucide-react-native';

<Menu
  trigger={<Button label="Actions" />}
  items={[
    {
      label: 'Edit',
      icon: <Edit size={20} color="#3e4651" />,
      onPress: () => console.log('Edit'),
    },
    {
      label: 'Share',
      icon: <Share2 size={20} color="#3e4651" />,
      onPress: () => console.log('Share'),
    },
    {
      label: 'Delete',
      icon: <Trash2 size={20} color="#ff4444" />,
      onPress: () => console.log('Delete'),
      destructive: true,
    },
  ]}
/>
```

### With Dividers

```tsx
<Menu
  trigger={<Button label="Options" />}
  items={[
    { label: 'Profile', onPress: () => {} },
    { label: 'Settings', onPress: () => {} },
    { type: 'divider' },
    { label: 'Sign Out', onPress: () => {}, destructive: true },
  ]}
/>
```

### With Trailing Content

```tsx
<Menu
  trigger={<Button label="View" />}
  items={[
    {
      label: 'Dark Mode',
      trailing: <Switch value={darkMode} onValueChange={setDarkMode} />,
      onPress: () => {},
    },
    {
      label: 'Notifications',
      trailing: <Text>3</Text>,
      onPress: () => {},
    },
  ]}
/>
```

### Controlled Mode

```tsx
const [visible, setVisible] = useState(false);

<Menu
  trigger={<Button label="Menu" />}
  items={[
    { label: 'Item 1', onPress: () => console.log('1') },
    { label: 'Item 2', onPress: () => console.log('2') },
  ]}
  visible={visible}
  onVisibleChange={setVisible}
/>
```

### Disabled Items

```tsx
<Menu
  trigger={<Button label="Actions" />}
  items={[
    { label: 'Available Action', onPress: () => {} },
    { label: 'Unavailable Action', onPress: () => {}, disabled: true },
  ]}
/>
```

### Destructive Actions

```tsx
<Menu
  trigger={<Button label="Manage" />}
  items={[
    { label: 'Archive', onPress: () => {} },
    { type: 'divider' },
    { label: 'Delete', onPress: () => {}, destructive: true },
    { label: 'Delete Forever', onPress: () => {}, destructive: true },
  ]}
/>
```

### Placement Variants

```tsx
<Menu placement="bottom-start" {...props} />
<Menu placement="bottom-end" {...props} />
<Menu placement="top-start" {...props} />
<Menu placement="top-end" {...props} />
```

## Design Tokens

### Spacing
- Menu panel padding: `spacing.primitive[2]` (8px)
- Menu item padding: `spacing.component.list.itemPaddingX` (20px), `spacing.component.input.paddingY` (12px)
- Item content gap: `spacing.primitive[3]` (12px)
- Divider margin: `spacing.primitive[1]` (4px) vertical, `spacing.component.list.itemPaddingX` (20px) horizontal

### Radius
- Menu panel: `radius.component.card.md` (16px)

### Colors
- Panel background: `colors.surface.elevated.default` (white)
- Item label: `colors.content.base.default` (#3e4651)
- Destructive label: `colors.content.error.default` (error red)
- Disabled label: `colors.content.disabled.default` (#a7adb5)
- Item pressed: `colors.surface.base.container` (#eaebed)
- Divider: `colors.border.base.default` (#d6d9dd)
- Modal overlay: `colors.overlay.dim` (rgba dark 40%)

### Shadow
- **iOS**: shadowColor `#000`, shadowOffset `{0, 4}`, shadowOpacity `0.15`, shadowRadius `12`
- **Android**: elevation `8`

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- Focus states visible
- Disabled state clearly indicated
- Destructive actions use error color
- Touch target meets minimum size (44x44)
- Modal overlay dismissible by tap

## Behavior

- **Toggle on trigger**: Pressing trigger opens/closes menu
- **Close on select**: Menu closes after item press
- **Close on overlay**: Tapping outside closes menu
- **Controlled mode**: Pass `visible` and `onVisibleChange` for external control
- **Disabled items**: Non-interactive, visually dimmed
- **Destructive styling**: Red text color for dangerous actions
- **Dividers**: Visual separation between item groups
- **Animated transitions**: Fade and scale animation on open/close
- **Platform shadows**: Native shadow styling per platform
- **Min width**: 200px minimum width for consistent sizing
- **Placement**: Four placement options relative to trigger (bottom-start default)
