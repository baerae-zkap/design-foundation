# Button Component

> 작업을 수행하는데 사용되는 클릭 가능한 요소입니다.

## Quick Reference

```tsx
// Web
import { Button } from '@baerae-zkap/design-system';
<Button variant="solid" color="primary" size="medium" onClick={() => {}}>
  Label
</Button>

// React Native
import { Button } from '@baerae-zkap/design-system/native';
<Button variant="solid" color="primary" size="medium" onPress={() => {}}>
  Label
</Button>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"solid"` \| `"outlined"` \| `"weak"` | `"solid"` | | 버튼 변형 |
| `color` | `"primary"` \| `"secondary"` \| `"assistive"` \| `"success"` \| `"danger"` | `"primary"` | | 색상 테마 |
| `size` | `"small"` \| `"medium"` \| `"large"` \| `"xlarge"` | `"medium"` | | 버튼 크기 |
| `display` | `"inline"` \| `"block"` \| `"full"` | `"inline"` | | 표시 방식 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `loading` | `boolean` | `false` | | 로딩 상태 |
| `leadingIcon` | `ReactNode` | - | | 선행 아이콘 (왼쪽) |
| `trailingIcon` | `ReactNode` | - | | 후행 아이콘 (오른쪽) |
| `iconOnly` | `boolean` | `false` | | 아이콘 전용 모드 |
| `contentColor` | `string` | - | | 커스텀 텍스트/아이콘 색상 |
| `backgroundColor` | `string` | - | | 커스텀 배경색 |
| `borderColor` | `string` | - | | 커스텀 테두리 색상 |

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
| Height (large) | - | 48px |
| Height (xlarge) | - | 52px |
| Padding Horizontal (small) | `button.paddingX.xs` | 12px |
| Padding Horizontal (medium) | `button.paddingX.xs` | 12px |
| Padding Horizontal (large) | `button.paddingX.sm` | 16px |
| Padding Horizontal (xlarge) | `button.paddingX.md` | 20px |
| Icon-Text Gap | `button.gap` | 8px |
| Border Radius (small/medium) | `button.sm` | 8px |
| Border Radius (large/xlarge) | `button.lg` | 12px |
| Icon Size (small) | - | 16px |
| Icon Size (medium) | - | 18px |
| Icon Size (large) | - | 20px |
| Icon Size (xlarge) | - | 22px |
| Font Size (small) | `typography.fontSize.xs` | 12px |
| Font Size (medium) | `typography.fontSize.sm` | 14px |
| Font Size (large) | `typography.fontSize.sm` | 14px |
| Font Size (xlarge) | `typography.fontSize.md` | 16px |

## Variants

### Solid (Default)
채워진 배경을 가진 기본 버튼. 주요 액션에 사용.

| Color | Background | Background Pressed | Text |
|-------|-----------|-------------------|------|
| primary | `#0066ff` | `#005cd6` | white |
| secondary | `#e3ecff` | `#c7dbff` | `#0066ff` |
| assistive | `#eaebed` | `#d6d9dd` | `#3e4651` |
| success | `#dff8ef` | `#b8f0da` | white |
| danger | `#fce8e8` | `#f8d1d1` | white |

### Outlined
테두리만 있는 버튼. 보조 액션에 사용.

| Color | Background | Background Pressed | Text | Border |
|-------|-----------|-------------------|------|--------|
| primary | white | `#e3ecff` | `#0066ff` | `#0066ff` |
| secondary | white | `#e3ecff` | `#0066ff` | `#0066ff` |
| assistive | white | `#f7f8f9` | `#3e4651` | `#d6d9dd` |
| success | white | `#dff8ef` | `#14b66b` | `#14b66b` |
| danger | white | `#fce8e8` | `#dc2f2f` | `#dc2f2f` |

### Weak (New)
반투명 배경의 경량 버튼. 부드러운 시각적 계층 구조.

| Color | Background | Background Pressed | Text |
|-------|-----------|-------------------|------|
| primary | `rgba(0,102,255,0.08)` | `rgba(0,102,255,0.15)` | `#0066ff` |
| secondary | `rgba(0,102,255,0.06)` | `rgba(0,102,255,0.12)` | `#0066ff` |
| assistive | `#f7f8f9` | `#eaebed` | `#3e4651` |
| success | `rgba(20,182,107,0.08)` | `rgba(20,182,107,0.15)` | `#14b66b` |
| danger | `rgba(220,47,47,0.08)` | `rgba(220,47,47,0.15)` | `#dc2f2f` |

