"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { ListCard, ContentBadge } from '@baerae-zkap/design-system';

// GitHub source URLs
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/src/source/components/ListCard";
const LISTCARD_SOURCE = `${GITHUB_BASE}/ListCard.tsx`;

// Types
type ListCardSize = "small" | "medium" | "large";
type ListCardVariant = "elevated" | "outlined" | "filled";

// Size configurations
const sizeConfig: Record<ListCardSize, { padding: number; thumbnailSize: number; gap: number; titleSize: number; subtitleSize: number; metaSize: number; minWidth: number }> = {
  small: { padding: 12, thumbnailSize: 40, gap: 12, titleSize: 14, subtitleSize: 12, metaSize: 13, minWidth: 280 },
  medium: { padding: 16, thumbnailSize: 48, gap: 12, titleSize: 15, subtitleSize: 13, metaSize: 14, minWidth: 320 },
  large: { padding: 20, thumbnailSize: 56, gap: 16, titleSize: 16, subtitleSize: 14, metaSize: 15, minWidth: 360 },
};

export default function ListCardPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "List Card" },
        ]}
      />

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        List Card
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성되며 상품 목록, 가격 비교, 포트폴리오 등에 사용됩니다.
      </p>

      <ListCardPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ListCardPlayground() {
  const [variant, setVariant] = useState<ListCardVariant>("elevated");
  const [size, setSize] = useState<ListCardSize>("medium");
  const [hasThumbnail, setHasThumbnail] = useState(true);
  const [hasBadge, setHasBadge] = useState(true);
  const [hasSubtitle, setHasSubtitle] = useState(true);
  const [hasMeta, setHasMeta] = useState(true);

  const s = sizeConfig[size];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ListCardDemo
              variant={variant}
              size={size}
              thumbnail={hasThumbnail ? <EthereumIcon size={s.thumbnailSize} /> : undefined}
              badges={hasBadge ? <TrendBadge trend="up" value="+5.2%" /> : undefined}
              title="Ethereum"
              subtitle={hasSubtitle ? "0.7812 ETH" : undefined}
              meta={hasMeta ? "₩3,245,000" : undefined}
              onClick={() => {}}
            />
          </div>

          <div style={{
            backgroundColor: "#fafbfc",
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
              backgroundColor: "white",
              borderRadius: 16,
            }}>
              <RadioGroup
                label="Variant"
                options={[
                  { value: "elevated", label: "Elevated" },
                  { value: "outlined", label: "Outlined" },
                  { value: "filled", label: "Filled" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ListCardVariant)}
              />
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as ListCardSize)}
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
                label="Badge"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasBadge ? "true" : "false"}
                onChange={(v) => setHasBadge(v === "true")}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  if (platform === "web") return <WebContent />;
  return <RNContent />;
}

