"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { ListCell, SectionHeader } from '@baerae-zkap/design-system';
import type { ListCellSize } from '@baerae-zkap/design-system';

// GitHub source URLs
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/src/source/components/ListCell";
const LISTCELL_SOURCE = `${GITHUB_BASE}/ListCell.tsx`;

// Size display info (for documentation labels only)
const sizeInfo: Record<ListCellSize, { minHeight: number }> = {
  small: { minHeight: 44 },
  medium: { minHeight: 56 },
  large: { minHeight: 72 },
};

export default function ListCellPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "List Cell" },
        ]}
      />

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        List Cell
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        리스트 아이템을 표시하는 수평 레이아웃 컴포넌트입니다. 설정, 네비게이션, 데이터 목록 등 다양한 리스트 UI에 사용됩니다.
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
  const [hasSubtitle, setHasSubtitle] = useState(true);
  const [hasTrailing, setHasTrailing] = useState(true);
  const [hasDivider, setHasDivider] = useState(true);
  const [hasSectionHeader, setHasSectionHeader] = useState(true);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, backgroundColor: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              {hasSectionHeader && <SectionHeader title="내 자산" />}
              <ListCellDemo
                size={size}
                leading={hasLeading ? <CryptoIcon symbol="ETH" color="#627eea" /> : undefined}
                title="Ethereum"
                subtitle={hasSubtitle ? "0.7812 ETH" : undefined}
                trailing={hasTrailing ? <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩3,245,000</span> : undefined}
                divider={hasDivider}
                onClick={() => {}}
              />
              <ListCellDemo
                size={size}
                leading={hasLeading ? <CryptoIcon symbol="BTC" color="#f7931a" /> : undefined}
                title="Bitcoin"
                subtitle={hasSubtitle ? "0.0234 BTC" : undefined}
                trailing={hasTrailing ? <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩2,890,000</span> : undefined}
                divider={hasDivider}
                onClick={() => {}}
              />
              <ListCellDemo
                size={size}
                leading={hasLeading ? <CryptoIcon symbol="SOL" color="#00d18c" /> : undefined}
                title="Solana"
                subtitle={hasSubtitle ? "12.5 SOL" : undefined}
                trailing={hasTrailing ? <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩1,560,000</span> : undefined}
                onClick={() => {}}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fafbfc",
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
                backgroundColor: "white",
                borderRadius: 16,
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
                label="Subtitle"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasSubtitle ? "true" : "false"}
                onChange={(v) => setHasSubtitle(v === "true")}
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
          <svg width="440" height="100" viewBox="0 0 440 100">
            {/* Cell background */}
            <rect x="20" y="15" width="400" height="60" rx="0" fill="white" stroke="#e2e8f0" strokeWidth="1" />

            {/* Leading area - circle icon */}
            <circle cx="58" cy="45" r="18" fill="#e2e8f0" />

            {/* Content area - title + subtitle */}
            <rect x="90" y="32" width="120" height="10" rx="4" fill="#334155" />
            <rect x="90" y="48" width="80" height="8" rx="4" fill="#94a3b8" />

            {/* Trailing area - chevron */}
            <rect x="340" y="35" width="60" height="10" rx="4" fill="#334155" />
            <text x="410" y="48" textAnchor="middle" fill="#94a3b8" fontSize="18">&#x203A;</text>

            {/* Numbered indicator 1 - Leading */}
            <line x1="58" y1="15" x2="58" y2="2" stroke="#374151" strokeWidth="1.5" />
            <circle cx="58" cy="0" r="11" fill="#374151" />
            <text x="58" y="4" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">1</text>

            {/* Numbered indicator 2 - Content */}
            <line x1="130" y1="75" x2="130" y2="88" stroke="#374151" strokeWidth="1.5" />
            <circle cx="130" cy="98" r="11" fill="#374151" />
            <text x="130" y="102" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">2</text>

            {/* Numbered indicator 3 - Trailing */}
            <line x1="370" y1="15" x2="370" y2="2" stroke="#374151" strokeWidth="1.5" />
            <circle cx="370" cy="0" r="11" fill="#374151" />
            <text x="370" y="4" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
          <div>1. Leading</div>
          <div style={{ textAlign: "center" }}>2. Content (Title + Subtitle)</div>
          <div style={{ textAlign: "right" }}>3. Trailing</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCell은 leading, subtitle, trailing 영역의 조합으로 다양한 변형을 만들 수 있습니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <VariantCard name="Icon + Title + Trailing" description="아이콘, 제목, 우측 액션이 모두 있는 기본 형태">
            <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} onClick={() => {}} />
          </VariantCard>
          <VariantCard name="Title + Subtitle" description="제목과 부제목만 있는 간결한 형태">
            <ListCellDemo title="홍길동" subtitle="hong@example.com" />
          </VariantCard>
          <VariantCard name="Full (Icon + Content + Value)" description="모든 영역이 채워진 정보 표시형">
            <ListCellDemo leading={<CryptoIcon symbol="ETH" color="#627eea" />} title="Ethereum" subtitle="0.7812 ETH" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>₩3.2M</span>} />
          </VariantCard>
          <VariantCard name="Title Only + Chevron" description="단순 네비게이션 용도">
            <ListCellDemo title="도움말" trailing={<ChevronIcon />} onClick={() => {}} />
          </VariantCard>
        </div>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCell의 텍스트 색상은 <InlineCode>title</InlineCode>과 <InlineCode>subtitle</InlineCode>에 의미에 맞는 색상을 적용할 수 있습니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Element</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Title</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#334155</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>기본 타이틀 텍스트</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Subtitle</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#64748b</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>보조 텍스트, 설명</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Success Trailing</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#22c55e</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>연결됨, 성공 상태</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Brand Trailing</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#3b82f6</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>연결하기, 액션 유도</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Error Trailing</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#ef4444</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>에러, 경고 상태</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<StatusDot color="#22c55e" />} title="업비트" subtitle="연동됨" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>연결됨</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="#3b82f6" />} title="빗썸" subtitle="미연동" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6" }}>연결하기</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="#ef4444" />} title="코인원" subtitle="연동 오류" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#ef4444" }}>재연결</span>} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCell은 사용자 상호작용에 따라 다양한 상태를 가집니다. 각 상태는 시각적으로 구분되어 피드백을 제공합니다.
        </p>

        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 400 }}>
              <ListCellDemo leading={<AvatarDemo />} title="Default" subtitle="기본 상태" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <div style={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
                <ListCellDemo leading={<AvatarDemo />} title="Pressed / Hover" subtitle="마우스 오버 또는 터치 시" trailing={<ChevronIcon />} divider />
              </div>
              <div style={{ opacity: 0.4, pointerEvents: "none" as const }}>
                <ListCellDemo leading={<AvatarDemo />} title="Disabled" subtitle="비활성화 상태" trailing={<ChevronIcon />} divider />
              </div>
              <div style={{ backgroundColor: "#f0f7ff" }}>
                <ListCellDemo leading={<AvatarDemo />} title="Selected" subtitle="선택된 상태" trailing={<CheckIcon />} />
              </div>
            </div>
          </div>
        </PreviewBox>

        <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, fontSize: 13 }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 배경 (투명)<br />
            <strong style={{ color: "var(--text-primary)" }}>Pressed/Hover:</strong> 배경색이 rgba(0,0,0,0.02)로 변경<br />
            <strong style={{ color: "var(--text-primary)" }}>Disabled:</strong> 전체 opacity 감소, 상호작용 불가<br />
            <strong style={{ color: "var(--text-primary)" }}>Selected:</strong> 배경색 변경 + 체크 아이콘 표시
          </p>
        </div>
      </Section>

      {/* With Section Headers */}
      <Section title="With Section Headers">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <SectionHeader title="내 자산" />
              <ListCellDemo leading={<CryptoIcon symbol="ETH" color="#627eea" />} title="Ethereum" subtitle="0.7812 ETH" trailing={<span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩3,245,000</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<CryptoIcon symbol="BTC" color="#f7931a" />} title="Bitcoin" subtitle="0.0234 BTC" trailing={<span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩2,890,000</span>} onClick={() => {}} />
              <SectionHeader title="설정" />
              <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <ListCellDemo leading={<SettingsIconDemo />} title="보안" trailing={<ChevronIcon />} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>size</InlineCode> prop을 통해 3가지 크기를 사용할 수 있습니다. 크기에 따라 minHeight, padding, 텍스트 크기가 변경됩니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Min Height</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Padding Y</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>44px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>8px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>밀도 높은 리스트, 설정 메뉴</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>56px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>기본값, 대부분의 리스트</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>72px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>16px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>강조 리스트, 자산 목록</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {(["small", "medium", "large"] as ListCellSize[]).map((s, i, arr) => (
                <ListCellDemo
                  key={s}
                  size={s}
                  leading={<AvatarDemo />}
                  title={`${s.charAt(0).toUpperCase() + s.slice(1)} Size`}
                  subtitle={`minHeight: ${sizeInfo[s].minHeight}px`}
                  trailing={<ChevronIcon />}
                  divider={i < arr.length - 1}
                  onClick={() => {}}
                />
              ))}
            </div>
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
              situation="Settings List"
              description="앱 설정 메뉴에서 각 항목을 네비게이션하는 리스트"
              config="icon + title + chevron"
              examples={["알림 설정", "보안", "개인정보"]}
            />
            <UsageCard
              situation="Navigation List"
              description="섹션 간 이동을 위한 네비게이션 리스트"
              config="title + subtitle + chevron"
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
              config="icon + title + subtitle + value"
              examples={["자산 목록", "거래 내역", "가격 현황"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
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
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 280 }}>
              <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <ListCellDemo leading={<SettingsIconDemo />} title="보안" trailing={<ChevronIcon />} onClick={() => {}} />
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 280 }}>
              <ListCellDemo leading={<SettingsIconDemo />} title="알림 설정" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <ListCellDemo title="보안" trailing={<span style={{ fontSize: 12, color: "#3b82f6" }}>변경</span>} onClick={() => {}} />
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <DoLabel>같은 리스트에서 일관된 구조를 유지합니다.</DoLabel>
          <DontLabel>항목마다 다른 leading/trailing 구조를 사용하지 않습니다.</DontLabel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
          <DoCard>
            <div style={{ width: "100%", maxWidth: 280 }}>
              <ListCellDemo title="Ethereum" subtitle="0.7812 ETH" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>₩3.2M</span>} />
            </div>
          </DoCard>
          <DontCard>
            <div style={{ width: "100%", maxWidth: 280 }}>
              <ListCellDemo title="Ethereum 이더리움 코인 가상화폐 블록체인" subtitle="0.7812 ETH" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>₩3,245,000원</span>} />
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <DoLabel>Title은 간결하게, Trailing 값은 요약하여 표시합니다.</DoLabel>
          <DontLabel>Title이 너무 길거나 Trailing 정보가 과도하면 읽기 어렵습니다.</DontLabel>
        </div>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ListCell 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
                ["Min Height (small)", "-", "44px"],
                ["Min Height (medium)", "-", "56px"],
                ["Min Height (large)", "-", "72px"],
                ["Padding Y (small)", "spacing.primitive.2", "8px"],
                ["Padding Y (medium)", "spacing.primitive.3", "12px"],
                ["Padding Y (large)", "spacing.primitive.4", "16px"],
                ["Padding X", "spacing.primitive.4", "16px"],
                ["Gap", "spacing.primitive.3", "12px"],
                ["Divider Color", "border.base.default", "#e2e8f0"],
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
          ListCell 컴포넌트는 웹 접근성 표준을 준수합니다.
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
                <td style={{ padding: "12px 16px" }}><InlineCode>aria-disabled</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
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
            <PrincipleCard number={1} title="Interactive Role" desc="onClick/onPress가 있으면 role='button'이 자동 설정됩니다. 스크린 리더가 인터랙티브 요소로 인식합니다." />
            <PrincipleCard number={2} title="Keyboard Navigation" desc="Enter/Space 키로 활성화할 수 있습니다. Tab 키로 리스트 항목 간 이동이 가능합니다." />
            <PrincipleCard number={3} title="Touch Target" desc="최소 44px 높이로 터치 영역을 확보합니다. small 사이즈도 iOS HIG 기준을 충족합니다." />
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
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ListCell Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={LISTCELL_SOURCE}
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
        <CodeBlock code={`import { ListCell } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<AvatarDemo />} title="홍길동" subtitle="hong@example.com" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <ListCellDemo leading={<AvatarDemo />} title="김철수" subtitle="kim@example.com" trailing={<ChevronIcon />} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCell
  leading={<Avatar src="user.jpg" />}
  title="홍길동"
  subtitle="hong@example.com"
  trailing={<ChevronRight />}
  onClick={() => {}}
/>`} />
      </Section>

      <Section title="Variants">
        <Subsection title="With Leading Icon">
          <PreviewBox>
            <div style={{ padding: 24, width: "100%" }}>
              <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
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
            <div style={{ padding: 24, width: "100%" }}>
              <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
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
            <div style={{ padding: 24, width: "100%" }}>
              <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
                <ListCellDemo leading={<CryptoIcon symbol="ETH" color="#627eea" />} title="Ethereum" subtitle="0.7812 ETH" trailing={<span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩3,245,000</span>} divider onClick={() => {}} />
                <ListCellDemo leading={<CryptoIcon symbol="BTC" color="#f7931a" />} title="Bitcoin" subtitle="0.0234 BTC" trailing={<span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>₩2,890,000</span>} onClick={() => {}} />
              </div>
            </div>
          </PreviewBox>
          <CodeBlock code={`<ListCell
  leading={<CryptoIcon symbol="ETH" />}
  title="Ethereum"
  subtitle="0.7812 ETH"
  trailing={<span>₩3,245,000</span>}
  onClick={() => navigate('/eth-detail')}
/>`} />
        </Subsection>
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<StatusDot color="#22c55e" />} title="업비트" subtitle="연동됨" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>연결됨</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="#3b82f6" />} title="빗썸" subtitle="미연동" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6" }}>연결하기</span>} divider onClick={() => {}} />
              <ListCellDemo leading={<StatusDot color="#ef4444" />} title="코인원" subtitle="연동 오류" trailing={<span style={{ fontSize: 13, fontWeight: 600, color: "#ef4444" }}>재연결</span>} onClick={() => {}} />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Success - 연결 상태 */}
