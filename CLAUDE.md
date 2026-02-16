# Design Foundation (Working Context)

## 프로젝트 목적
서비스에 적용 가능한 **Design Foundation + Component Library**를 운영한다.
현재는 토큰 품질과 문서 사이트 완성도를 높이는 단계다.

## 현재 스냅샷 (2026-02-15)
- 저장소: `git@github.com:baerae-zkap/design-foundation.git`
- 로컬 기준 경로: `/Users/jaden/design-foundation`
- 기본 브랜치: `main`

## 역할 분리 (합의)
- 개발자 트랙: RN 컴포넌트 / Storybook / 패키지 개선
- 현재 작업 트랙(나): Next.js 문서 사이트 + Web 컴포넌트 + Foundation 토큰 정리

## 완료된 핵심 작업

### 1) 다크 팔레트 v3.2 설계/적용 완료 (이전 세션)
- OKLab/OKLCH 기반으로 다크 팔레트 반복 개선(v1~v3.2)
- 12색 팔레트 정리 및 검증 통과
- 반영 파일:
  - `packages/design-system/src/tokens/colors.ts`
  - `public/dark-palette.json`
  - `src/app/colors/palette/page.tsx`
  - `src/components/docs/Playground.tsx`
- 관련 커밋(기록):
  - `8d1a77c`
  - `13b4dcf`

### 2) 라이트 시멘틱 토큰 정리 (이번 세션)
- `semantic -> runtime` 동기화 완료
- `disable` 네이밍 잔존 정리 (`disabled`로 통일)
- 상태 텍스트 strong 계층 반영:
  - `content.warning.strong`
  - `content.success.strong`
  - `content.info.strong`
- 반영 파일:
  - `public/semantic-tokens.json`
  - `packages/design-system/src/tokens/colors.ts`
  - `src/app/globals.css`
  - `packages/design-system/src/components/SegmentedControl/SegmentedControl.tsx`
  - `packages/design-system/src/native/SegmentedControl/SegmentedControl.tsx`
- 검증:
  - `npm run build` 성공
  - semantic palette ref 검사: invalid 0

### 3) Palette 문서 방향 재정의 (Atomic 단일화)
- 결론: Palette는 **테마 분리하지 않고 단일(primitive) 기준**으로 운영
- 반영:
  - `/colors/palette`에서 Light/Dark 탭 제거
  - `dark-palette.json` 다운로드/표시 분기 제거
  - 안내 문구를 "테마 분기는 Semantic에서 관리"로 변경
  - 실험용 `/colors/palette-compare-proposal` 라우트 제거
- 검증:
  - `npm run build` 성공

### 4) 테마 런타임 연결 + 시멘틱 매트릭스 확장 (2026-02-15)
4단계 병렬 실행(Ultrapilot)으로 완료. Codex CLI 교차검증 + Architect 최종 승인.

**Phase 1: 시멘틱 매트릭스 확장 (17토큰)**
- warning/info pressed·solid·solidPressed 표면, warning/info 보더, warning/info 아이콘, status.informational 추가
- Light/Dark 동시 추가, 패리티 130/130 검증 통과
- `surface.info.default`는 grey.97/grey.20 유지 (의도적 — neutral info 배경)

