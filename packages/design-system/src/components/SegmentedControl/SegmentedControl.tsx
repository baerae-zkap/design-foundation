/**
 * Segmented Control Component (Web)
 *
 * @description 여러 옵션 중 하나를 선택하는 수평 버튼 그룹 컴포넌트입니다.
 * @see docs/components/SegmentedControl.md - AI용 상세 가이드
 *
 * @example
 * <SegmentedControl
 *   segments={[
 *     { label: '전체', value: 'all' },
 *     { label: '진행중', value: 'progress' },
 *     { label: '완료', value: 'done' },
 *   ]}
 *   value="all"
 *   onChange={(value) => {}}
 * />
 */

import { forwardRef, useState, useRef, useEffect, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { transitions } from '../../utils/styles';

// ─── Types ───────────────────────────────────────────────────────────

export interface SegmentItem {
  /** 세그먼트 라벨 */
  label: string;
  /** 세그먼트 고유 값 */
  value: string;
  /** 좌측 아이콘 */
  icon?: ReactNode;
  /** 개별 비활성화 여부 */
  disabled?: boolean;
}

export type SegmentedControlSize = 'small' | 'medium' | 'large';

export type SegmentedControlVariant = 'solid' | 'outlined';

export type SegmentedControlAlignment = 'fixed' | 'fluid';

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 세그먼트 배열 */
  segments: SegmentItem[];
  /** 선택된 값 (controlled) */
  value?: string;
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 선택된 인덱스 */
  selectedIndex?: number;
  /** 인덱스 변경 핸들러 */
  onIndexChange?: (index: number) => void;
  /** 전체 비활성화 */
  disabled?: boolean;
  /** 크기 */
  size?: SegmentedControlSize;
  /** 변형 */
  variant?: SegmentedControlVariant;
  /** 정렬 */
  alignment?: SegmentedControlAlignment;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
}

// ─── Size Config ──────────────────────────────────────────────────────

const scTokens = spacing.component.segmentedControl;
const rcTokens = radius.component.segmentedControl;

const sizeConfig: Record<
  SegmentedControlSize,
  { height: number; fontSize: number; lineHeight: number; paddingHorizontal: number }
> = {
  small: {
    height: scTokens.height.sm,
    fontSize: typography.semantic.label.sm.fontSize,
    lineHeight: typography.semantic.label.sm.lineHeight,
    paddingHorizontal: scTokens.paddingX.sm,
  },
  medium: {
    height: scTokens.height.md,
    fontSize: typography.semantic.label.md.fontSize,
    lineHeight: typography.semantic.label.md.lineHeight,
    paddingHorizontal: scTokens.paddingX.md,
  },
  large: {
    height: scTokens.height.lg,
    fontSize: typography.semantic.body.sm.fontSize,
    lineHeight: typography.semantic.body.sm.lineHeight,
    paddingHorizontal: scTokens.paddingX.lg,
  },
};

