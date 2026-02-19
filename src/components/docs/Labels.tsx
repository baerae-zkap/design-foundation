"use client";

import React from "react";
import { typography, spacing } from '@baerae-zkap/design-system';

export function NumberBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: spacing.primitive[6],
        height: spacing.primitive[6],
        backgroundColor: "var(--brand-primary)",
        color: "var(--content-base-onColor)",
        borderRadius: "50%",
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
      }}
    >
      {children}
    </span>
  );
}

export function DoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", marginTop: spacing.primitive[3], display: "flex", alignItems: "flex-start", gap: spacing.primitive[2] }}>
      <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
      <span style={{ color: "var(--text-secondary)" }}>{children}</span>
    </p>
  );
}

export function DontLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", marginTop: spacing.primitive[3], display: "flex", alignItems: "flex-start", gap: spacing.primitive[2] }}>
      <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
      <span style={{ color: "var(--text-secondary)" }}>{children}</span>
    </p>
  );
}
