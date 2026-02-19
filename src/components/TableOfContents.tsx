"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { PLATFORM_TAB_CHANGE_EVENT } from "./PlatformTabs";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isTablet, setIsTablet] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  // Function to scan headings from DOM
  const scanHeadings = useCallback(() => {
    // Find only h2 elements in the main content (중제목만)
    const elements = document.querySelectorAll("main h2, main h3");
    const items: TocItem[] = [];
    const idCounts: Record<string, number> = {};

    elements.forEach((el) => {
      const baseId = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";

      // Track duplicate ids and make them unique
      if (idCounts[baseId] !== undefined) {
        idCounts[baseId]++;
      } else {
        idCounts[baseId] = 0;
      }

      const uniqueId = idCounts[baseId] > 0 ? `${baseId}-${idCounts[baseId]}` : baseId;

      if (!el.id) {
        el.id = uniqueId;
      }

      items.push({
        id: uniqueId,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);
    setActiveId("");
  }, []);

  // Scan on pathname change
  useEffect(() => {
    const timeout = setTimeout(scanHeadings, 100);
    return () => clearTimeout(timeout);
  }, [pathname, scanHeadings]);

  // Listen for platform tab changes
  useEffect(() => {
    const handleTabChange = () => {
      // Re-scan headings when tab changes
      setTimeout(scanHeadings, 100);
    };

    window.addEventListener(PLATFORM_TAB_CHANGE_EVENT, handleTabChange);
    return () => window.removeEventListener(PLATFORM_TAB_CHANGE_EVENT, handleTabChange);
  }, [scanHeadings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 각 heading의 위치를 계산하여 현재 활성화할 항목 찾기
      let currentId = headings[0]?.id || "";

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // heading이 화면 상단 120px 아래로 지나갔으면 활성화
          if (rect.top <= 120) {
            currentId = headings[i].id;
          }
        }
      }

      // 페이지 맨 바닥에 도달했을 때만 마지막 항목 활성화
      const isAtBottom = scrollY + windowHeight >= documentHeight - 10;
      if (isAtBottom && headings.length > 0) {
        currentId = headings[headings.length - 1].id;
      }

      setActiveId(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0 || isTablet) {
    return null;
  }

  return (
    <nav>

      <div
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "12px",
        }}
      >
        On this page
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setActiveId(heading.id);
                }
              }}
              style={{
                display: "block",
                padding: "6px 0",
                paddingLeft: heading.level === 3 ? "12px" : "0",
                fontSize: heading.level === 3 ? "12px" : "13px",
                color: activeId === heading.id ? "var(--brand-primary)" : "var(--text-tertiary)",
                textDecoration: "none",
                borderLeft: heading.level === 3 ? "none" : undefined,
                fontWeight: activeId === heading.id ? 500 : 400,
                transition: "color 0.15s ease",
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