// ─── Main Component ──────────────────────────────────────────────────

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      segments,
      value: valueProp,
      defaultValue,
      onChange,
      selectedIndex: selectedIndexProp,
      onIndexChange,
      disabled = false,
      size = 'medium',
      variant = 'solid',
      alignment = 'fixed',
      fullWidth = false,
      style,
      ...props
    },
    ref
  ) => {
    // ── 선택 상태 관리 ──
    const isValueControlled = valueProp !== undefined;
    const isIndexControlled = selectedIndexProp !== undefined;

    const [internalValue, setInternalValue] = useState<string>(() => {
      if (valueProp !== undefined) return valueProp;
      if (defaultValue !== undefined) return defaultValue;
      if (selectedIndexProp !== undefined && segments[selectedIndexProp]) {
        return segments[selectedIndexProp].value;
      }
      return segments[0]?.value || '';
    });

    const currentValue = isValueControlled ? valueProp : internalValue;
    const selectedIndex = segments.findIndex((s) => s.value === currentValue);
    const safeSelectedIndex = selectedIndex >= 0 ? selectedIndex : 0;

    // Sync external selectedIndex prop
    useEffect(() => {
      if (isIndexControlled && !isValueControlled && segments[selectedIndexProp!]) {
        setInternalValue(segments[selectedIndexProp!].value);
      }
    }, [selectedIndexProp, isIndexControlled, isValueControlled, segments]);

    const handleSelect = useCallback(
      (index: number) => {
        const segment = segments[index];
        if (!segment || disabled || segment.disabled) return;

        if (!isValueControlled) {
          setInternalValue(segment.value);
        }
        onChange?.(segment.value);
        onIndexChange?.(index);
      },
      [segments, disabled, isValueControlled, onChange, onIndexChange]
    );

    // ── Layout & Animation ──
    const sizeStyle = sizeConfig[size];
    const isFluid = alignment === 'fluid';
    const [segmentLayouts, setSegmentLayouts] = useState<{ x: number; width: number }[]>([]);
    const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
      // Measure segment positions
      const layouts = segmentRefs.current.map((el) => {
        if (!el) return { x: 0, width: 0 };
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement?.getBoundingClientRect();
        return {
          x: parentRect ? rect.left - parentRect.left : 0,
          width: rect.width,
        };
      });
      setSegmentLayouts(layouts);
    }, [segments.length, size, variant, alignment]);

    // ── Styles ──
    const containerStyle: React.CSSProperties = {
      backgroundColor:
        variant === 'solid'
          ? colors.surface.base.alternative
          : colors.surface.base.default,
      borderRadius: rcTokens.container,
      padding: variant === 'solid' ? scTokens.containerPadding : 0,
      overflow: variant === 'solid' ? 'hidden' : 'visible',
      ...(variant === 'outlined' && {
        border: `1px solid ${colors.border.base.default}`,
      }),
      opacity: disabled ? 0.4 : 1,
      ...(fullWidth && { width: '100%' }),
      display: isFluid ? 'inline-flex' : 'flex',
      ...style,
    };

    const innerContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      ...(isFluid && { overflowX: 'auto' }),
    };

    const segmentBaseStyle: React.CSSProperties = {
      flex: !isFluid ? 1 : undefined,
      height: sizeStyle.height,
      paddingLeft: sizeStyle.paddingHorizontal,
      paddingRight: sizeStyle.paddingHorizontal,
      borderRadius: rcTokens.segment,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: scTokens.iconGap,
      zIndex: 2,
      position: 'relative',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      transition: transitions.background,
    };

    const getSegmentStyle = (index: number): React.CSSProperties => {
      const segment = segments[index];
      const isDisabled = disabled || segment.disabled;

      return {
        ...segmentBaseStyle,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      };
    };

    const getTextStyle = (index: number): React.CSSProperties => {
      const isSelected = index === safeSelectedIndex;
      const segment = segments[index];
      const isDisabled = disabled || segment.disabled;

      return {
        fontSize: sizeStyle.fontSize,
        lineHeight: `${sizeStyle.lineHeight}px`,
        fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.medium,
        fontFamily: typography.fontFamily.base,
        color: isDisabled
          ? colors.content.base.disabled
          : isSelected
            ? colors.content.brand.default
            : colors.content.base.secondary,
        whiteSpace: 'nowrap',
      };
    };

    // ── Animated Indicator ──
    const isOutlined = variant === 'outlined';
    const borderOverlap = isOutlined ? 1 : 0;

    const getIndicatorStyle = (): React.CSSProperties => {
      if (segmentLayouts.length === 0 || segmentLayouts.length < segments.length) {
        return {
          position: 'absolute',
          height: sizeStyle.height,
          backgroundColor:
            variant === 'solid'
              ? colors.surface.base.default
              : colors.surface.brand.secondary,
          borderRadius: isOutlined ? rcTokens.container : rcTokens.segment,
          zIndex: 1,
          opacity: 0,
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        };
      }

      const layout = segmentLayouts[safeSelectedIndex];

      return {
        position: 'absolute',
        top: -borderOverlap,
        left: (layout?.x ?? 0) - borderOverlap,
        width: (layout?.width ?? 0) + borderOverlap * 2,
        height: sizeStyle.height + borderOverlap * 2,
        backgroundColor:
          variant === 'solid'
            ? colors.surface.base.default
            : colors.surface.brand.secondary,
        borderRadius: isOutlined ? rcTokens.container : rcTokens.segment,
        zIndex: 1,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        ...(variant === 'solid'
          ? {
              boxShadow: `0 1px 3px ${colors.fill.normal}`,
            }
          : {
              border: `1px solid ${colors.border.brand.default}`,
            }),
      };
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        role="radiogroup"
        {...props}
      >
        <div style={innerContainerStyle}>
          <div style={getIndicatorStyle()} />
          {segments.map((segment, index) => {
            const isSelected = index === safeSelectedIndex;
            const isDisabled = disabled || segment.disabled;

            return (
              <button
                key={segment.value}
                ref={(el) => { segmentRefs.current[index] = el; }}
                type="button"
                disabled={isDisabled}
                onClick={() => handleSelect(index)}
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
                aria-label={segment.label}
                style={getSegmentStyle(index)}
              >
                {segment.icon}
                {segment.label && (
                  <span style={getTextStyle(index)}>
                    {segment.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
