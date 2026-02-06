"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";

// Types
type ListCellSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<ListCellSize, {
  minHeight: number;
  paddingY: number;
  paddingX: number;
  titleSize: number;
  subtitleSize: number;
  gap: number;
}> = {
  small: { minHeight: 44, paddingY: 8, paddingX: 16, titleSize: 14, subtitleSize: 12, gap: 12 },
  medium: { minHeight: 56, paddingY: 12, paddingX: 16, titleSize: 15, subtitleSize: 13, gap: 12 },
  large: { minHeight: 72, paddingY: 16, paddingX: 16, titleSize: 16, subtitleSize: 14, gap: 16 },
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
        리스트 아이템을 표시하는 수평 레이아웃 컴포넌트입니다.
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

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Anatomy">
        <div style={{ backgroundColor: "#f5f5f7", borderRadius: 16, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="400" height="80" viewBox="0 0 400 80">
            <rect x="20" y="15" width="360" height="50" rx="0" fill="white" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="55" cy="40" r="18" fill="#e2e8f0" />
            <rect x="85" y="28" width="120" height="10" rx="4" fill="#334155" />
            <rect x="85" y="44" width="80" height="8" rx="4" fill="#94a3b8" />
            <text x="360" y="44" textAnchor="end" fill="#94a3b8" fontSize="16">›</text>
            <line x1="55" y1="0" x2="55" y2="15" stroke="#374151" strokeWidth="1.5" />
            <circle cx="55" cy="0" r="10" fill="#374151" />
            <text x="55" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">1</text>
            <line x1="145" y1="65" x2="145" y2="80" stroke="#374151" strokeWidth="1.5" />
            <circle cx="145" cy="80" r="10" fill="#374151" />
            <text x="145" y="84" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">2</text>
            <line x1="355" y1="0" x2="355" y2="15" stroke="#374151" strokeWidth="1.5" />
            <circle cx="355" cy="0" r="10" fill="#374151" />
            <text x="355" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
          <div>1. Leading</div>
          <div style={{ textAlign: "center" }}>2. Content (Title + Subtitle)</div>
          <div style={{ textAlign: "right" }}>3. Trailing</div>
        </div>
      </Section>

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
                  subtitle={`minHeight: ${sizeConfig[s].minHeight}px`}
                  trailing={<ChevronIcon />}
                  divider={i < arr.length - 1}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      <Section title="Design Tokens">
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

      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 12 }}>
          <PrincipleCard number={1} title="Interactive Role" desc="onClick/onPress가 있으면 role='button'이 자동 설정됩니다." />
          <PrincipleCard number={2} title="Keyboard Navigation" desc="Enter/Space 키로 활성화할 수 있습니다." />
          <PrincipleCard number={3} title="Touch Target" desc="최소 44px 높이로 터치 영역을 확보합니다." />
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
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

      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "leading", type: "ReactNode", required: false, description: "좌측 영역 (아이콘, 아바타)" },
            { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
            { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
            { name: "trailing", type: "ReactNode", required: false, description: "우측 영역" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
            { name: "divider", type: "boolean", required: false, defaultVal: "false", description: "하단 구분선" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
          ]}
        />
      </Section>
    </div>
  );
}

function RNContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Import">
        <CodeBlock code={`import { ListCell } from '@baerae-zkap/design-system/native';`} />
      </Section>

      <Section title="Basic Usage">
        <CodeBlock code={`<ListCell
  leading={<Avatar src="user.jpg" />}
  title="홍길동"
  subtitle="hong@example.com"
  trailing={<ChevronRight />}
  onPress={() => {}}
/>`} />
      </Section>

      <Section title="With Section Headers">
        <CodeBlock code={`// 섹션 헤더가 있는 리스트
<View style={{ backgroundColor: 'white', borderRadius: 16 }}>
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

  <SectionHeader title="설정" />
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
      </Section>

      <Section title="With Status Trailing">
        <CodeBlock code={`// 상태 표시가 있는 리스트
<View style={{ backgroundColor: 'white', borderRadius: 16 }}>
  <ListCell
    leading={<ExchangeIcon name="upbit" />}
    title="업비트"
    subtitle="연동됨"
    trailing={<Text style={{ color: '#22c55e' }}>연결됨</Text>}
    onPress={() => navigate('upbit-detail')}
    divider
  />
  <ListCell
    leading={<ExchangeIcon name="bithumb" />}
    title="빗썸"
    subtitle="미연동"
    trailing={<Text style={{ color: '#3b82f6' }}>연결하기</Text>}
    onPress={() => connectExchange('bithumb')}
  />
</View>`} />
      </Section>

      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "leading", type: "ReactNode", required: false, description: "좌측 영역 (아이콘, 아바타)" },
            { name: "title", type: "ReactNode", required: true, description: "메인 타이틀" },
            { name: "subtitle", type: "ReactNode", required: false, description: "서브타이틀" },
            { name: "trailing", type: "ReactNode", required: false, description: "우측 영역" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "onPress", type: "() => void", required: false, description: "탭 핸들러" },
            { name: "divider", type: "boolean", required: false, defaultVal: "false", description: "하단 구분선" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
          ]}
        />
      </Section>
    </div>
  );
}

// Shared Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 0 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{title}</h2>
      {children}
    </section>
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
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Prop</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>{prop.name}{prop.required && <span style={{ color: "#ef4444" }}>*</span>}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Demo Components - ZKAP App Icons
function TransactionIcon() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    </div>
  );
}

function ExchangeIcon() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
        <path d="M16 3l4 4-4 4" />
        <path d="M20 7H4" />
        <path d="M8 21l-4-4 4-4" />
        <path d="M4 17h16" />
      </svg>
    </div>
  );
}

function MissionIcon() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    </div>
  );
}

function WalletIcon() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
      </svg>
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

function LogoutIcon() {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ padding: "16px 16px 8px", fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>
      {title}
    </div>
  );
}

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
  const [isHovered, setIsHovered] = useState(false);
  const s = sizeConfig[size];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: s.gap,
        minHeight: s.minHeight,
        padding: `${s.paddingY}px ${s.paddingX}px`,
        backgroundColor: isHovered && onClick ? "rgba(0,0,0,0.02)" : "transparent",
        cursor: onClick ? "pointer" : "default",
        borderBottom: divider ? "1px solid #e2e8f0" : "none",
        transition: "background-color 0.15s ease",
      }}
    >
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: s.titleSize, fontWeight: 500, color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
        {subtitle && <div style={{ fontSize: s.subtitleSize, color: "#64748b", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {trailing}
    </div>
  );
}
