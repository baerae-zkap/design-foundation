'use client';

import React, { useState, useCallback, useRef, useEffect, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { cssVarShadow } from '../../tokens/shadow';
import { duration, easing } from '../../tokens/motion';
import { opacity } from '../../tokens/general';

// ─── Types ───────────────────────────────────────────────────────────

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export type SegmentedControlSize = 'small' | 'medium' | 'large';

export interface SegmentedControlProps {
  /** Options to render */
  options: SegmentedControlOption[];
  /** Selected value (controlled) */
  value: string;
  /** Change callback */
  onChange: (value: string) => void;
  /** Size variant @default 'medium' */
  size?: SegmentedControlSize;
  /** Stretch to fill container @default false */
  fullWidth?: boolean;
  /** Disable all interaction @default false */
  disabled?: boolean;
  style?: CSSProperties;
}

// ─── Component ───────────────────────────────────────────────────────

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(props, ref) {
    const {
      options,
      value: selectedValue,
      onChange,
      size = 'medium',
      fullWidth = false,
      disabled = false,
      style,
    } = props;

    // Size-derived token values
    const sizeKey = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
    const segmentHeight = spacing.component.segmentedControl.height[sizeKey];
    const paddingX = spacing.component.segmentedControl.paddingX[sizeKey];
    const containerPadding = spacing.component.segmentedControl.containerPadding;
    const fontSize =
      size === 'small'
        ? typography.fontSize.compact
        : size === 'large'
          ? typography.fontSize.md
          : typography.fontSize.sm;

    // Refs for animated pill
    const containerRef = useRef<HTMLDivElement>(null);
    const [pillStyle, setPillStyle] = useState<CSSProperties>({});
    const [pillReady, setPillReady] = useState(false);

    const selectedIndex = options.findIndex((o) => o.value === selectedValue);

    // Update pill position whenever selection or options change
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const buttons = container.querySelectorAll<HTMLButtonElement>('[data-segment]');
      const btn = buttons[selectedIndex];
      if (!btn) return;
      setPillStyle({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: containerPadding + btn.offsetLeft,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
        borderRadius: radius.component.segmentedControl.segment,
        backgroundColor: cssVarColors.surface.base.default,
        boxShadow: cssVarShadow.primitive.xs,
        transition: pillReady
          ? `left ${duration.normal}ms ${easing.easeOut}, width ${duration.normal}ms ${easing.easeOut}`
          : 'none',
        pointerEvents: 'none',
        zIndex: 0,
      });
      if (!pillReady) setPillReady(true);
    }, [selectedIndex, options.length, pillReady]);

    const handleSelect = useCallback(
      (optValue: string) => {
        onChange(optValue);
      },
      [onChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = options.findIndex((o) => o.value === selectedValue);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = options[(currentIndex + 1) % options.length];
          if (next) handleSelect(next.value);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = options[(currentIndex - 1 + options.length) % options.length];
          if (prev) handleSelect(prev.value);
        }
      },
      [options, selectedValue, handleSelect],
    );

    const containerStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: cssVarColors.surface.base.alternative,
      borderRadius: radius.component.segmentedControl.container,
      padding: containerPadding,
      width: fullWidth ? '100%' : undefined,
      boxSizing: 'border-box',
      overflow: 'hidden',
      opacity: disabled ? opacity.disabled : 1,
      cursor: disabled ? 'not-allowed' : undefined,
      pointerEvents: disabled ? 'none' as const : undefined,
      ...style,
    };

    const innerStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
    };

    return (
      <div
        ref={(node) => {
          // Merge refs
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="tablist"
        onKeyDown={handleKeyDown}
        style={containerStyle}
      >
        {/* Animated selection pill */}
        <div style={pillStyle} aria-hidden="true" />

        <div style={innerStyle}>
          {options.map((opt) => {
            const isSelected = opt.value === selectedValue;

            const buttonStyle: CSSProperties = {
              flex: fullWidth ? 1 : undefined,
              height: segmentHeight,
              padding: `0 ${paddingX}px`,
              fontSize,
              fontWeight: typography.fontWeight.medium,
              color: isSelected
                ? cssVarColors.content.base.default
                : cssVarColors.content.base.secondary,
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: radius.component.segmentedControl.segment,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              position: 'relative',
              zIndex: 1,
              transition: `color ${duration.fast}ms ${easing.easeOut}`,
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 48,
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            };

            return (
              <button
                key={opt.value}
                data-segment={opt.value}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelect(opt.value)}
                style={buttonStyle}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

SegmentedControl.displayName = 'SegmentedControl';
