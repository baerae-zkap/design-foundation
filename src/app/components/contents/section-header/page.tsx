"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { SectionHeader, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { SectionHeaderSize } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";

export default function SectionHeaderPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Section Header" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Section Header
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        콘텐츠 영역의 제목과 부가 액션을 표시하여 섹션을 구분하는 컴포넌트입니다.
      </p>

      <SectionHeaderPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function SectionHeaderPlayground() {
  const [size, setSize] = useState<SectionHeaderSize>("medium");
  const [hasAction, setHasAction] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const [descriptionPosition, setDescriptionPosition] = useState<'top' | 'bottom'>('top');

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo
                size={size}
                title="내 자산"
                description={hasDescription ? "최근 30일 기준" : undefined}
                descriptionPosition={descriptionPosition}
                action={hasAction ? <ActionButton>전체보기</ActionButton> : undefined}
              />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              <ListCellSimple title="Solana" value="₩1,560,000" />
            </div>
          </div>

          <div style={{
            backgroundColor: "var(--surface-base-alternative)",
            display: "flex",
            flexDirection: "column",
            padding: spacing.primitive[4],
            overflow: "hidden",
            height: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              padding: spacing.primitive[6],
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              backgroundColor: "var(--surface-base-default)",
              borderRadius: radius.primitive.lg,
            }}>
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as SectionHeaderSize)}
              />
              <RadioGroup
                label="Action Button"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasAction ? "true" : "false"}
                onChange={(v) => setHasAction(v === "true")}
              />
              <RadioGroup
                label="Description"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasDescription ? "true" : "false"}
                onChange={(v) => setHasDescription(v === "true")}
              />
              {hasDescription && (
                <RadioGroup
                  label="Description Position"
                  options={[
                    { value: "top", label: "Top" },
                    { value: "bottom", label: "Bottom" },
                  ]}
                  value={descriptionPosition}
                  onChange={(v) => setDescriptionPosition(v as 'top' | 'bottom')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// Helper: UsageCard
function UsageCard({ situation, description, example }: {
  situation: string;
  description: string;
  example: string;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: spacing.primitive[1],
      padding: spacing.primitive[4],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{situation}</span>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: 2 }}>{description}</p>
      <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>{example}</p>
    </div>
  );
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>SectionHeader</InlineCode> 컴포넌트는 콘텐츠 영역의 제목과 부가 액션을 표시하여 섹션을 구분하는 컴포넌트예요.
          리스트 상단, 설정 그룹 구분 등에서 사용해요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: "var(--surface-base-container)", borderRadius: radius.primitive.lg, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="360" height="60" viewBox="0 0 360 60">
            <rect x="0" y="20" width="360" height="32" rx="0" fill="var(--surface-base-default)" stroke="var(--divider)" strokeWidth="1" />
            <text x="16" y="40" fill="var(--content-base-neutral)" fontSize="14" fontWeight="600">내 자산</text>
            <text x="344" y="40" textAnchor="end" fill="var(--content-brand-default)" fontSize="12" fontWeight="500">전체보기</text>
            <line x1="80" y1="0" x2="80" y2="20" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="0" r="10" fill="var(--content-base-default)" />
            <text x="80" y="4" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="10" fontWeight="600">1</text>
            <line x1="310" y1="52" x2="310" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="310" cy="60" r="10" fill="var(--content-base-default)" />
            <text x="310" y="64" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="10" fontWeight="600">2</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[5], fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>
          <div>1. Title</div>
          <div style={{ textAlign: "center" }}>2. Description (Optional)</div>
          <div style={{ textAlign: "right" }}>3. Action (Optional)</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          SectionHeader는 구성 요소의 조합에 따라 다양한 variant로 사용됩니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[5] }}>
          <VariantCard
            name="Title Only"
            description="타이틀만 표시하는 가장 기본적인 형태. 섹션 구분이 주요 목적입니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeaderDemo title="내 자산" />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: typography.fontSize.compact, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard
            name="With Action Button"
            description="우측에 TextButton 액션을 배치하여 섹션 전체를 제어하는 동작을 제공합니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: typography.fontSize.compact, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard
            name="With Description (top)"
            description="타이틀 위에 보조 설명을 추가하여 섹션 맥락을 제공합니다. 날짜, 기간, 개수 등에 사용합니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeaderDemo title="내 자산" description="최근 30일" descriptionPosition="top" />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: typography.fontSize.compact, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard
            name="With Description (bottom)"
            description="타이틀 아래에 보조 설명을 배치합니다. 섹션 제목 강조 후 부연 설명이 필요할 때 사용합니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeaderDemo title="거래소 연동" description="2개 연결됨" descriptionPosition="bottom" action={<ActionButton>+ 추가</ActionButton>} />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: typography.fontSize.compact, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* ZKAP Examples */}
      <Section title="ZKAP Examples">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%", display: "flex", flexDirection: "column", gap: spacing.primitive[5] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="내 자산" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              <ListCellSimple title="Solana" value="₩1,560,000" />
            </div>

            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="설정" />
              <ListCellSimple title="알림 설정" icon="›" />
              <ListCellSimple title="보안" icon="›" />
              <ListCellSimple title="계정 정보" icon="›" />
            </div>

            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="거래소 연동" action={<ActionButton>+ 추가</ActionButton>} />
              <ListCellSimple title="업비트" value="연결됨" valueColor="var(--content-success-default)" />
              <ListCellSimple title="빗썸" value="연결하기" valueColor="var(--content-brand-default)" />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", overflow: "hidden", maxWidth: 360 }}>
              <SectionHeaderDemo size="small" title="Small (13px)" />
              <div style={{ height: 1, backgroundColor: "var(--divider)" }} />
              <SectionHeaderDemo size="medium" title="Medium (14px)" />
              <div style={{ height: 1, backgroundColor: "var(--divider)" }} />
              <SectionHeaderDemo size="large" title="Large (15px)" />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          SectionHeader는 요소별로 다른 색상을 사용하여 시각적 계층을 만듭니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Element</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Title</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-default)" }} />
                    <InlineCode>var(--content-base-default)</InlineCode>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>content.base.default</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Description</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-secondary)" }} />
                    <InlineCode>var(--content-base-secondary)</InlineCode>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>content.base.secondary</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Action (Brand)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-brand-default)" }} />
                    <InlineCode>var(--content-brand-default)</InlineCode>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>content.brand.default</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Action (Base)</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-secondary)" }} />
                    <InlineCode>var(--content-base-secondary)</InlineCode>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>content.base.secondary</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          SectionHeader는 컨텍스트에 따라 다양한 상태를 가질 수 있습니다.
        </p>

        <Subsection title="Default">
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
                <SectionHeaderDemo title="내 자산" action={<ActionButton>전체보기</ActionButton>} />
                <ListCellSimple title="Ethereum" value="₩3,245,000" />
                <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[3], padding: spacing.primitive[3], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
            기본 상태. 타이틀과 선택적 액션 버튼이 표시됩니다.
          </div>
        </Subsection>

        <Subsection title="With Collapsible">
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 16px 8px 16px",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-neutral)", textTransform: "uppercase" as const, letterSpacing: "0.02em" }}>내 자산</div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-neutral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <ListCellSimple title="Ethereum" value="₩3,245,000" />
                <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[3], padding: spacing.primitive[3], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
            접기/펼치기 가능한 상태. 우측에 chevron 아이콘으로 상태를 표시합니다.
          </div>
        </Subsection>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            SectionHeader는 비인터랙티브 컴포넌트입니다. 대신 구성 요소의 조합에 따라 다양한 시각적 상태를 가집니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <SHStateCard label="Title Only" sublabel="기본 타이틀만 표시">
              <div style={{ width: 140, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.sm, border: "1px solid var(--border-default)", overflow: "hidden" }}>
                <div style={{ padding: "10px 12px 6px 12px" }}>
                  <div style={{ width: 48, height: 7, borderRadius: 3, backgroundColor: "var(--content-base-neutral)" }} />
                </div>
                <div style={{ height: 1, backgroundColor: "var(--border-default)" }} />
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ width: 60, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)", marginBottom: spacing.primitive[1] }} />
                  <div style={{ width: 40, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
                </div>
              </div>
            </SHStateCard>
            <SHStateCard label="With Action" sublabel="우측 액션 버튼 포함">
              <div style={{ width: 140, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.sm, border: "1px solid var(--border-default)", overflow: "hidden" }}>
                <div style={{ padding: "10px 12px 6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: 48, height: 7, borderRadius: 3, backgroundColor: "var(--content-base-neutral)" }} />
                  <div style={{ width: 32, height: 6, borderRadius: 3, backgroundColor: "var(--content-brand-default)" }} />
                </div>
                <div style={{ height: 1, backgroundColor: "var(--border-default)" }} />
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ width: 60, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)", marginBottom: spacing.primitive[1] }} />
                  <div style={{ width: 40, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
                </div>
              </div>
            </SHStateCard>
            <SHStateCard label="With Description" sublabel="보조 설명 텍스트 포함">
              <div style={{ width: 140, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.sm, border: "1px solid var(--border-default)", overflow: "hidden" }}>
                <div style={{ padding: "10px 12px 6px 12px" }}>
                  <div style={{ width: 48, height: 7, borderRadius: 3, backgroundColor: "var(--content-base-neutral)", marginBottom: spacing.primitive[1] }} />
                  <div style={{ width: 64, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-assistive)" }} />
                </div>
                <div style={{ height: 1, backgroundColor: "var(--border-default)" }} />
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ width: 60, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)", marginBottom: spacing.primitive[1] }} />
                  <div style={{ width: 40, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
                </div>
              </div>
            </SHStateCard>
            <SHStateCard label="Full" sublabel="설명 + 액션 모두 포함">
              <div style={{ width: 140, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.sm, border: "1px solid var(--border-default)", overflow: "hidden" }}>
                <div style={{ padding: "10px 12px 6px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ width: 48, height: 7, borderRadius: 3, backgroundColor: "var(--content-base-neutral)", marginBottom: spacing.primitive[1] }} />
                    <div style={{ width: 52, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-assistive)" }} />
                  </div>
                  <div style={{ width: 28, height: 6, borderRadius: 3, backgroundColor: "var(--content-brand-default)" }} />
                </div>
                <div style={{ height: 1, backgroundColor: "var(--border-default)" }} />
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ width: 60, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)", marginBottom: spacing.primitive[1] }} />
                  <div style={{ width: 40, height: 5, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
                </div>
              </div>
            </SHStateCard>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 패턴을 따르세요. SectionHeader는 항상 <strong style={{ color: "var(--text-primary)" }}>리스트 컴포넌트와 조합</strong>하여 사용합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageCard
              situation="List Section Header"
              description="리스트 상단에 섹션을 구분하는 타이틀로 사용"
              example="예시: ListCell과 조합, '내 자산', '최근 거래' 등"
            />
            <UsageCard
              situation="Settings Group Header"
              description="설정 화면에서 그룹별 구분자로 사용"
              example="예시: '계정', '알림', '보안' 등 설정 그룹 구분"
            />
            <UsageCard
              situation="Content Section Divider"
              description="콘텐츠 영역에서 섹션을 나누고 액션을 제공"
              example="예시: '거래소 연동' + '추가' 액션 버튼"
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Clear Hierarchy"
              desc="섹션 헤더는 콘텐츠를 논리적으로 그룹화하고 시각적 계층을 만듭니다."
            />
            <PrincipleCard
              number={2}
              title="Consistent Styling"
              desc="semibold 타이틀과 secondary 색상의 description으로 시각적 계층을 만듭니다."
            />
            <PrincipleCard
              number={3}
              title="Optional Actions"
              desc="우측 액션 버튼은 선택사항이며, 있을 경우 섹션 전체를 제어하는 동작이어야 합니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Pair 1: Title length */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 220 }}>
                      <SectionHeaderDemo title="내 자산" />
                      <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: typography.fontSize.xs, color: "var(--content-base-neutral)" }}>List items</div>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 220, padding: "12px 16px" }}>
                      <div style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)" }}>내 자산 현황 목록입니다</div>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
                  <strong>Do</strong> 간결한 타이틀 사용 (2-3단어)
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
                  <strong>Don&apos;t</strong> 긴 문장이나 설명을 타이틀에 사용
                </p>
              </div>
            </div>

            {/* Pair 2: Action button style */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 220 }}>
                      <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
                      <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: typography.fontSize.xs, color: "var(--content-base-neutral)" }}>List items</div>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 220 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
                        <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-neutral)", textTransform: "uppercase" as const }}>최근 거래</div>
                        <button style={{ padding: "8px 16px", backgroundColor: "var(--content-brand-default)", color: "var(--content-base-onColor)", border: "none", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold }}>전체보기</button>
                      </div>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
                  <strong>Do</strong> 작은 TextButton을 action으로 사용
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
                  <strong>Don&apos;t</strong> 큰 Button을 action으로 사용하지 않기
                </p>
              </div>
            </div>

            {/* Pair 3: UX Writing - Title */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ padding: spacing.primitive[4] }}>
                      <InlineCode>&quot;인기 종목&quot;</InlineCode>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ padding: spacing.primitive[4] }}>
                      <InlineCode>&quot;인기 있는 종목 모음&quot;</InlineCode>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
                  <strong>Do</strong> 2-3 단어로 섹션을 명확히 표현합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
                  <strong>Don&apos;t</strong> 불필요하게 긴 타이틀을 사용하지 않습니다
                </p>
              </div>
            </div>

            {/* Pair 4: UX Writing - Action */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ padding: spacing.primitive[4] }}>
                      <InlineCode>&quot;더보기&quot;</InlineCode>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ padding: spacing.primitive[4] }}>
                      <InlineCode>&quot;전체 보기로 이동합니다&quot;</InlineCode>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
                  <strong>Do</strong> 액션은 간결한 동사형으로 표현합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
                  <strong>Don&apos;t</strong> 설명형 문장을 액션에 사용하지 않습니다
                </p>
              </div>
            </div>

            {/* Pair 5: UX Writing - Description */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ padding: spacing.primitive[4] }}>
                      <InlineCode>설명은 한 줄로 작성</InlineCode>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ padding: spacing.primitive[4] }}>
                      <InlineCode>설명에 여러 문장 나열</InlineCode>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
                  <strong>Do</strong> 보조 설명은 간결하게 한 줄로 유지합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
                  <strong>Don&apos;t</strong> 긴 설명은 섹션 헤더의 간결함을 해칩니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding X</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>spacing.primitive.4</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding Top</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>spacing.primitive.4</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding Bottom</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>spacing.primitive.2</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Weight</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>600</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Title Color</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>content.base.default</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>var(--content-base-default)</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Description Color</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>content.base.secondary</td>
                <td style={{ padding: "12px 16px" }}>var(--content-base-secondary)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: spacing.primitive[4] }}>
          <PrincipleCard
            number={1}
            title="Semantic Structure"
            desc="필요시 <h2> 또는 <h3> 태그로 래핑하여 스크린 리더 지원"
          />
          <PrincipleCard
            number={2}
            title="Color Contrast"
            desc="배경색과 충분한 대비 유지 (최소 4.5:1 비율)"
          />
          <PrincipleCard
            number={3}
            title="Touch Target"
            desc="Action 버튼의 터치 영역은 최소 44x44px 확보"
          />
        </div>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>컴포넌트</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>용도</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>차이점</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Accordion</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>섹션 구분</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Accordion은 접고 펼침 가능, SectionHeader는 고정 제목</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Card</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>영역 구분</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Card는 콘텐츠 컨테이너, SectionHeader는 제목만 표시</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ListCell</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>항목 표시</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ListCell은 리스트 행, SectionHeader는 섹션 시작점</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <a
            href="https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/SectionHeader"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--content-brand-default)", textDecoration: "none", fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}
          >
            View on GitHub →
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { SectionHeader } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="내 자산" />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<SectionHeader title="내 자산" />`} />
      </Section>

      <Section title="With Action Button">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="+0.5 ETH" valueColor="var(--content-success-default)" />
              <ListCellSimple title="Bitcoin" value="-0.02 BTC" valueColor="var(--content-error-default)" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`import { SectionHeader, TextButton } from '@baerae-zkap/design-system';

