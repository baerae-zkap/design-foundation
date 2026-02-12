# SectionMessage Component

섹션 내에서 중요한 정보, 피드백, 경고를 전달하는 인라인 메시지 컴포넌트입니다.

## Import

```typescript
// React Native
import { SectionMessage } from '@baerae-zkap/design-system/native';
```

## Basic Usage

```tsx
// 기본 info 메시지
<SectionMessage
  variant="info"
  message="중요한 정보를 확인해주세요."
/>

// 액션 버튼 포함
<SectionMessage
  variant="warning"
  message="결제 정보를 업데이트해야 합니다."
  actionLabel="업데이트"
  onAction={() => console.log('Action pressed')}
/>

// 제목 포함
<SectionMessage
  variant="error"
  heading="오류 발생"
  message="네트워크 연결을 확인해주세요."
/>

// 커스텀 아이콘
<SectionMessage
  variant="success"
  message="변경사항이 저장되었습니다."
  icon="✨"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | Yes | - | 메시지 유형 |
| `message` | `string` | Yes | - | 메시지 내용 |
| `actionLabel` | `string` | No | - | 액션 버튼 라벨 |
| `onAction` | `() => void` | No | - | 액션 버튼 콜백 |
| `testID` | `string` | No | - | 테스트 ID |
| `accessibilityLabel` | `string` | No | - | 접근성 라벨 |
| `style` | `ViewStyle` | No | - | 커스텀 스타일 |
| `icon` | `ReactNode` | No | - | 커스텀 아이콘 (기본 아이콘 대체) |
| `heading` | `string` | No | - | 메시지 제목 (선택적) |

## Variants

### info

일반 정보 전달용 메시지입니다.

- **배경색**: `colors.surface.info.default` (밝은 파란색)
- **텍스트 색상**: `colors.content.info.default` (파란색)
- **기본 아이콘**: ℹ️

```tsx
<SectionMessage
  variant="info"
  message="새로운 기능이 추가되었습니다."
/>
```

### success

성공, 완료 상태를 알리는 메시지입니다.

- **배경색**: `colors.surface.success.default` (밝은 초록색)
- **텍스트 색상**: `colors.content.base.strong` (진한 회색)
- **기본 아이콘**: ✓

```tsx
<SectionMessage
  variant="success"
  message="프로필이 성공적으로 업데이트되었습니다."
/>
```

### warning

주의가 필요한 상황을 알리는 메시지입니다.

- **배경색**: `colors.surface.warning.default` (밝은 노란색)
- **텍스트 색상**: `colors.content.base.strong` (진한 회색)
- **기본 아이콘**: ⚠️

```tsx
<SectionMessage
  variant="warning"
  message="결제 수단이 곧 만료됩니다."
  actionLabel="변경하기"
  onAction={() => {}}
/>
```

### error

오류 상황을 알리는 메시지입니다.

- **배경색**: `colors.surface.error.default` (밝은 빨간색)
- **텍스트 색상**: `colors.content.base.strong` (진한 회색)
- **기본 아이콘**: ✕

```tsx
<SectionMessage
  variant="error"
  heading="오류 발생"
  message="요청을 처리할 수 없습니다."
/>
```

### neutral

중립적인 정보 전달용 메시지입니다.

- **배경색**: `colors.surface.base.container` (회색)
- **텍스트 색상**: `colors.content.base.default` (기본 회색)
- **기본 아이콘**: ℹ️

```tsx
<SectionMessage
  variant="neutral"
  message="선택 사항입니다."
/>
```

## Foundation Tokens

| Property | Token | Value |
|----------|-------|-------|
| padding | `spacing.semantic.inset.xs` | 12px |
| borderRadius | `radius.primitive.sm` | 8px |
| icon-message gap | `spacing.semantic.horizontal.3xs` | 4px |
| content-action gap | `spacing.semantic.horizontal.2xs` | 8px |
| heading marginBottom | `spacing.primitive[1]` | 4px |
| message fontSize | `typography.fontSize.sm` | 14px |
| message lineHeight | `typography.lineHeight.sm` | 20px |
| heading fontWeight | `typography.fontWeight.semibold` | 600 |
| action button paddingY | `spacing.primitive[1]` | 4px |
| action button paddingX | `spacing.semantic.horizontal.2xs` | 8px |
| pressed opacity | - | 0.7 |

## Advanced Features

### Heading Support

중요한 메시지에는 제목을 추가할 수 있습니다.

```tsx
<SectionMessage
  variant="warning"
  heading="주의 사항"
  message="이 작업은 되돌릴 수 없습니다."
  actionLabel="계속"
  onAction={() => {}}
