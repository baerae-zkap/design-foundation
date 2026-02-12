# TimePicker Component

## Overview

시간을 선택하는 컴포넌트입니다. iOS 스타일의 휠 피커를 사용하여 시간과 분을 선택할 수 있습니다.

## Component Type

**Category**: Selection and input
**Platform**: React Native

## Props

```typescript
export interface TimePickerProps {
  /** 선택된 시간 */
  value: Date | null;
  /** 변경 핸들러 */
  onChange: (date: Date) => void;
  /** 12시간제 또는 24시간제 */
  mode?: '12h' | '24h';
  /** 분 간격 */
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  /** 라벨 */
  label?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}
```

## Design Tokens

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.component.input.paddingX` | 16px | Trigger horizontal padding |
| `spacing.component.input.labelGap` | 8px | Label-input gap |
| `spacing.semantic.horizontal.2xs` | 8px | Icon gap |
| `spacing.semantic.horizontal.sm` | 16px | Picker wheel gap |
| `spacing.semantic.bottomSheet.padding` | 20px | Modal padding |
| `spacing.semantic.bottomSheet.handleGap` | 16px | Handle-content gap |
| `spacing.component.modal.buttonGap` | 12px | Action button gap |
| `spacing.primitive.6` | 24px | Section spacing |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.semantic.input.default` | 8px | Trigger border radius |
| `radius.semantic.button.lg` | 12px | Action button radius |
| `radius.semantic.bottomSheet.default` | 20px | Modal top corners |

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `surface.base.default` | #ffffff | Background |
| `surface.disabled.secondary` | #f8fafc | Disabled background |
| `surface.base.hover` | #f8fafc | Pressed background |
| `surface.brand.default` | #2563eb | Confirm button |
| `surface.brand.defaultPressed` | #1d4ed8 | Confirm button pressed |
| `surface.base.container` | #f1f5f9 | Cancel button |
| `surface.base.containerPressed` | #e2e8f0 | Cancel button pressed |
| `border.base.default` | #cbd5e1 | Default border |
| `border.disabled.default` | #e2e8f0 | Disabled border |
| `content.base.default` | #334155 | Primary text |
| `content.base.placeholder` | #94a3b8 | Placeholder text |
| `content.base.secondary` | #64748b | Secondary text |
| `content.brand.default` | #2563eb | Selected text |
| `content.base.onColor` | #ffffff | Text on dark background |
| `content.disabled.default` | #94a3b8 | Disabled text |

## Usage Examples

### Basic Usage

```tsx
import { TimePicker } from '@baerae-zkap/design-system/native';

function Example() {
  const [time, setTime] = useState<Date | null>(null);

  return (
    <TimePicker
      label="Appointment Time"
      placeholder="Select time"
      value={time}
      onChange={setTime}
    />
  );
}
```

### 12h vs 24h Mode

```tsx
// 12-hour format (default)
<TimePicker
  label="Meeting Time"
  mode="12h"
  value={time}
  onChange={setTime}
/>

// 24-hour format
<TimePicker
  label="Departure Time"
  mode="24h"
  value={time}
  onChange={setTime}
/>
```

### Minute Intervals

```tsx
// 1-minute intervals (default)
<TimePicker minuteInterval={1} value={time} onChange={setTime} />

// 5-minute intervals
<TimePicker minuteInterval={5} value={time} onChange={setTime} />

// 15-minute intervals
<TimePicker minuteInterval={15} value={time} onChange={setTime} />

// 30-minute intervals
<TimePicker minuteInterval={30} value={time} onChange={setTime} />
```

### Sizes

```tsx
// Small
<TimePicker size="small" value={time} onChange={setTime} />

// Medium (default)
<TimePicker size="medium" value={time} onChange={setTime} />

// Large
<TimePicker size="large" value={time} onChange={setTime} />
```

### With Label

```tsx
<TimePicker
  label="Start Time"
  placeholder="Select start time"
  value={time}
  onChange={setTime}
/>
```

### Disabled State

```tsx
<TimePicker
  label="Time"
  value={time}
  onChange={setTime}
  disabled
/>
```

## Component Behavior

### Time Selection

1. **Trigger Click**: Opens bottom sheet modal
2. **Wheel Interaction**: Scroll or tap to select hour, minute, and period (12h mode)
3. **Confirm**: Applies selected time and closes modal
4. **Cancel**: Closes modal without applying changes

### Time Format

- **12h mode**: `h:MM AM/PM` (e.g., "2:30 PM")
- **24h mode**: `HH:MM` (e.g., "14:30")

### Default Values

- If `value` is null, defaults to current time when modal opens
- Minutes snap to nearest interval based on `minuteInterval` prop

## Accessibility

- Trigger has `accessibilityRole="button"`
- Trigger has `accessibilityState` for disabled state
- Custom `accessibilityLabel` can be provided
- Modal closes on backdrop press or cancel button

## Best Practices

### When to Use

- Appointment scheduling
- Alarm or reminder settings
- Event time input
- Time range selection

### Usage Guidelines

| Do | Don't |
|----|-------|
| Use appropriate mode (12h/24h) based on locale | Mix time formats in the same UI |
| Set minute intervals for scheduling contexts | Use 1-minute intervals for all cases |
| Provide clear labels | Use placeholder as the only label |
| Show selected time in consistent format | Change format after selection |

## Design Principles

1. **Familiar Interaction**: iOS-style wheel picker for native feel
2. **Clear Feedback**: Selected value highlighted in blue
3. **Flexible Configuration**: Supports 12h/24h modes and minute intervals
4. **Consistent Styling**: Uses Foundation tokens for spacing, radius, and colors

## Implementation Notes

- Uses custom ScrollView-based wheel pickers (no external dependencies)
- Modal appears as bottom sheet with handle
- Time state managed with separate hour/minute/period values
- Converts between 12h/24h formats internally
- Foundation tokens used for all spacing, radius, and color values
