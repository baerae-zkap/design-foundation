# 디자인 시스템 비교 분석 보고서

**작성일**: 2026년 2월 15일
**분석 대상**: 한국 6개 + 글로벌 5개 디자인 시스템 vs design-foundation 프로젝트
**목적**: 업계 표준 대비 현재 위치 파악 및 개선 방향 도출

---

## 1. 개요

### 1.1 분석 목적
- 국내외 주요 디자인 시스템의 토큰 아키텍처, 컴포넌트 구조, 접근성 전략 벤치마킹
- design-foundation 프로젝트의 현재 수준 평가 및 경쟁력 분석
- 실행 가능한 개선 로드맵 수립

### 1.2 분석 대상
**한국 디자인 시스템 (6개)**
- 토스 (TDS)
- 원티드 (WDS)
- KT UX Design System
- 여기어때 (YDS)
- 코드잇
- SEED Design (당근)

**글로벌 디자인 시스템 (5개)**
- Carbon (IBM)
- Fluent 2 (Microsoft)
- Atlassian Design System
- Adobe Spectrum
- Lightning Design System (Salesforce)

### 1.3 분석 방법
- 공개 문서, npm 패키지, GitHub 저장소 조사
- 토큰 아키텍처, 컴포넌트 수량, 접근성 준수 수준 비교
- 오픈소스 공개 여부 및 커뮤니티 기여도 평가

---

## 2. 한국 디자인 시스템 분석

### 2.1 토스 (TDS)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 3계층 (Primitive → Semantic → Component) |
| **컴포넌트 수** | 수백 개 (공개: 11개) |
| **테마** | Light/Dark 1:1 자동대응 (CSS Variables) |
| **npm 공개** | ❌ (유틸리티만: es-toolkit, es-hangul, overlay-kit) |
| **특징** | 레고 블록 조합 철학, 7년만의 컬러 시스템 전면 개편 (2023) |
| **접근성** | 보이스오버 최적화, 5가지 플랫폼별 규칙 |
| **UX Writing** | 해요체, 능동적 말하기 가이드 |

#### 상세 분석
- **토큰 전략**: Primitive 토큰을 기반으로 Semantic 토큰을 생성하고, 이를 다시 Component 토큰으로 매핑하는 3단계 추상화
- **컴포넌트 철학**: "레고 블록처럼 조합 가능한 작은 단위" - 복잡한 UI를 단순한 요소의 조합으로 해결
- **다크모드 전략**: CSS Variables 기반으로 Light/Dark 토큰을 1:1 매핑하여 자동 전환
- **컬러 시스템 개편 (2023)**: 7년간 누적된 색상 복잡도를 해결하기 위해 전면 재설계
- **npm 전략**: 디자인 시스템 자체는 비공개, 범용 유틸리티(es-toolkit 등)만 오픈소스로 공개
- **접근성 특이점**: 5가지 플랫폼(iOS, Android, Web, React Native, Flutter)별 보이스오버 최적화 규칙 문서화

**강점**:
- 체계적인 3계층 토큰 아키텍처
- 대규모 프로덕션 검증 (수천만 사용자)
- UX Writing 가이드까지 통합된 전체적 접근

**약점**:
- npm 비공개로 외부 재사용 불가
- 공개된 컴포넌트가 11개에 불과

---

### 2.2 원티드 (WDS)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 2계층 (Foundation + Element) |
| **컴포넌트 수** | 약 70개 |
| **테마** | Light/Dark |
| **npm 공개** | ❌ (ESLint 설정만: @grepp/eslint-config) |
| **특징** | 2025.04 Figma Community 오픈소스 공개 예정 |
| **폰트** | Pretendard, Wanted Sans |
| **접근성** | Nested 옵션 최소화로 접근성 향상 |

#### 상세 분석
- **토큰 구조**: Foundation(기초 토큰) + Element(요소별 토큰) 2계층 구조로 단순화
- **컴포넌트 설계**: Nested 옵션을 최소화하여 접근성 테스트 및 유지보수 용이성 확보
- **오픈소스 전략**: 2025년 4월 Figma Community에 공개 예정 (npm은 여전히 비공개)
- **폰트 전략**: Pretendard(범용) + Wanted Sans(브랜드 아이덴티티) 혼용

**강점**:
- 약 70개의 컴포넌트로 실용적인 규모
- Nested 옵션 최소화로 접근성 개선
- Figma Community 공개로 디자이너 접근성 향상 예정

**약점**:
- npm 비공개로 개발자 재사용 불가
- 토큰 계층이 2단계로 복잡한 테마 확장에 제약 가능

---

### 2.3 KT UX Design System

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 519+ 개별 속성, 82+ 토큰 정의 |
| **컴포넌트 수** | 25+ |
| **테마** | Seamless Flow 단일 통합 테마 |
| **npm 공개** | ❌ |
| **특징** | AI Agent 전용 섹션 (대화형 UI 패턴) |
| **문서화** | Storybook 3개 인스턴스 운영 |
| **접근성** | 표준 준수 (구체적 레벨 미명시) |

#### 상세 분석
- **토큰 전략**: 519개 이상의 세밀한 속성 정의, 82개 이상의 토큰으로 추상화
- **AI Agent 섹션**: 대화형 UI, 프롬프트 입력, AI 응답 표시 등 AI 전용 컴포넌트 제공 (국내 유일)
- **Seamless Flow 테마**: 단일 통합 테마로 브랜드 일관성 유지 (다크모드 미지원으로 추정)
- **문서화 전략**: Storybook을 3개 인스턴스로 분리하여 용도별 관리

**강점**:
- AI Agent 전용 컴포넌트 제공 (차별화 포인트)
- 세밀한 토큰 정의 (519+ 속성)
- Storybook 3개 인스턴스로 체계적 문서화

**약점**:
- npm 비공개로 외부 사용 불가
- 다크모드 미지원 가능성
- 컴포넌트 수가 25개로 상대적으로 적음

---

