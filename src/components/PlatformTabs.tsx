"use client";

import { useState, useEffect } from "react";

export type Platform = "design" | "web" | "rn";

// Custom event name for tab changes
export const PLATFORM_TAB_CHANGE_EVENT = "platformTabChange";

interface PlatformTabsProps {
  children: (platform: Platform) => React.ReactNode;
  defaultPlatform?: Platform;
}

export function PlatformTabs({ children, defaultPlatform = "design" }: PlatformTabsProps) {
  const [activePlatform, setActivePlatform] = useState<Platform>(defaultPlatform);

  const tabs: { id: Platform; label: string }[] = [
    { id: "design", label: "Design" },
    { id: "web", label: "Web" },
    { id: "rn", label: "React Native" },
  ];

  const handleTabChange = (platform: Platform) => {
    setActivePlatform(platform);
  };

  // Keep external listeners in sync with current tab.
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(PLATFORM_TAB_CHANGE_EVENT, { detail: { platform: activePlatform } }));
    }, 50);
  }, [activePlatform]);

  return (
    <div>
      {/* Tab Navigation - Montage Style */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--divider)",
          marginBottom: 40,
          position: "sticky",
          top: 56,
          backgroundColor: "var(--bg-primary)",
          zIndex: 10,
        }}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activePlatform === tab.id}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {/* Tab Content */}
      {activePlatform === "rn" ? (
        <RNPlaceholder />
      ) : (
        children(activePlatform)
      )}
    </div>
  );
}

function RNPlaceholder() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: "var(--surface-base-container)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          fontSize: 24,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <p
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--text-primary)",
          margin: "0 0 8px 0",
        }}
      >
        React Native 문서 준비중
      </p>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-tertiary)",
          margin: 0,
          maxWidth: 320,
          lineHeight: 1.5,
        }}
      >
        React Native 컴포넌트 가이드를 준비하고 있습니다.
        Web 탭에서 컴포넌트 사용법을 먼저 확인해주세요.
      </p>
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
        padding: "16px 20px",
        fontSize: 15,
        fontWeight: 500,
        color: active ? "var(--text-primary)" : isHovered ? "var(--text-secondary)" : "var(--text-tertiary)",
        backgroundColor: "transparent",
        border: "none",
        borderBottom: active ? "2px solid var(--text-primary)" : "2px solid transparent",
        marginBottom: -1,
        cursor: "pointer",
        transition: "color 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

// Code Block Component - Enhanced with Source Link
interface CodeBlockProps {
  code: string;
  title?: string;
  sourceUrl?: string;
  language?: string;
}

