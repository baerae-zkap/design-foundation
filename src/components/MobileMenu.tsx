"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const mainNavigation = [
  { title: "Foundations", href: "/foundations" },
  { title: "Components", href: "/components" },
];

const foundationsNav = [
  { title: "Overview", href: "/foundations" },
  { title: "Colors", href: "/colors/palette" },
  { title: "Typography", href: "/typography" },
  { title: "Spacing", href: "/spacing" },
  { title: "Radius", href: "/radius" },
  { title: "Shadow", href: "/shadow" },
  { title: "Interaction", href: "/interaction" },
];

const componentsNav = [
  { title: "Overview", href: "/components" },
  { title: "Action Area", href: "/components/actions/action-item" },
  { title: "Button", href: "/components/actions/button" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"foundations" | "components">("foundations");

  // Close menu when route changes (but not on initial render)
  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Set active tab based on pathname
  useEffect(() => {
    if (pathname.startsWith("/components")) {
      setActiveTab("components");
    } else {
      setActiveTab("foundations");
    }
  }, [pathname]);

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

  const isActive = (href: string) => {
    if (href === "/colors/palette") {
      return pathname.startsWith("/colors");
    }
    return pathname === href;
  };

  const navigation = activeTab === "foundations" ? foundationsNav : componentsNav;

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

      {/* Tab Navigation */}
      <div style={{ display: 'flex', padding: '12px 16px', gap: 8, borderBottom: '1px solid var(--divider)' }}>
        {mainNavigation.map((item) => (
          <button
            key={item.href}
            onClick={() => setActiveTab(item.title.toLowerCase() as "foundations" | "components")}
            style={{
              flex: 1,
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: activeTab === item.title.toLowerCase() ? 600 : 400,
              color: activeTab === item.title.toLowerCase() ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: activeTab === item.title.toLowerCase() ? 'var(--bg-secondary)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {item.title}
          </button>
        ))}
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
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'block',
              padding: '12px 16px',
              fontSize: '15px',
              textDecoration: 'none',
              backgroundColor: isActive(item.href) ? 'var(--blue-95)' : 'transparent',
              color: isActive(item.href) ? 'var(--brand-primary)' : 'var(--text-secondary)',
              fontWeight: isActive(item.href) ? 500 : 400,
              borderRadius: 'var(--radius-md)',
              marginBottom: 4,
            }}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
