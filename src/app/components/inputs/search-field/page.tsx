"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { typography, spacing, radius, SearchField } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Page ─────────────────────────────────────────────────────────────

export default function SearchFieldPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Search Field" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Search Field
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        검색 전용 입력 필드입니다. 내장 검색 아이콘과 지우기 버튼을 제공합니다.
      </p>

      {/* Interactive Playground */}
      <SearchFieldPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function SearchFieldPlayground() {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const generateCode = () => {
    const props: string[] = [];
    props.push(`value={query}`);
    props.push(`onChange={setQuery}`);
    props.push(`placeholder="검색"`);
    if (disabled) props.push("disabled");
    if (showLabel) props.push('label="검색"');

    const propsStr = `\n  ${props.join("\n  ")}\n`;
    return `<SearchField${propsStr}/>`;
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          {/* Preview Area */}
          <div
            style={{
              padding: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <div style={{ width: "100%", maxWidth: 300 }}>
              <SearchField
                placeholder="검색"
                value={value}
                onChange={setValue}
                disabled={disabled}
                label={showLabel ? "검색" : undefined}
              />
            </div>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: spacing.primitive[4],
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: spacing.primitive[6],
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[7],
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.lg,
              }}
            >
              <RadioGroup
                label="Label"
                options={[
                  { value: "false", label: "Hide" },
                  { value: "true", label: "Show" },
                ]}
                value={showLabel ? "true" : "false"}
                onChange={(v) => setShowLabel(v === "true")}
              />
              <RadioGroup
                label="Disabled"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={disabled ? "true" : "false"}
                onChange={(v) => setDisabled(v === "true")}
              />
              <div>
                <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-secondary)", margin: `0 0 ${spacing.primitive[2]}px` }}>Value</p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-tertiary)", margin: 0 }}>
                  {value ? `"${value}"` : "(empty — type in preview)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: spacing.primitive[4],
            fontSize: typography.fontSize.compact,
            lineHeight: 1.7,
            color: "var(--docs-code-text)",
            backgroundColor: "var(--docs-code-surface)",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            overflow: "auto",
          }}
        >
          <code>{highlightCode(generateCode())}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Platform Content ────────────────────────────────────────────────

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// ─── Design Content ──────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>SearchField</InlineCode>는 검색 전용 입력 필드입니다. 내장 검색 아이콘과 지우기(X) 버튼을
          제공하여 일반 <InlineCode>TextField</InlineCode>와 시각적으로 구별됩니다. 검색 이외의 일반 텍스트
          입력에는 <InlineCode>TextField</InlineCode>를 사용하세요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="480" height="120" viewBox="0 0 480 120">
            {/* Optional label */}
            <text x="100" y="22" fill="var(--content-base-secondary)" fontSize={12}>label (optional)</text>

            {/* Container */}
            <rect x="100" y="34" width="280" height="44" rx="8" fill="var(--surface-base-default)" stroke="var(--border-base-default)" strokeWidth="1.5" />

            {/* Search icon */}
            <circle cx="125" cy="56" r="7" fill="none" stroke="var(--content-base-secondary)" strokeWidth="1.5" />
            <line x1="130" y1="61" x2="135" y2="66" stroke="var(--content-base-secondary)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Placeholder text */}
            <text x="147" y="61" fill="var(--content-base-placeholder)" fontSize={13}>검색어를 입력하세요</text>

            {/* Clear button */}
            <circle cx="360" cy="56" r="9" fill="var(--fill-base-default)" />
            <line x1="356" y1="52" x2="364" y2="60" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="364" y1="52" x2="356" y2="60" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

            {/* Callout: 1 Label */}
            <line x1="60" y1="22" x2="98" y2="22" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="98" cy="22" r="3" fill="var(--content-base-default)" />
            <circle cx="45" cy="22" r="14" fill="var(--content-base-default)" />
            <text x="45" y="27" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">1</text>

            {/* Callout: 2 Container */}
            <line x1="60" y1="56" x2="98" y2="56" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="98" cy="56" r="3" fill="var(--content-base-default)" />
            <circle cx="45" cy="56" r="14" fill="var(--content-base-default)" />
            <text x="45" y="61" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">2</text>

            {/* Callout: 3 Search icon */}
            <line x1="125" y1="34" x2="125" y2="16" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="125" cy="34" r="3" fill="var(--content-base-default)" />
            <circle cx="125" cy="9" r="14" fill="var(--content-base-default)" />
            <text x="125" y="14" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">3</text>

            {/* Callout: 4 Input area */}
            <line x1="240" y1="34" x2="240" y2="16" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="240" cy="34" r="3" fill="var(--content-base-default)" />
            <circle cx="240" cy="9" r="14" fill="var(--content-base-default)" />
            <text x="240" y="14" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">4</text>

            {/* Callout: 5 Clear button */}
            <line x1="360" y1="78" x2="360" y2="96" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="360" cy="78" r="3" fill="var(--content-base-default)" />
            <circle cx="360" cy="106" r="14" fill="var(--content-base-default)" />
            <text x="360" y="111" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">5</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: spacing.primitive[3],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Label (optional)</div>
          <div style={{ textAlign: "center" }}>2. Container</div>
          <div style={{ textAlign: "right" }}>3. Search icon</div>
          <div>4. Input area</div>
          <div style={{ textAlign: "center" }}>5. Clear (X) button</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Default (empty)">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <SearchField placeholder="검색어를 입력하세요" />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="With value (clear button visible)">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <SearchField placeholder="검색어를 입력하세요" value="디자인 시스템" onChange={() => {}} />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Disabled">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <SearchField placeholder="검색어를 입력하세요" disabled />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
        }}>
          <StatePreview label="Default" sublabel="기본 상태">
            <MiniSearchField borderColor="var(--border-base-default)" />
          </StatePreview>
          <StatePreview label="Focused" sublabel="포커스">
            <MiniSearchField borderColor="var(--border-brand-default)" />
          </StatePreview>
          <StatePreview label="Filled" sublabel="입력값 있음">
            <MiniSearchField borderColor="var(--border-base-default)" hasClear />
          </StatePreview>
          <StatePreview label="Disabled" sublabel="비활성화">
            <MiniSearchField borderColor="var(--border-base-default)" disabled />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            SearchField는 포커스 시 보더 색상이 브랜드 컬러로 전환됩니다. 값이 있을 때만 지우기 버튼이 나타납니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <InteractionCard label="Default" sublabel="기본" borderColor="var(--border-base-default)" bg="var(--surface-base-default)" />
            <InteractionCard label="Focused" sublabel="포커스" borderColor="var(--border-brand-default)" bg="var(--surface-base-default)" />
            <InteractionCard label="Filled" sublabel="값 있음" borderColor="var(--border-base-default)" bg="var(--surface-base-default)" hasClear />
            <InteractionCard label="Disabled" sublabel="비활성화" borderColor="var(--border-base-default)" bg="var(--surface-base-alternative)" opacity={0.5} />
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SearchField는 <strong style={{ color: "var(--text-primary)" }}>검색 전용</strong> 컴포넌트입니다.
          검색 외의 일반 텍스트 입력에는 TextField를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ fontSize: typography.fontSize.sm }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 500 }}>검색 기능에 SearchField 사용</p>
                    <div style={{ padding: "8px 12px", border: "1.5px solid var(--border-base-default)", borderRadius: 8, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                      <span style={{ fontSize: 13, color: "var(--content-base-placeholder)" }}>검색</span>
                    </div>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ fontSize: typography.fontSize.sm }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 500 }}>일반 TextField로 검색 구현</p>
                    <div style={{ padding: "8px 12px", border: "1.5px solid var(--border-base-default)", borderRadius: 8, backgroundColor: "var(--surface-base-default)" }}>
                      <span style={{ fontSize: 13, color: "var(--content-base-placeholder)" }}>검색어 입력...</span>
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 검색 UI에는 항상 SearchField를 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> TextField로 검색 기능을 직접 구현하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ fontSize: typography.fontSize.sm }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 500 }}>의미있는 placeholder 제공</p>
                    <code style={{ fontSize: 12, color: "var(--content-brand-default)", backgroundColor: "var(--surface-brand-secondary)", padding: "2px 6px", borderRadius: 4 }}>placeholder="상품명 검색"</code>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ fontSize: typography.fontSize.sm }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 500 }}>필터 드롭다운 대체</p>
                    <p style={{ fontSize: 12, color: "var(--content-error-default)", margin: 0 }}>검색이 아닌 옵션 선택에는 Select를 사용하세요</p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 검색 대상을 명확히 나타내는 placeholder를 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 필터/드롭다운 역할에 SearchField를 사용하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SearchField 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Color 토큰">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}><td style={tdStyle}>Default border</td><td style={tdStyle}><InlineCode>border.base.default</InlineCode></td><td style={tdMono}>var(--border-base-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Focused border</td><td style={tdStyle}><InlineCode>border.brand.default</InlineCode></td><td style={tdMono}>var(--border-brand-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Background</td><td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td><td style={tdMono}>var(--surface-base-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Disabled background</td><td style={tdStyle}><InlineCode>surface.base.alternative</InlineCode></td><td style={tdMono}>var(--surface-base-alternative)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Input text</td><td style={tdStyle}><InlineCode>content.base.default</InlineCode></td><td style={tdMono}>var(--content-base-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Placeholder / icon</td><td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td><td style={tdMono}>var(--content-base-secondary)</td></tr>
                <tr><td style={tdStyle}>Clear button</td><td style={tdStyle}><InlineCode>fill.base.default</InlineCode></td><td style={tdMono}>var(--fill-base-default)</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Spacing &amp; Shape">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}><td style={tdStyle}>Border radius</td><td style={tdStyle}><InlineCode>radius.component.input.default</InlineCode></td><td style={tdMono}>8px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Border width</td><td style={tdStyle}><InlineCode>borderWidth.medium</InlineCode></td><td style={tdMono}>1.5px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Icon size</td><td style={tdStyle}>—</td><td style={tdMono}>16px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Icon left padding</td><td style={tdStyle}><InlineCode>spacing.primitive[3]</InlineCode></td><td style={tdMono}>12px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Vertical padding</td><td style={tdStyle}><InlineCode>spacing.primitive[3]</InlineCode></td><td style={tdMono}>12px</td></tr>
                <tr><td style={tdStyle}>Transition</td><td style={tdStyle}><InlineCode>transitions.all</InlineCode></td><td style={tdMono}>border-color 200ms ease-out</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SearchField는 <InlineCode>type=&quot;search&quot;</InlineCode> 네이티브 input을 사용하여 브라우저 및 스크린 리더 접근성을 보장합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>속성</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}><td style={tdStyle}><InlineCode>type=&quot;search&quot;</InlineCode></td><td style={tdMono}>브라우저 네이티브 검색 시맨틱 부여</td></tr>
              <tr style={trBorder}><td style={tdStyle}><InlineCode>aria-label</InlineCode></td><td style={tdMono}>label prop이 없을 때 placeholder를 aria-label로 자동 적용</td></tr>
              <tr style={trBorder}><td style={tdStyle}><InlineCode>role=&quot;search&quot;</InlineCode></td><td style={tdMono}>SearchField를 감싸는 form/wrapper에 추가 권장</td></tr>
              <tr><td style={tdStyle}><InlineCode>aria-label=&quot;검색어 지우기&quot;</InlineCode></td><td style={tdMono}>X 버튼에 명시적 aria-label 필수</td></tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>키</th>
                  <th style={thStyle}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>Tab</kbd></td><td style={tdMono}>SearchField로 포커스 이동</td></tr>
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>Escape</kbd></td><td style={tdMono}>검색어 지우기 (value 초기화 권장)</td></tr>
                <tr><td style={tdStyle}><kbd style={kbdStyle}>Enter</kbd></td><td style={tdMono}>검색 실행 (onSubmit 핸들러 연결)</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="명시적 지우기 버튼 레이블"
              desc="X 아이콘만으로는 스크린 리더가 동작을 알 수 없습니다. aria-label='검색어 지우기'를 반드시 제공하세요."
            />
            <PrincipleCard
              number={2}
              title="role='search' 래퍼 사용"
              desc="SearchField를 감싸는 컨테이너에 role='search'를 추가하면 랜드마크로 인식되어 스크린 리더 사용자가 빠르게 검색 영역으로 이동할 수 있습니다."
            />
            <PrincipleCard
              number={3}
              title="Escape 키 처리"
              desc="사용자가 Escape를 눌렀을 때 검색어를 초기화하면 키보드 사용자 경험이 크게 향상됩니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>컴포넌트</th>
                <th style={thStyle}>용도</th>
                <th style={thStyle}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>TextField</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>일반 단일 행 텍스트 입력</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>검색 아이콘·지우기 버튼 없음</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Select</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>드롭다운 옵션 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>자유 입력이 아닌 목록에서 선택</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>SearchField Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/SearchField/SearchField.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "white",
              backgroundColor: "var(--inverse-surface-default)",
              borderRadius: radius.primitive.md,
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </Section>

      {/* 2. Import */}
      <Section title="Import">
        <CodeBlock code={`import { SearchField } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <SearchField placeholder="검색" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<SearchField placeholder="검색" />`} />
      </Section>

      {/* 4. With Custom Placeholder */}
      <Section title="With Custom Placeholder">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <SearchField placeholder="상품명, 브랜드 검색" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<SearchField placeholder="상품명, 브랜드 검색" />`} />
      </Section>

      {/* 5. Controlled Example */}
      <Section title="Controlled Example">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <ControlledSearchDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`const [query, setQuery] = useState("");

