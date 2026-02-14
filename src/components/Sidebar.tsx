"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const foundationsNav = [
  { title: "Overview", href: "/foundations" },
  { title: "Getting Started", href: "/getting-started" },
  { title: "Base material", isLabel: true },
  { title: "Color Palette", href: "/colors/palette" },
  { title: "Color Semantic", href: "/colors/semantic" },
  { title: "Color Effects", href: "/colors/effects" },
  { title: "Typography", href: "/typography" },
  { title: "Spacing", href: "/spacing" },
  { title: "Radius", href: "/radius" },
  { title: "Shadow", href: "/shadow" },
  { title: "Interaction", href: "/interaction" },
];

const componentsNav = [
  { title: "Overview", href: "/components" },
  { title: "Getting Started", href: "/getting-started" },
  { title: "Actions", isLabel: true },
  { title: "Action Area", href: "/components/actions/action-area" },
  { title: "Button", href: "/components/actions/button" },
  { title: "Chip", href: "/components/actions/chip" },
  { title: "Icon Button", href: "/components/actions/icon-button" },
  { title: "Text Button", href: "/components/actions/text-button" },
  { title: "Contents", isLabel: true },
  { title: "Accordion", href: "/components/contents/accordion" },
  { title: "Card", href: "/components/contents/card" },
  { title: "Content Badge", href: "/components/contents/content-badge" },
  { title: "List Card", href: "/components/contents/list-card" },
  { title: "List Cell", href: "/components/contents/list-cell" },
  { title: "Section Header", href: "/components/contents/section-header" },
  { title: "Table", href: "/components/contents/table" },
  { title: "Thumbnail", href: "/components/contents/thumbnail" },
  { title: "Selection & Input", isLabel: true },
  { title: "Checkbox", href: "/components/selection-input/checkbox" },
  { title: "CheckMark", href: "/components/selection-input/check-mark" },
  { title: "DatePicker", href: "/components/selection-input/date-picker" },
  { title: "FilterButton", href: "/components/selection-input/filter-button" },
  { title: "FramedStyle", href: "/components/selection-input/framed-style" },
  { title: "Radio", href: "/components/selection-input/radio" },
  { title: "SearchField", href: "/components/selection-input/search-field" },
  { title: "SegmentedControl", href: "/components/selection-input/segmented-control" },
  { title: "Select", href: "/components/selection-input/select" },
  { title: "Slider", href: "/components/selection-input/slider" },
  { title: "Switch", href: "/components/selection-input/switch" },
  { title: "TextArea", href: "/components/selection-input/text-area" },
  { title: "TextField", href: "/components/selection-input/text-field" },
  { title: "TimePicker", href: "/components/selection-input/time-picker" },
];

interface SidebarItemProps {
  title: string;
  href: string;
  isActive: boolean;
}

const sidebarStyles = `
  .sidebar-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .sidebar-scroll::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
  }
  .sidebar-scroll:hover::-webkit-scrollbar-thumb {
    background: var(--divider);
  }
  .sidebar-scroll:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--divider) transparent;
  }
`;

function SidebarItem({ title, href, isActive }: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showHighlight = isActive || isHovered;

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        fontSize: '14px',
        textDecoration: 'none',
        backgroundColor: showHighlight ? 'var(--bg-secondary)' : 'transparent',
        color: isActive ? 'var(--text-primary)' : (isHovered ? 'var(--text-primary)' : 'var(--text-secondary)'),
        fontWeight: isActive ? 600 : 400,
        borderRadius: '8px',
        margin: '2px 8px',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span>{title}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          opacity: showHighlight ? (isActive ? 1 : 0.6) : 0,
          transform: showHighlight ? 'translateX(0)' : 'translateX(-4px)',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function Sidebar() {
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

  const isFoundations = pathname === "/" || pathname.startsWith("/foundations") || pathname.startsWith("/getting-started") || pathname.startsWith("/colors") || pathname.startsWith("/typography") || pathname.startsWith("/spacing") || pathname.startsWith("/radius") || pathname.startsWith("/shadow") || pathname.startsWith("/interaction");

  const navigation = isFoundations ? foundationsNav : componentsNav;

  const isActive = (href: string) => {
    if (href.startsWith("/colors/")) {
      return pathname === href;
    }
    return pathname === href;
  };

  if (isMobile) return null;

  return (
    <>
      <style>{sidebarStyles}</style>
      <aside
        className="sidebar-scroll"
        style={{
          width: '220px',
          flexShrink: 0,
          position: 'sticky',
          top: '56px',
          height: 'calc(100vh - 56px)',
          overflowY: 'auto',
          padding: '24px 0',
        }}
      >
        <nav>
        {navigation.map((item, index) => {
          if (item.isLabel) {
            return (
              <div
                key={`label-${index}`}
                style={{
                  padding: '24px 24px 8px',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'var(--content-base-placeholder)',
                }}
              >
                {item.title}
              </div>
            );
          }

          return (
            <SidebarItem
              key={item.href}
              title={item.title}
              href={item.href!}
              isActive={isActive(item.href!)}
            />
          );
        })}
        </nav>
      </aside>
    </>
  );
}