// ============================================
// Design Tab Content
// ============================================
function DesignContent() {
  return (
    <>
      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: "#f5f5f7", borderRadius: 16, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="400" height="120" viewBox="0 0 400 120">
            <rect x="20" y="10" width="360" height="100" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#shadow)" />
            <defs>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1"/>
              </filter>
            </defs>
            <rect x="36" y="26" width="68" height="68" rx="8" fill="#e2e8f0" />
            <rect x="120" y="30" width="40" height="14" rx="4" fill="#2563eb" />
            <rect x="120" y="50" width="160" height="12" rx="4" fill="#334155" />
            <rect x="120" y="68" width="120" height="10" rx="4" fill="#94a3b8" />
            <rect x="120" y="86" width="60" height="12" rx="4" fill="#334155" />

            <line x1="70" y1="0" x2="70" y2="10" stroke="#374151" strokeWidth="1.5" />
            <circle cx="70" cy="0" r="10" fill="#374151" />
            <text x="70" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">1</text>

            <line x1="200" y1="110" x2="200" y2="125" stroke="#374151" strokeWidth="1.5" />
            <circle cx="200" cy="125" r="10" fill="#374151" />
            <text x="200" y="129" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">2</text>

            <line x1="140" y1="30" x2="140" y2="10" stroke="#374151" strokeWidth="1.5" />
            <circle cx="140" cy="0" r="10" fill="#374151" />
            <text x="140" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
          <div>1. Thumbnail</div>
          <div style={{ textAlign: "center" }}>2. Content (Title, Subtitle, Meta)</div>
          <div style={{ textAlign: "right" }}>3. Badges</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>variant</InlineCode> prop을 통해 3가지 스타일을 사용할 수 있습니다. 각 variant는 시각적 구분 방식이 다릅니다.
        </p>

        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Elevated - 그림자로 떠있는 느낌</p>
              <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Outlined - 테두리로 영역 구분</p>
              <ListCardDemo variant="outlined" size="small" thumbnail={<BitcoinIcon size={40} />} title="Bitcoin" subtitle="0.0234 BTC" meta="₩2,890,000" />
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Filled - 배경색으로 영역 표시</p>
              <ListCardDemo variant="filled" size="small" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.5000 ETH" meta="₩2,100,000" />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCard의 배경색과 테두리는 variant에 따라 결정되며, 강조 표시를 위해 border 색상을 커스터마이징할 수 있습니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Variant</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Background</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Border</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Shadow</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>elevated</InlineCode></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>white</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>none</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>0 1px 3px rgba(0,0,0,0.1)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>outlined</InlineCode></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>white</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>1px solid #e2e8f0</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>none</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>filled</InlineCode></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#f8fafc</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>none</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>none</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Highlighted Border">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            특정 카드를 강조하기 위해 border 색상을 변경할 수 있습니다. 예를 들어 &quot;Best&quot; 옵션을 표시할 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ border: "2px solid #8b5cf6", borderRadius: 12 }}>
                <ListCardDemo variant="outlined" size="small" thumbnail={<EthereumIcon size={40} />} badges={<span style={{ display: "inline-flex", padding: "2px 8px", fontSize: 11, fontWeight: 600, color: "#8b5cf6", backgroundColor: "#f5f3ff", borderRadius: 4 }}>Best</span>} title="ZKAP 최적구매" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
              </div>
              <ListCardDemo variant="outlined" size="small" thumbnail={<BitcoinIcon size={40} />} title="빗썸" subtitle="0.7788 ETH" meta="- 1,600원" onClick={() => {}} />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCard는 사용자 상호작용에 따라 다양한 상태를 가집니다. 각 상태는 시각적으로 구분되어 피드백을 제공합니다.
        </p>

        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Default</p>
              <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Pressed / Hover</p>
              <div style={{ backgroundColor: "rgba(0,0,0,0.04)", borderRadius: 12 }}>
                <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Disabled</p>
              <div style={{ opacity: 0.4, pointerEvents: "none" as const }}>
                <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
              </div>
            </div>
          </div>
        </PreviewBox>

        <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, fontSize: 13 }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 스타일 (variant별 배경/테두리/그림자)<br />
            <strong style={{ color: "var(--text-primary)" }}>Pressed/Hover:</strong> 배경색에 rgba(0,0,0,0.04) 오버레이<br />
            <strong style={{ color: "var(--text-primary)" }}>Disabled:</strong> 전체 opacity 감소, 상호작용 불가
          </p>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>size</InlineCode> prop을 통해 3가지 크기를 사용할 수 있습니다. 크기에 따라 padding, 썸네일 크기, 텍스트 크기가 변경됩니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Padding</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Thumbnail</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>40px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>밀도 높은 리스트, 검색 결과</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>16px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>48px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>기본값, 상품 목록</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>20px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>56px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>강조 카드, 거래소 비교</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {(["small", "medium", "large"] as ListCardSize[]).map((s) => (
              <div key={s}>
                <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>{s} (thumbnail: {sizeConfig[s].thumbnailSize}px)</p>
                <ListCardDemo variant="elevated" size={s} thumbnail={<EthereumIcon size={sizeConfig[s].thumbnailSize} />} badges={<TrendBadge trend="up" value="+5.2%" />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="Product Listing"
              description="상품 목록에서 썸네일과 함께 정보를 표시하는 카드"
              config="elevated + thumbnail + badge + meta"
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
              config="elevated + thumbnail + badge + subtitle + meta"
              examples={["자산 목록", "투자 현황", "보유 코인"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="Variant 일관성"
              desc="같은 목록에서는 동일한 variant를 사용하세요. 강조가 필요한 카드는 border 색상을 변경하여 표현합니다. elevated와 outlined를 혼합하지 마세요."
            />
            <PrincipleCard
              number={2}
              title="정보 계층 구조"
              desc="Title은 주요 식별 정보, Subtitle은 보조 설명, Meta는 핵심 수치(가격)에 사용하세요. Badge는 상태나 트렌드 정보를 간결히 표시합니다."
            />
            <PrincipleCard
              number={3}
              title="적절한 밀도"
              desc="카드 간 gap은 8-16px를 유지하세요. 너무 빽빽하면 가독성이 떨어지고, 너무 넓으면 연관성이 약해집니다. small size는 12px, medium/large는 16px gap을 권장합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 260, padding: "0 8px" }}>
              <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} badges={<TrendBadge trend="up" value="+5.2%" />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
              <ListCardDemo variant="elevated" size="small" thumbnail={<BitcoinIcon size={40} />} badges={<TrendBadge trend="down" value="-2.1%" />} title="Bitcoin" subtitle="0.0234 BTC" meta="₩2,890,000" />
            </div>
          </DoCard>
          <DontCard>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 260, padding: "0 8px" }}>
              <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} badges={<TrendBadge trend="up" value="+5.2%" />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3,245,000" />
              <ListCardDemo variant="outlined" size="medium" thumbnail={<BitcoinIcon size={48} />} title="Bitcoin" meta="₩2,890,000" />
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <DoLabel>같은 목록에서 동일한 variant와 size를 사용합니다.</DoLabel>
          <DontLabel>같은 목록에서 서로 다른 variant, size, 구조를 혼합하지 않습니다.</DontLabel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 260, padding: "0 8px" }}>
              <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Ethereum" subtitle="0.7812 ETH" meta="₩3.2M" />
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 260, padding: "0 8px" }}>
              <ListCardDemo variant="elevated" size="small" title="Ethereum 이더리움 코인" subtitle="보유량: 0.7812 ETH, 매수가: ₩3,100,000" meta="현재가: ₩3,245,000 (수익률 +4.7%)" />
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <DoLabel>정보를 간결하게 정리하고 Meta는 핵심 수치만 표시합니다.</DoLabel>
          <DontLabel>한 카드에 너무 많은 정보를 담으면 가독성이 떨어집니다.</DontLabel>
        </div>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCard 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
              {[
                ["Border Radius", "radius.semantic.card.sm", "12px"],
                ["Thumbnail Radius", "radius.primitive.full", "50%"],
                ["Padding (small)", "spacing.primitive.3", "12px"],
                ["Padding (medium)", "spacing.primitive.4", "16px"],
                ["Padding (large)", "spacing.primitive.5", "20px"],
                ["Thumbnail (small)", "-", "40px"],
                ["Thumbnail (medium)", "-", "48px"],
                ["Thumbnail (large)", "-", "56px"],
                ["Gap", "spacing.primitive.3", "12px"],
              ].map(([prop, token, value], i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>{prop}</td>
                  <td style={{ padding: "12px 16px" }}>{token !== "-" ? <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>{token}</code> : "-"}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCard 컴포넌트는 웹 접근성 표준을 준수합니다.
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
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>onClick/onPress가 있으면 자동 설정</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>alt</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>썸네일 이미지에 적절한 alt 텍스트 필수</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>keyboard</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Enter/Space 키로 활성화 가능</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard number={1} title="Interactive Card" desc="onClick/onPress가 있으면 role='button'이 자동 설정됩니다. 전체 카드 영역이 클릭 가능합니다." />
            <PrincipleCard number={2} title="Image Alt" desc="썸네일 이미지에 적절한 alt 텍스트를 제공하세요. 아이콘의 경우 역할을 설명하는 텍스트를 사용합니다." />
            <PrincipleCard number={3} title="Focus Indicator" desc="키보드 포커스 시 시각적 표시가 나타납니다. outline이 카드 외곽에 2px offset으로 표시됩니다." />
          </div>
        </Subsection>
      </Section>
    </>
  );
}

// ============================================
// Web Tab Content
// ============================================
function WebContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ListCard Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={LISTCARD_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              backgroundColor: "#24292f",
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

      <Section title="Import">
        <CodeBlock code={`import { ListCard } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: 24 }}>
            <ListCardDemo variant="elevated" size="medium" thumbnail={<ThumbnailDemo />} badges={<BadgeDemo />} title="프리미엄 무선 이어폰" subtitle="고음질 블루투스 5.3 지원" meta="₩89,000" onClick={() => {}} />
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCard
  thumbnail={<img src="product.jpg" />}
  badges={<ContentBadge color="brandDefault">NEW</ContentBadge>}
  title="프리미엄 무선 이어폰"
  subtitle="고음질 블루투스 5.3 지원"
  meta="₩89,000"
  onClick={() => {}}
/>`} />
      </Section>

      <Section title="Variants">
        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Elevated" subtitle="그림자 스타일" meta="₩3,245,000" onClick={() => {}} />
            <ListCardDemo variant="outlined" size="small" thumbnail={<EthereumIcon size={40} />} title="Outlined" subtitle="테두리 스타일" meta="₩3,245,000" onClick={() => {}} />
            <ListCardDemo variant="filled" size="small" thumbnail={<EthereumIcon size={40} />} title="Filled" subtitle="배경 스타일" meta="₩3,245,000" onClick={() => {}} />
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCard variant="elevated" title="Elevated" onClick={() => {}} />
<ListCard variant="outlined" title="Outlined" onClick={() => {}} />
<ListCard variant="filled" title="Filled" onClick={() => {}} />`} />
      </Section>

      <Section title="Colors">
        <Subsection title="Highlighted Card">
          <PreviewBox>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ border: "2px solid #8b5cf6", borderRadius: 12 }}>
                <ListCardDemo variant="outlined" size="small" thumbnail={<EthereumIcon size={40} />} badges={<span style={{ display: "inline-flex", padding: "2px 8px", fontSize: 11, fontWeight: 600, color: "#8b5cf6", backgroundColor: "#f5f3ff", borderRadius: 4 }}>Best</span>} title="ZKAP 최적구매" subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
              </div>
              <ListCardDemo variant="outlined" size="small" thumbnail={<BitcoinIcon size={40} />} title="빗썸" subtitle="0.7788 ETH" meta="- 1,600원" onClick={() => {}} />
            </div>
          </PreviewBox>
          <CodeBlock code={`{/* Highlighted - Best 옵션 */}
<ListCard
  variant="outlined"
  style={{ borderColor: '#8b5cf6', borderWidth: 2 }}
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

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {(["small", "medium", "large"] as ListCardSize[]).map((s) => (
              <ListCardDemo key={s} variant="elevated" size={s} thumbnail={<EthereumIcon size={sizeConfig[s].thumbnailSize} />} title={`${s.charAt(0).toUpperCase() + s.slice(1)} Size`} subtitle="0.7812 ETH" meta="₩3,245,000" onClick={() => {}} />
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCard size="small" title="Small" onClick={() => {}} />
<ListCard size="medium" title="Medium" onClick={() => {}} />
<ListCard size="large" title="Large" onClick={() => {}} />`} />
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Default" subtitle="클릭 가능" meta="₩3,245,000" onClick={() => {}} />
            <div style={{ opacity: 0.4, pointerEvents: "none" as const }}>
              <ListCardDemo variant="elevated" size="small" thumbnail={<EthereumIcon size={40} />} title="Disabled" subtitle="비활성화" meta="₩3,245,000" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Default */}
<ListCard
  title="Default"
  subtitle="클릭 가능"
  meta="₩3,245,000"
  onClick={() => {}}
/>

{/* Disabled */}
<ListCard
  title="Disabled"
  subtitle="비활성화"
  meta="₩3,245,000"
  disabled
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "variant", type: '"elevated" | "outlined" | "filled"', required: false, defaultVal: '"elevated"', description: "카드 스타일" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
              { name: "thumbnail", type: "ReactNode", required: false, description: "좌측 썸네일" },
              { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
              { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
              { name: "meta", type: "ReactNode", required: false, description: "메타 정보 (가격)" },
              { name: "badges", type: "ReactNode", required: false, description: "상단 뱃지 영역" },
              { name: "action", type: "ReactNode", required: false, description: "우측 액션 영역" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
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
// React Native Tab Content
// ============================================
function RNContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ListCard Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={LISTCARD_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              backgroundColor: "#24292f",
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

      <Section title="Import">
        <CodeBlock code={`import { ListCard } from '@baerae-zkap/design-system/native';`} />
      </Section>

      <Section title="Basic Usage">
        <CodeBlock code={`<ListCard
  thumbnail={<Image source={{ uri: 'product.jpg' }} style={{ width: '100%', height: '100%' }} />}
  badges={<ContentBadge color="brandDefault">NEW</ContentBadge>}
  title="프리미엄 무선 이어폰"
  subtitle="고음질 블루투스 5.3 지원"
  meta="₩89,000"
  onPress={() => navigate('product-detail')}
/>`} />
      </Section>

      <Section title="Variants">
        <CodeBlock code={`{/* Elevated - 그림자 스타일 (기본) */}
<ListCard
  variant="elevated"
  thumbnail={<CryptoIcon symbol="ETH" />}
  title="Ethereum"
  subtitle="0.7812 ETH"
  meta="₩3,245,000"
  onPress={() => {}}
/>

{/* Outlined - 테두리 스타일 */}
<ListCard
  variant="outlined"
  thumbnail={<CryptoIcon symbol="BTC" />}
  title="Bitcoin"
  subtitle="0.0234 BTC"
  meta="₩2,890,000"
  onPress={() => {}}
/>

{/* Filled - 배경 스타일 */}
<ListCard
  variant="filled"
  thumbnail={<CryptoIcon symbol="SOL" />}
  title="Solana"
  subtitle="12.5 SOL"
  meta="₩1,560,000"
  onPress={() => {}}
/>`} />
      </Section>

      <Section title="Colors">
        <CodeBlock code={`{/* 거래소별 가격 비교 카드 */}
<View style={{ gap: 12 }}>
  {/* ZKAP 최적구매 - Best 옵션 (highlighted) */}
  <ListCard
    variant="outlined"
    style={{ borderColor: '#8b5cf6', borderWidth: 2 }}
    thumbnail={<ZkapLogo />}
    title="ZKAP 최적구매"
    subtitle={<Text style={{ color: '#3b82f6', fontSize: 24, fontWeight: '700' }}>0.7812 ETH</Text>}
    badges={<Badge color="purple">Best</Badge>}
    onPress={() => selectExchange('zkap')}
  />

  {/* 빗썸 - 일반 옵션 */}
  <ListCard
    variant="outlined"
    thumbnail={<BithumbLogo />}
    title="빗썸"
    subtitle={<Text style={{ fontSize: 24, fontWeight: '700' }}>0.7788 ETH</Text>}
    meta={<Text style={{ color: '#64748b' }}>- 1,600원</Text>}
    onPress={() => selectExchange('bithumb')}
  />
</View>`} />
      </Section>

      <Section title="Sizes">
        <CodeBlock code={`{/* Small - 밀도 높은 리스트 */}
<ListCard size="small" title="Small (padding: 12px)" onPress={() => {}} />

{/* Medium - 기본 (default) */}
<ListCard size="medium" title="Medium (padding: 16px)" onPress={() => {}} />

{/* Large - 강조 카드 */}
<ListCard size="large" title="Large (padding: 20px)" onPress={() => {}} />`} />
      </Section>

      <Section title="States">
        <CodeBlock code={`{/* Default - 터치 가능 */}
<ListCard
  title="Default"
  subtitle="터치 가능"
  meta="₩3,245,000"
  onPress={() => {}}
/>

{/* Disabled - 비활성화 */}
<ListCard
  title="Disabled"
  subtitle="비활성화"
  meta="₩3,245,000"
  disabled
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "variant", type: '"elevated" | "outlined" | "filled"', required: false, defaultVal: '"elevated"', description: "카드 스타일" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
              { name: "thumbnail", type: "ReactNode", required: false, description: "좌측 썸네일" },
              { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
              { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
              { name: "meta", type: "ReactNode", required: false, description: "메타 정보 (가격)" },
              { name: "badges", type: "ReactNode", required: false, description: "상단 뱃지 영역" },
              { name: "action", type: "ReactNode", required: false, description: "우측 액션 영역" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
            ]}
          />
        </Subsection>
        <Subsection title="React Native-specific Props">
          <PropsTable
            props={[
              { name: "onPress", type: "() => void", required: false, description: "탭 핸들러" },
              { name: "onLongPress", type: "() => void", required: false, description: "길게 누르기 핸들러" },
              { name: "accessibilityLabel", type: "string", required: false, description: "스크린 리더용 레이블" },
              { name: "accessibilityHint", type: "string", required: false, description: "동작 힌트 설명" },
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
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        id={title.toLowerCase().replace(/\s+/g, "-")}
        style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>
      {children}
    </code>
  );
}

function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#e5e7eb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

function UsageCard({ situation, description, config, examples }: {
  situation: string;
  description: string;
  config: string;
  examples: string[];
}) {
  return (
    <div style={{
      padding: 16,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
        <span style={{
          fontSize: 11,
          padding: "2px 6px",
          backgroundColor: "#f1f5f9",
          color: "#475569",
          borderRadius: 4,
          fontWeight: 500,
        }}>
          {config}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{description}</p>
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
        예시: {examples.join(", ")}
      </p>
    </div>
  );
}

function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
      <div style={{
        padding: 24,
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
      }}>
        {children}
      </div>
      <div style={{
        padding: "12px 16px",
        backgroundColor: "white",
        borderTop: "1px solid var(--divider)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#22c55e"/>
          <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>Do</span>
      </div>
    </div>
  );
}

function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
      <div style={{
        padding: 24,
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
      }}>
        {children}
      </div>
      <div style={{
        padding: "12px 16px",
        backgroundColor: "white",
        borderTop: "1px solid var(--divider)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#ef4444"/>
          <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#dc2626" }}>Don&apos;t</span>
      </div>
    </div>
  );
}

function DoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, color: "#22c55e", marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{ fontWeight: 700, flexShrink: 0 }}>Do</span>
      <span style={{ color: "var(--text-secondary)" }}>{children}</span>
    </p>
  );
}

function DontLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, color: "#ef4444", marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{ fontWeight: 700, flexShrink: 0 }}>Don&apos;t</span>
      <span style={{ color: "var(--text-secondary)" }}>{children}</span>
    </p>
  );
}

function RadioGroup({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "#c4c4c4", marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                color: isSelected ? "var(--text-primary)" : "#9ca3af",
                transition: "color 0.15s ease",
              }}
              onClick={() => onChange(opt.value)}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: isSelected ? "2px solid #3b82f6" : "2px solid #e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                  backgroundColor: "white",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                    }}
                  />
                )}
              </div>
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Name</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name}>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", verticalAlign: "top" }}>
                <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 8px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>{prop.name}</code>
                {prop.required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
              </td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "#6366f1", fontFamily: "monospace", fontSize: 12, verticalAlign: "top", maxWidth: 180, wordBreak: "break-word" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13, verticalAlign: "top" }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)", verticalAlign: "top" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Demo Components
