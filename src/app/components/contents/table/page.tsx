"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from '@baerae-zkap/design-system';
import type { TableVariant, TableSize } from '@baerae-zkap/design-system';
import { Section, Subsection } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";

// Helper: UsageCard for Recommended Combinations
function UsageCard({ situation, description, example }: {
  situation: string;
  description: string;
  example: string;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 4,
      padding: 16,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{description}</p>
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
        {example}
      </p>
    </div>
  );
}


// Design Tab Content
function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Overview */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>개요</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 24 }}>
          Table은 구조화된 데이터를 행과 열로 정리하여 표시하는 컴포넌트입니다. 비교 가능한 데이터를 일관된 형식으로 보여줄 때 사용합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ padding: 24, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 12 }}>이런 경우 사용하세요</h3>
            <ul style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", paddingLeft: 20, margin: 0 }}>
              <li>비교 가능한 데이터를 열 기반으로 정렬해야 할 때</li>
              <li>정렬, 필터링이 필요한 데이터 목록을 표시할 때</li>
              <li>숫자, 상태 등 구조화된 정보를 표현할 때</li>
            </ul>
          </div>
          <div style={{ padding: 24, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 12 }}>이런 경우 사용하지 마세요</h3>
            <ul style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", paddingLeft: 20, margin: 0 }}>
              <li>단순한 리스트에는 ListCell을 사용하세요</li>
              <li>2열 이하의 간단한 정보에는 Card나 ListCard가 적합합니다</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Anatomy - SVG Diagram */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-container)",
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="480" height="180" viewBox="0 0 480 180">
            {/* Table container outline */}
            <rect x="40" y="20" width="400" height="140" rx="12" fill="var(--surface-base-default)" stroke="var(--border-solid-alternative)" strokeWidth="1.5" />

            {/* Header row */}
            <rect x="40" y="20" width="400" height="36" rx="12" fill="var(--surface-base-alternative)" stroke="var(--border-solid-alternative)" strokeWidth="1" />
            <rect x="40" y="44" width="400" height="12" fill="var(--surface-base-alternative)" />
            <text x="80" y="43" fill="var(--content-base-secondary)" fontSize="12" fontWeight="600">Column A</text>
            <text x="200" y="43" fill="var(--content-base-secondary)" fontSize="12" fontWeight="600">Column B</text>
            <text x="340" y="43" fill="var(--content-base-secondary)" fontSize="12" fontWeight="600">Column C</text>

            {/* Header / body divider */}
            <line x1="40" y1="56" x2="440" y2="56" stroke="var(--border-solid-alternative)" strokeWidth="1" />

            {/* Data row 1 */}
            <text x="80" y="80" fill="var(--content-base-default)" fontSize="12">Data 1</text>
            <text x="200" y="80" fill="var(--content-base-default)" fontSize="12">Data 2</text>
            <text x="340" y="80" fill="var(--content-base-default)" fontSize="12">Data 3</text>

            {/* Row divider */}
            <line x1="40" y1="96" x2="440" y2="96" stroke="var(--border-solid-alternative)" strokeWidth="1" />

            {/* Data row 2 */}
            <text x="80" y="118" fill="var(--content-base-default)" fontSize="12">Data 4</text>
            <text x="200" y="118" fill="var(--content-base-default)" fontSize="12">Data 5</text>
            <text x="340" y="118" fill="var(--content-base-default)" fontSize="12">Data 6</text>

            {/* Row divider */}
            <line x1="40" y1="134" x2="440" y2="134" stroke="var(--border-solid-alternative)" strokeWidth="1" />

            {/* Data row 3 */}
            <text x="80" y="152" fill="var(--content-base-default)" fontSize="12">Data 7</text>
            <text x="200" y="152" fill="var(--content-base-default)" fontSize="12">Data 8</text>
            <text x="340" y="152" fill="var(--content-base-default)" fontSize="12">Data 9</text>

            {/* Column dividers */}
            <line x1="175" y1="20" x2="175" y2="160" stroke="var(--border-solid-alternative)" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="310" y1="20" x2="310" y2="160" stroke="var(--border-solid-alternative)" strokeWidth="1" strokeDasharray="4 3" />

            {/* Numbered annotations */}
            {/* 1 - Header Row */}
            <line x1="460" y1="38" x2="445" y2="38" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="468" cy="38" r="12" fill="var(--content-base-default)" />
            <text x="468" y="42" textAnchor="middle" fill="var(--surface-base-default)" fontSize="11" fontWeight="600">1</text>

            {/* 2 - Data Row */}
            <line x1="460" y1="76" x2="445" y2="76" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="468" cy="76" r="12" fill="var(--content-base-default)" />
            <text x="468" y="80" textAnchor="middle" fill="var(--surface-base-default)" fontSize="11" fontWeight="600">2</text>

            {/* 3 - Cell */}
            <line x1="130" y1="170" x2="130" y2="162" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="130" cy="176" r="12" fill="var(--content-base-default)" />
            <text x="130" y="180" textAnchor="middle" fill="var(--surface-base-default)" fontSize="11" fontWeight="600">3</text>

            {/* 4 - Border */}
            <line x1="16" y1="90" x2="38" y2="90" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="12" cy="90" r="12" fill="var(--content-base-default)" />
            <text x="12" y="94" textAnchor="middle" fill="var(--surface-base-default)" fontSize="11" fontWeight="600">4</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 16,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Header Row</div>
          <div>2. Data Row</div>
          <div>3. Cell</div>
          <div>4. Border</div>
        </div>
      </Section>

      {/* 인터랙션 상태 */}
      <Section title="인터랙션 상태">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          Table의 행은 사용자 상호작용에 따라 시각적 피드백을 제공합니다. 정렬 가능한 컬럼 헤더는 클릭 시 정렬 상태가 변경됩니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          padding: 24,
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
        }}>
          <TableStateCard label="Default Row" sublabel="기본 행 상태">
            <div style={{ width: 140, borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
              <div style={{ height: 20, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16 }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
            </div>
          </TableStateCard>
          <TableStateCard label="Hover Row" sublabel="마우스 오버 행">
            <div style={{ width: 140, borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
              <div style={{ height: 20, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-containerPressed)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16 }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
            </div>
          </TableStateCard>
          <TableStateCard label="Selected Row" sublabel="선택된 행">
            <div style={{ width: 140, borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
              <div style={{ height: 20, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-brand-secondary)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-brand-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-brand-default)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16 }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
            </div>
          </TableStateCard>
          <TableStateCard label="Sorted Column" sublabel="정렬 활성 컬럼">
            <div style={{ width: 140, borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
              <div style={{ height: 20, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-brand-default)" }} />
                  <span style={{ fontSize: 8, color: "var(--content-brand-default)" }}>▼</span>
                </div>
                <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-secondary)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16, borderBottom: "1px solid var(--border-default)" }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
              <div style={{ height: 22, backgroundColor: "var(--surface-base-default)", display: "flex", alignItems: "center", padding: "0 8px", gap: 16 }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
                <div style={{ width: 24, height: 4, borderRadius: 2, backgroundColor: "var(--content-base-default)" }} />
              </div>
            </div>
          </TableStateCard>
        </div>
      </Section>

      {/* 디자인 토큰 */}
      <Section title="디자인 토큰">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
          컴포넌트에 적용된 디자인 토큰입니다. 커스터마이징 시 아래 토큰을 참조하세요.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>속성</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>토큰</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>값</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>헤더 배경</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--surface-base-alternative</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--surface-base-alternative)", border: "1px solid var(--border-default)" }} />
                    Light Grey / Dark Grey
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>헤더 텍스트</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-base-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-default)", border: "1px solid var(--border-default)" }} />
                    fontSize: 13, fontWeight: 600
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>셀 텍스트</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-base-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-default)", border: "1px solid var(--border-default)" }} />
                    fontSize: 14
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>구분선</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--border-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--border-default)", border: "1px solid var(--border-default)" }} />
                    1px solid
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>최소 높이</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>-</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>sm: 40px / md: 44px / lg: 48px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>정렬 아이콘</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-base-neutral</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-neutral)", border: "1px solid var(--border-default)" }} />
                    Neutral icon
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* UX 라이팅 */}
      <Section title="UX 라이팅">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          Table의 컬럼 헤더와 셀 데이터는 간결하고 일관된 형식으로 작성합니다. 숫자 데이터는 우측 정렬하여 비교가 용이하도록 합니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
            <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;종목명&quot;</code>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>간결한 컬럼 헤더를 사용합니다</p>
          </div>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
            <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;종목 이름&quot;</code>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>불필요하게 풀어쓰지 않습니다</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
            <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;현재가&quot;</code>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>단위는 값에 포함하고 헤더는 짧게 유지합니다</p>
          </div>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
            <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;현재 가격(원)&quot;</code>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>헤더에 단위를 포함하지 않습니다</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
            <code style={{ fontSize: 14, color: "var(--text-primary)" }}>숫자 우측 정렬</code>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>숫자 데이터는 우측 정렬하여 비교를 용이하게 합니다</p>
          </div>
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
            <code style={{ fontSize: 14, color: "var(--text-primary)" }}>숫자 좌측 정렬</code>
            <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, margin: 0 }}>좌측 정렬 시 자릿수 비교가 어렵습니다</p>
          </div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <VariantCard
            name="Default"
            description="기본 테이블 스타일. 모든 행이 동일한 배경색을 가집니다."
          >
            <TableDemo variant="default" size="small" compact />
          </VariantCard>
          <VariantCard
            name="Striped"
            description="홀수/짝수 행에 교차로 배경색이 적용되어 가독성이 향상됩니다."
          >
            <TableDemo variant="striped" size="small" compact />
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <Subsection title="Small">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="small" />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Medium (Default)">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="medium" />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Large">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="large" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Table 컴포넌트는 요소별로 다른 색상을 사용하여 시각적 계층을 만듭니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Element</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>헤더 배경</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", border: "1px solid var(--border-base-default)" }} />
                    <code style={{ fontSize: 12 }}>var(--surface-base-alternative)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>surface.base.alternative</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>데이터 행 배경</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-base-default)" }} />
                    <code style={{ fontSize: 12 }}>var(--static-white)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>surface.base.default</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Striped 행 배경</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", border: "1px solid var(--border-base-default)" }} />
                    <code style={{ fontSize: 12 }}>var(--surface-base-alternative)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>surface.base.alternative</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Hover 행 배경</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--surface-base-containerPressed)" }} />
                    <code style={{ fontSize: 12 }}>var(--border-base-default)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>surface.base.containerPressed</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>테두리</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--border-base-default)" }} />
                    <code style={{ fontSize: 12 }}>var(--border-base-default)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>border.base.default</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>헤더 텍스트</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-secondary)" }} />
                    <code style={{ fontSize: 12 }}>var(--content-base-secondary)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>content.base.secondary</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>셀 텍스트</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "var(--content-base-default)" }} />
                    <code style={{ fontSize: 12 }}>var(--content-base-default)</code>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "var(--content-brand-default)" }}>content.base.default</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Table의 행은 사용자 상호작용에 따라 다양한 상태를 가집니다.
        </p>

        <Subsection title="Default">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="medium" />
            </div>
          </PreviewBox>
          <div style={{ marginTop: 12, padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            기본 상태. 행간 구분선으로 데이터를 구분합니다.
          </div>
        </Subsection>

        <Subsection title="Hover Row">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <div style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--border-solid-alternative)",
                maxWidth: 600,
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "var(--surface-base-default)" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--surface-base-alternative)", borderBottom: "1px solid var(--border-solid-alternative)" }}>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Name</th>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: "var(--surface-base-container)", borderBottom: "1px solid var(--border-solid-alternative)" }}>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-base-default)" }}>ETH</td>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-base-default)" }}>₩3,245,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-base-default)" }}>BTC</td>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-base-default)" }}>₩1,850,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: 12, padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            마우스 오버 시 행 배경이 <code style={{ fontSize: 12 }}>surface.base.container</code>로 변경됩니다.
          </div>
        </Subsection>

        <Subsection title="Selected Row">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <div style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--border-solid-alternative)",
                maxWidth: 600,
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "var(--surface-base-default)" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--surface-base-alternative)", borderBottom: "1px solid var(--border-solid-alternative)" }}>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Name</th>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: "var(--surface-brand-secondary)", borderBottom: "1px solid var(--border-solid-alternative)" }}>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-brand-default)", fontWeight: 500 }}>ETH</td>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-brand-default)", fontWeight: 500 }}>₩3,245,000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-base-default)" }}>BTC</td>
                      <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--content-base-default)" }}>₩1,850,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: 12, padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            선택된 행은 브랜드 컬러 배경(<code style={{ fontSize: 12 }}>surface.brand.secondary</code>)과 강조 텍스트로 표시됩니다.
          </div>
        </Subsection>

        <Subsection title="Loading">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <div style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--border-solid-alternative)",
                maxWidth: 600,
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "var(--surface-base-default)" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--surface-base-alternative)", borderBottom: "1px solid var(--border-solid-alternative)" }}>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Name</th>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Value</th>
                      <th style={{ padding: "8px 20px", textAlign: "left", fontSize: 14, fontWeight: 600, color: "var(--content-base-secondary)" }}>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2].map((i) => (
                      <tr key={i} style={{ borderBottom: i < 2 ? "1px solid var(--border-solid-alternative)" : "none" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ width: 60, height: 14, borderRadius: 4, backgroundColor: "var(--border-solid-alternative)", animation: "pulse 1.5s ease-in-out infinite" }} />
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ width: 80, height: 14, borderRadius: 4, backgroundColor: "var(--border-solid-alternative)", animation: "pulse 1.5s ease-in-out infinite", animationDelay: "0.2s" }} />
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ width: 40, height: 14, borderRadius: 4, backgroundColor: "var(--border-solid-alternative)", animation: "pulse 1.5s ease-in-out infinite", animationDelay: "0.4s" }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: 12, padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            데이터 로딩 중에는 Skeleton 애니메이션으로 로딩 상태를 표시합니다.
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <Subsection title="Border Radius">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--content-brand-default)" }}>card.sm</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>12px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>테이블 외곽 모서리</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Spacing">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Header Padding</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Cell Padding</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Font Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Small</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px / 6px</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px / 12px</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>13px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Medium</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>20px / 8px</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>20px / 16px</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>Large</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>24px / 10px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>24px / 20px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>15px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 패턴을 따르세요. 테이블은 <strong style={{ color: "var(--text-primary)" }}>Desktop 전용</strong>으로 설계되었습니다.
        </p>

        {/* Recommended Combinations */}
        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="Data Display"
              description="자산 포트폴리오, 거래 내역 등 구조화된 데이터를 표시할 때"
              example="예시: 자산명, 보유량, 평가금액, 등락률"
            />
            <UsageCard
              situation="Comparison Table"
              description="플랜/옵션 간 기능을 비교할 때 사용"
              example="예시: 요금제 비교, 기능 비교표"
            />
            <UsageCard
              situation="Pricing Table"
              description="가격 정보와 세부 항목을 정리할 때 사용"
              example="예시: 구독 플랜, 수수료 테이블"
            />
          </div>
        </Subsection>

        {/* Design Principles */}
        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="명확한 데이터 구조"
              desc="테이블은 복잡한 데이터를 체계적으로 표시합니다. 각 컬럼의 의미가 명확해야 하며, 헤더는 반드시 포함해야 합니다."
            />
            <PrincipleCard
              number={2}
              title="가독성 우선"
              desc="충분한 패딩과 명확한 행 구분선으로 데이터를 쉽게 읽을 수 있도록 합니다. 많은 행이 있을 때는 striped variant를 사용합니다."
            />
            <PrincipleCard
              number={3}
              title="Desktop 최적화"
              desc="테이블은 Desktop 환경에 최적화되어 있습니다. 모바일에서는 ListCard나 ListCell과 같은 대안을 사용하세요."
            />
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Table 컴포넌트는 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Attribute</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>role=&quot;table&quot;</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 테이블 구조로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>scope=&quot;col&quot;</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>헤더 셀의 범위를 컬럼으로 명시</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>aria-sort</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>정렬 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>aria-selected</code></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>선택된 행 상태를 전달</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Key</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>테이블 내 인터랙티브 요소로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Arrow Up/Down</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>행 간 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Arrow Left/Right</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>셀 간 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Space / Enter</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>행 선택 또는 셀 내 액션 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="Semantic HTML"
              desc="Web에서는 실제 <table>, <thead>, <tbody>, <tr>, <th>, <td> 태그를 사용하여 스크린 리더가 테이블 구조를 이해할 수 있습니다."
            />
            <PrincipleCard
              number={2}
              title="Header Scope"
              desc="<th> 태그에 scope='col'을 사용하여 헤더 셀이 어떤 컬럼에 해당하는지 명확히 전달합니다."
            />
            <PrincipleCard
              number={3}
              title="Sufficient Spacing"
              desc="각 셀에 충분한 padding을 제공하여 터치/클릭 타겟을 확보하고 가독성을 높입니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Best Practices - 2x2 Do/Don't Grid */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
              <strong style={{ color: "var(--text-primary)" }}>4 columns</strong>
              <div style={{ marginTop: 4 }}>구조화된 데이터에 적절한 컬럼 수 사용</div>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
              <strong style={{ color: "var(--text-primary)" }}>10+ columns</strong>
              <div style={{ marginTop: 4 }}>너무 많은 컬럼으로 가독성 저하</div>
            </div>
          </DontCard>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <DoCard>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
              <strong style={{ color: "var(--text-primary)" }}>Desktop</strong>에서 사용
              <div style={{ marginTop: 4 }}>충분한 화면 너비에서 테이블 사용</div>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
              <strong style={{ color: "var(--text-primary)" }}>Mobile</strong>에서 사용
              <div style={{ marginTop: 4 }}>모바일에서는 ListCard/ListCell 사용</div>
            </div>
          </DontCard>
        </div>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>ListCell</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>데이터 나열</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ListCell은 단일 행, Table은 열 기반 구조화</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Card</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>정보 표시</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Card는 자유 레이아웃, Table은 정렬된 행/열</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>ContentBadge</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>상태 표시</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ContentBadge는 Table 셀 내 상태 라벨에 사용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// Web Tab Content
