# Tooltip

트리거 요소에 앵커된 작은 정보 툴팁 컴포넌트입니다. 어두운 배경에 밝은 텍스트로 표시됩니다.

## Import

```typescript
// React Native
import { Tooltip } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | ✅ | - | 툴팁을 표시할 트리거 요소 (wraps children) |
| `message` | `string` | ✅ | - | 툴팁 텍스트 |
| `shortcut` | `string` | ❌ | - | 키보드 단축키 텍스트 |
| `placement` | `'top' \| 'bottom'` | ❌ | `'bottom'` | 툴팁 배치 위치 |
| `size` | `'small' \| 'medium'` | ❌ | `'medium'` | 툴팁 크기 |
| `visible` | `boolean` | ❌ | - | 제어 모드: 항상 표시 여부 (always-on) |
| `onVisibleChange` | `(visible: boolean) => void` | ❌ | - | 표시 상태 변경 핸들러 |
| `defaultVisible` | `boolean` | ❌ | `false` | 초기 표시 여부 (uncontrolled mode) |
| `dismissible` | `boolean` | ❌ | `true` | 탭 외부 클릭 시 닫기 |
| `autoFlip` | `boolean` | ❌ | `true` | 화면 가장자리에서 자동으로 위치 전환 |
| `offset` | `number` | ❌ | `8` | 트리거로부터의 거리 (px) |
| `maxWidth` | `number` | ❌ | `280` | 최대 너비 |
| `hasArrow` | `boolean` | ❌ | `true` | 화살표 표시 여부 |
| `style` | `ViewStyle` | ❌ | - | 컨테이너 커스텀 스타일 |
| `testID` | `string` | ❌ | - | 테스트 ID |

## Usage Examples

### Basic Usage

```tsx
import { Tooltip, IconButton } from '@baerae-zkap/design-system/native';
import { Info } from 'lucide-react-native';

<Tooltip message="This is helpful information">
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### Different Sizes

```tsx
// Small tooltip
<Tooltip message="Small tooltip" size="small">
  <IconButton icon={<Info size={20} />} />
</Tooltip>

// Medium tooltip (default)
<Tooltip message="Medium tooltip" size="medium">
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### With Keyboard Shortcut

```tsx
<Tooltip
  message="Save file"
  shortcut="⌘S"
>
  <IconButton icon={<Save size={20} />} />
</Tooltip>
```

### Different Placements

```tsx
// Top placement
<Tooltip message="Top tooltip" placement="top">
  <IconButton icon={<Info size={20} />} />
</Tooltip>

// Bottom placement (default)
<Tooltip message="Bottom tooltip" placement="bottom">
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### Always-On Mode (Controlled)

```tsx
const [visible, setVisible] = useState(true);

<Tooltip
  message="Always visible"
  visible={visible}
  onVisibleChange={setVisible}
>
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### Uncontrolled with Default Visible

```tsx
<Tooltip
  message="Initially visible"
  defaultVisible={true}
>
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### Custom Offset and Max Width

```tsx
<Tooltip
  message="This tooltip has custom spacing"
  offset={16}
  maxWidth={200}
>
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### Without Arrow

```tsx
<Tooltip
  message="No arrow tooltip"
  hasArrow={false}
>
  <IconButton icon={<Info size={20} />} />
</Tooltip>
```

### Long Text Tooltip

```tsx
<Tooltip
  message="This is a longer tooltip message that explains something in detail and can wrap to multiple lines"
  size="medium"
>
  <IconButton icon={<HelpCircle size={20} />} />
</Tooltip>
```

## Design Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `palette.grey[15]` | `#131a1f` | 툴팁 배경색 (어두운 색) |
| `palette.static.white` | `#ffffff` | 텍스트 색상 (밝은 색) |
| `radius.component.tooltip.default` | `8px` | 툴팁 모서리 반경 |
| `spacing.primitive[2]` | `8px` | small 가로 패딩, 요소 간 gap |
| `spacing.primitive[3]` | `12px` | medium 가로 패딩 |
| `spacing.primitive[1]` | `4px` | small 세로 패딩 |
| `spacing.primitive[2]` | `8px` | medium 세로 패딩 |
| `colors.content.base.assistive` | `palette.grey[80]` | 단축키 텍스트 색상 |

## Behavior

### Interaction (Mobile)
- **Long press**: 툴팁 표시 (즉시, 0ms 지연)
- **Release**: 툴팁 숨김
- **Outside tap**: 툴팁 닫기 (dismissible=true일 때)

### Animation
- **Fade in + Scale**: 150ms (opacity 0→1, scale 0.95→1.0)
- **Fade out**: 즉시 (opacity 0, scale 0.95)

### Positioning
- 트리거 요소의 위치를 측정하여 정확히 앵커됨
- placement에 따라 트리거 위/아래에 배치
- 수평으로는 트리거 중앙에 정렬
- 화살표는 트리거 중앙을 가리킴
- 화면 가장자리 감지 시 자동으로 반대쪽으로 flip (autoFlip=true)

### Size Configuration

| Size | Padding | Font Size | Line Height | Min Width |
|------|---------|-----------|-------------|-----------|
| `small` | `8px × 4px` | `12px` | `16px` | `36px` |
| `medium` | `12px × 8px` | `13px` | `18px` | `64px` |

### Max Width
- 280px (기본값, 3줄까지 표시)
- `maxWidth` prop으로 커스터마이징 가능

### Offset
- 트리거와 툴팁 사이 거리: 8px (기본값)
- `offset` prop으로 조정 가능

## Accessibility

- `accessibilityRole="button"` on trigger
- `accessibilityLabel={message}` 툴팁 텍스트 전달
- 긴 누르기로 스크린 리더에서도 접근 가능

## Architecture Notes

- **Trigger**: `children`을 Pressable로 감싸서 long press 감지
- **Positioning**: 트리거 요소의 실제 화면 좌표를 measure하여 정확한 위치 계산
- **Modal**: 투명 Modal 사용하여 최상단 레이어에 렌더링
- **Auto-flip**: 툴팁이 화면 밖으로 나가면 자동으로 반대편으로 배치 전환
- **Arrow**: 트리거 중앙을 가리키도록 동적 계산

## Related Components

- **Popover**: 더 복잡한 콘텐츠를 포함하는 팝업
- **BottomSheet**: 모바일 하단 패널
- **Snackbar**: 액션 가능한 알림
