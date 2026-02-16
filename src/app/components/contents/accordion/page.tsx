"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Accordion } from '@baerae-zkap/design-system';
import { Section, Subsection } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// Types
type AccordionSize = "medium" | "large";

export default function AccordionPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Accordion" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Accordion
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        제목을 탭하여 콘텐츠를 접거나 펼칠 수 있는 컴포넌트입니다. 제한된 공간에서 많은 정보를 효과적으로 구성합니다.
      </p>

      {/* Interactive Playground */}
      <AccordionPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function AccordionPlayground() {
  const [size, setSize] = useState<AccordionSize>("medium");
  const [disabled, setDisabled] = useState(false);
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  const generateCode = () => {
    const props = [];
    props.push('title="Accordion Title"');
    if (size !== "medium") props.push(`size="${size}"`);
    if (defaultExpanded) props.push("defaultExpanded");
    if (disabled) props.push("disabled");

    const propsStr = props.join("\n  ");

    return `<Accordion
  ${propsStr}
  onChange={(expanded) => console.log(expanded)}
>
  <p>Accordion content goes here</p>
</Accordion>`;
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          borderRadius: 20,
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
            <div style={{ width: "100%", maxWidth: 400 }}>
              <AccordionDemo
                key={`accordion-${defaultExpanded}`}
                title="Accordion Title"
                size={size}
                disabled={disabled}
                defaultExpanded={defaultExpanded}
              >
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                  This is the accordion content. It can contain any content including text, images, or other components.
                </p>
              </AccordionDemo>
            </div>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: 16,
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: 24,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: 16,
              }}
            >
              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as AccordionSize)}
              />

              {/* Default Expanded */}
              <RadioGroup
                label="Default Expanded"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={defaultExpanded ? "true" : "false"}
                onChange={(v) => setDefaultExpanded(v === "true")}
              />

              {/* Disabled */}
              <RadioGroup
                label="Disabled"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={disabled ? "true" : "false"}
                onChange={(v) => setDisabled(v === "true")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 6,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-active-bg)",
            }}>Web</span>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: 16,
            fontSize: 13,
            lineHeight: 1.6,
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


