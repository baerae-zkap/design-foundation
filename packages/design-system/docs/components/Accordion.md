# Accordion Component

> 펼침/접힘 가능한 콘텐츠 컨테이너입니다.
> Montage 디자인 시스템 패턴을 따르며, 플랫한 리스트형 구조를 사용합니다.

## Quick Reference

```tsx
// Web
import { Accordion } from '@baerae-zkap/design-system';
<Accordion
  title="제목"
  verticalPadding="medium"
  fillWidth={false}
  showDivider
>
  콘텐츠
</Accordion>

// React Native
import { Accordion } from '@baerae-zkap/design-system/native';
<Accordion
  title="제목"
  verticalPadding="medium"
  fillWidth={false}
  showDivider
>
  <Text>콘텐츠</Text>
</Accordion>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `ReactNode` | - | Yes | 헤더 제목 |
| `children` | `ReactNode` | - | Yes | 콘텐츠 |
| `defaultExpanded` | `boolean` | `false` | | 기본 펼침 상태 (비제어) |
| `expanded` | `boolean` | - | | 펼침 상태 (제어) |
| `onChange` | `(expanded: boolean) => void` | - | | 펼침 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `fillWidth` | `boolean` | `false` | | 전체 너비 모드 |
| `verticalPadding` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 상하 여백 크기 |
| `leadingIcon` | `ReactNode` | - | | 제목 좌측 아이콘 |
| `trailingContent` | `ReactNode` | - | | 우측 커스텀 콘텐츠 (chevron 대체) |
| `showDivider` | `boolean` | `false` | | 하단 구분선 표시 |

## Vertical Padding

상하 여백은 화면 내 배치와 정보의 계층 구조에 맞춰 유연하게 사용할 수 있습니다.

| Size | Value | Token | Use Case |
|------|-------|-------|----------|
| `small` | 8px | `spacing.primitive[2]` | 밀도 높은 목록, 중첩 아코디언 |
| `medium` | 12px | `spacing.primitive[3]` | 기본 사용 (설정, FAQ) |
| `large` | 16px | `spacing.primitive[4]` | 넉넉한 여백, 주요 섹션 |

## Fill Width

| Mode | Description |
|------|-------------|
| `fillWidth={false}` | 헤더가 콘텐츠에 맞춰 너비 결정 |
| `fillWidth={true}` | 헤더가 부모 컨테이너 전체 너비 차지 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Header padding (horizontal) | `spacing.primitive[3]` | 12px |
| Header gap | `spacing.primitive[2]` | 8px |
| Pressed background | `colors.surface.base.alternative` | - |
| Interaction border-radius | `radius.component.card.sm` | 12px |
| Icon size | - | 20px |
| Title font size | `typography.fontSize.md` | 16px |
| Title font weight | `typography.fontWeight.semibold` | 600 |
| Title color | `colors.content.base.default` | - |
| Icon color | `colors.content.base.secondary` | - |
| Divider color | `colors.border.solid.alternative` | - |
| Divider height | - | 1px |
| Content padding top | `spacing.primitive[1]` | 4px |
| Content padding bottom | `spacing.primitive[4]` | 16px |
| Disabled opacity | - | 0.38 |
| Animation duration | - | 200ms |

## Color Values

| Element | State | Color |
|---------|-------|-------|
| Background | Default | transparent |
| Background | Pressed | `surface.base.alternative` |
| Title | Default | `content.base.default` |
| Icon (chevron) | Default | `content.base.secondary` |
| Divider | - | `border.solid.alternative` |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | 투명 배경 |
| Pressed | 헤더 누름 (Native) | 배경 `surface.base.alternative`, 12px radius |
| Expanded | 펼쳐진 상태 | Chevron 180° 회전, 콘텐츠 표시 |
| Disabled | 비활성화 | opacity 0.38 |

## Animations

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Content Height | maxHeight | 200ms | linear |
| Content Opacity | opacity | 200ms | linear |
| Chevron Rotation | transform.rotate | 200ms | linear |

## Usage Guidelines

### Vertical Padding 선택 기준
| 상황 | Size | 예시 |
|------|------|------|
| 밀도 높은 목록 | `small` | 중첩 아코디언, 사이드 메뉴 |
| 일반적인 경우 | `medium` | FAQ, 설정, 필터 |
| 넉넉한 레이아웃 | `large` | 주요 섹션 헤더 |

### Fill Width 선택 기준
| 상황 | Fill Width | 예시 |
|------|------------|------|
| 카드/컨테이너 내부 | `false` | 설정 그룹 |
| 전체 화면 너비 사용 | `true` | 전체 화면 설정 목록 |

## Features

### Leading Icon
Heading 좌측에 아이콘을 배치하여 항목의 성격이나 카테고리를 시각적으로 표현합니다.

### Trailing Content
Heading 우측에 커스텀 요소를 배치합니다. 기본 Chevron 대신 아이콘 버튼, 화살표 등을 사용할 수 있습니다.

### Divider
구분선을 사용해 각 항목을 명확하게 구분합니다. 마지막 항목에는 구분선을 사용하지 않습니다.

### Nested Accordions
Accordion 하위에 또 다른 Accordion을 배치하여 계층 구조를 표현할 수 있습니다. 하위 항목은 좌측에 추가적인 여백(들여 쓰기)을 주어 시각적 위계를 구분합니다.

### Text Overflow
Heading과 콘텐츠의 길이가 길어지는 경우 제한 없이 여러 줄로 나타납니다.

## Accessibility

1. **Screen Reader**: `accessibilityRole="button"`, `accessibilityState.expanded` 설정
2. **Focus Indicator**: 키보드 포커스 시 12px radius 아웃라인 표시
3. **Clear Action**: 헤더 전체 영역이 탭 가능
4. **Disabled State**: opacity 0.38, 탭 불가

## Do & Don't

### Do
- Accordion이 포함한 콘텐츠를 예상할 수 있도록 명확하고 간결한 Heading 사용
- 한 페이지 내에서 열림/닫힘 아이콘 스타일 통일 (Chevron 또는 Arrow)
- 관련 콘텐츠를 그룹화하여 정보 탐색 용이하게

### Don't
- 한 페이지나 시스템 내에서 열림/닫힘 아이콘을 여러 스타일로 혼용하지 않기
- 너무 많은 Accordion 중첩 금지 (최대 2단계)
- 중요한 정보를 접힌 상태로 숨기지 않기

## Code Examples

### Basic Usage
```tsx
<Accordion title="자주 묻는 질문" verticalPadding="medium">
  <Text>답변 내용이 여기에 들어갑니다.</Text>
