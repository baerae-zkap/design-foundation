"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";

const componentCategories = [
  {
    title: "Actions",
    description: "사용자의 액션을 유도하는 인터랙티브 요소",
    components: [
      { name: "Action Item", href: "/components/actions/action-item", status: "ready" },
      { name: "Button", href: "/components/actions/button", status: "ready" },
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
