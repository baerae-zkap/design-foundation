"use client";

import { useState } from "react";

interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
  showCopyFeedback?: boolean;
}

export function ColorSwatch({ name, value, description }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isLight = isLightColor(value);

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-md"
    >
      <div
        className="h-20 w-full relative"
        style={{ backgroundColor: value }}
      >
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className={`text-sm font-medium ${isLight ? "text-gray-900" : "text-white"}`}>
              Copied!
            </span>
          </div>
        )}
      </div>
      <div className="p-3 bg-white dark:bg-gray-800 text-left">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
          {value}
        </p>
        {description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </button>
  );
}

interface ColorScaleProps {
  name: string;
  colors: Record<string, string>;
}

export function ColorScale({ name, colors }: ColorScaleProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
        {name}
      </h3>
      <div className="grid grid-cols-5 lg:grid-cols-10 gap-2">
        {Object.entries(colors).map(([shade, value]) => {
          if (typeof value !== "string") return null;
          return (
            <ColorSwatchCompact key={shade} shade={shade} value={value} />
          );
        })}
      </div>
    </div>
  );
}

function ColorSwatchCompact({ shade, value }: { shade: string; value: string }) {
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
      className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
      style={{ backgroundColor: value }}
    >
      <div className={`absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? "bg-black/10" : "bg-white/10"}`}>
        <span className={`text-xs font-medium ${isLight ? "text-gray-900" : "text-white"}`}>
          {copied ? "Copied!" : shade}
        </span>
      </div>
      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-medium ${isLight ? "text-gray-700" : "text-white/80"}`}>
        {shade}
      </span>
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
  } else if (color.startsWith("rgba")) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    }
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}