**Phase 2: 테마 부트스트랩 + CSS 폴백**
- `src/app/layout.tsx`: 인라인 `<script>`로 FOWT 방지 (localStorage → prefers-color-scheme → light)
- `scripts/generate-color-css.mjs`: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` 폴백 추가
- CSS 특이성 일치: `:root[data-theme="dark"]` (0-2-1) = media query 셀렉터 (0-2-1)

**Phase 3: CSS Var Map 생성**
- `scripts/generate-colors-ts.mjs` 확장 → `cssVarColors` export 추가
- `colors`와 동일한 shape, 값은 `'var(--surface-brand-default)' as const` 형태
- `CssVarColorToken` 타입 export 추가

**Phase 4: Button 컴포넌트 마이그레이션 (첫 번째 웹 컴포넌트)**
- `Button.tsx`: `colors.*` (hex) → `cssVarColors.component.button.*` (CSS vars) 전환
- RN 컴포넌트는 변경 없음

**반영 파일:**
  - `public/semantic-tokens.json` (17 토큰 추가)
  - `scripts/generate-color-css.mjs` (media query + specificity fix)
  - `scripts/generate-colors-ts.mjs` (cssVarColors 생성)
  - `src/app/layout.tsx` (theme bootstrap script)
  - `packages/design-system/src/tokens/colors.ts` (자동생성 — cssVarColors 포함)
  - `src/app/generated-color-tokens.css` (자동생성 — dark fallback 포함)
  - `packages/design-system/src/components/Button/Button.tsx` (CSS var 마이그레이션)

**검증:**
  - `npm run build` 성공 (34 pages, 0 errors)
  - Light/Dark 패리티 130/130 PASS
  - Codex CLI 코드리뷰 4건 PASS
  - Architect 검증 8/8 체크포인트 PASS

### 5) 전체 웹 컴포넌트 CSS var 마이그레이션 + 토큰 인프라 확장 (2026-02-15)
Ultrapilot 4단계 병렬 실행. Codex 코드리뷰 + Architect 검증 완료.

**Phase A: 토큰 인프라 확장 (10가지 사전 수정)**
- Typography: compact fontSize(13), lineHeight(19), semantic.compact 스타일 추가
- General tokens: NEW `general.ts` — opacity(disabled/dimmed/overlay), borderWidth(hairline/default/strong)
- Shadow CSS vars: `cssVarShadow` 자동생성 파이프라인 구축
- Foundation CSS: 다크 셰도우 특이성 수정 + media query fallback
- Semantic tokens: icon.error/success, content.*.onSolid 추가 (WCAG: warning.onSolid = grey.15)
- Component sizing: spacing.ts에 chip/badge/accordion/table/iconButton/thumbnail/listCell/textButton 토큰

**Phase B: 재생성 + Export 업데이트**
- 모든 생성 스크립트 재실행 (colors.ts, color CSS, shadow.ts, foundation CSS)
- tokens/index.ts: cssVarColors, cssVarShadow, opacity, borderWidth export 추가
- tokens convenience 객체에도 모든 신규 토큰 포함

**Phase C: 13개 웹 컴포넌트 CSS var 마이그레이션**
- 모든 exported 웹 컴포넌트: `colors` → `cssVarColors`, `shadow` → `cssVarShadow`
- Button, TextButton, IconButton, Chip, ActionArea, Accordion, Card, ContentBadge, ListCard, ListCell, SectionHeader, Table, Thumbnail
- 하드코딩 값 → 파운데이션 토큰 교체 (opacity.disabled, spacing.component.*, typography.fontSize.compact)

**Phase D: 코드리뷰 수정 (8건)**
- HIGH: Accordion height 토큰 구조체 접근 수정 (.md/.lg)
- HIGH: Chip warningDefault bgPressed → defaultPressed
- MEDIUM: ListCell trailing → content.base.neutral
- MEDIUM: ContentBadge infoDefault border → border.info.default
- MEDIUM: tokens 객체 신규 export 추가
- MEDIUM: TextButton 폰트 크기 전면 토큰화

**반영 파일:**
  - `packages/design-system/src/tokens/general.ts` (NEW — opacity, borderWidth)
  - `packages/design-system/src/tokens/typography.ts` (compact 추가)
  - `packages/design-system/src/tokens/spacing.ts` (component sizing 추가)
  - `packages/design-system/src/tokens/index.ts` (전체 export 업데이트)
  - `public/semantic-tokens.json` (136/136 패리티)
  - `scripts/generate-shadow-ts.mjs` (cssVarShadow 생성)
  - `scripts/generate-foundation-css.mjs` (다크 셰도우 수정)
  - 13개 웹 컴포넌트 .tsx 파일

**검증:**
  - `npm run build` 성공 (34 pages, 0 errors)
  - Light/Dark 패리티 136/136 PASS
  - Hex colors import 잔여: 13/13 컴포넌트 모두 0
  - cssVarColors 사용: 13/13 컴포넌트 활성 (240+ references)
  - Codex 코드리뷰 8건 수정 완료
  - Architect 검증 통과

### 6) 내부 컴포넌트 마이그레이션 + 사용 가이드 + 품질 게이트 (2026-02-15)
11개 내부(non-exported) 웹 컴포넌트 CSS var 마이그레이션 + 품질 인프라 구축. Architect + Codex 검증 완료.

**내부 컴포넌트 마이그레이션 (11개)**
- Select(29 refs+shadow), SegmentedControl(11+shadow), Slider(8+shadow)
- TextField(15), TextArea(11), SearchField(8)
- Radio(6), Switch(6+shadow), CheckMark(5), FramedStyle(5+shadow), Checkbox(4)
- 모두 `colors` → `cssVarColors`, `shadow` → `cssVarShadow`, 하드코딩 opacity → `opacity.disabled`

**품질 게이트: lint-tokens.mjs**
- Light/Dark 패리티 체크 (blocking — exit 1 on mismatch)
- WCAG AA 대비 체크 24쌍 (warn-only — 디자인 결정 필요)
- `prebuild`에 통합: `npm run check:tokens`

**WCAG 대비 분석 결과**
- 11/24 PASS, 13 WARN (non-blocking)
- PASS: button primary, strong 텍스트(light/dark), warning.onSolid(light), error.onSolid(light)
- WARN: onSolid(dark mode) — orange.60/teal.60/green.60 on white < 4.5:1
- WARN: status 뱃지 — teal.50/teal.95 등 light mode 대비 부족
- 대비 개선은 디자이너와 협의 필요 (palette 변경 수반)

**Do/Don't 사용 가이드 페이지**
- `/colors/usage-guide` — 6개 섹션, 11 Do/Don't 카드, 60+ CSS var 참조
- 토큰 아키텍처 개요, 플랫폼별 사용법, 시멘틱 규칙, 컴포넌트 패턴, 파운데이션, 품질 게이트

**반영 파일:**
  - 11개 내부 웹 컴포넌트 .tsx 파일
  - `scripts/lint-tokens.mjs` (NEW — 패리티 + WCAG 대비 검사)
  - `src/app/colors/usage-guide/page.tsx` (NEW — Do/Don't 문서)
  - `src/components/Sidebar.tsx` (Usage Guide 네비 추가)
  - `package.json` (`check:tokens` 스크립트 + prebuild 통합)

**검증:**
  - `npm run build` 성공 (35 pages, 0 errors)
  - Light/Dark 패리티 136/136 PASS
  - Raw color lint: 0 findings
  - Architect + Codex 코드리뷰 검증 완료

### 7) 토큰 아키텍처 정리 — Q1 Status 통합 + Q2 컴포넌트 토큰 네이밍 구조화 (2026-02-16)
동료 개발자 제안 기반. Ultrapilot 병렬 실행 + Architect 교차검증 + Codex 코드리뷰 완료.

**Q1: Status 토큰 통합 제거**
- `status` 블록 제거 (positive/negative/cautionary/informational → success/error/warning/info 시멘틱으로 통합)
- 12개 토큰 × 2 테마 = 24개 제거, 패리티 136/136 → 124/124
- 4개 컴포넌트 코드 업데이트 (Chip, IconButton, ContentBadge, Button)
- 14개 문서 페이지 CSS var 참조 업데이트 (63건)
- lint-tokens.mjs WCAG 쌍 업데이트 (light + dark)

**Q2: 컴포넌트 토큰 네이밍 구조화**
- Button: flat → nested (`primarySurface` → `surface.primary`)
- Chip: flat → nested (`neutralSurface` → `surface.neutral`)
- Input: flat → nested (`focusBorder` → `border.focus`, `focusRing` → `ring.focus`)
- CSS var: `--component-button-primarySurface` → `--component-button-surface-primary`
- usage-guide 코드 샘플 업데이트

**반영 파일:** 23개 (semantic-tokens.json, colors.ts, generated-color-tokens.css, 4 컴포넌트, 14 문서 페이지, lint-tokens.mjs, usage-guide)

**검증:**
  - `npm run build` 성공 (35 pages, 0 errors)
  - Light/Dark 패리티 124/124 PASS
  - Architect 교차검증 14/15 PASS (1건 수정 후 PASS)
  - Codex 코드리뷰 HIGH 1 + MEDIUM 2 수정 완료

## 현재 상태 요약
- Palette: 단일(primitive) 뷰로 정리 완료
- Semantic: Light/Dark 124/124 패리티 완료 (status 토큰 12개 통합 제거)
- 테마 런타임: CSS 변수 + bootstrap script + media query fallback 구현 완료
- cssVarColors + cssVarShadow: 자동생성 파이프라인 완료
- **24개 전체 웹 컴포넌트: CSS var 마이그레이션 완료** (13 exported + 11 internal)
- Foundation tokens: opacity, borderWidth, component sizing 추가 완료
- 품질 게이트: raw-colors lint + token parity + WCAG contrast 자동 검사
- Do/Don't 사용 가이드 페이지 완성
- RN 컴포넌트: 변경 없음 (hex 기반 유지)

## 토큰 파이프라인 (현재 아키텍처)
```
public/palette.json ─────────────────────┐
public/semantic-tokens.json ─────────────┤
public/effects-tokens.json ──────────────┤
public/shadow-tokens.json ───────────────┤
                                         ▼
