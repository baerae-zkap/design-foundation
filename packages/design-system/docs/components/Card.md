# Card Component

> 콘텐츠에 대한 정보를 간략하게 표현하는 카드 요소입니다.
> 이미지, 텍스트, 뱃지 등 다양한 요소를 조합하여 정보를 시각적으로 일관성 있게 전달합니다.
> Montage 디자인 시스템 패턴을 따릅니다.

## Quick Reference

```tsx
// Web - Container Mode
import { Card } from '@baerae-zkap/design-system';
<Card variant="elevated" padding="medium">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

// React Native - Container Mode
import { Card } from '@baerae-zkap/design-system/native';
<Card variant="elevated" padding="medium">
  <Text>Card Title</Text>
  <Text>Card content...</Text>
</Card>

// React Native - Content Card Mode (Montage)
<Card
  thumbnail={{ uri: 'https://example.com/image.jpg' }}
  heading="제목"
  caption="설명"
  onPress={() => {}}
/>
```

## Props

### Common Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"elevated"` \| `"outlined"` \| `"filled"` | `"elevated"` | | 스타일 변형 |
| `padding` | `"none"` \| `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 내부 패딩 크기 (Container mode) |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `children` | `ReactNode` | - | | 카드 콘텐츠 |
| `style` | `ViewStyle` | - | | 커스텀 스타일 |

### Content Card Props (Montage)
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `thumbnail` | `ImageSourcePropType` | - | | 썸네일 이미지 소스 |
| `thumbnailAspectRatio` | `number` | `3/2` | | 썸네일 비율 |
| `overlayCaption` | `string` | - | | 썸네일 위 오버레이 캡션 |
| `toggleIcon` | `ReactNode` | - | | 토글 아이콘 (북마크, 좋아요 등) |
| `onTogglePress` | `() => void` | - | | 토글 아이콘 press 핸들러 |
| `topContent` | `ReactNode` | - | | Heading 상단 커스텀 콘텐츠 |
| `heading` | `string` | - | | 메인 제목 |
| `headingNumberOfLines` | `number` | `2` | | 제목 최대 줄 수 |
| `caption` | `string` | - | | 설명 텍스트 |
| `captionNumberOfLines` | `number` | `1` | | 설명 최대 줄 수 |
| `subCaption` | `string` | - | | 보조 설명 |
| `extraCaption` | `string` | - | | 추가 설명 |
| `bottomContent` | `ReactNode` | - | | Caption 하단 커스텀 콘텐츠 |
| `width` | `number` | - | | 카드 너비 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 (클릭 가능한 카드) |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `(event) => void` | 탭 핸들러 (클릭 가능한 카드) |
| `onLongPress` | `(event) => void` | 길게 누르기 핸들러 |

## Modes

Card는 두 가지 모드로 작동합니다:

| Mode | Detection | Description |
|------|-----------|-------------|
| **Container mode** | `thumbnail`, `heading`, `caption` 없음 | 자유로운 children 배치 + padding 적용 |
| **Content card mode** | `thumbnail`, `heading`, `caption` 존재 | 구조화된 레이아웃 (Montage 패턴) |

## Variants

| Variant | 용도 | 특징 |
|---------|------|------|
| `elevated` | 기본, 강조 콘텐츠 | 그림자로 떠있는 느낌 |
| `outlined` | 그룹화, 구분 | 테두리로 경계 표시 |
| `filled` | 보조 콘텐츠 | 채워진 배경 |

## Padding (Container mode)

| Size | Value | Token | Use Case |
|------|-------|-------|----------|
| `none` | 0px | - | 이미지/풀블리드 콘텐츠 |
| `small` | 12px | `spacing.primitive[3]` | 작은 콘텐츠 |
| `medium` | 20px | `spacing.component.card.padding.md` | 일반 콘텐츠 (기본) |
| `large` | 24px | `spacing.component.card.padding.lg` | 큰 콘텐츠 |

## Content Card Anatomy

Content Card mode에서 카드는 다음과 같은 구조를 가집니다:

### Thumbnail Section
- **Image**: 썸네일 이미지 (aspectRatio 지정 가능)
- **Overlay Caption**: 이미지 하단에 오버레이로 표시되는 캡션
- **Toggle Icon**: 우측 상단 토글 아이콘 (북마크, 좋아요 등)

### Content Section
- **Top Content**: Heading 상단 커스텀 영역 (뱃지, 메타데이터 등)
- **Heading**: 메인 제목 (최대 줄 수 지정 가능)
- **Caption**: 설명 텍스트 (최대 줄 수 지정 가능)
- **Sub Caption**: 보조 설명
- **Extra Caption**: 추가 설명
- **Bottom Content**: Caption 하단 커스텀 영역 (버튼, 액션 등)

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| **Container** | | |
| Border Radius | `radius.component.card.sm` | 12px |
| Padding (none) | - | 0px |
| Padding (small) | `spacing.primitive[3]` | 12px |
| Padding (medium) | `spacing.component.card.padding.md` | 20px |
| Padding (large) | `spacing.component.card.padding.lg` | 24px |
| **Content Card** | | |
| Thumbnail Border Radius (Top) | `radius.component.card.sm` | 12px |
| Content Padding (Horizontal) | `spacing.primitive[2]` | 8px |
| Content Padding (Top) | `spacing.primitive[2]` | 8px |
| Content Gap | `spacing.primitive[1]` | 4px |
| Heading Font Size | `typography.fontSize.md` | 16px |
| Heading Font Weight | `typography.fontWeight.semibold` | 600 |
| Heading Line Height | - | 24px |
| Caption Font Size | `typography.fontSize.xs` | 12px |
| Caption Font Weight | `typography.fontWeight.medium` | 500 |
| Caption Line Height | - | 18px |
| Overlay Background | - | `rgba(0, 0, 0, 0.35)` |
| Overlay Padding (Horizontal) | `spacing.semantic.inset.xs` | 12px |
| Overlay Padding (Vertical) | `spacing.primitive[2]` | 8px |
| Toggle Icon Size | `spacing.primitive[6]` | 24px |
| Toggle Icon Position (Top/Right) | `spacing.primitive[3]` | 12px |
| Disabled Opacity | - | 0.5 |

## Color Values

### Elevated Variant
| Property | Value |
|----------|-------|
| Background | `colors.surface.base.default` |
| Background (Pressed) | `colors.surface.base.alternative` |
| Shadow | `shadowColor: palette.static.black, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2` |

### Outlined Variant
| Property | Value |
|----------|-------|
| Background | `colors.surface.base.default` |
| Background (Pressed) | `colors.surface.base.alternative` |
| Border | `1px solid colors.border.base.default` |

### Filled Variant
| Property | Value |
|----------|-------|
| Background | `colors.surface.base.alternative` |
| Background (Pressed) | `colors.border.base.default` |

### Content Colors
| Element | Color |
|---------|-------|
| Heading | `colors.content.base.default` |
| Caption | `colors.content.base.secondary` |
| Sub/Extra Caption | `colors.content.base.assistive` |
| Overlay Caption | `palette.static.white` |

## States

| State | Description | Visual Change |
|-------|-------------|---------------|
| Default | 기본 상태 | - |
| Pressed | 누르고 있는 상태 (클릭 가능한 카드만) | 배경 어두워짐 |
| Disabled | 비활성화 | opacity: 0.5 |

## Accessibility

1. **Interactive Cards**: onPress가 있는 카드는 자동으로 Pressable 사용
2. **Disabled State**: disabled 상태에서 클릭 이벤트 차단
3. **Screen Reader**: PressableProps 통해 접근성 라벨 지원
4. **Touch Target**: 토글 아이콘은 hitSlop 8px로 터치 영역 확장
5. **Text Overflow**: numberOfLines로 텍스트 잘림 제어

## Usage Guidelines

### 사용 시기
- 관련된 정보를 그룹화할 때
- 콘텐츠를 명확하게 구분해야 할 때
- 클릭 가능한 콘텐츠 블록을 표시할 때 (onPress 제공 시)
- 썸네일과 텍스트 정보를 결합할 때 (Content Card mode)

### Mode 선택 기준
| 상황 | Mode | 예시 |
|------|------|------|
| 자유로운 레이아웃 필요 | Container | 커스텀 카드, 대시보드 위젯 |
| 썸네일 + 텍스트 정보 | Content Card | 콘텐츠 목록, 추천 항목 |
| 이미지 없이 텍스트만 | Container | 설정 그룹, 알림 카드 |

### Variant 선택 기준
| 상황 | Variant | 예시 |
|------|---------|------|
| 주요 콘텐츠 강조 | `elevated` | 프로필 카드, 주요 정보 |
| 리스트 아이템 | `outlined` | 설정 그룹, 옵션 목록 |
| 보조 정보 | `filled` | 힌트, 배경 정보 |

### Padding 선택 기준 (Container mode)
| 상황 | Padding | 예시 |
|------|---------|------|
| 이미지/풀블리드 | `none` | 썸네일 카드 |
| 작은 콘텐츠 | `small` | 태그, 뱃지 |
| 일반 콘텐츠 | `medium` | 기본 카드 |
| 큰 콘텐츠 | `large` | 폼, 상세 정보 |

## Do & Don't

### ✅ Do
- 관련된 콘텐츠를 함께 그룹화
- 적절한 패딩으로 가독성 확보
- 클릭 가능한 카드에만 onPress 제공
- 일관된 variant 사용
- Heading은 간결하고 명확하게 작성
- 썸네일 비율을 콘텐츠 특성에 맞게 조정

### ❌ Don't
- 너무 많은 중첩 카드 사용 금지
- 클릭할 수 없는데 클릭 가능해 보이는 스타일 사용 금지
- 너무 작은 패딩으로 답답한 느낌 주지 않기
- 한 화면에 너무 많은 elevated 카드 사용 금지 (그림자 남용)
- Heading에 너무 긴 텍스트 사용하지 않기
- 토글 아이콘 없이 onTogglePress만 제공하지 않기

## Code Examples

### Basic Usage (Container Mode)
```tsx
// Non-clickable card
<Card variant="elevated" padding="medium">
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
    Card Title
  </Text>
  <Text style={{ color: '#64748b' }}>
    Card description text goes here.
  </Text>
