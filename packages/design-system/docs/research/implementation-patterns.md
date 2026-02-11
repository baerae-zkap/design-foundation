# Implementation Patterns from Montage & Toss Analysis

## Purpose

This document provides practical TypeScript/React patterns extracted from Montage and Toss design systems. Use these as templates when implementing new components.

---

## 🎨 Pattern 1: Fill/Weak Variant System (Toss)

### Why This Pattern?
- **Reusable** across Button, Badge, Alert, Chip
- **Clear hierarchy** (Fill = primary, Weak = secondary)
- **Consistent** visual language

### TypeScript Implementation

```typescript
// types/variants.ts
export type Variant = 'fill' | 'weak' | 'outline' | 'ghost';

export type SemanticColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export type PaletteColor =
  | 'blue'
  | 'teal'
  | 'green'
  | 'red'
  | 'yellow'
  | 'gray';
```

### Component Implementation

```typescript
// Button.tsx
interface ButtonProps {
  variant: Variant;
  color?: SemanticColor;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

export const Button = ({
  variant = 'fill',
  color = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) => {
  const className = clsx(
    'button',
    `button--${variant}`,
    `button--${color}`,
    `button--${size}`
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
```

### CSS Implementation (using tokens)

```css
/* Button.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--button-border-radius);
  font-weight: 600;
  transition: all 0.2s ease;
}

/* Variant styles */
.button--fill {
  background-color: var(--button-bg);
  color: var(--button-text);
}

.button--fill:hover {
  background-color: var(--button-bg-hover);
}

.button--weak {
  background-color: transparent;
  color: var(--button-text-weak);
  border: 1px solid var(--button-border);
}

.button--weak:hover {
  background-color: var(--button-bg-weak-hover);
}

/* Size styles */
.button--sm {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-sm);
  gap: var(--button-gap-sm);
}

.button--md {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-md);
  gap: var(--button-gap-md);
}

.button--lg {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-lg);
  gap: var(--button-gap-lg);
}
```

---

## 🏗️ Pattern 2: Sub-component Composition (Toss)

### Why This Pattern?
- **Flexible layouts** without complex props
- **Type-safe** component structure
- **Better tree-shaking** (unused sub-components excluded)

### Compound Component Implementation

```typescript
// BottomSheet.tsx
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxHeight?: number;
}

interface BottomSheetComponent extends React.FC<BottomSheetProps> {
  Header: React.FC<HeaderProps>;
  HeaderDescription: React.FC<DescriptionProps>;
  CTA: React.FC<CTAProps>;
  DoubleCTA: React.FC<DoubleCTAProps>;
}

const BottomSheet: BottomSheetComponent = ({
  open,
  onClose,
  children,
  maxHeight
}) => {
  if (!open) return null;

  return (
    <Portal>
      <div className="bottom-sheet-backdrop" onClick={onClose}>
        <div
          className="bottom-sheet-container"
          style={{ maxHeight }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

// Sub-components
const Header: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bottom-sheet-header">
    {children}
  </div>
);

const HeaderDescription: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bottom-sheet-header-description">
    {children}
  </div>
);

const CTA: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bottom-sheet-cta">
    {children}
  </div>
);

interface DoubleCTAProps {
  left: ReactNode;
  right: ReactNode;
}

const DoubleCTA: React.FC<DoubleCTAProps> = ({ left, right }) => (
  <div className="bottom-sheet-double-cta">
    <div className="bottom-sheet-cta-left">{left}</div>
    <div className="bottom-sheet-cta-right">{right}</div>
  </div>
);

// Attach sub-components
BottomSheet.Header = Header;
BottomSheet.HeaderDescription = HeaderDescription;
BottomSheet.CTA = CTA;
BottomSheet.DoubleCTA = DoubleCTA;

export { BottomSheet };
```

### Usage Example

```tsx
<BottomSheet open={isOpen} onClose={handleClose}>
  <BottomSheet.Header>
    Confirm Action
  </BottomSheet.Header>
  <BottomSheet.HeaderDescription>
    This action cannot be undone.
  </BottomSheet.HeaderDescription>

  <div style={{ padding: '20px' }}>
    Content goes here
  </div>

  <BottomSheet.DoubleCTA
    left={<Button variant="weak" onClick={handleClose}>Cancel</Button>}
    right={<Button variant="fill" onClick={handleConfirm}>Confirm</Button>}
  />
</BottomSheet>
```

---

## 🎯 Pattern 3: Required Props for Consistency (Toss)

