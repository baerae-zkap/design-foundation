"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navigation = [
  {
    title: "소개",
    href: "/",
  },
  {
    title: "파운데이션",
    children: [
      { title: "Colors", href: "/colors" },
      { title: "Typography", href: "/typography" },
      { title: "Spacing", href: "/spacing" },
      { title: "Radius", href: "/radius" },
      { title: "Shadow", href: "/shadow" },
    ],
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "파운데이션": true,
  });

  // Close menu when route changes (but not on initial render)
  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (href: string) => pathname === href;

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--bg-primary)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          borderBottom: '1px solid var(--divider)',
          flexShrink: 0,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ color: 'var(--brand-primary)', fontWeight: 700, fontSize: '18px' }}>ZKAP</span>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Design System</span>
        </Link>
        <button
          onClick={onClose}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-md)',
          }}
          aria-label="메뉴 닫기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
        }}
      >
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
                    padding: '12px 16px',
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>{item.title}</span>
                  <svg
                    style={{
                      width: '20px',
                      height: '20px',
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
                    marginLeft: '20px',
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
                          padding: '12px 16px',
                          fontSize: '15px',
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
                  padding: '12px 16px',
                  fontSize: '15px',
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
    </div>
  );
}
