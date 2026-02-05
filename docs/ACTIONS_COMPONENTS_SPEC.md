# Actions 컴포넌트 스펙 문서

> **목표**: Actions 카테고리 5개 컴포넌트 완벽 구현
> **작성일**: 2026-02-05
> **버전**: v1.0

---

## 컴포넌트 현황

| # | 컴포넌트 | 상태 | Web | Native | Storybook | 문서 |
|---|----------|------|-----|--------|-----------|------|
| 1 | **ActionArea** | ✅ 완료 | ✅ | ✅ | ✅ | ✅ |
| 2 | **Button** | ✅ 완료 | ✅ | ✅ | ✅ | ✅ |
| 3 | **TextButton** | ✅ 완료 | ✅ | ✅ | ✅ | ✅ |
| 4 | **Chip** | 🔴 신규 | - | - | - | - |
| 5 | **IconButton** | 🔴 신규 | - | - | - | - |

**패키지 버전**: `@baerae-zkap/design-system@0.1.6`

---

## 1. ActionArea (완료)

### Props API

```typescript
interface ActionAreaProps {
  variant?: 'strong' | 'neutral' | 'compact';
  position?: 'static' | 'absolute'; // Native: static | absolute, Web: static | sticky | fixed
  showGradient?: boolean;
  gradientHeight?: number;
  caption?: string;
  useSafeArea?: boolean;
  backgroundColor?: string;
  children: ReactNode; // Button, TextButton 조합
}
```

### 사용 패턴
```tsx
// 2버튼 (가로 균등)
<ActionArea variant="neutral">
  <Button buttonType="filled" color="baseContainer">취소</Button>
  <Button buttonType="filled" color="brandDefault">확인</Button>
</ActionArea>

// 세로 레이아웃
<ActionArea variant="strong">
  <Button buttonType="filled" color="brandDefault">주요 액션</Button>
  <Button buttonType="filled" color="baseContainer">보조 액션</Button>
</ActionArea>
```

---

## 2. Button (완료)

### Props API

```typescript
interface ButtonProps {
  buttonType?: 'filled' | 'outlined';
  color?: 'brandDefault' | 'brandSecondary' | 'baseContainer' | 'successDefault' | 'errorDefault';
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  layout?: 'hug' | 'fillWidth';
  isLoading?: boolean;
  disabled?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
  // Web: onClick, Native: onPress
}
```

### Foundation 토큰

| Size | Height | Font Size | Padding X | Border Radius |
|------|--------|-----------|-----------|---------------|
| small | 36px | 14px | 16px | 8px |
| medium | 40px | 14px | 16px | 8px |
| large | 44px | 14px | 20px | 8px |
| xLarge | 48px | 16px | 24px | 8px |

### Pressed 상태 색상

| Color | Default | Pressed |
|-------|---------|---------|
| brandDefault | `#2563eb` | `#1d4ed8` |
| brandSecondary | `#dbeafe` | `#bfdbfe` |
| baseContainer | `#f1f5f9` | `#e2e8f0` |
| successDefault | `#22c55e` | `#16a34a` |
| errorDefault | `#ef4444` | `#dc2626` |

---

## 3. TextButton (완료)

### Props API

```typescript
interface TextButtonProps {
  variant?: 'clear' | 'underline' | 'arrow';
  color?: 'brandDefault' | 'baseDefault' | 'errorDefault';
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
  disabled?: boolean;
  children?: ReactNode;
  // Web: onClick, Native: onPress
}
```

### Foundation 토큰

| Size | Font Size |
|------|-----------|
| xSmall | 12px |
| small | 14px |
| medium | 16px |
| large | 18px |
| xLarge | 20px |

### Pressed 상태

| Color | Default | Pressed Text | Pressed Bg |
|-------|---------|--------------|------------|
| brandDefault | `#2563eb` | `#1e40af` | `rgba(0,0,0,0.06)` |
| baseDefault | `#334155` | `#1e293b` | `rgba(0,0,0,0.06)` |
| errorDefault | `#ef4444` | `#b91c1c` | `rgba(0,0,0,0.06)` |

