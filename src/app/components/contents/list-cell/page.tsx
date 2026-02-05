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
  const [divider, setDivider] = useState(false);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 300 }}>
          <div style={{ padding: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <ListCellDemo
                size={size}
                leading={hasLeading ? <AvatarDemo /> : undefined}
                title="홍길동"
                subtitle={hasSubtitle ? "hong@example.com" : undefined}
                trailing={hasTrailing ? <ChevronIcon /> : undefined}
                divider={divider}
                onClick={() => {}}
              />
              <ListCellDemo
                size={size}
                leading={hasLeading ? <AvatarDemo /> : undefined}
                title="김철수"
                subtitle={hasSubtitle ? "kim@example.com" : undefined}
                trailing={hasTrailing ? <ChevronIcon /> : undefined}
                onClick={() => {}}
              />
            </div>
          </div>

          <div style={{ backgroundColor: "#fafbfc", padding: 16 }}>
            <div style={{ padding: 24, backgroundColor: "white", borderRadius: 16, display: "flex", flexDirection: "column", gap: 24 }}>
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
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
                  Options
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <CheckboxOption label="Leading" checked={hasLeading} onChange={setHasLeading} />
                  <CheckboxOption label="Subtitle" checked={hasSubtitle} onChange={setHasSubtitle} />
                  <CheckboxOption label="Trailing" checked={hasTrailing} onChange={setHasTrailing} />
                  <CheckboxOption label="Divider" checked={divider} onChange={setDivider} />
                </div>
              </div>
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

      <Section title="Settings Menu Example">
        <CodeBlock code={`<View>
  <ListCell
    leading={<SettingsIcon />}
    title="알림 설정"
    trailing={<ChevronRight />}
    onPress={() => navigate('notifications')}
    divider
  />
  <ListCell
    leading={<ProfileIcon />}
    title="계정 정보"
    trailing={<ChevronRight />}
    onPress={() => navigate('account')}
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

function RadioGroup({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>{label}</label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "6px 12px",
              fontSize: 12,
              borderRadius: 6,
              border: value === opt.value ? "2px solid #2563eb" : "1px solid #e2e8f0",
              backgroundColor: value === opt.value ? "#eff6ff" : "white",
              color: value === opt.value ? "#2563eb" : "#64748b",
              cursor: "pointer",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-primary)", cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ width: 16, height: 16 }} />
      {label}
    </label>
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

// Demo Components
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
