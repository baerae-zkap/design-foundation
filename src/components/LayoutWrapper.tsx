"use client";

import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "./TableOfContents";
import { MobileMenu } from "./MobileMenu";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const getContentPadding = () => {
    if (isMobile) return '24px 20px';
    if (isTablet) return '32px 32px';
    return '40px 48px';
  };

  return (
    <>
      <Header onMenuClick={() => setMobileMenuOpen(true)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* 전체 레이아웃 가운데 정렬 */}
      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '56px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: 'var(--bg-primary)',
          boxSizing: 'border-box',
        }}
      >
        {/* 사이드바 - sticky로 스크롤 따라감 */}
        <Sidebar />

        {/* 사이드바와 콘텐츠 사이 간격 */}
        {!isTablet && <div style={{ width: '40px', flexShrink: 0 }} />}

        {/* 메인 컨텐츠 */}
        <main
          style={{
            flex: 1,
            minHeight: 'calc(100vh - 56px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: isTablet ? '100%' : '720px',
              padding: getContentPadding(),
              boxSizing: 'border-box',
            }}
          >
            {children}
          </div>
        </main>

        {/* 콘텐츠와 목차 사이 간격 */}
        {!isTablet && <div style={{ width: '40px', flexShrink: 0 }} />}

        {/* 우측 목차 - sticky로 스크롤 따라감 */}
        {!isTablet && (
          <div
            style={{
              width: '200px',
              flexShrink: 0,
              padding: '40px 0',
              position: 'sticky',
              top: '96px',
              height: 'fit-content',
              alignSelf: 'flex-start',
            }}
          >
            <TableOfContents />
          </div>
        )}
      </div>
    </>
  );
}
