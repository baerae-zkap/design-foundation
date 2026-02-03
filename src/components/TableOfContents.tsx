"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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

  useEffect(() => {
    // Small delay to ensure DOM is updated after navigation
    const timeout = setTimeout(() => {
      // Find all h2 and h3 elements in the main content
      const elements = document.querySelectorAll("main h2, main h3");
      const items: TocItem[] = [];

      elements.forEach((el) => {
        const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
        if (!el.id && id) {
          el.id = id;
        }
        items.push({
          id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      });

      setHeadings(items);
      setActiveId("");
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 페이지 하단에 도달하면 마지막 항목 활성화
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      // 현재 보이는 영역에서 가장 위에 있는 heading 찾기
      let currentId = "";
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentId = heading.id;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      } else if (headings.length > 0) {
        // 스크롤이 맨 위일 때 첫 번째 항목 활성화
        setActiveId(headings[0].id);
      }
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
                fontSize: "13px",
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
