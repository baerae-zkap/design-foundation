# Design Foundation Project

## 프로젝트 개요

회사 서비스에서 사용할 **Design Foundation & Components Library**를 구축하는 프로젝트.
디자이너가 주도하여 만들고 있으며, 개발자가 실제 서비스에 적용할 수 있는 컴포넌트 라이브러리를 목표로 함.

---

## 현재 상태 (2025-02-06)

### 배포 완료

| 항목 | 상태 | 내용 |
|------|------|------|
| 패키지명 | ✅ | `@baerae-zkap/design-system@0.1.8` |
| 레지스트리 | ✅ | Google Artifact Registry |
| zkap-rn-mvp 통합 | ✅ | 타입 충돌 없이 설치됨 |
| iOS/Android 테스트 | ✅ | 시뮬레이터에서 검증됨 |
| Storybook | ✅ | `design-foundation/storybook/stories/baerae-design-system/`에서 관리 (52개 스토리) |
| Foundation 토큰 시스템 | ✅ | colors, typography, spacing, radius 완전 구축 |

### 완성된 컴포넌트

| 컴포넌트 | React Native | Storybook | AI 문서 | 토큰 사용 |
|----------|--------------|-----------|---------|----------|
| **Actions** | | | | |
| Button | ✅ | ✅ | ✅ | ✅ |
| TextButton | ✅ | ✅ | ✅ | ✅ |
| IconButton | ✅ | ✅ | ✅ | ✅ |
| Chip | ✅ | ✅ | ✅ | ✅ |
| ActionArea | ✅ | ✅ | ✅ | ✅ |
| **Contents** | | | | |
| Accordion | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ |
| ContentBadge | ✅ | ✅ | ✅ | ✅ |
| ListCell | ✅ | ✅ | ✅ | ✅ |
| ListCard | ✅ | ✅ | ✅ | ✅ |
| PlayBadge | ✅ | ✅ | ✅ | ✅ |
| SectionHeader | ✅ | ✅ | ✅ | ✅ |
| Table | ✅ | ✅ | ✅ | ✅ |
| Thumbnail | ✅ | ✅ | ✅ | ✅ |
| **Feedback** | | | | |
| Alert | ✅ | ✅ | ✅ | ✅ |
| FallbackView | ✅ | ✅ | ✅ | ✅ |
| PushBadge | ✅ | ✅ | ✅ | ✅ |
| SectionMessage | ✅ | ✅ | ✅ | ✅ |
| Snackbar | ✅ | ✅ | ✅ | ✅ |
| Toast | ✅ | ✅ | ✅ | ✅ |
| **Loading** | | | | |
| Loading | ✅ | ✅ | ✅ | ✅ |
| LoadingDots | ✅ | ✅ | ✅ | ✅ |
| Skeleton | ✅ | ✅ | ✅ | ✅ |
| **Navigations** | | | | |
| BottomNavigation | ✅ | ✅ | ✅ | ✅ |
| TopNavigation | ✅ | ✅ | ✅ | ✅ |
| Category | ✅ | ✅ | ✅ | ✅ |
| Tab | ✅ | ✅ | ✅ | ✅ |
| Pagination | ✅ | ✅ | ✅ | ✅ |
| PaginationDots | ✅ | ✅ | ✅ | ✅ |
| PageCounter | ✅ | ✅ | ✅ | ✅ |
| ProgressIndicator | ✅ | ✅ | ✅ | ✅ |
| ProgressTracker | ✅ | ✅ | ✅ | ✅ |
| **Presentation** | | | | |
| Autocomplete | ✅ | ✅ | ✅ | ✅ |
| BottomSheet | ✅ | ✅ | ✅ | ✅ |
| Menu | ✅ | ✅ | ✅ | ✅ |
| Popover | ✅ | ✅ | ✅ | ✅ |
| Popup | ✅ | ✅ | ✅ | ✅ |
| Tooltip | ✅ | ✅ | ✅ | ✅ |
| Divider | ✅ | ✅ | ✅ | ✅ |
| **Selection & Input** | | | | |
| CheckMark | ✅ | ✅ | ✅ | ✅ |
| Checkbox | ✅ | ✅ | ✅ | ✅ |
| Radio | ✅ | ✅ | ✅ | ✅ |
| DatePicker | ✅ | ✅ | ✅ | ✅ |
| TimePicker | ✅ | ✅ | ✅ | ✅ |
| FilterButton | ✅ | ✅ | ✅ | ✅ |
| FramedStyle | ✅ | ✅ | ✅ | ✅ |
| SearchField | ✅ | ✅ | ✅ | ✅ |
| SegmentedControl | ✅ | ✅ | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ |
| Slider | ✅ | ✅ | ✅ | ✅ |
| Switch | ✅ | ✅ | ✅ | ✅ |
| TextArea | ✅ | ✅ | ✅ | ✅ |
| TextField | ✅ | ✅ | ✅ | ✅ |

### Feedback 카테고리 완성 (2025-02-06)

Ultrapilot으로 5개 Feedback 컴포넌트 생성 완료:
- ✅ Foundation 토큰 시스템 구축 (colors, typography, spacing, radius)
- ✅ 모든 하드코딩 제거, 토큰 기반 컴포넌트로 마이그레이션
- ⏳ 퀄리티 개선 진행 중

### 컴포넌트 개발 원칙 (2025-02-06)

