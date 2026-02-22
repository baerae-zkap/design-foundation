"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  CodeBlock,
  PreviewBox,
  type Platform,
} from "@/components/PlatformTabs";
import { typography, spacing, radius, Button } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Shared Style ────────────────────────────────────────────────────────────

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

// ─── Inline BottomSheet Demo (docs-only) ─────────────────────────────────────

function BottomSheetDemo({
  open,
  onClose,
  title,
  description,
  actions,
  footerLink,
  children,
  showHandle = true,
  scrollable = false,
  maxHeight = "85%",
}: {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  footerLink?: React.ReactNode;
  children?: React.ReactNode;
  showHandle?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
}) {
  const [mounted, setMounted] = useState(open);
  const [sheetVisible, setSheetVisible] = useState(open);
  const [contentVisible, setContentVisible] = useState(open);

  useEffect(() => {
    let contentTimer: ReturnType<typeof setTimeout>;
    let unmountTimer: ReturnType<typeof setTimeout>;

    if (open) {
      setMounted(true);
      // Double rAF ensures browser paints the initial (hidden) state before transitioning
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSheetVisible(true);
          // Content fades in 300ms after sheet starts sliding up
          contentTimer = setTimeout(() => setContentVisible(true), 100);
        });
      });
    } else {
      setContentVisible(false);
      setSheetVisible(false);
      unmountTimer = setTimeout(() => setMounted(false), 350);
    }

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(unmountTimer);
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "var(--overlay-dim)",
          zIndex: 10,
          opacity: sheetVisible ? 1 : 0,
          transition: "opacity 250ms ease",
        }}
      />
      {/* Sheet — slides up first */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "var(--surface-base-default)",
          borderTopLeftRadius: radius.primitive.xl,
          borderTopRightRadius: radius.primitive.xl,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          maxHeight: maxHeight,
          transform: sheetVisible ? "translateY(0)" : "translateY(100%)",
          transition: sheetVisible
            ? "transform 380ms cubic-bezier(0.32, 0.72, 0, 1)"
            : "transform 280ms cubic-bezier(0.4, 0, 1, 1)",
        }}
      >
        {/* Handle */}
        {showHandle && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: spacing.primitive[2],
            paddingBottom: spacing.primitive[2],
            flexShrink: 0,
          }}>
            <div style={{
              width: 36,
              height: 4,
              borderRadius: radius.primitive.full,
              backgroundColor: "var(--fill-normal)",
            }} />
          </div>
        )}
        {/* Content — fades in 300ms after sheet */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : `translateY(${spacing.primitive[2]}px)`,
          transition: contentVisible
            ? "opacity 220ms ease, transform 220ms ease"
            : "none",
        }}>
          {/* Header */}
          {(title || description) && (
            <div style={{
              paddingTop: showHandle ? spacing.primitive[1] : spacing.primitive[5],
              paddingBottom: spacing.primitive[3],
              paddingLeft: spacing.semantic.screen.paddingX,
              paddingRight: spacing.semantic.screen.paddingX,
              flexShrink: 0,
            }}>
              {title && (
                <h3 style={{
                  margin: 0,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  color: "var(--content-base-default)",
                  lineHeight: 1.4,
                }}>
                  {title}
                </h3>
              )}
              {description && (
                <p style={{
                  margin: 0,
                  marginTop: title ? spacing.primitive[1] : 0,
                  fontSize: typography.fontSize.sm,
                  color: "var(--content-base-secondary)",
                  lineHeight: 1.6,
                }}>
                  {description}
                </p>
              )}
            </div>
          )}
          {/* Content */}
          {children && (
            <div style={{
              flex: 1,
              overflowY: scrollable ? "auto" : "hidden",
              paddingLeft: spacing.semantic.screen.paddingX,
              paddingRight: spacing.semantic.screen.paddingX,
              paddingBottom: spacing.primitive[4],
            }}>
              {children}
            </div>
          )}
          {/* Footer Link */}
          {footerLink && (
            <div style={{
              textAlign: "center",
              paddingTop: spacing.primitive[4],
              paddingBottom: spacing.primitive[1],
              paddingLeft: spacing.semantic.screen.paddingX,
              paddingRight: spacing.semantic.screen.paddingX,
              flexShrink: 0,
            }}>
              {footerLink}
            </div>
          )}
          {/* Actions */}
          {actions && (
            <div style={{
              paddingTop: spacing.primitive[3],
              paddingBottom: spacing.primitive[6],
              paddingLeft: spacing.semantic.screen.paddingX,
              paddingRight: spacing.semantic.screen.paddingX,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: spacing.primitive[2],
            }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Phone Frame ─────────────────────────────────────────────────────────────

function PhoneFrame({ children, height = 480 }: { children?: React.ReactNode; height?: number }) {
  return (
    <div style={{
      width: 280,
      height,
      borderRadius: radius.primitive.xl,
      backgroundColor: "var(--surface-base-alternative)",
      border: "1px solid var(--divider)",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Status bar */}
      <div style={{
        height: spacing.primitive[8],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: spacing.primitive[4],
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-default)" }}>9:41</span>
        <div style={{ display: "flex", gap: spacing.primitive[1], alignItems: "center" }}>
          <div style={{ width: 15, height: 8, borderRadius: 2, border: "1px solid var(--content-base-default)", position: "relative" }}>
            <div style={{ position: "absolute", left: 1, top: 1, right: 1, bottom: 1, borderRadius: 1, backgroundColor: "var(--content-base-default)", width: "70%" }} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────────────

function Playground() {
  const [open, setOpen] = useState(false);
  const [showHandle, setShowHandle] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [hasContent, setHasContent] = useState(true);
  const [actions, setActions] = useState<"none" | "single" | "double">("single");
  const [scrollable, setScrollable] = useState(false);

  const ITEMS = ["계좌 이체", "QR 결제", "카드 결제", "현금 결제", "포인트 결제", "상품권 결제"];

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
            padding: spacing.primitive[8],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--surface-base-alternative)",
          }}>
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: 400,
              height: 420,
              borderRadius: radius.primitive.lg,
              backgroundColor: "var(--surface-base-default)",
              border: "1px solid var(--divider)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Button
                buttonType="filled"
                color="primary"
                size="medium"
                onClick={() => setOpen(true)}
              >
                바텀시트 열기
              </Button>
              <BottomSheetDemo
                open={open}
                onClose={() => setOpen(false)}
                showHandle={showHandle}
                title={showTitle ? "결제 수단 선택" : undefined}
                description={showDescription ? "원하는 결제 수단을 선택해주세요." : undefined}
                scrollable={scrollable}
                actions={
                  actions === "single" ? (
                    <Button buttonType="filled" color="primary" layout="fillWidth" size="large" onClick={() => setOpen(false)}>
                      확인
                    </Button>
                  ) : actions === "double" ? (
                    <>
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large" onClick={() => setOpen(false)}>
                        결제하기
                      </Button>
                      <Button buttonType="weak" color="neutral" layout="fillWidth" size="large" onClick={() => setOpen(false)}>
                        취소
                      </Button>
                    </>
                  ) : undefined
                }
              >
                {hasContent && (
                  <div style={{ paddingTop: spacing.primitive[2] }}>
                    {(scrollable ? ITEMS : ITEMS.slice(0, 3)).map((item, i, arr) => (
                      <div key={item} style={{
                        height: spacing.semantic.minTouchTarget,
                        display: "flex",
                        alignItems: "center",
                        fontSize: typography.fontSize.sm,
                        color: "var(--content-base-default)",
                        borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none",
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </BottomSheetDemo>
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
                label="Handle"
                value={showHandle ? "true" : "false"}
                onChange={(v) => setShowHandle(v === "true")}
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
              />
              <RadioGroup
                label="Title"
                value={showTitle ? "true" : "false"}
                onChange={(v) => setShowTitle(v === "true")}
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
              />
              <RadioGroup
                label="Description"
                value={showDescription ? "true" : "false"}
                onChange={(v) => setShowDescription(v === "true")}
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
              />
              <RadioGroup
                label="Content"
                value={hasContent ? "true" : "false"}
                onChange={(v) => setHasContent(v === "true")}
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
              />
              <RadioGroup
                label="Actions"
                value={actions}
                onChange={(v) => setActions(v as "none" | "single" | "double")}
                options={[
                  { value: "none", label: "None" },
                  { value: "single", label: "Single" },
                  { value: "double", label: "Double" },
                ]}
              />
              <RadioGroup
                label="Scrollable"
                value={scrollable ? "true" : "false"}
                onChange={(v) => setScrollable(v === "true")}
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Design Content ──────────────────────────────────────────────────────────

function DesignContent() {
  const SCROLL_ITEMS = ["계좌 이체", "QR 결제", "카드 결제", "현금 결제", "포인트 결제", "상품권 결제", "간편 결제", "후불 결제"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>BottomSheet</InlineCode>는 화면 하단에서 위로 슬라이드되어 나타나는 모달 패널입니다.
          보조 액션, 선택 옵션, 간단한 입력 등 현재 컨텍스트를 보완하는 내용을 표시할 때 사용합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[5] }}>
            <PhoneFrame>
              <BottomSheetDemo
                open={true}
                showHandle={true}
                title="결제 수단 선택"
                description="원하는 결제 수단을 선택해주세요."
                actions={
                  <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                    확인
                  </Button>
                }
              >
                <div style={{ paddingTop: spacing.primitive[2] }}>
                  {["계좌 이체", "QR 결제", "카드 결제"].map((item, i, arr) => (
                    <div key={item} style={{
                      height: spacing.semantic.minTouchTarget,
                      display: "flex",
                      alignItems: "center",
                      fontSize: typography.fontSize.sm,
                      color: "var(--content-base-default)",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none",
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </BottomSheetDemo>
            </PhoneFrame>
            {/* Annotation labels */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], width: "100%" }}>
              {[
                ["1", "Handle", "드래그 인터랙션을 안내하는 인디케이터 (optional)"],
                ["2", "Header", "제목과 설명 (optional)"],
                ["3", "Content area", "스크롤 가능한 콘텐츠 영역"],
                ["4", "Action area", "CTA 버튼 영역 (optional)"],
                ["5", "Overlay", "배경 딤처리 (클릭 시 닫힘)"],
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

        <Subsection title="Handle">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            핸들은 스와이프 다운 제스처를 유도합니다. 닫기 버튼이 별도로 있는 경우 핸들을 숨길 수 있습니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={320}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="알림 설정"
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  />
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>With Handle</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={320}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={false}
                    title="알림 설정"
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  />
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Without Handle</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Action Area">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            하단 액션 영역의 구성입니다. 액션 없이 콘텐츠만 표시하거나, 단일/이중 CTA를 배치할 수 있습니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={360}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="공지사항"
                  >
                    <div style={{ paddingTop: spacing.primitive[2] }}>
                      {["서비스 점검 안내", "버전 업데이트", "이벤트 종료"].map((item, i, arr) => (
                        <div key={item} style={{
                          height: spacing.semantic.minTouchTarget,
                          display: "flex",
                          alignItems: "center",
                          fontSize: typography.fontSize.sm,
                          color: "var(--content-base-default)",
                          borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none",
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </BottomSheetDemo>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>콘텐츠만</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={360}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="결제 확인"
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  >
                    <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                      결제를 진행하시겠습니까?
                    </p>
                  </BottomSheetDemo>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>단일 액션</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={360}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="결제 확인"
                    actions={
                      <>
                        <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                          결제하기
                        </Button>
                        <Button buttonType="weak" color="neutral" layout="fillWidth" size="large">
                          취소
                        </Button>
                      </>
                    }
                  >
                    <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                      결제를 진행하시겠습니까?
                    </p>
                  </BottomSheetDemo>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>이중 액션</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Scrollable Content">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            콘텐츠 양이 시트 높이를 초과할 경우 <InlineCode>scrollable</InlineCode>을 활성화하여 내부 스크롤을 허용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="결제 수단"
                    scrollable={false}
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  >
                    <div style={{ paddingTop: spacing.primitive[2] }}>
                      {SCROLL_ITEMS.slice(0, 3).map((item, i, arr) => (
                        <div key={item} style={{
                          height: spacing.semantic.minTouchTarget,
                          display: "flex",
                          alignItems: "center",
                          fontSize: typography.fontSize.sm,
                          color: "var(--content-base-default)",
                          borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none",
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </BottomSheetDemo>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>고정 높이</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="결제 수단"
                    scrollable={true}
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  >
                    <div style={{ paddingTop: spacing.primitive[2] }}>
                      {SCROLL_ITEMS.map((item, i, arr) => (
                        <div key={item} style={{
                          height: spacing.semantic.minTouchTarget,
                          display: "flex",
                          alignItems: "center",
                          fontSize: typography.fontSize.sm,
                          color: "var(--content-base-default)",
                          borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none",
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </BottomSheetDemo>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>스크롤</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            BottomSheet의 주요 상호작용 상태입니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "flex-start" }}>
              {/* Open state */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={320}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="열린 상태"
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  />
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Open</span>
              </div>
              {/* Closed state */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={320}>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    top: spacing.primitive[8],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: spacing.primitive[5],
                  }}>
                    <Button buttonType="filled" color="primary" size="medium">
                      열기
                    </Button>
                  </div>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Closed</span>
              </div>
              {/* Scrolling state */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PhoneFrame height={320}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="스크롤 중"
                    scrollable={true}
                  >
                    <div style={{ paddingTop: spacing.primitive[2] }}>
                      {SCROLL_ITEMS.map((item, i, arr) => (
                        <div key={item} style={{
                          height: spacing.semantic.minTouchTarget,
                          display: "flex",
                          alignItems: "center",
                          fontSize: typography.fontSize.sm,
                          color: "var(--content-base-default)",
                          borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none",
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </BottomSheetDemo>
                </PhoneFrame>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Scrolling</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <PhoneFrame height={240}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="결제 수단 선택"
                    actions={
                      <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                        확인
                      </Button>
                    }
                  >
                    <div style={{ paddingTop: spacing.primitive[2] }}>
                      {["카드 결제", "계좌 이체"].map((item) => (
                        <div key={item} style={{
                          height: spacing.semantic.minTouchTarget,
                          display: "flex",
                          alignItems: "center",
                          fontSize: typography.fontSize.sm,
                          color: "var(--content-base-default)",
                          borderBottom: "1px solid var(--divider)",
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </BottomSheetDemo>
                </PhoneFrame>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  보조 액션과 선택 옵션에 사용. 콘텐츠를 집중적으로 구성.
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <PhoneFrame height={240}>
                  <BottomSheetDemo
                    open={true}
                    showHandle={true}
                    title="1단계: 정보 입력"
                    description="2단계: 결제 → 3단계: 확인"
                  >
                    <div style={{ paddingTop: spacing.primitive[2] }}>
                      <div style={{
                        height: spacing.semantic.minTouchTarget,
                        display: "flex",
                        alignItems: "center",
                        fontSize: typography.fontSize.sm,
                        color: "var(--content-base-secondary)",
                      }}>
                        복잡한 다단계 폼...
                      </div>
                    </div>
                  </BottomSheetDemo>
                </PhoneFrame>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  복잡한 다단계 플로우나 중첩 바텀시트 사용 금지.
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="콘텐츠 집중" desc="현재 컨텍스트와 직접 관련된 내용만 담으세요. 복잡한 폼이나 다단계 플로우는 별도 화면으로 분리하세요." />
            <PrincipleCard number={2} title="닫기 방법 명확화" desc="오버레이 클릭, 스와이프 다운, 취소 버튼 등 닫는 방법을 항상 제공하세요." />
            <PrincipleCard number={3} title="높이 제한" desc="화면의 90% 이상을 덮지 않도록 하세요. 콘텐츠가 많다면 스크롤 가능하게 만드세요." />
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
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
                ["--surface-base-default", "시트 배경"],
                ["--fill-normal", "핸들 바"],
                ["--content-base-default", "제목 텍스트"],
                ["--content-base-secondary", "설명 텍스트"],
                ["--divider", "콘텐츠 구분선"],
                ["--shadow-semantic-card-floating", "시트 상단 그림자 (optional)"],
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
        <p style={{ ...descText, marginTop: spacing.primitive[4] }}>
          수평 패딩은 <InlineCode>spacing.semantic.screen.paddingX</InlineCode> (20px),
          하단 안전 영역은 <InlineCode>spacing.primitive[6]</InlineCode> (24px)을 사용합니다.
        </p>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>시트 컨테이너에 <InlineCode>role=&quot;dialog&quot;</InlineCode>와 <InlineCode>aria-modal=&quot;true&quot;</InlineCode>를 설정하세요.</li>
          <li>시트가 열릴 때 포커스를 첫 번째 포커서블 요소로 이동하세요.</li>
          <li><InlineCode>aria-labelledby</InlineCode>로 제목과 시트를 연결하세요.</li>
          <li>Escape 키로 시트를 닫을 수 있어야 합니다.</li>
          <li>오버레이는 <InlineCode>aria-hidden=&quot;true&quot;</InlineCode>로 설정하세요.</li>
          <li>시트가 열려 있는 동안 배경 콘텐츠에 접근할 수 없어야 합니다 (<InlineCode>inert</InlineCode> 속성 또는 포커스 트랩).</li>
        </ul>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          블로킹 확인이 필요한 경우 <InlineCode>AlertDialog</InlineCode>를 사용하세요.
          간단한 알림은 <InlineCode>Snackbar</InlineCode>를,
          인라인 상태 메시지는 <InlineCode>SectionMessage</InlineCode>를 사용합니다.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ─────────────────────────────────────────────────────────────

const webProps: PropItem[] = [
  { name: "open", type: "boolean", required: true, description: "시트 표시 여부" },
  { name: "onClose", type: "() => void", required: false, description: "닫기 이벤트 핸들러 (오버레이 클릭 시 호출)" },
  { name: "title", type: "ReactNode", required: false, description: "헤더 제목 — string 또는 ReactNode. 색상 강조가 필요한 경우 <span>으로 감싸 전달." },
  { name: "description", type: "ReactNode", required: false, description: "헤더 설명 텍스트 — string 또는 ReactNode." },
  { name: "children", type: "ReactNode", required: false, description: "시트 본문 콘텐츠 — 목록, 폼 입력, 텍스트, 이미지 등 임의의 UI를 자유롭게 구성 가능. scrollable과 조합하면 높이 초과 시 내부 스크롤 활성화." },
  { name: "footerLink", type: "ReactNode", required: false, description: "메인 액션 버튼 위 보조 텍스트 링크 영역. '한 곳에서 구매할게요' 같은 대안 행동 유도에 사용." },
  { name: "actions", type: "ReactNode", required: false, description: "하단 고정 액션 영역 (메인 CTA 버튼)" },
  { name: "showHandle", type: "boolean", required: false, description: "드래그 핸들 표시 여부 (기본값: true)" },
  { name: "maxHeight", type: "string | number", required: false, description: "시트 최대 높이 (기본값: '90vh')" },
  { name: "scrollable", type: "boolean", required: false, description: "콘텐츠 영역 스크롤 활성화 (기본값: false)" },
  { name: "className", type: "string", required: false, description: "루트 컨테이너 커스텀 클래스" },
];

function WebContent() {
  const basicCode = `import { BottomSheet, Button } from '@baerae-zkap/design-system';

export function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button buttonType="filled" color="primary" onClick={() => setOpen(true)}>
        열기
      </Button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={
          <>
            잔액이 <span style={{ color: 'var(--content-brand-default)' }}>400,000원</span> 부족해요
          </>
        }
        description="최적 가격으로 구매하려면 입금이 필요해요"
        footerLink={
          <TextButton onClick={() => handleSinglePurchase()}>
            한 곳에서 구매할게요
          </TextButton>
        }
        actions={
          <Button buttonType="filled" color="primary" layout="fillWidth" size="large"
            onClick={() => setOpen(false)}>
            최적가로 나눠서 입금할래요
          </Button>
        }
      >
        {/* 본문 콘텐츠 */}
      </BottomSheet>
    </>
  );
}`;

  const actionSingleCode = `<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="결제 확인"
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth" size="large"
      onClick={() => setOpen(false)}>
      확인
    </Button>
  }
>
  <p>결제를 진행하시겠습니까?</p>
</BottomSheet>`;

  const actionDoubleCode = `<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="결제 확인"
  actions={
    <>
      <Button buttonType="filled" color="primary" layout="fillWidth" size="large"
        onClick={onConfirm}>
        결제하기
      </Button>
      <Button buttonType="weak" color="neutral" layout="fillWidth" size="large"
        onClick={() => setOpen(false)}>
        취소
      </Button>
    </>
  }
>
  <p>결제를 진행하시겠습니까?</p>
</BottomSheet>`;

  const scrollableCode = `<BottomSheet
  open={open}
  onClose={() => setOpen(false)}
  title="결제 수단 선택"
  scrollable
  actions={
    <Button buttonType="filled" color="primary" layout="fillWidth" size="large"
      onClick={() => setOpen(false)}>
      확인
    </Button>
  }
>
  {items.map((item) => (
    <ListCell key={item.id} title={item.name} />
  ))}
</BottomSheet>`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/BottomSheet/BottomSheet.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          BottomSheet/BottomSheet.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { BottomSheet } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>open</InlineCode>과 <InlineCode>onClose</InlineCode>로 시트의 열기/닫기를 제어합니다.
          <InlineCode>children</InlineCode>에는 목록, 폼, 텍스트 등 임의의 UI를 자유롭게 넣을 수 있습니다.
        </p>
        <PreviewBox>
          <PhoneFrame height={320}>
            <BottomSheetDemo
              open={true}
              showHandle={true}
              title="제목"
            >
              <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-default)" }}>콘텐츠</p>
            </BottomSheetDemo>
          </PhoneFrame>
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="With Action Button">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>actions</InlineCode> prop으로 하단에 고정 CTA 버튼을 배치합니다.
          단일 버튼 또는 primary + secondary 조합을 사용하세요.
        </p>
        <Subsection title="Single CTA">
          <PreviewBox>
            <PhoneFrame height={300}>
              <BottomSheetDemo
                open={true}
                showHandle={true}
                title="결제 확인"
                actions={
                  <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                    확인
                  </Button>
                }
              >
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>결제를 진행하시겠습니까?</p>
              </BottomSheetDemo>
            </PhoneFrame>
          </PreviewBox>
          <CodeBlock code={actionSingleCode} />
        </Subsection>
        <Subsection title="Double CTA">
          <PreviewBox>
            <PhoneFrame height={340}>
              <BottomSheetDemo
                open={true}
                showHandle={true}
                title="결제 확인"
                actions={
                  <>
                    <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                      결제하기
                    </Button>
                    <Button buttonType="weak" color="neutral" layout="fillWidth" size="large">
                      취소
                    </Button>
                  </>
                }
              >
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>결제를 진행하시겠습니까?</p>
              </BottomSheetDemo>
            </PhoneFrame>
          </PreviewBox>
          <CodeBlock code={actionDoubleCode} />
        </Subsection>
      </Section>

      <Section title="Scrollable">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>scrollable</InlineCode> prop으로 콘텐츠 영역의 스크롤을 활성화합니다.
          콘텐츠가 시트 높이를 초과할 때 사용하세요.
        </p>
        <PreviewBox>
          <PhoneFrame>
            <BottomSheetDemo
              open={true}
              showHandle={true}
              title="결제 수단 선택"
              scrollable={true}
              actions={
                <Button buttonType="filled" color="primary" layout="fillWidth" size="large">
                  확인
                </Button>
              }
            >
              <div style={{ paddingTop: spacing.primitive[2] }}>
                {["계좌 이체", "QR 결제", "카드 결제", "현금 결제", "포인트 결제", "상품권 결제", "간편 결제", "후불 결제"].map((item) => (
                  <div key={item} style={{
                    height: spacing.semantic.minTouchTarget,
                    display: "flex",
                    alignItems: "center",
                    fontSize: typography.fontSize.sm,
                    color: "var(--content-base-default)",
                    borderBottom: "1px solid var(--divider)",
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </BottomSheetDemo>
          </PhoneFrame>
        </PreviewBox>
        <CodeBlock code={scrollableCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="BottomSheetProps">
          <PropsTable props={webProps} />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BottomSheetPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Presentation" },
          { label: "Bottom Sheet" },
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
        Bottom Sheet
      </h1>
      <p style={{
        fontSize: typography.fontSize.md,
        color: "var(--content-base-secondary)",
        lineHeight: 1.7,
        margin: 0,
        marginBottom: spacing.primitive[8],
      }}>
        화면 하단에서 슬라이드업되는 모달 패널로, 현재 컨텍스트를 보완하는 보조 액션과 콘텐츠를 표시합니다.
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