// Syntax highlighting function (exported for reuse)
export function highlightCode(code: string): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Process the line character by character with regex
    while (remaining.length > 0) {
      // Comments
      const commentMatch = remaining.match(/^(\/\/.*)/);
      if (commentMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-comment)' }}>{commentMatch[1]}</span>);
        remaining = remaining.slice(commentMatch[1].length);
        continue;
      }

      // Strings (double quotes)
      const stringMatch = remaining.match(/^("[^"]*")/);
      if (stringMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-string)' }}>{stringMatch[1]}</span>);
        remaining = remaining.slice(stringMatch[1].length);
        continue;
      }

      // Strings (single quotes)
      const singleStringMatch = remaining.match(/^('[^']*')/);
      if (singleStringMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-string)' }}>{singleStringMatch[1]}</span>);
        remaining = remaining.slice(singleStringMatch[1].length);
        continue;
      }

      // Template literals
      const templateMatch = remaining.match(/^(`[^`]*`)/);
      if (templateMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-string)' }}>{templateMatch[1]}</span>);
        remaining = remaining.slice(templateMatch[1].length);
        continue;
      }

      // JSX closing tags </Component>
      const closingTagMatch = remaining.match(/^(<\/[A-Z][a-zA-Z]*>)/);
      if (closingTagMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-tag)' }}>{closingTagMatch[1]}</span>);
        remaining = remaining.slice(closingTagMatch[1].length);
        continue;
      }

      // JSX self-closing tags <Component ... />
      const selfClosingMatch = remaining.match(/^(<[A-Z][a-zA-Z]*)/);
      if (selfClosingMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-tag)' }}>{selfClosingMatch[1]}</span>);
        remaining = remaining.slice(selfClosingMatch[1].length);
        continue;
      }

      // JSX closing bracket />
      const closeBracketMatch = remaining.match(/^(\/?>)/);
      if (closeBracketMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-tag)' }}>{closeBracketMatch[1]}</span>);
        remaining = remaining.slice(closeBracketMatch[1].length);
        continue;
      }

      // Keywords
      const keywordMatch = remaining.match(/^(import|export|from|const|let|var|function|return|if|else|true|false|null|undefined)(?![a-zA-Z])/);
      if (keywordMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-keyword)' }}>{keywordMatch[1]}</span>);
        remaining = remaining.slice(keywordMatch[1].length);
        continue;
      }

      // Props/attributes (word followed by =)
      const propMatch = remaining.match(/^([a-zA-Z][a-zA-Z0-9]*)(?==)/);
      if (propMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-prop)' }}>{propMatch[1]}</span>);
        remaining = remaining.slice(propMatch[1].length);
        continue;
      }

      // Arrow functions
      const arrowMatch = remaining.match(/^(=>)/);
      if (arrowMatch) {
        parts.push(<span key={key++} style={{ color: 'var(--docs-syntax-keyword)' }}>{arrowMatch[1]}</span>);
        remaining = remaining.slice(arrowMatch[1].length);
        continue;
      }

      // Default: add single character
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    }

    return (
      <span key={lineIndex}>
        {parts}
        {lineIndex < lines.length - 1 && '\n'}
      </span>
    );
  });
}

export function CodeBlock({ code, title, sourceUrl, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.split("\n").length;
  const shouldShowExpand = lineCount > 10;
  const maxHeight = expanded ? "none" : "280px";

  const highlightedCode = highlightCode(code);

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--divider)",
        overflow: "hidden",
        backgroundColor: "var(--docs-code-surface)",
      }}
    >
      {/* Header */}
      {(title || sourceUrl) && (
        <div
          style={{
            padding: "10px 16px",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--docs-code-muted)",
            borderBottom: "1px solid var(--docs-code-border)",
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{title || language || "Code"}</span>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: "var(--docs-code-muted)",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--docs-code-muted-strong)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--docs-code-muted)")}
            >
              <GithubIcon />
              View Source
            </a>
          )}
        </div>
      )}

      {/* Code Content */}
      <div style={{ position: "relative" }}>
        <pre
          style={{
            margin: 0,
            padding: 16,
            overflow: "auto",
            maxHeight: maxHeight,
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--docs-code-text)",
            fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            backgroundColor: "var(--docs-code-surface)",
          }}
        >
          <code>{highlightedCode}</code>
        </pre>

        {/* Gradient overlay when collapsed */}
        {shouldShowExpand && !expanded && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "var(--effect-gradient-overlay-bottomScrim)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Footer Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 8,
          padding: "8px 12px",
          borderTop: "1px solid var(--docs-code-border)",
          backgroundColor: "var(--docs-code-surface)",
        }}
      >
        {shouldShowExpand && (
          <ActionButton onClick={() => setExpanded(!expanded)}>
            {expanded ? "Collapse" : "Expand"}
          </ActionButton>
        )}
        <ActionButton onClick={handleCopy}>
          {copied ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </ActionButton>
      </div>
    </div>
  );
}

// Expo Snack Embed Component for Live RN Demos
interface ExpoSnackProps {
  snackId: string;
  title?: string;
  description?: string;
  height?: number;
  preview?: boolean;
  platform?: "ios" | "android" | "web";
  theme?: "light" | "dark";
}

export function ExpoSnack({
  snackId,
  title,
  description,
  height = 500,
  preview = true,
  platform = "ios",
  theme = "dark",
}: ExpoSnackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Construct Expo Snack URL with options
  const snackUrl = `https://snack.expo.dev/embedded/${snackId}?preview=${preview}&platform=${platform}&theme=${theme}`;

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--divider)",
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "var(--bg-secondary)",
          borderBottom: "1px solid var(--divider)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ExpoIcon />
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
              {title || "Live Demo"}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 10,
                backgroundColor: "var(--docs-interactive-badge-bg)",
                color: "var(--docs-interactive-badge-text)",
              }}
            >
              Interactive
            </span>
          </div>
          {description && (
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
              {description}
            </p>
          )}
        </div>
        <a
          href={`https://snack.expo.dev/${snackId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--text-secondary)",
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--divider)",
            borderRadius: 6,
            textDecoration: "none",
            transition: "all 0.15s ease",
          }}
        >
          <ExternalLinkIcon />
          Open in Snack
        </a>
      </div>

      {/* Snack Embed */}
      <div style={{ position: "relative", backgroundColor: "var(--docs-code-surface-elevated)" }}>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--docs-code-surface-elevated)",
              zIndex: 1,
            }}
          >
            <LoadingSpinner />
            <p style={{ fontSize: 13, color: "var(--docs-code-muted)", marginTop: 12 }}>Loading Expo Snack...</p>
          </div>
        )}
        {hasError ? (
          <div
            style={{
              height: height,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-container)",
            }}
          >
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12 }}>
              Failed to load Expo Snack
            </p>
            <a
              href={`https://snack.expo.dev/${snackId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--content-base-onColor)",
                backgroundColor: "var(--brand-primary)",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Open in Expo Snack
            </a>
          </div>
        ) : (
          <iframe
            src={snackUrl}
            style={{
              width: "100%",
              height: height,
              border: 0,
              display: "block",
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "8px 16px",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--divider)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 12,
          color: "var(--text-tertiary)",
        }}
      >
        <span>Platform: {platform.toUpperCase()}</span>
        <span>•</span>
        <span>Edit code to see live changes</span>
      </div>
    </div>
  );
}

