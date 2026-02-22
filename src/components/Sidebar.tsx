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
  { title: "Actions", isLabel: true },
  { title: "Action Area", href: "/components/actions/action-area" },
  { title: "Bottom CTA", href: "/components/actions/bottom-cta" },
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
  { title: "Avatar", href: "/components/contents/avatar" },
  { title: "Badge", href: "/components/contents/badge" },
  { title: "Selection and Input", isLabel: true },
  { title: "Text Field", href: "/components/inputs/text-field" },
  { title: "Text Area", href: "/components/inputs/text-area" },
  { title: "Search Field", href: "/components/inputs/search-field" },
  { title: "Check Mark", href: "/components/inputs/check-mark" },
  { title: "Checkbox", href: "/components/inputs/checkbox" },
  { title: "Radio", href: "/components/inputs/radio" },
  { title: "Switch", href: "/components/inputs/switch" },
  { title: "Slider", href: "/components/inputs/slider" },
  { title: "Segmented Control", href: "/components/inputs/segmented-control" },
  { title: "Feedback", isLabel: true },
  { title: "Dialog", href: "/components/feedback/alert-dialog" },
  { title: "Push Badge", href: "/components/feedback/push-badge" },
  { title: "Section Message", href: "/components/feedback/section-message" },
  { title: "Snackbar", href: "/components/feedback/snackbar" },
  { title: "Toast", href: "/components/feedback/toast" },
  { title: "State View", href: "/components/feedback/state-view" },
  { title: "Loading", isLabel: true },
  { title: "Loading", href: "/components/feedback/loading" },
  { title: "Skeleton", href: "/components/feedback/skeleton" },
  { title: "Navigations", isLabel: true },
  { title: "Bottom Navigation", href: "/components/navigations/bottom-navigation" },
  { title: "Category Navigation", href: "/components/navigations/category" },
  { title: "Page Counter", href: "/components/navigations/page-counter" },
  { title: "Progress Indicator", href: "/components/navigations/progress-indicator" },
  { title: "Progress Tracker", href: "/components/navigations/progress-tracker" },
  { title: "Tab", href: "/components/navigations/tab" },
  { title: "Top Navigation", href: "/components/navigations/top-navigation" },
  { title: "Presentation", isLabel: true },
  { title: "Autocomplete", href: "/components/presentation/autocomplete" },
  { title: "Bottom Sheet", href: "/components/presentation/bottom-sheet" },
  { title: "Popover", href: "/components/presentation/popover" },
  { title: "Popup", href: "/components/presentation/popup" },
  { title: "Tooltip", href: "/components/presentation/tooltip" },
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
        backgroundColor: isActive ? 'var(--surface-brand-secondary)' : (isHovered ? 'var(--fill-alternative)' : 'transparent'),
        color: isActive ? 'var(--content-brand-default)' : (isHovered ? 'var(--text-primary)' : 'var(--text-secondary)'),
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