<ListCell
  title="업비트"
  subtitle="연동됨"
  trailing={<Text color="success">연결됨</Text>}
  onClick={() => {}}
/>

{/* Brand - 액션 유도 */}
<ListCell
  title="빗썸"
  subtitle="미연동"
  trailing={<Text color="brand">연결하기</Text>}
  onClick={() => connectExchange('bithumb')}
/>

{/* Error - 에러 상태 */}
<ListCell
  title="코인원"
  subtitle="연동 오류"
  trailing={<Text color="error">재연결</Text>}
  onClick={() => reconnect('coinone')}
/>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {(["small", "medium", "large"] as ListCellSize[]).map((s, i, arr) => (
                <ListCellDemo
                  key={s}
                  size={s}
                  leading={<AvatarDemo />}
                  title={`${s.charAt(0).toUpperCase() + s.slice(1)} Size`}
                  subtitle={`minHeight: ${sizeInfo[s].minHeight}px`}
                  trailing={<ChevronIcon />}
                  divider={i < arr.length - 1}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ListCell size="small" title="Small" subtitle="44px" onClick={() => {}} />
<ListCell size="medium" title="Medium" subtitle="56px" onClick={() => {}} />
<ListCell size="large" title="Large" subtitle="72px" onClick={() => {}} />`} />
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
              <ListCellDemo leading={<AvatarDemo />} title="Default" subtitle="클릭 가능" trailing={<ChevronIcon />} divider onClick={() => {}} />
              <div style={{ opacity: 0.4, pointerEvents: "none" as const }}>
                <ListCellDemo leading={<AvatarDemo />} title="Disabled" subtitle="비활성화" trailing={<ChevronIcon />} />
              </div>
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Default */}
<ListCell
  title="Default"
  subtitle="클릭 가능"
  onClick={() => {}}
/>

{/* Disabled */}
<ListCell
  title="Disabled"
  subtitle="비활성화"
  disabled
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "leading", type: "ReactNode", required: false, description: "좌측 영역 (아이콘, 아바타)" },
              { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
              { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
              { name: "trailing", type: "ReactNode", required: false, description: "우측 영역" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
              { name: "divider", type: "boolean", required: false, defaultVal: "false", description: "하단 구분선" },
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
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ListCell Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={LISTCELL_SOURCE}
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
        <CodeBlock code={`import { ListCell } from '@baerae-zkap/design-system/native';`} />
      </Section>

      <Section title="Basic Usage">
        <CodeBlock code={`<ListCell
  leading={<Avatar src="user.jpg" />}
  title="홍길동"
  subtitle="hong@example.com"
  trailing={<ChevronRight />}
  onPress={() => navigate('user-detail')}
/>`} />
      </Section>

      <Section title="Variants">
        <Subsection title="Settings List">
          <CodeBlock code={`<View style={{ backgroundColor: 'white', borderRadius: 16 }}>
  <ListCell
    leading={<SettingsIcon />}
    title="알림 설정"
    trailing={<ChevronRight />}
    onPress={() => navigate('notifications')}
    divider
  />
  <ListCell
    leading={<SecurityIcon />}
    title="보안"
    trailing={<ChevronRight />}
    onPress={() => navigate('security')}
  />
</View>`} />
        </Subsection>

        <Subsection title="Asset List with Values">
          <CodeBlock code={`<View style={{ backgroundColor: 'white', borderRadius: 16 }}>
  <SectionHeader title="내 자산" />
  <ListCell
    leading={<CryptoIcon symbol="ETH" />}
    title="Ethereum"
    subtitle="0.7812 ETH"
    trailing={<Text style={{ fontWeight: '600' }}>₩3,245,000</Text>}
    onPress={() => navigate('eth-detail')}
    divider
  />
  <ListCell
    leading={<CryptoIcon symbol="BTC" />}
    title="Bitcoin"
    subtitle="0.0234 BTC"
    trailing={<Text style={{ fontWeight: '600' }}>₩2,890,000</Text>}
    onPress={() => navigate('btc-detail')}
  />
</View>`} />
        </Subsection>
      </Section>

      <Section title="Colors">
        <CodeBlock code={`{/* 상태 표시가 있는 리스트 */}
<View style={{ backgroundColor: 'white', borderRadius: 16 }}>
  <ListCell
    leading={<ExchangeIcon name="upbit" />}
    title="업비트"
    subtitle="연동됨"
    trailing={<Text style={{ color: '#22c55e', fontWeight: '600' }}>연결됨</Text>}
    onPress={() => navigate('upbit-detail')}
    divider
  />
  <ListCell
    leading={<ExchangeIcon name="bithumb" />}
    title="빗썸"
    subtitle="미연동"
    trailing={<Text style={{ color: '#3b82f6', fontWeight: '600' }}>연결하기</Text>}
    onPress={() => connectExchange('bithumb')}
    divider
  />
  <ListCell
    leading={<ExchangeIcon name="coinone" />}
    title="코인원"
    subtitle="연동 오류"
    trailing={<Text style={{ color: '#ef4444', fontWeight: '600' }}>재연결</Text>}
    onPress={() => reconnect('coinone')}
  />
</View>`} />
      </Section>

      <Section title="Sizes">
        <CodeBlock code={`{/* Small - 밀도 높은 리스트 */}
<ListCell size="small" title="Small (44px)" onPress={() => {}} />

{/* Medium - 기본 (default) */}
<ListCell size="medium" title="Medium (56px)" onPress={() => {}} />

{/* Large - 강조 리스트 */}
<ListCell size="large" title="Large (72px)" onPress={() => {}} />`} />
      </Section>

      <Section title="States">
        <CodeBlock code={`{/* Default - 터치 가능 */}
<ListCell
  title="Default"
  subtitle="터치 가능"
  trailing={<ChevronRight />}
  onPress={() => {}}
/>

{/* Disabled - 비활성화 */}
<ListCell
  title="Disabled"
  subtitle="비활성화"
  trailing={<ChevronRight />}
  disabled
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "leading", type: "ReactNode", required: false, description: "좌측 영역 (아이콘, 아바타)" },
              { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
              { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
              { name: "trailing", type: "ReactNode", required: false, description: "우측 영역" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
              { name: "divider", type: "boolean", required: false, defaultVal: "false", description: "하단 구분선" },
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

function VariantCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{
        minHeight: 60,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        marginBottom: 16,
        overflow: "hidden",
      }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
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

function RadioGroup({ label, options, value, onChange }: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
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
function CryptoIcon({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      backgroundColor: `${color}15`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      color: color
    }}>
      {symbol}
    </div>
  );
}

function AvatarDemo() {
  return (
    <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color }} />
    </div>
  );
}

function SettingsIconDemo() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
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
  subtitle,
  trailing,
  divider = false,
  onClick,
}: {
  size?: ListCellSize;
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
}) {
  return (
    <ListCell
      size={size}
      leading={leading}
      title={title}
      subtitle={subtitle}
      trailing={trailing}
      divider={divider}
      onClick={onClick}
    />
  );
}
