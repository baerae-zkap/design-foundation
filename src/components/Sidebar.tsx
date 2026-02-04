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
      { title: "Interaction", href: "/interaction" },
    ],
  },
  {
    title: "컴포넌트",
    children: [
      { title: "Overview", href: "/components" },
    ],
  },
  {
    title: "Actions",
    children: [
      { title: "Button", href: "/components/actions/button" },
      { title: "Icon Button", href: "/components/actions/icon-button" },
      { title: "Text Button", href: "/components/actions/text-button" },
      { title: "Chip", href: "/components/actions/chip" },
    ],
  },
  {
    title: "Selection & Input",
    children: [
      { title: "Checkbox", href: "/components/inputs/checkbox" },
      { title: "Radio", href: "/components/inputs/radio" },
      { title: "Switch", href: "/components/inputs/switch" },
      { title: "Text Field", href: "/components/inputs/text-field" },
      { title: "Text Area", href: "/components/inputs/text-area" },
      { title: "Select", href: "/components/inputs/select" },
    ],
  },
  {
    title: "Feedback",
    children: [
      { title: "Toast", href: "/components/feedback/toast" },
      { title: "Alert", href: "/components/feedback/alert" },
      { title: "Snackbar", href: "/components/feedback/snackbar" },
    ],
  },
  {
    title: "Presentation",
    children: [
      { title: "Modal", href: "/components/presentation/modal" },
      { title: "Bottom Sheet", href: "/components/presentation/bottom-sheet" },
      { title: "Tooltip", href: "/components/presentation/tooltip" },
      { title: "Popover", href: "/components/presentation/popover" },
    ],
  },
  {
    title: "Contents",
    children: [
      { title: "Avatar", href: "/components/contents/avatar" },
      { title: "Badge", href: "/components/contents/badge" },
      { title: "Card", href: "/components/contents/card" },
      { title: "Accordion", href: "/components/contents/accordion" },
    ],
  },
  {
    title: "Navigation",
    children: [
      { title: "Tab", href: "/components/navigation/tab" },
      { title: "Bottom Navigation", href: "/components/navigation/bottom-navigation" },
      { title: "Pagination", href: "/components/navigation/pagination" },
    ],
  },
  {
    title: "Loading",
    children: [
      { title: "Skeleton", href: "/components/loading/skeleton" },
      { title: "Spinner", href: "/components/loading/spinner" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "파운데이션": true,
    "컴포넌트": true,
    "Actions": true,
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
                          backgroundColor: isActive(child.href) ? 'var(--blue-95)' : 'transparent',
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
                  backgroundColor: isActive(item.href) ? 'var(--blue-95)' : 'transparent',
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
