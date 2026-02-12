# Design Foundation & Components Library

**@baerae-zkap/design-system** - baerae-zkap 회사의 React & React Native 컴포넌트 라이브러리

---

## 개요

Design Foundation은 baerae-zkap 서비스에서 사용할 통합 디자인 시스템입니다. 53개의 React Native 컴포넌트와 13개의 Web 컴포넌트로 구성되어 있으며, Storybook과 AI 문서화를 통해 체계적으로 관리됩니다.

- **패키지명**: `@baerae-zkap/design-system`
- **현재 버전**: 0.1.13
- **배포 위치**: Google Artifact Registry
- **컴포넌트**: 53개 (React Native) + 13개 (Web)
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

## 폴더 구조

```
design-foundation/
├── packages/design-system/            # NPM 패키지 (@baerae-zkap/design-system)
│   ├── src/native/                    # React Native 컴포넌트 (53개) - 실제 배포용
│   │   ├── Button.tsx
│   │   ├── Chip.tsx
│   │   ├── Card.tsx
│   │   └── ... (53개 컴포넌트)
│   ├── src/components/                # Web 컴포넌트 (13개) - 배포 예정
│   ├── src/tokens/                    # Foundation 디자인 토큰
│   ├── docs/                          # AI 참조 문서
│   │   ├── COMPONENTS.md
│   │   └── components/
│   │       ├── Button.md
│   │       └── ... (컴포넌트 가이드)
│   └── package.json                   # 패키지 정보
│
├── storybook/                         # Storybook (RN 컴포넌트 시각화/테스트)
│   ├── stories/baerae-design-system/  # 53개 스토리
│   │   ├── Button.stories.tsx
│   │   ├── Chip.stories.tsx
│   │   └── ... (53개)
│   └── .storybook/                    # Storybook 설정
│
├── src/                               # Next.js 문서 사이트
│   ├── app/                           # 문서 페이지 (App Router)
│   │   └── components/
│   │       ├── actions/button/
│   │       ├── contents/card/
│   │       └── ... (카테고리별 페이지)
│   └── components/                    # 문서 사이트 UI 컴포넌트
│
├── existing-components/               # 레거시 컴포넌트 (컨벤션 참조용, 사용 X)
├── public/                            # Foundation 토큰 JSON 파일
│   ├── spacing-tokens.json
│   └── radius-tokens.json
└── vercel.json                        # Storybook Vercel 배포 설정
```

---

## 빠른 시작

### 설치

각 디렉토리에서 `pnpm install` 실행:

```bash
# 문서 사이트
pnpm install

# 패키지
cd packages/design-system
pnpm install
```

### Storybook 실행 (로컬)

```bash
cd storybook
pnpm storybook
```

`http://localhost:6006`에서 모든 컴포넌트의 시각화 및 테스트 가능합니다.

### 문서 사이트 실행 (로컬)

```bash
# 루트 디렉토리에서
pnpm dev
```

`http://localhost:3000`에서 문서 사이트 확인 가능합니다.

### 패키지 빌드

```bash
cd packages/design-system
pnpm build
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
pnpm storybook
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
| **프레임워크** | Next.js 16, React 19 |
| **스타일링** | Tailwind CSS 4 + Custom Recipe 시스템 |
| **언어** | TypeScript |
| **컴포넌트 라이브러리** | React Native (모바일) |
| **문서화** | Next.js 기반 문서 사이트 + Storybook |
| **패키지 관리** | pnpm |
| **배포** | Google Artifact Registry |

---

## 참조 디자인 시스템

이 프로젝트는 업계 모범 사례를 참조하여 설계되었습니다:

| 시스템 | 설명 |
|--------|------|
| **Toss Design System (TDS Mobile)** | 모바일 퍼스트 설계, 시멘틱 토큰 시스템 |
| **Wanted Montage Design System** | 체계적 카테고리, 상세한 문서화 방식 |

---

## Foundation Design Tokens

모든 컴포넌트는 Foundation Design Tokens를 기반으로 설계되었습니다.

### 토큰 파일

| 파일 | 내용 |
|------|------|
| `public/spacing-tokens.json` | 간격, 패딩, gap, 높이 토큰 |
| `public/radius-tokens.json` | border-radius 토큰 |

### 주요 토큰

**Spacing (간격)**
- `primitive.1` = 4px ~ `primitive.12` = 48px
- `inset` (내부 패딩): 4px ~ 24px
- `horizontal` (수평 간격): 4px ~ 16px
- Component 토큰: `button.gap`, `button.paddingX`, `modal.padding` 등

**Radius (모서리)**
- `primitive.none` = 0px ~ `primitive.full` = 9999px
- Component 토큰: `button.sm` = 8px, `button.lg` = 12px, `card.md` = 16px 등

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
   pnpm build
   npm version patch
   npm publish
   ```

### 컴포넌트 개발 원칙

- **Foundation 토큰 필수 사용**: 하드코딩 금지
- **Montage/Toss 참조**: 업계 표준 따르기
- **AI 문서화**: 각 컴포넌트마다 마크다운 가이드 작성
- **Storybook 완성**: 모든 변형, 상태, 크기 포함

---

## 프로젝트 구조 상세 설명

### packages/design-system (NPM 패키지)

**실제 배포되는 패키지**입니다. 다른 프로젝트에서 `npm install @baerae-zkap/design-system`으로 설치합니다.

```
packages/design-system/
├── src/native/                # React Native 컴포넌트 (배포용)
├── src/components/            # Web 컴포넌트 (배포용)
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
├── app/components/             # 문서 페이지
│   ├── actions/button/
│   ├── contents/card/
│   └── ... (카테고리별)
└── components/                 # 문서 사이트 UI 컴포넌트
```

---

## 배포

### Storybook 배포 (Vercel)

```bash
# 루트 디렉토리에서
vercel deploy --prod --yes
```

라이브: https://design-foundation.vercel.app

### NPM 패키지 배포 (Google Artifact Registry)

```bash
cd packages/design-system
pnpm build
npm version patch
npm publish
```

---

## 동기화 체크리스트

컴포넌트 수정 시 다음 5개 위치를 반드시 동기화해야 합니다:

| # | 위치 | 파일 | 설명 |
|---|------|------|------|
| 1 | **React Native 코드** | `packages/design-system/src/native/[Name].tsx` | 실제 컴포넌트 구현 |
| 2 | **Web 코드** | `packages/design-system/src/components/[Name]/` | 웹 버전 (배포 예정) |
| 3 | **AI 문서** | `packages/design-system/docs/components/[Name].md` | AI 참조용 마크다운 |
| 4 | **문서 사이트** | `src/app/components/*/page.tsx` | 공식 문서 페이지 |
| 5 | **Storybook** | `storybook/stories/baerae-design-system/[Name].stories.tsx` | 컴포넌트 테스트 |

---

## 시스템 요구사항

- **Node.js**: 18.17 이상
- **pnpm**: 8.0 이상
- **npm**: 배포 시 필요

---

## 라이선스

baerae-zkap 회사 내부 사용

---

## 참고 자료

- **Design Tokens**: `/public/spacing-tokens.json`, `/public/radius-tokens.json`
- **컴포넌트 문서**: `/packages/design-system/docs/`
- **개발 가이드**: `CLAUDE.md` (프로젝트 상세 설명서)
- **Montage Design System**: https://montage.wanted.co.kr
- **Toss Design System**: https://tossmini-docs.toss.im/tds-mobile/components

---

## 문의 & 피드백

이 라이브러리 사용 중 문제 또는 개선 사항이 있으시면 팀에 알려주세요.
