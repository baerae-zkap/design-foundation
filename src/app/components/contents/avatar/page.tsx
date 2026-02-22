"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard } from "@/components/docs/Cards";
import { Avatar, AvatarGroup, typography, spacing, radius } from "@baerae-zkap/design-system";

const GITHUB_BASE =
  "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const AVATAR_SOURCE = `${GITHUB_BASE}/components/Avatar/Avatar.tsx`;

export default function AvatarPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Avatar" },
        ]}
      />

      <h1
        style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.primitive[2],
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        Avatar
      </h1>
      <p
        style={{
          fontSize: typography.fontSize.sm,
          color: "var(--text-secondary)",
          marginBottom: spacing.primitive[8],
          lineHeight: 1.7,
        }}
      >
        <InlineCode>Avatar</InlineCode>는 사용자 또는 엔티티를 나타내는 원형/둥근 이미지 컴포넌트입니다.
        이미지가 없을 경우 이니셜 폴백을 표시하고, 온라인 상태 인디케이터를 선택적으로 제공합니다.
        <InlineCode>AvatarGroup</InlineCode>으로 여러 아바타를 겹쳐서 표시할 수 있습니다.
      </p>

      <PlatformTabs>{(platform) => <PlatformContent platform={platform} />}</PlatformTabs>
    </div>
  );
}

// ─── Platform Content ────────────────────────────────────────────────

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// ─── Design Tab ──────────────────────────────────────────────────────

