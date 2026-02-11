# Popup

즉각적인 사용자 주의가 필요한 모달 다이얼로그 컴포넌트입니다. 필수 결정이나 확인을 위해 현재 워크플로우를 중단합니다.

## 특징

- 중앙 정렬된 팝업 카드 형태
- 반투명 스크림(배경) 오버레이
- 페이드 + 스케일 애니메이션 (0.95 → 1.0)
- 주요 액션(Primary)과 보조 액션(Secondary) 버튼 지원
- 색상별 액션 버튼 (brand, success, error)
- 스크림 클릭으로 닫기 옵션
- Foundation 토큰 기반 디자인

## 구성 요소

1. **Scrim (배경)**: 반투명 어두운 오버레이
2. **Container**: 라운드 코너의 흰색 카드
3. **Header**: 제목 영역 (선택적)
4. **Content**: 설명 텍스트 또는 커스텀 콘텐츠
5. **Footer**: 액션 버튼 영역 (선택적)

## Props

### PopupProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `visible` | `boolean` | - | ✅ | 팝업 표시 여부 |
| `onClose` | `() => void` | - | ✅ | 팝업 닫기 핸들러 |
| `title` | `string` | - | ❌ | 제목 |
| `description` | `string` | - | ❌ | 설명 텍스트 |
| `children` | `ReactNode` | - | ❌ | 커스텀 콘텐츠 |
| `primaryAction` | `PopupAction` | - | ❌ | 주요 액션 버튼 |
| `secondaryAction` | `PopupAction` | - | ❌ | 보조 액션 버튼 |
| `closeOnScrim` | `boolean` | `true` | ❌ | 스크림 클릭 시 닫기 여부 |
| `style` | `ViewStyle` | - | ❌ | 커스텀 스타일 |
| `testID` | `string` | - | ❌ | 테스트 ID |

### PopupAction

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | 버튼 라벨 |
| `onPress` | `() => void` | ✅ | 버튼 클릭 핸들러 |
| `color` | `'brand' \| 'success' \| 'error'` | ❌ | 버튼 색상 (primary만 해당) |

## Design Tokens

### Colors

| Element | Token | Value | Usage |
|---------|-------|-------|-------|
| Scrim | `colors.overlay.dim` | `rgba(19, 26, 31, 0.40)` | 반투명 배경 |
| Container | `colors.surface.elevated.default` | `#ffffff` | 팝업 배경 |
| Title | `colors.content.base.strong` | `#131a1f` | 제목 텍스트 |
| Description | `colors.content.base.default` | `#3e4651` | 설명 텍스트 |
| Primary Button (Brand) | `colors.surface.brand.default` | `#0066ff` | 주요 버튼 배경 |
| Primary Button (Brand) Text | `colors.content.base.onColor` | `#ffffff` | 주요 버튼 텍스트 |
| Primary Button (Success) | `colors.surface.success.default` | `#dff8ef` | 성공 버튼 배경 |
| Primary Button (Error) | `colors.surface.error.default` | `#fce8e8` | 에러 버튼 배경 |
| Secondary Button | `colors.surface.base.container` | `#eaebed` | 보조 버튼 배경 |
| Secondary Button Text | `colors.content.base.default` | `#3e4651` | 보조 버튼 텍스트 |

### Spacing

| Element | Token | Value | Usage |
|---------|-------|-------|-------|
| Container Padding | `spacing.component.modal.padding` | `24px` | 팝업 내부 패딩 |
| Title to Content Gap | `spacing.component.modal.headerGap` | `16px` | 제목과 콘텐츠 사이 간격 |
| Content to Footer Gap | `spacing.component.modal.footerGap` | `20px` | 콘텐츠와 버튼 사이 간격 |
| Button Gap | `spacing.component.modal.buttonGap` | `12px` | 버튼 사이 간격 |
| Button Padding X | `spacing.component.button.paddingX.lg` | `24px` | 버튼 좌우 패딩 |