// Inline Expo Snack - Simpler version for code examples
interface ExpoSnackInlineProps {
  code: string;
  title?: string;
  dependencies?: string[];
  height?: number;
}

export function ExpoSnackInline({
  code,
  title = "Example",
  dependencies = [],
  height = 400,
}: ExpoSnackInlineProps) {
  // Encode code for URL
  const encodedCode = encodeURIComponent(code);
  const encodedDeps = encodeURIComponent(JSON.stringify(
    dependencies.reduce((acc, dep) => ({ ...acc, [dep]: "*" }), {})
  ));

  const snackUrl = `https://snack.expo.dev/embedded?code=${encodedCode}&dependencies=${encodedDeps}&name=${encodeURIComponent(title)}&theme=dark&preview=true&platform=ios`;

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--divider)",
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: "var(--bg-secondary)",
          borderBottom: "1px solid var(--divider)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ExpoIcon />
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{title}</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            padding: "2px 6px",
            borderRadius: 8,
            backgroundColor: "var(--docs-live-badge-bg)",
            color: "var(--docs-live-badge-text)",
          }}
        >
          Live
        </span>
      </div>
      <iframe
        src={snackUrl}
        style={{
          width: "100%",
          height: height,
          border: 0,
          display: "block",
        }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}

function ActionButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 500,
        color: isHovered ? "var(--docs-code-text)" : "var(--docs-code-muted)",
        backgroundColor: isHovered ? "var(--docs-code-hover-bg)" : "transparent",
        border: "1px solid var(--docs-code-border)",
        borderRadius: 6,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

// Preview Box Component - Montage Style
interface PreviewBoxProps {
  children: React.ReactNode;
  padding?: number;
}

export function PreviewBox({ children, padding = 40 }: PreviewBoxProps) {
  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--divider)",
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          padding: padding,
          backgroundColor: "var(--surface-base-container)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Icons
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

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExpoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--docs-code-muted)"
      strokeWidth="2"
      style={{ animation: "spin 1s linear infinite" }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  );
}