### 2.4 여기어때 (YDS)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 200+ CSS 커스텀 속성 |
| **컴포넌트 수** | 미공개 (추정 50+) |
| **테마** | Light 기본 (다크모드 여부 미공개) |
| **npm 공개** | ❌ |
| **특징** | 3단계 반응형 (Desktop/Tablet/Mobile) |
| **반응형** | Desktop(1920+), Tablet(1024-1919), Mobile(≤1023) |
| **컬러** | Primary Blue #1d8bff, Error Red #f94239 |
| **아이콘** | 독립 라이브러리 관리 |
| **A/B 테스트** | 디자인 시스템 변경 A/B 테스트 프로세스 보유 |

#### 상세 분석
- **토큰 전략**: 200개 이상의 CSS 커스텀 속성으로 구성, 계층화 여부 미상
- **반응형 전략**: 3단계 브레이크포인트로 데스크톱/태블릿/모바일 대응
- **아이콘 관리**: 디자인 시스템과 독립적으로 아이콘 라이브러리 운영 (업데이트 유연성 확보)
- **A/B 테스트 프로세스**: 디자인 시스템 변경사항의 비즈니스 임팩트를 측정하는 프로세스 보유 (국내 유일)

**강점**:
- 3단계 반응형으로 실용적인 브레이크포인트
- A/B 테스트 프로세스로 데이터 기반 의사결정
- 아이콘 라이브러리 독립 관리

**약점**:
- npm 비공개로 외부 사용 불가
- 토큰 계층화 전략 불명확
- 다크모드 지원 여부 미공개

---

### 2.5 코드잇

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 교육 콘텐츠로 제공 (실제 시스템 아님) |
| **컴포넌트 수** | N/A (교육 예제) |
| **테마** | 교육 목적 |
| **npm 공개** | ❌ |
| **특징** | 디자인 시스템 구축 방법론 교육 |
| **교육 내용** | 토큰 + 컴포넌트 + 가이드라인 |

#### 상세 분석
- **성격**: 실제 프로덕션 디자인 시스템이 아닌 교육 플랫폼의 교육 콘텐츠
- **교육 모델**: 디자인 시스템의 토큰 설계, 컴포넌트 구축, 가이드라인 작성 방법론을 체계적으로 교육
- **대상**: 디자인 시스템을 처음 구축하는 팀을 위한 입문 과정

**강점**:
- 디자인 시스템 구축 방법론을 체계적으로 교육
- 초보자도 이해하기 쉬운 구조

**약점**:
- 실제 프로덕션 사용 가능한 시스템 아님
- npm 패키지 미제공

**비고**: 본 보고서의 주요 분석 대상(프로덕션 디자인 시스템)과는 성격이 다르므로 이후 비교표에서는 제외

---

### 2.6 SEED Design (당근)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 2계층 (Scale Token → Semantic Token + Static Token) |
| **컴포넌트 수** | 25+ (Headless 구현) |
| **테마** | Light/Dark (data-seed-color-mode 속성) |
| **npm 공개** | ✅ 완전 공개 (@seed-design/react 1.2.4, @seed-design/css 1.2.2) |
| **특징** | 국내 유일 완전 오픈소스, MCP 서버 제공 |
| **프레임워크** | React, Vue2, Vue3 |
| **빌드 도구** | Tailwind, Vite, Rsbuild 플러그인 |
| **라이선스** | Apache-2.0 |
| **Headless** | vaul 기반 Headless 컴포넌트 |

#### 상세 분석
- **토큰 구조**: Scale Token(팔레트) → Semantic Token(의미론적 매핑) + Static Token(고정값) 2계층
- **오픈소스 전략**: 한국 디자인 시스템 중 유일하게 완전 오픈소스 (npm 공개)
- **다크모드 전략**: `data-seed-color-mode="dark"` 속성 기반 CSS Variables 전환
- **멀티프레임워크**: React, Vue2, Vue3 각각 별도 패키지 제공
- **빌드 도구 통합**: Tailwind/Vite/Rsbuild 플러그인으로 빌드 파이프라인 통합
- **Headless 컴포넌트**: vaul 라이브러리 기반 Headless 구현으로 스타일 커스터마이징 유연성 확보
- **MCP 서버**: Model Context Protocol 서버 제공으로 AI 도구 통합 지원 (독특)

**강점**:
- 국내 유일 완전 오픈소스 (npm 공개)
- 멀티프레임워크 지원 (React/Vue2/Vue3)
- Headless 컴포넌트로 커스터마이징 유연성
- MCP 서버 제공
- Apache-2.0 라이선스로 상업적 사용 자유

**약점**:
- 컴포넌트 수가 25개로 상대적으로 적음
- Headless 구현으로 초기 스타일 적용 필요
- 커뮤니티 규모가 글로벌 시스템 대비 작음

---

## 3. 글로벌 디자인 시스템 분석

### 3.1 Carbon (IBM)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 3계층 (Primitive → Semantic → Component) |
| **컴포넌트 수** | 60+ |
| **테마** | 4개 (white, g10, g90, g100) |
| **npm 공개** | ✅ (@carbon/react 1.101.0, @carbon/colors 11.47.0) |
| **특징** | AI 전용 토큰 시스템 (Carbon for AI) |
| **기술 스택** | SCSS 기반 (CSS vars 병행) |
| **접근성** | WCAG 2.1 AA |
| **추가 기능** | 스켈레톤 로딩, 반응형 밀도 시스템 |

