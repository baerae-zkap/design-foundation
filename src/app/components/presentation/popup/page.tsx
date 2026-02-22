"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  CodeBlock,
  PreviewBox,
  type Platform,
} from "@/components/PlatformTabs";
import { typography, spacing, radius, Button, Popup } from "@baerae-zkap/design-system";
import type { PopupSize, PopupNavigation, PopupActionLayout, PopupType } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";

// ─── Shared Style ─────────────────────────────────────────────────────────────

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

// ─── Inline Mock Popup (for static design previews) ──────────────────────────

function MockPopup({
  title,
  navigation = "normal",
  size = "medium",
  children,
  actions,
  actionLayout = "neutral",
}: {
  title?: string;
  navigation?: PopupNavigation;
  size?: PopupSize;
  children?: React.ReactNode;
  actions?: { label: string; variant?: "filled" | "weak" }[];
  actionLayout?: PopupActionLayout;
}) {
  const sizeConfig = {
    medium: { maxWidth: 280, padding: spacing.primitive[5] },
    large: { maxWidth: 340, padding: spacing.primitive[6] },
    xlarge: { maxWidth: 380, padding: spacing.primitive[8] },
  };
  const config = sizeConfig[size];
  const isEmphasize = navigation === "emphasize";
  const isFloating = navigation === "floating";

  return (
    <div style={{
      width: "100%",
      maxWidth: config.maxWidth,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive["2xl"],
      boxShadow: "var(--shadow-semantic-modal-default)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Nav bar */}
      {!isFloating && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isEmphasize ? "flex-start" : "center",
          position: "relative",
          padding: `${spacing.primitive[3]}px ${config.padding}px`,
          borderBottom: "1px solid var(--divider)",
          minHeight: 44,
        }}>
          {title && (
            <span style={{
              fontSize: isEmphasize ? typography.fontSize.md : typography.fontSize.sm,
              fontWeight: isEmphasize ? typography.fontWeight.bold : typography.fontWeight.semibold,
              color: "var(--content-base-default)",
            }}>
              {title}
            </span>
          )}
          <button style={{
            position: "absolute", right: config.padding, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", color: "var(--content-base-default)",
            display: "flex", alignItems: "center", cursor: "pointer", padding: 2,
          }} aria-label="닫기">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Floating close */}
      {isFloating && (
        <button style={{
          position: "absolute", top: config.padding, right: config.padding, zIndex: 1,
          background: "none", border: "none", color: "var(--content-base-default)",
          display: "flex", alignItems: "center", cursor: "pointer", padding: 2,
        }} aria-label="닫기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Contents */}
      <div style={{ padding: config.padding, flex: 1 }}>
        {children || (
          <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
            팝업 콘텐츠 영역입니다. 스크롤 가능한 본문이 표시됩니다.
          </div>
        )}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div style={{
          padding: `${spacing.primitive[3]}px ${config.padding}px`,
          borderTop: "1px solid var(--divider)",
          display: "flex",
          gap: spacing.primitive[2],
        }}>
          {actionLayout === "strong" ? (
            <Button buttonType="filled" color="primary" size="medium" layout="fillWidth" onClick={() => {}}>
              {actions[0].label}
            </Button>
          ) : (
            actions.map((a, i) => (
              <Button
                key={i}
                buttonType={a.variant ?? (i === actions.length - 1 ? "filled" : "weak")}
                color={i === actions.length - 1 ? "primary" : "neutral"}
                size="medium"
                layout="fillWidth"
                onClick={() => {}}
              >
                {a.label}
              </Button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<PopupSize>("medium");
  const [nav, setNav] = useState<PopupNavigation>("normal");
  const [popupType, setPopupType] = useState<PopupType>("hug");
  const [actionLayout, setActionLayout] = useState<PopupActionLayout>("neutral");

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", minHeight: 480 }}>
          {/* Preview */}
          <div style={{ padding: spacing.primitive[8], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button buttonType="filled" color="primary" size="medium" onClick={() => setOpen(true)}>
              팝업 열기
            </Button>
          </div>

          {/* Controls */}
          <div style={{ backgroundColor: "var(--surface-base-alternative)", display: "flex", flexDirection: "column", padding: spacing.primitive[4], overflow: "hidden", height: "100%", boxSizing: "border-box" }}>
            <div style={{ flex: 1, minHeight: 0, padding: spacing.primitive[6], overflowY: "auto", display: "flex", flexDirection: "column", gap: spacing.primitive[6], backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg }}>
              <RadioGroup
                label="Size"
                value={size}
                onChange={(v) => setSize(v as PopupSize)}
                options={[
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                  { value: "xlarge", label: "XLarge" },
                ]}
              />
              <RadioGroup
                label="Navigation"
                value={nav}
                onChange={(v) => setNav(v as PopupNavigation)}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "emphasize", label: "Emphasize" },
                  { value: "floating", label: "Floating" },
                ]}
              />
              <RadioGroup
                label="Type"
                value={popupType}
                onChange={(v) => setPopupType(v as PopupType)}
                options={[
                  { value: "hug", label: "Hug" },
                  { value: "fixed", label: "Fixed" },
                ]}
              />
              <RadioGroup
                label="Action Layout"
                value={actionLayout}
                onChange={(v) => setActionLayout(v as PopupActionLayout)}
                options={[
                  { value: "strong", label: "Strong" },
                  { value: "neutral", label: "Neutral" },
                  { value: "cancel", label: "Cancel" },
                  { value: "compact", label: "Compact" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real Popup */}
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title={nav !== "floating" ? "팝업 제목" : undefined}
        navigation={nav}
        size={size}
        type={popupType}
        actionLayout={actionLayout}
        closeOnDimmerClick
        actions={
          actionLayout === "strong"
            ? [{ label: "확인", onClick: () => setOpen(false) }]
            : actionLayout === "cancel"
              ? [
                  { label: "취소", onClick: () => setOpen(false) },
                  { label: "확인", onClick: () => setOpen(false) },
                ]
              : [
                  { label: "보조", onClick: () => setOpen(false) },
                  { label: "확인", onClick: () => setOpen(false) },
                ]
        }
        aria-label={nav === "floating" ? "팝업" : undefined}
      >
        <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.7 }}>
          <p style={{ margin: 0, marginBottom: spacing.primitive[3] }}>
            팝업의 콘텐츠 영역입니다. 다양한 내용을 자유롭게 배치할 수 있습니다.
          </p>
          <p style={{ margin: 0, marginBottom: spacing.primitive[3] }}>
            내용이 길어지면 스크롤이 활성화되며, 내비게이션과 액션 영역은 고정됩니다.
          </p>
          <p style={{ margin: 0 }}>
            size, navigation, type, actionLayout 옵션을 조합하여 다양한 팝업 형태를 구성할 수 있습니다.
          </p>
        </div>
      </Popup>
    </div>
  );
}

// ─── Design Content ───────────────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>Popup</InlineCode>은 즉각적인 사용자 응답이 필요한 상황에서 현재 작업을 중단하고
          사용자의 주의를 집중시키는 모달입니다. <InlineCode>AlertDialog</InlineCode>보다 복잡한 콘텐츠와
          다양한 레이아웃 옵션을 지원합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: `${spacing.primitive[6]}px 0` }}>
            <MockPopup
              title="팝업 제목"
              navigation="normal"
              actions={[{ label: "보조 버튼", variant: "weak" }, { label: "주요 버튼", variant: "filled" }]}
            />
          </div>
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[4] }}>
          {[
            ["1", "Navigation", "제목과 닫기 버튼이 있는 상단 영역"],
            ["2", "Title", "팝업의 제목 텍스트"],
            ["3", "Close button", "X 닫기 버튼"],
            ["4", "Contents", "스크롤 가능한 본문 콘텐츠 영역"],
            ["5", "Action area", "하단 버튼 영역 (border-top 구분)"],
            ["6", "Backdrop", "배경 딤 오버레이"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)" }}> &mdash; {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Navigation">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            내비게이션 영역은 3가지 스타일을 지원합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockPopup title="중앙 정렬 제목" navigation="normal" />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Normal</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockPopup title="좌측 강조 제목" navigation="emphasize" />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Emphasize</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockPopup navigation="floating">
                  <div style={{
                    width: "100%", height: 80, borderRadius: radius.primitive.lg,
                    backgroundColor: "var(--surface-base-alternative)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)",
                  }}>
                    이미지 / 커스텀 콘텐츠
                  </div>
                </MockPopup>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Floating</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Action Layout">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            액션 영역은 버튼 구성에 따라 4가지 레이아웃을 지원합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockPopup title="확인" navigation="normal" actionLayout="strong" actions={[{ label: "확인" }]} />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Strong</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockPopup title="선택" navigation="normal" actionLayout="neutral" actions={[{ label: "보조" }, { label: "주요" }]} />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Neutral</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockPopup title="삭제" navigation="normal" actionLayout="cancel" actions={[{ label: "취소" }, { label: "확인" }]} />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Cancel</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. Size */}
      <Section title="Size">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          3가지 크기를 제공하며, 콘텐츠 양과 화면 너비에 따라 선택합니다.
        </p>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                {["Size", "Max Width", "Padding", "Fixed Height", "Hug Max Height"].map((h) => (
                  <th key={h} style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["medium", "400px", "20px", "480px", "760px"],
                ["large", "560px", "24px", "480px", "760px"],
                ["xlarge", "640px", "32px", "560px", "760px"],
              ].map(([name, mw, pad, fh, hm], i, arr) => (
                <tr key={name}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", fontWeight: typography.fontWeight.medium }}>{name}</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{mw}</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{pad}</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{fh}</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{hm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 5. States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            Popup은 두 가지 높이 전략(type)을 지원합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <MockPopup title="Hug" navigation="normal" actions={[{ label: "확인" }]} actionLayout="strong">
                  <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                    콘텐츠 높이에 맞게 자동 확장. 최대 760px까지 커진 후 스크롤.
                  </div>
                </MockPopup>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Hug (default)</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <MockPopup title="Fixed" navigation="normal" actions={[{ label: "확인" }]} actionLayout="strong">
                  <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                    고정 높이(480px). 콘텐츠가 넘치면 스크롤.
                  </div>
                </MockPopup>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Fixed</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 6. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <MockPopup title="상세 설정" navigation="normal" actions={[{ label: "취소" }, { label: "저장" }]}>
                  <div style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                    여러 단계의 설정이나 폼 입력이 필요할 때 Popup 사용.
                  </div>
                </MockPopup>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  복잡한 콘텐츠에는 Popup을 사용하세요.
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <MockPopup title="삭제하시겠어요?" navigation="normal" actionLayout="strong" actions={[{ label: "삭제" }]}>
                  <div style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                    단순 확인 메시지
                  </div>
                </MockPopup>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  단순 확인에는 AlertDialog를 사용하세요.
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="명확한 목적" desc="팝업은 사용자의 작업 흐름을 중단시킵니다. 반드시 필요한 상황에서만 사용하세요." />
            <PrincipleCard number={2} title="적절한 크기" desc="콘텐츠 양에 맞는 size를 선택하세요. 작은 콘텐츠에 xlarge를 사용하면 어색합니다." />
            <PrincipleCard number={3} title="액션의 명확성" desc="버튼 레이블은 구체적으로 작성하세요. '확인' 대신 '저장하기', '삭제하기' 등 행동을 명시하세요." />
          </div>
        </Subsection>
      </Section>

      {/* 7. Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>CSS Variable</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--surface-base-default", "팝업 컨테이너 배경"],
                ["--content-base-default", "제목 텍스트, 닫기 아이콘"],
                ["--content-base-secondary", "본문 텍스트"],
                ["--overlay-dim", "배경 딤 오버레이"],
                ["--divider", "내비게이션 하단, 액션 상단 구분선"],
                ["--shadow-semantic-modal-default", "팝업 그림자"],
              ].map(([token, usage], i, arr) => (
                <tr key={token}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", whiteSpace: "nowrap" }}>
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 8. Accessibility */}
      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>컨테이너에 <InlineCode>role=&quot;dialog&quot;</InlineCode>와 <InlineCode>aria-modal=&quot;true&quot;</InlineCode>를 설정합니다.</li>
          <li>제목이 있는 경우 <InlineCode>aria-labelledby</InlineCode>로 연결합니다.</li>
          <li>제목이 없는 floating 모드에서는 <InlineCode>aria-label</InlineCode>을 반드시 제공하세요.</li>
          <li>닫기 버튼에 <InlineCode>aria-label=&quot;닫기&quot;</InlineCode>가 포함됩니다.</li>
          <li>Escape 키로 팝업을 닫을 수 있습니다.</li>
          <li>열린 동안 배경 스크롤이 차단됩니다.</li>
        </ul>
      </Section>

      {/* 9. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          단순 확인/경고에는 <InlineCode>AlertDialog</InlineCode>를 사용하세요.
          화면 하단에서 올라오는 패널에는 <InlineCode>BottomSheet</InlineCode>를 사용하세요.
          트리거 요소 근처의 작은 정보 패널에는 <InlineCode>Popover</InlineCode>를 사용하세요.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const webProps: PropItem[] = [
  { name: "open", type: "boolean", required: true, description: "팝업 열림 여부" },
  { name: "onClose", type: "() => void", required: true, description: "닫기 콜백" },
  { name: "title", type: "ReactNode", required: false, description: "제목 (navigation이 floating이 아닌 경우 표시)" },
  { name: "navigation", type: '"normal" | "emphasize" | "floating"', required: false, description: "내비게이션 스타일 (기본: title 유무에 따라 자동)" },
  { name: "children", type: "ReactNode", required: true, description: "팝업 본문 콘텐츠" },
  { name: "actions", type: "PopupAction[]", required: false, description: "하단 액션 버튼 목록" },
  { name: "actionLayout", type: '"strong" | "neutral" | "cancel" | "compact"', required: false, description: "액션 레이아웃 (기본: 1개=strong, 2개=neutral)" },
  { name: "size", type: '"medium" | "large" | "xlarge"', required: false, description: "팝업 크기 (기본: \"medium\")" },
  { name: "type", type: '"fixed" | "hug"', required: false, description: "높이 전략 (기본: \"hug\")" },
  { name: "closeOnDimmerClick", type: "boolean", required: false, description: "백드롭 클릭 시 닫기 (기본: false)" },
  { name: "aria-label", type: "string", required: false, description: "title 없을 때 접근성용 레이블" },
];

const actionProps: PropItem[] = [
  { name: "label", type: "string", required: true, description: "버튼 레이블" },
  { name: "onClick", type: "() => void", required: true, description: "클릭 핸들러" },
  { name: "color", type: "ButtonColor", required: false, description: "버튼 색상 (기본: 마지막 버튼 primary, 나머지 neutral)" },
  { name: "variant", type: '"filled" | "weak"', required: false, description: "버튼 스타일 (기본: 마지막 버튼 filled, 나머지 weak)" },
];

function WebContent() {
  const basicCode = `import { Popup } from '@baerae-zkap/design-system';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>팝업 열기</Button>
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title="설정"
        actions={[
          { label: '취소', onClick: () => setOpen(false) },
          { label: '저장', onClick: handleSave },
        ]}
      >
        <p>팝업 내용을 자유롭게 구성하세요.</p>
      </Popup>
    </>
  );
}`;

  const navigationCode = `// Normal: 중앙 정렬 제목
<Popup navigation="normal" title="제목" ...>

// Emphasize: 좌측 정렬 볼드 제목
<Popup navigation="emphasize" title="제목" ...>

// Floating: 제목 없이 X 버튼만 (이미지/커스텀 콘텐츠용)
<Popup navigation="floating" aria-label="이미지 팝업" ...>`;

  const actionLayoutCode = `// Strong: 단일 전체 너비 버튼
<Popup actionLayout="strong" actions={[{ label: '확인', onClick: onConfirm }]} ...>

// Neutral: 보조 + 주요 버튼
<Popup actionLayout="neutral" actions={[
  { label: '보조', onClick: onSub },
  { label: '주요', onClick: onMain },
]} ...>

// Cancel: 취소 + 확인 (neutral과 동일 레이아웃, 시맨틱 구분)
<Popup actionLayout="cancel" actions={[
  { label: '취소', onClick: onCancel },
  { label: '확인', onClick: onConfirm },
]} ...>`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Popup/Popup.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Popup/Popup.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Popup } from '@baerae-zkap/design-system';
import type { PopupProps, PopupAction, PopupSize, PopupNavigation, PopupActionLayout, PopupType } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>Popup</InlineCode>은 <InlineCode>createPortal</InlineCode>로 <InlineCode>document.body</InlineCode>에 렌더링됩니다.
          <InlineCode>open</InlineCode> prop으로 열림/닫힘을 제어하세요.
        </p>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="Navigation Variants">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>navigation</InlineCode> prop으로 상단 내비게이션 스타일을 지정합니다.
          지정하지 않으면 <InlineCode>title</InlineCode> 유무에 따라 자동 결정됩니다.
        </p>
        <CodeBlock code={navigationCode} />
      </Section>

      <Section title="Action Layouts">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>actionLayout</InlineCode> prop으로 하단 버튼 레이아웃을 지정합니다.
        </p>
        <CodeBlock code={actionLayoutCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="PopupProps">
          <PropsTable props={webProps} />
        </Subsection>
        <Subsection title="PopupAction">
          <PropsTable props={actionProps} />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PopupPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Presentation" },
          { label: "Popup" },
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
        Popup
      </h1>
      <p style={{
        fontSize: typography.fontSize.md,
        color: "var(--content-base-secondary)",
        lineHeight: 1.7,
        margin: 0,
        marginBottom: spacing.primitive[8],
      }}>
        즉각적인 사용자 응답이 필요한 상황에서 현재 작업을 중단하고 사용자의 주의를 집중시키는 모달입니다.
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
