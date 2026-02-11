# TextArea Component

Multi-line text input component for longer form content, based on Montage design system.

## Import

```typescript
// React Native
import { TextArea } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
import { TextArea } from '@baerae-zkap/design-system/native';
import { useState } from 'react';

function MyComponent() {
  const [text, setText] = useState('');

  return (
    <TextArea
      value={text}
      onChangeText={setText}
      label="Description"
      placeholder="Enter your text here..."
      resize="limited"
    />
  );
}
```

## Anatomy

The TextArea component consists of:

1. **Heading (Label)** - Optional text label above the input
2. **Required Badge (*)** - Red asterisk when field is required
3. **Field** - Multi-line text input area
4. **Placeholder** - Hint text when field is empty
5. **Description** - Helper text below the field
6. **Bottom Bar** - Optional leading/trailing content area
7. **Character Counter** - Shows current/max character count (e.g., "0/2000")

## Props

### Core Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | ✅ | - | Current text value |
| `onChangeText` | `(text: string) => void` | ✅ | - | Text change handler |
| `placeholder` | `string` | ❌ | - | Placeholder text |

### Label & Description

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | ❌ | - | Label text above input |
| `required` | `boolean` | ❌ | `false` | Show red * badge after label |
| `description` | `string` | ❌ | - | Helper text below input |
| `helperText` | `string` | ❌ | - | Alias for description (backward compat) |

### States

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `error` | `boolean` | ❌ | `false` | Error state (red border) |
| `errorMessage` | `string` | ❌ | - | Error message (replaces description) |
| `disabled` | `boolean` | ❌ | `false` | Disabled state (grey bg, opacity 0.38) |
| `readOnly` | `boolean` | ❌ | `false` | Read-only state (grey bg, not editable) |

### Resize Behavior

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `resize` | `'normal' \| 'limited' \| 'fixed'` | ❌ | `'limited'` | Height resize mode (see below) |
| `numberOfLines` | `number` | ❌ | `5` | Base number of lines for height calculation |
| `autoGrow` | `boolean` | ❌ | `false` | Legacy prop (maps to resize='normal') |

**Resize Modes:**

- **`normal`**: Unlimited auto-grow. Height increases infinitely with content. No scrolling.
- **`limited`**: Auto-grow with max height. Grows up to ~3 lines (102px default), then scrolls.
- **`fixed`**: Fixed height. Content scrolls inside when exceeds height.

### Height Control

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `height` | `number` | ❌ | - | Fixed height in pixels (overrides resize) |
| `minHeight` | `number` | ❌ | - | Minimum height in pixels |
| `maxHeight` | `number` | ❌ | `102` | Maximum height for resize='limited' |

### Character Count

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `maxLength` | `number` | ❌ | - | Maximum character length |
| `showCount` | `boolean` | ❌ | `false` | Show "current/max" counter |

### Bottom Bar

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `bottomLeading` | `ReactNode` | ❌ | - | Content for left side of bottom bar |
| `bottomTrailing` | `ReactNode` | ❌ | - | Content for right side of bottom bar |

**Note:** Character counter appears in `bottomTrailing` when `showCount` is true and no custom `bottomTrailing` is provided.

### Other

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `testID` | `string` | ❌ | - | Test identifier |
| `accessibilityLabel` | `string` | ❌ | - | Accessibility label |
| `style` | `ViewStyle` | ❌ | - | Custom container style |

## Foundation Tokens

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.component.input.paddingX` | 16px | Horizontal padding |
| `spacing.component.input.paddingY` | 12px | Vertical padding |
| `spacing.component.input.labelGap` | 8px | Label to input gap |
| `spacing.component.input.helperGap` | 4px | Input to helper text gap |

### Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `radius.component.input.default` | 8px | Border radius |

### Color Tokens

**Border Colors**

| State | Token | Value |
|-------|-------|-------|
| Default | `border.base.default` | `#cbd5e1` (palette.grey.90) |
| Focused | `border.brand.default` | `#2563eb` (palette.blue.50) |
| Error | `border.error.default` | `#ef4444` (palette.red.50) |
| Disabled | `border.disabled.default` | `#e2e8f0` (palette.grey.95) |

**Background Colors**

| State | Token | Value |
|-------|-------|-------|
| Default | `surface.base.default` | `#ffffff` (palette.static.white) |
| Disabled/ReadOnly | `surface.base.alternative` | `#f8fafc` (palette.grey.99) |

**Text Colors**

| Element | Token | Value |
|---------|-------|-------|
| Input text | `content.base.default` | `#334155` (palette.grey.30) |
| Placeholder | `content.base.placeholder` | `#94a3b8` (palette.grey.80) |
| Disabled text | `content.disabled.default` | `#94a3b8` (palette.grey.80) |
| Label | `content.base.default` | `#334155` (palette.grey.30) |
| Required badge | `content.error.default` | `#ef4444` (palette.red.50) |
| Description | `content.base.secondary` | `#64748b` (palette.grey.60) |
| Error message | `content.error.default` | `#ef4444` (palette.red.50) |
| Character count | `content.base.secondary` | `#64748b` (palette.grey.60) |

## Usage Examples

### Basic with Label

```tsx
<TextArea
  value={text}
  onChangeText={setText}
  label="Description"
  placeholder="Enter your description..."
  resize="limited"
/>
```

### Required Field

```tsx
<TextArea
  value={text}
  onChangeText={setText}
  label="Feedback"
  required
  placeholder="Your feedback is important to us"
  description="Please share your thoughts"
/>
```

