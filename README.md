# Design Foundation

**@baerae-zkap/design-system** — baerae-zkap 서비스의 웹 디자인 파운데이션 및 컴포넌트 라이브러리

---

## 개요

Design Foundation은 baerae-zkap 서비스에서 사용할 디자인 토큰 시스템과 42개 웹 컴포넌트 라이브러리입니다.

- **패키지명**: `@baerae-zkap/design-system`
- **기술 스택**: React, TypeScript, Next.js (문서 사이트)
- **웹 컴포넌트**: 42개
- **테마**: CSS 변수 기반 Light/Dark 자동 전환

### 브랜치 구조

| 브랜치 | 내용 |
|--------|------|
| `main` | 웹 파운데이션 + 문서 사이트 |
| `native` | React Native 컴포넌트 (개발자 트랙) |

---

## 설치 및 사용

```bash
npm install @baerae-zkap/design-system
```

### CSS 테마 설정

프로젝트 진입점에 CSS를 import합니다:

```tsx
// app/layout.tsx 또는 _app.tsx
import '@baerae-zkap/design-system/styles.css';
```

### 컴포넌트 사용

```tsx
import { Button, Card, TextField, spacing, typography } from '@baerae-zkap/design-system';

function MyPage() {
  return (
    <div style={{ padding: spacing.semantic.screen.paddingX }}>
      <Card variant="outlined" heading="프로필" onClick={() => {}}>
        <TextField label="이름" value={name} onChange={setName} />
        <Button buttonType="filled" color="primary" onClick={onSave}>
          저장
        </Button>
      </Card>
    </div>
  );
}
```

> 자세한 가이드는 [시작하기 문서](/getting-started)를 참고하세요.

---

## 컴포넌트 (42개)

### Actions (6)
| 컴포넌트 | 설명 |
|---------|------|
| Button | 기본 버튼 — `filled` / `weak` variant |
| IconButton | 아이콘 전용 버튼 (aria-label 필수) |
| TextButton | 인라인 텍스트 링크 스타일 버튼 |
| Chip | 태그, 필터, 선택 가능 라벨 |
| ActionArea | 모달/시트/페이지 하단 버튼 그룹 컨테이너 |
| BottomCTA | 하단 고정 CTA 바 |

### Contents (8)
| 컴포넌트 | 설명 |
|---------|------|
| Card | 그룹 콘텐츠 컨테이너 (클릭 가능) |
| Accordion | 펼침/닫힘 콘텐츠 패널 |
| Avatar / AvatarGroup | 사용자 프로필 이미지 (그룹 지원) |
| Badge | 숫자/상태 뱃지 오버레이 |
| ContentBadge | 독립형 상태/카테고리 라벨 |
| ListCard | 수평 썸네일 + 텍스트 리스트 아이템 |
| ListCell | 설정/메뉴용 단일행 리스트 아이템 |
| SectionHeader | 섹션 제목 + 옵션 액션 |

### Inputs (9)
| 컴포넌트 | 설명 |
|---------|------|
| TextField | 단일행 텍스트 입력 |
| TextArea | 멀티라인 텍스트 입력 |
| SearchField | 검색 입력 (클리어 버튼 내장) |
| Checkbox / CheckMark | 다중 선택 토글 |
| Radio / RadioGroup | 단일 선택 그룹 |
| Switch | 온/오프 토글 |
| Slider | 범위 값 선택 |
| SegmentedControl | 탭 스타일 세그먼트 선택 |

### Feedback (8)
| 컴포넌트 | 설명 |
|---------|------|
| Snackbar | 간단한 자동 닫힘 알림 |
| Toast | 제목 + 설명이 있는 리치 알림 |
| SectionMessage | 인라인 상태 메시지 |
| AlertDialog | 블로킹 확인 다이얼로그 |
| StateView | 빈 상태/에러/결과 화면 |
| PushBadge | 알림 카운트 오버레이 |
| Skeleton | 로딩 플레이스홀더 (시머 애니메이션) |
| Spinner | 불확정 로딩 인디케이터 |

