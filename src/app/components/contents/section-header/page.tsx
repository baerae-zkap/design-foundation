"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { SectionHeader, ContentBadge, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { SectionHeaderSize } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";

export default function SectionHeaderPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Section Header" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Section Header
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        콘텐츠 영역이나 특정 섹션의 시작을 명확하게 알려주는 제목 요소입니다.
      </p>

      <SectionHeaderPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function SectionHeaderPlayground() {
  const [platform, setPlatform] = useState<"mobile" | "desktop">("mobile");
  const [headingContentType, setHeadingContentType] = useState<"none" | "filter" | "icon">("none");
  const [trailingType, setTrailingType] = useState<"none" | "text" | "pagination" | "icon">("text");

  const size: SectionHeaderSize = platform === "mobile" ? "small" : "medium";

  const headingContent =
    headingContentType === "filter" ? (
      <span style={{ display: "inline-flex", alignItems: "center", gap: spacing.primitive[1], padding: "2px 8px", border: "1px solid var(--border-solid-default)", borderRadius: radius.primitive.full, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>
        Filter
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </span>
    ) :
    headingContentType === "icon" ? (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, color: "var(--content-base-secondary)", cursor: "pointer" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="11" y2="18"/></svg>
      </span>
    ) : undefined;

  const trailing =
    trailingType === "text" ? <ActionButton>전체보기</ActionButton> :
    trailingType === "pagination" ? (
      <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", display: "inline-flex", alignItems: "center", gap: spacing.primitive[1] }}>
        1 / 5
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </span>
    ) :
    trailingType === "icon" ? (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, color: "var(--content-base-secondary)", cursor: "pointer" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
      </span>
    ) : undefined;

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: `${spacing.primitive[10]}px ${spacing.primitive[6]}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", backgroundColor: "var(--surface-base-default)" }}>
              <SectionHeader
                size={size}
                title="내 자산"
                headingContent={headingContent}
                trailing={trailing}
              />
            </div>
          </div>

          <div style={{
            backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
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
                label="Platform"
                options={[
                  { value: "mobile", label: "Mobile" },
                  { value: "desktop", label: "Desktop" },
                ]}
                value={platform}
                onChange={(v) => setPlatform(v as "mobile" | "desktop")}
              />
              <RadioGroup
                label="Heading content"
                options={[
                  { value: "none", label: "None" },
                  { value: "filter", label: "Filter button" },
                  { value: "icon", label: "Icon button" },
                ]}
                value={headingContentType}
                onChange={(v) => setHeadingContentType(v as "none" | "filter" | "icon")}
              />
              <RadioGroup
                label="Trailing content"
                options={[
                  { value: "none", label: "None" },
                  { value: "text", label: "Text button" },
                  { value: "pagination", label: "Pagination" },
                  { value: "icon", label: "Icon button" },
                ]}
                value={trailingType}
                onChange={(v) => setTrailingType(v as "none" | "text" | "pagination" | "icon")}
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

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>SectionHeader</InlineCode>는 섹션의 주제를 설명하고 추가 정보나 관련 페이지로 이동할 수 있는 링크를 함께 제공합니다.
          Heading, Heading content, Trailing content 세 개의 슬롯으로 구성됩니다.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`, width: "100%" }}>
            <div style={{ maxWidth: 400, margin: "0 auto" }}>
              {/* Anatomy diagram */}
              <div style={{
                display: "flex",
                alignItems: "flex-end",
                gap: spacing.primitive[2],
                padding: spacing.primitive[4],
                border: "1px dashed var(--divider)",
                borderRadius: radius.primitive.md,
                backgroundColor: "var(--surface-base-default)",
                position: "relative",
              }}>
                {/* Heading zone label */}
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: spacing.primitive[2] }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)" }}>Heading</div>
                    {/* Annotation 1 */}
                    <div style={{ position: "absolute", top: -20, left: 0, display: "flex", alignItems: "center", gap: spacing.primitive[1] }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "var(--content-base-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, color: "var(--content-base-onColor)", fontWeight: typography.fontWeight.bold }}>1</span>
                      </div>
                    </div>
                  </div>
                  {/* Heading content slot */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ padding: "2px 8px", border: "1.5px dashed var(--border-brand-default)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--content-brand-default)", backgroundColor: "var(--surface-brand-secondary)" }}>slot</div>
                    <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: spacing.primitive[1] }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "var(--content-base-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, color: "var(--content-base-onColor)", fontWeight: typography.fontWeight.bold }}>2</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Trailing slot */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ padding: "2px 8px", border: "1.5px dashed var(--border-brand-default)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--content-brand-default)", backgroundColor: "var(--surface-brand-secondary)" }}>slot</div>
                  <div style={{ position: "absolute", top: -20, right: 0, display: "flex", alignItems: "center", gap: spacing.primitive[1] }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "var(--content-base-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, color: "var(--content-base-onColor)", fontWeight: typography.fontWeight.bold }}>3</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[6], fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>
                <div>1. Heading</div>
                <div style={{ textAlign: "center" }}>2. Heading content</div>
                <div style={{ textAlign: "right" }}>3. Trailing content</div>
              </div>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          슬롯 구성에 따라 다양하게 조합합니다. Heading content와 Trailing content는 각각 독립적으로 선택합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[5] }}>
          <VariantCard name="Title Only" description="가장 단순한 형태. 섹션 구분만 필요할 때.">
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeader title="내 자산" size="small" />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard name="With Trailing" description="우측에 TextButton, 페이지네이션, IconButton 등을 배치합니다.">
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeader title="최근 거래" size="small" trailing={<ActionButton>전체보기</ActionButton>} />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard name="With Heading Content" description="타이틀 오른쪽 인라인 슬롯에 Chip, 카운트 배지, IconButton 등을 배치합니다.">
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeader
                title="알림"
                size="small"
                headingContent={<ContentBadge color="error" size="small">3</ContentBadge>}
              />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>List items...</div>
            </div>
          </VariantCard>
          <VariantCard name="Full (all slots)" description="Heading + Heading content + Trailing 모두 사용하는 가장 풍부한 형태.">
            <div style={{ width: "100%", maxWidth: 280 }}>
              <SectionHeader
                title="거래소 연동"
                size="small"
                headingContent={
                  <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>2개</span>
                }
                trailing={<ActionButton>+ 추가</ActionButton>}
              />
              <div style={{ borderTop: "1px solid var(--border-solid-alternative)", padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>List items...</div>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Size */}
      <Section title="Size">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          화면 위계에 따라 크기를 변경합니다. 타이틀 텍스트의 Line height에 따라 높이가 결정됩니다.
        </p>
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2], backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", overflow: "hidden", maxWidth: 360 }}>
              <SectionHeader size="small" title="Small · 16px Bold" trailing={<ActionButton>action</ActionButton>} />
              <div style={{ height: 1, backgroundColor: "var(--divider)" }} />
              <SectionHeader size="medium" title="Medium · 20px Bold" trailing={<ActionButton>action</ActionButton>} />
              <div style={{ height: 1, backgroundColor: "var(--divider)" }} />
              <SectionHeader size="large" title="Large · 24px Bold" trailing={<ActionButton>action</ActionButton>} />
            </div>
          </div>
        </PreviewBox>
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, marginTop: spacing.primitive[5] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Font</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Padding Top</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Padding Bottom</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "small", font: "16px / Bold", pt: "12px", pb: "8px" },
                { size: "medium", font: "20px / Bold", pt: "16px", pb: "12px" },
                { size: "large", font: "24px / Bold", pt: "20px", pb: "12px" },
              ].map((row) => (
                <tr key={row.size}>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>{row.size}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--content-brand-default)", fontSize: typography.fontSize.xs }}>{row.font}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>{row.pt}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>{row.pb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Heading content */}
      <Section title="Heading Content">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          타이틀 오른쪽 인라인 Slot 영역입니다. Chip, ContentBadge, IconButton 등을 배치할 수 있습니다.
          타이틀 baseline에 맞춰 하단 정렬됩니다.
        </p>
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: "100%" }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360 }}>
              <SectionHeader title="알림" size="medium" headingContent={<ContentBadge color="error" size="small">3</ContentBadge>} />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360 }}>
              <SectionHeader title="최근 30일 기준" size="medium" headingContent={
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>12건 ↑</span>
              } />
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Trailing content */}
      <Section title="Trailing Content">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          컴포넌트의 가장 우측 Slot 영역입니다. TextButton, Pagination, IconButton 등을 배치할 수 있습니다.
          타이틀 baseline에 맞춰 하단 정렬됩니다. 동시에 두 가지 이상의 타입을 배치하지 않습니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
          {[
            { label: "Text button", element: <ActionButton>전체보기</ActionButton>, desc: "링크 이동, 더보기 등 텍스트 액션" },
            { label: "Pagination", element: <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>1 / 5 &gt;</span>, desc: "페이지 이동 컨트롤" },
            { label: "Icon button", element: <span style={{ fontSize: typography.fontSize.lg, color: "var(--content-base-secondary)", lineHeight: 1, cursor: "pointer" }}>⋯</span>, desc: "더보기 메뉴, 설정 등" },
          ].map(({ label, element, desc }) => (
            <div key={label} style={{ backgroundColor: "var(--surface-base-default)", border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
              <SectionHeader title={label} size="small" trailing={element} />
              <div style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Usage */}
      <Section title="Usage Guidelines">
        <Subsection title="Text Wrapping">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            타이틀은 컨테이너 너비보다 길어질 경우 최대 2줄로 줄 바꿈됩니다.
            Heading content와 Trailing content는 타이틀의 baseline(하단)에 맞춰 정렬됩니다.
          </p>
          <PreviewBox>
            <div style={{ padding: spacing.primitive[6], width: "100%" }}>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360 }}>
                <SectionHeader
                  title="줄바꿈이 발생할 만큼 타이틀이 길어지는 경우"
                  size="medium"
                  headingContent={<ContentBadge color="primary" size="small">NEW</ContentBadge>}
                  trailing={<ActionButton>전체보기</ActionButton>}
                />
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 220 }}>
                    <SectionHeader title="내 자산" size="small" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 220 }}>
                    <SectionHeader title="현재 보유 중인 내 자산 목록입니다" size="small" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}><strong>Do</strong> 간결한 타이틀 (2-3단어)</p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1] }}><strong>Don&apos;t</strong> 긴 문장으로 작성</p>
              </div>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 220 }}>
                    <SectionHeader title="최근 거래" size="small" trailing={<ActionButton>더보기</ActionButton>} />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 220, padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)" }}>최근 거래</div>
                      <button style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, backgroundColor: "var(--content-brand-default)", color: "var(--content-base-onColor)", border: "none", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.xs }}>전체보기</button>
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}><strong>Do</strong> TextButton을 trailing으로 사용</p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1] }}><strong>Don&apos;t</strong> 큰 Button을 trailing에 사용</p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "Title color", token: "content.base.default", value: "var(--content-base-default)" },
                { prop: "Title weight", token: "typography.fontWeight.bold", value: "700" },
                { prop: "Title max lines", token: "-webkit-line-clamp", value: "2" },
                { prop: "Padding X", token: "spacing.primitive[4]", value: "16px" },
                { prop: "Padding top (sm)", token: "spacing.primitive[3]", value: "12px" },
                { prop: "Padding top (md)", token: "spacing.primitive[4]", value: "16px" },
                { prop: "Padding top (lg)", token: "spacing.primitive[5]", value: "20px" },
                { prop: "Slot gap", token: "spacing.primitive[4]", value: "16px" },
                { prop: "Alignment", token: "align-items", value: "flex-end (baseline)" },
              ].map(({ prop, token, value }) => (
                <tr key={prop}>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>{prop}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", color: "var(--text-secondary)", fontSize: typography.fontSize.xs }}>{token}</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: spacing.primitive[4] }}>
          <PrincipleCard number={1} title="Semantic Structure" desc="필요시 title prop에 <h2>/<h3>를 전달하여 스크린 리더 지원" />
          <PrincipleCard number={2} title="Touch Target" desc="trailing 슬롯의 터치 영역은 최소 44×44px 확보" />
          <PrincipleCard number={3} title="Color Contrast" desc="배경과 타이틀 텍스트 최소 4.5:1 대비 유지" />
        </div>
      </Section>

      {/* Related */}
      <Section title="Related Components">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
              <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>컴포넌트</th>
              <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>차이점</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ListCell", "리스트 행 단위 — SectionHeader는 섹션 시작점"],
              ["Accordion", "접고 펼침 가능 — SectionHeader는 고정 제목"],
              ["Card", "콘텐츠 컨테이너 — SectionHeader는 제목+슬롯만 제공"],
            ].map(([name, desc]) => (
              <tr key={name} style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold }}>{name}</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <a
            href="https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/SectionHeader"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--content-brand-default)", textDecoration: "none", fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}
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
          <div style={{ padding: spacing.primitive[6] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeader title="내 자산" />
              <ListCellSimple title="Ethereum" value="₩3,245,000" />
              <ListCellSimple title="Bitcoin" value="₩2,890,000" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`<SectionHeader title="내 자산" />`} />
      </Section>

      <Section title="With Trailing">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeader
                title="최근 거래"
                trailing={
                  <button style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--content-brand-default)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    전체보기
                  </button>
                }
              />
              <ListCellSimple title="Ethereum" value="+0.5 ETH" valueColor="var(--content-success-default)" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`import { SectionHeader, TextButton } from '@baerae-zkap/design-system';

<SectionHeader
  title="최근 거래"
  trailing={
    <TextButton size="small" color="primary" onClick={() => navigate('/transactions')}>
      전체보기
    </TextButton>
  }
/>`} />
      </Section>

      <Section title="With Heading Content">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeader
                title="알림"
                headingContent={<ContentBadge color="error" size="small">3</ContentBadge>}
                trailing={<ActionButton>전체보기</ActionButton>}
              />
              <ListCellSimple title="새 메시지" value="방금 전" />
            </div>
            <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, overflow: "hidden", maxWidth: 360, boxShadow: "0 1px 3px var(--shadow-primitive-xs)" }}>
              <SectionHeader
                title="줄바꿈 테스트 — 긴 타이틀은 최대 2줄"
                headingContent={<ContentBadge color="neutral" size="small">12</ContentBadge>}
                trailing={<ActionButton>더보기</ActionButton>}
              />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`import { SectionHeader, ContentBadge } from '@baerae-zkap/design-system';

<SectionHeader
  title="알림"
  headingContent={<ContentBadge color="error" size="small">3</ContentBadge>}
  trailing={<TextButton size="small">전체보기</TextButton>}
/>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            {(["small", "medium", "large"] as SectionHeaderSize[]).map((s) => (
              <div key={s} style={{ backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, overflow: "hidden", maxWidth: 360, border: "1px solid var(--divider)" }}>
                <SectionHeader size={s} title={`Size ${s}`} trailing={<ActionButton>action</ActionButton>} />
                <ListCellSimple title="Item" />
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={`<SectionHeader size="small" title="Small" />
<SectionHeader size="medium" title="Medium" />
<SectionHeader size="large" title="Large" />`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Props">
          <PropsTable
            props={[
              { name: "title", type: "ReactNode", required: true, description: "섹션 타이틀 (최대 2줄 표시)" },
              { name: "headingContent", type: "ReactNode", required: false, description: "타이틀 오른쪽 인라인 슬롯 — Chip, ContentBadge, IconButton 등. baseline 하단 정렬" },
              { name: "trailing", type: "ReactNode", required: false, description: "맨 우측 슬롯 — TextButton, Pagination, IconButton 등. baseline 하단 정렬" },
              { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "타이틀 크기 및 패딩 (small=16px, medium=20px, large=24px)" },
              { name: "style", type: "React.CSSProperties", required: false, description: "커스텀 스타일" },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}

// Helpers
function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      fontSize: typography.fontSize.compact,
      fontWeight: typography.fontWeight.medium,
      color: "var(--content-brand-default)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      whiteSpace: "nowrap",
    }}>
      {children}
    </button>
  );
}

function ListCellSimple({ title, value, valueColor }: { title: string; value?: string; valueColor?: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
      borderBottom: "1px solid var(--border-solid-alternative)",
    }}>
      <span style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-default)" }}>{title}</span>
      {value && <span style={{ fontSize: typography.fontSize.compact, color: valueColor || "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>{value}</span>}
    </div>
  );
}
