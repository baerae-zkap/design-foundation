"use client";

import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <svg
              className="w-4 h-4"
              style={{ color: 'var(--grey-90)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              style={{ color: 'var(--text-tertiary)' }}
              className="hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-primary)' }} className="font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
