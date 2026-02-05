# ListCell Component

> 리스트 아이템을 표시하는 수평 레이아웃 컴포넌트입니다.

## Quick Reference

```tsx
// Web
import { ListCell } from '@baerae-zkap/design-system';
<ListCell
  leading={<Avatar src="user.jpg" />}
  title="홍길동"
  subtitle="hong@example.com"
  trailing={<ChevronRight />}
  onClick={() => {}}
/>

// React Native
import { ListCell } from '@baerae-zkap/design-system/native';
<ListCell
  leading={<Avatar src="user.jpg" />}
  title="홍길동"
  subtitle="hong@example.com"
  trailing={<ChevronRight />}
  onPress={() => {}}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `leading` | `ReactNode` | - | | 좌측 영역 (아이콘, 아바타 등) |
| `title` | `ReactNode` | - | ✅ | 메인 타이틀 |
| `subtitle` | `ReactNode` | - | | 서브타이틀 |
| `trailing` | `ReactNode` | - | | 우측 영역 (화살표, 값 등) |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | | 크기 |
| `disabled` | `boolean` | `false` | | 비활성화 상태 |
| `divider` | `boolean` | `false` | | 하단 구분선 표시 |

### Web-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `() => void` | 클릭 핸들러 |

### React Native-specific Props
| Prop | Type | Description |
|------|------|-------------|
| `onPress` | `() => void` | 탭 핸들러 |

## Design Tokens

| Property | Token | Value |
|----------|-------|-------|
| Min Height (small) | - | 44px |
| Min Height (medium) | - | 56px |
| Min Height (large) | - | 72px |
| Padding Y (small) | `spacing.primitive.2` | 8px |
| Padding Y (medium) | `spacing.primitive.3` | 12px |
| Padding Y (large) | `spacing.primitive.4` | 16px |
| Padding X | `spacing.primitive.4` | 16px |
| Gap (small/medium) | `spacing.primitive.3` | 12px |
| Gap (large) | `spacing.primitive.4` | 16px |
| Divider Color | `border.base.default` | #e2e8f0 |
| Title Color | `content.base.default` | #334155 |
| Subtitle Color | `content.base.secondary` | #64748b |

## Usage Rules

### 1. Leading 영역
| 컨텐츠 | 권장 크기 | 예시 |
|--------|----------|------|
| 아이콘 | 20-24px | 설정 메뉴 |
| 아바타 | 36-48px | 사용자 목록 |
| 썸네일 | 40-56px | 콘텐츠 목록 |

### 2. Trailing 영역
| 컨텐츠 | 용도 |
|--------|------|
| 화살표 (›) | 상세 페이지 이동 |
| 값 텍스트 | 현재 설정값 표시 |
| Switch | 토글 설정 |
| Badge | 알림 개수 |

### 3. Divider 사용
```tsx
// ✅ 마지막 아이템 제외하고 divider
{items.map((item, index) => (
  <ListCell
    key={item.id}
    title={item.title}
    divider={index < items.length - 1}
  />
))}
```

## Accessibility

1. **Interactive Cell**: onClick/onPress 있으면 `role="button"` 자동 설정
2. **Keyboard Navigation**: Enter/Space로 활성화 가능
3. **Touch Target**: 최소 44px 높이로 터치 영역 확보

## Code Examples

### Settings Menu
```tsx
<View>
  <ListCell
    leading={<SettingsIcon />}
    title="알림 설정"
    trailing={<ChevronRight />}
    onPress={() => navigate('notifications')}
    divider
  />
  <ListCell
    leading={<ProfileIcon />}
    title="계정 정보"
    trailing={<ChevronRight />}
    onPress={() => navigate('account')}
    divider
  />
  <ListCell
    leading={<HelpIcon />}
    title="고객센터"
    trailing={<ChevronRight />}
    onPress={() => navigate('help')}
  />
</View>
```

### User List
```tsx
{users.map((user, index) => (
  <ListCell
    key={user.id}
    leading={<Avatar src={user.avatar} size={40} />}
    title={user.name}
    subtitle={user.email}
    onPress={() => selectUser(user)}
    divider={index < users.length - 1}
  />
))}
```

### With Value Display
```tsx
<ListCell
  title="언어"
  trailing={<Text style={{ color: '#64748b' }}>한국어</Text>}
  onPress={() => openLanguageSelector()}
/>
```