<SectionHeader
  title="최근 거래"
  action={
    <TextButton size="small" color="primary" onClick={() => navigate('/transactions')}>
      전체보기
    </TextButton>
  }
/>`} />
      </Section>

      <Section title="With Description">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="내 자산" description="최근 30일" descriptionPosition="top" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="거래소 연동" description="2개 연결됨" descriptionPosition="bottom" action={<ActionButton>+ 추가</ActionButton>} />
              <ListCellSimple title="업비트" value="연결됨" valueColor="var(--content-success-default)" />
              <ListCellSimple title="빗썸" value="연결하기" valueColor="var(--content-brand-default)" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`// description top (기본값) — 날짜, 기간, 개수 등
<SectionHeader
  title="내 자산"
  description="최근 30일"
  descriptionPosition="top"
  action={<TextButton size="small">전체보기</TextButton>}
/>

// description bottom — 제목 강조 후 부연 설명
<SectionHeader
  title="거래소 연동"
  description="2개 연결됨"
  descriptionPosition="bottom"
  action={<TextButton size="small">+ 추가</TextButton>}
/>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
              <SectionHeaderDemo size="small" title="Small (13px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
              <SectionHeaderDemo size="medium" title="Medium (14px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
              <SectionHeaderDemo size="large" title="Large (15px)" />
              <ListCellSimple title="Item 1" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<SectionHeader size="small" title="Small" />