**모든 컴포넌트 개발 시 필수 준수사항:**

1. ✅ **existing-components 참조하여 개선**
   - 기존 패턴 유지하되 디자인 시스템 표준으로 업그레이드

2. ✅ **Foundation 토큰 필수 사용**
   - 하드코딩 절대 금지
   - colors, typography, spacing, radius 토큰 사용

3. ✅ **Props 설계 표준화**
   - 업계 표준 API 패턴 참조
   - 표준 네이밍 준수

4. ✅ **최고의 디자인 시스템 컴포넌트 구축**
   - 업계 베스트 프랙티스 적용
   - 접근성, 사용성, 확장성 고려

5. ✅ **AI 참조용 MD 파일 작성**
   - 각 컴포넌트마다 `packages/design-system/docs/components/[Name].md` 생성
   - Props, 사용 예제, 디자인 토큰 포함

6. ✅ **스토리북 완성을 최우선 목표**
   - 완벽한 Storybook 스토리 작성
   - 모든 변형, 상태, 사이즈 시각화

### 다음 작업 우선순위

우선순위 (Avatar/Avatar Group은 서비스에 불필요하여 제외):

1. ~~**Play Badge**~~ ✅ 완료
2. ~~**Loading (Spinner)**~~ ✅ 완료
3. ~~**Skeleton**~~ ✅ 완료
4. ~~**Bottom Sheet**~~ ✅ 완료
5. ~~**Popup**~~ ✅ 완료
6. ~~**Tab**~~ ✅ 완료
7. **Bottom Navigation** - 하단 네비게이션
8. **Top Navigation** - 상단 네비게이션

### 새 컴포넌트 추가 방법

```bash
# 1. 컴포넌트 파일 생성 (Foundation 토큰 기반)
# - packages/design-system/src/components/[Name]/[Name].tsx (Web)
# - packages/design-system/src/native/[Name].tsx (React Native)

# 2. Export 추가
# - packages/design-system/src/index.ts (Web)
# - packages/design-system/src/native/index.ts (React Native)

# 3. 문서 추가
# - packages/design-system/docs/components/[Name].md

# 4. Storybook 스토리 추가
# - design-foundation/storybook/stories/baerae-design-system/[Name].stories.tsx

# 5. 빌드 & 배포
cd packages/design-system
pnpm build
npm version patch
npm publish

# 6. zkap-rn-mvp에서 패키지 업데이트
cd ../zkap-rn-mvp
pnpm update @baerae-zkap/design-system
pnpm storybook  # 스토리북에서 확인
```

---

## 작업 방식 (중요)

> **시간 단축을 위한 전략적 접근**

1. **업계 표준 디자인 시스템 패턴 참조** (구조, 문서화 방식)
2. **기존 existing-components를 개선**하면서 새 컴포넌트 추가
3. 필요시 우리 서비스에 맞게 **내용 교체 및 커스터마이징**

즉, 바퀴를 새로 발명하지 않고 검증된 패턴을 참조하여 빠르게 구축.

## Tech Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4 + 커스텀 Recipe 시스템
- **Language**: TypeScript
- **Documentation**: Next.js 기반 문서 사이트

---

## 폴더 구조

```
design-foundation/
├── src/
│   ├── app/              # 문서 사이트 (Next.js App Router)
│   ├── components/       # 문서 사이트용 컴포넌트
│   └── source/           # 디자인 토큰 등
│
├── existing-components/  # 기존 개발자가 만든 컴포넌트 (컨벤션 참조용)
│   ├── Button/
│   ├── Input/
│   ├── Dialog/
│   └── ... (26개 컴포넌트)
│
├── public/               # 정적 파일
│   └── *-tokens.json     # Foundation 토큰 정의
│
└── packages/             # NPM 패키지 (실제 배포용)
    └── design-system/    # @baerae-zkap/design-system 패키지
        ├── src/
        │   ├── components/   # 웹 컴포넌트 (Button, TextButton, ActionArea)
        │   ├── native/       # React Native 컴포넌트
        │   └── index.ts      # 웹 export
        ├── docs/             # AI용 마크다운 문서
        ├── dist/             # 빌드 결과물
        └── package.json      # @baerae-zkap/design-system v0.1.0
```

---

## 실제 패키지 구조 (중요)

### 패키지 위치
```
/packages/design-system/          ← @baerae-zkap/design-system 패키지
├── src/components/               ← 웹 컴포넌트 (실제 코드)
│   ├── Button/Button.tsx
│   ├── TextButton/TextButton.tsx
│   └── ActionArea/ActionArea.tsx
├── src/native/                   ← React Native 컴포넌트
└── docs/                         ← AI 문서
```

### 패키지 사용법
```typescript
// 웹 (React)
import { Button, TextButton, ActionArea } from '@baerae-zkap/design-system';

// React Native
import { Button, TextButton, ActionArea } from '@baerae-zkap/design-system/native';
```

### 로컬 테스트 (zkap-rn-mvp에서)
```bash
# 방법 1: npm link
cd /Users/jaden/design-foundation/packages/design-system
npm link
cd /Users/jaden/zkap-rn-mvp
npm link @baerae-zkap/design-system

# 방법 2: 파일 경로로 설치
npm install ../design-foundation/packages/design-system
```

---

## AI 바이브코딩을 위한 문서 구조 (핵심)

