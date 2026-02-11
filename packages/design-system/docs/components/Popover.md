# Popover

트리거 요소에 앵커된 플로팅 패널 컴포넌트입니다. 메뉴 아이템뿐만 아니라 임의의 콘텐츠를 포함할 수 있습니다.

## Import

```typescript
// React Native
import { Popover } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `trigger` | `React.ReactNode` | ✅ | - | 팝오버를 여는 트리거 요소 |
| `children` | `React.ReactNode` | ✅ | - | 팝오버 내부 콘텐츠 |
| `visible` | `boolean` | ❌ | - | 제어 모드: 표시 여부 |
| `onVisibleChange` | `(visible: boolean) => void` | ❌ | - | 표시 상태 변경 핸들러 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | ❌ | `'bottom'` | 팝오버 배치 위치 |
| `showArrow` | `boolean` | ❌ | `true` | 화살표 표시 여부 |
| `style` | `ViewStyle` | ❌ | - | 컨테이너 커스텀 스타일 |
| `contentStyle` | `ViewStyle` | ❌ | - | 콘텐츠 패널 커스텀 스타일 |
| `testID` | `string` | ❌ | - | 테스트 ID |

## Usage Examples

### Basic Usage

```tsx
import { Popover, Button } from '@baerae-zkap/design-system/native';
import { Text, View } from 'react-native';

<Popover
  trigger={<Button buttonType="filled" color="brandDefault">Open</Button>}
>
  <Text>Popover content</Text>
</Popover>
```

### With Custom Content

```tsx
<Popover
  trigger={<Button buttonType="filled" color="baseContainer">Menu</Button>}
  placement="bottom"
>
  <View style={{ gap: 12 }}>
    <Text style={{ fontSize: 14 }}>Profile Settings</Text>
    <Text style={{ fontSize: 14 }}>Account</Text>
    <Text style={{ fontSize: 14 }}>Logout</Text>
  </View>
</Popover>
```

### Controlled Mode

```tsx
const [visible, setVisible] = useState(false);

<Popover
  trigger={<Button buttonType="filled" color="brandDefault">Toggle</Button>}
  visible={visible}
  onVisibleChange={setVisible}
>
  <Text>Controlled popover</Text>
</Popover>
```

### Different Placements

```tsx
<Popover
  trigger={<Button>Top</Button>}
  placement="top"
>
  <Text>Top popover</Text>
</Popover>

<Popover
  trigger={<Button>Right</Button>}
  placement="right"
>
  <Text>Right popover</Text>
</Popover>
```

### Without Arrow

```tsx
<Popover
  trigger={<Button>No Arrow</Button>}
  showArrow={false}
>
  <Text>Popover without arrow</Text>
</Popover>
```

## Design Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `colors.surface.elevated.default` | `#ffffff` | 팝오버 배경색 |
| `radius.component.card.md` | `16px` | 팝오버 모서리 반경 |
| `spacing.semantic.inset.sm` | `16px` | 팝오버 내부 패딩 |
| `palette.static.black` | `#000000` | 그림자 색상 |

## Behavior

### Interaction
- **트리거 클릭**: 팝오버 열기
- **외부 클릭**: 팝오버 닫기
- **ESC 키**: 팝오버 닫기 (모바일 백버튼)

### Animation
- **Fade in**: 0ms → 150ms (opacity 0→1, scale 0.95→1)
- **Fade out**: 즉시 (opacity 0)

### Positioning
- React Native Modal을 사용하여 중앙 정렬
- `placement` prop은 화살표 방향을 결정

## Accessibility

- `accessibilityRole="button"` on trigger
- `accessibilityState={{ expanded }}` 현재 상태 전달
- Modal의 `onRequestClose`로 백버튼 지원

## Related Components

- **Tooltip**: 간단한 정보 표시용
- **Menu**: 선택 가능한 메뉴 아이템
- **BottomSheet**: 모바일에서 하단에서 올라오는 패널
