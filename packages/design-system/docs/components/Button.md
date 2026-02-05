# Button Component

> 작업을 수행하는데 사용되는 클릭 가능한 요소입니다.

## Quick Reference

```tsx
// Web
import { Button } from '@baerae-zkap/design-system';
<Button buttonType="filled" color="brandDefault" size="medium" onClick={() => {}}>
  Label
</Button>

// React Native
import { Button } from '@baerae-zkap/design-system/native';
<Button buttonType="filled" color="brandDefault" size="medium" onPress={() => {}}>
  Label
</Button>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `buttonType` | `"filled"` \| `"outlined"` | `"filled"` | ✅ | 버튼 스타일 |
| `color` | `"brandDefault"` \| `"brandSecondary"` \| `"baseContainer"` \| `"successDefault"` \| `"errorDefault"` | `"brandDefault"` | ✅ | 색상 테마 |
| `size` | `"small"` \| `"medium"` \| `"large"` \| `"xLarge"` | `"medium"` | | 버튼 크기 |
| `layout` | `"hug"` \| `"fillWidth"` | `"hug"` | | 레이아웃 모드 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `isLoading` | `boolean` | `false` | | 로딩 상태 |
| `leftContent` | `ReactNode` | - | | 좌측 아이콘 |
| `rightContent` | `ReactNode` | - | | 우측 아이콘 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 |
| `type` | `"button"` \| `"submit"` \| `"reset"` | HTML button type |
| `aria-label` | `string` | 스크린 리더용 레이블 (icon-only 필수) |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(event) => void` | 탭 핸들러 |
| `onLongPress` | `(event) => void` | 길게 누르기 핸들러 |
| `accessibilityLabel` | `string` | 스크린 리더용 레이블 (icon-only 필수) |
| `hitSlop` | `Insets` | 터치 영역 확장 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Height (small) | - | 36px |
| Height (medium) | - | 40px |
| Height (large) | - | 44px |
| Height (xLarge) | `primitive.12` | 48px |
| Horizontal Padding | `button.paddingX.sm` | 16px |
| Icon-Text Gap | `button.gap` | 8px |
| Border Radius | `radius.s` | 8px |
| Border Width (outlined) | - | 1px |
| Press Scale | - | 0.98 |
| Min Touch Target | - | 44px |

## Color Usage Rules

### 1. 색상 선택 기준
| 상황 | Color | ButtonType |
|------|-------|------------|
| 주요 액션 (결제, 저장, 확인) | `brandDefault` | `filled` |
| 보조 액션 (더보기, 옵션) | `brandSecondary` | `filled` |
| 중립 액션 (취소, 닫기) | `baseContainer` | `outlined` |
| 성공 액션 (완료, 승인) | `successDefault` | `filled` |
| 위험 액션 (삭제, 탈퇴) | `errorDefault` | `filled` |

### 2. 버튼 조합 규칙
```tsx
// ✅ 올바른 조합: filled(주요) + outlined(보조)
<Button buttonType="filled" color="brandDefault">확인</Button>
<Button buttonType="outlined" color="baseContainer">취소</Button>

// ❌ 잘못된 조합: filled 2개
<Button buttonType="filled" color="brandDefault">확인</Button>
<Button buttonType="filled" color="baseContainer">취소</Button>
```

## Layout Rules

### 1. fillWidth 사용 시점
```tsx
// ✅ Modal/BottomSheet 내부 - fillWidth 사용
<Button layout="fillWidth" ... />

// ✅ 인라인 버튼 - hug 사용 (기본값)
<Button layout="hug" ... />
```

### 2. 버튼 그룹 간격
```tsx
// gap은 항상 12px (modal.buttonGap)
<View style={{ gap: 12 }}>
  <Button ... />
  <Button ... />
</View>
```

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Hover | 마우스 오버 (Web) | 색상 약간 어두워짐 |
| Pressed | 누르고 있는 상태 | scale(0.98), 색상 더 어두워짐 |
| Disabled | 비활성화 | 회색 배경, 회색 텍스트, cursor: not-allowed |
| Loading | 로딩 중 | 텍스트 대신 로딩 dots 표시, 상호작용 차단 |

## Accessibility

1. **Focus Visible**: 키보드 포커스 시 2px solid outline 표시
2. **Minimum Touch Target**: 모든 버튼은 최소 44x44px 터치 영역 확보
3. **Color Contrast**: WCAG 2.1 AA 기준(4.5:1) 충족
4. **Screen Reader**: disabled/loading 상태가 스크린 리더에 전달됨

## Do & Don't

### ✅ Do
- 주요 액션에는 `filled` + `brandDefault` 사용
- icon-only 버튼에는 반드시 `aria-label` 제공
- 버튼 텍스트는 동사로 시작 (저장, 삭제, 확인)

### ❌ Don't
- 같은 화면에 같은 색상의 `filled` 버튼 2개 이상 사용 금지
- 버튼 텍스트에 "클릭하세요" 같은 동작 설명 넣지 않기
- `outlined` 버튼만 단독으로 주요 CTA로 사용하지 않기

## Code Examples

### Basic
```tsx
<Button
  buttonType="filled"
  color="brandDefault"
  size="medium"
  onClick={() => {}}  // Web
  // onPress={() => {}}  // RN
>
  확인
</Button>
```

### With Icon
```tsx
<Button
  buttonType="filled"
  color="brandDefault"
  leftContent={<Icon name="plus" />}
  onClick={() => {}}
>
  추가하기
</Button>
```

### Icon Only
```tsx
<Button
  buttonType="filled"
  color="brandDefault"
  aria-label="추가하기"  // Web - 필수!
  // accessibilityLabel="추가하기"  // RN - 필수!
  onClick={() => {}}
>
  <Icon name="plus" />
</Button>
```

### Loading State
```tsx
<Button
  buttonType="filled"
  color="brandDefault"
  isLoading={true}
  onClick={() => {}}
>
  저장 중...
</Button>
```
