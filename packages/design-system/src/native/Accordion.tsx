/**
 * Accordion Component (React Native)
 *
 * @description 펼침/접힘 가능한 콘텐츠 컨테이너입니다.
 * @see docs/components/Accordion.md - AI용 상세 가이드
 *
 * @example
 * <Accordion title="제목">
 *   <Text>콘텐츠</Text>
 * </Accordion>
 */

import { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react';
import { Pressable, View, Text, Animated, type ViewProps, type ViewStyle } from 'react-native';

export type AccordionSize = 'medium' | 'large';

export interface AccordionProps extends Omit<ViewProps, 'children'> {
  /** 헤더 제목 */
  title: ReactNode;
  /** 콘텐츠 */
  children: ReactNode;
  /** 기본 펼침 상태 (비제어) */
  defaultExpanded?: boolean;
  /** 펼침 상태 (제어) */
  expanded?: boolean;
  /** 펼침 상태 변경 핸들러 */
  onChange?: (expanded: boolean) => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: AccordionSize;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const sizeStyles: Record<AccordionSize, { height: number; iconSize: number }> = {
  medium: { height: 48, iconSize: 16 },
  large: { height: 56, iconSize: 16 },
};

export const Accordion = forwardRef<View, AccordionProps>(
  (
    {
      title,
      children,
      defaultExpanded = false,
      expanded: controlledExpanded,
      onChange,
      disabled = false,
      size = 'medium',
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledExpanded !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
    const expanded = isControlled ? controlledExpanded : uncontrolledExpanded;

    const heightAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
    const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: expanded ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: expanded ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, [expanded, heightAnim, rotateAnim]);

    const handleToggle = () => {
      if (disabled) return;

      const newExpanded = !expanded;
      if (!isControlled) {
        setUncontrolledExpanded(newExpanded);
      }
      onChange?.(newExpanded);
    };

    const sizeStyle = sizeStyles[size];

    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View
        ref={ref}
        style={[
          {
            borderRadius: 12, // card.sm (radius.semantic.card.sm)
            borderWidth: 1,
            borderColor: '#e2e8f0', // border.base.default (palette.grey.95)
            backgroundColor: 'white', // surface.base.default (static.white)
            overflow: 'hidden',
          },
          style,
        ]}
        {...props}
      >
        <Pressable
          onPress={handleToggle}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ disabled: disabled ?? undefined, expanded }}
          style={({ pressed }) => ({
            height: sizeStyle.height,
            paddingHorizontal: 16, // primitive.4
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: expanded ? '#fafbfc' : pressed ? '#f8fafc' : 'white', // surface.elevated.alternative (palette.grey.99) : surface.base.alternative (palette.grey.99) : surface.base.default (static.white)
            opacity: disabled ? 0.5 : 1,
          })}
        >
          {typeof title === 'string' ? (
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: '#334155', // content.base.default (palette.grey.30)
                flex: 1,
              }}
            >
              {title}
            </Text>
          ) : (
            <View style={{ flex: 1 }}>{title}</View>
          )}
          <Animated.View
            style={{
              width: sizeStyle.iconSize,
              height: sizeStyle.iconSize,
              transform: [{ rotate }],
            }}
          >
            <svg
              width={sizeStyle.iconSize}
              height={sizeStyle.iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b" // content.base.secondary (palette.grey.50)
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Animated.View>
        </Pressable>
        <Animated.View
          style={{
            maxHeight: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000],
            }),
            overflow: 'hidden',
          }}
        >
          <View style={{ padding: 16 }}>{children}</View> {/* primitive.4 */}
        </Animated.View>
      </View>
    );
  }
);

Accordion.displayName = 'Accordion';
