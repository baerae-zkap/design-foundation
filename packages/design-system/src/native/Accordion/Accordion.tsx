/**
 * Accordion Component (React Native)
 *
 * @description 펼침/접힘 가능한 콘텐츠 컨테이너입니다.
 * Montage 디자인 시스템 패턴을 따릅니다.
 * @see docs/components/Accordion.md - AI용 상세 가이드
 *
 * @example
 * <Accordion title="FAQ" verticalPadding="medium" showDivider>
 *   <Text>콘텐츠</Text>
 * </Accordion>
 */

import { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react';
import { Pressable, View, Text, Animated, type ViewProps, type ViewStyle } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type AccordionVerticalPadding = 'small' | 'medium' | 'large';

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
  /** 전체 너비 모드 - 헤더가 전체 너비를 차지 */
  fillWidth?: boolean;
  /** 상하 여백 크기 - small(8), medium(12), large(16) */
  verticalPadding?: AccordionVerticalPadding;
  /** 제목 좌측 아이콘 */
  leadingIcon?: ReactNode;
  /** 우측 커스텀 콘텐츠 (기본 chevron 대체) */
  trailingContent?: ReactNode;
  /** 하단 구분선 표시 */
  showDivider?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

const verticalPaddingMap: Record<AccordionVerticalPadding, number> = {
  small: spacing.primitive[2],   // 8px
  medium: spacing.primitive[3],  // 12px
  large: spacing.primitive[4],   // 16px
};

const ICON_SIZE = 20;

export const Accordion = forwardRef<View, AccordionProps>(
  (
    {
      title,
      children,
      defaultExpanded = false,
      expanded: controlledExpanded,
      onChange,
      disabled = false,
      fillWidth = false,
      verticalPadding = 'medium',
      leadingIcon,
      trailingContent,
      showDivider = false,
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

    const paddingY = verticalPaddingMap[verticalPadding];

    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View
        ref={ref}
        style={[
          fillWidth
            ? { alignSelf: 'stretch' as const }
            : { alignSelf: 'flex-start' as const },
          style,
        ]}
        {...props}
      >
        {/* Header */}
        <Pressable
          onPress={handleToggle}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ disabled: disabled ?? undefined, expanded }}
          style={({ pressed }) => ({
            paddingVertical: paddingY,
            paddingHorizontal: spacing.primitive[3], // 12px
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.primitive[2], // 8px
            backgroundColor: pressed && !disabled
              ? colors.surface.base.alternative
              : 'transparent',
            borderRadius: radius.component.card.sm, // 12px
            opacity: disabled ? 0.38 : 1,
          })}
        >
          {/* Leading Icon */}
          {leadingIcon && (
            <View style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {leadingIcon}
            </View>
          )}

          {/* Title */}
          {typeof title === 'string' ? (
            <Text
              style={{
                ...(fillWidth && { flex: 1 }),
                fontFamily: typography.fontFamily.base,
                fontSize: typography.fontSize.md, // 16px
                fontWeight: typography.fontWeight.semibold,
                color: colors.content.base.default,
                lineHeight: typography.fontSize.md * 1.5, // 24px
                letterSpacing: -0.01,
              }}
            >
              {title}
            </Text>
          ) : (
            <View style={fillWidth ? { flex: 1 } : undefined}>{title}</View>
          )}

          {/* Trailing: Custom content or default Chevron */}
          {trailingContent ? (
            trailingContent
          ) : (
            <Animated.View style={{ transform: [{ rotate }] }}>
              <ChevronDown
                size={ICON_SIZE}
                color={colors.content.base.secondary}
                strokeWidth={2}
              />
            </Animated.View>
          )}
        </Pressable>

        {/* Divider */}
        {showDivider && !expanded && (
          <View
            style={{
              height: 1,
              backgroundColor: colors.border.solid.alternative,
            }}
          />
        )}

        {/* Content */}
        <Animated.View
          style={{
            maxHeight: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000],
            }),
            overflow: 'hidden',
            opacity: heightAnim,
          }}
        >
          <View
            style={{
              paddingTop: spacing.primitive[1], // 4px
              paddingBottom: spacing.primitive[4], // 16px
              paddingHorizontal: spacing.primitive[3], // 12px
            }}
          >
            {children}
          </View>
          {/* Divider after expanded content */}
          {showDivider && (
            <View
              style={{
                height: 1,
                backgroundColor: colors.border.solid.alternative,
              }}
            />
          )}
        </Animated.View>
      </View>
    );
  }
);

Accordion.displayName = 'Accordion';
