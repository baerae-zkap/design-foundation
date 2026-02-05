# Accordion Component

> 펼침/접힘 가능한 콘텐츠 컨테이너입니다.

## Quick Reference

```tsx
// Web
import { Accordion } from '@baerae-zkap/design-system';
<Accordion
  title="제목"
  defaultExpanded={false}
  size="medium"
>
  콘텐츠
</Accordion>

// React Native
import { Accordion } from '@baerae-zkap/design-system/native';
<Accordion
  title="제목"
  defaultExpanded={false}
  size="medium"
>
  <Text>콘텐츠</Text>
</Accordion>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `ReactNode` | - | ✅ | 헤더 제목 |
| `children` | `ReactNode` | - | ✅ | 콘텐츠 |
| `defaultExpanded` | `boolean` | `false` | | 기본 펼침 상태 (비제어) |
| `expanded` | `boolean` | - | | 펼침 상태 (제어) |
| `onChange` | `(expanded: boolean) => void` | - | | 펼침 상태 변경 핸들러 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `size` | `"medium"` \| `"large"` | `"medium"` | | 크기 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 헤더 클릭 핸들러 (기본 토글 동작 오버라이드) |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `() => void` | 헤더 탭 핸들러 (기본 토글 동작 오버라이드) |

## Usage Modes

| Mode | 용도 | 특징 |
|------|------|------|
| Uncontrolled | 기본 사용 | `defaultExpanded` 사용, 내부 상태 관리 |
| Controlled | 외부 상태 제어 | `expanded` + `onChange` 사용 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Header Height (medium) | - | 48px |
| Header Height (large) | - | 56px |
| Padding (horizontal) | - | 16px |
| Content Padding | - | 16px |
| Icon Size | - | 16px |
| Border Radius | - | 8px |
| Border | - | 1px solid #e2e8f0 |

## Color Values

| Element | State | Color |
|---------|-------|-------|
| Background | Collapsed | `white` |
| Background | Expanded (header) | `#fafbfc` |
| Title | - | `#334155` |
| Icon | - | `#64748b` |
| Border | - | `#e2e8f0` |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Expanded | 펼쳐진 상태 | 헤더 배경 #fafbfc, 아이콘 180° 회전, 콘텐츠 표시 |
| Pressed | 헤더 누르는 상태 (Native) | 배경 #f8fafc |
| Disabled | 비활성화 | opacity: 0.5 |

## Animations

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Content Height | height | 200ms | ease |
| Icon Rotation | transform | 200ms | ease |
| Header Background | background-color | 200ms | ease |

## Usage Guidelines

### 사용 시기
- 긴 콘텐츠를 접어서 공간 절약
- FAQ, 설정 패널, 필터 옵션 등
- 단계별 정보 표시

### Size 선택 기준
| 상황 | Size | 예시 |
|------|------|------|
| 일반적인 경우 | `medium` | FAQ, 설정 |
| 중요한 섹션 | `large` | 주요 카테고리 헤더 |

## Accessibility

1. **Keyboard Navigation**: 헤더에 키보드 포커스 가능
2. **Screen Reader**: `accessibilityRole="button"`, `accessibilityState.expanded` 설정
3. **Focus Indicator**: 키보드 포커스 시 아웃라인 표시
4. **Clear Action**: 헤더 클릭으로 토글 가능

## Do & Don't

### ✅ Do
- 관련 콘텐츠를 그룹화
- 명확한 제목 사용
- 기본 상태는 접힌 상태 권장

### ❌ Don't
- 너무 많은 Accordion 중첩 금지 (최대 1단계)
- 중요한 정보를 접힌 상태로 숨기지 말기
- 너무 긴 콘텐츠는 분할 고려

## Code Examples

### Basic Usage (Uncontrolled)
```tsx
<Accordion title="자주 묻는 질문">
  <Text>답변 내용이 여기에 들어갑니다.</Text>
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

### Sizes
```tsx
<View style={{ gap: 16 }}>
  <Accordion title="Medium (기본)" size="medium">
    <Text>콘텐츠</Text>
  </Accordion>
  <Accordion title="Large" size="large">
    <Text>콘텐츠</Text>
  </Accordion>
</View>
```

### Default Expanded
```tsx
<Accordion title="기본으로 펼쳐짐" defaultExpanded>
  <Text>기본으로 보이는 콘텐츠</Text>
</Accordion>
```

### Disabled
```tsx
<Accordion title="비활성화됨" disabled>
  <Text>접근 불가</Text>
</Accordion>
```

### Multiple Accordions
```tsx
<View style={{ gap: 12 }}>
  <Accordion title="섹션 1">
    <Text>내용 1</Text>
  </Accordion>
  <Accordion title="섹션 2">
    <Text>내용 2</Text>
  </Accordion>
  <Accordion title="섹션 3">
    <Text>내용 3</Text>
  </Accordion>
</View>
```