### 문서 위치 (중앙 집중형)
```
packages/design-system/
├── docs/                         ← AI가 참조하는 문서
│   ├── COMPONENTS.md             ← 전체 컴포넌트 개요
│   └── components/
│       ├── Button.md             ← Button 상세 가이드
│       ├── TextButton.md         ← TextButton 상세 가이드
│       └── ActionArea.md         ← ActionArea 상세 가이드
├── src/components/               ← 웹 컴포넌트
└── src/native/                   ← React Native 컴포넌트
```

### AI 문서 접근 경로
```typescript
// AI가 참조하는 문서 경로
import docs from '@baerae-zkap/design-system/docs';
// → node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md

// 개별 컴포넌트 문서
// → node_modules/@baerae-zkap/design-system/docs/components/Button.md
```

### 컴포넌트 수정 시 필수 싱크 체크리스트

> ⚠️ **컴포넌트 수정 시 아래 5곳을 반드시 동기화해야 합니다.**

| # | 위치 | 파일 | 설명 |
|---|------|------|------|
| 1 | **웹 컴포넌트** | `packages/design-system/src/components/Button/` | 웹용 실제 코드 |
| 2 | **RN 컴포넌트** | `packages/design-system/src/native/Button.tsx` | React Native 실제 코드 |
| 3 | **AI 문서** | `packages/design-system/docs/components/Button.md` | AI 참조 문서 |
| 4 | **문서 Demo** | `src/app/components/actions/button/page.tsx` | 문서 사이트 시각화 |
| 5 | **Storybook** | `design-foundation/storybook/stories/baerae-design-system/Button.stories.tsx` | 컴포넌트 테스트 |

### 싱크 작업 순서

```
1. Foundation 토큰 확인
   └── public/spacing-tokens.json, radius-tokens.json

2. 실제 컴포넌트 수정
   ├── packages/design-system/src/components/  (웹)
   └── packages/design-system/src/native/       (RN)

3. AI 문서 업데이트
   └── packages/design-system/docs/components/

4. 문서 사이트 Demo 업데이트
   └── src/app/components/*/page.tsx

5. Storybook 스토리 업데이트
   └── design-foundation/storybook/stories/baerae-design-system/

6. 패키지 빌드 & 배포
   └── cd packages/design-system && npm run build && npm version patch && npm publish
```

---

## Storybook 동기화 규칙 (핵심)

> ⚠️ **모든 컴포넌트는 Web, Native, Storybook에서 동일하게 동작해야 합니다.**

### Storybook 위치

> **중요**: 스토리북 파일은 `design-foundation/storybook/stories/baerae-design-system/`에서 관리합니다.
> 스토리북은 `design-foundation/storybook/`에서 관리합니다. `pnpm storybook`으로 실행.

```
design-foundation/storybook/stories/baerae-design-system/  ← 여기서 관리
├── Button.stories.tsx
├── TextButton.stories.tsx
├── ActionArea.stories.tsx
├── ... (총 33개 스토리)
└── TimePicker.stories.tsx
```

### 일관성 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| **Props API** | Web/Native/Storybook 동일 | `buttonType`, `color`, `size` |
| **색상 값** | Foundation 토큰 기반 동일 | `brandDefault: #2563eb` |
| **Pressed 상태** | 어두워지는 방향으로 통일 | `#2563eb` → `#1d4ed8` |
| **Alternative 버튼** | `filled baseContainer` 사용 | `outlined` 사용 금지 |

### Storybook Import 규칙
```typescript
// ✅ 올바른 import (native export 사용)
import { Button, TextButton, ActionArea } from '@baerae-zkap/design-system/native';

// ❌ 잘못된 import
import { Button } from '@baerae-zkap/design-system';  // 웹용
```

### 필수 스토리 패턴

각 컴포넌트 스토리에는 다음 항목이 포함되어야 합니다:

| 스토리 | 설명 | 필수 |
|--------|------|------|
| `Default` | Controls로 조정 가능한 기본 스토리 | ✅ |
| `Sizes` | 사이즈별 비교 | ✅ |
| `Colors` | 색상별 비교 | ✅ |
| `States` | Normal, Disabled, Loading 등 | ✅ |
| `PressedState` | 눌림 상태 확인용 (클릭 테스트) | 권장 |

### ActionArea 조합 규칙

ActionArea는 Button, TextButton을 children으로 조합합니다:

```typescript
// ✅ 올바른 사용
<ActionArea variant="neutral">
  <Button buttonType="filled" color="baseContainer" onPress={() => {}}>취소</Button>
  <Button buttonType="filled" color="brandDefault" onPress={() => {}}>확인</Button>
</ActionArea>

// ❌ 잘못된 사용 (ActionAreaButton은 제거됨)
<ActionArea>
  <ActionAreaButton>...</ActionAreaButton>
</ActionArea>

// ❌ 잘못된 사용 (outlined 대신 filled baseContainer)
<Button buttonType="outlined" color="brandDefault">취소</Button>
```

### 검증 체크리스트

컴포넌트 수정 후 반드시 확인:

- [ ] **Props 일치**: Web, Native, Storybook에서 동일한 props 지원
- [ ] **색상 일치**: 동일한 color에 동일한 hex 값 사용
- [ ] **Pressed 상태**: 누르면 어두워지는지 확인 (밝아지면 안됨)
- [ ] **토큰 사용**: 하드코딩 값 대신 Foundation 토큰 값 사용
- [ ] **Storybook 실행**: `pnpm storybook`으로 렌더링 확인

