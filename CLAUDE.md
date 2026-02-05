# Design Foundation Project

## 프로젝트 개요

회사 서비스에서 사용할 **Design Foundation & Components Library**를 구축하는 프로젝트.
디자이너가 주도하여 만들고 있으며, 개발자가 실제 서비스에 적용할 수 있는 컴포넌트 라이브러리를 목표로 함.

## 작업 방식 (중요)

> **시간 단축을 위한 전략적 접근**

1. **Montage 디자인 시스템 웹 콘텐츠를 그대로 가져옴** (구조, 문서화 방식 참조)
2. **Toss 디자인 시스템과 비교 분석**하여 우리 서비스에 맞게 조정
3. **기존 existing-components를 개선**하면서 새 컴포넌트 추가
4. 필요시 우리 서비스에 맞게 **내용 교체 및 커스터마이징**

즉, 바퀴를 새로 발명하지 않고 검증된 디자인 시스템을 참조하여 빠르게 구축.

## Tech Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4 + 커스텀 Recipe 시스템
- **Language**: TypeScript
- **Documentation**: Next.js 기반 문서 사이트

---

## 참조 디자인 시스템

### 1. Toss Design System (TDS Mobile)

**URL**: https://tossmini-docs.toss.im/tds-mobile/components

**특징**:
- 모바일 퍼스트 설계
- 간결하고 직관적인 인터랙션
- 시멘틱 컬러 토큰 시스템
- React Native 기반

**참조 포인트**:
- 컬러 토큰 구조 (content, surface, border 계층)
- 컴포넌트 상태 처리 (pressed, disabled, focused)
- 모바일 최적화된 터치 타겟 사이즈

---

### 2. Wanted Montage Design System

**URL**:
- 메인: https://montage.wanted.co.kr
- 컴포넌트: https://montage.wanted.co.kr/docs/components
- Foundations: https://montage.wanted.co.kr/docs/foundations

**철학**: "From Separate Core Blocks To a Seamless Flow"
> 일관된 디자인을 통해 사용자 경험을 통합

**구조**:
- Getting Started - 시작 가이드
- Foundations - 디자인 기초 원칙
- Components - 컴포넌트 라이브러리
- Utilities - 유틸리티 기능

#### Montage 컴포넌트 전체 목록 (53개)

| 카테고리 | 컴포넌트 | 설명 |
|---------|---------|------|
| **Actions (5)** | Action area, Button, Chip, Icon button, Text button | 사용자 상호작용 처리 |
| **Contents (11)** | Accordion, Avatar, Avatar group, Card, List card, Content badge, Play badge, List cell, Section header, Table, Thumbnail | 정보 표시 및 콘텐츠 구성 |
| **Feedback (6)** | Alert, Section message, Fallback view, Push, Toast, Snackbar | 사용자 피드백 및 알림 |
| **Loading (2)** | Loading, Skeleton | 로딩 상태 표시 |
| **Navigations (9)** | Bottom navigation, Top navigation, Category, Tab, Pagination, Pagination dots, Page counter, Progress indicator, Progress tracker | 페이지 이동 및 탐색 |
| **Presentation (6)** | Autocomplete, Menu, Popover, Bottom sheet, Popup, Tooltip | 정보 표현 및 오버레이 |
| **Selection & Input (14)** | Check mark, Checkbox, Radio, Date picker, Time picker, Filter button, Framed style, Search field, Segmented control, Select, Slider, Switch, Text area, Text field | 사용자 입력 및 선택 |

**리소스**:
- Figma UI KIT (2025.06.04 업데이트)
- Native Platform UI KIT
- Pretendard JP Dynamic Font

**참조 포인트**:
- 체계적인 카테고리 분류
- 상세한 문서화 방식
- 플랫폼별 구분 (Web, iOS, Android)

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
└── public/               # 정적 파일
```

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

### 보유 vs 필요 (Montage 기준 비교)

| Montage 카테고리 | Montage 컴포넌트 | 기존 보유 | 상태 |
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
기존 existing-components를 Montage/TDS 수준으로 업그레이드

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

1. **Montage 문서 확인**: https://montage.wanted.co.kr/docs/components/{컴포넌트명}
2. **TDS 문서 확인**: https://tossmini-docs.toss.im/tds-mobile/components (접근 가능 시)
3. **existing-components 컨벤션 적용**: 파일 구조, recipe 패턴, 타입 정의
4. **우리 서비스에 맞게 커스터마이징**

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
   - 먼저 Montage/TDS 참조 URL 확인
   - existing-components에서 유사 컴포넌트 패턴 참조
   - recipe 스타일링 패턴 준수

2. **문서 작업 요청 시**
   - Montage 문서 구조 참조하여 작성
   - src/app 내에 페이지 생성

3. **개선 작업 요청 시**
   - Gap 분석 테이블 참조
   - 기존 컴포넌트 코드 먼저 확인 후 개선안 제시

---

> 이 파일을 읽고 프로젝트 컨텍스트를 파악한 후 작업을 진행하세요.
> 작업 전 항상 참조 디자인 시스템 URL과 existing-components를 확인하세요.