scripts/generate-color-css.mjs ──→ src/app/generated-color-tokens.css
scripts/generate-colors-ts.mjs ──→ packages/design-system/src/tokens/colors.ts
                                   ├─ palette (원시값)
                                   ├─ colors (light hex)
                                   ├─ darkColors (dark hex)
                                   └─ cssVarColors (CSS var strings)
scripts/generate-shadow-ts.mjs ──→ packages/design-system/src/tokens/shadow.ts
                                   ├─ shadow (light values)
                                   ├─ darkShadow (dark values)
                                   └─ cssVarShadow (CSS var strings)
scripts/generate-foundation-css.mjs ──→ src/app/generated-foundation-tokens.css
```

**웹 컴포넌트**: `cssVarColors.*` + `cssVarShadow.*` 사용 (테마 자동 전환)
**RN 컴포넌트**: `colors.*` / `darkColors.*` + `shadow.*` / `darkShadow.*` 사용 (JS 기반 테마 전환)
**수동 토큰**: typography, spacing, radius, opacity, borderWidth (테마 독립)

## 지금 당장 할 일 (우선순위)
1. **WCAG 대비 개선 (디자이너 협의 필요)**
   - 13개 WARN 쌍 중 우선순위: dark mode onSolid (orange.60/teal.60/green.60)
   - status 뱃지 light mode (teal.50/teal.95 등)
   - palette 변경 수반 → 디자이너와 색상 조정 협의
2. **ThemeProvider 컨텍스트 구현**
   - 현재 CSS var + inline script만 있음, React context 레벨 테마 관리 필요
   - 테마 토글 UI 컴포넌트
3. **문서 사이트 완성도**
   - 컴포넌트 문서 페이지 내용 보강 (props, variants, examples)
   - Interaction 페이지 콘텐츠 추가

## 보류/후속
- 다크 시멘틱 토큰 세부 튜닝(실 UI 적용 후)
- forced-colors 모드 대응 (접근성)
- IconButton usePressable 훅 리팩토링 (LOW)
- Thumbnail radius prop 네이밍 정리 (LOW)

## 색상 토큰 규칙 (운영 기준)
- 표기 포맷: **HSLA 기준**
- 네이밍: `disabled` 사용 (`disable` 금지)
- 상태 텍스트:
  - `default`: 일반 상태 텍스트
  - `strong`: 라이트 배경에서 가독성 보강이 필요한 본문/핵심 라벨
- `content.base.disabled`는 호환 목적(Deprecated)로만 유지, 신규 사용 금지
- disabled 텍스트는 `content.disabled.default` 우선 사용

## 빠른 체크 명령어
```bash
# 빌드 검증 (토큰 생성 + raw color lint + parity/contrast lint + next build)
npm run build

# 토큰 품질 게이트만 실행
npm run check:tokens       # 패리티(blocking) + WCAG 대비(warn-only) — 124/124 expected
npm run check:raw-colors   # hex 리터럴 잔존 검사

# 웹 컴포넌트 hex 잔여 확인
rg -n "colors\." --glob "*.tsx" --glob "!*.native.tsx" packages/design-system/src/components/

# 색상 관련 잔존 키 점검
rg -n "\bdisable\b|content\.base\.disable|interaction\.disable|--content-base-disable|--interaction-disable" \
  packages/design-system/src/tokens/colors.ts src/app/globals.css packages src
```

## 주의사항
- 현재 워크트리는 이미 변경 파일이 많다. 작업 시 타 변경분을 되돌리지 않는다.
- 토큰 변경 시 `public/*.json`과 `packages/design-system/src/tokens/*.ts`를 항상 함께 확인한다.