---

## 4. Chip (신규) 🔴

### 개요
Chip은 입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소입니다.

### Props API

```typescript
interface ChipProps {
  // 필수
  children: ReactNode;

  // 타입 & 외관
  chipType?: 'filter' | 'input' | 'assist' | 'suggestion';
  variant?: 'filled' | 'outlined';

  // 사이즈
  size?: 'small' | 'medium' | 'large';

  // 색상
  color?: 'brandDefault' | 'baseDefault' | 'successDefault' | 'errorDefault' | 'warningDefault';

  // 상태
  selected?: boolean;
  disabled?: boolean;

  // 아이콘
  leftIcon?: ReactNode;
  avatar?: ReactNode; // leftIcon과 배타적

  // 닫기 (Input Chip용)
  onClose?: () => void;
  closeIcon?: ReactNode;

  // 인터랙션
  onPress?: () => void; // Native
  onClick?: () => void; // Web

  // 스타일
  style?: ViewStyle; // Native
}
```

### Foundation 토큰 (신규 필요)

```json
{
  "chip": {
    "height": {
      "small": 24,
      "medium": 32,
      "large": 40
    },
    "fontSize": {
      "small": 12,
      "medium": 14,
      "large": 16
    },
    "paddingX": {
      "small": 8,
      "medium": 12,
      "large": 16
    },
    "borderRadius": 16,
    "iconSize": {
      "small": 14,
      "medium": 18,
      "large": 22
    },
    "gap": 4
  }
}
```

### 색상 시스템

| Color | Filled Bg | Filled Text | Outlined Border | Outlined Text |
|-------|-----------|-------------|-----------------|---------------|
| brandDefault | `#dbeafe` | `#1e40af` | `#2563eb` | `#2563eb` |
| baseDefault | `#f1f5f9` | `#334155` | `#cbd5e1` | `#334155` |
| successDefault | `#dcfce7` | `#166534` | `#22c55e` | `#166534` |
| errorDefault | `#fee2e2` | `#991b1b` | `#ef4444` | `#991b1b` |
| warningDefault | `#fef9c3` | `#854d0e` | `#eab308` | `#854d0e` |

### Selected 상태 색상

| Color | Selected Bg | Selected Text |
|-------|-------------|---------------|
| brandDefault | `#2563eb` | `#ffffff` |
| baseDefault | `#334155` | `#ffffff` |

### 상태별 동작

| 상태 | 시각적 변화 | 동작 |
|------|-------------|------|
| Default | 기본 색상 | 터치 가능 |
| Selected | 배경색 진해짐, 체크 아이콘 (filter) | 토글 |
| Pressed | 배경색 어두워짐 | 피드백 |
| Disabled | opacity 0.5 | 터치 불가 |

### Chip 타입별 용도

| Type | 용도 | 예시 |
|------|------|------|
| **filter** | 콘텐츠 필터링 | 카테고리, 태그 필터 |
| **input** | 사용자 입력 데이터 | 이메일, 태그 입력 |
| **assist** | 스마트 액션 | "캘린더 추가", "공유" |
| **suggestion** | 추천 항목 | 자동완성, 추천 답변 |

### 사용 예시

```tsx
// Filter Chip
<Chip
  chipType="filter"
  selected={isSelected}
  onPress={() => toggleFilter()}
>
  전자제품
</Chip>

// Input Chip (닫기 버튼)
<Chip
  chipType="input"
  avatar={<Avatar src="..." />}
  onClose={() => removeTag()}
>
  홍길동
</Chip>

// Assist Chip
<Chip
  chipType="assist"
  leftIcon={<Icon name="calendar" />}
  onPress={() => addToCalendar()}
>
  캘린더에 추가
</Chip>
```

### Storybook 스토리 목록