</Accordion>
```

### With Dividers (FAQ Pattern)
```tsx
<View>
  <Accordion title="상업적 사용이 가능한가요?" showDivider>
    <Text>네, 가능합니다.</Text>
  </Accordion>
  <Accordion title="커스터마이징해도 되나요?" showDivider>
    <Text>자유롭게 수정 가능합니다.</Text>
  </Accordion>
  <Accordion title="오류 신고는 어떻게?">
    <Text>GitHub 이슈에 등록해주세요.</Text>
  </Accordion>
</View>
```

### With Leading Icon
```tsx
<Accordion
  title="계정"
  leadingIcon={<User size={20} color="#6b7684" />}
  showDivider
>
  <Text>계정 관리 메뉴</Text>
</Accordion>
```

### With Trailing Content
```tsx
<Accordion
  title="조직"
  trailingContent={<MoreVertical size={20} color="#6b7684" />}
>
  <Text>조직 관리 메뉴</Text>
</Accordion>
```

### Nested Accordions
```tsx
<Accordion title="디자인" showDivider defaultExpanded>
  <View style={{ paddingLeft: 8 }}>
    <Accordion title="브랜드" verticalPadding="small" showDivider>
      <Text>브랜드 디자인</Text>
    </Accordion>
    <Accordion title="UX/UI" verticalPadding="small">
      <Text>UX/UI 디자인</Text>
    </Accordion>
  </View>
</Accordion>
```

### Controlled
```tsx
const [expanded, setExpanded] = useState(false);

<Accordion
  title="설정"
  expanded={expanded}
  onChange={setExpanded}
>
  <Text>설정 옵션</Text>
</Accordion>
```

### Fill Width
```tsx
<Accordion fillWidth title="전체 너비 아코디언" showDivider>
  <Text>전체 너비를 차지하는 아코디언입니다.</Text>
</Accordion>
```
