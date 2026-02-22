"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { ListCard, ContentBadge, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";
import { BRAND_EXTERNAL_COLORS } from "@/tokens/brandExternal";

// GitHub source URLs
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/ListCard";
const LISTCARD_SOURCE = `${GITHUB_BASE}/ListCard.tsx`;

// Types
type ListCardVariant = "filled" | "outlined";

export default function ListCardPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "List Card" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        List Card
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        썸네일과 텍스트 정보를 수평으로 배치하여 리스트 형태로 표시하는 컴포넌트입니다.
      </p>

      <ListCardPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ListCardPlayground() {
  const [variant, setVariant] = useState<ListCardVariant>("filled");
  const [hasThumbnail, setHasThumbnail] = useState(true);
  const [hasBadges, setHasBadges] = useState(true);
  const [hasSubtitle, setHasSubtitle] = useState(true);
  const [hasMeta, setHasMeta] = useState(true);
  const [hasAction, setHasAction] = useState(false);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: `${spacing.primitive[8]}px ${spacing.primitive[6]}px`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <ListCard
              variant={variant}
              thumbnail={hasThumbnail ? <EthereumIcon size={56} /> : undefined}
              badges={hasBadges ? <TrendBadge trend="up" value="+5.2%" /> : undefined}
              title="Ethereum"
              subtitle={hasSubtitle ? "0.7812 ETH" : undefined}
              meta={hasMeta ? "₩3,245,000" : undefined}
              action={hasAction ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              ) : undefined}
              onClick={() => {}}
            />
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
              gap: spacing.primitive[7],
              backgroundColor: "var(--surface-base-default)",
              borderRadius: radius.primitive.lg,
            }}>
              <RadioGroup
                label="Variant"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "outlined", label: "Outlined" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ListCardVariant)}
              />
              <RadioGroup
                label="Thumbnail"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasThumbnail ? "true" : "false"}
                onChange={(v) => setHasThumbnail(v === "true")}
              />
              <RadioGroup
                label="Badges"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasBadges ? "true" : "false"}
                onChange={(v) => setHasBadges(v === "true")}
              />
              <RadioGroup
                label="Subtitle"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasSubtitle ? "true" : "false"}
                onChange={(v) => setHasSubtitle(v === "true")}
              />
              <RadioGroup
                label="Meta"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasMeta ? "true" : "false"}
                onChange={(v) => setHasMeta(v === "true")}
              />
              <RadioGroup
                label="Action"
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