1. `Default` - 기본 Chip
2. `Sizes` - small, medium, large 비교
3. `Colors` - 색상 변형
4. `Types` - filter, input, assist, suggestion
5. `WithIcon` - 아이콘 포함
6. `WithAvatar` - 아바타 포함
7. `Closable` - 닫기 버튼
8. `Selected` - 선택 상태
9. `Disabled` - 비활성화
10. `ChipGroup` - 그룹 레이아웃

---

## 5. IconButton (신규) 🔴

### 개요
IconButton은 아이콘만 표시하는 컴팩트한 버튼입니다. 툴바, 액션바 등에서 사용됩니다.

### Props API

```typescript
interface IconButtonProps {
  // 필수
  icon: ReactNode;
  accessibilityLabel: string; // 필수! 스크린 리더용

  // 외관
  variant?: 'standard' | 'filled' | 'filledTonal' | 'outlined';

  // 사이즈
  size?: 'small' | 'medium' | 'large' | 'xLarge';

  // 색상
  color?: 'brandDefault' | 'baseDefault' | 'errorDefault';

  // 상태
  disabled?: boolean;
  isLoading?: boolean;

  // 토글 모드
  selected?: boolean;
  selectedIcon?: ReactNode;

  // 모양
  shape?: 'round' | 'square';

  // 인터랙션
  onPress?: () => void; // Native
  onClick?: () => void; // Web

  // 스타일
  style?: ViewStyle;
}
```

### Foundation 토큰 (신규 필요)

```json
{
  "iconButton": {
    "container": {
      "small": 32,
      "medium": 40,
      "large": 48,
      "xLarge": 56
    },
    "iconSize": {
      "small": 16,
      "medium": 20,
      "large": 24,
      "xLarge": 28
    },
    "borderRadius": {
      "round": 9999,
      "square": 8
    }
  }
}
```

### Variant 스타일

| Variant | Background | Border | Icon Color |
|---------|------------|--------|------------|
| **standard** | transparent | none | theme color |
| **filled** | solid color | none | white/contrast |
| **filledTonal** | 12% tint | none | theme color |
| **outlined** | transparent | 1px solid | theme color |

### 색상 시스템

**Standard Variant**

| Color | Icon Default | Icon Pressed | Bg Pressed |
|-------|--------------|--------------|------------|
| brandDefault | `#2563eb` | `#1d4ed8` | `rgba(37,99,235,0.12)` |
| baseDefault | `#334155` | `#1e293b` | `rgba(0,0,0,0.06)` |
| errorDefault | `#ef4444` | `#dc2626` | `rgba(239,68,68,0.12)` |

**Filled Variant**

| Color | Bg Default | Bg Pressed | Icon |
|-------|------------|------------|------|
| brandDefault | `#2563eb` | `#1d4ed8` | `#ffffff` |
| baseDefault | `#334155` | `#1e293b` | `#ffffff` |
| errorDefault | `#ef4444` | `#dc2626` | `#ffffff` |

**FilledTonal Variant**

| Color | Bg Default | Bg Pressed | Icon |
|-------|------------|------------|------|
| brandDefault | `#dbeafe` | `#bfdbfe` | `#1e40af` |
| baseDefault | `#f1f5f9` | `#e2e8f0` | `#334155` |
| errorDefault | `#fee2e2` | `#fecaca` | `#991b1b` |

### 토글 모드

```tsx
// 좋아요 토글
const [liked, setLiked] = useState(false);

<IconButton
  icon={<HeartOutline />}
  selectedIcon={<HeartFilled />}
  selected={liked}
  onPress={() => setLiked(!liked)}
  accessibilityLabel={liked ? "좋아요 취소" : "좋아요"}
/>
```

### 접근성 (중요!)

> ⚠️ **accessibilityLabel은 필수입니다.** 아이콘만 있는 버튼은 스크린 리더 사용자에게 정보를 제공해야 합니다.

