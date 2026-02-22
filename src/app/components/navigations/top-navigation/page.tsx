"use client";

import { useState, useMemo, useEffect } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TopNavigation, IconButton, TextButton, Tab, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { TopNavigationVariant } from "@baerae-zkap/design-system";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { PlatformTabs, CodeBlock, PreviewBox, highlightCode, type Platform } from "@/components/PlatformTabs";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";

const TOOLBAR_TABS = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
  { label: "BNB", value: "bnb" },
];

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" /><path d="M6 6l12 12" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4" /><path d="M15.4 6.5l-6.8 4" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12v16l-6-4-6 4z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <div style={{
      width: 18, height: 18,
      border: "1.5px dashed var(--border-base-default)",
      borderRadius: radius.primitive.sm,
    }} />
  );
}

function Playground() {
  const [variant, setVariant] = useState<TopNavigationVariant>("normal");
  const [titleMode, setTitleMode] = useState("true");
  const [leadingMode, setLeadingMode] = useState("icon");
  const [trailingMode, setTrailingMode] = useState("icons");
  const [toolbarMode, setToolbarMode] = useState("none");
  const [tabValue, setTabValue] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSearch = variant === "search";
  const isDisplay = variant === "display";
  const isFloating = variant === "floating";

  // Derived controls visibility
  const showTitle    = !isSearch;
  const showLeading  = !isDisplay;
  const showTrailing = true;
  const showToolbar  = !isFloating;

  // Leading options differ by variant
  const leadingOptions = isSearch
    ? [{ value: "none", label: "none" }, { value: "icon", label: "icon" }, { value: "text", label: "취소" }]
    : [{ value: "none", label: "none" }, { value: "icon", label: "icon" }];

  // Trailing options differ by variant
  const trailingOptions = (isDisplay || isSearch)
    ? [{ value: "none", label: "none" }, { value: "icons", label: "icons" }, { value: "text", label: "text" }]
    : [{ value: "none", label: "none" }, { value: "icons", label: "icons" }];

  const ghostBtn = <IconButton variant="ghost" color="neutral" size="small" aria-label="leading"><PlaceholderIcon /></IconButton>;
  const textBtn = (label: string) => (
    <TextButton variant="clear" color="primary" size="medium">{label}</TextButton>
  );

  const leadingButton = useMemo(() => {
    if (isDisplay) return undefined;
    if (leadingMode === "text") return textBtn("취소");
    if (leadingMode === "icon") return ghostBtn;
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisplay, leadingMode]);

  const trailingButtons = useMemo(() => {
    if (trailingMode === "text") return textBtn("완료");
    if (trailingMode === "icons") return <IconButton variant="ghost" color="neutral" size="small" aria-label="a1"><PlaceholderIcon /></IconButton>;
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trailingMode]);

  const toolbar = useMemo(() => {
    if (toolbarMode !== "tabs" || isFloating) return undefined;
    return (
      <Tab items={TOOLBAR_TABS} value={tabValue} onChange={setTabValue} resize="fill" fixedPadding />
    );
  }, [tabValue, toolbarMode, isFloating]);

  const generatedCode = useMemo(() => {
    const lines: string[] = ["<TopNavigation"];
    if (variant !== "normal") lines.push(`  variant="${variant}"`);
    if (showTitle && titleMode === "true") lines.push('  title="Crypto Market"');
    if (leadingMode === "text") lines.push('  leadingButton={<span>취소</span>}');
    else if (leadingMode === "icon" && !isDisplay) lines.push('  leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="뒤로가기"><BackIcon /></IconButton>}');
    if (trailingMode === "text") lines.push('  trailingButtons={<span>완료</span>}');
    else if (trailingMode === "icons") lines.push('  trailingButtons={<IconButton variant="ghost" color="neutral" size="small" aria-label="더보기"><MoreIcon /></IconButton>}');
    if (showToolbar && toolbarMode === "tabs") lines.push('  toolbar={<Tab items={tabs} value={value} onChange={setValue} resize="fill" fixedPadding />}');
    lines.push("/>");
    return lines.join("\n");
  }, [variant, showTitle, titleMode, leadingMode, isDisplay, trailingMode, showToolbar, toolbarMode]);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 280px", height: isMobile ? "auto" : 480 }}>
          {/* Preview */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)", padding: isMobile ? `${spacing.primitive[8]}px ${spacing.primitive[4]}px` : 0 }}>
            <div style={{ width: "100%", maxWidth: 400, overflow: "hidden" }}>
              <TopNavigation
                variant={variant}
                title={showTitle && titleMode === "true" ? "Crypto Market" : undefined}
                leadingButton={leadingButton}
                trailingButtons={trailingButtons}
                toolbar={toolbar}
                fixed={false}
                pad
                scrollEffect="none"
              />
            </div>
          </div>

          {/* Controls */}
          <div style={{
            backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
            display: "flex",
            flexDirection: "column",
            padding: spacing.primitive[4],
            height: isMobile ? "auto" : "100%",
            maxHeight: isMobile ? 360 : undefined,
            boxSizing: "border-box",
            overflow: "hidden",
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              padding: spacing.primitive[6],
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: spacing.primitive[6],
              backgroundColor: "var(--surface-base-default)",
              borderRadius: radius.primitive.lg,
            }}>
              <RadioGroup
                label="Variants"
                value={variant}
                onChange={(v) => { setVariant(v as TopNavigationVariant); setLeadingMode("icon"); setTrailingMode("icons"); }}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "display", label: "Display" },
                  { value: "floating", label: "Floating" },
                  { value: "search", label: "Search" },
                ]}
              />
              {showTitle && (
                <RadioGroup
                  label="Title"
                  value={titleMode}
                  onChange={setTitleMode}
                  options={[
                    { value: "true", label: "true" },
                    { value: "false", label: "false" },
                  ]}
                />
              )}
              {showLeading && (
                <RadioGroup
                  label="Leading"
                  value={leadingMode}
                  onChange={setLeadingMode}
                  options={leadingOptions}
                />
              )}
              {showTrailing && (
                <RadioGroup
                  label="Trailing"
                  value={trailingMode}
                  onChange={setTrailingMode}
                  options={trailingOptions}
                />
              )}
              {showToolbar && (
                <RadioGroup
                  label="Toolbar"
                  value={toolbarMode}
                  onChange={setToolbarMode}
                  options={[
                    { value: "none", label: "none" },
                    { value: "tabs", label: "tabs" },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div style={{
          padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
          backgroundColor: "var(--docs-code-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generatedCode} />
        </div>
        <pre style={{
          margin: 0,
          padding: spacing.primitive[4],
          fontSize: typography.fontSize.compact,
          lineHeight: 1.7,
          color: "var(--docs-code-text)",
          backgroundColor: "var(--docs-code-surface)",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          overflow: "auto",
        }}>
          <code>{highlightCode(generatedCode)}</code>
        </pre>
      </div>
    </div>
  );
}

const props: PropItem[] = [
  { name: "variant", type: "'normal' | 'display' | 'floating' | 'search'", required: false, description: "바 스타일 변형 (기본값: 'normal')" },
  { name: "title", type: "string", required: false, description: "네비게이션 바 제목" },
  { name: "leadingButton", type: "ReactNode", required: false, description: "왼쪽 버튼 (뒤로가기, 닫기 등)" },
  { name: "trailingButtons", type: "ReactNode", required: false, description: "오른쪽 아이콘 버튼 영역" },
  { name: "toolbar", type: "ReactNode", required: false, description: "하단 슬롯 (Tab 등)" },
  { name: "fixed", type: "boolean", required: false, description: "position: fixed 적용 여부 (기본값: false)" },
  { name: "pad", type: "boolean", required: false, description: "좌우 수평 패딩 적용 여부 (기본값: false)" },
  { name: "scrollEffect", type: "'none' | 'floating' | 'overlay'", required: false, description: "스크롤 시 배경 전환 효과, fixed=true일 때만 적용 (기본값: 'none')" },
  { name: "searchPlaceholder", type: "string", required: false, description: "search variant의 검색창 placeholder 텍스트" },
  { name: "className", type: "string", required: false, description: "루트 컨테이너 커스텀 클래스" },
];

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

function WebContent() {
  const [tbValue, setTbValue] = useState("all");

  const importCode = `import { TopNavigation } from '@baerae-zkap/design-system';
import type { TopNavigationVariant, TopNavigationScrollEffect } from '@baerae-zkap/design-system';`;

  const basicCode = `<TopNavigation title="Crypto Market" />`;

  const leadingCode = `<TopNavigation
  title="상세 화면"
  leadingButton={
    <IconButton variant="ghost" color="neutral" size="small" aria-label="뒤로가기">
      <BackIcon />
    </IconButton>
  }
/>`;

  const trailingCode = `<TopNavigation
  title="기사 상세"
  trailingButtons={
    <>
      <IconButton variant="ghost" color="neutral" size="small" aria-label="공유"><ShareIcon /></IconButton>
      <IconButton variant="ghost" color="neutral" size="small" aria-label="북마크"><BookmarkIcon /></IconButton>
      <IconButton variant="ghost" color="neutral" size="small" aria-label="더보기"><MoreIcon /></IconButton>
    </>
  }
/>`;

  const toolbarCode = `const tabs = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
];

<TopNavigation
  title="거래소"
  pad
  toolbar={<Tab items={tabs} value={value} onChange={setValue} resize="fill" fixedPadding />}
/>`;

  const scrollCode = `// 기본 — 항상 배경 + 하단 보더
<TopNavigation fixed scrollEffect="none" title="기본" />

// floating — 스크롤 시 shadow 표시
<TopNavigation fixed scrollEffect="floating" title="리스트" />

// overlay — 스크롤 시 blur 배경
<TopNavigation fixed scrollEffect="overlay" title="피드" />`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/TopNavigation/TopNavigation.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          TopNavigation/TopNavigation.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={importCode} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <TopNavigation title="Crypto Market" />
          </div>
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="With Leading Button">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], width: 320 }}>
            <TopNavigation
              title="뒤로가기 타입"
              leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="뒤로가기"><BackIcon /></IconButton>}
            />
            <TopNavigation
              title="닫기 타입"
              leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="닫기"><CloseIcon /></IconButton>}
            />
          </div>
        </PreviewBox>
        <CodeBlock code={leadingCode} />
      </Section>

      <Section title="With Trailing Buttons">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <TopNavigation
              title="상세 화면"
              trailingButtons={
                <>
                  <IconButton variant="ghost" color="neutral" size="small" aria-label="공유"><ShareIcon /></IconButton>
                  <IconButton variant="ghost" color="neutral" size="small" aria-label="북마크"><BookmarkIcon /></IconButton>
                  <IconButton variant="ghost" color="neutral" size="small" aria-label="더보기"><MoreIcon /></IconButton>
                </>
              }
            />
          </div>
        </PreviewBox>
        <CodeBlock code={trailingCode} />
      </Section>

      <Section title="With Toolbar">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <TopNavigation
              title="거래소"
              pad
              toolbar={
                <div style={{ borderTop: "1px solid var(--border-base-default)" }}>
                  <Tab items={TOOLBAR_TABS} value={tbValue} onChange={setTbValue} resize="fill" fixedPadding />
                </div>
              }
            />
          </div>
        </PreviewBox>
        <CodeBlock code={toolbarCode} />
      </Section>

      <Section title="Scroll Effects">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], width: 320 }}>
            <div>
              <p style={{ ...descText, fontSize: typography.fontSize.compact, marginBottom: spacing.primitive[1] }}>none</p>
              <TopNavigation title="기본 상태" scrollEffect="none" />
            </div>
            <div>
              <p style={{ ...descText, fontSize: typography.fontSize.compact, marginBottom: spacing.primitive[1] }}>floating (scrolled)</p>
              <div style={{ backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-header-scrolled)" }}>
                <TopNavigation title="스크롤 후" scrollEffect="floating" />
              </div>
            </div>
            <div>
              <p style={{ ...descText, fontSize: typography.fontSize.compact, marginBottom: spacing.primitive[1] }}>overlay (scrolled)</p>
              <div style={{ backgroundColor: "var(--surface-base-default)", backdropFilter: "blur(12px)" }}>
                <TopNavigation title="스크롤 후" scrollEffect="overlay" />
              </div>
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={scrollCode} />
      </Section>

      <Section title="API Reference">
        <PropsTable props={props} />
      </Section>
    </div>
  );
}

