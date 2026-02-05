# ActionArea

> 모달, 바텀시트, 화면 하단에서 버튼 그룹을 제공하는 컴포넌트입니다.
> 스크롤 시 하단에 고정되며, 상단 그라데이션으로 콘텐츠가 자연스럽게 페이드됩니다.

## Quick Reference

```tsx
import { ActionArea, ActionAreaButton } from '@zkap/design-system';
// React Native: import from '@zkap/design-system/native'

<ActionArea variant="strong" position="sticky" showGradient>
  <ActionAreaButton variant="main" onClick={() => {}}>
    확인
  </ActionAreaButton>
  <ActionAreaButton variant="alternative" onClick={() => {}}>
    취소
  </ActionAreaButton>
</ActionArea>
```

## Components

### ActionArea (Container)

버튼들을 감싸는 컨테이너 컴포넌트입니다.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'strong' \| 'neutral' \| 'cancel' \| 'compact'` | `'strong'` | 레이아웃 variant |
| `position` | `'static' \| 'sticky' \| 'fixed'` | `'static'` | 위치 설정 |
| `showGradient` | `boolean` | `true` | 상단 그라데이션 표시 여부 |
| `gradientHeight` | `number` | `24` | 그라데이션 높이 (px) |
| `caption` | `string` | - | 캡션 텍스트 (버튼 상단) |
| `useSafeArea` | `boolean` | `true` | Safe area 하단 패딩 적용 |
| `backgroundColor` | `string` | `'white'` | 배경색 |

### ActionAreaButton

ActionArea 내부에서 사용되는 버튼 컴포넌트입니다.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'main' \| 'alternative' \| 'sub'` | `'main'` | 버튼 역할 |
| `size` | `'small' \| 'medium' \| 'large' \| 'xLarge'` | `'xLarge'` | 버튼 크기 |
| `isLoading` | `boolean` | `false` | 로딩 상태 |
| `disabled` | `boolean` | `false` | 비활성화 |

## Variants

### 1. Strong (기본)
```tsx
// 세로 배치, Main 버튼이 위에 위치
<ActionArea variant="strong">
  <ActionAreaButton variant="main" onClick={handleConfirm}>
    확인
  </ActionAreaButton>
  <ActionAreaButton variant="alternative" onClick={handleCancel}>
    취소
  </ActionAreaButton>
</ActionArea>
```
- **용도**: 중요한 결정 (결제, 저장)
- **배치**: 세로, Main이 위
- **버튼 크기**: xLarge

### 2. Neutral
```tsx
// 가로 배치, 균등 분배
<ActionArea variant="neutral">
  <ActionAreaButton variant="alternative" onClick={handleCancel}>
    취소
  </ActionAreaButton>
  <ActionAreaButton variant="main" onClick={handleConfirm}>
    확인
  </ActionAreaButton>
</ActionArea>
```
- **용도**: 균등한 선택 (확인/취소)
- **배치**: 가로, Main이 오른쪽
- **버튼 크기**: xLarge

### 3. Compact
```tsx
// 가로 배치, 우측 정렬, 작은 버튼
<ActionArea variant="compact">
  <ActionAreaButton variant="sub" size="medium" onClick={handleCancel}>
    취소
  </ActionAreaButton>
  <ActionAreaButton variant="main" size="medium" onClick={handleConfirm}>
    확인
  </ActionAreaButton>
</ActionArea>
```
- **용도**: 인라인 액션 (수정/삭제)
- **배치**: 가로, 우측 정렬
- **버튼 크기**: medium

### 4. Cancel
```tsx
// 단일 버튼
<ActionArea variant="cancel">
  <ActionAreaButton variant="main" onClick={handleClose}>
    확인
  </ActionAreaButton>
</ActionArea>
```
- **용도**: 단순 확인/닫기
- **배치**: 단일 버튼, 전체 너비
- **버튼 크기**: xLarge

## Position & Gradient

### Sticky (스크롤 시 하단 고정)
```tsx
<ActionArea position="sticky" showGradient>
  <ActionAreaButton variant="main">확인</ActionAreaButton>
</ActionArea>
```

### Fixed (항상 하단 고정)
```tsx
<ActionArea position="fixed" showGradient>
  <ActionAreaButton variant="main">확인</ActionAreaButton>
</ActionArea>
```

### 그라데이션 커스터마이징
```tsx
<ActionArea
  position="sticky"
  showGradient={true}
  gradientHeight={32}
  backgroundColor="#f8f9fa"
>
  ...
</ActionArea>
```

## Button Variant Mapping

| Variant | 스타일 | 용도 |
|---------|--------|------|
| **main** | Filled, Brand color | 주요 액션 (확인, 저장, 결제) |
| **alternative** | Outlined, Border | 대체 액션 (취소, 닫기) |
| **sub** | Text only, 작은 사이즈 | 보조 링크 (건너뛰기, 나중에) |

## Design Tokens

| Property | Context | Token | Value |
|----------|---------|-------|-------|
| Container Padding | Modal | `modal.padding` | 24px |
| Container Padding | BottomSheet | `bottomSheet.padding` | 20px |
| Button Gap | All | `modal.buttonGap` | 12px |
| Safe Area Bottom | Mobile | `safeArea.bottom` | 32px |
| Caption Font Size | All | `typography.sm` | 14px |

## With Caption
```tsx
<ActionArea variant="strong" caption="변경 사항을 저장하시겠습니까?">
  <ActionAreaButton variant="main" onClick={handleSave}>
    저장
  </ActionAreaButton>
  <ActionAreaButton variant="alternative" onClick={handleCancel}>
    취소
  </ActionAreaButton>
</ActionArea>
```

## React Native Usage
```tsx
import { ActionArea, ActionAreaButton } from '@zkap/design-system/native';

<ActionArea
  variant="strong"
  position="absolute"
  useSafeArea={true}
>
  <ActionAreaButton variant="main" onPress={handleConfirm}>
    확인
  </ActionAreaButton>
  <ActionAreaButton variant="alternative" onPress={handleCancel}>
    취소
  </ActionAreaButton>
</ActionArea>
```

**Note**: React Native에서는 `position="absolute"`를 사용하고, `useSafeArea={true}`로 홈 인디케이터 영역을 자동 처리합니다.

## Design Principles

1. **버튼 순서 유지**: Strong에서는 Main이 위에, Neutral/Compact에서는 Main이 오른쪽에 위치
2. **position 활용**: 스크롤 가능한 콘텐츠에서는 `sticky` 또는 `fixed` 사용
3. **그라데이션**: 콘텐츠가 ActionArea 아래로 자연스럽게 사라지도록 `showGradient={true}` 권장
4. **Safe Area**: 모바일에서는 항상 `useSafeArea={true}`로 홈 인디케이터 영역 확보

## Accessibility

1. **Focus Order**: 버튼 간 포커스 순서는 시각적 순서와 일치
2. **Keyboard Navigation**: Tab 키로 버튼 간 이동, Enter/Space로 활성화
3. **Loading State**: 로딩 중 `aria-busy="true"` 자동 설정

## Do & Don't

### ✅ Do
- 상황에 맞는 variant 선택
- 스크롤 콘텐츠에서 `position="sticky"` 사용
- 모바일에서 `useSafeArea={true}` 사용
- 그라데이션으로 콘텐츠 페이드 처리

### ❌ Don't
- 버튼 순서 임의 변경
- alternative와 sub 혼용
- 3개 이상의 버튼 사용 (2개 권장)
- 그라데이션 없이 fixed/sticky 사용 (콘텐츠가 갑자기 잘림)
