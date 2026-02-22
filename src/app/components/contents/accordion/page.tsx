"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Accordion, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// Types
type AccordionSize = "medium" | "large";

export default function AccordionPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Accordion" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Accordion
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
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
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  const generateCode = () => {
    const props = [];
    props.push('title="Accordion Title"');
    if (size !== "medium") props.push(`size="${size}"`);
    if (defaultExpanded) props.push("defaultExpanded");

    const propsStr = props.join("\n  ");

    return `<Accordion
  ${propsStr}
  onChange={(expanded) => console.log(expanded)}
>
  <p>Accordion content goes here</p>
</Accordion>`;
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
            <div style={{ width: "100%", maxWidth: 400 }}>
              <AccordionDemo
                key={`accordion-${defaultExpanded}`}
                title="Accordion Title"
                size={size}
                defaultExpanded={defaultExpanded}
              >
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
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
                borderRadius: spacing.primitive[4],
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
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: spacing.primitive[2] }}>
            <span style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.semibold,
              padding: `${spacing.primitive[1]}px ${spacing.primitive[3]}px`,
              borderRadius: radius.primitive.sm,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-active-bg)",
            }}>Web</span>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: spacing.primitive[4],
            fontSize: typography.fontSize.compact,
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
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>Accordion</InlineCode> 컴포넌트는 접힘/펼침이 가능한 콘텐츠 컨테이너예요.
          FAQ, 설정 화면 등에서 정보를 그룹화하여 점진적으로 공개할 때 사용해요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.lg,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
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
          gap: spacing.primitive[6],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Header</div>
          <div style={{ textAlign: "center" }}>2. Chevron Icon</div>
          <div style={{ textAlign: "right" }}>3. Content Area</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Accordion은 사용 맥락에 따라 두 가지 동작 모드를 지원합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
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
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            FAQ 섹션처럼 <strong style={{ color: "var(--text-primary)" }}>한 번에 하나의 답변만 표시</strong>해야 하는 경우에 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 400, padding: spacing.primitive[6] }}>
              <AccordionGroupDemo mode="single" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Multi Expand">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            설정 패널처럼 <strong style={{ color: "var(--text-primary)" }}>여러 섹션을 동시에 참조</strong>해야 하는 경우에 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 400, padding: spacing.primitive[6] }}>
              <AccordionGroupDemo mode="multi" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center" }}>
              <AccordionDemo title="Medium (48px)" size="medium" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>Content</p>
              </AccordionDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <AccordionDemo title="Large (56px)" size="large" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>Content</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Accordion의 테두리, 헤더 배경, 텍스트 색상은 Foundation 토큰에 따라 결정됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: "100%", maxWidth: 400, padding: spacing.primitive[6] }}>
            <div>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Default Border (var(--border-base-default))</p>
              <AccordionDemo title="Default border color" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>Content area</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Expanded Header Background (var(--surface-base-alternative))</p>
              <AccordionDemo title="Expanded header color" defaultExpanded={true}>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>Header turns to var(--surface-base-alternative) when expanded</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: "100%", maxWidth: 400 }}>
            <div>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Collapsed</p>
              <AccordionDemo title="Click to expand" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>Hidden content</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Expanded</p>
              <AccordionDemo title="Click to collapse" defaultExpanded={true}>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>Visible content</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>

        <Subsection title="Interaction States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          Accordion 헤더는 사용자의 상호작용에 따라 시각적 피드백을 제공합니다. 각 상태는 명확히 구분되어 현재 인터랙션을 인지할 수 있게 합니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.lg,
        }}>
          <StateCard label="Collapsed" sublabel="접힌 상태">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.sm, overflow: "hidden" }}>
              <div style={{ height: 36, padding: `0 ${spacing.primitive[3]}px`, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-default)" }}>
                <span style={{ fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </StateCard>
          <StateCard label="Expanded" sublabel="펼친 상태">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.sm, overflow: "hidden" }}>
              <div style={{ height: 36, padding: `0 ${spacing.primitive[3]}px`, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-alternative)" }}>
                <span style={{ fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              <div style={{ padding: spacing.primitive[2], borderTop: "1px solid var(--border-base-default)" }}>
                <div style={{ height: 6, width: "80%", backgroundColor: "var(--border-base-default)", borderRadius: 3 }} />
                <div style={{ height: 6, width: "60%", backgroundColor: "var(--border-base-default)", borderRadius: 3, marginTop: spacing.primitive[1] }} />
              </div>
            </div>
          </StateCard>
          <StateCard label="Hover" sublabel="마우스 오버">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.sm, overflow: "hidden", boxShadow: "0 0 0 2px var(--surface-brand-secondary)" }}>
              <div style={{ height: 36, padding: `0 ${spacing.primitive[3]}px`, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-alternative)" }}>
                <span style={{ fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </StateCard>
          <StateCard label="Disabled" sublabel="비활성화">
            <div style={{ width: 120, border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.sm, overflow: "hidden", opacity: 0.4 }}>
              <div style={{ height: 36, padding: `0 ${spacing.primitive[3]}px`, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--surface-base-default)" }}>
                <span style={{ fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Title</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </StateCard>
        </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
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
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
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

        <Subsection title="Best Practices">
        <div style={{ display: "grid", gap: spacing.primitive[5] }}>
          {/* Pair 1: Clear header text */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 200 }}>
                    <AccordionDemo title="배송 안내" size="medium" defaultExpanded={false}>
                      <p style={{ margin: 0, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>2-3일 이내 배송</p>
                    </AccordionDemo>
                  </div>
                </DoCard>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 200 }}>
                    <div style={{ border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                      <div style={{ height: 48, padding: `0 ${spacing.primitive[4]}px`, display: "flex", alignItems: "center", fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--content-base-strong)" }}>
                        A
                      </div>
                    </div>
                  </div>
                </DontCard>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 헤더 텍스트로 내용을 명확히 설명합니다
              </p>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 헤더에 의미 없는 짧은 텍스트를 사용하지 마세요
              </p>
            </div>
          </div>

          {/* Pair 2: Multiple items */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 200, display: "flex", flexDirection: "column", gap: spacing.primitive[1] }}>
                    <AccordionDemo title="자주 묻는 질문" size="medium" defaultExpanded={true}>
                      <p style={{ margin: 0, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>관련 콘텐츠</p>
                    </AccordionDemo>
                    <AccordionDemo title="이용 약관" size="medium" defaultExpanded={false}>
                      <p style={{ margin: 0, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>관련 콘텐츠</p>
                    </AccordionDemo>
                  </div>
                </DoCard>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 200 }}>
                    <AccordionDemo title="항목 1개만 있는 아코디언" size="medium" defaultExpanded={false}>
                      <p style={{ margin: 0, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>콘텐츠가 하나뿐이면 Accordion을 사용하지 마세요.</p>
                    </AccordionDemo>
                  </div>
                </DontCard>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 관련 콘텐츠를 그룹화하여 여러 항목을 제공합니다
              </p>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 항목이 1개뿐이면 Accordion 대신 직접 표시하세요
              </p>
            </div>
          </div>

          {/* Pair 3: UX Writing - noun form headers */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;결제 수단 관리&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>제목은 명사형으로 간결하게</p>
                  </div>
                </DoCard>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;결제 수단 관리하기&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>동사형 제목은 피하세요</p>
                  </div>
                </DontCard>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 명사형 제목으로 콘텐츠를 직관적으로 나타냅니다
              </p>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 동사형 제목은 Accordion 헤더에 적합하지 않습니다
              </p>
            </div>
          </div>

          {/* Pair 4: UX Writing - Korean over abbreviation */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;자주 묻는 질문&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>한글 표현을 우선 사용하세요</p>
                  </div>
                </DoCard>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;FAQ&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>약어보다 한글 표현이 직관적입니다</p>
                  </div>
                </DontCard>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 한글 표현을 우선 사용하여 직관성을 높입니다
              </p>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 약어는 사용자가 의미를 추측해야 합니다
              </p>
            </div>
          </div>

          {/* Pair 5: UX Writing - short and core */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;배송 정보&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>헤더는 짧고 핵심적으로</p>
                  </div>
                </DoCard>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;배송 정보를 확인하세요&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>문장형 헤더는 불필요하게 깁니다</p>
                  </div>
                </DontCard>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 짧고 핵심적인 제목으로 스캔이 쉽게 합니다
              </p>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 문장형 헤더는 불필요한 길이를 추가합니다
              </p>
            </div>
          </div>
        </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          Accordion 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Border Radius</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>radius.component.card.sm</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Padding (내부)</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>spacing.primitive[4]</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>16px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Header Height (medium)</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>spacing.component.accordion.height.md</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>48px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Header Height (large)</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>spacing.component.accordion.height.lg</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>56px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Border Width</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>borderWidth.default</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>1px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Border Color</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>border.base.default</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: spacing.primitive[1] }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--border-base-default)", border: "1px solid var(--divider)" }} />
                    var(--border-base-default)
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Background (default)</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>surface.base.default</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>var(--surface-base-default)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Background (header expanded)</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>surface.elevated.alternative</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: spacing.primitive[1] }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--surface-base-alternative)", border: "1px solid var(--divider)" }} />
                    var(--surface-base-alternative)
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Title Font</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>fontSize.md</InlineCode> + <InlineCode>fontWeight.semibold</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>16px / 600</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Title Color</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>content.base.default</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: spacing.primitive[1] }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-default)", border: "1px solid var(--divider)" }} />
                    var(--content-base-default)
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Icon Color</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>content.base.secondary</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>var(--content-base-secondary)</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Transition</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>
                  <InlineCode>transitions.background</InlineCode> / <InlineCode>transitions.transform</InlineCode> / <InlineCode>transitions.expand</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>header bg / 아이콘 회전 / 패널 높이+opacity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Accordion 컴포넌트는 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>헤더가 버튼으로 인식됨</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-expanded</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>현재 펼침/접힘 상태를 스크린 리더에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>aria-controls</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>헤더가 제어하는 콘텐츠 영역을 연결</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[6] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>헤더로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Enter</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>펼침/접힘 토글</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Space</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>펼침/접힘 토글</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard number={1} title="Keyboard Navigation" desc="Enter 또는 Space 키로 펼침/접힘을 제어할 수 있습니다. Tab으로 각 헤더 사이를 이동합니다." />
            <PrincipleCard number={2} title="ARIA Attributes" desc="aria-expanded 속성으로 현재 상태를 스크린 리더에 전달합니다. aria-controls로 헤더와 콘텐츠 영역을 연결합니다." />
            <PrincipleCard number={3} title="Focus Visible" desc="키보드 포커스 시 헤더에 시각적 포커스 링이 표시되어 키보드 사용자가 현재 위치를 인지할 수 있습니다." />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Card</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>콘텐츠 그룹화</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Card는 항상 표시, Accordion은 접고 펼침</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>SectionHeader</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>섹션 구분</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>SectionHeader는 고정 제목, Accordion은 토글 가능</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ListCell</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>항목 나열</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ListCell은 단일 행, Accordion은 펼쳐지는 콘텐츠 영역 포함</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ACCORDION_SOURCE = `${GITHUB_BASE}/components/Accordion/Accordion.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Accordion Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACCORDION_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
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

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { Accordion } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, padding: spacing.primitive[6] }}>
            <AccordionDemo title="Click to expand">
              <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
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
      gap: spacing.primitive[4],
      padding: spacing.primitive[4],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2], marginBottom: spacing.primitive[1] }}>
          <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: typography.fontSize['2xs'],
            padding: "2px 6px",
            backgroundColor: "var(--surface-brand-secondary)",
            color: "var(--surface-brand-defaultPressed)",
            borderRadius: radius.primitive.xs,
            fontWeight: typography.fontWeight.medium,
          }}>
            {recommendation}
          </span>
        </div>
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: spacing.primitive[1] }}>{description}</p>
        <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
      {items.map((item, index) => (
        <div key={index} style={{ border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: "100%",
              height: 48,
              padding: `0 ${spacing.primitive[4]}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: expandedItems.includes(index) ? "var(--surface-base-alternative)" : "var(--surface-base-default)",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--content-base-strong)" }}>{item.title}</span>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedItems.includes(index) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div style={{ maxHeight: expandedItems.includes(index) ? 100 : 0, overflow: "hidden", transition: "max-height 0.2s ease" }}>
            <div style={{ padding: spacing.primitive[4], borderTop: "1px solid var(--border-base-default)" }}>
              <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>{item.content}</p>
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
  defaultExpanded = false,
  children,
}: {
  title: string;
  size?: AccordionSize;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      title={title}
      size={size}
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4] }}>
      {children}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}