function DesignContent() {
  const [tbValue, setTbValue] = useState("all");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>TopNavigation</InlineCode>은 화면 상단에 고정되는 앱 바입니다.
          뒤로가기/닫기 같은 선행 액션, 제목, 보조 액션, 하단 툴바를 하나의 구조로 제공해
          상단 내비게이션 패턴을 일관되게 구성합니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <TopNavigation
              title="Market Overview"
              leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="뒤로가기"><BackIcon /></IconButton>}
              trailingButtons={<IconButton variant="ghost" color="neutral" size="small" aria-label="더보기"><MoreIcon /></IconButton>}
              toolbar={
                <div style={{ borderTop: "1px solid var(--border-base-default)" }}>
                  <Tab items={TOOLBAR_TABS} value={tbValue} onChange={setTbValue} resize="fill" fixedPadding />
                </div>
              }
              pad
            />
          </div>
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[3] }}>
          {[
            ["1", "Leading", "뒤로가기/닫기 액션 슬롯"],
            ["2", "Title", "페이지 컨텍스트를 보여주는 중앙 제목"],
            ["3", "Trailing", "공유/북마크/메뉴 등의 보조 액션 슬롯"],
            ["4", "Toolbar", "필터/탭을 위한 하단 확장 슬롯"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)" }}> — {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Variants">
        <Subsection title="Leading Button">
          <p style={{ ...descText, marginBottom: spacing.primitive[3] }}>
            뒤로가기(<InlineCode>back</InlineCode>)와 닫기(<InlineCode>close</InlineCode>) 두 가지 패턴을 사용합니다.
            화면 전환 방식(push vs modal)에 따라 하나만 선택해 일관성을 유지하세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], width: 320 }}>
              <TopNavigation
                title="뒤로가기 타입"
                leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="뒤로가기"><BackIcon /></IconButton>}
              />
              <TopNavigation
                title="닫기 타입"
                leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="닫기"><CloseIcon /></IconButton>}
              />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Trailing Buttons">
          <p style={{ ...descText, marginBottom: spacing.primitive[3] }}>
            화면의 주요 보조 액션을 오른쪽에 배치합니다. 아이콘 버튼 1–3개가 적절하며,
            그 이상은 더보기(<InlineCode>…</InlineCode>) 버튼으로 그룹화하세요.
          </p>
          <PreviewBox>
            <div style={{ width: 320 }}>
              <TopNavigation
                title="상세 화면"
                trailingButtons={
                  <>
                    <IconButton variant="ghost" color="neutral" size="small" aria-label="공유"><ShareIcon /></IconButton>
                    <IconButton variant="ghost" color="neutral" size="small" aria-label="북마크"><BookmarkIcon /></IconButton>
                    <IconButton variant="ghost" color="neutral" size="small" aria-label="더보기"><MoreIcon /></IconButton>
                  </>
                }
              />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Toolbar">
          <p style={{ ...descText, marginBottom: spacing.primitive[3] }}>
            하단 슬롯에 <InlineCode>Tab</InlineCode> 같은 필터/탐색 UI를 추가합니다.
            <InlineCode>pad</InlineCode> 속성을 함께 사용하면 제목과 버튼 영역에 수평 패딩이 적용됩니다.
          </p>
          <PreviewBox>
            <div style={{ width: 320 }}>
              <TopNavigation
                title="거래소"
                pad
                toolbar={
                  <div style={{ borderTop: "1px solid var(--border-base-default)" }}>
                    <Tab items={TOOLBAR_TABS} value={tbValue} onChange={setTbValue} resize="fill" fixedPadding />
                  </div>
                }
              />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          상단 정보 구조는 단순하게 유지하고, 화면별 핵심 액션만 배치하세요.
          툴바를 사용할 때는 제목과 액션의 우선순위를 분리해 인지 부하를 줄이는 것이 좋습니다.
        </p>
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{ border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                  <TopNavigation
                    title="시장 뉴스"
                    leadingButton={<IconButton variant="ghost" color="neutral" size="small" aria-label="뒤로가기"><BackIcon /></IconButton>}
                    trailingButtons={<IconButton variant="ghost" color="neutral" size="small" aria-label="공유"><ShareIcon /></IconButton>}
                    toolbar={
                      <div style={{ borderTop: "1px solid var(--border-base-default)" }}>
                        <Tab items={TOOLBAR_TABS} value={tbValue} onChange={setTbValue} resize="fill" fixedPadding />
                      </div>
                    }
                    pad
                  />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  컨텍스트(제목)와 전환(탭)을 분리해 정보 구조를 명확하게 유지
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{ border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                  <TopNavigation
                    title="너무 긴 제목이 제목 자리와 액션을 동시에 침범하는 예시"
                    trailingButtons={
                      <>
                        <IconButton variant="ghost" color="neutral" size="small" aria-label="공유"><ShareIcon /></IconButton>
                        <IconButton variant="ghost" color="neutral" size="small" aria-label="북마크"><BookmarkIcon /></IconButton>
                        <IconButton variant="ghost" color="neutral" size="small" aria-label="더보기"><MoreIcon /></IconButton>
                      </>
                    }
                    pad
                  />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  과도한 텍스트/액션 밀집은 주요 컨텍스트 인지를 약화시킴
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="Leading 액션은 화면 문맥과 일치" desc="뒤로가기, 닫기 중 현재 화면 흐름에 맞는 단일 패턴을 선택하세요." />
            <PrincipleCard number={2} title="제목은 한 줄 기준으로 유지" desc="중앙 제목은 핵심 정보만 전달하고, 보조 정보는 본문/툴바로 분리하세요." />
            <PrincipleCard number={3} title="Scroll Effect는 화면 성격에 맞게 선택" desc="정보 밀도가 높은 리스트는 floating, 배경 맥락 유지가 중요하면 overlay를 권장합니다." />
          </div>
        </Subsection>
      </Section>

      <Section title="Design Tokens">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>CSS Variable</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--surface-base-default", "기본 배경 / overlay scrolled 배경"],
                ["--surface-base-alternative", "search variant 검색창 배경"],
                ["--content-base-default", "제목 텍스트"],
                ["--content-base-secondary", "search variant 검색 아이콘"],
                ["--content-base-placeholder", "search variant placeholder 텍스트"],
                ["--shadow-semantic-header-scrolled", "floating/floating-variant scrolled 그림자"],
              ].map(([token, usage], i, arr) => (
                <tr key={token}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", whiteSpace: "nowrap" }}>
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>Leading/Trailing 아이콘 버튼에는 목적이 드러나는 <InlineCode>aria-label</InlineCode>을 제공합니다.</li>
          <li>제목이 길어질 수 있으므로 줄바꿈 대신 ellipsis 처리로 레이아웃 안정성을 유지합니다.</li>
          <li>툴바에 탭을 결합하는 경우 키보드 탐색 순서가 자연스럽게 이어지도록 구성합니다.</li>
          <li><InlineCode>fixed</InlineCode> 모드에서는 본문 상단 여백을 확보해 콘텐츠가 가려지지 않게 해야 합니다.</li>
        </ul>
      </Section>

      <Section title="Related Components">
        <p style={descText}>
          하단 앱 탐색은 <InlineCode>BottomNavigation</InlineCode>, 상단 카테고리 스크롤 탐색은{" "}
          <InlineCode>CategoryNavigation</InlineCode>, 툴바 슬롯 구성에는 <InlineCode>Tab</InlineCode>을 함께 사용할 수 있습니다.
        </p>
      </Section>
    </div>
  );
}

export default function TopNavigationPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Top Navigation" },
        ]}
      />
      <h1 style={{
        fontSize: typography.fontSize["3xl"],
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.primitive[2],
        marginTop: spacing.primitive[4],
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
      }}>
        Top Navigation
      </h1>
      <p style={{
        fontSize: typography.fontSize.md,
        color: "var(--content-base-secondary)",
        lineHeight: 1.7,
        margin: 0,
        marginBottom: spacing.primitive[8],
      }}>
        화면 상단에 고정되는 앱 바 컴포넌트입니다. 뒤로가기, 페이지 제목, 보조 액션을 제공합니다.
      </p>
      <Playground />

      <div style={{ marginTop: spacing.primitive[10] }}>
        <PlatformTabs>
          {(platform: Platform) => (platform === "web" ? <WebContent /> : <DesignContent />)}
        </PlatformTabs>
      </div>
    </div>
  );
}
