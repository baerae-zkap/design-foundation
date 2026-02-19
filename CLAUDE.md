# Design Foundation (Working Context)

## 프로젝트 목적
서비스에 적용 가능한 **Design Foundation + Component Library**를 운영한다.
현재는 토큰 품질과 문서 사이트 완성도를 높이는 단계다.

## 현재 스냅샷 (2026-02-19)
- 저장소: `git@github.com:baerae-zkap/design-foundation.git`
- 로컬 기준 경로: `/Users/jaden/design-foundation`
- 기본 브랜치: `main`

## 역할 분리 (합의)
- 개발자 트랙: RN 컴포넌트 / Storybook / 패키지 개선
- 현재 작업 트랙(나): Next.js 문서 사이트 + Web 컴포넌트 + Foundation 토큰 정리

---

## 컴포넌트 개선 진행 현황

### 개선 작업 정의
각 컴포넌트별로 아래 항목을 점검/수행한다:
- **컬러 rename**: `*Default` → 단순 이름 (primary, neutral, success, error 등)
- **variant 정리**: `outlined` → `weak` (Button/IconButton/Chip), API 단순화
- **접근성**: aria 속성, 키보드 지원, role 부여
- **토큰화**: 하드코딩 값 → 파운데이션 토큰 (typography, spacing, radius, motion, borderWidth)
- **CSS var 마이그레이션**: `colors.*` (hex) → `cssVarColors.*` (CSS var) — 테마 자동 전환
- **문서 스타일 가이드 통일**: 섹션 순서 표준화, Overview 간소화, Best Practices 통일 등
- **문서 내용 정확성**: 실제 컴포넌트 코드와 문서 내 토큰/props/타입 매칭 교차검증

### Actions (5/5 완료)

| 컴포넌트 | 코드 개선 | 컬러 rename | variant 정리 | 접근성 | 문서 스타일 | 문서 교차검증 |
|----------|:---------:|:-----------:|:------------:|:------:|:-----------:|:------------:|
| Button | ✅ | ✅ primary/neutral/success/error/kakao/google | ✅ filled+weak | - | ✅ | ✅ |
| IconButton | ✅ usePressable 훅 | ✅ primary/neutral/error | ✅ filled+ghost+weak | - | ✅ | ✅ |
| TextButton | ✅ | ✅ primary/neutral/muted/error | - | - | ✅ | ✅ |
| Chip | ✅ filled=솔리드bg | ✅ primary/neutral/success/error/warning | ✅ filled+weak | - | ✅ | ✅ |
| ActionArea | ✅ 직접 import | - | - | - | ✅ | ✅ |

### Contents (2/8 코드 개선 완료)

| 컴포넌트 | 코드 개선 | 컬러 rename | API 개선 | 접근성 | 문서 스타일 | 문서 교차검증 |
|----------|:---------:|:-----------:|:--------:|:------:|:-----------:|:------------:|
| Accordion | ✅ disabled 제거 | - | ✅ | ✅ aria/키보드 | ✅ | - |
| Card | ✅ Slot Props | - | ✅ onClick필수, disabled/padding:none 제거 | ✅ role=button | ✅ | - |
| ContentBadge | - | ✅ (이미 완료) | **TODO** | - | ✅ | - |
| ListCard | - | - | **TODO** | - | ✅ | - |
| ListCell | - | - | **TODO** | - | ✅ | - |
| SectionHeader | - | - | **TODO** | - | ✅ | - |
| Table | - | - | **TODO** | - | ✅ | - |
| Thumbnail | - | - | **TODO** | - | ✅ | - |

> Contents 컴포넌트는 문서 스타일만 통일 완료. **코드 품질 개선 + 문서 교차검증**이 남아있음.

### Inputs (0/11 — 문서 페이지 미생성)

사이드바에 "Inputs" 카테고리 자체가 없다. 컴포넌트 코드는 존재하나 문서 페이지 없음.

| 컴포넌트 | 코드 존재 | CSS var 완료 | 토큰화 | 문서 페이지 | 비고 |
|----------|:---------:|:------------:|:------:|:-----------:|------|
| TextField | ✅ | ✅ | ✅ | **TODO** | Input 기본 |
| TextArea | ✅ | ✅ | ✅ | **TODO** | 멀티라인 |
| SearchField | ✅ | ✅ | ✅ | **TODO** | 검색 전용 |
| Select | ✅ | ✅ | ✅ | **TODO** | 드롭다운 |
| Checkbox | ✅ | ✅ | ✅ | **TODO** | |
| CheckMark | ✅ | ✅ | ✅ | **TODO** | 내부용? |
| Radio | ✅ | ✅ | ✅ | **TODO** | |
| Switch | ✅ | ✅ | ✅ | **TODO** | |
| Slider | ✅ | ✅ | ✅ | **TODO** | |
| SegmentedControl | ✅ | ✅ | ✅ | **TODO** | |
| FramedStyle | ✅ | ✅ | ✅ | **TODO** | 내부 래퍼? |

