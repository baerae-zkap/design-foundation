"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

// GitHub source URLs
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system";
const WEB_SOURCE = `${GITHUB_BASE}/src/components/Thumbnail/Thumbnail.tsx`;
const NATIVE_SOURCE = `${GITHUB_BASE}/src/native/Thumbnail.tsx`;

export default function ThumbnailPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Thumbnail" },
        ]}
      />

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Thumbnail
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        이미지/비디오 콘텐츠를 표시하는 컴포넌트입니다. 다양한 종횡비와 스타일 옵션을 지원합니다.
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
  const [radius, setRadius] = useState(true);
  const [border, setBorder] = useState(false);
  const [playIcon, setPlayIcon] = useState(false);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio={aspectRatio}
              size={size}
              radius={radius}
              border={border}
              playIcon={playIcon}
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
                value={radius ? "true" : "false"}
                onChange={(v) => setRadius(v === "true")}
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
  if (platform === "web") return <WebContent />;
  return <RNContent />;
}

function DesignContent() {
  return (
    <div>
      <Section title="Anatomy">
        <div style={{ backgroundColor: "#fafbfc", borderRadius: 12, padding: 32, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 240 }}>
              <ThumbnailDemo
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
                aspectRatio="16:9"
                radius
              />
              <div style={{ position: "absolute", top: -20, left: -60, fontSize: 12, color: "#6b7280" }}>
                Container
              </div>
              <div style={{ position: "absolute", bottom: -20, right: -60, fontSize: 12, color: "#6b7280" }}>
                Image
              </div>
            </div>
          </div>
        </div>
        <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Container</strong>: 종횡비와 크기를 정의하는 래퍼</li>
          <li><strong>Image</strong>: 실제 이미지 콘텐츠 (object-fit: cover)</li>
          <li><strong>Overlay</strong>: (선택) 이미지 위에 표시되는 콘텐츠</li>
          <li><strong>Play Icon</strong>: (선택) 비디오 콘텐츠 인디케이터</li>
        </ul>
      </Section>

      <Section title="Aspect Ratios">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
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

      <Section title="Sizes">
        <div style={{ backgroundColor: "#fafbfc", borderRadius: 12, padding: 32 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={64} />
              <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>64px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={80} />
              <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>80px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={120} />
              <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>120px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" size={160} />
              <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>160px</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Styles">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
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

      <Section title="Design Tokens">
        <DesignTokensTable
          tokens={[
            { name: "Border Radius", value: "12px", usage: "radius=true일 때" },
            { name: "Border Color", value: "rgba(0,0,0,0.08)", usage: "border=true일 때" },
            { name: "Play Icon Size", value: "48px", usage: "playIcon 크기" },
            { name: "Play Icon Background", value: "rgba(0,0,0,0.6)", usage: "반투명 배경" },
            { name: "Fallback Background", value: "#f1f5f9", usage: "에러 시 배경색" },
          ]}
        />
      </Section>

      <Section title="Usage Guidelines">
        <GuidelinesTable
          guidelines={[
            {
              do: "콘텐츠 타입에 맞는 aspectRatio 선택",
              dont: "모든 썸네일에 동일한 비율 사용",
            },
            {
              do: "비디오 콘텐츠에는 playIcon 활성화",
              dont: "이미지에 playIcon 사용",
            },
            {
              do: "로드 실패를 고려한 fallback 제공",
              dont: "에러 처리 없이 썸네일 사용",
            },
            {
              do: "같은 컨텍스트에서 일관된 크기 유지",
              dont: "무작위 크기의 썸네일 배치",
            },
          ]}
        />

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
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
      </Section>

      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 16 }}>
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
    </div>
  );
}

function WebContent() {
  return (
    <div>
      <Section title="Source Code">
        <div style={{
          padding: 16,
          backgroundColor: "#f8fafc",
          borderRadius: 8,
          border: "1px solid var(--divider)",
          fontSize: 14,
        }}>
          <a href={WEB_SOURCE} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>
            View on GitHub →
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Thumbnail } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: 24 }}>
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
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
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
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
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

function RNContent() {
  return (
    <div>
      <Section title="Source Code">
        <div style={{
          padding: 16,
          backgroundColor: "#f8fafc",
          borderRadius: 8,
          border: "1px solid var(--divider)",
          fontSize: 14,
        }}>
          <a href={NATIVE_SOURCE} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>
            View on GitHub →
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Thumbnail } from '@baerae-zkap/design-system/native';
import { View, Text } from 'react-native';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio="16:9"
              size={240}
              radius
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail
  src={{ uri: "https://example.com/image.jpg" }}
  alt="Image description"
  aspectRatio="16:9"
  size={240}
  radius
  onPress={() => console.log('Pressed')}
/>`} />
      </Section>

      <Section title="Aspect Ratios">
        <PreviewBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: 24 }}>
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="1:1" />
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="16:9" />
            <ThumbnailDemo src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" aspectRatio="4:3" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail src={{ uri: "..." }} aspectRatio="1:1" />
<Thumbnail src={{ uri: "..." }} aspectRatio="16:9" />
<Thumbnail src={{ uri: "..." }} aspectRatio="4:3" />`} />
      </Section>

      <Section title="With Play Icon">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio="16:9"
              size={240}
              playIcon
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail
  src={{ uri: "https://example.com/video-poster.jpg" }}
  alt="Video thumbnail"
  aspectRatio="16:9"
  playIcon
  onPress={() => playVideo()}
