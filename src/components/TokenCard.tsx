"use client";

import { useState, ReactNode } from "react";

interface TokenCardProps {
  name: string;
  value: string | number;
  description?: string;
  preview?: ReactNode;
  copyValue?: string;
}

export function TokenCard({ name, value, description, preview, copyValue }: TokenCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue || String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 cursor-pointer transition-all hover:shadow-sm"
    >
      {preview && (
        <div className="flex-shrink-0">
          {preview}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          {copied && (
            <span className="text-xs text-green-600 dark:text-green-400">
              Copied!
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {typeof value === "number" ? `${value}px` : value}
        </p>
        {description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
}