</Card>
```

### Clickable Card (Container Mode)
```tsx
<Card
  variant="elevated"
  padding="medium"
  onPress={() => console.log('Card pressed')}
>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
    Tap me
  </Text>
</Card>
```

### Content Card with Thumbnail
```tsx
<Card
  variant="elevated"
  thumbnail={{ uri: 'https://example.com/image.jpg' }}
  thumbnailAspectRatio={3/2}
  heading="콘텐츠 제목"
  caption="콘텐츠 설명입니다."
  onPress={() => console.log('Card pressed')}
/>
```

### Content Card with Overlay Caption
```tsx
<Card
  variant="elevated"
  thumbnail={{ uri: 'https://example.com/image.jpg' }}
  overlayCaption="NEW"
  heading="신규 콘텐츠"
  caption="최신 업데이트 내용"
/>
```

### Content Card with Toggle Icon
```tsx
<Card
  variant="elevated"
  thumbnail={{ uri: 'https://example.com/image.jpg' }}
  heading="북마크 가능한 콘텐츠"
  caption="아이콘을 눌러 저장하세요"
  toggleIcon={<BookmarkIcon />}
  onTogglePress={() => console.log('Bookmark toggled')}
/>
```

### Content Card with Custom Content Areas
```tsx
<Card
  variant="elevated"
  thumbnail={{ uri: 'https://example.com/image.jpg' }}
  topContent={
    <View style={{ flexDirection: 'row', gap: 4 }}>
      <Badge>인기</Badge>
      <Badge>추천</Badge>
    </View>
  }
  heading="완전한 콘텐츠 카드"
  caption="다양한 정보를 담고 있습니다"
  subCaption="부가 설명"
  extraCaption="추가 정보"
  bottomContent={
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Button size="small">공유</Button>
      <Button size="small">저장</Button>
    </View>
  }