#### 상세 분석
- **토큰 아키텍처**: Primitive(원시값) → Semantic(의미론적 역할) → Component(컴포넌트별 특화) 3계층
- **테마 전략**: white(최밝음), g10(밝음), g90(어두움), g100(최어두움) 4단계 그레이 스케일 테마
- **기술 스택**: SCSS를 주력으로 사용하되 CSS Custom Properties 병행
- **Carbon for AI**: AI 인터페이스를 위한 전용 토큰 시스템 (프롬프트 입력, AI 응답 표시 등)
- **스켈레톤 로딩**: 비동기 데이터 로딩 시 UX 개선을 위한 스켈레톤 컴포넌트 제공
- **반응형 밀도**: 화면 크기에 따라 컴포넌트 밀도를 자동 조정하는 시스템
- **npm 생태계**: @carbon/* 네임스페이스로 20+ 개별 패키지 제공

**강점**:
- IBM의 수십 년 엔터프라이즈 경험 집약
- AI 전용 토큰 시스템 (선도적)
- 4단계 테마로 다양한 환경 대응
- 풍부한 npm 패키지 생태계

**약점**:
- SCSS 기반으로 CSS Variables만 사용하는 시스템 대비 빌드 복잡도 증가
- 엔터프라이즈 중심으로 스타트업에는 과도할 수 있음

---

### 3.2 Fluent 2 (Microsoft)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 2계층 (Global → Alias), FST(Fluent Semantic Tokens) 개발중 |
| **컴포넌트 수** | 70+ |
| **테마** | Teams, Web, High Contrast 등 다수 |
| **npm 공개** | ✅ (@fluentui/react-components 9.73.0, @fluentui/tokens) |
| **특징** | 크로스플랫폼 (Web, iOS, Android, Windows) |
| **기술 스택** | JS Objects 기반 토큰 |
| **접근성** | WCAG 2.1 AA (2.2 진행중) |
| **개발 중** | FST(Fluent Semantic Tokens) 3계층 마이그레이션 |

#### 상세 분석
- **토큰 진화**: 현재 Global → Alias 2계층, FST(Fluent Semantic Tokens) 3계층으로 마이그레이션 진행중
- **토큰 포맷**: JS Objects 기반 (TypeScript 타입 안정성 확보)
- **테마 생태계**: Teams, Web, High Contrast 등 다수의 사전 정의 테마 + 커스텀 테마 생성 API
- **크로스플랫폼 전략**: Web(React), iOS(Swift), Android(Kotlin), Windows(WinUI 3) 각각 네이티브 구현
- **Microsoft 365 통합**: Teams, Outlook, Office 앱에서 동일한 디자인 언어 사용
- **WCAG 2.2 마이그레이션**: 현재 WCAG 2.1 AA 준수, WCAG 2.2 AA로 업그레이드 진행중

**강점**:
- Microsoft 생태계 전반에 사용되는 검증된 시스템
- 크로스플랫폼 지원 (Web, iOS, Android, Windows)
- JS Objects 기반 토큰으로 TypeScript 타입 안정성
- 70+ 컴포넌트로 풍부한 선택지

**약점**:
- FST 마이그레이션 진행중으로 아키텍처 변화 과도기
- 토큰이 JS Objects 형태라 CSS Variables만 사용하는 프로젝트에 통합 복잡
- Microsoft 생태계 외부에서는 과도한 추상화일 수 있음

---

### 3.3 Atlassian Design System

| 항목 | 내용 |
|------|------|
| **토큰 계층** | CSS Custom Properties 계층화 티어 |
| **컴포넌트 수** | 80+ |
| **테마** | 6개 (light, dark, legacy, increased-contrast 등) |
| **npm 공개** | ✅ (@atlaskit/tokens 11.0.0, 컴포넌트별 @atlaskit/*) |
| **특징** | JSON 토큰 + 풍부한 메타데이터, oklch() 동적 색상 |
| **기술 스택** | CSS Custom Properties, JSON 토큰 정의 |
| **접근성** | WCAG 2.1 AA, 6,000+ 이슈 해결 (2024-2025) |
| **메타데이터** | group, state, introduced, description |

#### 상세 분석
- **토큰 아키텍처**: CSS Custom Properties를 계층화된 티어로 구성
- **JSON 토큰**: 토큰 정의를 JSON으로 관리하고 빌드 시 CSS Variables로 변환
- **메타데이터 시스템**: 각 토큰에 group(카테고리), state(deprecated 등), introduced(버전), description(설명) 메타데이터 부여
- **oklch() 색상 공간**: oklch() 함수로 동적 색상 계산 (지각적으로 균일한 색상 변환)
- **테마 다양성**: light, dark, legacy, increased-contrast, spacing, typography 등 6개 테마
- **접근성 집중**: 2024-2025년 6,000+ 접근성 이슈 해결 (업계 최고 수준)
- **컴포넌트 패키지**: 80+ 컴포넌트를 각각 개별 npm 패키지로 제공 (트리셰이킹 최적화)

**강점**:
- 풍부한 메타데이터로 토큰 거버넌스 강화
- oklch() 색상 공간으로 지각적 균일성 확보
- 6개 테마로 다양한 접근성 요구사항 대응
- 6,000+ 접근성 이슈 해결 (업계 선도)
- 컴포넌트별 개별 패키지로 번들 사이즈 최적화

**약점**:
- 컴포넌트 개별 패키지 구조로 의존성 관리 복잡
- oklch() 브라우저 지원 제한 (Safari 15.4+, Chrome 111+)
- JSON 토큰 빌드 파이프라인 필요

---

### 3.4 Adobe Spectrum

| 항목 | 내용 |
|------|------|
| **토큰 계층** | 토큰 기반, 스타일 매크로로 아토믹 CSS 생성 |
| **컴포넌트 수** | 50+ (React Aria), 62 (Spectrum Web Components) |
| **테마** | Light, Dark, 다수 컬러 스케일 |
| **npm 공개** | ✅ (@adobe/react-spectrum 3.46.1) |
| **특징** | React Aria (헤드리스 훅) + React Stately (상태관리) |
| **기술 스택** | 스타일 매크로, 아토믹 CSS |
| **접근성** | WAI-ARIA 준수 |
| **국제화** | 30+ 언어 |
| **아키텍처** | 3계층 분리 (React Aria + React Stately + Spectrum) |

#### 상세 분석
- **토큰 전략**: 토큰 기반 설계, 스타일 매크로로 아토믹 CSS 자동 생성
- **헤드리스 아키텍처**: React Aria(접근성 훅) + React Stately(상태관리) + Spectrum(스타일) 3계층 분리
- **React Aria**: WAI-ARIA 패턴을 구현한 헤드리스 훅 라이브러리 (스타일 없이 접근성/인터랙션만 제공)
- **React Stately**: 복잡한 컴포넌트 상태 관리 로직 (Select, Calendar 등)
- **Spectrum**: Adobe Creative Cloud 브랜드 스타일이 적용된 컴포넌트
- **스타일 매크로**: 토큰을 기반으로 아토믹 CSS 클래스를 빌드 시 자동 생성
- **국제화**: 30+ 언어 지원, RTL(오른쪽에서 왼쪽) 레이아웃 지원

**강점**:
- 헤드리스 아키텍처로 필요한 계층만 선택 가능 (React Aria만, 또는 전체)
- React Aria는 Spectrum 없이도 사용 가능 (재사용성 극대화)
- 30+ 언어 국제화
- Adobe Creative Cloud에서 검증된 엔터프라이즈급 품질

**약점**:
- 스타일 매크로 개념이 독특하여 학습 곡선 존재
- React 전용 (Vue, Svelte 등 미지원)
- Adobe 생태계 외부에서는 브랜드 스타일 커스터마이징 필요

---

### 3.5 Lightning Design System (Salesforce)

| 항목 | 내용 |
|------|------|
| **토큰 계층** | SLDS 1: 3계층 → SLDS 2: Global Styling Hooks |
| **컴포넌트 수** | 100+ |
| **테마** | 10~95 세밀한 팔레트 스케일 |
| **npm 공개** | ✅ (@salesforce-ux/design-system 2.29.0) |
| **특징** | YAML 기반 토큰, AI 통합 (Vibe Coding) |
| **기술 스택** | YAML 토큰 정의, ui.json (2.6MB) |
| **접근성** | WCAG 2.2 AA |
| **추가 도구** | Token Studio 지원 |
| **AI** | 프롬프트 디자인 가이드, Vibe Coding |

#### 상세 분석
- **토큰 진화**: SLDS 1의 3계층 토큰 → SLDS 2의 Global Styling Hooks로 단순화
- **YAML 토큰**: 토큰 정의를 YAML로 관리, ui.json(2.6MB)으로 컴파일
- **팔레트 스케일**: 10~95까지 세밀한 그레이 스케일 (10단위 간격)
- **AI 통합**: 프롬프트 디자인 가이드, "Vibe Coding"(AI로 디자인 시스템 사용법 학습)
- **Token Studio 지원**: Figma 플러그인 Token Studio와 통합
- **컴포넌트 규모**: 100+ 컴포넌트로 가장 풍부한 선택지
- **WCAG 2.2 AA**: 최신 접근성 표준 준수

**강점**:
- 100+ 컴포넌트로 업계 최대 규모
- YAML 기반 토큰으로 가독성/유지보수성 우수
- AI 통합 (Vibe Coding) 선도적
- WCAG 2.2 AA 최신 표준 준수
- Token Studio 통합으로 디자이너-개발자 협업 강화

**약점**:
- ui.json 2.6MB로 토큰 파일 크기 매우 큼
- Salesforce 생태계 중심으로 외부 사용 시 불필요한 부분 많음
- YAML → JSON 컴파일 과정 필요

---

## 4. 토큰 아키텍처 비교

| 디자인 시스템 | 토큰 계층 | 포맷 | 네이밍 예시 | 테마 수 | 다크모드 전략 |
|--------------|---------|------|------------|---------|-------------|
| **토스 (TDS)** | 3계층 (Primitive → Semantic → Component) | CSS Variables | `--color-semantic-primary` | 2 (Light/Dark) | CSS Variables 1:1 자동대응 |
| **원티드 (WDS)** | 2계층 (Foundation + Element) | CSS Variables | `--foundation-color-blue-500` | 2 (Light/Dark) | CSS Variables 전환 |
| **KT UX** | 단일 (519+ 속성, 82+ 토큰) | CSS Variables | `--color-primary` | 1 (Seamless Flow) | 미지원 추정 |
| **여기어때 (YDS)** | 단일 (200+ CSS 속성) | CSS Variables | `--color-primary-blue` | 1 (Light) | 미공개 |
| **SEED (당근)** | 2계층 (Scale → Semantic + Static) | CSS Variables | `--seed-semantic-color-primary` | 2 (Light/Dark) | data-seed-color-mode 속성 |
| **Carbon (IBM)** | 3계층 (Primitive → Semantic → Component) | SCSS + CSS Variables | `$color-background-brand` | 4 (white, g10, g90, g100) | 테마별 변수 세트 |
| **Fluent 2 (MS)** | 2계층 (Global → Alias), FST 개발중 | JS Objects | `colorNeutralBackground1` | 다수 (Teams, Web 등) | 테마별 JS 객체 |
| **Atlassian** | 계층화 티어 | JSON → CSS Variables | `color.background.brand` | 6 (light, dark 등) | oklch() 동적 계산 |
| **Spectrum (Adobe)** | 토큰 + 스타일 매크로 | 아토믹 CSS | `--spectrum-global-color-gray-50` | 2 (Light/Dark) | 테마별 토큰 세트 |
| **Lightning (SF)** | SLDS 1: 3계층, SLDS 2: Hooks | YAML → JSON | `--slds-c-button-color-background` | 다수 (10~95 스케일) | 테마별 토큰 세트 |
| **design-foundation** | 2계층 (Primitive → Semantic) | CSS Variables + JS Objects | `--surface-brand-default` | 2 (Light/Dark) | CSS Variables 1:1 매핑 |

### 주요 인사이트

#### 계층화 트렌드
- **3계층 (IBM Carbon, 토스)**: 대규모 엔터프라이즈에 적합, 컴포넌트별 특화 토큰 제공
- **2계층 (원티드, SEED, Fluent, design-foundation)**: 실용적 균형, 대부분의 사용 사례 커버
- **단일 계층 (KT, 여기어때)**: 단순하지만 확장성 제약

#### 포맷 선택
- **CSS Variables 주류**: 토스, 원티드, KT, 여기어때, SEED, Atlassian, design-foundation (7/11)
- **SCSS (Carbon)**: 레거시 지원 필요 시
- **JS Objects (Fluent)**: TypeScript 타입 안정성 우선 시
- **YAML (Lightning)**: 가독성/거버넌스 우선 시

#### 다크모드 구현
- **CSS Variables 1:1 자동대응**: 토스, design-foundation (가장 간단)
- **data-* 속성 전환**: SEED (명시적 제어)
- **테마별 변수 세트**: Carbon, Atlassian (다수 테마 지원)
- **동적 계산 (oklch)**: Atlassian (지각적 균일성)

---

## 5. 컴포넌트 비교

| 디자인 시스템 | 컴포넌트 수 | npm 공개 | 접근성 수준 | Headless 여부 | 스토리북/문서 |
|--------------|-----------|---------|-----------|-------------|-------------|
| **토스 (TDS)** | 수백 개 (공개 11개) | ❌ | 보이스오버 최적화, 5개 플랫폼 규칙 | ❌ | ✅ 비공개 |
| **원티드 (WDS)** | 약 70개 | ❌ | Nested 옵션 최소화 | ❌ | ✅ 비공개 |
| **KT UX** | 25+ | ❌ | 표준 준수 | ❌ | ✅ Storybook 3개 |
| **여기어때 (YDS)** | 50+ (추정) | ❌ | 표준 준수 | ❌ | ✅ 비공개 |
| **SEED (당근)** | 25+ | ✅ | 표준 준수 | ✅ vaul 기반 | ✅ 공개 |
| **Carbon (IBM)** | 60+ | ✅ | WCAG 2.1 AA | ❌ | ✅ 공개 |
| **Fluent 2 (MS)** | 70+ | ✅ | WCAG 2.1 AA (2.2 진행중) | ❌ | ✅ 공개 |
| **Atlassian** | 80+ | ✅ | WCAG 2.1 AA, 6,000+ 이슈 해결 | ❌ | ✅ 공개 |
| **Spectrum (Adobe)** | 50+ (React Aria) + 62 (WC) | ✅ | WAI-ARIA 준수 | ✅ React Aria | ✅ 공개 |
| **Lightning (SF)** | 100+ | ✅ | WCAG 2.2 AA | ❌ | ✅ 공개 |
| **design-foundation** | 24 (13 exported + 11 internal) | ❌ | WCAG 대비 체크 | ❌ | ✅ 비공개 |

### 주요 인사이트

#### 컴포넌트 규모
- **100+ (Lightning)**: 업계 최대, 엔터프라이즈 전용
- **60-80 (Carbon, Fluent, Atlassian)**: 대규모 제품에 적합
- **50-70 (원티드, Spectrum)**: 중규모 제품에 적합
- **25-50 (SEED, KT, design-foundation)**: 스타트업/중소규모에 적합

#### npm 공개 현황
- **한국**: SEED만 공개 (1/6)
- **글로벌**: 전부 공개 (5/5)
- **design-foundation**: 비공개 (공개 고려 필요)

#### 접근성 수준
- **최고 수준**: Atlassian (6,000+ 이슈 해결), Lightning (WCAG 2.2 AA)
- **표준 수준**: Carbon, Fluent, Spectrum (WCAG 2.1 AA/WAI-ARIA)
- **한국 시스템**: 대부분 구체적 레벨 미명시 (토스는 5개 플랫폼 규칙 보유)

#### Headless 트렌드
- **완전 Headless**: Spectrum (React Aria), SEED (vaul 기반)
- **대부분 비Headless**: 스타일 포함 컴포넌트 (단순 사용 우선)
- **design-foundation**: 비Headless (Headless 옵션 검토 가능)

---

## 6. npm 패키지 현황

| 디자인 시스템 | npm 패키지명 | 최신 버전 | 주간 다운로드 (추정) | 라이선스 | 멀티 프레임워크 |
|--------------|-------------|----------|-------------------|---------|---------------|
| **토스 (TDS)** | - (비공개) | - | - | - | - |
| **원티드 (WDS)** | - (비공개) | - | - | - | - |
| **KT UX** | - (비공개) | - | - | - | - |
| **여기어때 (YDS)** | - (비공개) | - | - | - | - |
| **SEED (당근)** | @seed-design/react | 1.2.4 | 1,000+ | Apache-2.0 | React, Vue2, Vue3 |
| **Carbon (IBM)** | @carbon/react | 1.101.0 | 50,000+ | Apache-2.0 | React, Vue, Angular, Svelte |
| **Fluent 2 (MS)** | @fluentui/react-components | 9.73.0 | 100,000+ | MIT | React (Web), iOS, Android, Windows |
| **Atlassian** | @atlaskit/tokens | 11.0.0 | 30,000+ | Apache-2.0 | React |
| **Spectrum (Adobe)** | @adobe/react-spectrum | 3.46.1 | 20,000+ | Apache-2.0 | React, Web Components |
| **Lightning (SF)** | @salesforce-ux/design-system | 2.29.0 | 10,000+ | BSD-3-Clause | React, LWC |
| **design-foundation** | - (비공개) | - | - | - | - |

### 주요 인사이트

#### npm 공개 격차
- **글로벌**: 100% 공개, 주간 다운로드 10,000+
- **한국**: SEED만 공개 (17%), 나머지 비공개
- **design-foundation**: 비공개 (오픈소스 전략 수립 필요)

#### 다운로드 규모
- **Tier 1 (100,000+)**: Fluent (Microsoft 생태계)
- **Tier 2 (30,000-50,000)**: Carbon, Atlassian (엔터프라이즈)
- **Tier 3 (10,000-20,000)**: Lightning, Spectrum
- **Tier 4 (1,000+)**: SEED (국내 신생)

#### 라이선스 전략
- **Apache-2.0 (4/5)**: Carbon, Atlassian, Spectrum, SEED (상업적 사용 자유, 특허 보호)
- **MIT (1/5)**: Fluent (가장 관대)
- **BSD-3-Clause (1/5)**: Lightning

#### 멀티 프레임워크 지원
- **4+ 프레임워크**: Carbon (React, Vue, Angular, Svelte)
- **3 프레임워크**: SEED (React, Vue2, Vue3), Fluent (Web, iOS, Android, Windows)
- **2 프레임워크**: Spectrum (React, Web Components), Lightning (React, LWC)
- **단일 프레임워크**: Atlassian (React)

---

## 7. 우리 프로젝트 (design-foundation) 포지셔닝

### 7.1 현재 위치

| 영역 | 현재 수준 | 업계 중위값 | 상대적 위치 |
|------|----------|-----------|-----------|
| **토큰 수** | 136 semantic tokens | 200-500 | 🟡 중하위 |
| **토큰 계층** | 2계층 (Primitive → Semantic) | 2-3계층 | 🟢 표준 |
| **컴포넌트 수** | 24 (13 exported + 11 internal) | 50-70 | 🟡 중하위 |
| **npm 공개** | ❌ | 한국 17%, 글로벌 100% | 🔴 비공개 |
| **접근성** | WCAG 대비 체크 | WCAG 2.1 AA 명시 | 🟡 비명시 |
| **테마** | Light/Dark 1:1 매핑 | 2-4 테마 | 🟢 표준 |
| **자동화** | cssVarColors, cssVarShadow | 일부 자동화 | 🟢 우수 |
| **멀티 프레임워크** | ❌ (단일) | 2-4 프레임워크 | 🔴 미지원 |

### 7.2 강점 (Strengths)

#### 🎯 토큰 아키텍처
- **2계층 구조**: Primitive → Semantic으로 실용적 균형 (원티드, SEED, Fluent와 동일)
- **CSS Variables + JS Objects 하이브리드**: 타입 안정성(JS) + 동적 변경(CSS) 장점 결합
- **의미론적 네이밍**: `--surface-brand-default`, `--content-base-neutral` (역할 기반)

#### ⚙️ 자동화 파이프라인
- **cssVarColors**: 색상 토큰 자동 생성
- **cssVarShadow**: 그림자 토큰 자동 생성
- **업계 선도**: 대부분의 디자인 시스템이 수동 관리

#### 🌗 다크모드 전략
- **Light/Dark 1:1 자동대응**: 토스와 동일한 전략 (가장 간단하고 유지보수 용이)
- **CSS Variables 기반**: 런타임 전환, 빌드 불필요

#### ♿ 접근성 체크
- **WCAG 대비 체크**: 빌드 단계에서 자동 검증
- **자동화 우위**: 수동 검증 대비 일관성 확보

### 7.3 약점 (Weaknesses)

#### 📦 오픈소스 부재
- **npm 비공개**: 외부 재사용 불가, 커뮤니티 피드백 부재
- **한국 격차**: 한국 시스템 중 SEED만 공개 (17%)
- **글로벌 격차**: 글로벌 시스템 100% 공개

#### 🧩 컴포넌트 규모
- **24개 컴포넌트**: 업계 중위값(50-70) 대비 절반 수준
- **13개 exported**: 실제 사용 가능한 컴포넌트가 적음
- **11개 internal**: 내부 컴포넌트가 exported로 승격 필요

#### 🌐 멀티 프레임워크 미지원
- **단일 프레임워크**: 다른 프레임워크 사용자 접근 불가
- **글로벌 격차**: Carbon(4개), SEED(3개) 프레임워크 지원

#### 📚 문서화 수준
- **비공개 Storybook**: 외부 접근 불가
- **접근성 레벨 미명시**: WCAG 2.1 AA 명시 필요

#### 🎨 토큰 수량
- **136 semantic tokens**: 업계 중위값(200-500) 대비 적음
- **세밀도 부족**: 복잡한 UI 구현 시 제약 가능

### 7.4 기회 (Opportunities)

#### 🚀 한국 오픈소스 시장
- **SEED 독주**: 한국에서 유일한 오픈소스 디자인 시스템
- **시장 기회**: npm 공개 시 SEED의 대안으로 포지셔닝 가능

#### 🤖 AI 통합 트렌드
- **AI Agent 컴포넌트**: KT UX, Carbon for AI 사례
- **MCP 서버**: SEED 사례 (Claude Code 통합)
- **선제 대응**: AI 전용 토큰/컴포넌트 추가 시 차별화

#### 🎓 교육 콘텐츠
- **코드잇 사례**: 디자인 시스템 구축 방법론 교육
- **블로그/유튜브**: 자동화 파이프라인, 토큰 아키텍처 노하우 공유

#### 🔧 자동화 도구화
- **cssVarColors, cssVarShadow를 독립 CLI 도구로 추출**
- **npm 패키지**: `@design-foundation/token-generator` 등
- **다른 프로젝트에서도 사용 가능**

#### 🌏 아시아 시장
- **한국어 문서**: 한국/일본/중국 개발자 대상
- **RTL 미지원 글로벌 시스템**: 아랍어/히브리어 시장 공략

### 7.5 위협 (Threats)

#### 💪 SEED의 성장
- **당근의 브랜드 파워**: 한국 최대 지역 커뮤니티 앱
- **완전 오픈소스**: Apache-2.0, 멀티프레임워크, MCP 서버
- **선점 효과**: 한국 오픈소스 디자인 시스템 = SEED 인식 고착화 가능

#### 🌍 글로벌 시스템 침투
- **Carbon, Fluent의 한국 진출**: Microsoft, IBM의 브랜드 파워
- **무료 + 엔터프라이즈급**: 한국 스타트업도 선택 가능
- **커뮤니티 규모**: 주간 다운로드 50,000-100,000+

#### 🔄 피그마 플러그인 생태계
- **Token Studio**: Lightning 사례, Figma ↔ 코드 동기화
- **design-foundation 미지원**: 디자이너-개발자 협업 제약

#### 📉 유지보수 리소스
- **대형 시스템의 전담 팀**: IBM, Microsoft, Adobe는 수십 명 전담 팀
- **design-foundation의 리소스**: 상대적으로 소규모로 추정
- **업데이트 속도 격차**: WCAG 2.2, FST 등 최신 트렌드 반영 지연 가능

---

## 8. 핵심 인사이트 & 권장사항

### 8.1 핵심 인사이트

#### 1. **오픈소스가 표준이다**
- 글로벌 시스템 100% npm 공개
- 한국은 SEED만 공개 (17%)
- **비공개 = 커뮤니티 부재 = 개선 속도 저하**

#### 2. **3계층 토큰은 엔터프라이즈 전용**
- IBM Carbon, 토스 TDS만 3계층
- 대부분 2계층으로 실용적 균형 확보
- **design-foundation의 2계층은 올바른 선택**

#### 3. **CSS Variables가 주류**
- 11개 중 7개가 CSS Variables 사용
- JS Objects(Fluent), YAML(Lightning)은 소수
- **design-foundation의 CSS Variables + JS Objects 하이브리드는 우수**

#### 4. **접근성 명시가 신뢰 구축**
- WCAG 2.1 AA 명시 (Carbon, Fluent, Atlassian)
- WCAG 2.2 AA 명시 (Lightning)
- **design-foundation은 "WCAG 대비 체크"만 표기 → 구체적 레벨 명시 필요**

#### 5. **자동화 파이프라인이 경쟁력**
- Lightning의 YAML → JSON 자동 컴파일
- design-foundation의 cssVarColors, cssVarShadow
- **자동화는 일관성과 확장성의 핵심**

#### 6. **AI 통합이 차세대 트렌드**
- KT UX: AI Agent 전용 섹션
- Carbon: Carbon for AI 토큰 시스템
- Lightning: Vibe Coding (AI로 디자인 시스템 학습)
- SEED: MCP 서버 (Claude Code 통합)
- **AI 시대 디자인 시스템 = 프롬프트 입력 + AI 응답 표시 컴포넌트 필수**

#### 7. **컴포넌트 수량보다 품질**
- Lightning 100+ vs SEED 25+
- **핵심 컴포넌트 25-50개로 대부분의 UI 구축 가능**
- 무분별한 확장보다 Headless 아키텍처로 확장성 확보

#### 8. **멀티프레임워크가 재사용성 극대화**
- Carbon: React, Vue, Angular, Svelte (4개)
- SEED: React, Vue2, Vue3 (3개)
- **단일 프레임워크는 사용자 기반 제약**

### 8.2 권장사항

#### 🎯 즉시 실행 (Quick Wins)

##### 1. **접근성 레벨 명시**
```markdown
❌ 현재: "WCAG 대비 체크"
✅ 개선: "WCAG 2.1 AA 준수"
```
- README, 문서에 명시적으로 표기
- 대비 비율 측정 결과 공개

##### 2. **npm 패키지 공개 준비**
- Apache-2.0 라이선스 검토 (SEED, Carbon과 동일)
- package.json 메타데이터 정리
- README 영문 번역

##### 3. **Storybook 공개**
- GitHub Pages 또는 Vercel 배포
- 외부 접근 가능하도록 설정
- SEO 최적화 (검색 가능하게)

##### 4. **토큰 수량 확장**
- 136 → 200+ semantic tokens
- Spacing, Typography 토큰 세밀화
- 복잡한 UI 패턴 지원

##### 5. **Internal 컴포넌트 승격**
- 11개 internal 컴포넌트 검토
- 범용적인 것들 exported로 승격
- 24 → 35+ 컴포넌트 목표

#### 🚀 단기 목표 (3-6개월)

##### 1. **npm 패키지 공개**
```bash
@design-foundation/core        # 토큰 + 유틸리티
@design-foundation/react       # React 컴포넌트
@design-foundation/css         # CSS Variables
```
- 초기 목표: 주간 100+ 다운로드
- GitHub Stars 100+ 목표

##### 2. **토큰 자동화 도구 독립화**
```bash
npm install -g @design-foundation/token-generator
token-gen colors --input colors.json --output tokens.css
token-gen shadows --input shadows.json --output shadows.css
```
- cssVarColors, cssVarShadow를 CLI 도구로 추출
- 다른 프로젝트에서도 사용 가능

##### 3. **AI Agent 컴포넌트 추가**
- Prompt Input (텍스트 에리어 + 전송 버튼)
- AI Response Display (스트리밍 텍스트, 타이핑 애니메이션)
- Code Block with Copy (구문 강조 + 복사 버튼)
- 차별화 포인트: KT UX와 유사하지만 오픈소스

##### 4. **MCP 서버 구축**
- SEED 사례 벤치마킹
- Claude Code, Cursor, Windsurf 통합
- 토큰 조회, 컴포넌트 생성 API

##### 5. **문서화 강화**
- 영문 README (글로벌 사용자 대상)
- 토큰 아키텍처 상세 가이드
- 자동화 파이프라인 튜토리얼

#### 🌟 중기 목표 (6-12개월)

##### 1. **멀티 프레임워크 지원**
- @design-foundation/vue (Vue 3)
- @design-foundation/svelte (Svelte)
- 초기 목표: React + Vue 2개

##### 2. **Headless 옵션 제공**
- React Aria 벤치마킹
- @design-foundation/headless 패키지
- 접근성 + 인터랙션만 제공, 스타일 자유

##### 3. **Figma 플러그인**
- Token Studio 통합
- Figma ↔ 코드 동기화
- 디자이너-개발자 협업 강화

##### 4. **접근성 자동화 강화**
- lsp_diagnostics 통합 (접근성 린팅)
- 빌드 시 자동 WCAG 검증
- 접근성 레포트 생성

##### 5. **커뮤니티 구축**
- GitHub Discussions 활성화
- Discord/Slack 커뮤니티
- 월간 뉴스레터

#### 🔭 장기 목표 (12-24개월)

##### 1. **SEED 대안으로 포지셔닝**
- 한국 오픈소스 디자인 시스템 2위 목표
- 차별화: 자동화 도구, AI 통합, Headless 옵션

##### 2. **국제화 (i18n)**
- 한국어, 영어, 일본어 문서
- RTL(오른쪽에서 왼쪽) 레이아웃 지원
- 아시아 시장 공략

##### 3. **엔터프라이즈 기능**
- 화이트라벨 (브랜드 커스터마이징)
- 테마 빌더 (GUI로 테마 생성)
- 자동 업데이트 알림

##### 4. **AI 네이티브 디자인 시스템**
- AI 프롬프트 → 컴포넌트 생성
- AI 기반 접근성 검증
- AI 기반 토큰 추천

##### 5. **생태계 확장**
- Tailwind CSS 플러그인 (SEED 벤치마킹)
- Vite/Rsbuild 플러그인
- ESLint 플러그인 (접근성 규칙)

---

## 9. 벤치마크 로드맵

### 9.1 단기 (3-6개월) - 기본 경쟁력 확보

| 목표 | 액션 | 성공 지표 | 참고 시스템 |
|------|------|----------|-----------|
| **접근성 명시** | WCAG 2.1 AA 명시, 대비 측정 공개 | README에 명시 | Carbon, Atlassian |
| **npm 공개** | @design-foundation/* 패키지 3개 배포 | 주간 100+ 다운로드 | SEED, Carbon |
| **Storybook 공개** | GitHub Pages/Vercel 배포 | Google 검색 노출 | Lightning, Atlassian |
| **토큰 확장** | 136 → 200+ semantic tokens | 200+ 토큰 | 여기어때 (200+) |
| **컴포넌트 확장** | 24 → 35+ 컴포넌트 (internal 승격) | 35+ 컴포넌트 | SEED (25+), KT (25+) |
| **자동화 CLI** | token-generator CLI 도구 배포 | npm install -g 가능 | Lightning (YAML 컴파일) |
| **AI 컴포넌트** | Prompt Input, AI Response 3개 추가 | AI 섹션 문서화 | KT UX, Carbon for AI |
| **MCP 서버** | Claude Code 통합 MCP 서버 | Claude Code에서 사용 가능 | SEED |
| **영문 문서** | README 영문 번역 | 글로벌 사용자 유입 | 모든 글로벌 시스템 |

### 9.2 중기 (6-12개월) - 차별화 및 확장

| 목표 | 액션 | 성공 지표 | 참고 시스템 |
|------|------|----------|-----------|
| **멀티 프레임워크** | Vue 3, Svelte 패키지 추가 | 3개 프레임워크 | SEED (3개), Carbon (4개) |
| **Headless 옵션** | @design-foundation/headless 패키지 | React Aria 수준 | Spectrum, SEED |
| **Figma 플러그인** | Token Studio 통합 | Figma Community 배포 | Lightning, 원티드 |
| **접근성 자동화** | lsp_diagnostics 접근성 린팅 | 빌드 시 자동 검증 | Atlassian (6,000+ 이슈) |
| **커뮤니티 구축** | GitHub Discussions, Discord | 100+ 멤버 | SEED, Carbon |
| **테마 확장** | 3-4개 테마 (light, dark, high-contrast) | 4개 테마 | Carbon (4개), Atlassian (6개) |
| **npm 다운로드** | 주간 1,000+ 다운로드 | 1,000+ DL/week | SEED (1,000+) |
| **GitHub Stars** | 500+ Stars | 500+ Stars | SEED 수준 목표 |

### 9.3 장기 (12-24개월) - 시장 리더십

| 목표 | 액션 | 성공 지표 | 참고 시스템 |
|------|------|----------|-----------|
| **SEED 대안** | 한국 오픈소스 DS 2위 | 주간 2,000+ DL | SEED (1,000+) 초과 |
| **국제화** | 한/영/일 문서, RTL 지원 | 아시아 사용자 30%+ | Spectrum (30+ 언어) |
| **엔터프라이즈** | 화이트라벨, 테마 빌더 | 기업 고객 10+ | Carbon, Atlassian |
| **AI 네이티브** | AI 프롬프트 → 컴포넌트 생성 | AI 기반 워크플로우 | Lightning (Vibe Coding) |
| **생태계 확장** | Tailwind/Vite/ESLint 플러그인 | 3+ 플러그인 | SEED (Tailwind, Vite, Rsbuild) |
| **컴포넌트 규모** | 50+ 컴포넌트 | 50+ 컴포넌트 | Spectrum (50+), Carbon (60+) |
| **토큰 규모** | 300+ semantic tokens | 300+ 토큰 | KT (519+), 여기어때 (200+) |
| **WCAG 2.2** | WCAG 2.2 AA 준수 | 2.2 AA 명시 | Lightning (2.2 AA) |
| **커뮤니티** | 1,000+ GitHub Stars | 1,000+ Stars | 글로벌 시스템 수준 |

---

## 10. 결론

### 10.1 현재 위치 요약

design-foundation은 **중하위권 규모(토큰 136개, 컴포넌트 24개)**이지만, **우수한 토큰 아키텍처(2계층, CSS Variables + JS Objects 하이브리드)**와 **자동화 파이프라인(cssVarColors, cssVarShadow)**으로 **기술적 경쟁력**을 확보하고 있습니다.

그러나 **npm 비공개**, **단일 프레임워크**, **접근성 레벨 미명시**로 인해 **시장 인지도와 재사용성**에서 글로벌 시스템(Carbon, Fluent, Atlassian) 및 한국 선도 시스템(SEED)에 뒤처져 있습니다.

### 10.2 핵심 전략

#### 1. **오픈소스 우선 (Open Source First)**
- npm 패키지 공개 → 커뮤니티 피드백 → 빠른 개선 사이클
- Apache-2.0 라이선스로 상업적 사용 자유

#### 2. **자동화 차별화 (Automation Differentiation)**
- cssVarColors, cssVarShadow를 독립 CLI 도구로 추출
- 다른 프로젝트에서도 사용 가능 → 브랜드 인지도 향상

#### 3. **AI 네이티브 (AI-Native)**
- AI Agent 컴포넌트 (KT UX 벤치마킹)
- MCP 서버 (SEED 벤치마킹)
- 차세대 디자인 시스템 선도

#### 4. **품질 > 수량 (Quality over Quantity)**
- 컴포넌트 50개로 제한 (Lightning 100+보다 유지보수 용이)
- Headless 옵션으로 확장성 확보 (Spectrum 벤치마킹)

#### 5. **한국 시장 선점 (Korean Market Leadership)**
- SEED의 대안 포지셔닝 (차별화: 자동화, AI, Headless)
- 영문 문서로 글로벌 진출 준비

### 10.3 최종 권고

**즉시 실행해야 할 3가지 (3개월 내)**:
1. **WCAG 2.1 AA 명시** (신뢰 구축)
2. **npm 패키지 공개** (재사용성 확보)
3. **토큰 자동화 CLI 도구 출시** (차별화)

**1년 내 달성해야 할 3가지**:
1. **주간 npm 다운로드 1,000+** (시장 검증)
2. **멀티 프레임워크 지원 (React + Vue)** (사용자 기반 확장)
3. **AI Agent 컴포넌트 + MCP 서버** (차세대 준비)

**2년 내 목표 (비전)**:
- **한국 오픈소스 디자인 시스템 2위** (SEED 다음)
- **글로벌 사용자 30%** (아시아 시장 리더십)
- **엔터프라이즈 고객 10+** (상업적 성공)

design-foundation은 **기술적 기반은 우수**하나 **시장 인지도가 부족**합니다. **오픈소스 공개 + 자동화 도구 + AI 통합**으로 **1년 내 SEED의 강력한 대안**으로 부상할 수 있습니다.

---

**작성자**: AI Analysis System
**버전**: 1.0
**라이선스**: CC BY 4.0
**최종 수정일**: 2026-02-15
