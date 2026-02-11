# Alert

현재 화면 위에 모달 다이얼로그를 띄워, 사용자의 흐름을 잠시 멈추고 주의할 내용을 안내하는 컴포넌트입니다. 사용자가 반드시 확인하고 넘어가야 하는 주요한 상황에 사용됩니다.

## Import

```typescript
import { Alert } from '@baerae-zkap/design-system/native';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| visible | boolean | Yes | - | Alert 표시 여부 |
| onClose | () => void | Yes | - | Alert 닫기 핸들러 |
| heading | string | No | - | 제목 (선택 - 없으면 body만 표시) |
| body | string | Yes | - | 본문 메시지 |
| primaryAction | AlertAction | Yes | - | 주요 액션 (권장 행동 - 우측 배치) |
| secondaryAction | AlertAction | No | - | 보조 액션 (보조 행동 - 좌측 배치) |
| negative | boolean | No | false | 부정 액션 모드 - primaryAction을 빨간색(error)으로 표시 |
| closeOnScrim | boolean | No | false | 스크림 터치 시 닫기 비활성 (기본: 반드시 버튼으로 닫아야 함) |
| style | ViewStyle | No | - | 커스텀 스타일 |
| testID | string | No | - | E2E 테스트 ID |

### AlertAction Type

```typescript
interface AlertAction {
  label: string;
  onPress: () => void;
}
```

## Foundation Tokens Used

| Property | Token | Value |
|----------|-------|-------|
| maxWidth | - | 320px (Popup보다 좁음) |
| padding | spacing.component.modal.padding | 24px |
| buttonGap | spacing.component.modal.buttonGap | 12px |
| headerGap | spacing.component.modal.headerGap | 12px |
| footerGap | spacing.component.modal.footerGap | 20px |
| borderRadius | radius.component.modal.default | 24px |
| button height | - | 48px |
| button borderRadius | radius.component.button.lg | 12px |

## Usage

```tsx
// Basic Alert with heading
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  heading="확인 필요"
  body="이 작업을 계속하시겠습니까?"
  primaryAction={{ label: '확인', onPress: handleConfirm }}
  secondaryAction={{ label: '취소', onPress: handleCancel }}
/>

// Alert without heading (short message)
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  body="저장되었습니다."
  primaryAction={{ label: '확인', onPress: handleClose }}
/>

// Negative action (destructive)
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  heading="정말 삭제하시겠습니까?"
  body="이 작업은 되돌릴 수 없습니다."
  primaryAction={{ label: '삭제', onPress: handleDelete }}
  secondaryAction={{ label: '취소', onPress: handleCancel }}
  negative
/>

// Single action Alert
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  heading="알림"
  body="네트워크 연결을 확인해주세요."
  primaryAction={{ label: '확인', onPress: handleClose }}
/>

// Allow closing on scrim tap
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  body="정보성 메시지입니다."
  primaryAction={{ label: '확인', onPress: handleClose }}
  closeOnScrim
