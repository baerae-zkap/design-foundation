/**
 * Category Component (React Native)
 *
 * @description 수평 스크롤 가능한 칩 기반 서브 네비게이션 요소입니다.
 * 메인 탭 아래에서 콘텐츠를 세분화하는 데 사용됩니다.
 * @see docs/components/Category.md - AI용 상세 가이드
 *
 * @example
 * <Category
 *   items={[
 *     { label: '전체' },
 *     { label: '추천' },
 *     { label: '인기' }
 *   ]}
 *   selectedIndex={0}
 *   onSelect={(index) => {}}
 * />
 */

import React, { forwardRef, useRef } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type CategoryVariant = 'solid' | 'outlined';
export type CategorySize = 'small' | 'medium' | 'large' | 'xlarge';

export interface CategoryItem {
  label: string;
  disabled?: boolean;
  testID?: string;
}

export interface CategoryProps {
  items: CategoryItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  variant?: CategoryVariant;
  size?: CategorySize;
  horizontalPadding?: boolean;
  verticalPadding?: boolean;
  iconButton?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

// Size configurations
const sizeConfig: Record<CategorySize, { height: number; fontSize: number; paddingHorizontal: number }> = {
  small: { height: 32, fontSize: typography.fontSize.xs, paddingHorizontal: spacing.primitive[3] }, // 32 / 12 / 12px
  medium: { height: 36, fontSize: typography.fontSize.sm, paddingHorizontal: spacing.primitive[4] }, // 36 / 14 / 16px
  large: { height: 40, fontSize: typography.fontSize.sm, paddingHorizontal: spacing.primitive[5] }, // 40 / 14 / 20px
  xlarge: { height: 44, fontSize: typography.fontSize.md, paddingHorizontal: spacing.primitive[6] }, // 44 / 15 / 24px
};

/**
 * Internal CategoryChip component
 */
const CategoryChip = ({
  item,
  index,
  isSelected,
  variant,
  size,
  onPress,
}: {
  item: CategoryItem;
  index: number;
  isSelected: boolean;
  variant: CategoryVariant;
  size: CategorySize;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const sizeStyle = sizeConfig[size];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  };

  const getChipStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      borderRadius: radius.primitive.full, // 9999 for pill shape
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (variant === 'solid') {
      // Solid variant
      return {
        ...baseStyle,
        backgroundColor: isSelected
          ? colors.surface.brand.default // #0066ff
          : colors.surface.base.alternative, // #f5f6f7
      };
    } else {
      // Outlined variant
      return {
        ...baseStyle,
        backgroundColor: isSelected
          ? colors.surface.brand.default // #0066ff
          : 'transparent',
        borderWidth: isSelected ? 0 : 1,
        borderColor: colors.border.base.default, // #d1d5db
      };
    }
  };

  const getTextStyle = (): TextStyle => ({
    fontSize: sizeStyle.fontSize,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.base,
    color: isSelected
      ? colors.content.base.onColor // white
      : colors.content.base.default, // #3e4651
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={item.disabled}
        accessibilityRole="tab"
        accessibilityState={{ selected: isSelected, disabled: item.disabled }}
        accessibilityLabel={item.label}
        testID={item.testID}
        style={getChipStyle()}
      >
        <Text style={getTextStyle()}>{item.label}</Text>
      </Pressable>
    </Animated.View>
  );
};

/**
 * Category Component
 *
 * Horizontal scrollable chip-based sub-navigation element.
 *
 * @example
 * ```tsx
 * const [selectedIndex, setSelectedIndex] = useState(0);
 *
 * <Category
 *   items={[
 *     { label: '전체' },
 *     { label: '추천' },
 *     { label: '인기' },
 *     { label: '최신' }
 *   ]}
 *   selectedIndex={selectedIndex}
 *   onSelect={setSelectedIndex}
 *   variant="solid"
 *   size="medium"
 *   horizontalPadding={true}
 * />
 * ```
 */
export const Category = forwardRef<View, CategoryProps>(
  (
    {
      items,
      selectedIndex,
      onSelect,
      variant = 'solid',
      size = 'medium',
      horizontalPadding = false,
      verticalPadding = false,
      iconButton,
      style,
      testID,
    },
    ref
  ) => {
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      ...(verticalPadding && {
        paddingVertical: spacing.primitive[3], // 12px
      }),
    };

    const scrollContentStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[2], // 8px
      ...(horizontalPadding && {
        paddingHorizontal: spacing.primitive[4], // 16px
      }),
    };

    return (
      <View
        ref={ref}
        style={[containerStyle, style]}
        testID={testID}
        accessibilityRole="tablist"
      >
        {/* Horizontal scroll area */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={scrollContentStyle}
          style={{ flex: iconButton ? 1 : undefined }}
        >
          {items.map((item, index) => (
            <CategoryChip
              key={index}
              item={item}
              index={index}
              isSelected={index === selectedIndex}
              variant={variant}
              size={size}
              onPress={() => !item.disabled && onSelect(index)}
            />
          ))}
        </ScrollView>

        {/* Optional icon button on the right */}
        {iconButton && (
          <View
            style={{
              marginLeft: spacing.primitive[2], // 8px separation
              paddingRight: horizontalPadding ? spacing.primitive[4] : 0,
            }}
          >
            {iconButton}
          </View>
        )}
      </View>
    );
  }
);

Category.displayName = 'Category';

