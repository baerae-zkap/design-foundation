"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { ListCell, SectionHeader, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { ListCellSize } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";
import { BRAND_EXTERNAL_COLORS } from "@/tokens/brandExternal";

// GitHub source URLs
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/ListCell";
const LISTCELL_SOURCE = `${GITHUB_BASE}/ListCell.tsx`;

// Size display info (for documentation labels only)
const sizeInfo: Record<ListCellSize, { minHeight: number }> = {
  small: { minHeight: 44 },
  medium: { minHeight: 56 },
  large: { minHeight: 72 },
};

export default function ListCellPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "List Cell" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        List Cell
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        리스트의 각 행을 구성하는 기본 단위입니다. 레이블, 설명, 액세서리를 일관된 레이아웃으로 제공합니다.
      </p>

      <ListCellPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ListCellPlayground() {
  const [size, setSize] = useState<ListCellSize>("medium");
  const [hasLeading, setHasLeading] = useState(true);
  const [hasDescription, setHasDescription] = useState(true);
  const [hasTrailing, setHasTrailing] = useState(true);
  const [hasDivider, setHasDivider] = useState(true);
  const [hasSectionHeader, setHasSectionHeader] = useState(true);
  const [verticalAlign, setVerticalAlign] = useState<'top' | 'center'>('center');

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: spacing.primitive[14], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              {hasSectionHeader && <SectionHeader title="내 자산" />}
              <ListCellDemo
                size={size}
                verticalAlign={verticalAlign}
                leading={hasLeading ? <CryptoIcon symbol="ETH" color={BRAND_EXTERNAL_COLORS.crypto.ethereum} /> : undefined}
                title="Ethereum"
                description={hasDescription ? "0.7812 ETH" : undefined}
                trailing={hasTrailing ? <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩3,245,000</span> : undefined}
                divider={hasDivider}
                onClick={() => {}}
              />
              <ListCellDemo
                size={size}
                verticalAlign={verticalAlign}
                leading={hasLeading ? <CryptoIcon symbol="BTC" color={BRAND_EXTERNAL_COLORS.crypto.bitcoin} /> : undefined}
                title="Bitcoin"
                description={hasDescription ? "0.0234 BTC" : undefined}
                trailing={hasTrailing ? <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩2,890,000</span> : undefined}
                divider={hasDivider}
                onClick={() => {}}
              />
              <ListCellDemo
                size={size}
                verticalAlign={verticalAlign}
                leading={hasLeading ? <CryptoIcon symbol="SOL" color={BRAND_EXTERNAL_COLORS.crypto.solana} /> : undefined}
                title="Solana"
                description={hasDescription ? "12.5 SOL" : undefined}
                trailing={hasTrailing ? <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩1,560,000</span> : undefined}
                onClick={() => {}}
              />
            </div>
          </div>

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
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as ListCellSize)}
              />
              <RadioGroup
                label="Section Header"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasSectionHeader ? "true" : "false"}
                onChange={(v) => setHasSectionHeader(v === "true")}
              />
              <RadioGroup
                label="Leading"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasLeading ? "true" : "false"}
                onChange={(v) => setHasLeading(v === "true")}
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
              <RadioGroup
                label="Trailing"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasTrailing ? "true" : "false"}
                onChange={(v) => setHasTrailing(v === "true")}
              />
              <RadioGroup
                label="Divider"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasDivider ? "true" : "false"}
                onChange={(v) => setHasDivider(v === "true")}
              />
              <RadioGroup
                label="Vertical Align"
                options={[
                  { value: "center", label: "Center" },
                  { value: "top", label: "Top" },
                ]}
                value={verticalAlign}
                onChange={(v) => setVerticalAlign(v as 'top' | 'center')}
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>ListCell</InlineCode> 컴포넌트는 리스트의 각 행을 구성하는 기본 단위예요.
          레이블, 설명, 액세서리를 일관된 레이아웃으로 제공해요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: "var(--surface-base-container)", borderRadius: radius.primitive.lg, padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="440" height="100" viewBox="0 0 440 100">
            {/* Cell background */}
            <rect x="20" y="15" width="400" height="60" rx="0" fill="var(--surface-base-default)" stroke="var(--border-solid-alternative)" strokeWidth="1" />

            {/* Leading area - circle icon */}
            <circle cx="58" cy="45" r="18" fill="var(--surface-base-container)" />

            {/* Content area - title + description */}
            <rect x="90" y="32" width="120" height="10" rx="4" fill="var(--content-base-default)" />
            <rect x="90" y="48" width="80" height="8" rx="4" fill="var(--content-base-alternative)" />

            {/* Trailing area - chevron */}
            <rect x="340" y="35" width="60" height="10" rx="4" fill="var(--content-base-default)" />
            <text x="410" y="48" textAnchor="middle" fill="var(--content-base-alternative)" fontSize="18">&#x203A;</text>

            {/* Numbered indicator 1 - Leading */}
            <line x1="58" y1="15" x2="58" y2="2" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="58" cy="0" r="11" fill="var(--content-base-default)" />
            <text x="58" y="4" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Numbered indicator 2 - Content */}
            <line x1="130" y1="75" x2="130" y2="88" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="130" cy="98" r="11" fill="var(--content-base-default)" />
            <text x="130" y="102" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            {/* Numbered indicator 3 - Trailing */}
            <line x1="370" y1="15" x2="370" y2="2" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="370" cy="0" r="11" fill="var(--content-base-default)" />
            <text x="370" y="4" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[5], fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>
          <div>1. Leading</div>
          <div style={{ textAlign: "center" }}>2. Content (Title + Description)</div>
          <div style={{ textAlign: "right" }}>3. Trailing</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ListCell은 leading, description, trailing 영역의 조합으로 다양한 변형을 만들 수 있습니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
          <VariantCard name="Icon + Title + Trailing" description="아이콘, 제목, 우측 액션이 모두 있는 기본 형태">
            <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} onClick={() => {}} />
          </VariantCard>
          <VariantCard name="Title + Description" description="제목과 설명만 있는 간결한 형태">
            <ListCellDemo title="홍길동" description="hong@example.com" />
          </VariantCard>
          <VariantCard name="Full (Icon + Content + Value)" description="모든 영역이 채워진 정보 표시형">
            <ListCellDemo leading={<CryptoIcon symbol="ETH" color={BRAND_EXTERNAL_COLORS.crypto.ethereum} />} title="Ethereum" description="0.7812 ETH" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩3.2M</span>} />
          </VariantCard>
          <VariantCard name="Title Only + Chevron" description="단순 네비게이션 용도">
            <ListCellDemo title="도움말" trailing={<ChevronIcon />} onClick={() => {}} />
          </VariantCard>
        </div>
      </Section>

      {/* With Section Headers */}
      <Section title="With Section Headers">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "var(--shadow-sm)" }}>
              <SectionHeader title="내 자산" />
              <ListCellDemo leading={<CryptoIcon symbol="ETH" color={BRAND_EXTERNAL_COLORS.crypto.ethereum} />} title="Ethereum" description="0.7812 ETH" trailing={<span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩3,245,000</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<CryptoIcon symbol="BTC" color={BRAND_EXTERNAL_COLORS.crypto.bitcoin} />} title="Bitcoin" description="0.0234 BTC" trailing={<span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩2,890,000</span>} onClick={() => {}} />
              <SectionHeader title="설정" />
              <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <ListCellDemo leading={<SettingsIconDemo />} title="보안" trailing={<ChevronIcon />} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>size</InlineCode> prop을 통해 3가지 크기를 사용할 수 있습니다. 크기에 따라 minHeight, padding, 텍스트 크기가 변경됩니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Min Height</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Padding Y</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>44px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>8px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>밀도 높은 리스트, 설정 메뉴</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>56px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>기본값, 대부분의 리스트</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>72px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>16px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>강조 리스트, 자산 목록</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden" }}>
              {(["small", "medium", "large"] as ListCellSize[]).map((s, i, arr) => (
                <ListCellDemo
                  key={s}
                  size={s}
                  leading={<AvatarDemo />}
                  title={`${s.charAt(0).toUpperCase() + s.slice(1)} Size`}
                  description={`minHeight: ${sizeInfo[s].minHeight}px`}
                  trailing={<ChevronIcon />}
                  divider={i < arr.length - 1}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ListCell의 텍스트 색상은 <InlineCode>title</InlineCode>과 <InlineCode>description</InlineCode>에 의미에 맞는 색상을 적용할 수 있습니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Element</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Title</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-default)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>기본 타이틀 텍스트</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Description</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-secondary)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>보조 텍스트, 설명</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Success Trailing</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-success-default)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>연결됨, 성공 상태</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Brand Trailing</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-brand-default)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>연결하기, 액션 유도</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Error Trailing</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-error-default)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>에러, 경고 상태</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<StatusDot color="var(--content-success-default)" />} title="업비트" description="연동됨" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-success-default)" }}>연결됨</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="var(--content-brand-default)" />} title="빗썸" description="미연동" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-brand-default)" }}>연결하기</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="var(--content-error-default)" />} title="코인원" description="연동 오류" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-error-default)" }}>재연결</span>} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ListCell은 사용자 상호작용에 따라 다양한 상태를 가집니다. 각 상태는 시각적으로 구분되어 피드백을 제공합니다.
        </p>

        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 400 }}>
              <ListCellDemo leading={<AvatarDemo />} title="Default" description="기본 상태" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <div style={{ backgroundColor: "var(--surface-base-containerPressed)" }}>
                <ListCellDemo leading={<AvatarDemo />} title="Pressed / Hover" description="마우스 오버 또는 터치 시" trailing={<ChevronIcon />} divider />
              </div>
              <div style={{ backgroundColor: "var(--surface-brand-secondary)" }}>
                <ListCellDemo leading={<AvatarDemo />} title="Selected" description="선택된 상태" trailing={<CheckIcon />} />
              </div>
            </div>
          </div>
        </PreviewBox>

        <div style={{ marginTop: spacing.primitive[4], padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, fontSize: typography.fontSize.compact }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 배경 (투명)<br />
            <strong style={{ color: "var(--text-primary)" }}>Pressed:</strong> 배경색이 <InlineCode>fill.normal</InlineCode>로 변경<br />
            <strong style={{ color: "var(--text-primary)" }}>Hover:</strong> 배경색이 <InlineCode>fill.alternative</InlineCode>로 변경<br />
            <strong style={{ color: "var(--text-primary)" }}>Selected:</strong> 배경색 변경 + 체크 아이콘 표시
          </p>
        </div>

        <Subsection title="Interaction States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          ListCell은 사용자 인터랙션에 따라 시각적 피드백을 제공합니다. 각 상태는 배경색, 투명도 등의 변화로 구분됩니다.
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
            <div style={{ width: 140, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--divider)", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
              <div style={{ width: 24, height: 24, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-container)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: 48, height: 6, borderRadius: 2, backgroundColor: "var(--content-base-default)", marginBottom: spacing.primitive[1] }} />
                <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
              </div>
            </div>
          </StateCard>
          <StateCard label="Hover" sublabel="마우스 오버">
            <div style={{ width: 140, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-containerPressed)", border: "1px solid var(--divider)", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
              <div style={{ width: 24, height: 24, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-container)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: 48, height: 6, borderRadius: 2, backgroundColor: "var(--content-base-default)", marginBottom: spacing.primitive[1] }} />
                <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
              </div>
            </div>
          </StateCard>
          <StateCard label="Pressed" sublabel="누름 상태">
            <div style={{ width: 140, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-containerPressed)", border: "1px solid var(--divider)", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2], opacity: 0.85 }}>
              <div style={{ width: 24, height: 24, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-container)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: 48, height: 6, borderRadius: 2, backgroundColor: "var(--content-base-default)", marginBottom: spacing.primitive[1] }} />
                <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
              </div>
            </div>
          </StateCard>
          <StateCard label="Focused" sublabel="키보드 포커스">
            <div style={{ width: 140, height: 48, borderRadius: radius.primitive.sm, backgroundColor: "var(--surface-base-default)", border: "2px solid var(--content-brand-default)", display: "flex", alignItems: "center", padding: `0 ${spacing.primitive[2]}px`, gap: spacing.primitive[2] }}>
              <div style={{ width: 24, height: 24, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-container)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: 48, height: 6, borderRadius: 2, backgroundColor: "var(--content-base-default)", marginBottom: spacing.primitive[1] }} />
                <div style={{ width: 32, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-alternative)" }} />
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
              situation="Settings List"
              description="앱 설정 메뉴에서 각 항목을 네비게이션하는 리스트"
              config="icon + title + chevron"
              examples={["알림 설정", "보안", "개인정보"]}
            />
            <UsageCard
              situation="Navigation List"
              description="섹션 간 이동을 위한 네비게이션 리스트"
              config="title + description + chevron"
              examples={["내 자산 보기", "거래 내역", "포트폴리오"]}
            />
            <UsageCard
              situation="Selection List"
              description="여러 항목 중 선택하는 리스트"
              config="icon + title + check"
              examples={["거래소 선택", "코인 선택", "계좌 선택"]}
            />
            <UsageCard
              situation="Info Display List"
              description="데이터를 보여주는 정보 표시형 리스트"
              config="icon + title + description + value"
              examples={["자산 목록", "거래 내역", "가격 현황"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="일관된 구조 유지"
              desc="같은 리스트 내에서는 동일한 구조(leading/trailing 조합)를 사용하세요. 항목마다 다른 구조를 사용하면 시각적 혼란을 줍니다."
            />
            <PrincipleCard
              number={2}
              title="적절한 크기 선택"
              desc="정보량에 따라 크기를 선택하세요. 설정 메뉴처럼 단순한 항목은 small, 자산 목록처럼 정보가 많은 항목은 large를 사용합니다."
            />
            <PrincipleCard
              number={3}
              title="Trailing 영역의 의미"
              desc="Trailing 영역은 네비게이션(chevron), 상태(텍스트), 액션(토글) 중 하나로 사용하세요. 한 리스트에서 여러 종류를 혼합하지 않습니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Pair 1: Consistent structure */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 280 }}>
                      <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
                      <ListCellDemo leading={<SettingsIconDemo />} title="보안" trailing={<ChevronIcon />} onClick={() => {}} />
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 280 }}>
                      <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
                      <ListCellDemo title="보안" trailing={<span style={{ fontSize: typography.fontSize.xs, color: "var(--content-brand-default)" }}>변경</span>} onClick={() => {}} />
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 같은 리스트에서 일관된 구조를 유지합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 항목마다 다른 leading/trailing 구조를 사용하지 않습니다
                </p>
              </div>
            </div>

            {/* Pair 2: Concise content */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 280 }}>
                      <ListCellDemo title="Ethereum" description="0.7812 ETH" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩3.2M</span>} />
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 280 }}>
                      <ListCellDemo title="Ethereum 이더리움 코인 가상화폐 블록체인" description="0.7812 ETH" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩3,245,000원</span>} />
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> Title은 간결하게, Trailing 값은 요약하여 표시합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> Title이 너무 길거나 Trailing 정보가 과도하면 읽기 어렵습니다
                </p>
              </div>
            </div>

            {/* Pair 3: UX Writing — Title clarity */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 280 }}>
                      <ListCellDemo title="삼성전자" description="005930" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>72,300원</span>} />
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 280 }}>
                      <ListCellDemo title="삼성전자 주식회사" description="005930" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>현재가: 72,300원</span>} />
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 핵심 정보만 타이틀에, trailing에 값만 간결하게 표시합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 불필요한 부가 정보나 라벨을 중복하여 표시하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ListCell 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Min Height (small)", "-", "44px"],
                ["Min Height (medium)", "-", "56px"],
                ["Min Height (large)", "-", "72px"],
                ["Padding Y (small)", "spacing.primitive.2", "8px"],
                ["Padding Y (medium)", "spacing.primitive.3", "12px"],
                ["Padding Y (large)", "spacing.primitive.4", "16px"],
                ["Padding X", "spacing.primitive.4", "16px"],
                ["Gap", "spacing.primitive.3", "12px"],
                ["Divider Color", "border.base.default", "var(--border-base-default)"],
              ].map(([prop, token, value], i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>{prop}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>{token !== "-" ? <InlineCode>{token}</InlineCode> : "-"}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ListCell 컴포넌트는 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>onClick가 있으면 자동 설정</td>
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
            <PrincipleCard number={1} title="Interactive Role" desc="onClick가 있으면 role='button'이 자동 설정됩니다. 스크린 리더가 인터랙티브 요소로 인식합니다." />
            <PrincipleCard number={2} title="Keyboard Navigation" desc="Enter/Space 키로 활성화할 수 있습니다. Tab 키로 리스트 항목 간 이동이 가능합니다." />
            <PrincipleCard number={3} title="Touch Target" desc="최소 44px 높이로 터치 영역을 확보합니다. small 사이즈도 iOS HIG 기준을 충족합니다." />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ListCard</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>리스트 항목</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ListCard는 썸네일 포함, ListCell은 텍스트 중심</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Table</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>데이터 나열</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Table은 열 기반 구조화, ListCell은 단일 행</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Accordion</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>목록 표시</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Accordion은 펼침 콘텐츠 포함, ListCell은 단일 행</td>
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
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>ListCell Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={LISTCELL_SOURCE}
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
        <CodeBlock code={`import { ListCell } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<AvatarDemo />} title="홍길동" description="hong@example.com" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <ListCellDemo leading={<AvatarDemo />} title="김철수" description="kim@example.com" trailing={<ChevronIcon />} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCell
  leading={<Avatar src="user.jpg" />}
  title="홍길동"
  description="hong@example.com"
  trailing={<ChevronRight />}
  onClick={() => {}}
/>`} />
      </Section>

      <Section title="Variants">
        <Subsection title="With Leading Icon">
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
                <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
                <ListCellDemo leading={<SettingsIconDemo />} title="보안 설정" trailing={<ChevronIcon />} onClick={() => {}} />
              </div>
            </div>
          </PreviewBox>
          <CodeBlock code={`<ListCell
  leading={<SettingsIcon />}
  title="알림 설정"
  trailing={<ChevronRight />}
  onClick={() => navigate('/notifications')}
/>`} />
        </Subsection>

        <Subsection title="Without Leading (Title Only)">
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
                <ListCellDemo title="이용약관" trailing={<ChevronIcon />} divider onClick={() => {}} />
                <ListCellDemo title="개인정보 처리방침" trailing={<ChevronIcon />} onClick={() => {}} />
              </div>
            </div>
          </PreviewBox>
          <CodeBlock code={`<ListCell
  title="이용약관"
  trailing={<ChevronRight />}
  onClick={() => navigate('/terms')}
/>`} />
        </Subsection>

        <Subsection title="With Value Trailing">
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
                <ListCellDemo leading={<CryptoIcon symbol="ETH" color={BRAND_EXTERNAL_COLORS.crypto.ethereum} />} title="Ethereum" description="0.7812 ETH" trailing={<span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩3,245,000</span>} divider onClick={() => {}} />
                <ListCellDemo leading={<CryptoIcon symbol="BTC" color={BRAND_EXTERNAL_COLORS.crypto.bitcoin} />} title="Bitcoin" description="0.0234 BTC" trailing={<span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>₩2,890,000</span>} onClick={() => {}} />
              </div>
            </div>
          </PreviewBox>
          <CodeBlock code={`<ListCell
  leading={<CryptoIcon symbol="ETH" />}
  title="Ethereum"
  description="0.7812 ETH"
  trailing={<span>₩3,245,000</span>}
  onClick={() => navigate('/eth-detail')}
/>`} />
        </Subsection>
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<StatusDot color="var(--content-success-default)" />} title="업비트" description="연동됨" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-success-default)" }}>연결됨</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="var(--content-brand-default)" />} title="빗썸" description="미연동" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-brand-default)" }}>연결하기</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="var(--content-error-default)" />} title="코인원" description="연동 오류" trailing={<span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--content-error-default)" }}>재연결</span>} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Success - 연결 상태 */}
<ListCell
  title="업비트"
  description="연동됨"
  trailing={<Text color="success">연결됨</Text>}
  onClick={() => {}}