### Navigation (7)
| 컴포넌트 | 설명 |
|---------|------|
| BottomNavigation | 모바일 하단 탭 바 |
| CategoryNavigation | 수평 카테고리 스크롤 |
| PageCounter | 페이지네이션 인디케이터 |
| ProgressIndicator | 진행률 바 |
| ProgressTracker | 다단계 프로세스 트래커 |
| Tab | 탭 스트립 |
| TopNavigation | 상단 네비게이션 헤더 |

### Presentation (4)
| 컴포넌트 | 설명 |
|---------|------|
| BottomSheet | 하단 모달 시트 |
| Popover | 앵커 기반 플로팅 패널 |
| Popup | 모달 팝업 |
| Tooltip | 컨텍스트 힌트 |

---

## 토큰 시스템

### 사용 가능한 토큰

```tsx
import { spacing, typography, radius, lightColors, darkColors } from '@baerae-zkap/design-system';

// 스페이싱 (4px 기반)
spacing.primitive[4]              // 16px
spacing.semantic.screen.paddingX  // 20px

// 타이포그래피
typography.semantic.headline.md   // { fontSize, fontWeight, lineHeight }
typography.semantic.body.sm

// 반경
radius.component.button.md       // 8
radius.component.card.md         // 16

// 색상 (CSS 변수 권장)
// 인라인 스타일: var(--content-base-default)
// JS 로직용: lightColors.content.base.default (hex)
```

### CSS 변수 (주요)

| 변수 | 용도 |
|------|------|
| `--surface-base-default` | 페이지/카드 배경 |
| `--surface-base-alternative` | 대체 배경 |
| `--content-base-default` | 주요 텍스트 |
| `--content-base-secondary` | 보조 텍스트 |
| `--content-brand-default` | 브랜드 컬러 텍스트 |
| `--divider` | 구분선/보더 |

---

## 개발 (문서 사이트)

```bash
# 의존성 설치
npm install

# 개발 서버 (토큰 자동 생성 포함)
npm run dev
# → http://localhost:3000

# 전체 빌드 (토큰 생성 + 검증 + Next 빌드)
npm run build

# 검증 명령어
npm run check:tokens       # Light/Dark 패리티 (103/103) + WCAG 대비 검사
npm run check:raw-colors   # 하드코딩 색상 잔존 검사
```

---

## 폴더 구조

```
design-foundation/
├── packages/design-system/          # 배포 패키지
│   ├── src/
│   │   ├── components/              # 웹 컴포넌트 42개
│   │   ├── tokens/                  # 토큰 TS (auto-generated + manual)
│   │   ├── utils/                   # usePressable, styles 등
│   │   └── index.ts                 # 패키지 export
│   └── styles.css                   # 컬러 + 파운데이션 CSS 번들
├── src/
│   ├── app/                         # Next.js 문서 페이지
│   │   ├── components/              # 컴포넌트 문서 (6 카테고리)
│   │   ├── getting-started/         # 시작하기 가이드
│   │   └── foundations/             # 파운데이션 문서
│   └── components/                  # 문서 사이트 UI 컴포넌트
├── public/                          # 토큰 JSON (단일 소스)
├── scripts/                         # 토큰 생성/검증 스크립트
└── .claude/                         # AI 문서 (rules, resources, skills)
```

---

## 토큰 파이프라인

JSON → 자동 생성:

```
public/palette.json           ──▶ packages/design-system/src/tokens/colors.ts
public/semantic-tokens.json   ──▶ (동일)
public/effects-tokens.json    ──▶ packages/design-system/src/tokens/effects.ts
public/shadow-tokens.json     ──▶ packages/design-system/src/tokens/shadow.ts
public/*-tokens.json          ──▶ src/app/generated-foundation-tokens.css
                              ──▶ packages/design-system/styles.css
```

---

## 개발 원칙

- **토큰 필수** — 하드코딩 색상/수치 금지 (`check:raw-colors`로 검증)
- **CSS var 테마** — Light/Dark 자동 전환 (`prefers-color-scheme`)
- **접근성** — aria 속성, 키보드 지원, focus-visible
- **패리티** — Light/Dark 시멘틱 토큰 103/103 쌍 (`check:tokens`로 검증)

---

## 라이선스

MIT — baerae-zkap
