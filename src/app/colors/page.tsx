"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import { palette, semanticColors } from "@/data/tokens";

type Theme = "light" | "dark";

function ColorBar({ name, value, fullName }: { name: string; value: string; fullName: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = isLightColor(value);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="color-bar"
      style={{
        width: '100%',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: value,
        height: '56px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        border: 'none',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, overflow: 'hidden' }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: isLight ? 'var(--grey-900)' : '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {fullName}
        </span>
        <span
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: isLight ? 'var(--grey-600)' : 'rgba(255,255,255,0.7)'
          }}
        >
          {value}
        </span>
      </div>
      {copied && (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: isLight ? 'var(--grey-600)' : 'rgba(255,255,255,0.7)',
            flexShrink: 0,
            marginLeft: '8px',
          }}
        >
          Copied!
        </span>
      )}
    </button>
  );
}

function SemanticColorRow({ name, value, description }: { name: string; value: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center gap-3 text-left transition-colors"
      style={{ padding: 'var(--space-3)', width: '100%', boxSizing: 'border-box' }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          flexShrink: 0,
          backgroundColor: value,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--divider)',
        }}
      />
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{name}</span>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-placeholder)' }}>{value}</span>
          {copied && <span style={{ fontSize: '12px', color: 'var(--brand-primary)' }}>Copied!</span>}
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'block', wordBreak: 'break-word' }}>{description}</span>
      </div>
    </button>
  );
}

function isLightColor(color: string): boolean {
  let r = 0, g = 0, b = 0;
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export default function ColorsPage() {
  const [theme, setTheme] = useState<Theme>("light");
  const semantic = semanticColors[theme];

  const paletteColors = Object.entries(palette).filter(([name]) => name !== "static" && name !== "_meta");

  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Colors" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Colors</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        ZKAP 컬러 시스템은 디자이너와 개발자가 <strong style={{ color: 'var(--text-primary)' }}>동일한 색상 언어</strong>로 소통할 수 있게 합니다.
        Palette 색상을 직접 사용하기보다 Semantic 토큰을 활용해주세요.
      </p>
      <TokenDownload files={[
        { name: 'palette.json', path: '/palette.json' },
        { name: 'semantic-tokens.json', path: '/semantic-tokens.json' },
      ]} />

      {/* Usage */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 id="usage" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>기본 사용법</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          <code className="px-1.5 py-0.5 text-sm font-mono" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>theme</code> 객체에서 색상 토큰에 접근합니다.
        </p>
        <pre className="code-block">
          <code>{`const { theme } = useTheme();

<View style={{ backgroundColor: theme.colors.background.bg1 }} />`}</code>
        </pre>
      </section>

      {/* Palette */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 id="palette" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>기본 색상</h2>

        {paletteColors.map(([colorName, shades]) => {
          if (typeof shades !== "object") return null;
          const colorShades = Object.entries(shades).filter(([key, val]) => typeof val === "string" && !key.includes("opacity"));

          return (
            <div key={colorName} style={{ marginBottom: 'var(--space-8)' }}>
              <h3 className="text-sm font-semibold mb-3 capitalize" style={{ color: 'var(--text-primary)' }}>{colorName}</h3>
              <div className="space-y-2">
                {colorShades.map(([shade, value]) => (
                  <ColorBar
                    key={shade}
                    name={shade}
                    value={value as string}
                    fullName={`${colorName}${shade}`}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Static */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Static</h3>
          <div className="space-y-2">
            <ColorBar name="white" value="#FFFFFF" fullName="staticWhite" />
            <ColorBar name="black" value="#000000" fullName="staticBlack" />
          </div>
        </div>
      </section>

      {/* Semantic Colors */}
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <h2 id="semantic" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>시멘틱 색상</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          용도에 따라 정의된 색상입니다. 컴포넌트 개발 시 Semantic 토큰을 우선 사용해주세요.
        </p>

        {/* Theme Toggle */}
        <div
          className="flex gap-1 mb-6 w-fit"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <button
            onClick={() => setTheme("light")}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme === "light" ? 'var(--bg-elevated)' : 'transparent',
              color: theme === "light" ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: theme === "light" ? 'var(--shadow-xs)' : 'none',
            }}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme === "dark" ? 'var(--bg-elevated)' : 'transparent',
              color: theme === "dark" ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: theme === "dark" ? 'var(--shadow-xs)' : 'none',
            }}
          >
            Dark
          </button>
        </div>

        {/* Brand */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Brand</h3>
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--divider)',
            }}
          >
            {Object.entries(semantic.brand).map(([name, token], i, arr) => (
              <div key={name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <SemanticColorRow name={`brand${name.charAt(0).toUpperCase() + name.slice(1)}`} value={token.value} description={token.description} />
              </div>
            ))}
          </div>
        </div>

        {/* Background */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Background</h3>
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--divider)',
            }}
          >
            {Object.entries(semantic.background).map(([name, token], i, arr) => (
              <div key={name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <SemanticColorRow name={`bg${name.charAt(0).toUpperCase() + name.slice(1)}`} value={token.value} description={token.description} />
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Text</h3>
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--divider)',
            }}
          >
            {Object.entries(semantic.text).map(([name, token], i, arr) => (
              <div key={name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <SemanticColorRow name={`text${name.charAt(0).toUpperCase() + name.slice(1)}`} value={token.value} description={token.description} />
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Status</h3>
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--divider)',
            }}
          >
            {Object.entries(semantic.semantic).map(([name, token], i, arr) => (
              <div key={name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <SemanticColorRow name={`status${name.charAt(0).toUpperCase() + name.slice(1)}`} value={token.value} description={token.description} />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Button</h3>
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--divider)',
            }}
          >
            {Object.entries(semantic.button).map(([name, token], i, arr) => (
              <div key={name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <SemanticColorRow name={`button${name.charAt(0).toUpperCase() + name.slice(1)}`} value={token.value} description={token.description} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
