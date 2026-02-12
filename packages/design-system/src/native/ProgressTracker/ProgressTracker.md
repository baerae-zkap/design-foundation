# ProgressTracker

A step indicator component that visualizes progress through sequential steps with numbered circles, labels, and connector lines.

## Import

```typescript
import { ProgressTracker } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `ProgressTrackerStep[]` | **Required** | Array of step objects with label and optional description |
| `currentStep` | `number` | **Required** | Index of the current step (0-indexed) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the tracker |
| `style` | `ViewStyle` | - | Custom container styles |
| `testID` | `string` | `'progress-tracker'` | Test identifier |

### ProgressTrackerStep Type

```typescript
type ProgressTrackerStep = {
  label: string;         // Step title/name
  description?: string;  // Optional additional detail
};
```

## Step States

Each step has one of three states based on its position relative to `currentStep`:

- **Completed** (index < currentStep): Blue circle with white check icon
- **Current** (index === currentStep): Blue circle with white step number
- **Upcoming** (index > currentStep): Gray circle with gray step number

## Usage Examples

### Basic Usage (3 Steps)

```tsx
<ProgressTracker
  steps={[
    { label: 'Personal Info' },
    { label: 'Address' },
    { label: 'Confirmation' },
  ]}
  currentStep={1}
/>
```

### With Descriptions

```tsx
<ProgressTracker
  steps={[
    { label: 'Account Setup', description: 'Create your credentials' },
    { label: 'Profile Details', description: 'Tell us about yourself' },
    { label: 'Preferences', description: 'Customize your experience' },
  ]}
  currentStep={0}
/>
```

### Vertical Layout

```tsx
<ProgressTracker
  steps={[
    { label: 'Order Placed' },
    { label: 'Processing' },
    { label: 'Shipped' },
    { label: 'Delivered' },
  ]}
  currentStep={2}
  orientation="vertical"
/>
```

### All Steps Completed

```tsx
<ProgressTracker
  steps={[
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]}
  currentStep={3} // Beyond last step = all completed
/>
```

### First Step Active

```tsx
<ProgressTracker
  steps={[
    { label: 'Start' },
    { label: 'Middle' },
    { label: 'End' },
  ]}
  currentStep={0} // First step is current
/>
```

## Design Tokens Used

### Spacing
- `spacing.primitive[1]` (4px) - Description margin top
- `spacing.primitive[2]` (8px) - Label margin top (horizontal)
- `spacing.primitive[3]` (12px) - Gap between circle and label (vertical)

### Radius
- `radius.primitive.full` (9999px) - Step circle border radius

### Colors
- Active circle (completed/current): `colors.surface.brand.default` (#0066ff)
- Upcoming circle: `colors.surface.base.container` (#eaebed)
- Completed/current label: `colors.content.base.strong` (#131a1f)
- Upcoming label: `colors.content.base.alternative` (#92999f)
- Description text: `colors.content.base.secondary` (#68707a)
- Active connector: `colors.surface.brand.default` (#0066ff)
- Inactive connector: `colors.border.base.default` (#d6d9dd)
- Check icon: `colors.content.base.onColor` (white)

## Accessibility

- Each step is numbered sequentially for clarity
- Completed steps use check icons for quick visual recognition
- High contrast between active and inactive states
- Text labels provide context for each step
- Optional descriptions add additional clarity
- Test IDs include step indices for automation testing

## Best Practices

1. **Step Count**: Use 3-5 steps for optimal user comprehension
2. **Labels**: Keep step labels short and action-oriented
3. **Descriptions**: Use for additional context, not redundant information
4. **Horizontal**: Best for top-of-page progress indicators
5. **Vertical**: Best for sidebar navigation or timeline views
6. **Current Step**: Ensure `currentStep` index is always valid (0 to steps.length)
7. **Completion**: Set `currentStep` to `steps.length` to show all steps completed

## Layout Behavior

### Horizontal Orientation
- Steps arranged in a row with equal flex distribution
- Connectors fill space between circles
- Labels centered below each circle
- Best for 3-4 steps with short labels

### Vertical Orientation
- Steps stacked vertically
- Circles aligned left with labels to the right
- Connectors connect circles vertically
- Better for mobile or narrow layouts
- Supports longer labels and descriptions

## Visual States

| State | Circle | Number/Icon | Label Color |
|-------|--------|-------------|-------------|
| Completed | Brand blue | White check | Strong |
| Current | Brand blue | White number | Strong |
| Upcoming | Light gray | Gray number | Alternative |

Connectors between completed steps are brand blue; others are light gray.