### Why This Pattern?
- **Prevents inconsistent usage** (no forgotten variants)
- **Forces intentional decisions**
- **Better TypeScript errors**

### Implementation with Required Props

```typescript
// Badge.tsx - All major props required
interface BadgeProps {
  // Required: defines visual style
  variant: 'fill' | 'weak';

  // Required: defines size
  size: 'xs' | 'sm' | 'md' | 'lg';

  // Required: defines color
  color: 'blue' | 'teal' | 'green' | 'red' | 'yellow' | 'gray';

  // Required: content
  children: ReactNode;

  // Optional: addons
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  size,
  color,
  children,
  leadingIcon,
  trailingIcon
}) => {
  return (
    <span
      className={clsx(
        'badge',
        `badge--${variant}`,
        `badge--${size}`,
        `badge--${color}`
      )}
    >
      {leadingIcon && <span className="badge-icon-leading">{leadingIcon}</span>}
      <span className="badge-label">{children}</span>
      {trailingIcon && <span className="badge-icon-trailing">{trailingIcon}</span>}
    </span>
  );
};

// Usage (must specify all props)
<Badge variant="fill" size="md" color="blue">
  New
</Badge>

// ❌ TypeScript error: missing required props
<Badge>New</Badge>
```

---

## 🎭 Pattern 4: Controlled & Uncontrolled State (Both Systems)

### Why This Pattern?
- **Flexibility**: Internal or external state management
- **Progressive enhancement**: Start simple, add control later

### Implementation with Both Patterns

```typescript
// Checkbox.tsx
interface CheckboxProps {
  // Controlled state
  checked?: boolean;
  onChange?: (checked: boolean) => void;

  // Uncontrolled state
  defaultChecked?: boolean;

  // Other props
  disabled?: boolean;
  'aria-label': string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  onChange,
  defaultChecked,
  disabled,
  'aria-label': ariaLabel
}) => {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  // Use controlled state if provided, otherwise internal
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <span className="checkbox-visual" />
    </label>
  );
};
```

### Usage Examples

```tsx
// Uncontrolled (component manages state)
<Checkbox defaultChecked={true} aria-label="Accept terms" />

// Controlled (parent manages state)
const [accepted, setAccepted] = useState(false);
<Checkbox
  checked={accepted}
  onChange={setAccepted}
  aria-label="Accept terms"
/>
```

---

## ♿ Pattern 5: Built-in Accessibility (Toss)

### Why This Pattern?
- **Automatic ARIA management**
- **Screen reader friendly** by default
- **Keyboard navigation** built-in

### Implementation with Accessibility

```typescript
// Switch.tsx
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label': string;  // Required for context
  hasTouchEffect?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
  hasTouchEffect = true
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Space or Enter toggles the switch
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={clsx(
        'switch',
        checked && 'switch--checked',
        disabled && 'switch--disabled',
        hasTouchEffect && 'switch--touch-effect'
      )}
    >
      <span className="switch-track">
        <span className="switch-thumb" />
      </span>
    </button>
  );
};
```

### Toast with aria-live

```typescript
// Toast.tsx
interface ToastProps {
  open: boolean;
  message: string;
  position: 'top' | 'bottom';
  variant?: 'normal' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
  'aria-live'?: 'polite' | 'assertive';
}

export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  position,
  variant = 'normal',
  duration = 3000,
  onClose,
  'aria-live': ariaLive = 'polite'
}) => {
  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      className={clsx('toast', `toast--${position}`, `toast--${variant}`)}
      role="status"
      aria-live={ariaLive}
      aria-atomic="true"
    >
      {message}
    </div>
  );
};
```

---

## 🎨 Pattern 6: CSS Variable Customization (Both Systems)

### Why This Pattern?
- **Runtime theming** without CSS rebuilds
- **Component-level overrides**
- **Type-safe with TypeScript**

### Implementation with CSS Variables

```typescript
// Button.tsx with CSS variable support
interface ButtonProps {
  variant: Variant;
  size?: Size;
  children: ReactNode;
  style?: React.CSSProperties & {
    '--button-color'?: string;
    '--button-background-color'?: string;
    '--button-border-radius'?: string;
  };
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'md',
  children,
  style,
  ...props
}) => {
  return (
    <button
      className={clsx('button', `button--${variant}`, `button--${size}`)}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
```

### CSS Definition

