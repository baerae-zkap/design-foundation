"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { Thumbnail } from '@baerae-zkap/design-system';
import type { ThumbnailAspectRatio } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

// GitHub source URLs
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system";
const WEB_SOURCE = `${GITHUB_BASE}/src/components/Thumbnail/Thumbnail.tsx`;

export default function ThumbnailPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Thumbnail" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Thumbnail
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        이미지, 비디오 등 미디어 콘텐츠의 미리보기를 다양한 크기와 형태로 일관되게 표현하는 컴포넌트입니다.
      </p>

      <ThumbnailPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ThumbnailPlayground() {
  const [aspectRatio, setAspectRatio] = useState<ThumbnailAspectRatio>("16:9");
  const [size, setSize] = useState<number>(160);
  const [hasRadius, setHasRadius] = useState(true);
  const [border, setBorder] = useState(false);
  const [playIcon, setPlayIcon] = useState(false);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: spacing.primitive[14], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio={aspectRatio}
              size={size}
              radius={hasRadius}
              border={border}
              playIcon={playIcon}
            />
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
                label="Aspect Ratio"
                options={[
                  { value: "1:1", label: "1:1" },
                  { value: "16:9", label: "16:9" },
                  { value: "4:3", label: "4:3" },
                  { value: "9:16", label: "9:16" },
                ]}
                value={aspectRatio}
                onChange={(v) => setAspectRatio(v as ThumbnailAspectRatio)}
              />
              <RadioGroup
                label="Size"
                options={[
                  { value: "64", label: "64px" },
                  { value: "80", label: "80px" },
                  { value: "120", label: "120px" },
                  { value: "160", label: "160px" },
                ]}
                value={String(size)}
                onChange={(v) => setSize(Number(v))}
              />
              <RadioGroup
                label="Radius"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={hasRadius ? "true" : "false"}
                onChange={(v) => setHasRadius(v === "true")}
              />
              <RadioGroup
                label="Border"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={border ? "true" : "false"}
                onChange={(v) => setBorder(v === "true")}
              />
              <RadioGroup
                label="Play Icon"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={playIcon ? "true" : "false"}
                onChange={(v) => setPlayIcon(v === "true")}
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

// Helper: UsageCard
function UsageCard({ situation, description, example }: {
  situation: string;
  description: string;
  example: string;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: spacing.primitive[1],
      padding: spacing.primitive[4],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{situation}</span>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: spacing.primitive[1] }}>{description}</p>
      <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>{example}</p>
    </div>
  );
}


