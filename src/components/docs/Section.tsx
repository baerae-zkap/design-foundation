"use client";

import React from "react";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: spacing.primitive[14] }}>
      <h2
        id={title.toLowerCase().replace(/\s+/g, "-")}
        style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[3], color: "var(--text-primary)", letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <h3
        id={title.toLowerCase().replace(/\s+/g, "-")}
        style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.primitive[3], color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: 6, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium }}>
      {children}
    </code>
  );
}