<SectionHeader size="medium" title="Medium" />
<SectionHeader size="large" title="Large" />`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "title", type: "ReactNode", required: true, description: "섹션 타이틀" },
              { name: "description", type: "ReactNode", required: false, description: "보조 설명 텍스트 (날짜, 카운트 등)" },
              { name: "descriptionPosition", type: '"top" | "bottom"', required: false, defaultVal: '"top"', description: "description 표시 위치. top=타이틀 위, bottom=타이틀 아래" },
              { name: "action", type: "ReactNode", required: false, description: "우측 액션 영역 (TextButton, 링크 등)" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "타이틀 크기 및 패딩" },
            ]}
          />
        </Subsection>

        <Subsection title="Web-specific Props">
          <PropsTable
            props={[
              { name: "style", type: "React.CSSProperties", required: false, description: "커스텀 스타일" },
              { name: "className", type: "string", required: false, description: "CSS 클래스명" },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}

// Demo Components
function SectionHeaderDemo({ title, description, descriptionPosition, action, size = "medium" }: { title: React.ReactNode; description?: React.ReactNode; descriptionPosition?: 'top' | 'bottom'; action?: React.ReactNode; size?: SectionHeaderSize }) {
  return (
    <SectionHeader title={title} description={description} descriptionPosition={descriptionPosition} action={action} size={size} />
  );
}

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      color: "var(--content-brand-default)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
    }}>
      {children}
    </button>
  );
}

function SHStateCard({ label, sublabel, children }: {
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

function ListCellSimple({ title, value, icon, valueColor }: { title: string; value?: string; icon?: string; valueColor?: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-solid-alternative)",
    }}>
      <span style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-default)" }}>{title}</span>
      {value && <span style={{ fontSize: typography.fontSize.compact, color: valueColor || "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>{value}</span>}
      {icon && <span style={{ fontSize: 18, color: "var(--content-base-neutral)" }}>{icon}</span>}
    </div>
  );
}
