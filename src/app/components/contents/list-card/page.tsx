"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";

// Types
type ListCardSize = "small" | "medium" | "large";
type ListCardVariant = "elevated" | "outlined" | "filled";

// Size configurations
const sizeConfig: Record<ListCardSize, { padding: number; thumbnailSize: number; gap: number; titleSize: number; subtitleSize: number; metaSize: number }> = {
  small: { padding: 12, thumbnailSize: 56, gap: 12, titleSize: 14, subtitleSize: 12, metaSize: 13 },
  medium: { padding: 16, thumbnailSize: 80, gap: 12, titleSize: 15, subtitleSize: 13, metaSize: 14 },
  large: { padding: 16, thumbnailSize: 100, gap: 16, titleSize: 16, subtitleSize: 14, metaSize: 15 },
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
        리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.
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

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 360 }}>
          <div style={{ padding: 40, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: variant === "filled" ? "white" : "#fafbfc" }}>
            <ListCardDemo
              variant={variant}
              size={size}
              thumbnail={hasThumbnail ? <ThumbnailDemo /> : undefined}
              badges={hasBadge ? <BadgeDemo /> : undefined}
              title="프리미엄 무선 이어폰"
              subtitle={hasSubtitle ? "고음질 블루투스 5.3 지원" : undefined}
              meta={hasMeta ? "₩89,000" : undefined}
              onClick={() => {}}
            />
          </div>

          <div style={{ backgroundColor: "#fafbfc", padding: 16 }}>
            <div style={{ padding: 24, backgroundColor: "white", borderRadius: 16, display: "flex", flexDirection: "column", gap: 24, height: "100%", boxSizing: "border-box" }}>
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
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>Options</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <CheckboxOption label="Thumbnail" checked={hasThumbnail} onChange={setHasThumbnail} />
                  <CheckboxOption label="Badge" checked={hasBadge} onChange={setHasBadge} />
                  <CheckboxOption label="Subtitle" checked={hasSubtitle} onChange={setHasSubtitle} />
                  <CheckboxOption label="Meta (Price)" checked={hasMeta} onChange={setHasMeta} />
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

      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {(["elevated", "outlined", "filled"] as ListCardVariant[]).map((v) => (
            <VariantCard key={v} name={v.charAt(0).toUpperCase() + v.slice(1)} description={v === "elevated" ? "그림자 효과" : v === "outlined" ? "테두리" : "배경색"}>
              <ListCardDemo variant={v} size="small" thumbnail={<ThumbnailDemo size={40} />} title="상품명" meta="₩10,000" />
            </VariantCard>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {(["small", "medium", "large"] as ListCardSize[]).map((s) => (
              <div key={s}>
                <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>{s} (thumbnail: {sizeConfig[s].thumbnailSize}px)</p>
                <ListCardDemo variant="outlined" size={s} thumbnail={<ThumbnailDemo size={sizeConfig[s].thumbnailSize} />} title="상품명" subtitle="상품 설명" meta="₩59,000" onClick={() => {}} />
              </div>
            ))}
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
                ["Border Radius", "radius.semantic.card.sm", "12px"],
                ["Thumbnail Radius", "radius.primitive.sm", "8px"],
                ["Padding (small)", "spacing.primitive.3", "12px"],
                ["Padding (medium/large)", "spacing.primitive.4", "16px"],
                ["Thumbnail (small)", "-", "56px"],
                ["Thumbnail (medium)", "-", "80px"],
                ["Thumbnail (large)", "-", "100px"],
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

      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 12 }}>
          <PrincipleCard number={1} title="Interactive Card" desc="onClick/onPress가 있으면 role='button'이 자동 설정됩니다." />
          <PrincipleCard number={2} title="Image Alt" desc="썸네일 이미지에 적절한 alt 텍스트를 제공하세요." />
          <PrincipleCard number={3} title="Focus Indicator" desc="키보드 포커스 시 시각적 표시가 나타납니다." />
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
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

      <Section title="API Reference">
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
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
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
        <CodeBlock code={`import { ListCard } from '@baerae-zkap/design-system/native';`} />
      </Section>

      <Section title="Basic Usage">
        <CodeBlock code={`<ListCard
  thumbnail={<Image source={{ uri: 'product.jpg' }} style={{ width: '100%', height: '100%' }} />}
  badges={<ContentBadge color="brandDefault">NEW</ContentBadge>}
  title="프리미엄 무선 이어폰"
  subtitle="고음질 블루투스 5.3 지원"
  meta="₩89,000"
  onPress={() => {}}
/>`} />
      </Section>

      <Section title="Product List Example">
        <CodeBlock code={`{products.map((product) => (
  <ListCard
    key={product.id}
    thumbnail={<Image source={{ uri: product.image }} />}
    badges={product.isNew && <ContentBadge color="brandDefault" size="small">NEW</ContentBadge>}
    title={product.name}
    subtitle={product.description}
    meta={\`₩\${product.price.toLocaleString()}\`}
    onPress={() => navigate('product', { id: product.id })}
  />
))}`} />
      </Section>

      <Section title="API Reference">
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
            { name: "onPress", type: "() => void", required: false, description: "탭 핸들러" },
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

function VariantCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 16, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{ marginBottom: 12 }}>{children}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{description}</p>
    </div>
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
          <button key={opt.value} onClick={() => onChange(opt.value)} style={{ padding: "6px 12px", fontSize: 12, borderRadius: 6, border: value === opt.value ? "2px solid #2563eb" : "1px solid #e2e8f0", backgroundColor: value === opt.value ? "#eff6ff" : "white", color: value === opt.value ? "#2563eb" : "#64748b", cursor: "pointer" }}>
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
    <span style={{ display: "inline-flex", alignItems: "center", height: 18, padding: "0 6px", fontSize: 10, fontWeight: 600, color: "white", backgroundColor: "#2563eb", borderRadius: 4 }}>NEW</span>
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
  const [isHovered, setIsHovered] = useState(false);
  const s = sizeConfig[size];

  const getVariantStyle = (): React.CSSProperties => {
    const pressedBg = isHovered && onClick ? "rgba(0,0,0,0.02)" : undefined;
    switch (variant) {
      case "elevated":
        return { backgroundColor: pressedBg || "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" };
      case "outlined":
        return { backgroundColor: pressedBg || "white", border: "1px solid #e2e8f0" };
      case "filled":
        return { backgroundColor: isHovered && onClick ? "#f1f5f9" : "#f8fafc" };
      default:
        return {};
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: s.gap,
        padding: s.padding,
        borderRadius: 12,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s ease",
        ...getVariantStyle(),
      }}
    >
      {thumbnail && <div style={{ width: s.thumbnailSize, height: s.thumbnailSize, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>{thumbnail}</div>}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {badges && <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>{badges}</div>}
        <div style={{ fontSize: s.titleSize, fontWeight: 600, color: "#334155", lineHeight: 1.4 }}>{title}</div>
        {subtitle && <div style={{ fontSize: s.subtitleSize, color: "#64748b" }}>{subtitle}</div>}
        {meta && <div style={{ fontSize: s.metaSize, fontWeight: 700, color: "#334155", marginTop: 4 }}>{meta}</div>}
      </div>
    </div>
  );
}
