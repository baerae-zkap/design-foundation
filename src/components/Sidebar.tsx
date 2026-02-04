"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const foundationsNav = [
  { title: "Overview", href: "/foundations" },
  { title: "Base material", isLabel: true },
  { title: "Colors", href: "/colors/palette" },
  { title: "Typography", href: "/typography" },
  { title: "Spacing", href: "/spacing" },
  { title: "Radius", href: "/radius" },
  { title: "Shadow", href: "/shadow" },
  { title: "Interaction", href: "/interaction" },
];

const componentsNav = [
  { title: "Overview", href: "/components" },
  { title: "Actions", isLabel: true },
  { title: "Button", href: "/components/actions/button" },
  { title: "Icon Button", href: "/components/actions/icon-button" },
  { title: "Text Button", href: "/components/actions/text-button" },
  { title: "Chip", href: "/components/actions/chip" },
  { title: "Selection & Input", isLabel: true },
  { title: "Checkbox", href: "/components/inputs/checkbox" },
  { title: "Radio", href: "/components/inputs/radio" },
  { title: "Switch", href: "/components/inputs/switch" },
  { title: "Text Field", href: "/components/inputs/text-field" },
  { title: "Text Area", href: "/components/inputs/text-area" },
  { title: "Select", href: "/components/inputs/select" },
  { title: "Feedback", isLabel: true },
  { title: "Toast", href: "/components/feedback/toast" },
  { title: "Alert", href: "/components/feedback/alert" },
  { title: "Snackbar", href: "/components/feedback/snackbar" },
  { title: "Presentation", isLabel: true },
  { title: "Modal", href: "/components/presentation/modal" },
  { title: "Bottom Sheet", href: "/components/presentation/bottom-sheet" },
  { title: "Tooltip", href: "/components/presentation/tooltip" },
  { title: "Popover", href: "/components/presentation/popover" },
  { title: "Contents", isLabel: true },
  { title: "Avatar", href: "/components/contents/avatar" },
  { title: "Badge", href: "/components/contents/badge" },
  { title: "Card", href: "/components/contents/card" },
  { title: "Accordion", href: "/components/contents/accordion" },
  { title: "Navigation", isLabel: true },
  { title: "Tab", href: "/components/navigation/tab" },
  { title: "Bottom Navigation", href: "/components/navigation/bottom-navigation" },
  { title: "Pagination", href: "/components/navigation/pagination" },
  { title: "Loading", isLabel: true },
  { title: "Skeleton", href: "/components/loading/skeleton" },
  { title: "Spinner", href: "/components/loading/spinner" },
];

interface SidebarItemProps {
  title: string;
  href: string;
  isActive: boolean;
}

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
        color: showHighlight ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontWeight: isActive ? 500 : 400,
        borderRadius: '8px',
        margin: '2px 8px',
        transition: 'all 150ms ease',
      }}
    >
      <span>{title}</span>
      {showHighlight && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ opacity: isActive ? 1 : 0.6 }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
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

  const isFoundations = pathname === "/" || pathname.startsWith("/foundations") || pathname.startsWith("/colors") || pathname.startsWith("/typography") || pathname.startsWith("/spacing") || pathname.startsWith("/radius") || pathname.startsWith("/shadow") || pathname.startsWith("/interaction");

  const navigation = isFoundations ? foundationsNav : componentsNav;

  const isActive = (href: string) => {
    if (href === "/colors/palette") {
      return pathname.startsWith("/colors");
    }
    return pathname === href;
  };

  if (isMobile) return null;

  return (
    <aside
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
                  padding: '20px 16px 8px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
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
  );
}