function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>Thumbnail</InlineCode> 컴포넌트는 이미지, 비디오 등 미디어 콘텐츠의 미리보기를 다양한 크기와 형태로 일관되게 표현해요.
          리스트나 그리드에서 미디어 프리뷰가 필요할 때 사용해요.
        </p>
      </Section>

      {/* Anatomy - SVG Diagram */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-default)",
          borderRadius: radius.primitive.lg,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: spacing.primitive[5],
        }}>
          <svg width="360" height="240" viewBox="0 0 360 240">
            {/* Container outline */}
            <rect x="60" y="20" width="240" height="160" rx="12" fill="var(--border-base-default)" stroke="var(--border-base-default)" strokeWidth="1.5" strokeDasharray="6 3" />

            {/* Image area */}
            <rect x="64" y="24" width="232" height="152" rx="10" fill="var(--content-base-placeholder)" />
            <text x="180" y="100" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="14" fontWeight="500" opacity="0.8">Image Area</text>

            {/* Play icon overlay */}
            <circle cx="180" cy="100" r="24" fill="var(--effect-alpha-overlay-dim)" />
            <polygon points="174,88 174,112 194,100" fill="var(--content-base-onColor)" />

            {/* Overlay bar at bottom */}
            <rect x="64" y="144" width="232" height="32" rx="0" fill="var(--effect-alpha-overlay-dim)" />
            <text x="180" y="164" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="11" fontWeight="500">Overlay</text>

            {/* Numbered annotations */}
            {/* 1 - Container */}
            <line x1="40" y1="40" x2="58" y2="40" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="30" cy="40" r="12" fill="var(--content-base-default)" />
            <text x="30" y="44" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="11" fontWeight="600">1</text>

            {/* 2 - Image */}
            <line x1="310" y1="60" x2="298" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="320" cy="60" r="12" fill="var(--content-base-default)" />
            <text x="320" y="64" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="11" fontWeight="600">2</text>

            {/* 3 - Play Icon */}
            <line x1="210" y1="100" x2="230" y2="100" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <line x1="230" y1="100" x2="230" y2="210" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="230" cy="220" r="12" fill="var(--content-base-default)" />
            <text x="230" y="224" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="11" fontWeight="600">3</text>

            {/* 4 - Overlay */}
            <line x1="310" y1="160" x2="330" y2="160" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <line x1="330" y1="160" x2="330" y2="210" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="330" cy="220" r="12" fill="var(--content-base-default)" />
            <text x="330" y="224" textAnchor="middle" fill="var(--content-base-onColor)" fontSize="11" fontWeight="600">4</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: spacing.primitive[4],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Container</div>
          <div>2. Image</div>
          <div>3. Play Icon</div>
          <div>4. Overlay</div>
        </div>
      </Section>

      {/* Aspect Ratios */}
      <Section title="Aspect Ratios">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: spacing.primitive[5] }}>
          <AspectRatioCard name="1:1" description="정사각형 (프로필, NFT)">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" />
          </AspectRatioCard>
          <AspectRatioCard name="16:9" description="와이드 (비디오, 배너)">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" />
          </AspectRatioCard>
          <AspectRatioCard name="4:3" description="표준 (사진)">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="4:3" />
          </AspectRatioCard>
          <AspectRatioCard name="9:16" description="세로형 (스토리)">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="9:16" />
          </AspectRatioCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <div style={{ backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, padding: spacing.primitive[8] }}>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={64} />
              <div style={{ marginTop: spacing.primitive[3], fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>64px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={80} />
              <div style={{ marginTop: spacing.primitive[3], fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>80px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={120} />
              <div style={{ marginTop: spacing.primitive[3], fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>120px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={160} />
              <div style={{ marginTop: spacing.primitive[3], fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>160px</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Styles */}
      <Section title="Styles">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: spacing.primitive[5] }}>
          <StyleCard name="Default" description="라운드 모서리 (12px)">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" radius />
          </StyleCard>
          <StyleCard name="With Border" description="테두리 추가">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" radius border />
          </StyleCard>
          <StyleCard name="Square" description="모서리 라운드 없음">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" radius={false} />
          </StyleCard>
          <StyleCard name="With Play Icon" description="비디오 인디케이터">
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" radius playIcon />
          </StyleCard>
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Thumbnail은 이미지 로드 상태에 따라 다양한 시각적 상태를 가집니다.
        </p>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            Thumbnail은 미디어 콘텐츠 상태와 사용자 인터랙션에 따라 다양한 시각적 상태를 가집니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <ThumbStateCard label="Default" sublabel="기본 상태">
              <div style={{ width: 120, height: 68, borderRadius: radius.primitive.sm, overflow: "hidden", position: "relative" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "var(--content-base-placeholder)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-onColor)" strokeWidth="1.5" opacity={0.6}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>
            </ThumbStateCard>
            <ThumbStateCard label="Hover" sublabel="오버레이 표시">
              <div style={{ width: 120, height: 68, borderRadius: radius.primitive.sm, overflow: "hidden", position: "relative" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "var(--content-base-placeholder)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-onColor)" strokeWidth="1.5" opacity={0.6}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "var(--effect-alpha-overlay-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--content-base-onColor)", fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.semibold }}>View</span>
                </div>
              </div>
            </ThumbStateCard>
            <ThumbStateCard label="Playing" sublabel="비디오 재생 표시">
              <div style={{ width: 120, height: 68, borderRadius: radius.primitive.sm, overflow: "hidden", position: "relative" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "var(--content-base-placeholder)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: radius.primitive.full, backgroundColor: "var(--effect-alpha-overlay-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--content-base-onColor)">
                      <polygon points="8,5 20,12 8,19" />
                    </svg>
                  </div>
                </div>
              </div>
            </ThumbStateCard>
            <ThumbStateCard label="Error" sublabel="로드 실패">
              <div style={{ width: 120, height: 68, borderRadius: radius.primitive.sm, overflow: "hidden", position: "relative" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "var(--surface-base-alternative)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.primitive[1] }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-placeholder)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                  </svg>
                  <span style={{ fontSize: 9, color: "var(--content-base-placeholder)" }}>Unavailable</span>
                </div>
              </div>
            </ThumbStateCard>
          </div>
        </Subsection>

        <Subsection title="Loading / Skeleton">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], justifyContent: "center", padding: spacing.primitive[6] }}>
              <div style={{
                width: 160,
                borderRadius: radius.primitive.md,
                overflow: "hidden",
              }}>
                <div style={{
                  width: "100%",
                  paddingBottom: "56.25%",
                  backgroundColor: "var(--border-base-default)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, var(--border-base-default) 25%, var(--surface-base-alternative) 50%, var(--border-base-default) 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s ease-in-out infinite",
                  }} />
                </div>
              </div>
              <div style={{
                width: 160,
                borderRadius: radius.primitive.md,
                overflow: "hidden",
              }}>
                <div style={{
                  width: "100%",
                  paddingBottom: "100%",
                  backgroundColor: "var(--border-base-default)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, var(--border-base-default) 25%, var(--surface-base-alternative) 50%, var(--border-base-default) 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s ease-in-out infinite",
                  }} />
                </div>
              </div>
              <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[3], padding: spacing.primitive[3], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
            이미지 로딩 중 Skeleton 애니메이션으로 로딩 상태를 표시합니다.
          </div>
        </Subsection>

        <Subsection title="Error / Fallback">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], justifyContent: "center", padding: spacing.primitive[6] }}>
              <div style={{
                width: 160,
                borderRadius: radius.primitive.md,
                overflow: "hidden",
              }}>
                <div style={{
                  width: "100%",
                  paddingBottom: "56.25%",
                  backgroundColor: "var(--surface-base-alternative)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: spacing.primitive[2],
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-placeholder)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-placeholder)" }}>Unavailable</span>
                  </div>
                </div>
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[3], padding: spacing.primitive[3], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
            이미지 로드 실패 시 fallback UI를 표시합니다. 배경색은 <InlineCode>var(--surface-base-alternative)</InlineCode>입니다.
          </div>
        </Subsection>

        <Subsection title="Hover Overlay">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], justifyContent: "center", padding: spacing.primitive[6] }}>
              <div style={{ position: "relative", width: 160, borderRadius: radius.primitive.md, overflow: "hidden" }}>
                <ThumbnailDemo
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
                  aspectRatio="16:9"
                  size={160}
                  radius
                  overlay={
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "var(--effect-alpha-overlay-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <span style={{ color: "var(--content-base-onColor)", fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold }}>View Detail</span>
                    </div>
                  }
                />
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[3], padding: spacing.primitive[3], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.sm, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
            클릭 가능한 썸네일에 hover 시 반투명 오버레이로 상호작용 가능성을 표시합니다.
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 패턴을 따르세요. 콘텐츠 타입에 맞는 <strong style={{ color: "var(--text-primary)" }}>적절한 종횡비와 크기</strong>를 선택합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageCard
              situation="Content Thumbnail"
              description="글, 뉴스, 블로그 등 콘텐츠 목록에서 미리보기 이미지로 사용"
              example="예시: 16:9 비율, 120-160px, radius=true"
            />
            <UsageCard
              situation="Video Thumbnail"
              description="비디오 콘텐츠의 포스터 이미지로 사용"
              example="예시: 16:9 비율, playIcon=true, onClick으로 재생"
            />
            <UsageCard
              situation="Product Image"
              description="상품/NFT 등의 대표 이미지로 사용"
              example="예시: 1:1 비율, border=true, 80-120px"
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="일관된 종횡비"
              desc="같은 컨텍스트의 썸네일은 동일한 aspectRatio를 사용하여 시각적 통일성을 유지합니다."
            />
            <PrincipleCard
              number={2}
              title="적절한 크기"
              desc="콘텐츠의 중요도와 레이아웃 제약에 맞는 size를 설정합니다."
            />
            <PrincipleCard
              number={3}
              title="명확한 인터랙션"
              desc="클릭 가능한 썸네일에는 onClick/onPress를 제공하고 시각적 피드백을 줍니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" size={80} radius />
                <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" size={80} radius />
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" size={80} radius />
                <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={60} radius={false} />
              </div>
            </DontCard>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[1] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
              <strong>Do</strong> 같은 목록에서 일관된 비율과 크기 유지
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
              <strong>Don't</strong> 무작위 비율과 크기로 시각적 혼란 유발
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ textAlign: "center" }}>
                <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" size={100} radius playIcon />
              </div>
            </DoCard>
            <DontCard>
              <div style={{ textAlign: "center" }}>
                <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" size={100} radius />
              </div>
            </DontCard>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[1] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, paddingLeft: spacing.primitive[1] }}>
              <strong>Do</strong> 비디오 콘텐츠에 playIcon을 표시
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, paddingLeft: spacing.primitive[1], fontStyle: "italic" }}>
              <strong>Don't</strong> 비디오인지 구분할 수 없는 썸네일
            </p>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <DesignTokensTable
          tokens={[
            { name: "Border Radius", value: "12px", usage: "radius=true일 때" },
            { name: "Border Color", value: "var(--border-base-default)", usage: "border=true일 때" },
            { name: "Play Icon Size", value: "48px", usage: "playIcon 크기" },
            { name: "Play Icon Background", value: "var(--effect-alpha-overlay-dim)", usage: "반투명 배경" },
            { name: "Fallback Background", value: "var(--surface-base-alternative)", usage: "에러 시 배경색" },
          ]}
        />
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: spacing.primitive[4] }}>
          <PrincipleCard
            number={1}
            title="대체 텍스트"
            desc="alt prop으로 이미지 설명을 제공하여 스크린 리더 사용자를 지원합니다."
          />
          <PrincipleCard
            number={2}
            title="키보드 접근성"
            desc="onClick/onPress가 있는 썸네일은 자동으로 button role이 부여됩니다."
          />
          <PrincipleCard
            number={3}
            title="오버레이 대비"
            desc="오버레이 텍스트는 WCAG 2.1 AA 기준 (4.5:1) 이상의 대비를 유지합니다."
          />
        </div>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>ListCard</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>미디어 리스트</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ListCard는 Thumbnail을 포함하는 리스트 항목</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Card</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>콘텐츠 컨테이너</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Card 내부에서 Thumbnail을 미디어 프리뷰로 사용</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>ContentBadge</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>정보 라벨</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Thumbnail 위에 ContentBadge로 상태 오버레이 가능</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <div style={{
          padding: spacing.primitive[4],
          backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
          borderRadius: radius.primitive.sm,
          border: "1px solid var(--divider)",
          fontSize: typography.fontSize.sm,
        }}>
          <a href={WEB_SOURCE} target="_blank" rel="noopener noreferrer" style={{ color: "var(--content-brand-default)", textDecoration: "none" }}>
            View on GitHub →
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Thumbnail } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: spacing.primitive[6] }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio="16:9"
              size={240}
              radius
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail
  src="/image.jpg"
  alt="Image description"
  aspectRatio="16:9"
  size={240}
  radius
  onClick={() => console.log('Clicked')}
