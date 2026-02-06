"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";

// Types
type TableVariant = "default" | "striped";
type TableSize = "small" | "medium" | "large";

// Shared Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 0 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{title}</h2>
      {children}
    </section>
  );
}

// Subsection Component
function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// PrincipleCard Component
function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          backgroundColor: "#e5e7eb", color: "#6b7280",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600,
        }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

// VariantCard Component
function VariantCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        marginBottom: 16,
      }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "#c4c4c4", marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                color: isSelected ? "var(--text-primary)" : "#9ca3af",
                transition: "color 0.15s ease",
              }}
              onClick={() => onChange(opt.value)}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: isSelected ? "2px solid #3b82f6" : "2px solid #e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                  backgroundColor: "white",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                    }}
                  />
                )}
              </div>
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Prop</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>{prop.name}{prop.required && <span style={{ color: "#ef4444" }}>*</span>}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Design Tab Content
function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Anatomy">
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
          Table 컴포넌트는 다음과 같은 하위 컴포넌트로 구성됩니다:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginBottom: 20 }}>
          <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>1. Table</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>전체 테이블 컨테이너</p>
          </div>
          <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>2. TableHead</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>헤더 섹션</p>
          </div>
          <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>3. TableBody</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>본문 섹션</p>
          </div>
          <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>4. TableRow</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>행</p>
          </div>
          <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>5. TableHeadCell</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>헤더 셀</p>
          </div>
          <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>6. TableCell</div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>데이터 셀</p>
          </div>
        </div>
      </Section>

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

      <Section title="Design Tokens">
        <Subsection title="Border Radius">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--divider)", borderRadius: 8 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Value</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>card.sm</td>
                  <td style={{ padding: "12px 16px" }}>12px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>테이블 외곽 모서리</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Spacing">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--divider)", borderRadius: 8 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Size</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Value</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Small</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>-</td>
                  <td style={{ padding: "12px 16px" }}>16px / 6px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>헤더 셀 패딩 (좌우/상하)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>-</td>
                  <td style={{ padding: "12px 16px" }}>16px / 12px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>데이터 셀 패딩 (좌우/상하)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Medium</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>-</td>
                  <td style={{ padding: "12px 16px" }}>20px / 8px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>헤더 셀 패딩 (좌우/상하)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>-</td>
                  <td style={{ padding: "12px 16px" }}>20px / 16px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>데이터 셀 패딩 (좌우/상하)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>Large</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>-</td>
                  <td style={{ padding: "12px 16px" }}>24px / 10px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>헤더 셀 패딩 (좌우/상하)</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>-</td>
                  <td style={{ padding: "12px 16px" }}>24px / 20px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>데이터 셀 패딩 (좌우/상하)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Colors">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--divider)", borderRadius: 8 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Element</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Color</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Token</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>테이블 배경</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }} />
                      <code style={{ fontSize: 12 }}>#ffffff</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--text-secondary)" }}>surface.base.default</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>테이블 테두리</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e2e8f0" }} />
                      <code style={{ fontSize: 12 }}>#e2e8f0</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--text-secondary)" }}>border.base.default</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>헤더 배경</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#f8fafc" }} />
                      <code style={{ fontSize: 12 }}>#f8fafc</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--text-secondary)" }}>surface.base.alternative</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>헤더 텍스트</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#64748b" }} />
                      <code style={{ fontSize: 12 }}>#64748b</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--text-secondary)" }}>content.base.tertiary</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>셀 텍스트</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#334155" }} />
                      <code style={{ fontSize: 12 }}>#334155</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--text-secondary)" }}>content.base.default</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}>Striped 행 배경</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#f8fafc" }} />
                      <code style={{ fontSize: 12 }}>#f8fafc</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "var(--text-secondary)" }}>surface.base.alternative</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      <Section title="Usage Guidelines">
        <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 20, backgroundColor: "#f0fdf4", borderRadius: 12, border: "1px solid #86efac" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>✅ DO</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#15803d" }}>
              <li>구조화된 데이터를 표시할 때 사용</li>
              <li>헤더에는 명확한 컬럼명 표시</li>
              <li>데이터는 왼쪽 정렬, 숫자는 오른쪽 정렬 고려</li>
              <li>많은 행이 있을 때는 striped variant 사용</li>
              <li>Desktop 환경에서 사용</li>
            </ul>
          </div>
          <div style={{ padding: 20, backgroundColor: "#fef2f2", borderRadius: 12, border: "1px solid #fca5a5" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>❌ DON&apos;T</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#b91c1c" }}>
              <li>모바일에서 사용 (대신 ListCard나 ListCell 사용)</li>
              <li>레이아웃 목적으로 사용</li>
              <li>너무 많은 컬럼 (가독성 저하)</li>
              <li>헤더 없이 사용</li>
            </ul>
          </div>
        </div>

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

      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 16 }}>
          <PrincipleCard
            number={1}
            title="시맨틱 HTML"
            desc="Web에서는 실제 <table>, <thead>, <tbody>, <tr>, <th>, <td> 태그를 사용하여 스크린 리더가 테이블 구조를 이해할 수 있습니다."
          />
          <PrincipleCard
            number={2}
            title="헤더 구분"
            desc="<th> 태그로 헤더 셀을 명확히 구분하여 각 컬럼의 의미를 전달합니다."
          />
          <PrincipleCard
            number={3}
            title="충분한 간격"
            desc="각 셀에 충분한 padding을 제공하여 터치/클릭 타겟을 확보하고 가독성을 높입니다."
          />
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
        <div style={{ padding: 16, backgroundColor: "#f8fafc", borderRadius: 8, border: "1px solid var(--divider)" }}>
          <a
            href="https://github.com/your-org/design-foundation/tree/main/packages/design-system/src/components/Table"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary)", textDecoration: "none", fontSize: 14 }}
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
      <TableCell style={{ color: '#22c55e' }}>+5.2%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>BTC</TableCell>
      <TableCell>0.0234</TableCell>
      <TableCell>₩1,850,000</TableCell>
      <TableCell style={{ color: '#ef4444' }}>-2.1%</TableCell>
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

