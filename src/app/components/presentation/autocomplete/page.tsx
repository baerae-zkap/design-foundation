"use client";

import { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  CodeBlock,
  PreviewBox,
  highlightCode,
  type Platform,
} from "@/components/PlatformTabs";
import { typography, spacing, radius, TopNavigation, IconButton, TextButton } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Types ────────────────────────────────────────────────────────────────────

type AcSize = "sm" | "md" | "lg";
type AcVariant = "text" | "search" | "thumbnail" | "secondary" | "badge";

interface AcOption {
  label: string;
  value: string;
  secondary: string;
  abbr: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const OPTIONS: AcOption[] = [
  { label: "Bitcoin", value: "btc", secondary: "BTC · 디지털 금", abbr: "BT" },
  { label: "Ethereum", value: "eth", secondary: "ETH · 스마트 컨트랙트", abbr: "ET" },
  { label: "BNB Chain", value: "bnb", secondary: "BNB · 바이낸스", abbr: "BN" },
  { label: "Solana", value: "sol", secondary: "SOL · 고속 블록체인", abbr: "SO" },
  { label: "XRP", value: "xrp", secondary: "XRP · 결제 네트워크", abbr: "XR" },
  { label: "Dogecoin", value: "doge", secondary: "DOGE · 밈 코인", abbr: "DO" },
];

// ETH 검색 결과 데모용 데이터
const ETH_OPTIONS: AcOption[] = [
  { label: "Ethereum", value: "eth", secondary: "ETH · 스마트 컨트랙트 플랫폼", abbr: "ET" },
  { label: "Ethereum Classic", value: "etc", secondary: "ETC · 오리지널 이더리움 체인", abbr: "EC" },
  { label: "Ethena", value: "ena", secondary: "ENA · USDe 기반 DeFi 스테이킹", abbr: "EN" },
];

// 쿼리 매칭 텍스트를 bold로 렌더링
function renderHighlight(text: string, query?: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ fontWeight: typography.fontWeight.semibold }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Size Config ──────────────────────────────────────────────────────────────

const SIZE_CFG = {
  sm: { height: spacing.component.input.height.sm, px: spacing.primitive[3], fontSize: typography.fontSize.compact, iconSize: 20, gap: spacing.primitive[2], secondarySize: 10 },
  md: { height: spacing.component.input.height.md, px: spacing.primitive[4], fontSize: typography.fontSize.sm,     iconSize: 24, gap: spacing.primitive[3], secondarySize: 11 },
  lg: { height: spacing.component.input.height.lg, px: spacing.primitive[4], fontSize: typography.fontSize.md,     iconSize: 28, gap: spacing.primitive[3], secondarySize: typography.fontSize.compact },
};

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}


// ─── Option Row ───────────────────────────────────────────────────────────────

