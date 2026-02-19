"use client";

import React from "react";
import { InlineCode } from "./Section";
import { typography, spacing } from '@baerae-zkap/design-system';

export interface PropItem {
  name: string;
  type: string;
  required: boolean;
  defaultVal?: string;
  description: string;
}

export function PropsTable({ props }: { props: PropItem[] }) {
  return (
    <div style={{ overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
        <thead>
          <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Name</th>
            <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Type</th>
            <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Default</th>
            <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={`${prop.name}-${i}`}>
              <td style={{ padding: "10px 14px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", verticalAlign: "top" }}>
                <code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: 6, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium }}>{prop.name}</code>
              </td>
              <td style={{ padding: "10px 14px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: typography.fontSize.xs, verticalAlign: "top", maxWidth: 180, wordBreak: "break-word" }}>{prop.type}</td>
              <td style={{ padding: "10px 14px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact, verticalAlign: "top" }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "10px 14px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)", verticalAlign: "top" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ColorTableRow({ color, desc, example, isLast = false }: { color: string; desc: string; example: string; isLast?: boolean }) {
  return (
    <tr>
      <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: isLast ? "none" : "1px solid var(--divider)" }}>
        <InlineCode>{color}</InlineCode>
      </td>
      <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: isLast ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)" }}>{desc}</td>
      <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: isLast ? "none" : "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>{example}</td>
    </tr>
  );
}
