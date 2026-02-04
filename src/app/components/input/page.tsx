"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  type?: "text" | "password" | "email";
  helperText?: string;
}

function Input({ label, placeholder, value, onChange, error, disabled, type = "text", helperText }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: 44,
          padding: "0 14px",
          fontSize: 14,
          borderRadius: "var(--radius-md)",
          border: `1px solid ${error ? "var(--red-500, #EF4444)" : focused ? "var(--brand-primary)" : "var(--divider)"}`,
          backgroundColor: disabled ? "var(--bg-secondary)" : "var(--bg-primary)",
          color: disabled ? "var(--text-tertiary)" : "var(--text-primary)",
          outline: "none",
          transition: "border-color 0.15s ease",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {(error || helperText) && (
        <span className="text-xs" style={{ color: error ? "var(--red-500, #EF4444)" : "var(--text-tertiary)" }}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}

export default function InputPage() {
  const [basicValue, setBasicValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const emailError = emailValue && !emailValue.includes("@") ? "올바른 이메일 형식이 아닙니다." : "";

  return (
    <div>
      <Breadcrumb items={[{ label: "컴포넌트", href: "/" }, { label: "Input" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Input</h1>
      <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        사용자로부터 텍스트 입력을 받는 기본 폼 요소입니다. 다양한 타입과 상태를 지원합니다.
      </p>

      {/* Basic */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Basic</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>기본 입력 필드입니다. 직접 입력해보세요.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div style={{ maxWidth: 320 }}>
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              value={basicValue}
              onChange={setBasicValue}
              helperText={basicValue ? `입력값: ${basicValue}` : ""}
            />
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Input
  label="이름"
  placeholder="이름을 입력하세요"
  value={value}
  onChange={setValue}
/>`}</code>
        </pre>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Types</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>텍스트, 이메일, 비밀번호 타입을 지원합니다.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="grid gap-6" style={{ maxWidth: 320 }}>
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={emailValue}
              onChange={setEmailValue}
              error={emailError}
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={passwordValue}
              onChange={setPasswordValue}
            />
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Input type="email" label="이메일" />
<Input type="password" label="비밀번호" />`}</code>
        </pre>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>States</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>에러 및 비활성화 상태를 지원합니다.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="grid gap-6" style={{ maxWidth: 320 }}>
            <Input
              label="에러 상태"
              placeholder="입력하세요"
              error="필수 입력 항목입니다."
            />
            <Input
              label="비활성화"
              placeholder="입력 불가"
              disabled
            />
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Input error="필수 입력 항목입니다." />
<Input disabled />`}</code>
        </pre>
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
                { prop: "type", type: '"text" | "password" | "email"', default: '"text"', desc: "입력 타입" },
                { prop: "placeholder", type: "string", default: "-", desc: "플레이스홀더 텍스트" },
                { prop: "error", type: "string", default: "-", desc: "에러 메시지" },
                { prop: "disabled", type: "boolean", default: "false", desc: "비활성화 여부" },
                { prop: "helperText", type: "string", default: "-", desc: "도움말 텍스트" },
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