function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--surface-base-alternative)", borderRadius: 8, border: "1px solid var(--divider)" }}>
          <a
            href="https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/Table"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--content-brand-default)", textDecoration: "none", fontSize: 14 }}
          >
            View on GitHub →
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell
} from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: 24 }}>
            <TableDemo variant="default" size="medium" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Table variant="default" size="medium">
  <TableHead>
    <TableRow>
      <TableHeadCell>자산명</TableHeadCell>
      <TableHeadCell>보유량</TableHeadCell>
      <TableHeadCell>평가금액</TableHeadCell>
      <TableHeadCell>등락률</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>ETH</TableCell>
      <TableCell>0.7812</TableCell>
      <TableCell>₩3,245,000</TableCell>
      <TableCell style={{ color: 'var(--content-success-default)' }}>+5.2%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>BTC</TableCell>
      <TableCell>0.0234</TableCell>
      <TableCell>₩1,850,000</TableCell>
      <TableCell style={{ color: 'var(--content-error-default)' }}>-2.1%</TableCell>
    </TableRow>
  </TableBody>
</Table>`} />

      </Section>

      <Section title="Variants">
        <Subsection title="Default">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="medium" />
            </div>
          </PreviewBox>
          <CodeBlock code={`<Table variant="default" size="medium">
  {/* ... */}