function DesignContent() {
  return (
    <div>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          Avatar는 프로필 이미지, 이니셜 폴백, 상태 인디케이터를 포함한 사용자 식별 컴포넌트입니다.
          5가지 크기(<InlineCode>xs</InlineCode>, <InlineCode>sm</InlineCode>, <InlineCode>md</InlineCode>,{" "}
          <InlineCode>lg</InlineCode>, <InlineCode>xl</InlineCode>)와 두 가지 형태
          (<InlineCode>circle</InlineCode>, <InlineCode>rounded</InlineCode>)를 지원합니다.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <svg
            width="320"
            height="160"
            viewBox="0 0 320 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Avatar anatomy diagram"
          >
            {/* Avatar circle */}
            <circle cx="100" cy="80" r="40" fill="var(--fill-normal)" stroke="var(--divider)" strokeWidth="1" />
            {/* Initials */}
            <text x="100" y="85" textAnchor="middle" fontSize="16" fontWeight="500" fill="var(--content-base-secondary)">JD</text>
            {/* Online indicator */}
            <circle cx="128" cy="108" r="7" fill="var(--content-success-default)" stroke="var(--content-base-on-color)" strokeWidth="2" />

            {/* Labels */}
            <line x1="100" y1="40" x2="160" y2="24" stroke="var(--divider)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="165" y="28" fontSize="11" fill="var(--text-secondary)">① Container</text>

            <line x1="100" y1="85" x2="160" y2="72" stroke="var(--divider)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="165" y="76" fontSize="11" fill="var(--text-secondary)">② Initials / Image</text>

            <line x1="128" y1="108" x2="160" y2="120" stroke="var(--divider)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="165" y="124" fontSize="11" fill="var(--text-secondary)">③ Online indicator</text>
          </svg>
        </PreviewBox>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: spacing.primitive[4] }}>
          {[
            ["① Container", "고정 크기의 원형 또는 라운드 컨테이너. 이미지 또는 폴백 콘텐츠를 담음."],
            ["② Initials / Image", "프로필 이미지 또는 alt에서 추출한 최대 2자리 이니셜 텍스트."],
            ["③ Online indicator", "온라인 상태를 표시하는 작은 녹색 원. online prop으로 활성화."],
          ].map(([label, desc]) => (
            <div key={label} style={{ display: "flex", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", minWidth: 160 }}>{label}</span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <Subsection title="Sizes">
          <PreviewBox>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[4] }}>
              {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                  <Avatar size={size} alt="Jane Doe" />
                  <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{size}</span>
                </div>
              ))}
            </div>
          </PreviewBox>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: spacing.primitive[3], lineHeight: 1.6 }}>
            xs(24px), sm(32px), md(40px), lg(48px), xl(64px) 5단계 크기를 지원합니다.
          </div>
        </Subsection>

        <Subsection title="Shapes">
          <PreviewBox>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[6] }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="lg" alt="Jane Doe" shape="circle" />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>circle</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="lg" alt="Jane Doe" shape="rounded" />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>rounded</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Fallback">
          <PreviewBox>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[4] }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="md" alt="Jane Doe" />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>alt 기반 이니셜</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="md" fallback="AB" />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>fallback 직접 지정</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="md" src="https://example.com/nonexistent.jpg" alt="User" />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>이미지 로드 실패</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <PreviewBox>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[6] }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="md" alt="User" />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>default</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="md" alt="User" onClick={() => {}} />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>clickable</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Avatar size="md" alt="User" online />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>online</span>
              </div>
            </div>
          </PreviewBox>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: spacing.primitive[3], lineHeight: 1.6 }}>
            onClick이 제공되면 커서가 pointer로 변경됩니다. online prop으로 상태 인디케이터를 표시합니다.
          </p>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                alt 텍스트를 항상 제공하여 스크린 리더가 사용자를 식별할 수 있도록 합니다.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                alt 없이 아바타를 렌더링하지 마세요. 폴백 이니셜도 표시되지 않습니다.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                AvatarGroup의 max를 화면 공간에 맞게 제한하여 오버플로 +N 인디케이터를 활용합니다.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                너무 많은 아바타를 max 없이 나열하면 레이아웃이 깨질 수 있습니다.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                컨텍스트에 맞는 크기를 사용하세요. 댓글/피드는 sm-md, 프로필 헤더는 lg-xl.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                동일한 목록에서 크기를 혼합하지 마세요. AvatarGroup의 size prop을 사용하세요.
              </p>
            </DontCard>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
          {[
            ["fill.normal", "폴백 배경색"],
            ["content.base.secondary", "이니셜 텍스트 색상"],
            ["content.success.default", "온라인 인디케이터 색상"],
            ["content.base.onColor", "인디케이터 보더 색상"],
            ["radius.primitive.full", "circle 형태 (9999px)"],
            ["radius.component.avatar.square", "rounded 형태 (12px)"],
          ].map(([token, desc]) => (
            <div key={token} style={{ display: "flex", gap: spacing.primitive[4], alignItems: "baseline" }}>
              <InlineCode>{token}</InlineCode>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: spacing.primitive[4], margin: 0 }}>
          <li>이미지에는 <InlineCode>alt</InlineCode> 속성이 자동 적용됩니다.</li>
          <li>onClick이 제공된 아바타는 <InlineCode>role="button"</InlineCode>과 <InlineCode>tabIndex=0</InlineCode>이 부여됩니다.</li>
          <li>키보드 Enter/Space로 클릭 동작을 실행할 수 있습니다.</li>
          <li>온라인 인디케이터는 <InlineCode>aria-label="온라인"</InlineCode>을 포함합니다.</li>
          <li>AvatarGroup은 <InlineCode>role="group"</InlineCode>으로 감싸집니다.</li>
        </ul>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.primitive[2] }}>
          {[
            ["Skeleton", "/components/feedback/skeleton", "아바타 로딩 시 circular skeleton 사용"],
            ["Thumbnail", "/components/contents/thumbnail", "이미지 콘텐츠 표시 (고정 비율)"],
            ["ListCell", "/components/contents/list-cell", "아바타 + 텍스트 목록 행"],
          ].map(([name, href, desc]) => (
            <a
              key={name as string}
              href={href as string}
              style={{
                padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
                borderRadius: radius.primitive.sm,
                border: "1px solid var(--divider)",
                fontSize: 13,
                color: "var(--text-secondary)",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{name as string}</span>
              <span>{desc as string}</span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── Web Tab ─────────────────────────────────────────────────────────

function WebContent() {
  return (
    <div>
      {/* Source Code */}
      <Section title="Source Code">
        <a
          href={AVATAR_SOURCE}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 14, color: "var(--content-brand-default)" }}
        >
          Avatar/Avatar.tsx on GitHub ↗
        </a>
      </Section>

      {/* Import */}
      <Section title="Import">
        <CodeBlock
          code={`import { Avatar, AvatarGroup } from '@baerae-zkap/design-system';
import type { AvatarProps, AvatarGroupProps, AvatarSize } from '@baerae-zkap/design-system';`}
          language="tsx"
        />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[4] }}>
            <Avatar src="https://i.pravatar.cc/80?img=1" alt="Alice" size="md" />
            <Avatar alt="Bob Smith" size="md" />
            <Avatar alt="Carol" size="md" online />
            <Avatar alt="Dave" size="md" shape="rounded" />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`// With image
<Avatar src="https://..." alt="Alice" size="md" />

// Initials fallback (derived from alt)
<Avatar alt="Bob Smith" size="md" />

// Online indicator
<Avatar alt="Carol" size="md" online />

// Rounded shape
<Avatar alt="Dave" size="md" shape="rounded" />`}
          language="tsx"
        />
      </Section>

      {/* With Groups */}
      <Section title="With Groups">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[6] }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>기본 그룹</span>
              <AvatarGroup size="md">
                <Avatar src="https://i.pravatar.cc/80?img=1" alt="Alice" />
                <Avatar src="https://i.pravatar.cc/80?img=2" alt="Bob" />
                <Avatar src="https://i.pravatar.cc/80?img=3" alt="Carol" />
                <Avatar alt="Dave Lee" />
              </AvatarGroup>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>max=3 오버플로</span>
              <AvatarGroup size="md" max={3}>
                <Avatar src="https://i.pravatar.cc/80?img=1" alt="Alice" />
                <Avatar src="https://i.pravatar.cc/80?img=2" alt="Bob" />
                <Avatar src="https://i.pravatar.cc/80?img=3" alt="Carol" />
                <Avatar alt="Dave Lee" />
                <Avatar alt="Eve Park" />
              </AvatarGroup>
            </div>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`// Basic group
<AvatarGroup size="md">
  <Avatar src="https://..." alt="Alice" />
  <Avatar src="https://..." alt="Bob" />
  <Avatar alt="Carol" />
</AvatarGroup>

// With overflow indicator
<AvatarGroup size="md" max={3}>
  <Avatar src="https://..." alt="Alice" />
  <Avatar src="https://..." alt="Bob" />
  <Avatar src="https://..." alt="Carol" />
  <Avatar alt="Dave" />
  <Avatar alt="Eve" />
  {/* Shows: Alice, Bob, Carol, +2 */}
</AvatarGroup>`}
          language="tsx"
        />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <Subsection title="Avatar">
          <PropsTable
            props={[
              { name: "src", type: "string", required: false, description: "이미지 소스 URL. 로드 실패 시 폴백으로 전환됩니다." },
              { name: "alt", type: "string", required: false, description: "이미지 alt 텍스트. 이니셜 폴백 생성에도 사용됩니다." },
              { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", required: false, defaultVal: "'md'", description: "아바타 크기. xs=24px, sm=32px, md=40px, lg=48px, xl=64px." },
              { name: "shape", type: "'circle' | 'rounded'", required: false, defaultVal: "'circle'", description: "아바타 형태. circle은 완전한 원형, rounded는 12px 라운드." },
              { name: "fallback", type: "string", required: false, description: "이니셜 폴백 텍스트를 직접 지정합니다. 미설정 시 alt에서 유도됩니다." },
              { name: "online", type: "boolean", required: false, defaultVal: "false", description: "온라인 상태 인디케이터(녹색 원)를 우측 하단에 표시합니다." },
              { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러. 제공 시 role=button과 키보드 접근성이 자동 적용됩니다." },
              { name: "style", type: "React.CSSProperties", required: false, description: "컨테이너 인라인 스타일 오버라이드." },
            ]}
          />
        </Subsection>

        <Subsection title="AvatarGroup">
          <PropsTable
            props={[
              { name: "children", type: "React.ReactNode", required: true, description: "Avatar 컴포넌트들. size prop이 자동으로 전파됩니다." },
              { name: "max", type: "number", required: false, description: "표시할 최대 아바타 수. 초과 시 +N 오버플로 인디케이터를 표시합니다." },
              { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", required: false, defaultVal: "'md'", description: "모든 자식 Avatar에 적용될 크기." },
              { name: "style", type: "React.CSSProperties", required: false, description: "그룹 컨테이너 인라인 스타일 오버라이드." },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}
