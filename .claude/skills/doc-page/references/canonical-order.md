# Canonical Section Order Reference

## Design Tab

### 1. Overview
```tsx
<Section title="Overview">
  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    <InlineCode>ComponentName</InlineCode> is a brief description of purpose.
  </p>
</Section>
```

### 2. Anatomy
```tsx
<Section title="Anatomy">
  <div style={{
    backgroundColor: "var(--surface-base-alternative)",
    borderRadius: 12,
    padding: 32,
    display: "flex",
    justifyContent: "center",
  }}>
    {/* Annotated component diagram */}
  </div>
  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 16 }}>
    Description of anatomy parts.
  </p>
</Section>
```

### 3. Variants
```tsx
<Section title="Variants">
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  }}>
    {/* VariantCard or preview for each variant */}
  </div>
</Section>
```

### 4. [Component-Specific Sections]
Add sections specific to the component (e.g., "Sizes", "Colors", "Layout").
Each uses `<Section title="...">`.

### 5. States
```tsx
<Section title="States">
  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    Description of available states.
  </p>
  {/* State previews */}

  <Subsection title="Interaction States">
    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
      Hover, pressed, focused, disabled behavior.
    </p>
  </Subsection>
</Section>
```

### 6. Usage Guidelines
```tsx
<Section title="Usage Guidelines">
  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    General guidance for using this component.
  </p>

  <Subsection title="Best Practices">
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
    }}>
      <DoCard>Use primary for the main action.</DoCard>
      <DontCard>Don't use multiple primary buttons in one view.</DontCard>
    </div>
  </Subsection>
</Section>
```

### 7. Design Tokens
```tsx
<Section title="Design Tokens">
  <PropsTable
    headers={["Token", "Value", "Description"]}
    rows={[
      ["Background", "surface.brand.default", "Primary filled background"],
      ["Text", "content.base.onColor", "Text on filled background"],
    ]}
  />
</Section>
```

### 8. Accessibility
```tsx
<Section title="Accessibility">
  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    Accessibility considerations for this component.
  </p>
  <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    <li>Keyboard: Enter/Space to activate</li>
    <li>Screen reader: announces label and state</li>
    <li>Focus: visible outline on focus-visible</li>
  </ul>
</Section>
```

### 9. Related Components
```tsx
<Section title="Related Components">
  <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    <li><InlineCode>RelatedComponent</InlineCode> - brief reason for relation</li>
  </ul>
</Section>
```

---

## Web Tab

### 1. Source Code
```tsx
<Section title="Source Code">
  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
    <a href="https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/ComponentName">
      View on GitHub
    </a>
  </p>
</Section>
```

### 2. Import
```tsx
<Section title="Import">
  <CopyButton code={`import { ComponentName } from '@baerae-zkap/design-system';`} />
</Section>
```

### 3. Basic Usage
```tsx
<Section title="Basic Usage">
  <div style={{
    backgroundColor: "var(--surface-base-alternative)",
    borderRadius: 12,
    padding: 32,
  }}>
    <ComponentName onClick={() => {}}>Example</ComponentName>
  </div>
</Section>
```

### 4. [Component-Specific Examples]
Live examples with real component imports.

### 5. API Reference
```tsx
<Section title="API Reference">
  <PropsTable
    headers={["Prop", "Type", "Default", "Description"]}
    rows={[
      ["variant", "'filled' | 'weak'", "'filled'", "Visual style"],
      ["color", "'primary' | 'neutral' | 'error'", "'primary'", "Color theme"],
      ["size", "'sm' | 'md' | 'lg'", "'md'", "Component size"],
      ["disabled", "boolean", "false", "Disabled state"],
      ["onClick", "() => void", "-", "Click handler"],
    ]}
  />
</Section>
```
