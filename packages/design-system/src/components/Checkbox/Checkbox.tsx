/**
 * Checkbox Component (Web)
 *
 * @description 사용자가 옵션을 선택하거나 해제할 수 있는 체크박스입니다.
 * @see docs/components/Checkbox.md - AI용 상세 가이드
 *
 * @example
 * <Checkbox
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 *   label="동의합니다"
 * />
 */

import React, { forwardRef, type InputHTMLAttributes, type ChangeEvent } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { transitions } from '../../utils/styles';

export type CheckboxSize = 'small' | 'medium';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Checked state */
  checked: boolean;
  /** Indeterminate state (dash icon) */
  indeterminate?: boolean;
  /** Change handler (native event) */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Change handler (boolean convenience) */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: CheckboxSize;
  /** Compact spacing between control and label */
  tight?: boolean;
  /** Bold label text weight */
  bold?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const sizeConfig: Record<
  CheckboxSize,
  { control: number; icon: number; fontSize: number; gap: number; tightGap: number }
> = {
  small: {
    control: 18,
    icon: 10,
    fontSize: typography.fontSize.sm, // 14px
    gap: spacing.primitive[2], // 8px
    tightGap: spacing.primitive[1], // 4px
  },
  medium: {
    control: 22,
    icon: 14,
    fontSize: typography.fontSize.md, // 16px
    gap: spacing.primitive[3], // 12px
    tightGap: spacing.primitive[2], // 8px
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      indeterminate = false,
      onChange,
      onCheckedChange,
      label,
      size = 'medium',
      tight = false,
      bold = false,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: tight ? sizeStyle.tightGap : sizeStyle.gap,
      minHeight: 44, // Minimum touch target
      opacity: disabled ? opacity.disabled : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    };

    const controlWrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: sizeStyle.control,
      height: sizeStyle.control,
      flexShrink: 0,
    };

    const hiddenInputStyle: React.CSSProperties = {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const customControlStyle: React.CSSProperties = {
      width: sizeStyle.control,
      height: sizeStyle.control,
      borderRadius: radius.primitive.xs, // 4px
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: checked || indeterminate ? 'none' : `1.5px solid ${cssVarColors.border.solid.alternative}`,
      backgroundColor: checked || indeterminate ? cssVarColors.surface.brand.default : 'transparent',
      transition: transitions.all,
      pointerEvents: 'none',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: sizeStyle.fontSize,
      fontWeight: bold ? typography.fontWeight.semibold : typography.fontWeight.regular,
      fontFamily: typography.fontFamily.base,
      color: cssVarColors.content.base.default,
      lineHeight: sizeStyle.fontSize * 1.5,
      userSelect: 'none',
    };

    const renderIcon = () => {
      const iconColor = cssVarColors.content.base.onColor; // white
      const strokeWidth = 2.5;

      if (indeterminate) {
        return (
          <svg
            width={sizeStyle.icon}
            height={sizeStyle.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14"
              stroke={iconColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </svg>
        );
      }

      if (checked) {
        return (
          <svg
            width={sizeStyle.icon}
            height={sizeStyle.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12l5 5L20 7"
              stroke={iconColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      }

      return null;
    };

    return (
      <label style={containerStyle}>
        <div style={controlWrapperStyle}>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            style={hiddenInputStyle}
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-label={label}
            data-testid={props['data-testid']}
            {...props}
          />
          <div style={customControlStyle}>{renderIcon()}</div>
        </div>
        {label && <span style={labelStyle}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
