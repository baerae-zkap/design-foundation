# Design Foundation & Components Library

**@baerae-zkap/design-system** - baerae-zkap 회사의 React Native 컴포넌트 라이브러리

---

## 개요

Design Foundation은 baerae-zkap 서비스에서 사용할 통합 디자인 시스템입니다. 53개의 React Native 컴포넌트로 구성되어 있으며, Storybook과 AI 문서화를 통해 체계적으로 관리됩니다.

- **패키지명**: `@baerae-zkap/design-system`
- **현재 버전**: 0.1.13
- **배포 위치**: npm 패키지 (`@baerae-zkap/design-system`) 및 문서 사이트
- **컴포넌트**: 53개 (React Native)
- **기술 스택**: React Native, TypeScript

---

## 최근 2일 작업 요약 (2026-02-13 ~ 2026-02-14)

아래 내용은 최근 2일 동안 `main` 브랜치에 반영된 핵심 개선입니다.

### 1) Color/Foundation 토큰 생성 자동화
- **무엇을 개선했는가**
  - `public/*.json` 기반으로 토큰 결과물을 생성하도록 스크립트 추가:
    - `scripts/generate-colors-ts.mjs`
    - `scripts/generate-foundation-css.mjs`
  - `package.json`에 `tokens:colors`, `tokens:foundation`, `tokens` 파이프라인 구성.
- **왜 했는가**
  - 수동 관리 시 `palette/semantic/json`과 실제 사용 코드가 쉽게 드리프트(불일치)되는 문제를 제거하기 위해.

### 2) Semantic 토큰 체계 확장 (Toss/Wanted 참조)
- **무엇을 개선했는가**
  - `public/semantic-tokens.json`에 `inverse`, `status`, `component` 계층 보강.
  - 색상 효과 레이어(`alpha/effects`)를 문서와 사용 코드에 연결.
- **왜 했는가**
  - 팔레트 직접 사용을 줄이고, 목적 기반(의미 기반) 토큰으로 라이트/다크를 안정적으로 운용하기 위해.

### 3) 문서 사이트의 색상 사용 방식 통일
- **무엇을 개선했는가**
  - Semantic/Effects 페이지를 토큰 중심 표 구조로 정리.
  - swatch/라벨/복사 피드백 UI 정렬 문제 및 가독성 문제 수정.
  - 토큰 카드에 팔레트 참조 정보가 명확히 드러나도록 개선.
- **왜 했는가**
  - “어떤 시멘틱이 어떤 팔레트를 참조하는지”를 검증 가능한 형태로 보여주기 위해.

### 4) 하드코딩 컬러 제거 + 예외 정책 수립
- **무엇을 개선했는가**
  - `src/app`, `src/components` 내 직접 색상값(hex/rgba/hsla) 제거.
  - 모든 실제 UI 색을 semantic/effect CSS 변수로 치환.
  - 외부 브랜드 색(코인/구글 아이콘)은 `src/tokens/brandExternal.ts`로 분리(명시적 예외).
- **왜 했는가**
  - 테마 일관성, 유지보수성, 토큰 기반 개발 원칙을 강제하기 위해.

### 5) 회귀 방지 검증 추가
- **무엇을 개선했는가**
  - `scripts/check-no-raw-colors.mjs` 추가.
  - `prebuild`에 raw color 검사 연결(`npm run check:raw-colors`).
- **왜 했는가**
  - 이후 변경에서 하드코딩 색상이 다시 유입되는 문제를 CI/빌드 단계에서 조기에 차단하기 위해.

### 6) 교차 검증
- **무엇을 했는가**
  - Claude Opus 4.6로 분류 기준(치환 대상 vs 예외 대상) 교차 검증 후 반영.
- **왜 했는가**
  - 예외(브랜드 고정색)와 토큰화 대상(실제 UI 색)의 경계를 명확히 하기 위해.

---

## 폴더 구조

