"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

const foundations = [
  {
    title: "Colors",
    description: "브랜드 아이덴티티를 표현하는 컬러 팔레트와 시맨틱 컬러",
    href: "/colors/palette",
    icon: (
      <div style={{ display: "flex", gap: spacing.primitive[1] }}>
        <div style={{ width: 16, height: 16, borderRadius: radius.primitive.xs, backgroundColor: "var(--content-brand-default)" }} />
        <div style={{ width: 16, height: 16, borderRadius: radius.primitive.xs, backgroundColor: "var(--content-success-default)" }} />
        <div style={{ width: 16, height: 16, borderRadius: radius.primitive.xs, backgroundColor: "var(--content-warning-default)" }} />
      </div>
    ),
  },
  {
    title: "Typography",
    description: "일관된 텍스트 스타일을 위한 타이포그래피 시스템",
    href: "/typography",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    ),
  },
  {
    title: "Spacing",
    description: "레이아웃과 여백을 위한 일관된 간격 시스템",
    href: "/spacing",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
  {
    title: "Radius",
    description: "UI 요소의 모서리 둥글기를 정의하는 시스템",
    href: "/radius",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9a6 6 0 016-6h6a6 6 0 016 6v6a6 6 0 01-6 6H9a6 6 0 01-6-6V9z" />
      </svg>
    ),
  },
  {
    title: "Shadow",
    description: "깊이와 계층을 표현하는 그림자 시스템",
    href: "/shadow",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <rect x="7" y="7" width="14" height="14" rx="2" fill="var(--bg-secondary)" />
      </svg>
    ),
  },
  {
    title: "Interaction",
    description: "모션과 트랜지션을 위한 인터랙션 토큰",
    href: "/interaction",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

export default function FoundationsPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb items={[{ label: "Foundations" }]} />

      <h1 style={{ fontSize: 32, fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)" }}>
        Foundations
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[10], lineHeight: 1.6 }}>
        모든 디자인 요소의 기반이 되는 가장 원자적인 단위들로 컬러, 타이포그래피, 스페이싱, 그리드 등 시각적 언어의 최소 단위들로 구성됩니다.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: spacing.primitive[4] }}>
        {foundations.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            style={{
              display: "block",
              padding: spacing.primitive[6],
              backgroundColor: "var(--bg-elevated)",
              borderRadius: radius.primitive.lg,
              border: "1px solid var(--divider)",
              textDecoration: "none",
              transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div style={{ marginBottom: spacing.primitive[4], color: "var(--text-secondary)" }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: spacing.primitive[2] }}>
              {item.title}
            </h3>
            <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