function OptionRow({
  option,
  isHovered,
  isDisabled,
  size,
  variant,
  highlight,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  option: AcOption;
  isHovered: boolean;
  highlight?: string;
  isDisabled?: boolean;
  size: AcSize;
  variant: AcVariant;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}) {
  const cfg = SIZE_CFG[size];
  const showSearch = variant === "search";
  const showThumbnail = variant === "thumbnail";
  const showSecondary = variant === "secondary";
  const showBadge = variant === "badge";

  const [isPressed, setIsPressed] = useState(false);

  const bg = (!isDisabled && isHovered) ? "var(--surface-base-alternative)" : "transparent";
  const textColor = isDisabled ? "var(--content-disabled-default)" : "var(--content-base-default)";

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => { onMouseLeave?.(); setIsPressed(false); }}
      onMouseDown={() => { if (!isDisabled) setIsPressed(true); }}
      onMouseUp={() => setIsPressed(false)}
      onClick={!isDisabled ? onClick : undefined}
      style={{
        minHeight: cfg.height,
        display: "flex",
        alignItems: "center",
        gap: cfg.gap,
        paddingInline: cfg.px,
        marginInline: spacing.primitive[4],
        borderRadius: radius.primitive.sm,
        backgroundColor: bg,
        color: textColor,
        cursor: isDisabled ? "not-allowed" : "pointer",
        fontSize: cfg.fontSize,
        transition: "background-color 100ms ease, transform 80ms ease",
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        opacity: isDisabled ? 0.45 : 1,
        userSelect: "none",
        boxSizing: "border-box",
        paddingBlock: showSecondary ? spacing.primitive[2] : 0,
      }}
    >
      {showSearch && (
        <div style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          color: "var(--content-base-secondary)",
        }}>
          <SearchIcon size={cfg.iconSize * 0.7} />
        </div>
      )}

      {showThumbnail && (
        <div style={{
          width: cfg.iconSize,
          height: cfg.iconSize,
          flexShrink: 0,
          borderRadius: radius.primitive.xs,
          backgroundColor: "var(--fill-alternative)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 9,
          fontWeight: 700,
          color: "var(--content-base-secondary)",
          overflow: "hidden",
        }}>
          {option.abbr}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontWeight: typography.fontWeight.medium,
        }}>
          {renderHighlight(option.label, highlight)}
        </div>
        {showSecondary && (
          <div style={{
            fontSize: cfg.secondarySize,
            color: "var(--content-base-secondary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: 2,
          }}>
            {option.secondary}
          </div>
        )}
      </div>

      {showBadge && !isDisabled && (
        <div style={{
          fontSize: 10,
          fontWeight: 600,
          color: "var(--content-brand-default)",
          backgroundColor: "var(--surface-brand-secondary)",
          padding: "2px 6px",
          borderRadius: radius.primitive.xs,
          flexShrink: 0,
          lineHeight: 1.4,
        }}>
          인기
        </div>
      )}

    </div>
  );
}

// ─── Autocomplete Dropdown ────────────────────────────────────────────────────

