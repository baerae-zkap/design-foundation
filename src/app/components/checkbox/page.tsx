"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({ label, checked = false, onChange, disabled = false }: CheckboxProps) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width: 20,
          height: 20,
          borderRadius: "var(--radius-sm)",
          border: `2px solid ${checked ? "var(--brand-primary)" : "var(--divider-strong)"}`,
          backgroundColor: checked ? "var(--brand-primary)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s ease",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-sm" style={{ color: disabled ? "var(--text-tertiary)" : "var(--text-primary)" }}>
          {label}
        </span>
      )}
    </label>
  );
}

export default function CheckboxPage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const allChecked = terms && marketing && privacy;
  const handleAllChange = (checked: boolean) => {
    setTerms(checked);
    setMarketing(checked);
    setPrivacy(checked);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "컴포넌트", href: "/" }, { label: "Checkbox" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Checkbox</h1>
      <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        사용자가 여러 옵션 중 하나 이상을 선택할 수 있는 선택 요소입니다.
      </p>

      {/* Basic */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Basic</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>기본 체크박스입니다. 클릭해보세요.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="flex flex-col gap-4">
            <Checkbox
              label="옵션 1"
              checked={checked1}
              onChange={setChecked1}
            />
            <Checkbox
              label="옵션 2 (기본 체크됨)"
              checked={checked2}
              onChange={setChecked2}
            />
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Checkbox
  label="옵션 1"
  checked={checked}
  onChange={setChecked}
/>`}</code>
        </pre>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>States</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>체크됨, 체크 안됨, 비활성화 상태를 지원합니다.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="flex flex-col gap-4">
            <Checkbox label="체크 안됨" checked={false} />
            <Checkbox label="체크됨" checked={true} />
            <Checkbox label="비활성화 (체크 안됨)" disabled />
            <Checkbox label="비활성화 (체크됨)" checked disabled />
          </div>
        </div>
      </section>

      {/* Group Example */}
      <section className="mb-12">
        <h2 id="group" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Group Example</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>전체 선택 기능이 포함된 체크박스 그룹 예시입니다.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="flex flex-col gap-2">
            <Checkbox
              label="전체 동의"
              checked={allChecked}
              onChange={handleAllChange}
            />
            <div style={{ paddingLeft: 30, borderLeft: "2px solid var(--divider)", marginLeft: 9, display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              <Checkbox
                label="이용약관 동의 (필수)"
                checked={terms}
                onChange={setTerms}
              />
              <Checkbox
                label="마케팅 수신 동의 (선택)"
                checked={marketing}
                onChange={setMarketing}
              />
              <Checkbox
                label="개인정보 처리방침 동의 (필수)"
                checked={privacy}
                onChange={setPrivacy}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 id="props" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Props</h2>
        <div className="overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Prop</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Type</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Default</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "label", type: "string", default: "-", desc: "라벨 텍스트" },
                { prop: "checked", type: "boolean", default: "false", desc: "체크 상태" },
                { prop: "onChange", type: "(checked: boolean) => void", default: "-", desc: "상태 변경 핸들러" },
                { prop: "disabled", type: "boolean", default: "false", desc: "비활성화 여부" },
              ].map((row, i, arr) => (
                <tr key={row.prop} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--brand-primary)" }}>{row.prop}</td>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>{row.type}</td>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>{row.default}</td>
                  <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