---

## 플랫폼 분리 구조

| 위치 | 플랫폼 | 용도 |
|------|--------|------|
| `packages/design-system/src/components/` | **웹 (React)** | 실제 배포용 웹 컴포넌트 |
| `packages/design-system/src/native/` | **React Native** | 실제 배포용 RN 컴포넌트 |
| `packages/design-system/docs/` | **마크다운** | AI 참조용 문서 |
| `src/app/` | **Next.js** | 문서 사이트 + Demo 컴포넌트 |
| `design-foundation/storybook/stories/baerae-design-system/` | **Storybook** | 컴포넌트 테스트 & 문서화 |
| `existing-components/` | **참고용** | 기존 컨벤션 참조 (사용 X) |

**실제 React Native 컴포넌트**:
```tsx
// packages/design-system/src/native/Button.tsx
// Pressable 사용 (pressed 상태 지원)
import { Pressable, Text, View } from 'react-native';
```

**문서 Demo 컴포넌트 (웹 시뮬레이션)**:
```tsx
// src/app/components/actions/button/page.tsx
// 웹에서 RN 컴포넌트를 직접 import 불가하므로 Demo로 시각화
function ButtonDemo({ ... }) { ... }
```

### 싱크 유지 체크리스트

컴포넌트 수정 시 **반드시** 5곳을 동기화해야 합니다:

| 변경 항목 | Web | Native | Storybook | 비고 |
|----------|-----|--------|-----------|------|
| **Foundation 토큰** | ✅ | ✅ | ✅ | `public/*-tokens.json` 참조 |
| **Props 인터페이스** | ✅ | ✅ | ✅ | 동일한 props 지원 |
| **스타일 값** | ✅ | ✅ | ✅ | radius, padding, gap 등 |
| **Pressed 상태** | ✅ | ✅ | ✅ | **어두워지는 방향**으로 통일 |
| **색상 맵** | ✅ | ✅ | ✅ | 동일한 hex 값 |

### Pressed 상태 색상 규칙 (중요)

> ⚠️ **Pressed 상태는 반드시 어두워져야 합니다. 밝아지면 안됩니다.**

| 컴포넌트 | Color | Default | Pressed | 방향 |
|----------|-------|---------|---------|------|
| Button (filled) | brandDefault | `#2563eb` | `#1d4ed8` | 어두워짐 ✅ |
| Button (filled) | baseContainer | `#f1f5f9` | `#e2e8f0` | 어두워짐 ✅ |
| Button (filled) | successDefault | `#22c55e` | `#16a34a` | 어두워짐 ✅ |
| Button (filled) | errorDefault | `#ef4444` | `#dc2626` | 어두워짐 ✅ |
| TextButton | brandDefault | `#2563eb` | `#1e40af` + `rgba(0,0,0,0.06)` bg | 어두워짐 ✅ |
| TextButton | baseDefault | `#334155` | `#1e293b` + `rgba(0,0,0,0.06)` bg | 어두워짐 ✅ |

**잘못된 예시** (밝아지는 pressed):
```typescript
// ❌ 이렇게 하면 안됨 - 밝아지는 pressed
pressedBg: 'rgba(37, 99, 235, 0.1)'  // 투명한 파란색 오버레이

// ✅ 올바른 방법 - 어두워지는 pressed
pressedBg: 'rgba(0, 0, 0, 0.06)'     // 어두운 오버레이
pressed: '#1e40af'                   // 더 어두운 텍스트 색상
```

### 싱크 작업 순서

1. **Foundation 토큰 수정** → `public/*-tokens.json`
2. **실제 컴포넌트 반영** → `existing-components/*/`
3. **문서 Demo 반영** → `src/app/components/*/page.tsx`
4. **문서 내용 업데이트** → Design Tokens 테이블, 코드 예제

### Demo 컴포넌트 위치

각 문서 페이지 하단에 Demo 컴포넌트 정의:
```
src/app/components/actions/button/page.tsx
├── DesignContent()      # Design 탭 내용
├── WebContent()         # Web 탭 내용
├── RNContent()          # React Native 탭 내용
└── function ButtonDemo()     # ← Demo 컴포넌트 (파일 하단)
    function TextButtonDemo() # ← 필요시 추가 Demo
```

### Foundation 토큰 파일

| 파일 | 내용 |
|------|------|
| `public/spacing-tokens.json` | 간격, 패딩, gap 토큰 |
| `public/radius-tokens.json` | border-radius 토큰 |

**Demo 컴포넌트에서 참조해야 할 주요 토큰**:
- `button.gap` = 8px
- `button.sm/md` radius = 8px
- `button.lg` radius = 12px
- `button.paddingX.*` / `button.paddingY.*`

---

## 컨벤션 (existing-components 기준)

### 파일 구조
```
ComponentName/
├── ComponentName.tsx        # 컴포넌트 구현
├── ComponentName.css.ts     # 스타일 (recipe 패턴)
└── ComponentName.stories.tsx # Storybook (선택)
```

### 컴포넌트 패턴
- `forwardRef` 사용하여 ref 전달
- Primitive + Wrapper 패턴: `ButtonPrimitive` → `Button`
- `Layout` 컴포넌트로 래핑하여 레이아웃 제어
- `displayName` 필수 설정

