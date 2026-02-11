# PushBadge Component

알림, 새 메시지 등을 표시하는 작은 원형 뱃지 컴포넌트입니다. 점만 표시하거나 숫자를 포함할 수 있습니다.

## Import

```typescript
// React Native
import { PushBadge } from '@baerae-zkap/design-system/native';
```

## Basic Usage

### Dot Mode (숫자 없이 점만 표시)

```tsx
// 기본 dot 모드 - 빨간색 중간 크기
<PushBadge />

// 크기 변경
<PushBadge size="small" />
<PushBadge size="medium" />
<PushBadge size="large" />

// 색상 변경
<PushBadge color="red" />
<PushBadge color="blue" />
<PushBadge color="green" />
```

### Count Mode (숫자 표시)

```tsx
// 기본 count 모드
<PushBadge count={5} />

// 최대값 설정 (99 이상은 "99+"로 표시)
<PushBadge count={150} maxCount={99} />

// 색상 변경
<PushBadge count={3} color="blue" />
<PushBadge count={7} color="green" />
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `count` | `number` | No | `undefined` | 표시할 숫자. 제공 시 count 모드, 미제공 시 dot 모드 |
| `size` | `'small' \| 'medium' \| 'large'` | No | `'medium'` | 크기 (dot 모드에만 적용) |
| `color` | `'red' \| 'blue' \| 'green'` | No | `'red'` | 색상 테마 |
| `maxCount` | `number` | No | `99` | 최대 표시 숫자 (이상일 경우 "99+" 등으로 표시) |
| `style` | `ViewStyle` | No | - | 커스텀 스타일 |
| `testID` | `string` | No | - | 테스트 ID |
| `accessibilityLabel` | `string` | No | - | 접근성 라벨 (기본: "notification indicator" 또는 "{count} notifications") |

## Variants

### Dot Mode (점 표시)

숫자 없이 알림 여부만 표시할 때 사용합니다.

- **small**: 6px 원형
- **medium**: 8px 원형
- **large**: 10px 원형

```tsx
<PushBadge size="small" color="red" />
<PushBadge size="medium" color="blue" />
<PushBadge size="large" color="green" />
```

### Count Mode (숫자 표시)

알림 개수를 명확히 표시해야 할 때 사용합니다.

- **1자리**: 16px 완전한 원형 (padding 없음)
- **2자리**: 18px 약간 넓은 원형 (padding 4px)
- **3자리 이상**: 20px "99+" 형식 (padding 4px)

```tsx
<PushBadge count={5} />
<PushBadge count={42} />
<PushBadge count={150} maxCount={99} />
```

## Colors

| Color | Value | Usage |
|-------|-------|-------|
| `red` | `#ef4444` | 긴급 알림, 에러 (default) |
| `blue` | `#0060f0` | 일반 알림, 정보 |
| `green` | `#22c55e` | 성공, 완료 알림 |

## Foundation Tokens

### Dot Mode

| Property | Token | Value |
|----------|-------|-------|
| borderRadius | `primitive.full` | 9999px (완전한 원형) |
| small width/height | - | 6px |
| medium width/height | - | 8px |
| large width/height | - | 10px |

### Count Mode

| Property | Token | Value |
|----------|-------|-------|
| borderRadius | `primitive.full` | 9999px (완전한 원형) |
| 1자리 size | - | 16px |
| 2자리 size | - | 18px |
| 3자리+ size | - | 20px |
| paddingX (2자리+) | - | 4px |
| fontSize (1-2자리) | - | 10px |
| fontSize (3자리+) | - | 9px |
| fontFamily | `typography.fontFamily.numeric` | Spoqa Han Sans Neo |
| fontWeight | `typography.fontWeight.bold` | 700 |
| textColor | `colors.content.base.onColor` | #ffffff |

## Usage Guidelines

### When to Use

| Scenario | Recommended |
|----------|-------------|
| 아이콘 우측 상단에 알림 표시 | ✅ Dot mode |
| 읽지 않은 메시지 개수 표시 | ✅ Count mode |
| 탭바 알림 표시 | ✅ Dot mode (공간 제약 시) |
| 정확한 개수 전달 필요 | ✅ Count mode |

### Best Practices

1. **Dot Mode 사용 시**
   - 알림 여부만 중요할 때 사용
   - 공간이 제한적인 UI에서 사용
   - 색상으로 우선순위 구분 (red > blue > green)

2. **Count Mode 사용 시**
   - 개수가 중요한 정보일 때 사용
   - maxCount 기본값(99) 유지 권장
   - 숫자가 너무 커지면 "99+" 형식으로 제한

3. **색상 선택**
   - **red**: 긴급 알림, 에러 (기본값)
   - **blue**: 일반 알림, 정보
   - **green**: 성공, 완료 알림

4. **아이콘과 조합**
   ```tsx
   <View style={{ position: 'relative' }}>
     <Icon name="bell" size={24} />
     <View style={{ position: 'absolute', top: -4, right: -4 }}>
       <PushBadge count={5} />
     </View>
   </View>
   ```

## Accessibility

1. **기본 접근성 라벨 제공**
   - Dot mode: "notification indicator"
   - Count mode: "{count} notifications"

2. **커스텀 라벨 지원**
   ```tsx
   <PushBadge
     count={5}
     accessibilityLabel="5개의 읽지 않은 메시지"
   />
   ```

3. **testID 제공**
   ```tsx
   <PushBadge
     count={3}
     testID="notification-badge"
   />
   ```

## Examples

### 알림 아이콘에 뱃지 표시

```tsx
<View style={{ position: 'relative', width: 24, height: 24 }}>
  <Icon name="bell" size={24} color="#334155" />
  <View style={{ position: 'absolute', top: -4, right: -4 }}>
    <PushBadge count={3} color="red" />
  </View>
</View>
```

### 탭바 알림 표시

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
  <Icon name="home" size={20} />
  <PushBadge size="small" color="red" />
</View>
```

### 대량 알림 표시

```tsx
<PushBadge count={999} maxCount={99} />
// 결과: "99+"
```

## Design Principles

1. **Minimal & Clear**: 최소한의 공간으로 명확한 정보 전달
2. **Auto-sizing**: Count mode에서 숫자 자릿수에 따라 자동 크기 조정
3. **Color-coded**: 색상으로 알림 우선순위 전달
4. **Perfect Circle**: 모든 모드에서 완전한 원형 유지