// React Native Tab Content
function RNContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "#f8fafc", borderRadius: 8, border: "1px solid var(--divider)" }}>
          <a
            href="https://github.com/your-org/design-foundation/tree/main/packages/design-system/src/native/Table.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary)", textDecoration: "none", fontSize: 14 }}
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
} from '@baerae-zkap/design-system/native';
import { Text } from 'react-native';`} />
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
      <TableCell>
        <Text style={{ color: '#22c55e' }}>+5.2%</Text>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>BTC</TableCell>
      <TableCell>0.0234</TableCell>
      <TableCell>₩1,850,000</TableCell>
      <TableCell>
        <Text style={{ color: '#ef4444' }}>-2.1%</Text>
      </TableCell>
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
              { name: "style", type: "ViewStyle", required: false, description: "커스텀 스타일" },
            ]}
          />
        </Subsection>

        <Subsection title="Sub-component Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "자식 요소" },
              { name: "style", type: "ViewStyle", required: false, description: "커스텀 스타일" },
            ]}
          />
        </Subsection>

        <Subsection title="Platform Differences">
          <div style={{ padding: 16, backgroundColor: "#fef3c7", borderRadius: 8, border: "1px solid #fcd34d" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#92400e", marginBottom: 8 }}>⚠️ React Native Notes</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#78350f", fontSize: 14 }}>
              <li>실제 HTML table 태그 대신 View 기반 레이아웃 사용</li>
              <li>Context API로 variant와 size 정보 전달</li>
              <li>문자열 children은 자동으로 Text 컴포넌트로 래핑됨</li>
              <li>스타일 커스터마이징 시 ViewStyle과 TextStyle 분리 필요</li>
            </ul>
          </div>
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
        데이터를 행과 열의 그리드 형식으로 표시하는 테이블 컴포넌트입니다. Desktop 전용 컴포넌트로 설계되었습니다.
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
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "#fafbfc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TableDemo variant={variant} size={size} />
          </div>

          <div style={{
            backgroundColor: "#fafbfc",
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
              backgroundColor: "white",
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
  if (platform === "web") return <WebContent />;
  return <RNContent />;
}

// Table Demo Component
function TableDemo({
  variant = "default",
  size = "medium",
  compact = false
}: {
  variant?: "default" | "striped";
  size?: "small" | "medium" | "large";
  compact?: boolean;
}) {
  const sizeStyles = {
    small: { headPaddingX: 16, headPaddingY: 6, dataPaddingX: 16, dataPaddingY: 12, fontSize: 13 },
    medium: { headPaddingX: 20, headPaddingY: 8, dataPaddingX: 20, dataPaddingY: 16, fontSize: 14 },
    large: { headPaddingX: 24, headPaddingY: 10, dataPaddingX: 24, dataPaddingY: 20, fontSize: 15 },
  };

  const style = sizeStyles[size];
  const data = compact ? [
    { asset: "ETH", amount: "0.7812", value: "₩3,245,000", change: "+5.2%", changeColor: "#22c55e" },
  ] : [
    { asset: "ETH", amount: "0.7812", value: "₩3,245,000", change: "+5.2%", changeColor: "#22c55e" },
    { asset: "BTC", amount: "0.0234", value: "₩1,850,000", change: "-2.1%", changeColor: "#ef4444" },
    { asset: "USDT", amount: "1,250.00", value: "₩1,250,000", change: "0.0%", changeColor: "#64748b" },
  ];

  return (
    <div style={{
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #e2e8f0",
      width: compact ? 300 : "100%",
      maxWidth: compact ? 300 : 600,
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <th style={{
              padding: `${style.headPaddingY}px ${style.headPaddingX}px`,
              textAlign: "left",
              fontSize: style.fontSize,
              fontWeight: 600,
              color: "#64748b"
            }}>자산명</th>
            <th style={{
              padding: `${style.headPaddingY}px ${style.headPaddingX}px`,
              textAlign: "left",
              fontSize: style.fontSize,
              fontWeight: 600,
              color: "#64748b"
            }}>보유량</th>
            {!compact && (
              <>
                <th style={{
                  padding: `${style.headPaddingY}px ${style.headPaddingX}px`,
                  textAlign: "left",
                  fontSize: style.fontSize,
                  fontWeight: 600,
                  color: "#64748b"
                }}>평가금액</th>
                <th style={{
                  padding: `${style.headPaddingY}px ${style.headPaddingX}px`,
                  textAlign: "left",
                  fontSize: style.fontSize,
                  fontWeight: 600,
                  color: "#64748b"
                }}>등락률</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              style={{
                backgroundColor: variant === "striped" && idx % 2 === 1 ? "#f8fafc" : "white",
                borderBottom: idx < data.length - 1 ? "1px solid #e2e8f0" : "none"
              }}
            >
              <td style={{ padding: `${style.dataPaddingY}px ${style.dataPaddingX}px`, fontSize: style.fontSize, color: "#334155" }}>
                {row.asset}
              </td>
              <td style={{ padding: `${style.dataPaddingY}px ${style.dataPaddingX}px`, fontSize: style.fontSize, color: "#334155" }}>
                {row.amount}
              </td>
              {!compact && (
                <>
                  <td style={{ padding: `${style.dataPaddingY}px ${style.dataPaddingX}px`, fontSize: style.fontSize, color: "#334155" }}>
                    {row.value}
                  </td>
                  <td style={{ padding: `${style.dataPaddingY}px ${style.dataPaddingX}px`, fontSize: style.fontSize, color: row.changeColor }}>
                    {row.change}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