/>`} />
      </Section>

      <Section title="Aspect Ratios">
        <PreviewBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.primitive[4], padding: spacing.primitive[6] }}>
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" />
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" />
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="4:3" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail src="/image.jpg" aspectRatio="1:1" />
<Thumbnail src="/image.jpg" aspectRatio="16:9" />
<Thumbnail src="/image.jpg" aspectRatio="4:3" />`} />
      </Section>

      <Section title="With Play Icon">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: spacing.primitive[6] }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio="16:9"
              size={240}
              playIcon
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail
  src="/video-poster.jpg"
  alt="Video thumbnail"
  aspectRatio="16:9"
  playIcon
  onClick={() => playVideo()}
/>`} />
      </Section>

      <Section title="With Border">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: spacing.primitive[6] }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio="1:1"
              size={120}
              border
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail
  src="/avatar.jpg"
  aspectRatio="1:1"
  size={120}
  border
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "src", type: "string", required: true, description: "이미지 소스 URL" },
              { name: "alt", type: "string", required: false, defaultVal: "''", description: "대체 텍스트" },
              { name: "aspectRatio", type: "ThumbnailAspectRatio", required: false, defaultVal: "'1:1'", description: "종횡비" },
              { name: "size", type: "number | string", required: false, description: "너비 크기" },
              { name: "radius", type: "boolean", required: false, defaultVal: "true", description: "라운드 모서리 (12px)" },
              { name: "border", type: "boolean", required: false, defaultVal: "false", description: "테두리 표시" },
              { name: "playIcon", type: "boolean", required: false, defaultVal: "false", description: "재생 아이콘 표시" },
              { name: "fallback", type: "string | ReactNode", required: false, description: "실패 시 대체 콘텐츠" },
              { name: "overlay", type: "ReactNode", required: false, description: "오버레이 콘텐츠" },
            ]}
          />
        </Subsection>

        <Subsection title="Web-specific Props">
          <PropsTable
            props={[
              { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
            ]}
          />
        </Subsection>

        <Subsection title="Types">
          <CodeBlock code={`type ThumbnailAspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '2:1' | '9:16' | '3:4';`} />
        </Subsection>
      </Section>
    </div>
  );
}

// Helper Components

function AspectRatioCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: spacing.primitive[5],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ marginBottom: spacing.primitive[4] }}>
        {children}
      </div>
      <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: spacing.primitive[1] }}>{name}</div>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function StyleCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: spacing.primitive[5],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <div style={{
        marginBottom: spacing.primitive[4],
        backgroundColor: "var(--surface-base-alternative)",
        borderRadius: radius.primitive.sm,
        padding: spacing.primitive[4],
        display: "flex",
        justifyContent: "center",
      }}>
        {children}
      </div>
      <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: spacing.primitive[1] }}>{name}</div>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}


function DesignTokensTable({ tokens }: { tokens: { name: string; value: string; usage: string }[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
        <thead>
          <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
            <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Token</th>
            <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Value</th>
            <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.medium }}>{token.name}</td>
              <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>{token.value}</td>
              <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ThumbStateCard({ label, sublabel, children }: {
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

// Demo Component
function ThumbnailDemo({
  src,
  aspectRatio = '1:1',
  size,
  radius = true,
  border = false,
  playIcon = false,
  overlay,
}: {
  src: string;
  aspectRatio?: ThumbnailAspectRatio;
  size?: number;
  radius?: boolean;
  border?: boolean;
  playIcon?: boolean;
  overlay?: React.ReactNode;
}) {
  return (
    <Thumbnail
      src={src}
      alt="Thumbnail"
      aspectRatio={aspectRatio}
      size={size}
      radius={radius}
      border={border}
      playIcon={playIcon}
      overlay={overlay}
    />
  );
}