<SearchField
  value={query}
  onChange={setQuery}
  placeholder="검색"
/>

{query && (
  <p>검색어: {query}</p>
)}`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "placeholder", type: "string", required: false, defaultVal: '"검색"', description: "빈 상태의 안내 텍스트" },
            { name: "value", type: "string", required: false, description: "제어 모드 값" },
            { name: "onChange", type: "(value: string) => void", required: false, description: "값 변경 콜백" },
            { name: "onClear", type: "() => void", required: false, description: "X 버튼 클릭 시 추가 콜백" },
            { name: "onSearch", type: "(value: string) => void", required: false, description: "Enter 키 / 검색 실행 콜백" },
            { name: "defaultValue", type: "string", required: false, description: "초기값 (비제어 모드)" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
            { name: "label", type: "string", required: false, description: "입력 위 레이블 (접근성 목적)" },
            { name: "aria-label", type: "string", required: false, description: "label 없을 때 접근성 레이블. 기본값은 placeholder" },
            { name: "onBlur", type: "React.FocusEventHandler<HTMLInputElement>", required: false, description: "포커스 해제 콜백" },
            { name: "id", type: "string", required: false, description: "커스텀 id (미지정 시 자동 생성)" },
            { name: "style", type: "React.CSSProperties", required: false, description: "추가 컨테이너 스타일" },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function ControlledSearchDemo() {
  const [query, setQuery] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
      <SearchField value={query} onChange={setQuery} placeholder="검색" />
      {query && (
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", margin: 0 }}>
          검색어: <strong style={{ color: "var(--content-base-default)" }}>{query}</strong>
        </p>
      )}
    </div>
  );
}

// ─── UI Helpers ───────────────────────────────────────────────────────

function StatePreview({ label, sublabel, children }: { label: string; sublabel: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4] }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 48 }}>
        {children}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

function MiniSearchField({ borderColor, disabled, hasClear }: { borderColor: string; disabled?: boolean; hasClear?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        backgroundColor: disabled ? "var(--surface-base-alternative)" : "var(--surface-base-default)",
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        opacity: disabled ? 0.5 : 1,
        boxSizing: "border-box" as const,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
      <span style={{ flex: 1, fontSize: 12, color: hasClear ? "var(--content-base-default)" : "var(--content-base-placeholder)" }}>
        {hasClear ? "디자인 시스템" : "검색"}
      </span>
      {hasClear && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>
      )}
    </div>
  );
}

function InteractionCard({ label, sublabel, borderColor, bg, opacity, hasClear }: {
  label: string; sublabel: string; borderColor: string; bg: string; opacity?: number; hasClear?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2], padding: spacing.primitive[3] }}>
      <div
        style={{
          width: "100%",
          height: 36,
          borderRadius: 8,
          border: `1.5px solid ${borderColor}`,
          backgroundColor: bg,
          opacity: opacity ?? 1,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 6,
          boxSizing: "border-box" as const,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        <div style={{ flex: 1, height: 2, backgroundColor: "var(--fill-base-default)", borderRadius: 1 }} />
        {hasClear && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)" }}>{sublabel}</div>
      </div>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  textAlign: "left" as const,
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.compact,
  borderBottom: "1px solid var(--divider)",
};

const tdStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
};

const tdMono: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontFamily: "monospace",
  color: "var(--text-secondary)",
};

const trBorder: React.CSSProperties = {
  borderBottom: "1px solid var(--divider)",
};

const kbdStyle: React.CSSProperties = {
  padding: "2px 6px",
  backgroundColor: "var(--surface-base-alternative)",
  borderRadius: radius.primitive.xs,
  fontSize: typography.fontSize.xs,
};
