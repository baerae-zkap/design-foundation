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

export type ListCellSize = 'small' | 'medium' | 'large';

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
  /** 커스텀 스타일 */
  style?: ViewStyle;
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
    paddingY: 8,   // primitive.2
    paddingX: 16,  // primitive.4
    titleSize: 14,
    subtitleSize: 12,
    gap: 12,       // primitive.3
  },
  medium: {
    minHeight: 56,
    paddingY: 12,  // primitive.3
    paddingX: 16,  // primitive.4
    titleSize: 15,
    subtitleSize: 13,
    gap: 12,       // primitive.3
  },
  large: {
    minHeight: 72,
    paddingY: 16,  // primitive.4
    paddingX: 16,  // primitive.4
    titleSize: 16,
    subtitleSize: 14,
    gap: 16,       // primitive.4
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
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onPress && !disabled;

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizeStyle.gap,
      minHeight: sizeStyle.minHeight,
      paddingVertical: sizeStyle.paddingY,
      paddingHorizontal: sizeStyle.paddingX,
      backgroundColor: 'transparent',
      opacity: disabled ? 0.5 : 1,
      borderBottomWidth: divider ? 1 : 0,
      borderBottomColor: '#e2e8f0', // border.base.default
    };

    const contentStyle: ViewStyle = {
      flex: 1,
      gap: 2,
    };

    const titleStyle: TextStyle = {
      fontSize: sizeStyle.titleSize,
      fontWeight: '500',
      color: '#334155', // content.base.default
      lineHeight: sizeStyle.titleSize * 1.4,
    };

    const subtitleStyle: TextStyle = {
      fontSize: sizeStyle.subtitleSize,
      fontWeight: '400',
      color: '#64748b', // content.base.secondary
      lineHeight: sizeStyle.subtitleSize * 1.4,
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

    if (isInteractive) {
      return (
        <Pressable
          ref={ref as React.Ref<View>}
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            containerStyle,
            pressed && { backgroundColor: 'rgba(0,0,0,0.02)' },
            style,
          ]}
          {...props}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={[containerStyle, style]} {...props}>
        {content}
      </View>
    );
  }
);

ListCell.displayName = 'ListCell';