### With Character Count

```tsx
<TextArea
  value={comment}
  onChangeText={setComment}
  label="Comment"
  placeholder="Write your comment..."
  maxLength={500}
  showCount
  description="Maximum 500 characters"
/>
```

### Error State

```tsx
<TextArea
  value={text}
  onChangeText={setText}
  label="Required Field"
  required
  placeholder="Enter text..."
  error
  errorMessage="This field is required"
/>
```

### Resize Modes

```tsx
{/* Normal: Unlimited auto-grow */}
<TextArea
  value={text}
  onChangeText={setText}
  label="Unlimited Growth"
  resize="normal"
  numberOfLines={3}
/>

{/* Limited: Auto-grow up to max height */}
<TextArea
  value={text}
  onChangeText={setText}
  label="Limited Growth"
  resize="limited"
  numberOfLines={3}
  maxHeight={120}
/>

{/* Fixed: Scrollable content */}
<TextArea
  value={text}
  onChangeText={setText}
  label="Fixed Height"
  resize="fixed"
  numberOfLines={5}
/>
```

### Custom Heights

```tsx
{/* Fixed height */}
<TextArea
  value={text}
  onChangeText={setText}
  label="Fixed 150px"
  height={150}
/>

{/* Min-max range */}
<TextArea
  value={text}
  onChangeText={setText}
  label="60-200px range"
  resize="limited"
  minHeight={60}
  maxHeight={200}
/>
```

### Bottom Bar Content

```tsx
<TextArea
  value={text}
  onChangeText={setText}
  label="Description"
  bottomLeading={
    <Text style={{ fontSize: 12, color: '#6b7280' }}>
      Min 10 characters
    </Text>
  }
  bottomTrailing={
    <Text style={{ fontSize: 12, color: '#2563eb' }}>
      Formatting help
    </Text>
  }
/>
```

### Disabled vs Read-only

```tsx
{/* Disabled: Grey bg, opacity 0.38, not editable */}
<TextArea
  value="Disabled text"
  onChangeText={() => {}}
  label="Disabled Field"
  disabled
  description="Cannot be edited"
/>

{/* Read-only: Grey bg, normal opacity, not editable */}
<TextArea
  value="Read-only text"
  onChangeText={() => {}}
  label="Read-only Field"
  readOnly
  description="Display only"
/>
```

### Form Example

```tsx
function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [details, setDetails] = useState('');

  return (
    <View style={{ gap: 20 }}>
      <TextArea
        value={feedback}
        onChangeText={setFeedback}
        label="Overall Feedback"
        required
        placeholder="What do you think?"
        description="Share your honest opinion"
        resize="limited"
        numberOfLines={3}
      />

      <TextArea
        value={details}
        onChangeText={setDetails}
        label="Details"
        placeholder="Any additional context..."
        resize="normal"
        numberOfLines={5}
        maxLength={500}
        showCount
      />
    </View>
  );
}
```

## Best Practices

### When to Use

- **Long-form text input**: Use for multi-line text entry like descriptions, comments, or feedback
- **Variable or fixed height**: Choose resize mode based on layout constraints
- **Character limits**: Use maxLength and showCount for constrained input fields
- **Validation feedback**: Use error state and errorMessage for form validation

### Resize Mode Selection

| Scenario | Recommended Mode | Why |
|----------|-----------------|-----|
| Short responses (1-3 lines) | `limited` | Prevents excessive growth, clean layout |
| Long content (articles, feedback) | `normal` | User sees all content, no scrolling |
| Constrained layouts (modals) | `fixed` | Maintains consistent height |
| Unknown content length | `limited` | Balance between flexibility and space |

### Accessibility

- Always provide a `label` for screen readers
- Use `accessibilityLabel` when label prop is not sufficient
- Error messages are automatically announced to screen readers
- Focus states have appropriate contrast ratios
- `required` badge is announced as "required field"

### Label Guidelines

- **Always include a label** for form inputs (improves accessibility)
- Use clear, concise labels that describe the expected input
- Keep labels short (1-3 words)
- Use `required` prop instead of adding "(required)" to label text

### Description Guidelines

- Use description to provide guidance or context
- errorMessage automatically replaces description when error=true
- Keep description brief and actionable
- Examples: "Be specific", "Maximum 500 characters", "Optional field"

### Character Count

- Only show character count when there's a meaningful limit (maxLength)
- Use for fields where length matters (e.g., comments, bios)
- Display format: "current / max" (e.g., "42 / 500")
- Counter appears in bottom bar on the right side

### Bottom Bar

- Use `bottomLeading` for left-aligned hints (e.g., "Min 10 characters")
- Use `bottomTrailing` for right-aligned actions (e.g., "Formatting help")
- Character counter auto-populates `bottomTrailing` when `showCount` is true
- Bottom bar only appears when content is provided

## Design Principles

1. **Clear Hierarchy**: Label → Field → Description flow with consistent spacing
2. **State Indication**: Border color clearly indicates focus, error, disabled, read-only states
3. **Flexible Sizing**: Three resize modes cover all common use cases
4. **User Guidance**: Required badges, character counters, and descriptions guide input
5. **Accessibility First**: Labels, ARIA attributes, and clear focus states ensure inclusivity

## Related Components

- **TextField**: For single-line text input
- **SearchField**: Specialized input for search functionality
- **Select**: For dropdown selection instead of text input