```css
/* Button.css */
.button {
  /* Default values from tokens */
  --button-color: var(--color-text-inverse);
  --button-background-color: var(--color-primary);
  --button-border-radius: var(--radius-button-md);

  /* Usage */
  color: var(--button-color);
  background-color: var(--button-background-color);
  border-radius: var(--button-border-radius);
}
```

### Usage with Overrides

```tsx
<Button
  variant="fill"
  style={{
    '--button-color': 'white',
    '--button-background-color': '#FF6B6B',
    '--button-border-radius': '20px'
  }}
>
  Custom Button
</Button>
```

---

## 🎬 Pattern 7: Animation Lifecycle Callbacks (Toss)

### Why This Pattern?
- **Control logic timing** (e.g., cleanup after exit)
- **Better UX** (actions after animations complete)

### Implementation with Callbacks

```typescript
// Modal.tsx
interface ModalProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onExited?: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onOpen,
  onExited,
  children
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (open) {
      onOpen?.();
    }
  }, [open, onOpen]);

  const handleClose = () => {
    setIsExiting(true);

    // Wait for animation to complete
    setTimeout(() => {
      setIsExiting(false);
      onClose();
      onExited?.();  // Call after animation
    }, 300);  // Match CSS animation duration
  };

  if (!open && !isExiting) return null;

  return (
    <Portal>
      <div
        className={clsx(
          'modal-backdrop',
          isExiting && 'modal-backdrop--exiting'
        )}
        onClick={handleClose}
      >
        <div
          className={clsx(
            'modal-container',
            isExiting && 'modal-container--exiting'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
```

### Usage with Cleanup

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onExited={() => {
    // Cleanup after animation completes
    console.log('Modal fully closed');
    resetFormData();
  }}
>
  Modal content
</Modal>
```

---

## 📏 Pattern 8: Responsive Size System (Montage)

### Why This Pattern?
- **Mobile-first** with desktop constraints
- **Consistent breakpoints** across components

### Implementation with Responsive Sizing

```typescript
// Toast.tsx with responsive sizing
interface ToastProps {
  message: string;
  open: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, open }) => {
  if (!open) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
};
```

### CSS with Responsive Rules

```css
/* Toast.css - Montage pattern */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  /* Mobile: 100% width with padding */
  width: calc(100% - 40px);
  max-width: 420px;

  height: 54px;
  padding: 0 20px;

  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(32px);
  border-radius: 12px;

  display: flex;
  align-items: center;
  gap: 8px;
}

