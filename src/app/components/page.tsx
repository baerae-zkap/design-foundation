"use client";

import Link from "next/link";
/* eslint-disable @next/next/no-img-element */

const componentCategories = [
  {
    id: "actions",
    title: "Actions",
    components: [
      {
        name: "Action area",
        href: "/components/actions/action-area",
        thumbnail: "/design-foundation/thumbnails/action-area.png",
      },
      {
        name: "Button",
        href: "/components/actions/button",
        thumbnail: "/design-foundation/thumbnails/button.png",
      },
      {
        name: "Chip",
        href: "/components/actions/chip",
        thumbnail: "/design-foundation/thumbnails/chip.png",
      },
      {
        name: "Icon button",
        href: "/components/actions/icon-button",
        thumbnail: "/design-foundation/thumbnails/icon-button.png",
      },
      {
        name: "Text button",
        href: "/components/actions/text-button",
        thumbnail: "/design-foundation/thumbnails/text-button.png",
      },
    ],
  },
  {
    id: "contents",
    title: "Contents",
    components: [
      {
        name: "Accordion",
        href: "/components/contents/accordion",
        thumbnail: "/design-foundation/thumbnails/accordion.png",
      },
      {
        name: "Card",
        href: "/components/contents/card",
        thumbnail: "/design-foundation/thumbnails/card.png",
      },
      {
        name: "Content badge",
        href: "/components/contents/content-badge",
        thumbnail: "/design-foundation/thumbnails/content-badge.png",
      },
      {
        name: "List card",
        href: "/components/contents/list-card",
        thumbnail: "/design-foundation/thumbnails/list-card.png",
      },
      {
        name: "List cell",
        href: "/components/contents/list-cell",
        thumbnail: "/design-foundation/thumbnails/list-cell.png",
      },
      {
        name: "Section header",
        href: "/components/contents/section-header",
        thumbnail: "/design-foundation/thumbnails/section-header.png",
      },
      {
        name: "Table",
        href: "/components/contents/table",
        thumbnail: "/design-foundation/thumbnails/table.png",
      },
      {
        name: "Thumbnail",
        href: "/components/contents/thumbnail",
        thumbnail: "/design-foundation/thumbnails/thumbnail.png",
      },
    ],
  },
  {
    id: "selection-input",
    title: "Selection & Input",
    components: [
      {
        name: "Checkbox",
        href: "/components/selection-input/checkbox",
        thumbnail: "/design-foundation/thumbnails/checkbox.png",
      },
      {
        name: "CheckMark",
        href: "/components/selection-input/check-mark",
        thumbnail: "/design-foundation/thumbnails/check-mark.png",
      },
      {
        name: "DatePicker",
        href: "/components/selection-input/date-picker",
        thumbnail: "/design-foundation/thumbnails/date-picker.png",
      },
      {
        name: "FilterButton",
        href: "/components/selection-input/filter-button",
        thumbnail: "/design-foundation/thumbnails/filter-button.png",
      },
      {
        name: "FramedStyle",
        href: "/components/selection-input/framed-style",
        thumbnail: "/design-foundation/thumbnails/framed-style.png",
      },
      {
        name: "Radio",
        href: "/components/selection-input/radio",
        thumbnail: "/design-foundation/thumbnails/radio.png",
      },
      {
        name: "SearchField",
        href: "/components/selection-input/search-field",
        thumbnail: "/design-foundation/thumbnails/search-field.png",
      },
      {
        name: "SegmentedControl",
        href: "/components/selection-input/segmented-control",
        thumbnail: "/design-foundation/thumbnails/segmented-control.png",
      },
      {
        name: "Select",
        href: "/components/selection-input/select",
        thumbnail: "/design-foundation/thumbnails/select.png",
      },
      {
        name: "Slider",
        href: "/components/selection-input/slider",
        thumbnail: "/design-foundation/thumbnails/slider.png",
      },
      {
        name: "Switch",
        href: "/components/selection-input/switch",
        thumbnail: "/design-foundation/thumbnails/switch.png",
      },
      {
        name: "TextArea",
        href: "/components/selection-input/text-area",
        thumbnail: "/design-foundation/thumbnails/text-area.png",
      },
      {
        name: "TextField",
        href: "/components/selection-input/text-field",
        thumbnail: "/design-foundation/thumbnails/text-field.png",
      },
      {
        name: "TimePicker",
        href: "/components/selection-input/time-picker",
        thumbnail: "/design-foundation/thumbnails/time-picker.png",
      },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{
        fontSize: 32,
        fontWeight: 700,
        marginBottom: 16,
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
      }}>
        Components
      </h1>
      <p style={{
        fontSize: 15,
        color: "var(--text-secondary)",
        marginBottom: 48,
        lineHeight: 1.7,
        maxWidth: 720,
      }}>
        사용자 인터페이스를 구성하는 재사용 가능한 독립적인 UI 단위입니다. 특정 기능과 시각적 스타일을 가진 요소들로
        일관된 사용자 경험을 제공하기 위해 표준화된 규칙에 따라 설계되었습니다. 각 컴포넌트는 다양한 상황에서 반복적으로
        활용될 수 있으며 디자인과 개발 효율성을 높이는 동시에 제품 전반의 일관성을 유지합니다.
      </p>

      {componentCategories.map((category) => (
        <section key={category.id} id={category.id} style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 24,
            color: "var(--text-primary)",
          }}>
            {category.title}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {category.components.map((component) => (
              <ComponentCard
                key={component.name}
                name={component.name}
                href={component.href}
                thumbnail={component.thumbnail}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ComponentCard({
  name,
  href,
  thumbnail,
}: {
  name: string;
  href: string;
  thumbnail: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      {/* Thumbnail Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "330/185",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 14,
          backgroundColor: "#f5f5f7",
        }}
      >
        <img
          src={thumbnail}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Component Name */}
      <p style={{
        fontSize: 16,
        fontWeight: 600,
        color: "var(--text-primary)",
        margin: 0,
      }}>
        {name}
      </p>
    </Link>
  );
}
