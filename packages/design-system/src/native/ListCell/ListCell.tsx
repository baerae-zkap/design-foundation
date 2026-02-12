/**
 * ListCell Component (React Native)
 *
 * @description 리스트 아이템을 표시하는 수평 레이아웃 컴포넌트입니다.
 * @see docs/components/ListCell.md - AI용 상세 가이드
 *
 * @example
 * <ListCell
 *   leading={<Avatar src="user.jpg" />}
 *   title="홍길동"
 *   subtitle="hong@example.com"
 *   trailing={<ChevronRight />}
 *   onPress={() => {}}
 * />
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ListCellSize = 'small' | 'medium' | 'large';
export type ListCellVerticalAlign = 'top' | 'center';

export interface ListCellProps extends Omit<ViewProps, 'style'> {
  /** 좌측 영역 (아이콘, 아바타 등) */
  leading?: ReactNode;
  /** 메인 타이틀 */
  title: ReactNode;
  /** 서브타이틀 (선택) */
  subtitle?: ReactNode;
  /** 우측 영역 (화살표, 버튼, 값 등) */
  trailing?: ReactNode;
  /** 크기 */
  size?: ListCellSize;
  /** 탭 핸들러 (있으면 인터랙티브) */
  onPress?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 하단 구분선 표시 */
  divider?: boolean;
  /** 전체 너비 (가로 패딩 제거) */
  fillWidth?: boolean;
  /** 수직 정렬 */
  verticalAlign?: ListCellVerticalAlign;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

// Size configurations (from Foundation tokens)
const sizeConfig: Record<ListCellSize, {
  minHeight: number;
  paddingY: number;
  paddingX: number;
  titleSize: number;
  subtitleSize: number;
  gap: number;
}> = {
  small: {
    minHeight: 44,
    paddingY: spacing.primitive[2],
    paddingX: spacing.primitive[4],
    titleSize: 14,
    subtitleSize: 12,
    gap: spacing.primitive[3],
  },
  medium: {
    minHeight: 56,
    paddingY: spacing.primitive[3],
    paddingX: spacing.component.list.itemPaddingX,
    titleSize: 15,
    subtitleSize: 13,
    gap: spacing.primitive[3],
  },
  large: {
    minHeight: 72,
    paddingY: spacing.component.list.itemPaddingY,
    paddingX: spacing.component.list.itemPaddingX,
    titleSize: 16,
    subtitleSize: 14,
    gap: spacing.primitive[4],
  },
};

export const ListCell = forwardRef<View, ListCellProps>(
  (
    {
      leading,
      title,
      subtitle,
      trailing,
      size = 'medium',
      onPress,
      disabled = false,
      divider = false,
      fillWidth = false,
      verticalAlign = 'center',
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onPress && !disabled;

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: verticalAlign === 'top' ? 'flex-start' : 'center',
      gap: sizeStyle.gap,
      minHeight: sizeStyle.minHeight,
      paddingVertical: sizeStyle.paddingY,
      paddingHorizontal: fillWidth ? 0 : sizeStyle.paddingX,
      backgroundColor: 'transparent',
      opacity: disabled ? 0.5 : 1,
    };

    const contentStyle: ViewStyle = {
      flex: 1,
      gap: spacing.primitive[1], // 4px - tight title-subtitle bond
    };

    const titleStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.titleSize,
      fontWeight: typography.fontWeight.bold,
      color: colors.content.base.default,
      lineHeight: sizeStyle.titleSize * 1.35,
      letterSpacing: -0.2,
    };

    const subtitleStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.subtitleSize,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.base.secondary,
      lineHeight: sizeStyle.subtitleSize * 1.4,
      letterSpacing: -0.1,
    };

    const content = (
      <>
        {/* Leading */}
        {leading && (
          <View style={{ flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
            {leading}
          </View>
        )}

        {/* Content */}
        <View style={contentStyle}>
          {typeof title === 'string' ? (
            <Text style={titleStyle} numberOfLines={1}>{title}</Text>
          ) : (
            title
          )}
          {subtitle && (
            typeof subtitle === 'string' ? (
              <Text style={subtitleStyle} numberOfLines={1}>{subtitle}</Text>
            ) : (
              subtitle
            )
          )}
        </View>

        {/* Trailing */}
        {trailing && (
          <View style={{ flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
            {trailing}
          </View>
        )}
      </>
    );

    const cellContent = isInteractive ? (
      <Pressable
        ref={ref as React.Ref<View>}
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          containerStyle,
          pressed && { backgroundColor: colors.fill.alternative },
          style,
        ]}
        {...props}
      >
        {content}
      </Pressable>
    ) : (
      <View ref={ref} style={[containerStyle, style]} {...props}>
        {content}
      </View>
    );

    // Divider pattern (separate View with smart marginLeft)
    if (divider) {
      const leadingOffset = leading ? sizeStyle.gap : 0;
      const marginLeft = fillWidth ? 0 : sizeStyle.paddingX + leadingOffset;

      return (
        <View>
          {cellContent}
          <View
            style={{
              height: 1,
              backgroundColor: colors.border.base.default,
              marginLeft,
            }}
          />
        </View>
      );
    }

    return cellContent;
  }
);

ListCell.displayName = 'ListCell';