/>
```

## Action Types

- **권장 행동 (Primary Action)**: 사용자가 수행하기를 권장하는 주요 액션. 브랜드 컬러로 강조되며 우측에 배치됩니다.
- **보조 행동 (Secondary Action)**: 취소나 닫기 등 부가적인 액션. 좌측에 배치됩니다.
- **부정 행동 (Negative Action)**: 삭제나 되돌릴 수 없는 작업 등 위험한 액션. `negative` prop으로 primaryAction을 빨간색으로 표시합니다.

## Distinction from Popup

- **Alert**: 긴급한 경고와 되돌릴 수 없는 작업 확인을 위한 더 제한적인 용도
- **Popup**: 일반적인 모달 다이얼로그, 더 다양한 콘텐츠와 유연한 사용 가능

Alert는 Popup보다 더 좁은 maxWidth(320px vs 400px)를 사용하며, 기본적으로 스크림 클릭으로 닫을 수 없습니다(`closeOnScrim: false`).

## Accessibility

- Modal with `statusBarTranslucent` for immersive experience
- Tab/Shift+Tab cycles focus between buttons
- Enter key activates focused button
- Escape key triggers `onClose` (handled by Modal's `onRequestClose`)
- Screen readers announce heading and body text
- Buttons have proper `testID` for E2E testing

## Design Tokens

Alert 컴포넌트는 Foundation 토큰 시스템을 사용합니다:

### Spacing
- **modal.padding**: `24px` - 컨테이너 내부 패딩
- **modal.headerGap**: `12px` - heading과 body 사이 간격
- **modal.footerGap**: `20px` - body와 버튼 사이 간격
- **modal.buttonGap**: `12px` - 버튼 사이 간격

### Radius
- **modal.default**: `24px` - 컨테이너 모서리
- **button.lg**: `12px` - 버튼 모서리

### Typography
- **heading fontSize**: `typography.fontSize.lg` (18px)
- **heading fontWeight**: `typography.fontWeight.bold` (700)
- **body fontSize**: `15px`
- **body fontWeight**: `typography.fontWeight.regular` (400)
- **body lineHeight**: `23px`

### Colors
- **Primary action (normal)**: `colors.surface.brand.default` → `colors.surface.brand.defaultPressed`
- **Primary action (negative)**: `colors.surface.error.default` → `colors.surface.error.defaultPressed`
- **Secondary action**: `colors.surface.base.container` → `colors.surface.base.containerPressed`
- **Text (on color)**: `colors.content.base.onColor`
- **Text (secondary)**: `colors.content.base.default`

## Examples

### Basic Confirmation Alert
```tsx
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  heading="확인"
  body="작업을 계속하시겠습니까?"
  primaryAction={{ label: '계속', onPress: handleContinue }}
  secondaryAction={{ label: '취소', onPress: handleCancel }}
/>
```

### Destructive Action Alert
```tsx
<Alert
  visible={isDeleteVisible}
  onClose={() => setIsDeleteVisible(false)}
  heading="삭제 확인"
  body="이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  primaryAction={{ label: '삭제', onPress: handleDelete }}
  secondaryAction={{ label: '취소', onPress: handleCancel }}
  negative
/>
```

### Simple Notification Alert
```tsx
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  body="저장되었습니다."
  primaryAction={{ label: '확인', onPress: handleClose }}
/>
```

### Information Alert (scrim closable)
```tsx
<Alert
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  heading="안내"
  body="새로운 기능이 추가되었습니다."
  primaryAction={{ label: '확인', onPress: handleClose }}
  closeOnScrim
/>
```

## Best Practices

### Do
- 긴급한 경고나 되돌릴 수 없는 작업 확인에만 사용
- 명확하고 간결한 메시지 작성 (heading + body)
- 짧은 메시지는 heading 없이 body만 사용
- 부정적 액션에는 `negative` prop 사용
- 주요 액션 라벨을 명확하게 작성 (예: "삭제", "계속", "확인")

### Don't
- 일반적인 정보 표시나 피드백에 사용 (대신 Popup, Toast, Snackbar 사용)
- 너무 긴 메시지 작성 (Alert는 간결해야 함)
- 중요하지 않은 상황에 과도하게 사용
- closeOnScrim을 무분별하게 활성화 (긴급 확인이 필요한 경우는 false 유지)

## Technical Notes

### Modal Overlay Pattern
Alert는 Popup과 동일한 오버레이/애니메이션 패턴을 사용합니다:
- Modal with `transparent` and `animationType="none"`
- Animated.Value for scale (0.95 → 1) and opacity (0 → 1)
- Pressable scrim with `rgba(0, 0, 0, 0.4)`
- Spring animation for smooth appearance

### Button Layout
- Always displayed in a row (`flexDirection: 'row'`)
- Secondary button on left, Primary button on right
- Both buttons use `flex: 1` when both present
- Single button takes full width

### Color States
- **Normal primary**: Brand colors
- **Negative primary**: Error colors (red)
- **Secondary**: Base container colors
- **Pressed**: Darker variants for visual feedback

### Container Width
- maxWidth: 320px (narrower than Popup's 400px)
- Alert is more concise and focused than Popup

## Related Components

- **Popup**: General-purpose modal dialog with more flexibility
- **BottomSheet**: Modal dialog anchored to bottom of screen
- **Toast**: Brief feedback messages (non-blocking)
- **Snackbar**: Temporary notifications with optional action
- **SectionMessage**: Inline informational messages
