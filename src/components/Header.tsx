"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const mainNavigation = [
  { title: "Foundations", href: "/foundations" },
  { title: "Components", href: "/components" },
];

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (href: string) => {
    if (href === "/foundations") {
      return pathname === "/" || pathname.startsWith("/foundations") || pathname.startsWith("/colors") || pathname.startsWith("/typography") || pathname.startsWith("/spacing") || pathname.startsWith("/radius") || pathname.startsWith("/shadow") || pathname.startsWith("/interaction");
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--divider)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '0 24px',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/design-foundation/logo.svg" alt="ZKAP" width={80} height={24} style={{ height: '24px', width: 'auto' }} />
          <span style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Design System</span>
        </Link>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '8px' }}>
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: isActive(item.href) ? 600 : 400,
                  color: isActive(item.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  backgroundColor: isActive(item.href) ? 'var(--bg-secondary)' : 'transparent',
                  transition: 'all 150ms ease',
                }}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}

        {isMobile && (
          <button
            onClick={onMenuClick}
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
            aria-label="메뉴 열기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