</Table>`} />

        </Subsection>

        <Subsection title="Striped">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="striped" size="medium" />
            </div>
          </PreviewBox>
          <CodeBlock code={`<Table variant="striped" size="medium">
  {/* ... */}
</Table>`} />

        </Subsection>
      </Section>

      <Section title="Sizes">
        <Subsection title="Small">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="small" />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Medium">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="medium" />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Large">
          <PreviewBox>
            <div style={{ padding: 24 }}>
              <TableDemo variant="default" size="large" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      <Section title="API Reference">
        <Subsection title="Table Props">
          <PropsTable
            props={[
              { name: "variant", type: "'default' | 'striped'", required: false, defaultVal: "'default'", description: "테이블 스타일" },
              { name: "size", type: "'small' | 'medium' | 'large'", required: false, defaultVal: "'medium'", description: "테이블 크기" },
              { name: "children", type: "ReactNode", required: true, description: "TableHead, TableBody 등" },
              { name: "style", type: "CSSProperties", required: false, description: "커스텀 스타일" },
            ]}
          />
        </Subsection>

        <Subsection title="Sub-component Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "자식 요소" },
              { name: "style", type: "CSSProperties", required: false, description: "커스텀 스타일" },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}

// Main Page Component
export default function TablePage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Table" },
        ]}
      />

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Table
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        구조화된 데이터를 행과 열로 정리하여 비교, 정렬, 필터링이 가능한 형식으로 표시하는 컴포넌트입니다.
      </p>

      <TablePlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function TablePlayground() {
  const [variant, setVariant] = useState<TableVariant>("default");
  const [size, setSize] = useState<TableSize>("medium");

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TableDemo variant={variant} size={size} />
          </div>

          <div style={{
            backgroundColor: "var(--surface-base-alternative)",
            display: "flex",
            flexDirection: "column",
            padding: 16,
            overflow: "hidden",
            height: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              padding: 24,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              backgroundColor: "var(--surface-base-default)",
              borderRadius: 16,
            }}>
              <RadioGroup
                label="Variant"
                options={[
                  { value: "default", label: "Default" },
                  { value: "striped", label: "Striped" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as TableVariant)}
              />
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as TableSize)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

function TableStateCard({ label, sublabel, children }: {
  label: string; sublabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 16 }}>
      {children}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

// Table Demo Component
function TableDemo({
  variant = "default",
  size = "medium",
  compact = false
}: {
  variant?: TableVariant;
  size?: TableSize;
  compact?: boolean;
}) {
  const data = compact ? [
    { asset: "ETH", amount: "0.7812", value: "₩3,245,000", change: "+5.2%", changeColor: "var(--content-success-default)" },
  ] : [
    { asset: "ETH", amount: "0.7812", value: "₩3,245,000", change: "+5.2%", changeColor: "var(--content-success-default)" },
    { asset: "BTC", amount: "0.0234", value: "₩1,850,000", change: "-2.1%", changeColor: "var(--content-error-default)" },
    { asset: "USDT", amount: "1,250.00", value: "₩1,250,000", change: "0.0%", changeColor: "var(--content-base-secondary)" },
  ];

  return (
    <div style={{ width: compact ? 300 : "100%", maxWidth: compact ? 300 : 600 }}>
      <Table variant={variant} size={size}>
        <TableHead>
          <TableRow>
            <TableHeadCell>자산명</TableHeadCell>
            <TableHeadCell>보유량</TableHeadCell>
            {!compact && (
              <>
                <TableHeadCell>평가금액</TableHeadCell>
                <TableHeadCell>등락률</TableHeadCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={idx}
              style={{
                backgroundColor: variant === "striped" && idx % 2 === 1 ? "var(--surface-base-alternative)" : "var(--surface-base-default)",
              }}
            >
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.amount}</TableCell>
              {!compact && (
                <>
                  <TableCell>{row.value}</TableCell>
                  <TableCell style={{ color: row.changeColor }}>{row.change}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