/>
```

### Variants
```tsx
<View style={{ gap: 16 }}>
  <Card variant="elevated" padding="medium">
    <Text>Elevated Card</Text>
  </Card>
  <Card variant="outlined" padding="medium">
    <Text>Outlined Card</Text>
  </Card>
  <Card variant="filled" padding="medium">
    <Text>Filled Card</Text>
  </Card>
</View>
```

### Padding Sizes
```tsx
<View style={{ gap: 16 }}>
  <Card variant="elevated" padding="none">
    <View style={{ padding: 16 }}>
      <Text>No padding (custom padding applied)</Text>
    </View>
  </Card>
  <Card variant="elevated" padding="small">
    <Text>Small padding</Text>
  </Card>
  <Card variant="elevated" padding="medium">
    <Text>Medium padding (default)</Text>
  </Card>
  <Card variant="elevated" padding="large">
    <Text>Large padding</Text>
  </Card>
</View>
```

### Horizontal Card List
```tsx
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <View style={{ flexDirection: 'row', gap: 12, padding: 20 }}>
    {items.map((item) => (
      <Card
        key={item.id}
        variant="elevated"
        thumbnail={{ uri: item.image }}
        heading={item.title}
        caption={item.description}
        width={200}
        onPress={() => console.log(item.id)}
      />
    ))}
  </View>
</ScrollView>
```

### Disabled State
```tsx
<Card
  variant="elevated"
  padding="medium"
  onPress={() => {}}
  disabled
>
  <Text>Disabled Card</Text>
</Card>
```
