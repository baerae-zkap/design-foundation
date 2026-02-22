'use client';

import React, { type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ─── Types ───────────────────────────────────────────────────────────

export type BottomCTAVariant = 'single' | 'double';

export interface BottomCTAProps {
  /** Layout variant @default 'single' */
  variant?: BottomCTAVariant;
  /** Primary/only button content */
  primaryAction: React.ReactNode;
  /** Secondary button (double variant only) */
  secondaryAction?: React.ReactNode;
  /** Whether to show safe area padding for notched devices @default true */
  safeAreaPadding?: boolean;
  /** Background style @default 'default' */
  background?: 'default' | 'transparent';
  /** Additional content above the buttons (e.g. terms text, checkbox) */
  topAccessory?: React.ReactNode;
  /** Custom style */
  style?: CSSProperties;
}

// ─── Component ───────────────────────────────────────────────────────

export const BottomCTA = React.forwardRef<HTMLDivElement, BottomCTAProps>(
  function BottomCTA(props, ref) {
    const {
      variant = 'single',
      primaryAction,
      secondaryAction,
      safeAreaPadding = true,
      background = 'default',
      topAccessory,
      style,
    } = props;

    const isDefault = background === 'default';

    const containerStyle: CSSProperties = {
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDefault ? cssVarColors.surface.base.default : 'transparent',
      borderTop: isDefault ? `1px solid var(--divider)` : 'none',
      paddingTop: spacing.primitive[3],
      paddingLeft: spacing.primitive[4],
      paddingRight: spacing.primitive[4],
      paddingBottom: safeAreaPadding
        ? `calc(${spacing.primitive[5]}px + env(safe-area-inset-bottom, 20px))`
        : spacing.primitive[5],
      boxSizing: 'border-box',
      ...style,
    };

    const topAccessoryStyle: CSSProperties = {
      marginBottom: spacing.primitive[3],
    };

    const buttonRowStyle: CSSProperties = {
      display: 'flex',
      gap: variant === 'double' ? spacing.primitive[2] : 0,
    };

    const primaryWrapperStyle: CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    };

    const secondaryWrapperStyle: CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    };

    return (
      <div ref={ref} style={containerStyle}>
        {topAccessory && (
          <div style={topAccessoryStyle}>
            {topAccessory}
          </div>
        )}

        <div style={buttonRowStyle}>
          {variant === 'double' && secondaryAction && (
            <div style={secondaryWrapperStyle}>
              {secondaryAction}
            </div>
          )}
          <div style={primaryWrapperStyle}>
            {primaryAction}
          </div>
        </div>
      </div>
    );
  },
);

BottomCTA.displayName = 'BottomCTA';
