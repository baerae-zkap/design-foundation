import React, { forwardRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  ViewStyle,
  Animated,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type PaginationVariant = 'extended' | 'compact' | 'minimize';

export interface PaginationProps {
  totalPages: number;
  currentPage: number; // 1-based
  onPageChange: (page: number) => void;
  variant?: PaginationVariant; // default 'extended'
  siblingCount?: number; // pages shown around current, default 2
  boundaryCount?: number; // pages shown at start/end, default 1
  style?: ViewStyle;
  testID?: string;
}

type PageItem = number | 'ellipsis';

const getPageNumbers = (
  totalPages: number,
  currentPage: number,
  siblingCount: number,
  boundaryCount: number,
  variant: PaginationVariant
): PageItem[] => {
  if (variant === 'minimize') {
    return [];
  }

  if (variant === 'compact') {
    // Show max 7 pages for compact
    const maxPages = 7;
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPages - 1);

    // Adjust start if we're near the end
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Extended variant
  const pages: PageItem[] = [];

  // Add left boundary pages
  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
    pages.push(i);
  }

  // Calculate sibling range
  const leftSibling = Math.max(boundaryCount + 1, currentPage - siblingCount);
  const rightSibling = Math.min(totalPages - boundaryCount, currentPage + siblingCount);

  // Add left ellipsis if gap exists
  if (leftSibling > boundaryCount + 1) {
    pages.push('ellipsis');
  }

  // Add sibling pages around current
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i > boundaryCount && i <= totalPages - boundaryCount) {
      pages.push(i);
    }
  }

  // Add right ellipsis if gap exists
  if (rightSibling < totalPages - boundaryCount) {
    pages.push('ellipsis');
  }

  // Add right boundary pages
  for (let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1); i <= totalPages; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return pages;
};

export const Pagination = forwardRef<View, PaginationProps>(
  (
    {
      totalPages,
      currentPage,
      onPageChange,
      variant = 'extended',
      siblingCount = 2,
      boundaryCount = 1,
      style,
      testID,
    },
    ref
  ) => {
    const pageNumbers = useMemo(
      () => getPageNumbers(totalPages, currentPage, siblingCount, boundaryCount, variant),
      [totalPages, currentPage, siblingCount, boundaryCount, variant]
    );

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    const handlePrevious = () => {
      if (!isPrevDisabled) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (!isNextDisabled) {
        onPageChange(currentPage + 1);
      }
    };

    return (
      <View
        ref={ref}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.primitive[1], // 4px
          },
          style,
        ]}
        testID={testID}
      >
        {/* Previous Button */}
        <NavButton
          onPress={handlePrevious}
          disabled={isPrevDisabled}
          icon="prev"
          testID={testID ? `${testID}-prev` : undefined}
        />

        {/* Page Numbers or Minimize Display */}
        {variant === 'minimize' ? (
          <Text
            style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.content.base.default,
              marginHorizontal: spacing.primitive[2], // 8px
            }}
          >
            {currentPage} / {totalPages}
          </Text>
        ) : (
          pageNumbers.map((item, index) => {
            if (item === 'ellipsis') {
              return (
                <Text
                  key={`ellipsis-${index}`}
                  style={{
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.content.base.default,
                    width: 32,
                    textAlign: 'center',
                  }}
                >
                  ...
                </Text>
              );
            }

            return (
              <PageButton
                key={item}
                page={item}
                isActive={item === currentPage}
                onPress={() => onPageChange(item)}
                testID={testID ? `${testID}-page-${item}` : undefined}
              />
            );
          })
        )}

        {/* Next Button */}
        <NavButton
          onPress={handleNext}
          disabled={isNextDisabled}
          icon="next"
          testID={testID ? `${testID}-next` : undefined}
        />
      </View>
    );
  }
);

Pagination.displayName = 'Pagination';

interface PageButtonProps {
  page: number;
  isActive: boolean;
  onPress: () => void;
  testID?: string;
}

const PageButton: React.FC<PageButtonProps> = ({ page, isActive, onPress, testID }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={testID}
    >
      {({ pressed }) => (
        <Animated.View
          style={{
            width: 32,
            height: 32,
            borderRadius: radius.primitive.sm, // 8px
            backgroundColor: isActive
              ? colors.surface.brand.default
              : pressed
              ? colors.surface.base.alternative
              : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Text
            style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: isActive ? colors.content.base.onColor : colors.content.base.default,
            }}
          >
            {page}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
};

interface NavButtonProps {
  onPress: () => void;
  disabled: boolean;
  icon: 'prev' | 'next';
  testID?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ onPress, disabled, icon, testID }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const Icon = icon === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      testID={testID}
    >
      {({ pressed }) => (
        <Animated.View
          style={{
            width: 32,
            height: 32,
            borderRadius: radius.primitive.sm, // 8px
            backgroundColor: pressed && !disabled ? colors.surface.base.alternative : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.4 : 1,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Icon
            size={16}
            color={colors.content.base.default}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};