```tsx
// ✅ 올바른 사용
<IconButton
  icon={<TrashIcon />}
  accessibilityLabel="삭제"
  onPress={handleDelete}
/>

// ❌ 잘못된 사용 (접근성 라벨 없음)
<IconButton
  icon={<TrashIcon />}
  onPress={handleDelete}
/>
```

### 사용 예시

```tsx
// Standard (기본)
<IconButton
  icon={<MenuIcon />}
  accessibilityLabel="메뉴 열기"
  onPress={openMenu}
/>

// Filled
<IconButton
  variant="filled"
  icon={<AddIcon />}
  accessibilityLabel="항목 추가"
  onPress={addItem}
/>

// Outlined
<IconButton
  variant="outlined"
  icon={<ShareIcon />}
  accessibilityLabel="공유"
  onPress={share}
/>

// Loading
<IconButton
  icon={<RefreshIcon />}
  isLoading={isRefreshing}
  accessibilityLabel="새로고침"
  onPress={refresh}
/>
```

### Storybook 스토리 목록

1. `Default` - 기본 IconButton
2. `Variants` - standard, filled, filledTonal, outlined
3. `Sizes` - small, medium, large, xLarge
4. `Colors` - brandDefault, baseDefault, errorDefault
5. `Shapes` - round, square
6. `States` - normal, pressed, disabled, loading
7. `Toggle` - selected/unselected
8. `InToolbar` - 툴바 컨텍스트

---

## 구현 순서

### Phase 1: Chip 구현

```
1. Foundation 토큰 추가
   └── public/chip-tokens.json

2. Native 컴포넌트
   └── packages/design-system/src/native/Chip.tsx

3. Web 컴포넌트
   └── packages/design-system/src/components/Chip/Chip.tsx

4. Export 추가
   ├── packages/design-system/src/native/index.ts
   └── packages/design-system/src/index.ts

5. Storybook
   └── zkap-rn-mvp/stories/baerae-design-system/Chip.stories.tsx

6. AI 문서
   └── packages/design-system/docs/components/Chip.md

7. 빌드 & 배포
```

### Phase 2: IconButton 구현

```
1. Foundation 토큰 추가
   └── public/iconbutton-tokens.json

2. Native 컴포넌트
   └── packages/design-system/src/native/IconButton.tsx

3. Web 컴포넌트
   └── packages/design-system/src/components/IconButton/IconButton.tsx

4. Export 추가

5. Storybook

6. AI 문서

7. 빌드 & 배포
```

---

## 체크리스트

### Chip

- [ ] Foundation 토큰 정의
- [ ] Native 컴포넌트 구현 (Pressable 기반)
- [ ] Web 컴포넌트 구현 (button 기반)
- [ ] Pressed 상태 (어두워지는 방향)
- [ ] Selected 상태
- [ ] Disabled 상태
- [ ] 아이콘/아바타 지원
- [ ] 닫기 버튼 (onClose)
- [ ] Storybook 10개 스토리
- [ ] AI 문서 작성
- [ ] 빌드 & 배포
- [ ] zkap-rn-mvp 통합 테스트

### IconButton

- [ ] Foundation 토큰 정의
- [ ] Native 컴포넌트 구현 (Pressable 기반)
- [ ] Web 컴포넌트 구현 (button 기반)
- [ ] 4개 Variant 구현
- [ ] Pressed 상태
- [ ] Loading 상태
- [ ] Toggle 모드 (selected)
- [ ] 접근성 라벨 필수 검증
- [ ] Storybook 8개 스토리
- [ ] AI 문서 작성
- [ ] 빌드 & 배포
- [ ] zkap-rn-mvp 통합 테스트

---

## 참고 자료

- [Chip Spec 상세](/Users/jaden/zkap-rn-mvp/CHIP_COMPONENT_SPEC.md)
- [IconButton Spec 상세](/Users/jaden/zkap-rn-mvp/IconButton-Specification.md)
- [TDS Mobile 연구](/Users/jaden/zkap-rn-mvp/TDS_Mobile_Component_Research.md)
- [Foundation Tokens](/Users/jaden/design-foundation/public/)