// ============================================
function EthereumIcon({ size = 48 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="#627eea">
        <path d="M12 1.5l-7 10.5 7 4 7-4-7-10.5z" opacity="0.6" />
        <path d="M12 22.5l-7-10 7 4 7-4-7 10z" />
      </svg>
    </div>
  );
}

function BitcoinIcon({ size = 48 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="#f7931a">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 15h-1v1.5h-1V17h-1v1.5h-1V17H8v-1h1v-8H8V7h1.5V5.5h1V7h1V5.5h1V7c1.38 0 2.5 1.12 2.5 2.5 0 .82-.4 1.54-1 2 .83.46 1.5 1.37 1.5 2.5 0 1.38-1.12 2.5-2.5 2.5h-.5v1h-1v-1zm-.5-7c.55 0 1-.45 1-1s-.45-1-1-1h-2v2h2zm.5 5c.55 0 1-.45 1-1s-.45-1-1-1h-2.5v2H13z" />
      </svg>
    </div>
  );
}

function ThumbnailDemo({ size = 80 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, backgroundColor: "#e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}

function BadgeDemo() {
  return (
    <ContentBadge color="brandDefault" size="small">NEW</ContentBadge>
  );
}

function TrendBadge({ trend, value }: { trend: "up" | "down"; value: string }) {
  const isUp = trend === "up";
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      height: 20,
      padding: "0 8px",
      fontSize: 11,
      fontWeight: 600,
      color: isUp ? "#16a34a" : "#dc2626",
      backgroundColor: isUp ? "#f0fdf4" : "#fef2f2",
      borderRadius: 4
    }}>
      {isUp ? "▲" : "▼"} {value}
    </span>
  );
}

function ListCardDemo({
  variant = "elevated",
  size = "medium",
  thumbnail,
  badges,
  title,
  subtitle,
  meta,
  onClick,
}: {
  variant?: ListCardVariant;
  size?: ListCardSize;
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
      size={size}
      thumbnail={thumbnail}
      badges={badges}
      title={title}
      subtitle={subtitle}
      meta={meta}
      onClick={onClick}
    />
  );
}
