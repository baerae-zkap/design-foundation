"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";

const componentCategories = [
  {
    title: "Actions",
    description: "사용자의 액션을 유도하는 인터랙티브 요소",
    components: [
      { name: "Button", href: "/components/actions/button", status: "ready" },
      { name: "Icon Button", href: "/components/actions/icon-button", status: "planned" },
      { name: "Text Button", href: "/components/actions/text-button", status: "planned" },
      { name: "Chip", href: "/components/actions/chip", status: "planned" },
    ],
  },
  {
    title: "Selection & Input",
    description: "데이터 입력 및 선택을 위한 폼 요소",
    components: [
      { name: "Checkbox", href: "/components/inputs/checkbox", status: "planned" },
      { name: "Radio", href: "/components/inputs/radio", status: "planned" },
      { name: "Switch", href: "/components/inputs/switch", status: "planned" },
      { name: "Text Field", href: "/components/inputs/text-field", status: "planned" },
      { name: "Text Area", href: "/components/inputs/text-area", status: "planned" },
      { name: "Select", href: "/components/inputs/select", status: "planned" },
    ],
  },
  {
    title: "Feedback",
    description: "사용자에게 정보와 피드백을 전달",
    components: [
      { name: "Toast", href: "/components/feedback/toast", status: "planned" },
      { name: "Alert", href: "/components/feedback/alert", status: "planned" },
      { name: "Snackbar", href: "/components/feedback/snackbar", status: "planned" },
    ],
  },
  {
    title: "Presentation",
    description: "콘텐츠를 오버레이 형태로 표시",
    components: [
      { name: "Modal", href: "/components/presentation/modal", status: "planned" },
      { name: "Bottom Sheet", href: "/components/presentation/bottom-sheet", status: "planned" },
      { name: "Tooltip", href: "/components/presentation/tooltip", status: "planned" },
      { name: "Popover", href: "/components/presentation/popover", status: "planned" },
    ],
  },
  {
    title: "Contents",
    description: "정보를 시각적으로 표현하는 요소",
    components: [
      { name: "Avatar", href: "/components/contents/avatar", status: "planned" },
      { name: "Badge", href: "/components/contents/badge", status: "planned" },
      { name: "Card", href: "/components/contents/card", status: "planned" },
      { name: "Accordion", href: "/components/contents/accordion", status: "planned" },
    ],
  },
  {
    title: "Navigation",
    description: "앱 내 탐색을 위한 요소",
    components: [
      { name: "Tab", href: "/components/navigation/tab", status: "planned" },
      { name: "Bottom Navigation", href: "/components/navigation/bottom-navigation", status: "planned" },
      { name: "Pagination", href: "/components/navigation/pagination", status: "planned" },
    ],
  },
  {
    title: "Loading",
    description: "로딩 상태를 표시하는 요소",
    components: [
      { name: "Skeleton", href: "/components/loading/skeleton", status: "planned" },
      { name: "Spinner", href: "/components/loading/spinner", status: "planned" },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <Breadcrumb items={[{ label: "컴포넌트" }]} />

      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
        Components
      </h1>
      <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>
        ZKAP 디자인 시스템의 UI 컴포넌트 라이브러리입니다.
      </p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 48 }}>
        <div style={{ padding: 20, backgroundColor: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--divider)", textAlign: "center" }}>
          <p style={{ fontSize: 32, fontWeight: 700, color: "var(--brand-primary)", marginBottom: 4 }}>
            {componentCategories.reduce((acc, cat) => acc + cat.components.length, 0)}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Total Components</p>
        </div>
        <div style={{ padding: 20, backgroundColor: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--divider)", textAlign: "center" }}>
          <p style={{ fontSize: 32, fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>
            {componentCategories.reduce((acc, cat) => acc + cat.components.filter(c => c.status === "ready").length, 0)}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Ready</p>
        </div>
        <div style={{ padding: 20, backgroundColor: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--divider)", textAlign: "center" }}>
          <p style={{ fontSize: 32, fontWeight: 700, color: "#f59e0b", marginBottom: 4 }}>
            {componentCategories.reduce((acc, cat) => acc + cat.components.filter(c => c.status === "planned").length, 0)}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Planned</p>
        </div>
        <div style={{ padding: 20, backgroundColor: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--divider)", textAlign: "center" }}>
          <p style={{ fontSize: 32, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
            {componentCategories.length}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Categories</p>
        </div>
      </div>

      {/* Categories */}
      {componentCategories.map((category) => (
        <section key={category.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
            {category.title}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
            {category.description}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {category.components.map((component) => (
              <Link
                key={component.name}
                href={component.status === "ready" ? component.href : "#"}
                style={{
                  display: "block",
                  padding: 16,
                  backgroundColor: "var(--bg-elevated)",
                  borderRadius: 12,
                  border: "1px solid var(--divider)",
                  textDecoration: "none",
                  transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: component.status === "planned" ? 0.6 : 1,
                  cursor: component.status === "planned" ? "not-allowed" : "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
                    {component.name}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "2px 8px",
                      borderRadius: 10,
                      backgroundColor: component.status === "ready" ? "#dcfce7" : "#fef3c7",
                      color: component.status === "ready" ? "#166534" : "#92400e",
                    }}
                  >
                    {component.status === "ready" ? "Ready" : "Planned"}
                  </span>
                </div>
                {component.status === "ready" && (
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>View documentation →</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
