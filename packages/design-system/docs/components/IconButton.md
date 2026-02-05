# IconButton Component

> 아이콘만으로 구성된 원형 버튼입니다.

## Quick Reference

```tsx
// Web
import { IconButton } from '@baerae-zkap/design-system';
<IconButton
  variant="ghost"
  color="baseDefault"
  size="medium"
  onClick={() => {}}
>
  <PlusIcon />
</IconButton>

// React Native
import { IconButton } from '@baerae-zkap/design-system/native';
<IconButton
  variant="ghost"
  color="baseDefault"
  size="medium"
  onPress={() => {}}
>
  <PlusIcon />
</IconButton>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"filled"` \| `"ghost"` \| `"outlined"` | `"ghost"` | | 스타일 변형 |
| `color` | `"brandDefault"` \| `"baseDefault"` \| `"errorDefault"` | `"baseDefault"` | | 색상 테마 |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 크기 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `children` | `ReactNode` | - | ✅ | 아이콘 콘텐츠 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(event) => void` | 탭 핸들러 |
| `onLongPress` | `(event) => void` | 길게 누르기 핸들러 |

## Variants

| Variant | 용도 | 특징 |
|---------|------|------|
| `ghost` | 기본, 보조 액션 | 투명 배경, hover/press 시 배경 표시 |
| `filled` | 강조 액션 | 채워진 배경 |
| `outlined` | 대체 스타일 | 테두리만 표시 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Size (small) | - | 32px |
| Size (medium) | - | 40px |
| Size (large) | - | 48px |
| Icon Size (small) | - | 18px |
| Icon Size (medium) | - | 22px |
| Icon Size (large) | - | 26px |
| Border Radius | - | 9999px (circular) |

## Color Values

### Filled Variant
| Color | Background | Pressed | Icon |
|-------|------------|---------|------|
| `brandDefault` | `#2563eb` | `#1d4ed8` | `white` |
| `baseDefault` | `#334155` | `#1e293b` | `white` |
| `errorDefault` | `#ef4444` | `#dc2626` | `white` |

### Ghost Variant
| Color | Background | Hover | Pressed | Icon | Icon Pressed |
|-------|------------|-------|---------|------|--------------|
| `brandDefault` | transparent | `rgba(37,99,235,0.08)` | `rgba(37,99,235,0.12)` | `#2563eb` | `#1d4ed8` |
| `baseDefault` | transparent | `rgba(0,0,0,0.04)` | `rgba(0,0,0,0.08)` | `#334155` | `#1e293b` |
| `errorDefault` | transparent | `rgba(239,68,68,0.08)` | `rgba(239,68,68,0.12)` | `#ef4444` | `#dc2626` |

### Outlined Variant
| Color | Background | Pressed | Border | Icon |
|-------|------------|---------|--------|------|
| `brandDefault` | `white` | `#eff6ff` | `#2563eb` | `#2563eb` |
| `baseDefault` | `white` | `#f8fafc` | `#cbd5e1` | `#334155` |
| `errorDefault` | `white` | `#fef2f2` | `#ef4444` | `#dc2626` |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Hover | 마우스 오버 (ghost만) | 배경 표시 |
| Pressed | 누르고 있는 상태 | 배경 어두워짐 |
| Disabled | 비활성화 | opacity: 0.5 |

## Usage Guidelines

### 사용 시기
- 텍스트 없이 아이콘만으로 액션을 표현할 때
- 공간이 제한된 영역에서 (툴바, 네비게이션 등)
- 반복적인 액션 버튼 (닫기, 더보기 등)

### Variant 선택 기준
| 상황 | Variant | 예시 |
|------|---------|------|
| 일반적인 액션 | `ghost` | 닫기, 메뉴, 공유 |
| 주요 액션 강조 | `filled` | 추가, 작성, 전송 |
| 보조 액션 | `outlined` | 설정, 편집 |

## Accessibility

1. **Touch Target**: 최소 32px 이상의 터치 영역 확보
2. **hitSlop**: React Native에서 8px의 추가 터치 영역 제공
3. **Disabled State**: `accessibilityState.disabled` 또는 `aria-disabled` 설정
4. **Label**: 아이콘만 있으므로 `aria-label` 또는 `accessibilityLabel` 필수 권장

## Do & Don't

### ✅ Do
- 아이콘에 적절한 접근성 라벨 제공
- 일관된 크기와 스타일 사용
- 충분한 터치 영역 확보

### ❌ Don't
- 텍스트와 함께 사용하지 않기 (Button 사용)
- 너무 작은 크기 사용 금지 (최소 32px)
- 의미 불분명한 아이콘 사용 금지

## Code Examples

### Basic Usage
```tsx
<IconButton onPress={() => {}}>
  <CloseIcon />
</IconButton>
```

### Variants
```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <IconButton variant="ghost" onPress={() => {}}>
    <MenuIcon />
  </IconButton>
  <IconButton variant="filled" color="brandDefault" onPress={() => {}}>
    <PlusIcon />
  </IconButton>
  <IconButton variant="outlined" onPress={() => {}}>
    <SettingsIcon />
  </IconButton>
</View>
```

### Sizes
```tsx
<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
  <IconButton size="small" onPress={() => {}}>
    <CloseIcon size={18} />
  </IconButton>
  <IconButton size="medium" onPress={() => {}}>
    <CloseIcon size={22} />
  </IconButton>
  <IconButton size="large" onPress={() => {}}>
    <CloseIcon size={26} />
  </IconButton>
</View>
```

### With Accessibility Label
```tsx
<IconButton
  onPress={() => {}}
  accessibilityLabel="닫기"
>
  <CloseIcon />
</IconButton>
```