/>
```

### Custom Icon

기본 아이콘 대신 커스텀 아이콘을 사용할 수 있습니다.

```tsx
import { Icon } from './Icon';

<SectionMessage
  variant="info"
  message="새 메시지가 도착했습니다."
  icon={<Icon name="mail" size={16} />}
/>
```

### Style Override

커스텀 스타일로 메시지를 확장할 수 있습니다.

```tsx
<SectionMessage
  variant="success"
  message="저장 완료"
  style={{ marginVertical: 16 }}
/>
```

## Usage Guidelines

### When to Use

| Scenario | Recommended |
|----------|-------------|
| 폼 제출 후 결과 표시 | ✅ success 또는 error |
| 중요한 안내사항 표시 | ✅ info 또는 warning |
| 액션 유도 | ✅ actionLabel + onAction |
| 페이지 상단 공지 | ✅ info 또는 neutral |

### Best Practices

1. **variant 선택**
   - **info**: 일반 정보, 팁, 가이드
   - **success**: 성공 완료 메시지
   - **warning**: 주의사항, 경고 (액션 필요 시)
   - **error**: 오류, 실패 메시지
   - **neutral**: 중립적 안내

2. **메시지 작성**
   - 명확하고 간결하게 작성
   - 사용자가 취해야 할 행동 명시
   - heading은 간략하게 (2-4단어)

3. **액션 버튼**
   - 사용자의 다음 행동이 명확할 때만 사용
   - actionLabel은 동사로 시작 ("확인", "변경하기", "자세히 보기")
   - 필수 액션일 경우 warning 또는 error variant 사용

4. **배치**
   - 관련 섹션 상단에 배치
   - 여러 메시지는 수직으로 gap 16px로 배치
   - 화면 전체 너비 사용 권장

## Accessibility

1. **자동 접근성 지원**
   - 스크린 리더가 variant와 message 읽음
   - 액션 버튼은 Pressable로 접근 가능

2. **커스텀 접근성 라벨**
   ```tsx
   <SectionMessage
     variant="error"
     message="결제 실패"
     accessibilityLabel="오류: 결제가 실패했습니다"
   />
   ```

3. **testID 제공**
   ```tsx
   <SectionMessage
     variant="warning"
     message="주의 사항"
     testID="warning-message"
   />
   ```

## Examples

### 폼 제출 성공

```tsx
<SectionMessage
  variant="success"
  heading="제출 완료"
  message="요청하신 내용이 정상적으로 제출되었습니다."
/>
```

### 결제 경고 (액션 포함)

```tsx
<SectionMessage
  variant="warning"
  heading="결제 정보 확인"
  message="등록된 카드가 곧 만료됩니다. 결제 수단을 업데이트해주세요."
  actionLabel="업데이트"
  onAction={() => navigation.navigate('PaymentSettings')}
/>
```

### 네트워크 오류

```tsx
<SectionMessage
  variant="error"
  heading="연결 실패"
  message="네트워크 연결을 확인하고 다시 시도해주세요."
  actionLabel="재시도"
  onAction={() => refetch()}
/>
```

### 안내 메시지

```tsx
<SectionMessage
  variant="info"
  message="회원가입 시 이메일 인증이 필요합니다."
/>
```

### 커스텀 아이콘과 스타일

```tsx
<SectionMessage
  variant="success"
  message="모든 작업이 완료되었습니다."
  icon="🎉"
  style={{ marginTop: 20, marginBottom: 20 }}
/>
```

## Design Principles

1. **Contextual Color**: variant별 색상으로 메시지 중요도 전달
2. **Clear Hierarchy**: 아이콘 → 제목 → 메시지 → 액션 순서로 정보 구조화
3. **Actionable**: 필요 시 즉시 행동할 수 있는 액션 버튼 제공
4. **Flexible**: 커스텀 아이콘, 제목, 스타일 지원으로 다양한 상황 대응
