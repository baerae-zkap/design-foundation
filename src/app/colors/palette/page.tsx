"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import paletteJson from "../../../../public/palette.json";

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

function isLightColor(color: string): boolean {
  if (color.startsWith("hsla")) {
    const match = color.match(/hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/);
    if (match) {
      const l = parseInt(match[3]);
      return l > 50;
    }
  }
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }
  return false;
}

export default function PalettePage() {
  const paletteColors = Object.entries(paletteJson).filter(
    ([name]) => name !== "static" && name !== "_meta" && name !== "opacity"
  );

  // 숫자 내림차순 정렬 (99→5, 밝은색→어두운색)
  const sortShades = (shades: [string, string][]) => {
    return shades.sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Palette" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--content-base-strong)' }}>Palette</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--content-base-default)' }}>
        기본 색상 팔레트입니다. 직접 사용보다는 <strong style={{ color: 'var(--content-base-strong)' }}>Semantic 토큰</strong>을 통해 참조하세요.
        <br />
        <span style={{ fontSize: '14px', color: 'var(--content-base-secondary)' }}>
          숫자가 클수록 밝은 색상입니다 (99 = 거의 흰색, 5 = 거의 검정).
        </span>
      </p>
      <TokenDownload files={[
        { name: 'palette.json', path: '/palette.json' },
      ]} />

      {paletteColors.map(([colorName, shades]) => {
        if (typeof shades !== "object") return null;
        const colorShades = sortShades(
          Object.entries(shades as Record<string, string>).filter(
            ([key, val]) => typeof val === "string" && !key.startsWith("_")
          )
        );

        return (
          <div key={colorName} style={{ marginBottom: 'var(--space-8)' }}>
            <h3 className="text-sm font-semibold mb-3 capitalize" style={{ color: 'var(--content-base-strong)' }}>{colorName}</h3>
            <div className="space-y-2">
              {colorShades.map(([shade, value]) => (
                <ColorBar
                  key={shade}
                  name={shade}
                  value={value}
                  fullName={`${colorName}.${shade}`}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Static */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--content-base-strong)' }}>Static</h3>
        <div className="space-y-2">
          <ColorBar name="white" value={paletteJson.static.white} fullName="static.white" />
          <ColorBar name="black" value={paletteJson.static.black} fullName="static.black" />
        </div>
      </div>
    </div>
  );
}