```
design-foundation/
├── packages/design-system/              # 배포 패키지 (@baerae-zkap/design-system)
│   ├── src/native/                      # React Native 컴포넌트
│   ├── src/tokens/                      # 패키지 토큰 export
│   ├── docs/                            # AI 참조 문서
│   └── package.json
├── src/
│   ├── app/                             # Next.js 문서 페이지
│   │   ├── colors/                      # palette / semantic / effects
│   │   ├── generated-color-tokens.css   # 토큰 생성 결과물
│   │   └── generated-foundation-tokens.css
│   ├── components/                      # 문서 사이트 UI 컴포넌트
│   └── tokens/brandExternal.ts          # 외부 브랜드 컬러 예외
├── public/                              # 토큰 단일 소스(JSON)
│   ├── palette.json
│   ├── semantic-tokens.json
│   ├── effects-tokens.json
│   ├── spacing-tokens.json
│   ├── radius-tokens.json
│   ├── typography-tokens.json
│   ├── shadow-tokens.json
│   └── interaction-tokens.json
├── scripts/
│   ├── generate-color-css.mjs
│   ├── generate-colors-ts.mjs
│   ├── generate-foundation-css.mjs
│   └── check-no-raw-colors.mjs
├── storybook/
└── existing-components/
```

---

## 빠른 시작

### 설치

루트 및 하위 패키지에서 의존성을 설치합니다.

```bash
# 루트 (문서 사이트)
npm install

# 패키지
cd packages/design-system
npm install
```

### 토큰 생성

```bash
# 루트에서 실행
npm run tokens
```

### Storybook 실행 (로컬)

```bash
cd storybook
npm run storybook
```

`http://localhost:6006`에서 모든 컴포넌트의 시각화 및 테스트 가능합니다.

### 문서 사이트 실행 (로컬)

```bash
# 루트 디렉토리에서
npm run dev
```

`http://localhost:3000`에서 문서 사이트 확인 가능합니다.

### 빌드 및 검증

```bash
# 루트: 토큰 생성 + raw color 검사 포함
npm run build

# 패키지
cd packages/design-system
npm run build
```

---

## 사용법

### React Native

```typescript
import {
  Button,
  Chip,
  Card,
  Alert,
  Toast,
  Switch,
  TextField,
  // ... 기타 컴포넌트
} from '@baerae-zkap/design-system/native';

// 컴포넌트 사용
<Button
  buttonType="filled"
  color="brandDefault"
  size="md"
  onPress={() => {}}
>
  Label
</Button>
```

### Design Tokens (웹 & React Native 공용)

```typescript
// 색상 토큰
import { colors, typography, spacing, radius } from '@baerae-zkap/design-system';

// 예: padding, gap 값
const buttonPadding = spacing.button.paddingX.md;  // 20px
const buttonGap = spacing.button.gap;               // 8px
const buttonRadius = radius.button.sm;              // 8px
```

---

## Storybook

### 라이브 배포

https://design-foundation.vercel.app

### 로컬 실행

```bash
cd storybook
npm run storybook
```

- 모든 컴포넌트의 변형, 상태, 크기를 대화형으로 확인
- Controls를 통해 props 실시간 조정
- 모든 53개 컴포넌트의 스토리 포함

---

## 컴포넌트 목록

### Actions (5개)
| 컴포넌트 | 설명 |
|---------|------|
| **Button** | 기본 버튼 |
| **TextButton** | 텍스트 버튼 |
| **IconButton** | 아이콘 버튼 |
| **Chip** | 태그, 필터 선택 |
| **ActionArea** | 버튼 그룹 컨테이너 |

### Contents (9개)
| 컴포넌트 | 설명 |
|---------|------|
| **Accordion** | 펼침/닫힘 콘텐츠 |
| **Card** | 콘텐츠 카드 |
| **ContentBadge** | 뱃지 |
| **ListCell** | 리스트 셀 |
| **ListCard** | 리스트 카드 |
| **PlayBadge** | 플레이 뱃지 |
| **SectionHeader** | 섹션 헤더 |
| **Table** | 데이터 테이블 |
| **Thumbnail** | 썸네일 이미지 |

### Feedback (6개)
| 컴포넌트 | 설명 |
|---------|------|
| **Alert** | 경고 메시지 |
| **FallbackView** | 폴백 상태 표시 |
| **PushBadge** | 푸시 알림 뱃지 |
| **SectionMessage** | 섹션 메시지 |
| **Snackbar** | 스낵바 알림 |
| **Toast** | 토스트 알림 |

### Loading (3개)
| 컴포넌트 | 설명 |
|---------|------|
| **Loading** | 로딩 스피너 |
| **LoadingDots** | 로딩 점 애니메이션 |
| **Skeleton** | 스켈레톤 로더 |

