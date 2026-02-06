"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";

// Types
type SectionHeaderSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<SectionHeaderSize, {
  fontSize: number;
  paddingX: number;
  paddingTop: number;
  paddingBottom: number;
}> = {
  small: { fontSize: 13, paddingX: 16, paddingTop: 16, paddingBottom: 8 },
  medium: { fontSize: 14, paddingX: 16, paddingTop: 16, paddingBottom: 8 },
  large: { fontSize: 15, paddingX: 16, paddingTop: 16, paddingBottom: 8 },
};

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
        리스트 섹션 상단에 사용되는 간단한 타이틀 컴포넌트입니다.
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
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, backgroundColor: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
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
  if (platform === "web") return <WebContent />;
  return <RNContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Anatomy">
        <div style={{ backgroundColor: "#f5f5f7", borderRadius: 16, padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="360" height="60" viewBox="0 0 360 60">
            <rect x="0" y="20" width="360" height="32" rx="0" fill="white" stroke="#e2e8f0" strokeWidth="1" />
            <text x="16" y="40" fill="#94a3b8" fontSize="14" fontWeight="600">내 자산</text>
            <text x="344" y="40" textAnchor="end" fill="#2563eb" fontSize="12" fontWeight="500">전체보기</text>
            <line x1="80" y1="0" x2="80" y2="20" stroke="#374151" strokeWidth="1.5" />
            <circle cx="80" cy="0" r="10" fill="#374151" />
            <text x="80" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">1</text>
            <line x1="310" y1="52" x2="310" y2="60" stroke="#374151" strokeWidth="1.5" />
            <circle cx="310" cy="60" r="10" fill="#374151" />
            <text x="310" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">2</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
          <div>1. Title</div>
          <div style={{ textAlign: "right" }}>2. Action (Optional)</div>
        </div>
      </Section>

      <Section title="ZKAP Examples">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <SectionHeaderDemo title="내 자산" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
              <ListCellSimple title="Solana" value="₩1,560,000" />
            </div>

            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <SectionHeaderDemo title="설정" />
              <ListCellSimple title="알림 설정" icon="›" />
              <ListCellSimple title="보안" icon="›" />
              <ListCellSimple title="계정 정보" icon="›" />
            </div>

            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <SectionHeaderDemo title="거래소 연동" action={<ActionButton>+ 추가</ActionButton>} />
              <ListCellSimple title="업비트" value="연결됨" valueColor="#22c55e" />
              <ListCellSimple title="빗썸" value="연결하기" valueColor="#2563eb" />
            </div>
          </div>
        </PreviewBox>
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: 24, width: "100%" }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 360 }}>
              <SectionHeaderDemo size="small" title="Small (13px)" />
              <div style={{ height: 1, backgroundColor: "#e2e8f0" }} />
              <SectionHeaderDemo size="medium" title="Medium (14px)" />
              <div style={{ height: 1, backgroundColor: "#e2e8f0" }} />
              <SectionHeaderDemo size="large" title="Large (15px)" />
            </div>
          </div>
        </PreviewBox>
      </Section>

      <Section title="Design Tokens">
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Property</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Token</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding X</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>spacing.primitive.4</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding Top</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>spacing.primitive.4</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding Bottom</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>spacing.primitive.2</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Size (small)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>13px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Size (medium)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>14px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Size (large)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>15px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Weight</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>600</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Text Color</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1", fontSize: 12 }}>content.base.tertiary</td>
                <td style={{ padding: "12px 16px" }}>#94a3b8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Usage Guidelines">
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>✅ Do</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>❌ Don't</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>간결한 타이틀 사용 (2-3단어)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>긴 문장이나 설명 사용</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>섹션 구분이 명확한 경우에만 사용</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>단일 아이템에 헤더 사용</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>작은 TextButton을 action으로 사용</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>큰 Button을 action으로 사용</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>ListCell과 조합하여 사용</td>
                <td style={{ padding: "12px 16px" }}>독립적으로 사용</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 24 }}>
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
      </Section>

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
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <a
            href="https://github.com/your-org/design-system/tree/main/packages/design-system/src/components/SectionHeader"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
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
            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
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
            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="+0.5 ETH" valueColor="#22c55e" />
              <ListCellSimple title="Bitcoin" value="-0.02 BTC" valueColor="#ef4444" />
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
            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid #e2e8f0" }}>
              <SectionHeaderDemo size="small" title="Small (13px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid #e2e8f0" }}>
              <SectionHeaderDemo size="medium" title="Medium (14px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid #e2e8f0" }}>
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

function RNContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <a
            href="https://github.com/your-org/design-system/tree/main/packages/design-system/src/native/SectionHeader.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
          >
            View on GitHub →
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { SectionHeader } from '@baerae-zkap/design-system/native';
import { View, Text } from 'react-native';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: 24 }}>
            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
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
            <div style={{ backgroundColor: "white", borderRadius: 16, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <SectionHeaderDemo title="최근 거래" action={<ActionButton>전체보기</ActionButton>} />
              <ListCellSimple title="Ethereum" value="+0.5 ETH" valueColor="#22c55e" />
              <ListCellSimple title="Bitcoin" value="-0.02 BTC" valueColor="#ef4444" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`import { SectionHeader, TextButton } from '@baerae-zkap/design-system/native';

<SectionHeader
  title="최근 거래"
  action={
    <TextButton size="small" color="brandDefault" onPress={() => navigate('/transactions')}>
      전체보기
    </TextButton>
  }
/>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid #e2e8f0" }}>
              <SectionHeaderDemo size="small" title="Small (13px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid #e2e8f0" }}>
              <SectionHeaderDemo size="medium" title="Medium (14px)" />
              <ListCellSimple title="Item 1" />
            </div>
            <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", maxWidth: 360, border: "1px solid #e2e8f0" }}>
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

        <Subsection title="React Native-specific Props">
          <PropsTable
            props={[
              { name: "style", type: "ViewStyle", required: false, description: "커스텀 스타일" },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={{
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em"
      }}>
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

function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          backgroundColor: "#e5e7eb", color: "#6b7280",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600,
        }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Prop</th>
            <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Type</th>
            <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Required</th>
            <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Default</th>
            <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name}>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>{prop.name}</td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", fontFamily: "monospace", fontSize: 12 }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none" }}>{prop.required ? "✅" : "-"}</td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", fontFamily: "monospace", fontSize: 12 }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (value: string) => void }) {
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


// Demo Components
function SectionHeaderDemo({ title, action, size = "medium" }: { title: string; action?: React.ReactNode; size?: SectionHeaderSize }) {
  const sizeStyle = sizeConfig[size];
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: sizeStyle.paddingX,
      paddingRight: sizeStyle.paddingX,
      paddingTop: sizeStyle.paddingTop,
      paddingBottom: sizeStyle.paddingBottom,
    }}>
      <div style={{
        fontSize: sizeStyle.fontSize,
        fontWeight: 600,
        color: "#94a3b8",
        lineHeight: 1.4,
        textTransform: "uppercase",
        letterSpacing: "0.02em",
      }}>
        {title}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      fontSize: 12,
      fontWeight: 500,
      color: "#2563eb",
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
      borderBottom: "1px solid #f1f5f9",
    }}>
      <span style={{ fontSize: 14, color: "#334155" }}>{title}</span>
      {value && <span style={{ fontSize: 13, color: valueColor || "#64748b", fontWeight: 500 }}>{value}</span>}
      {icon && <span style={{ fontSize: 18, color: "#94a3b8" }}>{icon}</span>}
    </div>
  );
}