> 모든 Input 컴포넌트는 CSS var 마이그레이션 + borderWidth/transition 토큰화 완료 상태.
> 다음 단계: 사이드바에 Inputs 카테고리 추가 + 각 컴포넌트 문서 페이지 생성.

### 레거시 문서 페이지 (정리 필요)

사이드바에 없지만 라우트가 존재하는 구형 페이지. 인라인 컴포넌트 정의 사용 (디자인 시스템 미연결).

| 경로 | 상태 | 처리 방향 |
|------|------|----------|
| `/components/input` | 인라인 Input 정의 | 삭제 또는 TextField 문서로 리다이렉트 |
| `/components/checkbox` | 인라인 Checkbox 정의 | 삭제 또는 Checkbox 문서로 리다이렉트 |
| `/components/button` | 인라인 Button 정의 | 삭제 (actions/button으로 이동 완료) |
| `/components/modal` | 인라인 Modal 정의 | 보류 (Modal 컴포넌트 미구현) |
| `/components/toast` | 인라인 Toast 정의 | 보류 (Toast 컴포넌트 미구현) |

---

## 다음 작업 (우선순위)

### 1. Contents 컴포넌트 코드 개선 (Card 다음)
Card/Accordion과 동일 패턴으로 나머지 6개 개선:
- **ContentBadge** → API 점검, 접근성
- **ListCard** → API 단순화, Slot Props 검토 (Card와 유사 패턴?)
- **ListCell** → API 점검
- **SectionHeader** → API 점검
- **Table** → 접근성 (aria-* 속성)
- **Thumbnail** → radius prop 네이밍 정리

### 2. Inputs 카테고리 구축
1. 사이드바에 "Inputs" 라벨 + 컴포넌트 링크 추가
2. 각 컴포넌트 문서 페이지 생성 (문서 스타일 가이드 준수)
3. 컴포넌트 코드 품질 개선 (접근성, API 정리)
4. 우선순위: TextField → Select → Checkbox → Radio → Switch → TextArea → SearchField → Slider → SegmentedControl

### 3. 문서 사이트 인프라
- **TOC h3 계층 표시**: ✅ 완료 (2026-02-19)
- ThemeProvider 컨텍스트 구현 (React context 레벨 테마 관리 + 토글 UI)
- Interaction 페이지 콘텐츠 추가
- 레거시 페이지 정리 (위 표 참조)

### 4. 보류 (디자이너 협의 필요)
- WCAG 대비 개선 — 13개 WARN 쌍 (dark mode onSolid, status 뱃지)
- 다크 시멘틱 토큰 세부 튜닝 (실 UI 적용 후)
- forced-colors 모드 대응

---

## 완료된 인프라 작업 (요약)

### 토큰 시스템
- 다크 팔레트 v3.2 (OKLab/OKLCH 기반)
- Light/Dark 시멘틱 103/103 패리티
- alphaComposite → alpha() 빌드타임 함수 마이그레이션
- component-level 색상 토큰 레이어 제거 (Props가 추상화 대체)
- 토큰 API: `lightColors`/`darkColors` (퍼블릭), `cssVarColors` (내부 전용)

### 컴포넌트 인프라
- 24개 전체 웹 컴포넌트 CSS var 마이그레이션 완료
- 24개 전체 웹 컴포넌트 borderWidth/transition 토큰화 완료 (하드코딩 0건)
- Foundation tokens: opacity, borderWidth, zIndex, motion(duration/easing/transitions), component sizing

### 테마 런타임
- CSS 변수 + bootstrap script (FOWT 방지) + media query fallback
- cssVarColors + cssVarShadow 자동생성 파이프라인

### 품질 게이트
- `check:tokens`: 패리티(blocking) + WCAG 대비(warn-only) — 103/103
- `check:raw-colors`: hex 리터럴 잔존 검사
- prebuild에 통합

### 문서 사이트
- 13개 컴포넌트 문서 페이지 섹션 순서 표준화 (canonical order)
- 문서 스타일 가이드 통일 (Overview 간소화, Best Practices 패턴, PreviewBox 배경, 토큰 적용)
- 파운데이션 12페이지 토큰화 완료
- Do/Don't 사용 가이드 페이지 완성
- TOC h3 계층 표시 + 스크롤 트래킹 추가

