# Autocomplete

A search input with filtered suggestion dropdown for selecting from a list of options.

## Import

```typescript
import { Autocomplete } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | - | Currently selected value |
| `onChange` | `(value: string) => void` | - | Callback when selection changes |
| `options` | `AutocompleteOption[]` | - | Array of available options |
| `placeholder` | `string` | `'Search...'` | Placeholder text for input |
| `label` | `string` | - | Optional label above input |
| `error` | `boolean` | `false` | Whether to show error state |
| `errorMessage` | `string` | - | Error message to display |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size variant |
| `maxVisibleItems` | `number` | `6` | Maximum items to show in dropdown |
| `noResultsText` | `string` | `'No results found'` | Text shown when no matches |
| `style` | `ViewStyle` | - | Container style override |
| `testID` | `string` | `'autocomplete'` | Test identifier |

### AutocompleteOption

```typescript
interface AutocompleteOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}
```

## Usage

### Basic

```tsx
const [value, setValue] = useState<string | null>(null);

const options: AutocompleteOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

<Autocomplete
  value={value}
  onChange={setValue}
  options={options}
  placeholder="Select a fruit"
/>
```

### With Label and Error

```tsx
<Autocomplete
  value={value}
  onChange={setValue}
  options={options}
  label="Favorite Fruit"
  error={!value}
  errorMessage="Please select a fruit"
/>
```

### With Groups

```tsx
const groupedOptions: AutocompleteOption[] = [
  { label: 'Apple', value: 'apple', group: 'Fruits' },
  { label: 'Banana', value: 'banana', group: 'Fruits' },
  { label: 'Carrot', value: 'carrot', group: 'Vegetables' },
  { label: 'Broccoli', value: 'broccoli', group: 'Vegetables' },
];

<Autocomplete
  value={value}
  onChange={setValue}
  options={groupedOptions}
/>
```

### With Descriptions

```tsx
const optionsWithDesc: AutocompleteOption[] = [
  {
    label: 'React',
    value: 'react',
    description: 'A JavaScript library for building UIs',
  },
  {
    label: 'Vue',
    value: 'vue',
    description: 'The Progressive JavaScript Framework',
  },
  {
    label: 'Angular',
    value: 'angular',
    description: 'Platform for building mobile and desktop apps',
  },
];

<Autocomplete
  value={value}
  onChange={setValue}
  options={optionsWithDesc}
/>
```

### Sizes

```tsx
<Autocomplete size="small" {...props} />
<Autocomplete size="medium" {...props} />
<Autocomplete size="large" {...props} />
```

### Disabled State

```tsx
<Autocomplete
  value={value}
  onChange={setValue}
  options={options}
  disabled
/>
```

### With Disabled Options

```tsx
const options: AutocompleteOption[] = [
  { label: 'Available Option', value: 'available' },
  { label: 'Unavailable Option', value: 'unavailable', disabled: true },
];

<Autocomplete
  value={value}
  onChange={setValue}
  options={options}
/>
```

## Design Tokens

### Spacing
- Input padding: `spacing.component.input.paddingX` (16px), `spacing.component.input.paddingY` (12px)
- Label gap: `spacing.component.input.labelGap` (8px)
- Error message gap: `spacing.component.input.helperGap` (4px)
- List item padding: `spacing.component.list.itemPaddingX` (20px), `spacing.component.input.paddingY` (12px)
- Icon gap: `spacing.primitive[2]` (8px)
- Option content gap: `spacing.primitive[3]` (12px)
- Description margin: `spacing.primitive[1]` (4px)

### Radius
- Input container: `radius.component.input.default` (8px)
- Dropdown panel: `radius.component.card.md` (16px)

### Colors
- Input background: `colors.surface.base.default` (white)
- Input border (default): `colors.border.base.default` (#d6d9dd)
- Input border (focused): `colors.border.brand.default` (brand blue)
- Input border (error): `colors.border.error.default` (error red)
- Input text: `colors.content.base.default` (#3e4651)
- Placeholder: `colors.content.base.alternative` (#92999f)
- Disabled text: `colors.content.disabled.default` (#a7adb5)
- Disabled background: `colors.surface.base.alternative` (#f7f8f9)
- Icon color: `colors.content.base.secondary` (#68707a)
- Selected checkmark: `colors.content.brand.default` (brand blue)
- Option pressed: `colors.surface.base.container` (#eaebed)
- Group header background: `colors.surface.base.alternative` (#f7f8f9)
- Group header text: `colors.content.base.secondary` (#68707a)
- Option description: `colors.content.base.secondary` (#68707a)
- Modal overlay: `colors.overlay.dim` (rgba dark 40%)
- Dropdown background: `colors.surface.elevated.default` (white)

## Accessibility

- Full keyboard navigation support
- Screen reader compatible labels
- Disabled state clearly indicated
- Focus states visible
- Error messages announced
- Search icon provides visual affordance
- Clear button (X) available when value present
- Checkmark indicates selected state

## Behavior

- **Filter on type**: Options filter as user types in the input
- **Modal overlay**: Suggestions appear in centered modal for better mobile UX
- **Auto-close on select**: Modal closes and input blurs after selection
- **Clear functionality**: X button clears selection and refocuses input
- **Grouped options**: Supports section headers for categorized options
- **No results state**: Shows custom message when filter yields no matches
- **Disabled options**: Options with `disabled: true` are non-interactive
- **Size variants**: Three sizes (small/medium/large) adjust padding and font sizes
- **Max visible items**: Controls dropdown height (6 items default)
