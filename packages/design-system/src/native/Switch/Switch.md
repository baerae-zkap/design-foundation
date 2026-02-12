# Switch Component

On/Off 상태를 토글하는 스위치 컴포넌트입니다.

## Overview

Switch는 설정 또는 옵션의 활성화/비활성화를 제어하는 데 사용됩니다. 즉각적인 피드백과 부드러운 애니메이션을 제공합니다.

## Import

```typescript
// React Native
import { Switch } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Switch } from '@baerae-zkap/design-system/native';

function Example() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      value={isEnabled}
      onValueChange={setIsEnabled}
      size="medium"
    />
  );
}
```

## Props

### SwitchProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | **required** | Switch의 On/Off 상태 |
| `onValueChange` | `(value: boolean) => void` | **required** | 상태 변경 시 호출되는 핸들러 |
| `label` | `string` | - | 스위치 옆에 표시할 라벨 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 스위치 크기 |
| `testID` | `string` | - | 테스트 식별자 |
| `accessibilityLabel` | `string` | - | 접근성 라벨 (기본값: label prop) |
| `style` | `ViewStyle` | - | 컨테이너 커스텀 스타일 |

## Variants

### Sizes

| Size | Track Size | Thumb Size | Usage |
|------|-----------|-----------|--------|
| `small` | 36x20px | 16px | 테이블, 리스트 등 조밀한 UI |
| `medium` | 44x24px | 20px | 일반적인 설정 화면 (권장) |
| `large` | 52x28px | 24px | 중요한 시스템 설정 |

**Example:**

```tsx
<Switch size="small" value={value} onValueChange={setValue} />
<Switch size="medium" value={value} onValueChange={setValue} />
<Switch size="large" value={value} onValueChange={setValue} />
```

### States

**Off (비활성):**
- Track: 회색 (#cbd5e1)
- Thumb: 왼쪽 위치

**On (활성):**
- Track: 브랜드 컬러 (#2563eb)
- Thumb: 오른쪽 위치

**Disabled:**
- Opacity 50%
- 상호작용 불가

```tsx
<Switch value={false} onValueChange={setValue} />
<Switch value={true} onValueChange={setValue} />
<Switch value={true} onValueChange={setValue} disabled />
```

### With Label

```tsx
<Switch
  value={notifications}
  onValueChange={setNotifications}
  label="알림 받기"
/>
```

## Design Tokens

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.primitive.3` | 12px | 스위치와 라벨 사이 간격 |
| Track padding | 2px | Thumb의 상하좌우 여백 |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.semantic.button.pill` | 9999px | Track 완전 라운드 |
| `radius.semantic.button.pill` | 9999px | Thumb 완전 라운드 |

### Colors

| Element | State | Color | Token |
|---------|-------|-------|-------|
| Track | Off | `#cbd5e1` | palette.grey.90 |
| Track | On | `#2563eb` | surface.brand.default |
| Track | Disabled | `#e2e8f0` | surface.disabled.default |
| Thumb | All | `#ffffff` | palette.static.white |
| Label | Normal | `#334155` | content.base.default |
| Label | Disabled | `#94a3b8` | content.disabled.default |

### Animation

- **Duration**: Spring animation (자연스러운 탄성)
- **Damping**: 15
- **Stiffness**: 150

## Usage Guidelines

### When to Use

✅ **시스템 설정 토글**
```tsx
<Switch value={darkMode} onValueChange={setDarkMode} label="다크 모드" />
```

✅ **기능 활성화/비활성화**
```tsx
<Switch value={notifications} onValueChange={setNotifications} label="푸시 알림" />
```

✅ **옵션 선택 (On/Off 형식)**
```tsx
<Switch value={autoSave} onValueChange={setAutoSave} label="자동 저장" />
```

### When Not to Use

❌ **여러 선택지 중 하나 선택** → Radio Button 사용
❌ **다단계 상태** → Segmented Control 사용
❌ **작업 확인** → Button 사용

### Best Practices

1. **라벨 위치**: 스위치는 오른쪽, 라벨은 왼쪽 (Montage 가이드)
2. **즉시 반영**: 스위치 토글 시 즉시 설정 적용 (확인 버튼 불필요)
3. **크기 선택**:
   - `medium`: 일반 설정 화면 (권장)
   - `small`: 테이블/리스트의 반복 노출
   - `large`: 중요한 시스템 설정

4. **접근성**: accessibilityLabel 또는 label prop 제공

## Accessibility

| Feature | Implementation |
|---------|---------------|
| Role | `switch` |
| State | `checked: boolean`, `disabled: boolean` |
| Label | `accessibilityLabel` 또는 `label` prop |
| Keyboard | 키보드 네비게이션 지원 |

## Examples

### 설정 화면

```tsx
function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });

  return (
    <View style={{ gap: 20 }}>
      <Switch
        value={settings.notifications}
        onValueChange={(v) => setSettings({ ...settings, notifications: v })}
        label="알림 받기"
      />
      <Switch
        value={settings.marketing}
        onValueChange={(v) => setSettings({ ...settings, marketing: v })}
        label="마케팅 정보 수신"
      />
      <Switch
        value={settings.analytics}
        onValueChange={(v) => setSettings({ ...settings, analytics: v })}
        label="분석 데이터 수집"
      />
    </View>
  );
}
```

### 리스트 아이템

```tsx
function ListItem({ title, value, onValueChange }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
      <Text>{title}</Text>
      <Switch size="small" value={value} onValueChange={onValueChange} />
    </View>
  );
}
```

## Platform Notes

- **iOS**: Native toggle 스타일 사용 가능
- **Android**: 커스텀 Switch 컴포넌트
- **Web**: React Native Web에서 동일하게 동작

## Related Components

- **Checkbox**: 다중 선택 시
- **Radio**: 단일 선택 시
- **ToggleGroup**: 여러 옵션 중 하나 선택 시
