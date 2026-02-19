"use client";

import React from "react";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

export function PrincipleCard({ number, title, desc }: {
  number: number;
  title: string;
  desc: string;
}) {
  return (
    <div style={{
      padding: spacing.primitive[5],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[3], marginBottom: spacing.primitive[2] }}>
        <span style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "var(--surface-base-container)",
          color: "var(--content-base-neutral)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
        }}>
          {number}
        </span>
        <span style={{ fontSize: 15, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

export function VariantCard({ name, description, children }: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      padding: spacing.primitive[5],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <div style={{
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--surface-base-alternative)",
        borderRadius: radius.primitive.md,
        marginBottom: spacing.primitive[4],
      }}>
        {children}
      </div>
      <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: spacing.primitive[1] }}>{name}</div>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

export function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)", display: "flex", flexDirection: "column" as const }}>
      <div style={{
        flex: 1,
        padding: spacing.primitive[6],
        backgroundColor: "var(--surface-base-alternative)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 160,
      }}>
        {children}
      </div>
      <div style={{
        padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
        backgroundColor: "var(--surface-base-default)",
        borderTop: "1px solid var(--divider)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="var(--content-success-default)"/>
          <path d="M8 12l3 3 5-5" stroke="var(--content-base-onColor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-success-default)" }}>Do</span>
      </div>
    </div>
  );
}

export function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)", display: "flex", flexDirection: "column" as const }}>
      <div style={{
        flex: 1,
        padding: spacing.primitive[6],
        backgroundColor: "var(--surface-base-alternative)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 160,
      }}>
        {children}
      </div>
      <div style={{
        padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
        backgroundColor: "var(--surface-base-default)",
        borderTop: "1px solid var(--divider)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="var(--content-error-default)"/>
          <path d="M15 9l-6 6M9 9l6 6" stroke="var(--content-base-onColor)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--content-error-default)" }}>Don&apos;t</span>
      </div>
    </div>
  );
}