## Display Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `inline` | 내용에 맞춤 (alignSelf: flex-start) | 인라인 버튼 |
| `block` | 전체 너비 (width: 100%) | 카드 내부, 리스트 아이템 |
| `full` | 전체 너비, 마진 없음 | 모달, 바텀시트 하단 |

## Color Usage Rules

### 1. 색상 선택 기준
| 상황 | Color | Variant |
|------|-------|---------|
| 주요 액션 (결제, 저장, 확인) | `primary` | `solid` |
| 보조 액션 (더보기, 옵션) | `secondary` | `solid` |
| 중립 액션 (취소, 닫기) | `assistive` | `outlined` or `weak` |
| 성공 액션 (완료, 승인) | `success` | `solid` |
| 위험 액션 (삭제, 탈퇴) | `danger` | `solid` |

### 2. 버튼 조합 규칙
```tsx
// ✅ 올바른 조합: solid(주요) + weak(보조)
<Button variant="solid" color="primary">확인</Button>
<Button variant="weak" color="assistive">취소</Button>

// ✅ 올바른 조합: solid(주요) + outlined(보조)
<Button variant="solid" color="primary">확인</Button>
<Button variant="outlined" color="assistive">취소</Button>

// ❌ 잘못된 조합: solid 2개
<Button variant="solid" color="primary">확인</Button>
<Button variant="solid" color="assistive">취소</Button>
```

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Pressed | 누르고 있는 상태 | 배경색 어두워짐 |
| Disabled | 비활성화 | 회색 배경(`#d6d9dd`), 회색 텍스트(`#a7adb5`) |
| Loading | 로딩 중 | 텍스트 대신 LoadingDots 표시, 상호작용 차단 |

## Accessibility

1. **Focus Visible**: 키보드 포커스 시 outline 표시
2. **Minimum Touch Target**: 모든 버튼은 최소 44x44px 터치 영역 확보
3. **Color Contrast**: WCAG 2.1 AA 기준(4.5:1) 충족
4. **Screen Reader**: disabled/loading 상태가 스크린 리더에 전달됨 (accessibilityState)

## Do & Don't

### ✅ Do
- 주요 액션에는 `solid` + `primary` 사용
- iconOnly 버튼에는 반드시 `accessibilityLabel` 제공
- 버튼 텍스트는 동사로 시작 (저장, 삭제, 확인)
- weak variant로 시각적 계층 구조 만들기

### ❌ Don't
- 같은 화면에 같은 색상의 `solid` 버튼 2개 이상 사용 금지
- 버튼 텍스트에 "클릭하세요" 같은 동작 설명 넣지 않기
- `outlined` 버튼만 단독으로 주요 CTA로 사용하지 않기

## Code Examples

### Basic
```tsx
<Button
  variant="solid"
  color="primary"
  size="medium"
  onPress={() => {}}
>
  확인
</Button>
```

### With Icon
```tsx
<Button
  variant="solid"
  color="primary"
  leadingIcon={<Icon name="plus" />}
  onPress={() => {}}
>
  추가하기
</Button>
```

### Icon Only
```tsx
<Button
  variant="solid"
  color="primary"
  iconOnly
  accessibilityLabel="추가하기"  // 필수!
  onPress={() => {}}
>
  <Icon name="plus" />
</Button>
```

### Loading State
```tsx
<Button
  variant="solid"
  color="primary"
  loading={true}
  onPress={() => {}}
>
  저장 중...
</Button>
```

### Weak Variant (New)
```tsx
<Button
  variant="weak"
  color="primary"
  onPress={() => {}}
>
  더보기
</Button>
```

### Custom Colors
```tsx
<Button
  variant="solid"
  color="primary"
  backgroundColor="#8b5cf6"
  contentColor="#ffffff"
  onPress={() => {}}
>
  커스텀 색상
</Button>
```

### Display Modes
```tsx
// Inline (default)
<Button variant="solid" color="primary" display="inline">
  인라인
</Button>

// Block (full width with line break)
<Button variant="solid" color="primary" display="block">
  블록 버튼
</Button>

// Full (fills parent, no margin)
<Button variant="solid" color="primary" display="full">
  전체 너비
</Button>
```

### Size Comparison
```tsx
<Button variant="solid" color="primary" size="small">작은 버튼</Button>
<Button variant="solid" color="primary" size="medium">중간 버튼</Button>
<Button variant="solid" color="primary" size="large">큰 버튼</Button>
<Button variant="solid" color="primary" size="xlarge">특대 버튼</Button>
```
