"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { SectionHeader } from '@baerae-zkap/design-system';
import type { SectionHeaderSize } from '@baerae-zkap/design-system';
import { Section, Subsection } from "@/components/docs/Section";
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

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Section Header
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
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

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, backgroundColor: "var(--surface-base-default)", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo
                size={size}
                title="내 자산"
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
            padding: 16,
            overflow: "hidden",
            height: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              padding: 24,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              backgroundColor: "var(--surface-base-default)",
              borderRadius: 16,
            }}>
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small (13px)" },
                  { value: "medium", label: "Medium (14px)" },
                  { value: "large", label: "Large (15px)" },
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
      gap: 4,
      padding: 16,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 2 }}>{description}</p>
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>{example}</p>
    </div>
  );
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Overview */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>개요</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 24 }}>
          SectionHeader는 콘텐츠 영역의 제목과 부가 액션을 표시하는 컴포넌트입니다. 섹션을 시각적으로 구분하고 컨텍스트를 제공합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ padding: 24, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 12 }}>이런 경우 사용하세요</h3>
            <ul style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", paddingLeft: 20, margin: 0 }}>
              <li>콘텐츠 섹션의 시작 부분에 제목을 표시할 때</li>
              <li>섹션 제목과 함께 &apos;더보기&apos; 등의 액션이 필요할 때</li>
              <li>화면 내 여러 섹션을 구분할 때</li>
            </ul>
          </div>
          <div style={{ padding: 24, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 12 }}>이런 경우 사용하지 마세요</h3>
            <ul style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", paddingLeft: 20, margin: 0 }}>
              <li>페이지 최상위 제목에는 사용하지 마세요 — 페이지 헤더를 사용하세요</li>
              <li>Accordion처럼 접을 수 있는 기능이 필요하면 Accordion을 사용하세요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: "var(--surface-base-container)", borderRadius: 16, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
          <div>1. Title</div>
          <div style={{ textAlign: "right" }}>2. Action (Optional)</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          SectionHeader는 구성 요소의 조합에 따라 다양한 variant로 사용됩니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <VariantCard
            name="Title Only"
            description="타이틀만 표시하는 가장 기본적인 형태. 섹션 구분이 주요 목적입니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeaderDemo title="내 자산" />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: 13, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard
            name="With Action Button"
            description="우측에 TextButton 액션을 배치하여 섹션 전체를 제어하는 동작을 제공합니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: 13, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard
            name="With Subtitle"
            description="타이틀 아래에 보조 설명을 추가하여 섹션의 맥락을 제공합니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--content-base-neutral)", textTransform: "uppercase" as const, letterSpacing: "0.02em" }}>내 자산</div>
                <div style={{ fontSize: 12, color: "var(--content-base-assistive)", marginTop: 2 }}>총 3개 자산 보유 중</div>
              </div>
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: 13, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard
            name="With Subtitle + Action"
            description="보조 설명과 액션 버튼을 모두 포함하는 가장 풍부한 형태입니다."
          >
            <div style={{ width: "100%", maxWidth: 280 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--content-base-neutral)", textTransform: "uppercase" as const, letterSpacing: "0.02em" }}>거래소 연동</div>
                  <div style={{ fontSize: 12, color: "var(--content-base-assistive)", marginTop: 2 }}>2개 연결됨</div>
                </div>
                <ActionButton>+ 추가</ActionButton>
              </div>
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: 13, color: "var(--content-base-neutral)" }}>List items...</div>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* ZKAP Examples */}
      <Section title="ZKAP Examples">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="내 자산" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              <ListCellSimple title="Solana" value="₩1,560,000" />
            </div>

            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeaderDemo title="설정" />
              <ListCellSimple title="알림 설정" icon="›" />
              <ListCellSimple title="보안" icon="›" />
              <ListCellSimple title="계정 정보" icon="›" />
            </div>

            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
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
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, border: "1px solid var(--divider)", overflow: "hidden", maxWidth: 360 }}>
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
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          SectionHeader는 요소별로 다른 색상을 사용하여 시각적 계층을 만듭니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Element</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Title</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-neutral)" }} />
                    <code style={{ fontSize: 12 }}>var(--content-base-neutral)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>content.base.neutral</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Subtitle</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-assistive)" }} />
                    <code style={{ fontSize: 12 }}>var(--content-base-assistive)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>content.base.assistive</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Action (Brand)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-brand-default)" }} />
                    <code style={{ fontSize: 12 }}>var(--content-brand-default)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>content.brand.default</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Action (Base)</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-secondary)" }} />
                    <code style={{ fontSize: 12 }}>var(--content-base-secondary)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>content.base.secondary</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          SectionHeader는 컨텍스트에 따라 다양한 상태를 가질 수 있습니다.
        </p>

        <Subsection title="Default">
          <PreviewBox>
            <div style={{ padding: 24, width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
                <SectionHeaderDemo title="내 자산" action={<ActionButton>전체보기</ActionButton>} />
                <ListCellSimple title="Ethereum" value="₩3,245,000" />
                <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: 12, padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            기본 상태. 타이틀과 선택적 액션 버튼이 표시됩니다.
          </div>
        </Subsection>

        <Subsection title="With Collapsible">
          <PreviewBox>
            <div style={{ padding: 24, width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 16px 8px 16px",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--content-base-neutral)", textTransform: "uppercase" as const, letterSpacing: "0.02em" }}>내 자산</div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-neutral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <ListCellSimple title="Ethereum" value="₩3,245,000" />
                <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: 12, padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            접기/펼치기 가능한 상태. 우측에 chevron 아이콘으로 상태를 표시합니다.
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding X</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--content-brand-default)", fontSize: 12 }}>spacing.primitive.4</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding Top</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--content-brand-default)", fontSize: 12 }}>spacing.primitive.4</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding Bottom</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--content-brand-default)", fontSize: 12 }}>spacing.primitive.2</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Weight</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--content-brand-default)", fontSize: 12 }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>600</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Text Color</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)", fontSize: 12 }}>content.base.neutral</td>
                <td style={{ padding: "12px 16px" }}>var(--content-base-neutral)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Usage Guidelines with Recommended Combinations */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 패턴을 따르세요. SectionHeader는 항상 <strong style={{ color: "var(--text-primary)" }}>리스트 컴포넌트와 조합</strong>하여 사용합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
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
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="Clear Hierarchy"
              desc="섹션 헤더는 콘텐츠를 논리적으로 그룹화하고 시각적 계층을 만듭니다."
            />
            <PrincipleCard
              number={2}
              title="Consistent Styling"
              desc="uppercase 스타일과 회색 컬러를 사용하여 일관된 스타일을 유지합니다."
            />
            <PrincipleCard
              number={3}
              title="Optional Actions"
              desc="우측 액션 버튼은 선택사항이며, 있을 경우 섹션 전체를 제어하는 동작이어야 합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
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

      {/* Best Practices - 2x2 Do/Don't Grid */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 220 }}>
              <SectionHeaderDemo title="내 자산" />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: 12, color: "var(--content-base-neutral)" }}>List items</div>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 220, padding: "12px 16px" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--content-base-default)" }}>내 자산 현황 목록입니다</div>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, paddingLeft: 4 }}>간결한 타이틀 사용 (2-3단어)</p>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, paddingLeft: 4 }}>긴 문장이나 설명을 타이틀에 사용</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 220 }}>
              <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: "8px 16px", fontSize: 12, color: "var(--content-base-neutral)" }}>List items</div>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 220 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--content-base-neutral)", textTransform: "uppercase" as const }}>최근 거래</div>
                <button style={{ padding: "8px 16px", backgroundColor: "var(--content-brand-default)", color: "var(--content-base-onColor)", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>전체보기</button>
              </div>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, paddingLeft: 4 }}>작은 TextButton을 action으로 사용</p>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, paddingLeft: 4 }}>큰 Button을 action으로 사용하지 않기</p>
        </div>
      </Section>

      {/* Related Components */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>관련 컴포넌트</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>컴포넌트</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>용도</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>차이점</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Accordion</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>섹션 구분</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Accordion은 접고 펼침 가능, SectionHeader는 고정 제목</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Card</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>영역 구분</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Card는 콘텐츠 컨테이너, SectionHeader는 제목만 표시</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>ListCell</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>항목 표시</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ListCell은 리스트 행, SectionHeader는 섹션 시작점</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--surface-base-alternative)", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <a
            href="https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/SectionHeader"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--content-brand-default)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
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
          <div style={{ padding: 24 }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
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
          <div style={{ padding: 24 }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
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
    <TextButton size="small" color="brandDefault" onClick={() => navigate('/transactions')}>
      전체보기
    </TextButton>
  }
/>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
              <SectionHeaderDemo size="small" title="Small (13px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
              <SectionHeaderDemo size="medium" title="Medium (14px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
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
              { name: "title", type: "string", required: true, description: "섹션 타이틀" },
              { name: "action", type: "ReactNode", required: false, description: "우측 액션 영역 (버튼, 링크 등)" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "타이틀 크기" },
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
function SectionHeaderDemo({ title, action, size = "medium" }: { title: string; action?: React.ReactNode; size?: SectionHeaderSize }) {
  return (
    <SectionHeader title={title} action={action} size={size} />
  );
}

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      fontSize: 12,
      fontWeight: 500,
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

function ListCellSimple({ title, value, icon, valueColor }: { title: string; value?: string; icon?: string; valueColor?: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-solid-alternative)",
    }}>
      <span style={{ fontSize: 14, color: "var(--content-base-default)" }}>{title}</span>
      {value && <span style={{ fontSize: 13, color: valueColor || "var(--content-base-secondary)", fontWeight: 500 }}>{value}</span>}
      {icon && <span style={{ fontSize: 18, color: "var(--content-base-neutral)" }}>{icon}</span>}
    </div>
  );
}
