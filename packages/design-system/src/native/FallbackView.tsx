/**
 * FallbackView Component (React Native)
 *
 * @description 빈 상태 또는 오류 상태 화면을 표시하는 컴포넌트입니다.
 * @see docs/components/FallbackView.md - AI용 상세 가이드
 *
 * @example
 * <FallbackView
 *   description="아직 데이터가 없습니다"
 *   action={{ label: "추가하기", onPress: () => {} }}
 * />
 */

import React, { forwardRef, type ReactNode } from 'react';
import { View, Text, type ViewProps, type ViewStyle, type TextStyle } from 'react-native';
import { ImageIcon } from 'lucide-react-native';
import { Button } from './Button';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';

export interface FallbackViewProps extends Omit<ViewProps, 'style'> {
  /** 커스텀 이미지/일러스트레이션 (ReactNode) */
  image?: ReactNode;
  /** 헤딩 텍스트 (선택 - Montage: optional) */
  heading?: string;
  /** 설명 텍스트 */
  description: string;
  /** 액션 버튼 (선택) */
  action?: { label: string; onPress: () => void };
  /** 이미지 크기 (기본 128px 모바일) */
  imageSize?: number;
  /** compact 모드 - 상하 여백 제거 */
  compact?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const FallbackView = forwardRef<View, FallbackViewProps>(
  (
    {
      image,
      heading,
      description,
      action,
      imageSize = 128,
      compact = false,
      style,
      testID,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const containerStyle: ViewStyle = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.semantic.inset.lg, // 24px
      paddingVertical: compact ? 0 : spacing.semantic.inset.lg, // 24px or 0
      gap: spacing.semantic.vertical.sm, // 16px
    };

    const imageContainerStyle: ViewStyle = {
      marginBottom: spacing.primitive[2], // 8px
    };

    const placeholderStyle: ViewStyle = {
      width: imageSize,
      height: imageSize,
      backgroundColor: colors.surface.base.alternative,
      borderRadius: radius.primitive.lg, // 16px
      alignItems: 'center',
      justifyContent: 'center',
    };

    const headingStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.lg,
      color: colors.content.base.strong,
      textAlign: 'center',
    };

    const descriptionStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.regular,
      lineHeight: typography.lineHeight.md,
      color: colors.content.base.secondary,
      textAlign: 'center',
    };

    return (
      <View
        ref={ref}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        style={[containerStyle, style]}
        {...props}
      >
        {/* Image or Placeholder */}
        <View style={imageContainerStyle}>
          {image ? (
            image
          ) : (
            <View style={placeholderStyle}>
              <ImageIcon
                size={32}
                color={colors.content.base.neutral}
                strokeWidth={1.5}
              />
            </View>
          )}
        </View>

        {/* Heading (optional) */}
        {heading && <Text style={headingStyle}>{heading}</Text>}

        {/* Description (max 2 lines) */}
        <Text style={descriptionStyle} numberOfLines={2}>
          {description}
        </Text>

        {/* Action Button */}
        {action && (
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={action.onPress}
          >
            {action.label}
          </Button>
        )}
      </View>
    );
  }
);

FallbackView.displayName = 'FallbackView';