### Navigations (9개)
| 컴포넌트 | 설명 |
|---------|------|
| **BottomNavigation** | 하단 탭 네비게이션 |
| **TopNavigation** | 상단 네비게이션 |
| **Category** | 카테고리 필터 |
| **Tab** | 탭 |
| **Pagination** | 페이지네이션 |
| **PaginationDots** | 점 페이지네이션 |
| **PageCounter** | 페이지 카운터 |
| **ProgressIndicator** | 진행률 표시기 |
| **ProgressTracker** | 진행 추적 |

### Presentation (7개)
| 컴포넌트 | 설명 |
|---------|------|
| **Autocomplete** | 자동완성 입력 |
| **BottomSheet** | 바텀시트 모달 |
| **Menu** | 드롭다운 메뉴 |
| **Popover** | 팝오버 |
| **Popup** | 팝업 다이얼로그 |
| **Tooltip** | 툴팁 |
| **Divider** | 구분선 |

### Selection & Input (14개)
| 컴포넌트 | 설명 |
|---------|------|
| **CheckMark** | 체크 마크 |
| **Checkbox** | 체크박스 |
| **Radio** | 라디오 버튼 |
| **DatePicker** | 날짜 선택기 |
| **TimePicker** | 시간 선택기 |
| **FilterButton** | 필터 버튼 |
| **FramedStyle** | 프레임 스타일 |
| **SearchField** | 검색 입력 |
| **SegmentedControl** | 세그먼트 컨트롤 |
| **Select** | 드롭다운 선택 |
| **Slider** | 범위 슬라이더 |
| **Switch** | 토글 스위치 |
| **TextArea** | 긴 텍스트 입력 |
| **TextField** | 텍스트 입력 |

---

## 기술 스택

| 항목 | 설명 |
|------|------|
| **컴포넌트 라이브러리** | React Native |
| **언어** | TypeScript |
| **문서화** | Storybook |
| **문서 사이트** | Next.js (App Router) |
| **패키지 관리** | npm (pnpm 사용 가능) |
| **배포** | npm 패키지 + Vercel 문서 사이트 |

---

## Foundation Design Tokens

모든 컴포넌트/문서 페이지는 Foundation Token(JSON)을 단일 소스로 사용합니다.

### 토큰 파일

| 파일 | 내용 |
|------|------|
| `public/palette.json` | 원자 색상 팔레트 |
| `public/semantic-tokens.json` | 시멘틱 색상(light/dark, inverse/status/component 포함) |
| `public/effects-tokens.json` | alpha/overlay/gradient/effect 계층 |
| `public/spacing-tokens.json` | 간격, 패딩, gap, 높이 토큰 |
| `public/radius-tokens.json` | border-radius 토큰 |
| `public/typography-tokens.json` | 타이포그래피 스케일/스타일 |
| `public/shadow-tokens.json` | 그림자 primitive/semantic |
| `public/interaction-tokens.json` | 인터랙션 시간/곡선/모션 토큰 |

### 생성 결과물

| 파일 | 생성 스크립트 | 용도 |
|------|------|------|
| `src/app/generated-color-tokens.css` | `scripts/generate-color-css.mjs` | 문서 사이트 CSS 변수 |
| `packages/design-system/src/tokens/colors.ts` | `scripts/generate-colors-ts.mjs` | 패키지 color token export |
| `src/app/generated-foundation-tokens.css` | `scripts/generate-foundation-css.mjs` | spacing/radius/typography/shadow/interaction CSS 변수 |

### 실행 명령

```bash
npm run tokens            # 전체 토큰 생성
npm run check:raw-colors  # src/app, src/components 하드코딩 색상 검사
npm run build             # 토큰 생성 + 검사 + Next 빌드
```

### 주요 토큰

**Spacing (간격)**
- `primitive.1` = 4px ~ `primitive.12` = 48px
- `inset` (내부 패딩): 4px ~ 24px
- `horizontal` (수평 간격): 4px ~ 16px
- Component 토큰: `button.gap`, `button.paddingX`, `modal.padding` 등

**Radius (모서리)**
- `primitive.none` = 0px ~ `primitive.full` = 9999px
- Component 토큰: `button.sm` = 8px, `button.lg` = 12px, `card.md` = 16px 등

**Semantic Color (의미 기반 색상)**
- Surface/Content/Border/Status/Inverse/Component 계층으로 light/dark 분리
- 팔레트 직접 참조 대신 시멘틱 참조를 기본 원칙으로 사용

**Effect Color (알파/오버레이)**
- `effect.alpha.*` 계층으로 selection/fill/overlay 통합
- 문서 시각화/상태 레이어도 effect 토큰으로 사용

