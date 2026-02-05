# ActionArea

> 모달, 바텀시트, 화면 하단에서 버튼 그룹을 제공하는 컴포넌트입니다.
> 스크롤 시 하단에 고정되며, 상단 그라데이션으로 콘텐츠가 자연스럽게 페이드됩니다.

## Quick Reference

```tsx
import { ActionArea, Button, TextButton } from '@baerae-zkap/design-system';
// React Native: import from '@baerae-zkap/design-system/native'

<ActionArea variant="strong" position="sticky" showGradient>
  <Button buttonType="filled" color="brandDefault" onClick={() => {}}>
    확인
  </Button>
  <Button buttonType="filled" color="baseContainer" onClick={() => {}}>
    취소
  </Button>
</ActionArea>
```

## ActionArea Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'strong' \| 'neutral' \| 'compact'` | `'strong'` | 레이아웃 variant |
| `position` | `'static' \| 'sticky' \| 'fixed'` | `'static'` | 위치 설정 |
| `showGradient` | `boolean` | `true` | 상단 그라데이션 표시 여부 |
| `gradientHeight` | `number` | `48` | 그라데이션 높이 (px) |
| `caption` | `string` | - | 캡션 텍스트 (버튼 상단) |
| `useSafeArea` | `boolean` | `true` | Safe area 하단 패딩 적용 |
| `backgroundColor` | `string` | `'white'` | 배경색 |

## Button Mapping

ActionArea는 Button과 TextButton 컴포넌트를 children으로 받습니다.

| 용도 | 컴포넌트 | Props |
|------|----------|-------|
| 주요 액션 | `Button` | `buttonType="filled" color="brandDefault"` |
| 대체 액션 | `Button` | `buttonType="filled" color="baseContainer"` |
| 보조 링크 | `TextButton` | `color="baseDefault"` |

## Variants

### 1. Strong (기본)
```tsx
// 세로 배치, Main 버튼이 위에 위치
<ActionArea variant="strong">
  <Button buttonType="filled" color="brandDefault" onPress={handleConfirm}>
    확인
  </Button>
  <Button buttonType="filled" color="baseContainer" onPress={handleCancel}>
    취소
  </Button>
</ActionArea>
```
- **용도**: 중요한 결정 (결제, 저장)
- **배치**: 세로, 주요 버튼이 위
- **버튼 크기**: xLarge (기본)

### 2. Neutral
```tsx
// 가로 배치, 균등 분배
<ActionArea variant="neutral">
  <Button buttonType="filled" color="baseContainer" onPress={handleCancel}>
    취소
  </Button>
  <Button buttonType="filled" color="brandDefault" onPress={handleConfirm}>
    확인
  </Button>
</ActionArea>
```
- **용도**: 균등한 선택 (확인/취소)
- **배치**: 가로, 주요 버튼이 오른쪽
- **버튼 크기**: xLarge (기본)

### 3. Compact
```tsx
// 가로 배치, 우측 정렬, 작은 버튼
<ActionArea variant="compact">
  <TextButton color="baseDefault" onPress={handleCancel}>
    취소
  </TextButton>
  <Button buttonType="filled" color="brandDefault" size="medium" onPress={handleConfirm}>
    확인
  </Button>
</ActionArea>
```
- **용도**: 인라인 액션 (수정/삭제)
- **배치**: 가로, 우측 정렬
- **버튼 크기**: medium

## Position & Gradient

### Sticky (스크롤 시 하단 고정)
```tsx
<ActionArea position="sticky" showGradient>
  <Button buttonType="filled" color="brandDefault">확인</Button>
</ActionArea>
```

### Fixed (항상 하단 고정)
```tsx
<ActionArea position="fixed" showGradient>
  <Button buttonType="filled" color="brandDefault">확인</Button>
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
  <Button buttonType="filled" color="brandDefault" onPress={handleSave}>
    저장
  </Button>
  <Button buttonType="filled" color="baseContainer" onPress={handleCancel}>
    취소
  </Button>
</ActionArea>
```

## React Native Usage
```tsx
import { ActionArea, Button, TextButton } from '@baerae-zkap/design-system/native';

<ActionArea
  variant="strong"
  position="absolute"
  useSafeArea={true}
>
  <Button buttonType="filled" color="brandDefault" onPress={handleConfirm}>
    확인
  </Button>
  <Button buttonType="filled" color="baseContainer" onPress={handleCancel}>
    취소
  </Button>
</ActionArea>
```

**Note**: React Native에서는 `position="absolute"`를 사용하고, `useSafeArea={true}`로 홈 인디케이터 영역을 자동 처리합니다.

## Design Principles

1. **버튼 순서 유지**: Strong에서는 주요 버튼이 위에, Neutral/Compact에서는 주요 버튼이 오른쪽에 위치
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
- Button, TextButton 컴포넌트 사용

### ❌ Don't
- 버튼 순서 임의 변경
- 3개 이상의 버튼 사용 (2개 권장)
- 그라데이션 없이 fixed/sticky 사용 (콘텐츠가 갑자기 잘림)
- ActionArea 외부에서 사용하는 일반 버튼과 다른 스타일 적용