```tsx
// 예시 패턴
const ButtonPrimitive = forwardRef<...>((props, ref) => { ... });
ButtonPrimitive.displayName = 'ButtonPrimitive';

export const Button = forwardRef<...>(({ layout = 'hug', ...props }, ref) => {
  return (
    <Layout layout={layout}>
      <ButtonPrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});
Button.displayName = 'Button';
```

### 스타일링 패턴 (Recipe)
```typescript
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';
import { vars } from '@/design-system/styles/vars';

export const button = recipe(({ tokens }) => ({
  base: {
    display: 'flex',
    borderRadius: vars.radius.s,
  },
  variants: {
    size: {
      small: { height: 36 },
      medium: { height: 40 },
      large: { height: 44 },
    },
    color: {
      brandDefault: {},
      errorDefault: {},
    },
    disabled: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { color: 'brandDefault', disabled: true },
      style: { backgroundColor: tokens?.surface.disabled.default },
    },
  ],
}));

export type ButtonVariants = RecipeVariants<typeof button>;
```

### 디자인 토큰 구조
| 카테고리 | 경로 | 용도 |
|---------|------|------|
| Content | `tokens.content.{category}.{variant}` | 텍스트 색상 |
| Surface | `tokens.surface.{category}.{variant}` | 배경색 |
| Border | `tokens.border.{category}.{variant}` | 테두리 색상 |
| Spacing | `vars.spacing[n]` | 간격 (숫자 스케일) |
| Radius | `vars.radius.{size}` | 모서리 반경 |

**Content 토큰 예시:**
- `tokens.content.base.default` - 기본 텍스트
- `tokens.content.base.onColor` - 반전 텍스트 (어두운 배경 위)
- `tokens.content.brand.default` - 브랜드 컬러 텍스트
- `tokens.content.disabled.default` - 비활성화 텍스트

**Surface 토큰 예시:**
- `tokens.surface.base.default` - 기본 배경
- `tokens.surface.brand.default` - 브랜드 배경
- `tokens.surface.brand.defaultPressed` - 브랜드 배경 (눌림 상태)
- `tokens.surface.disabled.default` - 비활성화 배경

### Spacing 토큰 (Foundation 기반)

> **중요**: 컴포넌트 개발 시 하드코딩 값 대신 반드시 Foundation 토큰을 사용해야 합니다.
> 토큰 정의 파일: `public/spacing-tokens.json`

**기본 단위**: 4px (모든 값은 4의 배수)

#### Primitive 토큰
| 토큰 | 값 | 용도 |
|------|-----|------|
| `primitive.1` | 4px | 최소 간격 |
| `primitive.2` | 8px | 소형 간격 |
| `primitive.3` | 12px | 기본 간격 |
| `primitive.4` | 16px | 중형 간격 |
| `primitive.5` | 20px | 대형 간격 |
| `primitive.6` | 24px | 섹션 간격 |
| `primitive.8` | 32px | 큰 섹션 간격 |
| `primitive.12` | 48px | 컴포넌트 높이 (버튼 xLarge 등) |

#### Semantic 토큰 (컨텍스트별 사용)

**Inset (컴포넌트 내부 padding)**
| 토큰 | 값 | 용도 |
|------|-----|------|
| `inset.3xs` | 4px | 뱃지, 태그 내부 |
| `inset.2xs` | 8px | 소형 칩, 아이콘 버튼 |
| `inset.xs` | 12px | 소형 버튼, 입력 필드 |
| `inset.sm` | 16px | 기본 버튼, 카드 내부 |
| `inset.md` | 20px | 중형 카드, 리스트 아이템 |
| `inset.lg` | 24px | 대형 카드, 모달 내부 |

**Horizontal (수평 방향 간격)**
| 토큰 | 값 | 용도 |
|------|-----|------|
| `horizontal.3xs` | 4px | 아이콘-텍스트 최소 간격 |
| `horizontal.2xs` | 8px | 기본 아이콘-텍스트 간격 |
| `horizontal.xs` | 12px | 버튼 그룹 간격, 탭 사이 |
| `horizontal.sm` | 16px | 카드 그룹 간격 |

**Component 토큰 (컴포넌트 전용)**

| 컴포넌트 | 토큰 | 값 | 용도 |
|---------|------|-----|------|
| **Modal** | `modal.padding` | 24px | 모달 내부 패딩 |
| | `modal.buttonGap` | 12px | 모달 버튼 사이 간격 |
| | `modal.footerGap` | 20px | 컨텐츠-푸터 사이 |
| **BottomSheet** | `bottomSheet.padding` | 20px | 바텀시트 기본 패딩 |
| | `bottomSheet.handleGap` | 16px | 핸들-컨텐츠 사이 |
| **Button** | `button.paddingX.lg` | 24px | 대형 버튼 좌우 |
| | `button.paddingX.md` | 20px | 기본 버튼 좌우 |
| | `button.gap` | 8px | 버튼 내 아이콘-텍스트 |
| **Screen** | `screen.paddingX` | 20px | 화면 좌우 기본 패딩 |
| | `screen.safeAreaBottom` | 32px | 홈 인디케이터 영역 |

#### 사용 예시