/>`} />
      </Section>

      <Section title="With Overlay">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
            <ThumbnailDemo
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400"
              aspectRatio="1:1"
              size={120}
              overlay={
                <div style={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  right: 8,
                  padding: 8,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: 4,
                  color: "white",
                  fontSize: 12,
                  textAlign: "center",
                }}>
                  Live
                </div>
              }
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Thumbnail
  src={{ uri: "..." }}
  aspectRatio="1:1"
  size={120}
  overlay={
    <View style={{
      position: 'absolute',
      bottom: 8,
      left: 8,
      right: 8,
      padding: 8,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 4,
    }}>
      <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
        Live
      </Text>
    </View>
  }
/>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "src", type: "ImageSourcePropType", required: true, description: "이미지 소스" },
              { name: "alt", type: "string", required: false, defaultVal: "''", description: "대체 텍스트" },
              { name: "aspectRatio", type: "ThumbnailAspectRatio", required: false, defaultVal: "'1:1'", description: "종횡비" },
              { name: "size", type: "number", required: false, description: "너비 크기" },
              { name: "radius", type: "boolean", required: false, defaultVal: "true", description: "라운드 모서리 (12px)" },
              { name: "border", type: "boolean", required: false, defaultVal: "false", description: "테두리 표시" },
              { name: "playIcon", type: "boolean", required: false, defaultVal: "false", description: "재생 아이콘 표시" },
              { name: "fallback", type: "string | ReactNode", required: false, description: "실패 시 대체 콘텐츠" },
              { name: "overlay", type: "ReactNode", required: false, description: "오버레이 콘텐츠" },
            ]}
          />
        </Subsection>

        <Subsection title="React Native-specific Props">
          <PropsTable
            props={[
              { name: "onPress", type: "() => void", required: false, description: "터치 핸들러" },
              { name: "style", type: "ViewStyle", required: false, description: "커스텀 스타일" },
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

function AspectRatioCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ marginBottom: 16 }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function StyleCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{
        marginBottom: 16,
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        justifyContent: "center",
      }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
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
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "#e5e7eb",
          color: "#6b7280",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 600,
        }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

function DesignTokensTable({ tokens }: { tokens: { name: string; value: string; usage: string }[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)" }}>Token</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)" }}>Value</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)" }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", color: "var(--text-primary)", fontWeight: 500 }}>{token.name}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>{token.value}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GuidelinesTable({ guidelines }: { guidelines: { do: string; dont: string }[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", width: "50%" }}>
              ✓ Do
            </th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", width: "50%" }}>
              ✗ Don't
            </th>
          </tr>
        </thead>
        <tbody>
          {guidelines.map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{item.do}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{item.dont}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 32 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Prop</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Required</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "#6366f1" }}>{prop.name}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6b7280" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px" }}>{prop.required ? "✅" : "❌"}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6b7280" }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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


// Demo Component
type ThumbnailAspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '2:1' | '9:16' | '3:4';

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
  const [hasError, setHasError] = useState(false);

  const aspectRatioMap: Record<ThumbnailAspectRatio, string> = {
    '1:1': '100%',
    '16:9': '56.25%',
    '4:3': '75%',
    '3:2': '66.67%',
    '2:1': '50%',
    '9:16': '177.78%',
    '3:4': '133.33%',
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: size ? `${size}px` : '100%',
    overflow: 'hidden',
    borderRadius: radius ? 12 : 0,
    border: border ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
  };

  const aspectBoxStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: aspectRatioMap[aspectRatio],
  };

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const playIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    pointerEvents: 'none',
  };

  const triangleStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    borderLeft: '12px solid white',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    marginLeft: 3,
  };

  const fallbackStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    color: '#94a3b8',
    fontSize: 14,
  };

  return (
    <div style={containerStyle}>
      <div style={aspectBoxStyle}>
        {hasError ? (
          <div style={fallbackStyle}>Image unavailable</div>
        ) : (
          <>
            <img
              src={src}
              alt="Thumbnail"
              style={imageStyle}
              onError={() => setHasError(true)}
            />
            {overlay}
            {playIcon && (
              <div style={playIconStyle}>
                <div style={triangleStyle} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
