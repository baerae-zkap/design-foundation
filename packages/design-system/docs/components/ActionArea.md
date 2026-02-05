# ActionArea Pattern

> 모달 혹은 화면 하단 영역에서 버튼 그룹을 배치하는 레이아웃 패턴입니다.

## Quick Reference

ActionArea는 독립 컴포넌트가 아닌 **레이아웃 패턴**입니다.
Button과 TextButton을 조합하여 구현합니다.

```tsx
// Strong Variant (세로 배치, Main 위)
<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Button buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth">
    Main
  </Button>
  <Button buttonType="outlined" color="baseContainer" size="xLarge" layout="fillWidth">
    Alternative
  </Button>
</View>
```

## Variants

### 1. Strong (기본)
```tsx
// 세로 배치, Main 버튼이 위에 위치
<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Button buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth">
    Main
  </Button>
  <Button buttonType="outlined" color="baseContainer" size="xLarge" layout="fillWidth">
    Alternative
  </Button>
</View>
```
- **용도**: 중요한 결정 (결제, 저장)
- **배치**: 세로, Main이 위
- **버튼 크기**: xLarge

### 2. Neutral
```tsx
// 가로 배치, Main 버튼이 오른쪽에 위치
<View style={{ flexDirection: 'row', gap: 12, padding: 20 }}>
  <Button buttonType="outlined" color="baseContainer" size="xLarge" layout="fillWidth">
    Alternative
  </Button>
  <Button buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth">
    Main
  </Button>
</View>
```
- **용도**: 균등한 선택 (확인/취소)
- **배치**: 가로, Main이 오른쪽
- **버튼 크기**: xLarge

### 3. Compact
```tsx
// 가로 배치, 우측 정렬, 작은 버튼
<View style={{ flexDirection: 'row', gap: 12, padding: 20, justifyContent: 'flex-end' }}>
  <TextButton color="brandDefault">
    Sub
  </TextButton>
  <Button buttonType="filled" color="brandDefault" size="medium">
    Main
  </Button>
</View>
```
- **용도**: 인라인 액션 (수정/삭제)
- **배치**: 가로, 우측 정렬
- **버튼 크기**: medium

### 4. Cancel
```tsx
// 단일 버튼
<View style={{ padding: 20 }}>
  <Button buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth">
    확인
  </Button>
</View>
```
- **용도**: 단순 확인/닫기
- **배치**: 단일 버튼, 전체 너비
- **버튼 크기**: xLarge

## Button Role Mapping

| Role | Component | Props |
|------|-----------|-------|
| **Main** (주요 액션) | `Button` | `buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth"` |
| **Alternative** (대체 액션) | `Button` | `buttonType="outlined" color="baseContainer" size="xLarge" layout="fillWidth"` |
| **Sub** (보조 링크) | `TextButton` | `color="brandDefault"` |

## Design Tokens

| Property | Context | Token | Value |
|----------|---------|-------|-------|
| Container Padding | Modal | `modal.padding` | 24px |
| Container Padding | BottomSheet | `bottomSheet.padding` | 20px |
| Button Gap | All | `modal.buttonGap` | 12px |
| Caption Font Size | All | `typography.sm` | 14px |
| Button Height (xLarge) | All | `primitive.12` | 48px |

## Usage Guidelines

### Recommended Combinations

| 상황 | Variant | 버튼 조합 | 예시 |
|------|---------|----------|------|
| 중요한 결정 | `strong` | Main + Alternative | 결제, 저장 |
| 균등한 선택 | `neutral` | Main + Alternative | 확인/취소 |
| 단순 확인 | `cancel` | Main only | 알림 닫기 |
| 인라인 액션 | `compact` | Main + Sub | 수정/삭제 |

### With Caption
```tsx
<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 6 }}>
    변경 사항을 저장하시겠습니까?
  </Text>
  <Button buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth">
    저장
  </Button>
  <Button buttonType="outlined" color="baseContainer" size="xLarge" layout="fillWidth">
    취소
  </Button>
</View>
```

### Main + Sub Combination
```tsx
<View style={{ flexDirection: 'column', gap: 12, padding: 20, alignItems: 'center' }}>
  <Button buttonType="filled" color="brandDefault" size="xLarge" layout="fillWidth">
    로그인
  </Button>
  <TextButton color="brandDefault">
    회원가입
  </TextButton>
</View>
```

## Design Principles

1. **버튼 순서 유지**: Strong에서는 Main이 위에, Neutral/Compact에서는 Main이 오른쪽에 위치. 순서를 임의로 변경하지 마세요.

2. **적절한 variant 선택**: 모달이나 시트의 주요 CTA는 Strong, 인라인 액션은 Compact를 사용하세요.

3. **버튼 조합 일관성**: 같은 유형의 다이얼로그에서는 동일한 버튼 조합을 사용하세요. Alternative와 Sub을 혼용하지 않습니다.

## Accessibility

1. **Focus Order**: 버튼 간 포커스 순서는 시각적 순서와 일치합니다.
2. **Keyboard Navigation**: Tab 키로 버튼 간 이동, Enter/Space로 활성화
3. **Screen Reader**: 버튼 그룹의 컨텍스트를 `role="group"`과 `aria-label`로 전달
4. **Loading State**: 로딩 중 `aria-busy="true"` 설정

## Do & Don't

### ✅ Do
- 상황에 맞는 variant 선택
- 버튼 순서 규칙 준수 (Main 위치)
- Modal/BottomSheet에 맞는 padding 사용

### ❌ Don't
- 버튼 순서 임의 변경
- Alternative와 Sub 혼용
- 3개 이상의 버튼 사용 (2개 권장)
- gap/padding 하드코딩 (토큰 사용)

## Code Examples

### Modal (Strong Variant)
```tsx
{/* Modal 내부: padding: 24px (modal.padding) */}
<View style={{ flexDirection: 'column', gap: 12, padding: 24 }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={handleConfirm}
  >
    확인
  </Button>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onPress={handleCancel}
  >
    취소
  </Button>
</View>
```

### BottomSheet (Neutral Variant)
```tsx
{/* BottomSheet 내부: padding: 20px (bottomSheet.padding) */}
<View style={{ flexDirection: 'row', gap: 12, padding: 20 }}>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onPress={handleCancel}
  >
    취소
  </Button>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={handleConfirm}
  >
    확인
  </Button>
</View>
```