```typescript
// ❌ 하드코딩 금지
style={{ gap: 10, padding: 20 }}

// ✅ Foundation 토큰 사용
// Modal 내부
style={{ gap: 12, padding: 24 }}  // modal.buttonGap(12), modal.padding(24)

// BottomSheet 내부
style={{ gap: 12, padding: 20 }}  // modal.buttonGap(12), bottomSheet.padding(20)
```

### Radius 토큰 (Foundation 기반)

> **중요**: 컴포넌트 개발 시 하드코딩 값 대신 반드시 Foundation 토큰을 사용해야 합니다.
> 토큰 정의 파일: `public/radius-tokens.json`

**기본 단위**: 4px (모든 값은 4의 배수)

#### Primitive 토큰
| 토큰 | 값 | 용도 |
|------|-----|------|
| `primitive.none` | 0px | 라운드 없음 |
| `primitive.xs` | 4px | 최소 라운드 |
| `primitive.sm` | 8px | 소형 라운드 |
| `primitive.md` | 12px | 중형 라운드 |
| `primitive.lg` | 16px | 대형 라운드 |
| `primitive.xl` | 20px | 특대 라운드 |
| `primitive.full` | 9999px | 완전 라운드 (원형) |

#### Component 토큰 (컴포넌트 전용)

| 컴포넌트 | 토큰 | 값 | 용도 |
|---------|------|-----|------|
| **Button** | `button.sm` | 8px | 소형/중형 버튼 (xs, sm, md 사이즈) |
| | `button.md` | 8px | 기본 버튼 (md 사이즈) |
| | `button.lg` | 12px | 대형 버튼 (lg, xl 사이즈) |
| | `button.pill` | 9999px | 필 형태 버튼 |
| **Card** | `card.sm` | 12px | 소형 카드, 리스트 아이템 |
| | `card.md` | 16px | 기본 카드 |
| | `card.lg` | 20px | 대형 카드, 프로모션 |
| **Input** | `input.default` | 8px | 기본 입력 필드 |
| | `input.search` | 9999px | 검색 입력 필드 |
| **Modal** | `modal.default` | 24px | 모달, 다이얼로그 |
| **BottomSheet** | `bottomSheet.default` | 20px | 바텀시트 상단 |
| **Toast** | `toast.default` | 12px | 토스트 메시지 |

#### 사용 예시

```typescript
// ❌ 하드코딩 금지
borderRadius: 12

// ✅ Foundation 토큰 사용 (사이즈별 분기)
// Button 컴포넌트
borderRadius: (size === "large" || size === "xLarge") ? 12 : 8  // button.lg(12) or button.sm(8)

// Card 컴포넌트
borderRadius: 16  // card.md(16)

// Modal 컴포넌트
borderRadius: 24  // modal.default(24)
```

---

## Foundation 토큰 필수 사용 규칙 (핵심)

> ⚠️ **컴포넌트 개발 시 하드코딩 값 사용 금지. 반드시 Foundation 토큰 참조.**

### 토큰 파일 위치
| 파일 | 내용 |
|------|------|
| `public/spacing-tokens.json` | 간격, 패딩, gap, 높이 |
| `public/radius-tokens.json` | border-radius |

### 토큰 적용 대상
| 속성 | 참조 토큰 | 예시 |
|------|----------|------|
| `padding` | spacing.semantic.inset.* / component.* | `button.paddingX.md = 20px` |
| `gap` | spacing.semantic.horizontal.* / component.* | `button.gap = 8px` |
| `margin` | spacing.semantic.vertical.* / horizontal.* | `vertical.sm = 16px` |
| `borderRadius` | radius.semantic.* | `button.lg = 12px` |
| `height` | spacing.primitive.* | `primitive.12 = 48px` |

### 작업 시 체크리스트
- [ ] 새 컴포넌트 개발 → `public/*-tokens.json`에서 해당 토큰 확인
- [ ] 스타일 값 작성 → 하드코딩 대신 토큰 값 사용
- [ ] 사이즈별 분기 필요 → 토큰 문서 참조하여 올바른 값 적용
- [ ] 토큰에 없는 값 → Foundation 파일에 새 토큰 추가 후 사용

---

## 기존 컴포넌트 목록 (existing-components)

| 카테고리 | 컴포넌트 |
|---------|---------|
| 기본 | Button, Box, Icon, Image, Typography, Link |
| 입력 | Input, Checkbox, CheckboxWithLabel, Keypad |
| 피드백 | Toast, Loading, Skeleton, Tooltip |
| 오버레이 | Dialog, Drawer |
| 네비게이션 | Tabs, TempTab, ToggleGroup |
| 레이아웃 | Layout, Header, Label, Badge |
| 기타 | Chart, Lottie, Scanner |

---

## 컴포넌트 매핑 & Gap 분석

### 보유 vs 필요 비교