function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  return <WebContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Overview */}
      <div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          개요
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            marginBottom: 24,
          }}
        >
          Accordion은 제목과 접을 수 있는 콘텐츠 영역으로 구성된 컴포넌트입니다. 많은 양의 정보를 제한된 공간에 효과적으로 표시할 때 사용합니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              backgroundColor: "var(--surface-success-default)",
              border: "1px solid var(--border-success-default)",
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--content-success-default)",
                marginBottom: 12,
              }}
            >
              이런 경우 사용하세요
            </h3>
            <ul
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <li>FAQ, 도움말 등 질문과 답변 형태의 콘텐츠를 구성할 때</li>
              <li>설정 화면에서 카테고리별 옵션을 그룹화할 때</li>
              <li>긴 콘텐츠를 단계별로 펼쳐볼 수 있게 할 때</li>
            </ul>
          </div>
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              backgroundColor: "var(--surface-error-default)",
              border: "1px solid var(--border-error-default)",
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--content-error-default)",
                marginBottom: 12,
              }}
            >
              이런 경우 사용하지 마세요
            </h3>
            <ul
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <li>항상 표시되어야 하는 중요 정보에는 사용하지 마세요</li>
              <li>2개 이하의 짧은 항목에는 불필요합니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="420" height="140" viewBox="0 0 420 140">
            {/* Container outline */}
            <rect x="60" y="20" width="300" height="100" rx="12" fill="white" stroke="var(--border-base-default)" strokeWidth="1.5" />

            {/* Header area */}
            <rect x="60" y="20" width="300" height="48" rx="12" fill="var(--surface-base-alternative)" />
            <rect x="60" y="56" width="300" height="12" fill="white" />

            {/* Title text */}
            <text x="80" y="50" fill="var(--content-base-strong)" fontSize="14" fontWeight="600">Accordion Title</text>

            {/* Chevron icon */}
            <path d="M335 40 L340 46 L345 40" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Content area */}
            <rect x="76" y="76" width="268" height="8" rx="4" fill="var(--border-base-default)" />
            <rect x="76" y="92" width="200" height="8" rx="4" fill="var(--border-base-default)" />

            {/* Lines to labels */}
            <line x1="30" y1="44" x2="60" y2="44" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="60" cy="44" r="3" fill="var(--content-base-default)" />

            <line x1="340" y1="44" x2="390" y2="44" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="340" cy="44" r="3" fill="var(--content-base-default)" />

            <line x1="210" y1="88" x2="210" y2="130" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="210" cy="88" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="15" cy="44" r="14" fill="var(--content-base-default)" />
            <text x="15" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="405" cy="44" r="14" fill="var(--content-base-default)" />
            <text x="405" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            <circle cx="210" cy="130" r="14" fill="var(--content-base-default)" />
            <text x="210" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Header</div>
          <div style={{ textAlign: "center" }}>2. Chevron Icon</div>
          <div style={{ textAlign: "right" }}>3. Content Area</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Accordion은 사용 맥락에 따라 두 가지 동작 모드를 지원합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <VariantCard name="Single Expand" description="하나의 항목만 펼칠 수 있습니다. 다른 항목을 열면 이전 항목이 자동으로 닫힙니다.">
            <div style={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
              <div style={{ height: 14, backgroundColor: "var(--content-brand-default)", borderRadius: 3, opacity: 0.8 }} />
              <div style={{ height: 14, backgroundColor: "var(--border-base-default)", borderRadius: 3 }} />
              <div style={{ height: 14, backgroundColor: "var(--border-base-default)", borderRadius: 3 }} />
            </div>
          </VariantCard>
          <VariantCard name="Multi Expand" description="여러 항목을 동시에 펼칠 수 있습니다. 각 항목이 독립적으로 열리고 닫힙니다.">
            <div style={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
              <div style={{ height: 14, backgroundColor: "var(--content-brand-default)", borderRadius: 3, opacity: 0.8 }} />
              <div style={{ height: 14, backgroundColor: "var(--content-brand-default)", borderRadius: 3, opacity: 0.6 }} />
              <div style={{ height: 14, backgroundColor: "var(--border-base-default)", borderRadius: 3 }} />
            </div>
          </VariantCard>
        </div>
        <Subsection title="Single Expand">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            FAQ 섹션처럼 <strong style={{ color: "var(--text-primary)" }}>한 번에 하나의 답변만 표시</strong>해야 하는 경우에 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
              <AccordionGroupDemo mode="single" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Multi Expand">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            설정 패널처럼 <strong style={{ color: "var(--text-primary)" }}>여러 섹션을 동시에 참조</strong>해야 하는 경우에 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
              <AccordionGroupDemo mode="multi" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center" }}>
              <AccordionDemo title="Medium (48px)" size="medium" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Content</p>
              </AccordionDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <AccordionDemo title="Large (56px)" size="large" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Content</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Accordion의 테두리, 헤더 배경, 텍스트 색상은 Foundation 토큰에 따라 결정됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400, padding: 24 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginBottom: 8 }}>Default Border (var(--border-base-default))</p>
              <AccordionDemo title="Default border color" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Content area</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginBottom: 8 }}>Expanded Header Background (var(--surface-base-alternative))</p>
              <AccordionDemo title="Expanded header color" defaultExpanded={true}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Header turns to var(--surface-base-alternative) when expanded</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginBottom: 8 }}>Collapsed</p>
              <AccordionDemo title="Click to expand" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Hidden content</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginBottom: 8 }}>Expanded</p>
              <AccordionDemo title="Click to collapse" defaultExpanded={true}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Visible content</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginBottom: 8 }}>Disabled</p>
              <AccordionDemo title="Cannot interact" disabled defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>Content</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Interaction States */}
      <Section title="Interaction States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          Accordion 헤더는 사용자의 상호작용에 따라 시각적 피드백을 제공합니다. 각 상태는 명확히 구분되어 현재 인터랙션을 인지할 수 있게 합니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          padding: 24,
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
        }}>
          <StateCard label="Collapsed" sublabel="접힌 상태">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ height: 36, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-default)" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </StateCard>
          <StateCard label="Expanded" sublabel="펼친 상태">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ height: 36, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-alternative)" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              <div style={{ padding: 8, borderTop: "1px solid var(--border-base-default)" }}>
                <div style={{ height: 6, width: "80%", backgroundColor: "var(--border-base-default)", borderRadius: 3 }} />
                <div style={{ height: 6, width: "60%", backgroundColor: "var(--border-base-default)", borderRadius: 3, marginTop: 4 }} />
              </div>
            </div>
          </StateCard>
          <StateCard label="Hover" sublabel="마우스 오버">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 0 2px var(--surface-brand-secondary)" }}>
              <div style={{ height: 36, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-alternative)" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </StateCard>
          <StateCard label="Disabled" sublabel="비활성화">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: 8, overflow: "hidden", opacity: 0.4 }}>
              <div style={{ height: 36, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-default)" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </StateCard>
        </div>
      </Section>

      {/* Design Tokens (Spec) */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
          컴포넌트에 적용된 디자인 토큰입니다. 커스터마이징 시 아래 토큰을 참조하세요.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>속성</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>토큰</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>값</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>배경색</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--surface-base-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-default)" }} />
                    White / Dark Grey
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>헤더 텍스트</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-base-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-default)", border: "1px solid var(--border-default)" }} />
                    fontSize: 16
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>본문 텍스트</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--text-secondary</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--text-secondary)", border: "1px solid var(--border-default)" }} />
                    fontSize: 14
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>구분선</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--border-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--border-default)", border: "1px solid var(--border-default)" }} />
                    1px solid
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>아이콘</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-base-neutral</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-neutral)", border: "1px solid var(--border-default)" }} />
                    Chevron
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>최소 높이 (md)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>spacing.component.accordion.md</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>56px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>최소 높이 (lg)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>spacing.component.accordion.lg</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>64px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>패딩</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>spacing.primitive.4</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>16px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* UX Writing */}
      <Section title="UX Writing">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          Accordion 헤더 텍스트는 사용자가 내용을 예측할 수 있도록 명확하고 간결하게 작성합니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;결제 수단 관리&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>제목은 명사형으로 간결하게</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;결제 수단 관리하기&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>동사형 제목은 피하세요</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;자주 묻는 질문&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>한글 표현을 우선 사용하세요</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;FAQ&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>약어보다 한글 표현이 직관적입니다</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;배송 정보&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>헤더는 짧고 핵심적으로</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;배송 정보를 확인하세요&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>문장형 헤더는 불필요하게 깁니다</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="FAQ 섹션"
              description="자주 묻는 질문과 답변을 정리할 때 사용합니다."
              recommendation="Single expand + medium"
              examples={["고객센터 FAQ", "상품 Q&A"]}
            />
            <UsageCard
              situation="설정 패널"
              description="여러 설정 그룹을 동시에 확인해야 하는 경우에 사용합니다."
              recommendation="Multi expand + large"
              examples={["알림 설정", "프로필 설정", "보안 설정"]}
            />
            <UsageCard
              situation="콘텐츠 정리"
              description="긴 콘텐츠를 카테고리별로 접어서 표시할 때 사용합니다."
              recommendation="Single expand + medium"
              examples={["이용약관", "개인정보 처리방침"]}
            />
            <UsageCard
              situation="필터 패널"
              description="검색 필터를 그룹별로 접어서 표시할 때 사용합니다."
              recommendation="Multi expand + medium"
              examples={["가격 필터", "카테고리 필터", "정렬 옵션"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="콘텐츠 우선순위를 반영하세요"
              desc="가장 중요한 항목을 상단에 배치하고, defaultExpanded로 처음부터 열린 상태로 제공하여 사용자가 핵심 정보를 빠르게 확인할 수 있도록 합니다."
            />
            <PrincipleCard
              number={2}
              title="적절한 확장 모드를 선택하세요"
              desc="비교가 필요 없는 콘텐츠에는 Single expand를, 동시에 여러 항목을 참조해야 하는 경우에는 Multi expand를 사용합니다."
            />
            <PrincipleCard
              number={3}
              title="헤더 텍스트는 명확하게"
              desc="헤더만 보고도 내용을 예측할 수 있어야 합니다. 모호한 제목은 사용자가 모든 항목을 열어봐야 하므로 Accordion의 장점을 잃게 됩니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Accordion 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Border Radius</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>radius.semantic.card.sm</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding (내부)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.4</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>16px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Header Height (medium)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.12</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>48px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Header Height (large)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.14</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>56px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Border Color</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>border.base.default</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--border-base-default) (palette.grey.95)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Background (header expanded)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>surface.elevated.alternative</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--surface-base-alternative) (palette.grey.99)</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Text Color</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>content.base.default</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--content-base-default) (palette.grey.30)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Accordion 컴포넌트는 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>role=&quot;button&quot;</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>헤더가 버튼으로 인식됨</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>aria-expanded</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>현재 펼침/접힘 상태를 스크린 리더에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>aria-controls</code></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>헤더가 제어하는 콘텐츠 영역을 연결</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>헤더로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Enter</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>펼침/접힘 토글</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Space</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>펼침/접힘 토글</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard number={1} title="Keyboard Navigation" desc="Enter 또는 Space 키로 펼침/접힘을 제어할 수 있습니다. Tab으로 각 헤더 사이를 이동합니다." />
            <PrincipleCard number={2} title="ARIA Attributes" desc="aria-expanded 속성으로 현재 상태를 스크린 리더에 전달합니다. aria-controls로 헤더와 콘텐츠 영역을 연결합니다." />
            <PrincipleCard number={3} title="Focus Visible" desc="키보드 포커스 시 헤더에 시각적 포커스 링이 표시되어 키보드 사용자가 현재 위치를 인지할 수 있습니다." />
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 200 }}>
              <AccordionDemo title="배송 안내" size="medium" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 13, color: "var(--content-base-secondary)" }}>2-3일 이내 배송</p>
              </AccordionDemo>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 200 }}>
              <div style={{ border: "1px solid var(--border-base-default)", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 48, padding: "0 16px", display: "flex", alignItems: "center", fontSize: 14, fontWeight: 500, color: "var(--content-base-strong)" }}>
                  A
                </div>
              </div>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "var(--status-positive-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Do</span>
            <span style={{ color: "var(--text-secondary)" }}>헤더 텍스트로 내용을 명확히 설명합니다.</span>
          </p>
          <p style={{ fontSize: 13, color: "var(--status-negative-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Don&apos;t</span>
            <span style={{ color: "var(--text-secondary)" }}>헤더에 의미 없는 짧은 텍스트를 사용하지 마세요.</span>
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 200, display: "flex", flexDirection: "column", gap: 4 }}>
              <AccordionDemo title="자주 묻는 질문" size="medium" defaultExpanded={true}>
                <p style={{ margin: 0, fontSize: 13, color: "var(--content-base-secondary)" }}>관련 콘텐츠</p>
              </AccordionDemo>
              <AccordionDemo title="이용 약관" size="medium" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 13, color: "var(--content-base-secondary)" }}>관련 콘텐츠</p>
              </AccordionDemo>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 200 }}>
              <AccordionDemo title="항목 1개만 있는 아코디언" size="medium" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 13, color: "var(--content-base-secondary)" }}>콘텐츠가 하나뿐이면 Accordion을 사용하지 마세요.</p>
              </AccordionDemo>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "var(--status-positive-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Do</span>
            <span style={{ color: "var(--text-secondary)" }}>관련 콘텐츠를 그룹화하여 여러 항목을 제공합니다.</span>
          </p>
          <p style={{ fontSize: 13, color: "var(--status-negative-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Don&apos;t</span>
            <span style={{ color: "var(--text-secondary)" }}>항목이 1개뿐이면 Accordion 대신 직접 표시하세요.</span>
          </p>
        </div>
      </Section>

      {/* Related Components */}
      <div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          관련 컴포넌트
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--border-default)",
              }}
            >
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>컴포넌트</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>용도</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>차이점</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Card</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>콘텐츠 그룹화</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Card는 항상 표시, Accordion은 접고 펼침</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>SectionHeader</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>섹션 구분</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>SectionHeader는 고정 제목, Accordion은 토글 가능</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>ListCell</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>항목 나열</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ListCell은 단일 행, Accordion은 펼쳐지는 콘텐츠 영역 포함</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ACCORDION_SOURCE = `${GITHUB_BASE}/components/Accordion/Accordion.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Accordion Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACCORDION_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
              borderRadius: 12,
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

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { Accordion } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
            <AccordionDemo title="Click to expand">
              <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                This content is revealed when expanded.
              </p>
            </AccordionDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Accordion title="Click to expand">
  <p>This content is revealed when expanded.</p>
</Accordion>`} />
      </Section>

      {/* Controlled */}
      <Section title="Controlled">
        <CodeBlock code={`const [expanded, setExpanded] = useState(false);

<Accordion
  title="Controlled Accordion"
  expanded={expanded}
  onChange={setExpanded}
>
  <p>Content here</p>
</Accordion>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "헤더에 표시되는 제목" },
            { name: "children", type: "ReactNode", required: true, description: "펼쳐지는 콘텐츠" },
            { name: "size", type: '"medium" | "large"', required: false, defaultVal: '"medium"', description: "아코디언 크기" },
            { name: "defaultExpanded", type: "boolean", required: false, defaultVal: "false", description: "초기 펼침 상태 (비제어)" },
            { name: "expanded", type: "boolean", required: false, description: "펼침 상태 (제어)" },
            { name: "onChange", type: "(expanded: boolean) => void", required: false, description: "상태 변경 콜백" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Components
// ============================================

function UsageCard({ situation, description, recommendation, examples }: {
  situation: string;
  description: string;
  recommendation: string;
  examples: string[];
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 16,
      padding: 16,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: 12,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: 11,
            padding: "2px 6px",
            backgroundColor: "var(--surface-brand-secondary)",
            color: "var(--surface-brand-defaultPressed)",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {recommendation}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{description}</p>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
          예시: {examples.join(", ")}
        </p>
      </div>
    </div>
  );
}

function AccordionGroupDemo({ mode }: { mode: "single" | "multi" }) {
  const [expandedItems, setExpandedItems] = useState<number[]>(mode === "multi" ? [0] : [0]);

  const toggleItem = (index: number) => {
    if (mode === "single") {
      setExpandedItems(prev => prev.includes(index) ? [] : [index]);
    } else {
      setExpandedItems(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    }
  };

  const items = [
    { title: "Section 1", content: "First section content" },
    { title: "Section 2", content: "Second section content" },
    { title: "Section 3", content: "Third section content" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, index) => (
        <div key={index} style={{ border: "1px solid var(--border-base-default)", borderRadius: 12, overflow: "hidden" }}>
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: "100%",
              height: 48,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: expandedItems.includes(index) ? "var(--surface-base-alternative)" : "var(--surface-base-default)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--content-base-strong)" }}>{item.title}</span>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedItems.includes(index) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div style={{ maxHeight: expandedItems.includes(index) ? 100 : 0, overflow: "hidden", transition: "max-height 0.2s ease" }}>
            <div style={{ padding: 16, borderTop: "1px solid var(--border-base-default)" }}>
              <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


// ============================================
// Demo Component
// ============================================

function AccordionDemo({
  title,
  size = "medium",
  disabled = false,
  defaultExpanded = false,
  children,
}: {
  title: string;
  size?: AccordionSize;
  disabled?: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      title={title}
      size={size}
      disabled={disabled}
      defaultExpanded={defaultExpanded}
    >
      {children}
    </Accordion>
  );
}

function StateCard({ label, sublabel, children }: {
  label: string; sublabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 16 }}>
      {children}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}