// ============================================
// Design Tab Content
// ============================================
function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>ListCard</InlineCode> 컴포넌트는 썸네일과 텍스트 정보를 수평으로 배치하여 리스트 형태로 표시해요.
          미디어 콘텐츠와 텍스트 정보를 함께 보여줄 때 적합해요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: "var(--surface-base-container)", borderRadius: radius.primitive.lg, padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="400" height="130" viewBox="0 0 400 130" overflow="visible">
            <defs>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1"/>
              </filter>
            </defs>
            {/* Card */}
            <rect x="20" y="10" width="360" height="110" rx="12" fill="var(--surface-base-default)" stroke="var(--border-solid-alternative)" strokeWidth="1" filter="url(#shadow)" />
            {/* Thumbnail */}
            <rect x="46" y="18" width="68" height="68" rx="8" fill="var(--surface-base-container)" />
            {/* Badge */}
            <rect x="122" y="22" width="40" height="14" rx="4" fill="var(--surface-brand-default)" />
            {/* Title */}
            <rect x="122" y="42" width="140" height="12" rx="4" fill="var(--content-base-default)" />
            {/* Subtitle */}
            <rect x="122" y="60" width="110" height="10" rx="4" fill="var(--content-base-alternative)" />
            {/* Meta */}
            <rect x="122" y="76" width="60" height="12" rx="4" fill="var(--content-base-default)" />
            {/* Action */}
            <rect x="332" y="28" width="30" height="54" rx="6" fill="var(--surface-base-container)" />

            {/* Label 1: Thumbnail — top */}
            <line x1="80" y1="-4" x2="80" y2="18" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="-14" r="10" fill="var(--content-base-default)" />
            <text x="80" y="-10" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="10" fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Label 3: Badges — top */}
            <line x1="142" y1="-4" x2="142" y2="22" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="142" cy="-14" r="10" fill="var(--content-base-default)" />
            <text x="142" y="-10" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="10" fontWeight={typography.fontWeight.semibold}>3</text>

            {/* Label 4: Action — top */}
            <line x1="347" y1="-4" x2="347" y2="28" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="347" cy="-14" r="10" fill="var(--content-base-default)" />
            <text x="347" y="-10" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="10" fontWeight={typography.fontWeight.semibold}>4</text>

            {/* Label 2: Content — bottom */}
            <line x1="240" y1="120" x2="240" y2="134" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="240" cy="144" r="10" fill="var(--content-base-default)" />
            <text x="240" y="148" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="10" fontWeight={typography.fontWeight.semibold}>2</text>

          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[5], fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>
          <div>1. Thumbnail</div>
          <div>2. Content (Title, Subtitle, Meta)</div>
          <div>3. Badges</div>
          <div>4. Action</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>variant</InlineCode> prop을 통해 2가지 스타일을 사용할 수 있어요. 각 variant는 시각적 구분 방식이 달라요.
        </p>

        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <div>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Filled - 배경색으로 영역 표시</p>
              <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.5000 ETH" meta="₩2,100,000" />
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Outlined - 테두리로 영역 구분</p>
              <ListCardDemo variant="outlined" thumbnail={<BitcoinIcon size={40} />} title="Bitcoin" subtitle="0.0234 BTC" meta="₩2,890,000" />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          ListCard의 배경색과 테두리는 variant에 따라 결정되며, 강조 표시를 위해 border 색상을 커스터마이징할 수 있어요.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Variant</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Background</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Border</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Shadow</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>outlined</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>surface.base.default</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>border.base.default</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>none</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>filled</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>surface.base.default</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>none</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>none</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Highlighted Border">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            특정 카드를 강조하기 위해 border 색상을 변경할 수 있어요. 예를 들어 &quot;Best&quot; 옵션을 표시할 때 사용해요.
          </p>
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
              <div style={{ border: "2px solid var(--border-brand-default)", borderRadius: radius.primitive.md }}>
                <ListCardDemo variant="outlined" thumbnail={<EthereumIcon size={40} />} badges={<span style={{ display: "inline-flex", padding: "2px 8px", fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-brand-default)", backgroundColor: "var(--surface-brand-secondary)", borderRadius: radius.primitive.xs }}>Best</span>} title="ZKAP 최적구매" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
              </div>
              <ListCardDemo variant="outlined" thumbnail={<BitcoinIcon size={40} />} title="빗썸" subtitle="0.7788 ETH" meta="- 1,600원" onClick={() => {}} />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          ListCard는 사용자 상호작용에 따라 다양한 상태를 가져요. 각 상태는 시각적으로 구분되어 피드백을 제공해요.
        </p>

        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            <div>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Default</p>
              <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>Pressed</p>
              <div style={{ backgroundColor: "var(--surface-base-container)", borderRadius: radius.primitive.md }}>
                <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
              </div>
            </div>
          </div>
        </PreviewBox>

        <div style={{ marginTop: spacing.primitive[4], padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, fontSize: typography.fontSize.compact }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 스타일 (variant별 배경/테두리)<br />
            <strong style={{ color: "var(--text-primary)" }}>Pressed/Hover:</strong> outlined → <InlineCode>surface.base.alternative</InlineCode>, filled → <InlineCode>surface.base.container</InlineCode>
          </p>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            ListCard는 클릭 가능한 카드로, 사용자 상호작용에 따라 배경색과 그림자 변화로 피드백을 제공해요.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <StateCard label="Default" sublabel="기본 상태">
              <div style={{ width: 130, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
                <div style={{ width: 28, height: 28, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-alternative)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 6, width: "70%", backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
                  <div style={{ height: 5, width: "50%", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, marginTop: spacing.primitive[1] }} />
                </div>
              </div>
            </StateCard>
            <StateCard label="Hover" sublabel="마우스 오버">
              <div style={{ width: 130, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
                <div style={{ width: 28, height: 28, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-alternative)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 6, width: "70%", backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
                  <div style={{ height: 5, width: "50%", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, marginTop: spacing.primitive[1] }} />
                </div>
              </div>
            </StateCard>
            <StateCard label="Pressed" sublabel="눌림 상태">
              <div style={{ width: 130, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-alternative)", boxShadow: "none", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
                <div style={{ width: 28, height: 28, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-alternative)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 6, width: "70%", backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
                  <div style={{ height: 5, width: "50%", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, marginTop: spacing.primitive[1] }} />
                </div>
              </div>
            </StateCard>
            <StateCard label="Focused" sublabel="키보드 포커스">
              <div style={{ width: 130, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)", outline: "2px solid var(--content-brand-default)", outlineOffset: 2, display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
                <div style={{ width: 28, height: 28, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-alternative)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 6, width: "70%", backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
                  <div style={{ height: 5, width: "50%", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, marginTop: spacing.primitive[1] }} />
                </div>
              </div>
            </StateCard>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있어요.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageCard
              situation="Product Listing"
              description="상품 목록에서 썸네일과 함께 정보를 표시하는 카드"
              config="filled + thumbnail + badge + meta"
              examples={["상품 목록", "검색 결과", "추천 상품"]}
            />
            <UsageCard
              situation="Price Comparison"
              description="거래소별 가격을 비교하는 카드. highlighted border로 최적 옵션 표시"
              config="outlined + thumbnail + subtitle + meta"
              examples={["거래소 비교", "가격 비교", "플랜 비교"]}
            />
            <UsageCard
              situation="Portfolio Items"
              description="보유 자산이나 포트폴리오 항목을 표시하는 카드"
              config="filled + thumbnail + badge + subtitle + meta"
              examples={["자산 목록", "투자 현황", "보유 코인"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Variant 일관성"
              desc="같은 목록에서는 동일한 variant를 사용하세요. 강조가 필요한 카드는 border 색상을 변경하여 표현합니다. filled와 outlined를 혼합하지 마세요."
            />
            <PrincipleCard
              number={2}
              title="정보 계층 구조"
              desc="Title은 주요 식별 정보, Subtitle은 보조 설명, Meta는 핵심 수치(가격)에 사용하세요. Badge는 상태나 트렌드 정보를 간결히 표시합니다."
            />
            <PrincipleCard
              number={3}
              title="적절한 밀도"
              desc="카드 간 gap은 8-16px를 유지하세요. 너무 빽빽하면 가독성이 떨어지고, 너무 넓으면 연관성이 약해져요. small size는 12px, medium/large는 16px gap을 권장해요."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Pair 1: Consistent variant and size */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2], width: "100%", maxWidth: 260, padding: `0 ${spacing.primitive[2]}px` }}>
                    <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} badges={<TrendBadge trend="up" value="+5.2%" />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
                    <ListCardDemo variant="filled" thumbnail={<BitcoinIcon size={40} />} badges={<TrendBadge trend="down" value="-2.1%" />} title="Bitcoin" subtitle="0.0234 BTC" meta="₩2,890,000" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2], width: "100%", maxWidth: 260, padding: `0 ${spacing.primitive[2]}px` }}>
                    <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} badges={<TrendBadge trend="up" value="+5.2%" />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
                    <ListCardDemo variant="outlined" thumbnail={<BitcoinIcon size={48} />} title="Bitcoin" meta="₩2,890,000" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
                  <span style={{ color: "var(--text-secondary)" }}>같은 목록에서 동일한 variant와 size를 사용합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
                  <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>같은 목록에서 서로 다른 variant, size, 구조를 혼합하지 않습니다.</span>
                </p>
              </div>
            </div>

            {/* Pair 2: Concise info */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 260, padding: `0 ${spacing.primitive[2]}px` }}>
                    <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3.2M" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 260, padding: `0 ${spacing.primitive[2]}px` }}>
                    <ListCardDemo variant="filled" title="Ethereum 이더리움 코인" subtitle="보유량: 0.7812 ETH, 매수가: ₩3,100,000" meta="현재가: ₩3,245,000 (수익률 +4.7%)" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
                  <span style={{ color: "var(--text-secondary)" }}>정보를 간결하게 정리하고 Meta는 핵심 수치만 표시합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
                  <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>한 카드에 너무 많은 정보를 담으면 가독성이 떨어져요.</span>
                </p>
              </div>
            </div>

            {/* Pair 3: UX Writing - title naming */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;삼성전자 005930&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>핵심 식별 정보만 타이틀에 표시</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;삼성전자 주식회사 (005930)&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>불필요한 정보는 서브텍스트로 분리하세요</p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
                  <span style={{ color: "var(--text-secondary)" }}>타이틀에는 핵심 식별 정보만 표시합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
                  <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>불필요한 정보를 타이틀에 포함하지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Pair 4: UX Writing - meta formatting */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;72,300원&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>Meta에는 수치만 표시</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;현재가: 72,300원&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>레이블이 이미 있으면 반복하지 마세요</p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
                  <span style={{ color: "var(--text-secondary)" }}>Meta에는 수치만 간결하게 표시합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
                  <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>레이블이 이미 있으면 반복하지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Pair 5: UX Writing - subtitle hierarchy */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>서브텍스트에 보조 정보</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>정보 계층을 활용하세요</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>타이틀에 모든 정보 넣기</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>타이틀이 길어지면 가독성이 떨어져요</p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
                  <span style={{ color: "var(--text-secondary)" }}>정보 계층을 활용하여 Title/Subtitle/Meta를 구분합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
                  <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>타이틀에 모든 정보를 넣으면 가독성이 떨어져요.</span>
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          ListCard 컴포넌트에 적용된 Foundation 기반 디자인 토큰이에요.
        </p>

        <Subsection title="Spacing & Layout">
          <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[5] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Border Radius", "radius.component.card.sm", "12px"],
                  ["Thumbnail Radius", "radius.primitive.sm", "8px"],
                  ["Padding (small)", "spacing.primitive[3]", "12px"],
                  ["Padding (medium)", "spacing.primitive[4]", "16px"],
                  ["Padding (large)", "spacing.primitive[4]", "16px"],
                  ["Gap (small/medium)", "spacing.primitive[3]", "12px"],
                  ["Gap (large)", "spacing.primitive[4]", "16px"],
                  ["Content gap", "spacing.primitive[1]", "4px"],
                  ["Badge margin-bottom", "spacing.primitive[1]", "4px"],
                  ["Meta margin-top", "spacing.primitive[1]", "4px"],
                ].map(([prop, token, value], i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : undefined }}>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>{prop}</td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>{token}</InlineCode></td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Thumbnail Size (Size별)">
          <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[5] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["small", "spacing.component.listCard.thumbnailSize.sm", "56px"],
                  ["medium", "spacing.component.listCard.thumbnailSize.md", "80px"],
                  ["large", "spacing.component.listCard.thumbnailSize.lg", "100px"],
                ].map(([size, token, value], i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : undefined }}>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>{size}</InlineCode></td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>{token}</InlineCode></td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography">
          <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[5] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Element</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Title (small)", "typography.fontSize.sm + fontWeight.semibold", "14px / 600"],
                  ["Title (medium/large)", "typography.fontSize.md + fontWeight.semibold", "16px / 600"],
                  ["Subtitle (small)", "typography.fontSize.xs + fontWeight.regular", "12px / 400"],
                  ["Subtitle (medium)", "typography.fontSize.compact + fontWeight.regular", "13px / 400"],
                  ["Subtitle (large)", "typography.fontSize.sm + fontWeight.regular", "14px / 400"],
                  ["Meta (small)", "typography.fontSize.compact + fontWeight.bold", "13px / 700"],
                  ["Meta (medium)", "typography.fontSize.sm + fontWeight.bold", "14px / 700"],
                  ["Meta (large)", "typography.fontSize.md + fontWeight.bold", "16px / 700"],
                ].map(([el, token, value], i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : undefined }}>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>{el}</td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>{token}</InlineCode></td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Colors">
          <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[5] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Element</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>CSS Variable</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["BG (filled)", "surface.base.default", "var(--surface-base-default)"],
                  ["BG (outlined)", "surface.base.default", "var(--surface-base-default)"],
                  ["BG pressed (outlined)", "surface.base.alternative", "var(--surface-base-alternative)"],
                  ["BG pressed (filled)", "surface.base.container", "var(--surface-base-container)"],
                  ["Border (outlined)", "border.base.default", "var(--border-base-default)"],
                  ["Thumbnail BG", "surface.base.container", "var(--surface-base-container)"],
                  ["Title color", "content.base.default", "var(--content-base-default)"],
                  ["Subtitle color", "content.base.secondary", "var(--content-base-secondary)"],
                  ["Meta color", "content.base.default", "var(--content-base-default)"],
                ].map(([el, token, cssVar], i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : undefined }}>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>{el}</td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>{token}</InlineCode></td>
                    <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>{cssVar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          ListCard 컴포넌트는 웹 접근성 표준을 준수해요.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>onClick가 있으면 자동 설정</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>alt</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>썸네일 이미지에 적절한 alt 텍스트 필수</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>keyboard</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Enter/Space 키로 활성화 가능</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard number={1} title="Interactive Card" desc="onClick가 있으면 role='button'이 자동 설정돼요. 전체 카드 영역이 클릭 가능해요." />
            <PrincipleCard number={2} title="Image Alt" desc="썸네일 이미지에 적절한 alt 텍스트를 제공하세요. 아이콘의 경우 역할을 설명하는 텍스트를 사용해요." />
            <PrincipleCard number={3} title="Focus Indicator" desc="키보드 포커스 시 시각적 표시가 나타나요. outline이 카드 외곽에 2px offset으로 표시돼요." />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ListCell</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>리스트 항목</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ListCell은 텍스트 위주, ListCard는 썸네일 포함</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Card</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>콘텐츠 그룹화</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Card는 자유 레이아웃, ListCard는 수평 정렬 고정</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Thumbnail</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>이미지 표시</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Thumbnail은 ListCard 내부 썸네일 영역에 사용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ============================================
// Web Tab Content
// ============================================
function WebContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>ListCard Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={LISTCARD_SOURCE}
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

      <Section title="Import">
        <CodeBlock code={`import { ListCard } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6] }}>
            <ListCardDemo variant="filled" thumbnail={<ThumbnailDemo />} badges={<BadgeDemo />} title="프리미엄 무선 이어폰" subtitle="고음질 블루투스 5.3 지원" meta="₩89,000" onClick={() => {}} />
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCard
  thumbnail={<img src="product.jpg" alt="상품 이미지" />}
  badges={<ContentBadge color="primary">NEW</ContentBadge>}
  title="프리미엄 무선 이어폰"
  subtitle="고음질 블루투스 5.3 지원"
  meta="₩89,000"
  onClick={() => {}}
/>`} />
      </Section>

      <Section title="Variants">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} title="Filled" subtitle="배경 스타일" meta="₩3,245,000" onClick={() => {}} />
            <ListCardDemo variant="outlined" thumbnail={<EthereumIcon size={40} />} title="Outlined" subtitle="테두리 스타일" meta="₩3,245,000" onClick={() => {}} />
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCard variant="filled" title="Filled" onClick={() => {}} />
<ListCard variant="outlined" title="Outlined" onClick={() => {}} />`} />
      </Section>

      <Section title="Colors">
        <Subsection title="Highlighted Card">
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
              <div style={{ border: "2px solid var(--border-brand-default)", borderRadius: radius.primitive.md }}>
                <ListCardDemo variant="outlined" thumbnail={<EthereumIcon size={40} />} badges={<span style={{ display: "inline-flex", padding: "2px 8px", fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-brand-default)", backgroundColor: "var(--surface-brand-secondary)", borderRadius: radius.primitive.xs }}>Best</span>} title="ZKAP 최적구매" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
              </div>
              <ListCardDemo variant="outlined" thumbnail={<BitcoinIcon size={40} />} title="빗썸" subtitle="0.7788 ETH" meta="- 1,600원" onClick={() => {}} />
            </div>
          </PreviewBox>
          <CodeBlock code={`{/* Highlighted - Best 옵션 */}
<ListCard
  variant="outlined"
  style={{ borderColor: 'var(--content-brand-default)', borderWidth: 2 }}
  thumbnail={<ZkapLogo />}
  badges={<Badge color="purple">Best</Badge>}
  title="ZKAP 최적구매"
  subtitle="0.7812 ETH"
  meta="₩3,245,000"
  onClick={() => selectExchange('zkap')}
/>

{/* Normal */}
<ListCard
  variant="outlined"
  thumbnail={<BithumbLogo />}
  title="빗썸"
  subtitle="0.7788 ETH"
  meta="- 1,600원"
  onClick={() => selectExchange('bithumb')}
/>`} />
        </Subsection>
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <ListCardDemo variant="filled" thumbnail={<EthereumIcon size={40} />} title="Default" subtitle="클릭 가능" meta="₩3,245,000" onClick={() => {}} />
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCard
  title="Default"
  subtitle="클릭 가능"
  meta="₩3,245,000"
  onClick={() => {}}
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "variant", type: '"filled" | "outlined"', required: false, defaultVal: '"filled"', description: "카드 스타일" },
              { name: "thumbnail", type: "ReactNode", required: false, description: "좌측 썸네일" },
              { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
              { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
              { name: "meta", type: "ReactNode", required: false, description: "메타 정보 (가격)" },
              { name: "badges", type: "ReactNode", required: false, description: "상단 배지 영역" },
              { name: "action", type: "ReactNode", required: false, description: "우측 액션 영역" },
            ]}
          />
        </Subsection>
        <Subsection title="Web-specific Props">
          <PropsTable
            props={[
              { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
              { name: "aria-label", type: "string", required: false, description: "스크린 리더용 레이블" },
            ]}
          />
        </Subsection>
      </Section>
    </>
  );
}

// ============================================
// Layout Components
// ============================================

function UsageCard({ situation, description, config, examples }: {
  situation: string;
  description: string;
  config: string;
  examples: string[];
}) {
  return (
    <div style={{
      padding: spacing.primitive[4],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2], marginBottom: spacing.primitive[1] }}>
        <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{situation}</span>
        <span style={{
          fontSize: typography.fontSize.xs,
          padding: "2px 6px",
          backgroundColor: "var(--surface-base-alternative)",
          color: "var(--content-base-secondary)",
          borderRadius: radius.primitive.xs,
          fontWeight: typography.fontWeight.medium,
        }}>
          {config}
        </span>
      </div>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: spacing.primitive[1] }}>{description}</p>
      <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>
        예시: {examples.join(", ")}
      </p>
    </div>
  );
}


// ============================================
// Demo Components
// ============================================
function EthereumIcon({ size = 48 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill={BRAND_EXTERNAL_COLORS.crypto.ethereum}>
        <path d="M12 1.5l-7 10.5 7 4 7-4-7-10.5z" opacity="0.6" />
        <path d="M12 22.5l-7-10 7 4 7-4-7 10z" />
      </svg>
    </div>
  );
}

function BitcoinIcon({ size = 48 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: "var(--surface-warning-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill={BRAND_EXTERNAL_COLORS.crypto.bitcoin}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 15h-1v1.5h-1V17h-1v1.5h-1V17H8v-1h1v-8H8V7h1.5V5.5h1V7h1V5.5h1V7c1.38 0 2.5 1.12 2.5 2.5 0 .82-.4 1.54-1 2 .83.46 1.5 1.37 1.5 2.5 0 1.38-1.12 2.5-2.5 2.5h-.5v1h-1v-1zm-.5-7c.55 0 1-.45 1-1s-.45-1-1-1h-2v2h2zm.5 5c.55 0 1-.45 1-1s-.45-1-1-1h-2.5v2H13z" />
      </svg>
    </div>
  );
}

function ThumbnailDemo({ size = 80 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, backgroundColor: "var(--surface-base-container)", borderRadius: radius.primitive.sm, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" stroke="var(--icon-secondary)" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}

function BadgeDemo() {
  return (
    <ContentBadge color="primary">NEW</ContentBadge>
  );
}

function TrendBadge({ trend, value }: { trend: "up" | "down"; value: string }) {
  const isUp = trend === "up";
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      height: spacing.primitive[5],
      padding: `0 ${spacing.primitive[2]}px`,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      color: isUp ? "var(--content-success-default)" : "var(--content-error-default)",
      backgroundColor: isUp ? "var(--surface-success-default)" : "var(--surface-error-default)",
      borderRadius: radius.primitive.xs
    }}>
      {isUp ? "▲" : "▼"} {value}
    </span>
  );
}

function ListCardDemo({
  variant = "filled",
  thumbnail,
  badges,
  title,
  subtitle,
  meta,
  onClick,
}: {
  variant?: ListCardVariant;
  thumbnail?: React.ReactNode;
  badges?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <ListCard
      variant={variant}
      thumbnail={thumbnail}
      badges={badges}
      title={title}
      subtitle={subtitle}
      meta={meta}
      onClick={onClick}
    />
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
