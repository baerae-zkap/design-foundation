# Design Foundation

**@baerae-zkap/design-system** — baerae-zkap 서비스의 웹 디자인 파운데이션 및 컴포넌트 라이브러리

---

## 개요

Design Foundation은 baerae-zkap 서비스에서 사용할 디자인 토큰 시스템과 웹 컴포넌트 라이브러리입니다.

- **패키지명**: `@baerae-zkap/design-system`
- **기술 스택**: React (Web), TypeScript, Next.js
- **웹 컴포넌트**: 24개
- **문서 사이트**: Next.js App Router 기반

### 브랜치 구조

| 브랜치 | 내용 |
|--------|------|
| `main` | 웹 파운데이션 + 문서 사이트 (현재) |
| `native` | React Native 컴포넌트 (개발자 트랙) |

---

## 폴더 구조

```
design-foundation/
├── packages/design-system/          # 배포 패키지 (@baerae-zkap/design-system)
│   └── src/
│       ├── components/              # 웹 컴포넌트 24개
│       ├── tokens/                  # 토큰 TS 파일 (auto-generated + manual)
│       ├── utils/                   # 유틸 (usePressable, styles 등)
│       └── index.ts                 # 패키지 export
├── src/
│   ├── app/                         # Next.js 문서 페이지
│   │   ├── components/              # 컴포넌트 문서 (actions / contents / inputs)
│   │   ├── foundations/             # 파운데이션 문서
│   │   ├── generated-color-tokens.css
│   │   └── generated-foundation-tokens.css
│   └── components/                  # 문서 사이트 UI 컴포넌트
├── public/                          # 토큰 JSON (단일 소스)
│   ├── palette.json
│   ├── semantic-tokens.json
│   ├── effects-tokens.json
│   ├── shadow-tokens.json
│   ├── spacing-tokens.json
│   ├── radius-tokens.json
│   ├── typography-tokens.json
│   ├── interaction-tokens.json
│   └── general-tokens.json
└── scripts/                         # 토큰 생성 스크립트
    ├── generate-color-css.mjs
    ├── generate-colors-ts.mjs
    ├── generate-effects-ts.mjs
    ├── generate-shadow-ts.mjs
    ├── generate-foundation-css.mjs
    ├── lint-tokens.mjs
    └── check-no-raw-colors.mjs
```

---

## 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 (토큰 자동 생성 포함)
npm run dev
```

`http://localhost:3000`에서 문서 사이트 확인

---

## 명령어

```bash
npm run dev              # 개발 서버 (predev: 토큰 생성 포함)
npm run build            # 전체 빌드 (토큰 생성 + 검증 + Next 빌드)
npm run tokens           # 토큰 전체 재생성
npm run check:tokens     # 패리티 검사 + WCAG 대비 검사
npm run check:raw-colors # 하드코딩 색상 잔존 검사
```

---

## 토큰 파이프라인

JSON 파일이 소스, 스크립트가 TS/CSS를 자동 생성합니다.

```
public/palette.json             ──▶  packages/design-system/src/tokens/colors.ts
public/semantic-tokens.json     ──▶  (동일)
public/effects-tokens.json      ──▶  packages/design-system/src/tokens/effects.ts
public/shadow-tokens.json       ──▶  packages/design-system/src/tokens/shadow.ts

public/spacing-tokens.json      ──▶  src/app/generated-foundation-tokens.css
public/radius-tokens.json       ──▶  (동일)
public/typography-tokens.json   ──▶  (동일)
public/shadow-tokens.json       ──▶  (동일)
public/interaction-tokens.json  ──▶  (동일)
public/general-tokens.json      ──▶  (동일)
```

> spacing / radius / typography / motion의 TS 토큰 파일은 수동 관리 (JSON 값과 동기화 유지 필요)

---

## 토큰 파일

| 파일 | 내용 |
|------|------|
| `palette.json` | 원자 색상 팔레트 |
| `semantic-tokens.json` | 시멘틱 색상 (light/dark) |
| `effects-tokens.json` | alpha/overlay 계층 |
| `shadow-tokens.json` | 그림자 primitive/semantic |
| `spacing-tokens.json` | 간격, 패딩, gap, 컴포넌트 크기 |
| `radius-tokens.json` | border-radius |
| `typography-tokens.json` | 타이포그래피 스케일/스타일 |
| `interaction-tokens.json` | 모션 duration/easing/semantic |
| `general-tokens.json` | opacity, borderWidth, zIndex |

---

## 웹 컴포넌트 목록

### Actions (5개)
| 컴포넌트 | 설명 |
|---------|------|
| Button | 기본 버튼 — `filled` / `weak` variant |
| TextButton | 텍스트 버튼 |
| IconButton | 아이콘 버튼 |
| Chip | 태그, 필터 선택 |
| ActionArea | 래퍼 컨테이너 |

### Contents (8개)
| 컴포넌트 | 설명 |
|---------|------|
| Accordion | 펼침/닫힘 콘텐츠 |
| Card | 자유 레이아웃 카드 |
| ContentBadge | 상태 뱃지 |
| ListCard | 수평 썸네일 리스트 카드 |
| ListCell | 리스트 셀 |
| SectionHeader | 섹션 헤더 |
| Table | 데이터 테이블 |
| Thumbnail | 썸네일 이미지 |

### Inputs (11개)
| 컴포넌트 | 설명 |
|---------|------|
| TextField | 텍스트 입력 |
| TextArea | 멀티라인 입력 |
| SearchField | 검색 입력 |
| Select | 드롭다운 선택 |
| Checkbox / CheckMark | 체크박스 |
| Radio | 라디오 버튼 |
| Switch | 토글 스위치 |
| Slider | 범위 슬라이더 |
| SegmentedControl | 세그먼트 컨트롤 |
| FramedStyle | 입력 프레임 래퍼 |

---

## 패키지 사용법

```typescript
import {
  Button,
  Chip,
  Card,
  ListCard,
  TextField,
  spacing,
  typography,
  radius,
  cssVarColors,
  transitions,
} from '@baerae-zkap/design-system';

// 컴포넌트
<Button variant="filled" color="primary" size="md" onClick={() => {}}>
  확인
</Button>

// 토큰 직접 사용
const style = {
  padding: spacing.primitive[4],        // 16px
  borderRadius: radius.component.card.sm,
  fontSize: typography.fontSize.md,
  transition: transitions.background,
};
```

---

## 개발 원칙

- **토큰 필수 사용** — 하드코딩 색상/수치 금지 (`check:raw-colors`로 검증)
- **CSS var 기반 테마** — 라이트/다크 자동 전환
- **접근성** — aria 속성, 키보드 지원, focus-visible 아웃라인
- **패리티** — light/dark 시멘틱 토큰 103/103 쌍 (`check:tokens`로 검증)

---

## 라이선스

baerae-zkap 내부 사용
