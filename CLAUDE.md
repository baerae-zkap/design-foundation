# Design Foundation (Working Context)

## 프로젝트 목적
서비스에 적용 가능한 **Design Foundation + Component Library**를 운영한다.
현재는 토큰 품질과 문서 사이트 완성도를 높이는 단계다.

## 현재 스냅샷 (2026-02-13)
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

## 현재 상태 요약
- 색상 문서 페이지에서 Light/Dark 팔레트/시멘틱 비교는 가능
- 사이트 전체 다크모드(전역 테마 스위치)는 아직 미구현
- 다크 팔레트 v3.2는 준비됐고, 다크 시멘틱의 실제 UI 미세조정은 남아있음

## 지금 당장 할 일 (우선순위)
1. **시멘틱 strong 실제 사용처 반영**
   - strong 토큰이 필요한 본문/핵심 라벨 컴포넌트에 선택 적용
2. **문서 표기 정리 (HSLA 기준)**
   - 문서 내 HEX/구버전 설명 잔존 부분 정리
3. **토큰 검증 자동화 스크립트 추가**
   - 참조 무결성 + 대비 기준(본문 4.5:1, 대형 텍스트/아이콘 3.0:1)
4. **Next.js 사이트 품질 정리**
   - 컴포넌트 문서 페이지의 데모/토큰 표와 실제 구현 일치 검수

## 보류/후속
- 전역 다크모드 CSS 변수/테마 스위치 (`data-theme` 또는 `prefers-color-scheme`) 설계
- 다크 시멘틱 토큰 세부 튜닝(실 UI 적용 후)

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
# 빌드 검증
npm run build

# 색상 관련 잔존 키 점검
rg -n "\bdisable\b|content\.base\.disable|interaction\.disable|--content-base-disable|--interaction-disable" \
  packages/design-system/src/tokens/colors.ts src/app/globals.css packages src

# strong 토큰 반영 점검
rg -n "content\.warning\.strong|content\.success\.strong|content\.info\.strong|--content-warning-strong|--content-success-strong|--content-info-strong" \
  packages/design-system/src/tokens/colors.ts src/app/globals.css
```

## 주의사항
- 현재 워크트리는 이미 변경 파일이 많다. 작업 시 타 변경분을 되돌리지 않는다.
- 토큰 변경 시 `public/*.json`과 `packages/design-system/src/tokens/*.ts`를 항상 함께 확인한다.