| 카테고리 | 컴포넌트 | 기존 보유 | 상태 |
|-----------------|-----------------|----------|------|
| **Actions** | Button | Button | ✅ 보유 |
| | Icon button | Button (variant) | ✅ 개선 필요 |
| | Text button | Button (variant) | ✅ 개선 필요 |
| | Chip | - | ❌ 신규 필요 |
| | Action area | - | ❌ 신규 필요 |
| **Contents** | Accordion | - | ❌ 신규 필요 |
| | Avatar / Avatar group | - | ❌ 신규 필요 |
| | Card / List card | - | ❌ 신규 필요 |
| | Badge | Badge | ✅ 보유 |
| | List cell | - | ❌ 신규 필요 |
| | Section header | Header | ✅ 개선 필요 |
| | Table | - | ❌ 신규 필요 |
| | Thumbnail | Image | ✅ 개선 필요 |
| **Feedback** | Alert | - | ❌ 신규 필요 |
| | Toast / Snackbar | Toast | ✅ 보유 |
| | Fallback view | - | ❌ 신규 필요 |
| **Loading** | Loading | Loading | ✅ 보유 |
| | Skeleton | Skeleton | ✅ 보유 |
| **Navigations** | Tab | Tabs | ✅ 보유 |
| | Bottom / Top navigation | - | ❌ 신규 필요 |
| | Pagination | - | ❌ 신규 필요 |
| | Progress indicator | - | ❌ 신규 필요 |
| **Presentation** | Tooltip | Tooltip | ✅ 보유 |
| | Bottom sheet | Drawer | ✅ 보유 |
| | Popup / Dialog | Dialog | ✅ 보유 |
| | Menu / Popover | - | ❌ 신규 필요 |
| **Selection & Input** | Checkbox | Checkbox | ✅ 보유 |
| | Radio | - | ❌ 신규 필요 |
| | Switch | ToggleGroup | ✅ 개선 필요 |
| | Text field | Input | ✅ 보유 |
| | Text area | - | ❌ 신규 필요 |
| | Select | - | ❌ 신규 필요 |
| | Slider | - | ❌ 신규 필요 |
| | Date / Time picker | - | ❌ 신규 필요 |
| | Search field | Input (variant) | ✅ 개선 필요 |

### 요약

| 상태 | 개수 | 비율 |
|------|------|------|
| ✅ 보유 | 14개 | 26% |
| ✅ 개선 필요 | 6개 | 11% |
| ❌ 신규 필요 | 33개 | 63% |

---

## 작업 우선순위 가이드

### Phase 1: 기존 컴포넌트 개선
기존 existing-components를 디자인 시스템 수준으로 업그레이드

1. **Button** - variant 확장 (Icon button, Text button)
2. **Input** - Search field variant 추가
3. **Header** - Section header로 개선

### Phase 2: 핵심 신규 컴포넌트
사용 빈도 높은 필수 컴포넌트 추가

1. **Chip** - 태그, 필터 선택
2. **Avatar** - 사용자 프로필
3. **Card** - 콘텐츠 카드
4. **Alert** - 경고 메시지
5. **Radio** - 라디오 버튼
6. **Select** - 드롭다운 선택

### Phase 3: 네비게이션 & 고급 컴포넌트
1. **Pagination** - 페이지네이션
2. **Progress indicator** - 진행 표시
3. **Menu / Popover** - 드롭다운 메뉴
4. **Date picker** - 날짜 선택

### Phase 4: 확장 컴포넌트
1. **Accordion** - 펼침 콘텐츠
2. **Table** - 데이터 테이블
3. **Slider** - 범위 선택

---

## 작업 시 참조 방법

### 새 컴포넌트 만들 때

1. **existing-components 컨벤션 적용**: 파일 구조, recipe 패턴, 타입 정의
2. **업계 표준 디자인 시스템 패턴 참조**
3. **우리 서비스에 맞게 커스터마이징**

### 문서 페이지 만들 때

아래 **컴포넌트 문서화 표준**을 따릅니다.

---

## 컴포넌트 문서화 표준

> 모든 컴포넌트 문서 페이지는 아래 구조와 스타일을 따라야 합니다.

### 페이지 구조

```
ComponentPage
├── Header (제목, 설명)
├── Interactive Playground (선택적)
└── PlatformTabs
    ├── Design Tab
    ├── Web Tab
    └── React Native Tab
```

### Design Tab 필수 섹션 (순서대로)

| # | 섹션 | 설명 | 필수 |
|---|------|------|------|
| 1 | **Anatomy** | 컴포넌트 구조 다이어그램 + 구성요소 설명 | ✅ |
| 2 | **Variants** | 2x2 그리드 카드 레이아웃으로 변형 표시 | ✅ |
| 3 | **Sizes** | 크기별 미리보기 (수평 정렬, 하단에 크기 라벨) | ✅ |
| 4 | **Colors** | 색상별 미리보기 (수평 정렬, 하단에 용도 라벨) | ✅ |
| 5 | **States** | 상태별 미리보기 (Default, Hover, Pressed, Disabled) | ✅ |
| 6 | **Design Tokens** | Foundation 토큰 테이블 | ✅ |
| 7 | **Usage Guidelines** | 사용 가이드라인 테이블 + Design Principles (PrincipleCard) | ✅ |
| 8 | **Accessibility** | 접근성 고려사항 (PrincipleCard 스타일) | ✅ |

### Web Tab 필수 섹션 (순서대로)

| # | 섹션 | 설명 | 필수 |
|---|------|------|------|
| 1 | **Source Code** | GitHub 링크 박스 | ✅ |
| 2 | **Import** | import 문 코드블록 | ✅ |
| 3 | **Basic Usage** | 기본 사용 예제 (PreviewBox + CodeBlock) | ✅ |
| 4 | **Variants** | variant별 사용 예제 | 선택 |
| 5 | **Colors** | color별 사용 예제 | ✅ |
| 6 | **Sizes** | size별 사용 예제 | ✅ |
| 7 | **Layout** | layout 옵션 예제 (해당 시) | 선택 |
| 8 | **States** | disabled, loading 등 상태 예제 | ✅ |
| 9 | **API Reference** | Props 테이블 (Common Props + Web-specific Props) | ✅ |