function AutocompleteDropdown({
  options,
  hoveredValue,
  onSelect,
  onHover,
  size = "md",
  variant = "text",
  showHeading = false,
  query,
  highlight,
  width = 280,
  disabledValue,
  flat = false,
}: {
  options: AcOption[];
  hoveredValue?: string | null;
  highlight?: string;
  onSelect?: (v: string) => void;
  onHover?: (v: string | null) => void;
  size?: AcSize;
  variant?: AcVariant;
  showHeading?: boolean;
  query?: string;
  width?: number;
  disabledValue?: string;
  flat?: boolean;
}) {
  const cfg = SIZE_CFG[size];

  return (
    <div style={{
      width,
      backgroundColor: "var(--surface-base-default)",
      ...(flat ? {
        borderTop: "1px solid var(--divider)",
      } : {
        border: "1px solid var(--border-base-default)",
        borderRadius: radius.primitive.md,
        boxShadow: "var(--shadow-semantic-card-floating)",
      }),
      overflow: "hidden",
      paddingBlock: spacing.primitive[1],
    }}>
      {/* Embedded query row */}
      {query && (
        <div style={{
          height: cfg.height,
          display: "flex",
          alignItems: "center",
          gap: spacing.primitive[2],
          paddingInline: cfg.px,
          borderBottom: "1px solid var(--divider)",
          color: "var(--content-base-secondary)",
          fontSize: cfg.fontSize,
          flexShrink: 0,
        }}>
          <SearchIcon size={14} />
          <span style={{ flex: 1, color: "var(--content-base-default)", fontWeight: typography.fontWeight.medium }}>
            {query}
          </span>
        </div>
      )}

      {/* Section heading */}
      {showHeading && (
        <div style={{
          paddingInline: cfg.px,
          paddingTop: spacing.primitive[2],
          paddingBottom: spacing.primitive[1],
          fontSize: typography.fontSize.compact,
          fontWeight: typography.fontWeight.semibold,
          color: "var(--content-base-secondary)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          결과
        </div>
      )}

      {options.map((opt) => (
        <OptionRow
          key={opt.value}
          option={opt}
          isHovered={opt.value === hoveredValue}
          isDisabled={opt.value === disabledValue}
          highlight={highlight}
          size={size}
          variant={variant}
          onMouseEnter={() => onHover?.(opt.value)}
          onMouseLeave={() => onHover?.(null)}
          onClick={() => onSelect?.(opt.value)}
        />
      ))}
    </div>
  );
}


// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [size, setSize] = useState<AcSize>("md");
  const [variant, setVariant] = useState<AcVariant>("secondary");
  const [showHeading, setShowHeading] = useState(false);
  const [showQuery, setShowQuery] = useState(true);
  const [trailing, setTrailing] = useState<"none" | "icons" | "text">("text");
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const query = "코인 검색";

  const generatedCode = useMemo(() => {
    const lines = ["<Autocomplete"];
    lines.push(`  options={options}`);
    lines.push(`  value={value}`);
    lines.push(`  onChange={setValue}`);
    lines.push(`  size="${size}"`);
    if (variant !== "text") lines.push(`  variant="${variant}"`);
    if (showHeading) lines.push(`  groupLabel="결과"`);
    lines.push(`  placeholder="코인 검색"`);
    lines.push("/>");
    return lines.join("\n");
  }, [size, variant, showHeading]);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{
        borderRadius: radius.primitive.xl,
        overflow: "hidden",
        backgroundColor: "var(--surface-base-alternative)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", height: 560 }}>
          {/* Preview */}
          <div style={{
            padding: spacing.primitive[10],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--surface-base-alternative)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", width: 320 }}>
              {showQuery && (
                <div style={{ width: 320 }}>
                  <TopNavigation
                    variant="search"
                    pad
                    searchPlaceholder="코인 검색"
                    searchValue="eth"
                    trailingButtons={
                      trailing === "text" ? (
                        <TextButton color="primary">취소</TextButton>
                      ) : trailing === "icons" ? (
                        <IconButton aria-label="검색 닫기" variant="ghost" color="neutral">
                          <XIcon size={18} />
                        </IconButton>
                      ) : undefined
                    }
                  />
                </div>
              )}
              <div style={{ overflow: "hidden" }}>
                <AutocompleteDropdown
                  options={ETH_OPTIONS}
                  hoveredValue={hoveredValue}
                  onHover={setHoveredValue}
                  size={size}
                  variant={variant}
                  showHeading={showHeading}
                  highlight="eth"
                  width={320}
                  flat={showQuery}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{
            backgroundColor: "var(--surface-base-alternative)",
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
              gap: spacing.primitive[6],
              backgroundColor: "var(--surface-base-default)",
              borderRadius: radius.primitive.lg,
            }}>
              <RadioGroup
                label="Size"
                value={size}
                onChange={(v) => setSize(v as AcSize)}
                options={[
                  { value: "sm", label: "sm" },
                  { value: "md", label: "md" },
                  { value: "lg", label: "lg" },
                ]}
              />
              <RadioGroup
                label="Variant"
                value={variant}
                onChange={(v) => setVariant(v as AcVariant)}
                options={[
                  { value: "text", label: "Text" },
                  { value: "search", label: "Search" },
                  { value: "thumbnail", label: "Thumbnail" },
                  { value: "secondary", label: "Sub" },
                  { value: "badge", label: "Badge" },
                ]}
              />
              <RadioGroup
                label="Search Input"
                value={showQuery ? "true" : "false"}
                onChange={(v) => setShowQuery(v === "true")}
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
              />
              <RadioGroup
                label="Heading"
                value={showHeading ? "true" : "false"}
                onChange={(v) => setShowHeading(v === "true")}
                options={[
                  { value: "false", label: "Off" },
                  { value: "true", label: "On" },
                ]}
              />
              <RadioGroup
                label="Trailing"
                value={trailing}
                onChange={(v) => setTrailing(v as "none" | "icons" | "text")}
                options={[
                  { value: "none", label: "None" },
                  { value: "icons", label: "Icons" },
                  { value: "text", label: "Text" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div style={{
          padding: "10px 16px",
          backgroundColor: "var(--docs-code-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generatedCode} />
        </div>
        <pre style={{
          margin: 0,
          padding: spacing.primitive[4],
          fontSize: typography.fontSize.compact,
          lineHeight: 1.7,
          color: "var(--docs-code-text)",
          backgroundColor: "var(--docs-code-surface)",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          overflow: "auto",
        }}>
          <code>{highlightCode(generatedCode)}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Design Content ───────────────────────────────────────────────────────────

function DesignContent() {
  const [statesHovered, setStatesHovered] = useState<string | null>(null);

  const STATES_ITEMS: AcOption[] = OPTIONS.slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>Autocomplete</InlineCode>는 텍스트 입력 중 관련 항목을 실시간으로 제안하는 플로팅 드롭다운입니다.
          사용자가 입력한 쿼리를 기반으로 후보 목록을 오버레이로 표시하며,
          선택하면 입력 필드에 값이 채워집니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[5] }}>
            {/* App-style card */}
            <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
              <TopNavigation variant="search" pad searchValue="코인 검색" searchPlaceholder="코인 검색"
                trailingButtons={<TextButton color="primary">취소</TextButton>} />
              <AutocompleteDropdown
                options={OPTIONS.slice(0, 3)}
                size="md"
                variant="secondary"
                showHeading
                width={320}
                flat
              />
            </div>
            {/* Annotation labels */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], width: "100%" }}>
              {[
                ["1", "TopNavigation (search)", "검색 입력 헤더"],
                ["2", "Heading", "옵션 그룹 구분 레이블 (선택)"],
                ["3", "Cell", "선택 가능한 개별 옵션 행"],
                ["4", "Trailing", "취소/닫기 액션 (선택)"],
              ].map(([num, name, desc]) => (
                <div key={num} style={{ fontSize: typography.fontSize.sm }}>
                  <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
                  <span style={{ color: "var(--content-base-secondary)" }}> — {desc}</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">

        <Subsection title="Option Types">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            각 옵션 행의 표시 방식입니다. 컨텍스트에 따라 아이콘, 서브텍스트, 뱃지를 조합하세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[5], width: 320 }}>
              {(["text", "search", "thumbnail", "secondary", "badge"] as AcVariant[]).map((v) => (
                <div key={v}>
                  <p style={{ ...descText, fontSize: typography.fontSize.compact, marginBottom: spacing.primitive[2], fontWeight: typography.fontWeight.medium }}>
                    {v === "text" && "Text only"}
                    {v === "search" && "With search history icon"}
                    {v === "thumbnail" && "With leading thumbnail"}
                    {v === "secondary" && "With secondary text"}
                    {v === "badge" && "With trailing badge"}
                  </p>
                  <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                    <AutocompleteDropdown
                      options={OPTIONS.slice(0, 3)}
                      size="md"
                      variant={v}
                      width={320}
                      flat
                    />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="With Section Heading">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>groupLabel</InlineCode>로 옵션 목록 상단에 섹션 제목을 추가합니다.
            항목을 의미 있는 그룹으로 분리할 때 사용하세요.
          </p>
          <PreviewBox>
            <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden", width: 320 }}>
              <AutocompleteDropdown
                options={OPTIONS.slice(0, 4)}
                size="md"
                variant="text"
                showHeading
                width={320}
                flat
              />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="With TopNavigation">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>TopNavigation</InlineCode>의 <InlineCode>search</InlineCode> variant와 함께 사용하는 것이 일반적입니다.
            검색 헤더 아래에 결과 목록이 바로 이어집니다.
          </p>
          <PreviewBox>
            <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden", width: 320 }}>
              <TopNavigation variant="search" pad searchValue="eth" searchPlaceholder="코인 검색"
                trailingButtons={<TextButton color="primary">취소</TextButton>} />
              <AutocompleteDropdown
                options={OPTIONS.slice(1, 4)}
                size="md"
                variant="secondary"
                width={320}
                flat
              />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          옵션 행의 상태입니다. 활성/비활성 상태와 상호작용 피드백이 명확히 구분되어야 합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[6], alignItems: "center" }}>
            {/* Interactive demo */}
            <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden", width: 320 }}>
              <TopNavigation variant="search" pad searchValue="코인 검색" searchPlaceholder="코인 검색"
                trailingButtons={<TextButton color="primary">취소</TextButton>} />
              <AutocompleteDropdown
                options={STATES_ITEMS}
                hoveredValue={statesHovered}
                onHover={setStatesHovered}
                size="md"
                variant="secondary"
                width={320}
                disabledValue="xrp"
                flat
              />
            </div>
            {/* State legend */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.primitive[3], width: "100%", maxWidth: 480 }}>
              {[
                { label: "Default", bg: "transparent", textColor: "var(--content-base-default)", desc: "기본" },
                { label: "Hover", bg: "var(--fill-alternative)", textColor: "var(--content-base-default)", desc: "마우스 오버" },
                { label: "Active", bg: "var(--surface-brand-secondary)", textColor: "var(--content-brand-default)", desc: "선택됨" },
                { label: "Pressed", bg: "var(--fill-normal)", textColor: "var(--content-base-default)", desc: "누름" },
                { label: "Disabled", bg: "transparent", textColor: "var(--content-disabled-default)", desc: "비활성", opacity: 0.45 },
              ].map(({ label, bg, textColor, desc, opacity }) => (
                <div key={label} style={{
                  height: 60,
                  borderRadius: radius.primitive.sm,
                  border: "1px solid var(--divider)",
                  backgroundColor: bg,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.primitive[1],
                  opacity,
                }}>
                  <span style={{ fontSize: typography.fontSize.compact, color: textColor, fontWeight: typography.fontWeight.medium }}>
                    Option
                  </span>
                  <span style={{ fontSize: 9, color: "var(--content-base-secondary)", textAlign: "center" }}>
                    {label}<br />{desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          항목이 많고 검색으로 좁혀야 하는 경우에 사용합니다.
          항목이 5개 이하로 고정이라면 <InlineCode>Select</InlineCode>가 더 적합합니다.
        </p>
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{ border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                  <div style={{
                    height: spacing.primitive[10],
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.primitive[2],
                    paddingInline: spacing.primitive[4],
                    backgroundColor: "var(--surface-base-default)",
                    borderBottom: "1px solid var(--divider)",
                    fontSize: typography.fontSize.sm,
                    color: "var(--content-base-secondary)",
                  }}>
                    <SearchIcon size={13} />
                    <span style={{ color: "var(--content-base-default)" }}>bit</span>
                  </div>
                  {OPTIONS.slice(0, 3).map((opt) => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      isHovered={false}
                      size="sm"
                      variant="secondary"
                    />
                  ))}
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  검색 입력 + 관련 결과 바로 표시
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{ border: "1px solid var(--border-base-default)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                  {OPTIONS.map((opt) => (
                    <OptionRow
                      key={opt.value}
                      option={opt}
                      isHovered={false}
                      size="sm"
                      variant="text"
                    />
                  ))}
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  항목을 필터링 없이 전체 나열 — Select 사용 권장
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="쿼리 반응성" desc="사용자가 입력할 때마다 즉각 결과가 업데이트되어야 합니다. 지연이 생기면 스켈레톤 로딩을 보여주세요." />
            <PrincipleCard number={2} title="결과 없음 처리" desc="매칭 결과가 없을 때 빈 상태를 보여주세요. '결과 없음' 메시지와 함께 검색어 수정을 안내합니다." />
            <PrincipleCard number={3} title="키보드 탐색" desc="↑↓로 항목 이동, Enter로 선택, Escape로 닫기를 지원해야 합니다. 화살키 탐색 중에도 포커스 링을 유지하세요." />
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>CSS Variable</th>
                <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--surface-base-default", "드롭다운 컨테이너 배경"],
                ["--surface-brand-secondary", "선택(active) 옵션 배경"],
                ["--fill-alternative", "hover 옵션 배경"],
                ["--fill-normal", "pressed 옵션 배경"],
                ["--border-base-default", "드롭다운 컨테이너 보더"],
                ["--divider", "Input 영역 하단 구분선 / 섹션 구분"],
                ["--content-base-default", "기본 옵션 텍스트"],
                ["--content-brand-default", "선택 옵션 텍스트 + 체크 아이콘"],
                ["--content-base-secondary", "서브텍스트 / Heading 레이블"],
                ["--content-disabled-default", "비활성 옵션 텍스트"],
                ["--shadow-semantic-card-floating", "드롭다운 플로팅 그림자"],
              ].map(([token, usage], i, arr) => (
                <tr key={token}>
                  <td style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", whiteSpace: "nowrap" }}>
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>트리거 입력에 <InlineCode>role="combobox"</InlineCode>, <InlineCode>aria-expanded</InlineCode>, <InlineCode>aria-autocomplete="list"</InlineCode>를 설정하세요.</li>
          <li>드롭다운 컨테이너에 <InlineCode>role="listbox"</InlineCode>를 부여합니다.</li>
          <li>각 옵션은 <InlineCode>role="option"</InlineCode>과 <InlineCode>aria-selected</InlineCode>로 선택 상태를 전달합니다.</li>
          <li>비활성 옵션에는 <InlineCode>aria-disabled="true"</InlineCode>를 설정하고 이벤트 핸들러를 제거합니다.</li>
          <li>키보드 탐색: <InlineCode>↑↓</InlineCode> 이동, <InlineCode>Enter</InlineCode> 선택, <InlineCode>Escape</InlineCode> 닫기.</li>
          <li>포커스는 드롭다운이 열릴 때 첫 번째(또는 현재 선택) 항목으로 이동합니다.</li>
        </ul>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          단순 드롭다운 선택은 <InlineCode>Select</InlineCode>를 사용하세요.
          바텀시트 형태의 선택 패널이 필요하다면 <InlineCode>BottomSheet</InlineCode>를,
          검색 전용 입력은 <InlineCode>SearchField</InlineCode>와 조합합니다.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const webProps: PropItem[] = [
  { name: "options", type: "AutocompleteOption[]", required: true, description: "표시할 옵션 목록" },
  { name: "value", type: "string", required: true, description: "현재 선택된 옵션 value" },
  { name: "onChange", type: "(value: string) => void", required: true, description: "옵션 선택 핸들러" },
  { name: "size", type: "'sm' | 'md' | 'lg'", required: false, description: "드롭다운 크기 (기본값: 'md')" },
  { name: "variant", type: "'text' | 'search' | 'thumbnail' | 'secondary' | 'badge'", required: false, description: "옵션 행 표시 방식 (기본값: 'text')" },
  { name: "placeholder", type: "string", required: false, description: "검색 입력 placeholder" },
  { name: "searchable", type: "boolean", required: false, description: "상단 검색 입력 행 표시 여부" },
  { name: "groupLabel", type: "string", required: false, description: "옵션 목록 상단 섹션 레이블" },
  { name: "open", type: "boolean", required: false, description: "드롭다운 표시 여부 (제어 컴포넌트)" },
  { name: "onOpenChange", type: "(open: boolean) => void", required: false, description: "드롭다운 열기/닫기 핸들러" },
  { name: "className", type: "string", required: false, description: "루트 컨테이너 커스텀 클래스" },
];

const optionProps: PropItem[] = [
  { name: "label", type: "string", required: true, description: "표시할 옵션 텍스트" },
  { name: "value", type: "string", required: true, description: "옵션 식별 값" },
  { name: "secondary", type: "string", required: false, description: "보조 설명 텍스트 (variant='secondary'일 때 표시)" },
  { name: "thumbnail", type: "string | ReactNode", required: false, description: "leading 썸네일 이미지 src 또는 요소 (variant='thumbnail'일 때 표시)" },
  { name: "badge", type: "string", required: false, description: "trailing 뱃지 텍스트 (variant='badge'일 때 표시)" },
  { name: "disabled", type: "boolean", required: false, description: "선택 비활성화 여부" },
];

function WebContent() {
  const basicCode = `import { Autocomplete } from '@baerae-zkap/design-system';
import type { AutocompleteOption } from '@baerae-zkap/design-system';

const options: AutocompleteOption[] = [
  { label: "Bitcoin", value: "btc" },
  { label: "Ethereum", value: "eth" },
  { label: "Solana", value: "sol" },
];

export function App() {
  const [value, setValue] = useState("btc");
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}`;

  const searchableCode = `<Autocomplete
  options={options}
  value={value}
  onChange={setValue}
  searchable
  placeholder="코인 검색"
/>`;

  const richCode = `const options: AutocompleteOption[] = [
  {
    label: "Bitcoin",
    value: "btc",
    secondary: "BTC · 디지털 금",
    badge: "인기",
  },
  {
    label: "Ethereum",
    value: "eth",
    secondary: "ETH · 스마트 컨트랙트",
    disabled: true,
  },
];

<Autocomplete
  options={options}
  value={value}
  onChange={setValue}
  variant="secondary"
  groupLabel="추천 코인"
  size="lg"
/>`;

  const keyboardCode = `// 키보드 탐색은 컴포넌트가 자동 처리합니다.
// 아래 접근성 속성이 자동 적용됩니다:
//
// trigger input:
//   role="combobox"
//   aria-expanded={open}
//   aria-autocomplete="list"
//   aria-controls="listbox-id"
//
// listbox:
//   role="listbox"
//   id="listbox-id"
//
// each option:
//   role="option"
//   aria-selected={isSelected}
//   aria-disabled={isDisabled}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Autocomplete/Autocomplete.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Autocomplete/Autocomplete.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Autocomplete } from '@baerae-zkap/design-system';
import type { AutocompleteOption } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <AutocompleteDropdown
            options={OPTIONS.slice(0, 4)}
            size="md"
            variant="text"
            width={280}
          />
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="Searchable">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>searchable</InlineCode> prop으로 드롭다운 상단에 검색 입력을 추가합니다.
        </p>
        <PreviewBox>
          <AutocompleteDropdown
            options={OPTIONS.slice(0, 4)}
            size="md"
            variant="secondary"
            query="코인 검색"
            width={280}
          />
        </PreviewBox>
        <CodeBlock code={searchableCode} />
      </Section>

      <Section title="Rich Options">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>variant</InlineCode>, <InlineCode>groupLabel</InlineCode>, <InlineCode>disabled</InlineCode> 조합으로 풍부한 목록을 구성합니다.
        </p>
        <PreviewBox>
          <AutocompleteDropdown
            options={OPTIONS.slice(0, 5)}
            size="lg"
            variant="secondary"
            showHeading
            disabledValue="sol"
            width={300}
          />
        </PreviewBox>
        <CodeBlock code={richCode} />
      </Section>

      <Section title="Keyboard Navigation">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          접근성 속성은 컴포넌트가 자동으로 적용합니다.
        </p>
        <CodeBlock code={keyboardCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="AutocompleteProps">
          <PropsTable props={webProps} />
        </Subsection>
        <Subsection title="AutocompleteOption">
          <PropsTable props={optionProps} />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AutocompletePage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Presentation" },
          { label: "Autocomplete" },
        ]}
      />

      <h1 style={{
        fontSize: typography.fontSize["3xl"],
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.primitive[2],
        marginTop: spacing.primitive[4],
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
      }}>
        Autocomplete
      </h1>
      <p style={{
        fontSize: typography.fontSize.md,
        color: "var(--content-base-secondary)",
        lineHeight: 1.7,
        margin: 0,
        marginBottom: spacing.primitive[8],
      }}>
        텍스트 입력에 반응하여 관련 옵션을 실시간으로 제안하는 플로팅 드롭다운 컴포넌트입니다.
      </p>

      <Playground />

      <div style={{ marginTop: spacing.primitive[10] }}>
        <PlatformTabs>
          {(platform: Platform) => platform === "web" ? <WebContent /> : <DesignContent />}
        </PlatformTabs>
      </div>
    </div>
  );
}
