/**
 * Radio Component (Web)
 *
 * @description 사용자가 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼입니다.
 * @see docs/components/Radio.md - AI용 상세 가이드
 *
 * @example
 * <Radio
 *   selected={selected === 'option1'}
 *   onChange={(e) => setSelected('option1')}
 *   label="옵션 1"
 * />
 */

import React, { forwardRef, type InputHTMLAttributes, type ChangeEvent } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { transitions } from '../../utils/styles';

export type RadioSize = 'small' | 'medium';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Selected state */
  selected: boolean;
  /** Change handler (native event) */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Change handler (boolean convenience) */
  onSelectedChange?: (selected: boolean) => void;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: RadioSize;
  /** Tight spacing between control and label */
  tight?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const sizeConfig: Record<
  RadioSize,
  { outer: number; inner: number; fontSize: number; gap: number; tightGap: number }
> = {
  small: {
    outer: 18,
    inner: 8,
    fontSize: 13,
    gap: spacing.primitive[2], // 8px normal
    tightGap: spacing.primitive[1], // 4px tight
  },
  medium: {
    outer: 22,
    inner: 10,
    fontSize: typography.fontSize.sm, // 14px
    gap: spacing.primitive[3], // 12px normal
    tightGap: spacing.primitive[2], // 8px tight
  },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      selected,
      onChange,
      onSelectedChange,
      label,
      size = 'medium',
      tight = false,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onSelectedChange?.(e.target.checked);
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
      width: sizeStyle.outer,
      height: sizeStyle.outer,
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

    const outerCircleStyle: React.CSSProperties = {
      width: sizeStyle.outer,
      height: sizeStyle.outer,
      borderRadius: radius.primitive.full, // 9999
      border: `2px solid ${
        disabled
          ? selected
            ? cssVarColors.content.disabled.default
            : cssVarColors.border.disabled.default
          : selected
          ? cssVarColors.content.brand.default
          : cssVarColors.border.solid.alternative
      }`,
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: transitions.border,
      pointerEvents: 'none',
    };

    const innerCircleStyle: React.CSSProperties = {
      width: sizeStyle.inner,
      height: sizeStyle.inner,
      borderRadius: radius.primitive.full, // 9999
      backgroundColor: disabled ? cssVarColors.content.disabled.default : cssVarColors.content.brand.default,
      transform: selected ? 'scale(1)' : 'scale(0)',
      transition: 'transform 150ms ease',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.regular,
      fontFamily: typography.fontFamily.base,
      color: disabled ? cssVarColors.content.disabled.default : cssVarColors.content.base.default,
      lineHeight: sizeStyle.fontSize * 1.5,
      userSelect: 'none',
    };

    return (
      <label style={containerStyle}>
        <div style={controlWrapperStyle}>
          <input
            ref={ref}
            type="radio"
            checked={selected}
            onChange={handleChange}
            disabled={disabled}
            style={hiddenInputStyle}
            aria-label={label}
            data-testid={props['data-testid']}
            {...props}
          />
          <div style={outerCircleStyle}>
            <div style={innerCircleStyle} />
          </div>
        </div>
        {label && <span style={labelStyle}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