### React Native Tab 필수 섹션 (순서대로)

| # | 섹션 | 설명 | 필수 |
|---|------|------|------|
| 1 | **Source Code** | GitHub 링크 박스 | ✅ |
| 2 | **Import** | import 문 코드블록 (React Native import 포함) | ✅ |
| 3 | **Basic Usage** | 기본 사용 예제 (PreviewBox + CodeBlock) | ✅ |
| 4 | **Variants** | variant별 사용 예제 | 선택 |
| 5 | **Colors** | color별 사용 예제 | ✅ |
| 6 | **Sizes** | size별 사용 예제 | ✅ |
| 7 | **Layout** | layout 옵션 예제 (해당 시) | 선택 |
| 8 | **States** | disabled, loading 등 상태 예제 | ✅ |
| 9 | **API Reference** | Props 테이블 (Common Props + RN-specific Props) | ✅ |

### 공통 스타일 가이드

#### Section 컴포넌트
```tsx
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={{
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em"
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
```

#### Subsection 컴포넌트
```tsx
function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
```

#### PrincipleCard 컴포넌트 (Design Principles, Accessibility용)
```tsx
function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          backgroundColor: "#e5e7eb", color: "#6b7280",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600,
        }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}
```

#### VariantCard 컴포넌트 (Variants 2x2 그리드용)
```tsx
function VariantCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        marginBottom: 16,
      }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}
```

#### PropsTable 컴포넌트 (API Reference용)
```tsx
function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  // 테이블 스타일:
  // - 헤더: backgroundColor: "var(--bg-secondary)", padding: "12px 16px"
  // - 셀: padding: "12px 16px", borderBottom: "1px solid var(--divider)"
  // - type 컬럼: color: "#6366f1", fontFamily: "monospace", fontSize: 12
}
```

### 코드 예제 컨벤션

#### Web 코드
```tsx
// onClick 사용
<Button buttonType="filled" color="brandDefault" onClick={() => {}}>
  Label
</Button>
```

#### React Native 코드
```tsx
// onPress 사용
<Button buttonType="filled" color="brandDefault" onPress={() => {}}>
  Label
</Button>
```

#### 공통 규칙
- 기본값이라도 주요 props는 항상 명시 (buttonType, color, size 등)
- import 문에 실제 사용하는 컴포넌트만 포함
- 코드 블록 상단에 Foundation 토큰 주석 추가 (padding, gap 등)

```tsx
{/* gap: modal.buttonGap(12), padding: bottomSheet.padding(20) */}
<View style={{ gap: 12, padding: 20 }}>
```

### PreviewBox 사용법

```tsx
<PreviewBox>
  <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
    {/* 미리보기 콘텐츠 */}
  </div>
</PreviewBox>
```

- PreviewBox는 style prop을 받지 않음
- 내부에 div로 감싸서 스타일 적용
- 기본 padding은 24px 사용

---

## AI 작업 가이드

이 파일을 읽은 후:

1. **컴포넌트 작업 요청 시**
   - existing-components에서 유사 컴포넌트 패턴 참조
   - recipe 스타일링 패턴 준수

2. **문서 작업 요청 시**
   - 기존 문서 구조 참조하여 작성
   - src/app 내에 페이지 생성

3. **개선 작업 요청 시**
   - Gap 분석 테이블 참조
   - 기존 컴포넌트 코드 먼저 확인 후 개선안 제시

---

## TODO (시연 후 정리 작업)

### 1. 웹 컴포넌트 패키지 연결
- `packages/design-system/src/components/` 에 웹 컴포넌트 13개 존재 (Button, TextButton, IconButton, Chip, ActionArea, Accordion, Card, ContentBadge, ListCard, ListCell, SectionHeader, Table, Thumbnail)
- **현재 상태**: `index.ts`에서 토큰만 export, 웹 컴포넌트는 export 안 됨 (dead code)
- **할 일**: `index.ts`에서 웹 컴포넌트도 export 추가

### 2. 문서 사이트 실제 컴포넌트 import로 교체
- `src/app/components/` 의 문서 페이지들이 인라인 Demo 코드로 시각화 중
- `@baerae-zkap/design-system`에서 import한 것처럼 보이지만 전부 `<CodeBlock>` 안의 텍스트 예시
- **할 일**: 실제 웹 컴포넌트를 패키지에서 import해서 렌더링하도록 교체

### 3. 인라인 Demo 코드 제거
- 각 page.tsx 안의 ButtonPlayground 등 인라인 Demo 컴포넌트 삭제
- 실제 패키지 컴포넌트로 대체 완료 후 진행

### 4. Storybook 배포
- Vercel CLI로 배포 완료: https://design-foundation.vercel.app
- 재배포 명령: `cd /Users/jaden/design-foundation && vercel deploy --prod --yes`

---

> 이 파일을 읽고 프로젝트 컨텍스트를 파악한 후 작업을 진행하세요.
> 작업 전 항상 참조 디자인 시스템 URL과 existing-components를 확인하세요.
