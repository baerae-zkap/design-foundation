"use client";

import { useState } from "react";

interface CodeTabsProps {
  webCode: string;
  rnCode: string;
}

export function CodeTabs({ webCode, rnCode }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState<"web" | "rn">("web");
  const [copied, setCopied] = useState(false);

  const code = activeTab === "web" ? webCode : rnCode;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--divider)",
        overflow: "hidden",
        backgroundColor: "var(--docs-code-surface)",
      }}
    >
      {/* Tab Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid var(--docs-code-border)",
          backgroundColor: "var(--docs-code-surface-elevated)",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <TabButton
            active={activeTab === "web"}
            onClick={() => setActiveTab("web")}
          >
            Web
          </TabButton>
          <TabButton
            active={activeTab === "rn"}
            onClick={() => setActiveTab("rn")}
          >
            React Native
          </TabButton>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            fontSize: 12,
            color: copied ? "var(--docs-code-success)" : "var(--docs-code-muted)",
            backgroundColor: "transparent",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
        >
          {copied ? (
            <>
              <CheckIcon />
              Copied
            </>
          ) : (
            <>
              <CopyIcon />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <pre
        style={{
          margin: 0,
          padding: 16,
          overflow: "auto",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--docs-code-text)",
          fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "6px 12px",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? "var(--docs-code-active-text)" : isHovered ? "var(--docs-code-muted-strong)" : "var(--docs-code-muted)",
        backgroundColor: active ? "var(--docs-code-active-bg)" : "transparent",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
    >
      {children}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