---

## 토큰 파이프라인 (현재 아키텍처)
```
public/palette.json ─────────────────────┐
public/semantic-tokens.json ─────────────┤
public/effects-tokens.json ──────────────┤
public/shadow-tokens.json ───────────────┤
                                         ▼
scripts/generate-color-css.mjs ──→ src/app/generated-color-tokens.css
scripts/generate-colors-ts.mjs ──→ packages/design-system/src/tokens/colors.ts
                                   ├─ palette (원시값 hex)
                                   ├─ lightColors (light hex, 구 colors)
                                   ├─ darkColors (dark hex)
                                   └─ cssVarColors (@internal, CSS var strings)
scripts/generate-effects-ts.mjs ──→ packages/design-system/src/tokens/effects.ts
                                   ├─ effects (light, 인라인 HSLA + palette refs)
                                   └─ darkEffects (dark, 인라인 HSLA + palette refs)
scripts/generate-shadow-ts.mjs ──→ packages/design-system/src/tokens/shadow.ts
                                   ├─ shadow (light values)
                                   ├─ darkShadow (dark values)
                                   └─ cssVarShadow (CSS var strings)
scripts/generate-foundation-css.mjs ──→ src/app/generated-foundation-tokens.css
```

## 문서 페이지 스타일 가이드 (통일 기준)

컴포넌트 문서 페이지 작성/수정 시 아래 규칙을 따른다.

### 섹션 순서 (Canonical Order)
**Design Tab** (반드시 이 순서):
1. Overview → 2. Anatomy → 3. Variants → 4. [Component-specific] → 5. States (with Interaction States subsection) → 6. Usage Guidelines (with Best Practices subsection) → 7. Design Tokens → 8. Accessibility → 9. Related Components

**Web Tab** (반드시 이 순서):
1. Source Code → 2. Import → 3. Basic Usage → 4. [Component-specific examples] → 5. API Reference

**규칙:**
- 섹션 제목은 **영문** (한국어 금지)
- Interaction States → States 내부 `<Subsection>`
- Best Practices → Usage Guidelines 내부 `<Subsection>`
- UX Writing 섹션 금지 → Do/Don't 쌍을 Best Practices에 병합

### 공유 컴포넌트 (반드시 사용)
- `Section`, `Subsection`, `InlineCode` — `@/components/docs/Section`
- `PropsTable`, `ColorTableRow` — `@/components/docs/PropsTable`
- `DoCard`, `DontCard`, `PrincipleCard`, `VariantCard` — `@/components/docs/Cards`
- `RadioGroup`, `CopyButton` — `@/components/docs/Playground`
- `DoLabel`, `DontLabel`, `NumberBadge` — `@/components/docs/Labels`

### 스타일 규칙
- 설명 텍스트: `fontSize: 14`, `color: "var(--text-secondary)"`, `lineHeight: 1.7`
- Overview: 간결한 1-2줄, InlineCode로 컴포넌트명 감싸기, When to use/NOT 카드 사용 금지
- PreviewBox: bg `var(--surface-base-alternative)`, borderRadius 12, border 없음
- 테이블: `PropsTable` 사용, type 컬럼 `var(--text-secondary)`
- Best Practices: `DoCard`/`DontCard` + 2컬럼 그리드 + 컬러 설명 텍스트

### 컬러 prop 네이밍 (전체 완료)
- `brandDefault` → `primary`, `baseDefault`/`baseContainer` → `neutral`
- `successDefault` → `success`, `errorDefault` → `error`, `warningDefault` → `warning`
- `infoDefault` → `info`, `kakaoDefault` → `kakao`, `googleDefault` → `google`
- `baseNeutral` (TextButton) → `muted`

## 색상 토큰 규칙 (운영 기준)
- 표기 포맷: **HSLA 기준**
- 네이밍: `disabled` 사용 (`disable` 금지)
- `content.base.disabled`는 호환 목적(Deprecated), 신규는 `content.disabled.default` 사용

## 빠른 체크 명령어
```bash
npm run build              # 토큰 생성 + lint + next build (35 pages)
npm run check:tokens       # 패리티(blocking) + WCAG 대비(warn-only) — 103/103
npm run check:raw-colors   # hex 리터럴 잔존 검사
```

## 주의사항
- 현재 워크트리는 이미 변경 파일이 많다. 작업 시 타 변경분을 되돌리지 않는다.
- 토큰 변경 시 `public/*.json`과 `packages/design-system/src/tokens/*.ts`를 항상 함께 확인한다.
