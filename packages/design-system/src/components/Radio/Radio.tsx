'use client';

import React, { createContext, useContext, useState, useCallback, useId, type ReactNode, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { transitions } from '../../tokens/motion';

// ─── Types ───────────────────────────────────────────────────────────

export type RadioSize = 'small' | 'medium';

export interface RadioProps {
  /** 라디오 값 */
  value: string;
  /** 레이블 */
  label?: ReactNode;
  /** 레이블 아래 설명 */
  description?: ReactNode;
  /** 크기 @default 'medium' */
  size?: RadioSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 유효성 오류 */
  invalid?: boolean;
  /** aria-label (label 없을 때 필수) */
  'aria-label'?: string;
  id?: string;
}

export interface RadioGroupProps {
  /** 현재 선택된 값 (제어 모드) */
  value?: string;
  /** 초기 선택값 (비제어 모드) */
  defaultValue?: string;
  /** 값 변경 콜백 */
  onChange?: (value: string) => void;
  /** Radio 컴포넌트들 */
  children: ReactNode;
  /** 그룹 방향 @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** 크기 @default 'medium' */
  size?: RadioSize;
  /** 전체 비활성화 */
  disabled?: boolean;
  /** 전체 유효성 오류 */
  invalid?: boolean;
  /** aria-label */
  'aria-label'?: string;
  /** aria-labelledby */
  'aria-labelledby'?: string;
}

// ─── Context ─────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  groupValue?: string;
  onChange?: (value: string) => void;
  groupDisabled?: boolean;
  groupInvalid?: boolean;
  size?: RadioSize;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

// ─── Size config ─────────────────────────────────────────────────────

const SIZE_CONFIG: Record<RadioSize, {
  controlSize: number;
  dotSize: number;
}> = {
  small: {
    controlSize: 20,
    dotSize: 8,
  },
  medium: {
    controlSize: 24,
    dotSize: 10,
  },
};

// ─── RadioGroup ──────────────────────────────────────────────────────

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  children,
  orientation = 'vertical',
  size,
  disabled,
  invalid,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const groupName = useId();

  const handleChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange],
  );

  return (
    <RadioGroupContext.Provider
      value={{
        groupValue: currentValue,
        onChange: handleChange,
        groupDisabled: disabled,
        groupInvalid: invalid,
        size,
        name: groupName,
      }}
    >
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: spacing.primitive[4],
        }}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';

// ─── Radio ───────────────────────────────────────────────────────────

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  function Radio(props, ref) {
    const {
      value,
      label,
      description,
      size: sizeProp,
      disabled: disabledProp = false,
      invalid: invalidProp = false,
      'aria-label': ariaLabel,
      id: idProp,
    } = props;

    const {
      groupValue,
      onChange: groupOnChange,
      groupDisabled,
      groupInvalid,
      size: groupSize,
      name: groupName,
    } = useContext(RadioGroupContext);

    const autoId = useId();
    const inputId = idProp ?? autoId;

    const size = sizeProp ?? groupSize ?? 'medium';
    const isChecked = groupValue === value;
    const isDisabled = disabledProp || groupDisabled;
    const isInvalid = invalidProp || groupInvalid;

    // ── Hover / Press state ──────────────────────────────────────────
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleChange = useCallback(() => {
      if (isDisabled) return;
      groupOnChange?.(value);
    }, [isDisabled, groupOnChange, value]);

    // ── Visual config ────────────────────────────────────────────────
    const { controlSize, dotSize } = SIZE_CONFIG[size];

    const brandColor = cssVarColors.surface.brand.default;
    const errorColor = cssVarColors.border.error.default;

    const outerBorderColor = isChecked
      ? brandColor
      : isInvalid
        ? errorColor
        : isPressed
          ? cssVarColors.border.base.defaultPressed
          : isHovered
            ? cssVarColors.border.secondary.default
            : cssVarColors.border.base.default;

    const controlStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: controlSize,
      height: controlSize,
      borderRadius: radius.primitive.full,
      border: `${borderWidth.medium}px solid ${outerBorderColor}`,
      backgroundColor: cssVarColors.surface.base.default,
      transition: transitions.all,
      flexShrink: 0,
      boxSizing: 'border-box',
    };

    const dotStyle: CSSProperties = {
      width: dotSize,
      height: dotSize,
      borderRadius: radius.primitive.full,
      backgroundColor: brandColor,
      transition: transitions.all,
    };

    const labelStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: spacing.primitive[2],
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? opacity.disabled : 1,
      WebkitTapHighlightColor: 'transparent',
      userSelect: 'none',
    };

    const hiddenInputStyle: CSSProperties = {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      whiteSpace: 'nowrap',
      border: 0,
    };

    return (
      <label
        ref={ref}
        style={labelStyle}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => !isDisabled && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {/* Hidden native input for a11y */}
        <input
          type="radio"
          id={inputId}
          name={groupName}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          aria-label={!label ? ariaLabel : undefined}
          aria-invalid={isInvalid || undefined}
          style={hiddenInputStyle}
        />

        {/* Visual control */}
        <span aria-hidden="true" style={controlStyle}>
          {isChecked && <span style={dotStyle} />}
        </span>

        {/* Label + Description */}
        {(label || description) && (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.primitive[1],
              paddingTop: size === 'medium' ? 2 : 0,
            }}
          >
            {label && (
              <span
                style={{
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.regular,
                  color: cssVarColors.content.base.default,
                  lineHeight: 1.4,
                }}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.regular,
                  color: cssVarColors.content.base.secondary,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
