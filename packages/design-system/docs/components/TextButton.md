# TextButton Component

> 텍스트 기반의 가벼운 액션 버튼입니다. 보조 액션이나 링크 스타일 버튼에 사용됩니다.

## Quick Reference

```tsx
// Web
import { TextButton } from '@zkap/design-system';
<TextButton variant="clear" color="brandDefault" size="medium" onClick={() => {}}>
  더보기
</TextButton>

// React Native
import { TextButton } from '@zkap/design-system/native';
<TextButton variant="clear" color="brandDefault" size="medium" onPress={() => {}}>
  더보기
</TextButton>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"clear"` \| `"underline"` \| `"arrow"` | `"clear"` | ✅ | 버튼 스타일 |
| `color` | `"brandDefault"` \| `"baseDefault"` \| `"errorDefault"` | `"brandDefault"` | ✅ | 색상 테마 |
| `size` | `"xSmall"` \| `"small"` \| `"medium"` \| `"large"` \| `"xLarge"` | `"medium"` | ✅ | 텍스트 크기 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(event) => void` | 탭 핸들러 |
| `accessibilityLabel` | `string` | 스크린 리더용 레이블 |

## Variants

### 1. Clear (기본)
```tsx
<TextButton variant="clear">텍스트 버튼</TextButton>
```
- 배경/장식 없이 텍스트만 표시
- 가장 기본적인 형태

### 2. Underline
```tsx
<TextButton variant="underline">더 알아보기</TextButton>
```
- 텍스트 하단에 밑줄 표시
- 링크처럼 보이면서 버튼 역할

### 3. Arrow
```tsx
<TextButton variant="arrow">더보기</TextButton>
```
- 텍스트 우측에 화살표(→) 아이콘
- 네비게이션, 상세 페이지 이동에 사용

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Font Size (xSmall) | `typography.size.xs` | 12px |
| Font Size (small) | `typography.size.sm` | 14px |
| Font Size (medium) | `typography.size.md` | 16px |
| Font Size (large) | `typography.size.lg` | 18px |
| Font Size (xLarge) | `typography.size.xl` | 20px |
| Font Weight | `typography.weight.medium` | 500 |
| Icon Gap | `horizontal.3xs` | 4px |
| Padding Vertical | `primitive.1` | 4px |
| Border Radius | `radius.xs` | 6px |
| Min Touch Target | - | 44x44px (padding으로 확보) |

## Color Usage Rules

| Color | Usage | Example |
|-------|-------|---------|
| `brandDefault` | 주요 텍스트 액션 | 더보기, 자세히 보기 |
| `baseDefault` | 중립 텍스트 액션 | 취소, 건너뛰기 |
| `errorDefault` | 위험 텍스트 액션 | 삭제, 탈퇴 |

## Usage Context

### 1. Action Area 내부 Sub 버튼
```tsx
// ActionArea에서 보조 링크로 사용
<View style={{ flexDirection: 'column', gap: 12, alignItems: 'center' }}>
  <Button buttonType="filled" color="brandDefault" layout="fillWidth">
    로그인
  </Button>
  <TextButton variant="clear" color="brandDefault">
    회원가입
  </TextButton>
</View>
```

### 2. 리스트 아이템 내 액션
```tsx
// 리스트 항목의 부가 액션
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <Text>설정</Text>
  <TextButton variant="arrow" color="brandDefault">
    변경
  </TextButton>
</View>
```

### 3. 섹션 헤더 더보기
```tsx
// 섹션 제목 옆 더보기 링크
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <Text style={{ fontSize: 18, fontWeight: 600 }}>추천 상품</Text>
  <TextButton variant="arrow" color="brandDefault" size="small">
    더보기
  </TextButton>
</View>
```

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Hover | 마우스 오버 (Web) | 색상 약간 어두워짐 |
| Pressed | 누르고 있는 상태 | 색상 더 어두워짐 |
| Disabled | 비활성화 | 회색 텍스트, 상호작용 불가 |

## Accessibility

1. **Focus Visible**: 키보드 포커스 시 2px solid outline 표시
2. **Minimum Touch Target**: padding으로 최소 44x44px 터치 영역 확보
3. **Color Contrast**: WCAG 2.1 AA 기준(4.5:1) 충족

## Do & Don't

### ✅ Do
- 보조 액션에 사용 (주요 CTA가 아닌 경우)
- ActionArea 내 Sub 버튼으로 사용
- 네비게이션 링크에 `arrow` variant 사용

### ❌ Don't
- 주요 CTA로 단독 사용하지 않기 (Button 사용)
- 너무 긴 텍스트 사용하지 않기
- `underline`과 `arrow`를 동시에 사용하지 않기

## Code Examples

### Basic Variants
```tsx
// Clear
<TextButton variant="clear" color="brandDefault" size="medium" onClick={() => {}}>
  텍스트 버튼
</TextButton>

// Underline
<TextButton variant="underline" color="brandDefault" size="medium" onClick={() => {}}>
  더 알아보기
</TextButton>

// Arrow
<TextButton variant="arrow" color="brandDefault" size="medium" onClick={() => {}}>
  더보기
</TextButton>
```

### With ActionArea
```tsx
<View style={{ flexDirection: 'column', gap: 12, padding: 20, alignItems: 'center' }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    로그인
  </Button>
  <TextButton
    variant="clear"
    color="brandDefault"
    size="medium"
    onPress={() => {}}
  >
    회원가입
  </TextButton>
</View>
```
