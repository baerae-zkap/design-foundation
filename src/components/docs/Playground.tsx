"use client";

import React, { useState } from "react";

export function RadioGroup({ label, options, value, onChange, disabled }: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--content-base-assistive)", marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {options.map(opt => {
          const isSelected = value === opt.value;
          const inputId = `${label.replace(/\s+/g, "-").toLowerCase()}-${opt.value}`;
          return (
            <label
              key={inputId}
              htmlFor={inputId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: disabled ? "not-allowed" : "pointer",
                fontSize: 15,
                fontWeight: 500,
                color: disabled
                  ? "var(--content-disabled-default)"
                  : isSelected
                    ? "var(--content-base-strong)"
                    : "var(--content-base-alternative)",
                opacity: disabled ? 0.5 : 1,
                transition: "color 0.15s ease",
              }}
            >
              <input
                id={inputId}
                type="radio"
                name={label}
                value={opt.value}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onChange(opt.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: isSelected
                    ? "2px solid var(--content-brand-default)"
                    : "2px solid var(--border-base-default)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                  backgroundColor: "var(--surface-base-default)",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "var(--content-brand-default)",
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

export function CodeTypeTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
        color: active ? "var(--docs-code-active-text)" : "var(--docs-code-muted)",
        backgroundColor: active ? "var(--docs-code-active-bg)" : "transparent",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 500,
        color: copied ? "var(--docs-code-success)" : "var(--docs-code-muted)",
        backgroundColor: "transparent",
        border: "1px solid var(--docs-code-border)",
        borderRadius: 4,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 4,
        transition: "all 0.15s ease",
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