/* Desktop: min-width constraint */
@media (min-width: 768px) {
  .toast {
    min-width: 356px;
  }
}
```

---

## 🔄 Pattern 9: Resize Behaviors (Montage Bottom Sheet)

### Why This Pattern?
- **Different use cases** need different behaviors
- **Single component** handles multiple patterns

### Implementation with Resize Types

```typescript
// BottomSheet.tsx with resize behaviors
type ResizeType = 'hug' | 'flexible' | 'fill' | 'fixed';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  resize?: ResizeType;
  maxHeight?: number;  // For 'fixed' type
  children: ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  resize = 'flexible',
  maxHeight,
  children
}) => {
  const [expanded, setExpanded] = useState(false);

  const containerStyle = useMemo(() => {
    switch (resize) {
      case 'hug':
        return { height: 'auto' };

      case 'flexible':
        return {
          height: expanded ? '90vh' : '50vh',
          transition: 'height 0.3s ease'
        };

      case 'fill':
        return { height: '100vh' };

      case 'fixed':
        return { height: maxHeight || 400 };

      default:
        return {};
    }
  }, [resize, expanded, maxHeight]);

  if (!open) return null;

  return (
    <Portal>
      <div className="bottom-sheet-backdrop" onClick={onClose}>
        <div
          className={clsx(
            'bottom-sheet-container',
            `bottom-sheet--${resize}`
          )}
          style={containerStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {resize === 'flexible' && (
            <button
              className="bottom-sheet-handle"
              onClick={() => setExpanded(!expanded)}
            />
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
};
```

### Usage Examples

```tsx
// Hug: Content-fit height
<BottomSheet resize="hug">
  <p>Short content</p>
</BottomSheet>

// Flexible: Expandable
<BottomSheet resize="flexible">
  <List items={items} />
</BottomSheet>

// Fill: Full screen
<BottomSheet resize="fill">
  <TermsAndConditions />
</BottomSheet>

// Fixed: Specific height
<BottomSheet resize="fixed" maxHeight={500}>
  <TabView />
</BottomSheet>
```

---

## 🎯 Pattern 10: Semantic Status Variants (Montage)

### Why This Pattern?
- **Clear meaning** for feedback components
- **Consistent colors** across status types

### Implementation with Status Variants

```typescript
// Alert.tsx with semantic variants
type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  children,
  icon,
  action,
  onClose
}) => {
  // Auto-select icon based on variant if not provided
  const defaultIcon = {
    info: <InfoIcon />,
    success: <CheckCircleIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />
  }[variant];

  return (
    <div className={clsx('alert', `alert--${variant}`)}>
      <div className="alert-icon">
        {icon ?? defaultIcon}
      </div>
      <div className="alert-content">
        {children}
      </div>
      {action && (
        <div className="alert-action">
          {action}
        </div>
      )}
      {onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
```

### CSS with Status Colors

```css
/* Alert.css */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius-card-sm);
  border-left: 4px solid;
}

.alert--info {
  background-color: var(--color-info-light);
  border-color: var(--color-info);
  color: var(--color-info-dark);
}

.alert--success {
  background-color: var(--color-success-light);
  border-color: var(--color-success);
  color: var(--color-success-dark);
}

.alert--warning {
  background-color: var(--color-warning-light);
  border-color: var(--color-warning);
  color: var(--color-warning-dark);
}

.alert--error {
  background-color: var(--color-error-light);
  border-color: var(--color-error);
  color: var(--color-error-dark);
}
```

---

## 📋 Complete Component Template

### Full-featured component combining all patterns:

```typescript
// ComponentTemplate.tsx
import { useState, useEffect, useMemo, forwardRef } from 'react';
import clsx from 'clsx';

// 1. Type definitions
type Variant = 'fill' | 'weak' | 'outline';
type Size = 'sm' | 'md' | 'lg';
type Color = 'primary' | 'success' | 'warning' | 'danger';

interface ComponentProps {
  // Visual (required for consistency)
  variant: Variant;
  size?: Size;
  color?: Color;

  // Content
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;

  // State (controlled/uncontrolled)
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;

  // Interaction
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;

  // Accessibility (required when needed)
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Customization
  className?: string;
  style?: React.CSSProperties & {
    '--component-color'?: string;
    '--component-bg'?: string;
  };

  // Callbacks
  onOpen?: () => void;
  onClose?: () => void;
  onExited?: () => void;
}

// 2. Sub-components interface
interface ComponentType extends React.ForwardRefExoticComponent<ComponentProps> {
  Header: React.FC<{ children: ReactNode }>;
  Footer: React.FC<{ children: ReactNode }>;
}

// 3. Main component
const ComponentImpl = forwardRef<HTMLDivElement, ComponentProps>(({
  variant,
  size = 'md',
  color = 'primary',
  children,
  leadingIcon,
  trailingIcon,
  checked: controlledChecked,
  defaultChecked,
  onChange,
  disabled = false,
  loading = false,
  onClick,
  'aria-label': ariaLabel,
  className,
  style,
  ...props
}, ref) => {
  // Controlled/uncontrolled state
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // Event handlers
  const handleChange = () => {
    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
    onClick?.();
  };

  // Computed className
  const componentClassName = clsx(
    'component',
    `component--${variant}`,
    `component--${size}`,
    `component--${color}`,
    {
      'component--disabled': disabled,
      'component--loading': loading,
      'component--checked': checked
    },
    className
  );

  return (
    <div
      ref={ref}
      className={componentClassName}
      style={style}
      onClick={handleChange}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-checked={checked}
      role="checkbox"
      {...props}
    >
      {leadingIcon && <span className="component-icon-leading">{leadingIcon}</span>}
      <span className="component-content">{children}</span>
      {trailingIcon && <span className="component-icon-trailing">{trailingIcon}</span>}
      {loading && <span className="component-loader" />}
    </div>
  );
});

ComponentImpl.displayName = 'Component';

// 4. Sub-components
const Header: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="component-header">{children}</div>
);

const Footer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="component-footer">{children}</div>
);

// 5. Attach sub-components
const Component = ComponentImpl as ComponentType;
Component.Header = Header;
Component.Footer = Footer;

export { Component };
export type { ComponentProps };
```

---

## 🚀 Next Steps

1. **Choose patterns** that fit your use cases
2. **Adapt templates** to your design tokens
3. **Test accessibility** with screen readers
4. **Document variants** in Storybook
5. **Iterate based on usage** patterns

---

**Analysis Date:** 2026-02-06
**Based on:** Montage Design System + Toss Design System (TDS Mobile)