### Radius

| Element | Token | Value | Usage |
|---------|-------|-------|-------|
| Container | `radius.component.modal.default` | `24px` | 팝업 모서리 |
| Button | `radius.component.button.lg` | `12px` | 버튼 모서리 |

### Typography

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Title | 18px | 700 | 24px |
| Description | 15px | 400 | 22px |
| Button Text | 15px | 600 | - |

## 사용 예제

### 기본 사용

```tsx
import React, { useState } from 'react';
import { Popup, Button } from '@baerae-zkap/design-system/native';

function Example() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        팝업 열기
      </Button>
      <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        title="알림"
        description="팝업 컴포넌트의 기본 예제입니다."
        primaryAction={{
          label: '확인',
          onPress: () => setVisible(false),
        }}
      />
    </>
  );
}
```

### 확인 다이얼로그 (두 버튼)

```tsx
<Popup
  visible={visible}
  onClose={() => setVisible(false)}
  title="삭제 확인"
  description="정말로 이 항목을 삭제하시겠습니까?"
  primaryAction={{
    label: '삭제',
    onPress: handleDelete,
    color: 'error',
  }}
  secondaryAction={{
    label: '취소',
    onPress: () => setVisible(false),
  }}
/>
```

### 성공 액션

```tsx
<Popup
  visible={visible}
  onClose={() => setVisible(false)}
  title="변경사항 저장"
  description="변경사항을 저장하시겠습니까?"
  primaryAction={{
    label: '저장',
    onPress: handleSave,
    color: 'success',
  }}
  secondaryAction={{
    label: '취소',
    onPress: () => setVisible(false),
  }}
/>
```

### 커스텀 콘텐츠

```tsx
<Popup
  visible={visible}
  onClose={() => setVisible(false)}
  title="맞춤 설정"
  primaryAction={{
    label: '적용',
    onPress: handleApply,
  }}
  secondaryAction={{
    label: '취소',
    onPress: () => setVisible(false),
  }}
>
  <View style={{ gap: 12 }}>
    <Checkbox label="알림 받기" />
    <Checkbox label="마케팅 수신 동의" />
  </View>
</Popup>
```

### 스크림 닫기 비활성화

```tsx
<Popup
  visible={visible}
  onClose={() => setVisible(false)}
  title="중요 알림"
  description="이 팝업은 배경을 클릭해도 닫히지 않습니다."
  primaryAction={{
    label: '확인',
    onPress: () => setVisible(false),
  }}
  closeOnScrim={false}
/>
```

## 버튼 레이아웃

- **두 버튼**: 가로 배치 (Row), 각 버튼이 50% 너비 차지
- **한 버튼**: 세로 배치 (Column), 버튼이 전체 너비 차지

## 접근성

- Modal 컴포넌트로 포커스 트랩 자동 처리
- `onRequestClose`로 Android 뒤로가기 버튼 지원
- `statusBarTranslucent`로 전체 화면 오버레이
- `testID` prop으로 자동화 테스트 지원

## 사용 가이드라인

### 언제 사용하나요?

- 사용자의 즉각적인 주의가 필요한 경우
- 중요한 결정이나 확인이 필요한 경우
- 현재 작업을 중단해야 하는 경우
- 간단한 정보 입력이 필요한 경우

### 언제 사용하지 않나요?

- 복잡한 폼이나 긴 콘텐츠 → BottomSheet 사용
- 간단한 알림 → Toast 사용
- 페이지 전환이 필요한 경우 → 새 화면으로 이동

## 디자인 원칙

1. **간결함**: 제목과 설명을 짧고 명확하게 작성
2. **명확한 액션**: 버튼 라벨을 구체적으로 작성 ("확인" 대신 "삭제", "저장" 등)
3. **적절한 색상**: 위험한 액션은 `error` 색상 사용
4. **일관성**: 중요 버튼은 항상 오른쪽 배치

## 버전

- **0.1.8**: 초기 릴리스
