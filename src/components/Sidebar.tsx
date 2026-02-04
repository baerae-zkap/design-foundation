"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navigation = [
  {
    title: "소개",
    href: "/",
  },
  {
    title: "파운데이션",
    children: [
      { title: "Palette", href: "/colors/palette" },
      { title: "Semantic", href: "/colors/semantic" },
      { title: "Typography", href: "/typography" },
      { title: "Spacing", href: "/spacing" },
      { title: "Radius", href: "/radius" },
      { title: "Shadow", href: "/shadow" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "파운데이션": true,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (href: string) => pathname === href;

  if (isMobile) return null;

  return (
    <aside
      style={{
        width: '240px',
        flexShrink: 0,
        borderRight: '1px solid var(--divider)',
        position: 'sticky',
        top: '56px',
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
      }}
    >
      <nav style={{ padding: '24px 16px' }}>
        {navigation.map((item) => (
          <div key={item.title} style={{ marginBottom: '4px' }}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.title)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.title}</span>
                  <svg
                    style={{
                      width: '16px',
                      height: '16px',
                      transform: expanded[item.title] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expanded[item.title] && (
                  <div style={{
                    marginLeft: '16px',
                    marginTop: '4px',
                    paddingLeft: '12px',
                    borderLeft: '1px solid var(--divider)',
                  }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '8px 12px',
                          fontSize: '14px',
                          textDecoration: 'none',
                          backgroundColor: isActive(child.href) ? 'var(--blue-50)' : 'transparent',
                          color: isActive(child.href) ? 'var(--brand-primary)' : 'var(--text-secondary)',
                          fontWeight: isActive(child.href) ? 500 : 400,
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                style={{
                  display: 'block',
                  padding: '10px 12px',
                  fontSize: '14px',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  backgroundColor: isActive(item.href) ? 'var(--blue-50)' : 'transparent',
                  color: isActive(item.href) ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive(item.href) ? 500 : 400,
                }}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