/>

{/* Brand - 액션 유도 */}
<ListCell
  title="빗썸"
  description="미연동"
  trailing={<Text color="brand">연결하기</Text>}
  onClick={() => connectExchange('bithumb')}
/>

{/* Error - 에러 상태 */}
<ListCell
  title="코인원"
  description="연동 오류"
  trailing={<Text color="error">재연결</Text>}
  onClick={() => reconnect('coinone')}
/>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden" }}>
              {(["small", "medium", "large"] as ListCellSize[]).map((s, i, arr) => (
                <ListCellDemo
                  key={s}
                  size={s}
                  leading={<AvatarDemo />}
                  title={`${s.charAt(0).toUpperCase() + s.slice(1)} Size`}
                  description={`minHeight: ${sizeInfo[s].minHeight}px`}
                  trailing={<ChevronIcon />}
                  divider={i < arr.length - 1}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCell size="small" title="Small" description="44px" onClick={() => {}} />
<ListCell size="medium" title="Medium" description="56px" onClick={() => {}} />
<ListCell size="large" title="Large" description="72px" onClick={() => {}} />`} />
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--border-solid-alternative)", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<AvatarDemo />} title="Default" description="클릭 가능" trailing={<ChevronIcon />} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCell
  title="Default"
  description="클릭 가능"
  onClick={() => {}}
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "leading", type: "ReactNode", required: false, description: "좌측 영역 (아이콘, 아바타)" },
              { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
              { name: "description", type: "ReactNode", required: false, description: "설명 텍스트" },
              { name: "trailing", type: "ReactNode", required: false, description: "우측 영역" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
              { name: "divider", type: "boolean", required: false, defaultVal: "false", description: "하단 구분선" },
              { name: "withArrow", type: "boolean", required: false, defaultVal: "false", description: "우측 화살표(chevron) 아이콘 표시" },
              { name: "verticalAlign", type: '"top" | "center"', required: false, defaultVal: '"center"', description: "수직 정렬" },
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
function CryptoIcon({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: radius.primitive.full,
      backgroundColor: `${color}15`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
      color: color
    }}>
      {symbol}
    </div>
  );
}

function AvatarDemo() {
  return (
    <div style={{ width: 36, height: 36, borderRadius: radius.primitive.full, backgroundColor: "var(--surface-base-container)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-secondary)" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-secondary)" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--icon-brand)" strokeWidth="2.5">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: radius.primitive.full, backgroundColor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 10, height: 10, borderRadius: radius.primitive.full, backgroundColor: color }} />
    </div>
  );
}

function SettingsIconDemo() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--icon-default)" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    </div>
  );
}

function ListCellDemo({
  size = "medium",
  leading,
  title,
  description,
  trailing,
  divider = false,
  onClick,
  verticalAlign,
}: {
  size?: ListCellSize;
  leading?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
  verticalAlign?: 'top' | 'center';
}) {
  return (
    <ListCell
      size={size}
      leading={leading}
      title={title}
      description={description}
      trailing={trailing}
      divider={divider}
      onClick={onClick}
      verticalAlign={verticalAlign}
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
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: spacing.primitive[1] }}>{sublabel}</div>
      </div>
    </div>
  );
}