---

## 개발 가이드

### 새 컴포넌트 추가

1. **컴포넌트 파일 생성**
   ```bash
   packages/design-system/src/native/[ComponentName].tsx
   ```

2. **Export 추가**
   ```bash
   packages/design-system/src/native/index.ts
   ```

3. **문서 작성**
   ```bash
   packages/design-system/docs/components/[ComponentName].md
   ```

4. **Storybook 스토리 추가**
   ```bash
   storybook/stories/baerae-design-system/[ComponentName].stories.tsx
   ```

5. **패키지 빌드 & 배포**
   ```bash
   cd packages/design-system
   npm run build
   npm version patch
   npm publish
   ```

### 컴포넌트 개발 원칙

- **Foundation 토큰 필수 사용**: 하드코딩 금지
- **업계 표준 참조**: 검증된 디자인 패턴 따르기
- **AI 문서화**: 각 컴포넌트마다 마크다운 가이드 작성
- **Storybook 완성**: 모든 변형, 상태, 크기 포함

---

## 프로젝트 구조 상세 설명

### packages/design-system (NPM 패키지)

**실제 배포되는 패키지**입니다. 다른 프로젝트에서 `npm install @baerae-zkap/design-system`으로 설치합니다.

```
packages/design-system/
├── src/native/                # React Native 컴포넌트 (배포용)
├── src/tokens/                # Design Token 정의
├── docs/                      # AI 참조 문서 (마크다운)
├── dist/                      # 빌드 결과물
└── package.json
```

### storybook/ (컴포넌트 시각화)

**로컬 개발용** Storybook입니다. 컴포넌트 개발 중 대화형으로 테스트합니다.

```
storybook/
├── stories/baerae-design-system/   # 53개 컴포넌트 스토리
├── .storybook/                      # Storybook 설정
└── package.json
```

### src/ (문서 사이트)

**Next.js 기반 공식 문서 사이트**입니다. 컴포넌트 사용법과 가이드를 제공합니다.

```
src/
├── app/                        # 문서 페이지 + generated token css
│   ├── colors/
│   ├── components/
│   └── generated-*.css
├── components/                 # 문서 사이트 UI 컴포넌트
└── tokens/                     # 외부 브랜드 예외 컬러
```

---

## 배포

### Storybook 배포 (Vercel)

```bash
# 루트 디렉토리에서
vercel deploy --prod --yes
```

라이브: https://design-foundation.vercel.app

### NPM 패키지 배포

```bash
cd packages/design-system
npm run build
npm version patch
npm publish
```

---

## 동기화 체크리스트

컴포넌트 수정 시 다음 4개 위치를 반드시 동기화해야 합니다:

| # | 위치 | 파일 | 설명 |
|---|------|------|------|
| 1 | **React Native 코드** | `packages/design-system/src/native/[Name]/[Name].tsx` | 실제 컴포넌트 구현 |
| 2 | **AI 문서** | `packages/design-system/src/native/[Name]/[Name].md` | AI 참조용 마크다운 |
| 3 | **Storybook** | `storybook/stories/baerae-design-system/[Name].stories.tsx` | 컴포넌트 테스트 |
| 4 | **문서 사이트** | `src/app/components/.../page.tsx` | 사용법/토큰 매핑 문서 반영 |

---

## 시스템 요구사항

- **Node.js**: 18.17 이상
- **npm**: 10 이상

---

## 라이선스

baerae-zkap 회사 내부 사용

---

## 참고 자료

- **Design Tokens(JSON)**: `/public/palette.json`, `/public/semantic-tokens.json`, `/public/effects-tokens.json`, `/public/spacing-tokens.json`, `/public/radius-tokens.json`, `/public/typography-tokens.json`, `/public/shadow-tokens.json`, `/public/interaction-tokens.json`
- **토큰 생성 스크립트**: `/scripts/generate-color-css.mjs`, `/scripts/generate-colors-ts.mjs`, `/scripts/generate-foundation-css.mjs`
- **토큰 가드 스크립트**: `/scripts/check-no-raw-colors.mjs`
- **컴포넌트 문서**: `/packages/design-system/docs/`
- **개발 가이드**: `CLAUDE.md` (프로젝트 상세 설명서)

---

## 문의 & 피드백

이 라이브러리 사용 중 문제 또는 개선 사항이 있으시면 팀에 알려주세요.
