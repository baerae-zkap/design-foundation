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
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '56px',
          minHeight: '100vh',
          display: 'flex',
          backgroundColor: 'var(--bg-primary)',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        {/* 사이드바 - sticky로 스크롤 따라감 */}
        <Sidebar />
        {/* 메인 컨텐츠 */}
        <main
          style={{
            flex: 1,
            minHeight: 'calc(100vh - 56px)',
            display: 'flex',
          }}
        >
          <div
            style={{
              flex: 1,
              width: '100%',
              maxWidth: isTablet ? '100%' : '768px',
              padding: getContentPadding(),
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {children}
          </div>
          {/* 우측 목차 - sticky로 스크롤 따라감 */}
          {!isTablet && (
            <div
              style={{
                width: '200px',
                flexShrink: 0,
                padding: '40px 24px 40px 0',
                position: 'sticky',
                top: '56px',
                height: 'fit-content',
                maxHeight: 'calc(100vh - 56px)',
                overflowY: 'auto',
                alignSelf: 'flex-start',
              }}
            >
              <TableOfContents />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
