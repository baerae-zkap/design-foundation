/**
 * Popup Component (React Native)
 *
 * @description 즉각적인 사용자 주의가 필요한 모달 요소입니다. 필수 결정/확인을 위해 현재 워크플로우를 중단합니다.
 * @see docs/components/Popup.md - AI용 상세 가이드
 *
 * @example
 * <Popup
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   title="알림"
 *   description="작업을 계속하시겠습니까?"
 *   primaryAction={{ label: '확인', onPress: handleConfirm }}
 *   secondaryAction={{ label: '취소', onPress: handleCancel }}
 * />
 */

import React, { forwardRef, type ReactNode, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
  type ViewStyle,
} from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

type PopupSize = 'medium' | 'large' | 'xlarge';
type PopupNavigation = 'normal' | 'emphasized' | 'floating';
type PopupActionArea = 'none' | 'strong' | 'neutral' | 'compact' | 'cancel';
type PopupHeightType = 'fixed' | 'hug';

export interface PopupAction {
  /** 버튼 라벨 */
  label: string;
  /** 버튼 클릭 핸들러 */
  onPress: () => void;
  /** 버튼 색상 */
  color?: 'primary' | 'secondary' | 'assistive' | 'success' | 'danger';
}

export interface PopupProps {
  /** 팝업 표시 여부 */
  visible: boolean;
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
  /** 제목 */
  title?: string;
  /** 설명 텍스트 */
  description?: string;
  /** 커스텀 콘텐츠 */
  children?: ReactNode;
  /** 팝업 크기 */
  size?: PopupSize;
  /** 네비게이션 타입 */
  navigation?: PopupNavigation;
  /** 액션 영역 타입 */
  actionArea?: PopupActionArea;
  /** 높이 타입 */
  heightType?: PopupHeightType;
  /** 주요 액션 버튼 */
  primaryAction?: PopupAction;
  /** 보조 액션 버튼 */
  secondaryAction?: PopupAction;
  /** 스크림 클릭 시 닫기 여부 */
  closeOnScrim?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
}

const getSizeConfig = (size: PopupSize) => {
  const screenWidth = Dimensions.get('window').width;

  switch (size) {
    case 'medium':
      return {
        padding: spacing.component.bottomSheet.padding, // 20
        maxWidth: screenWidth - 48,
        fixedHeight: 480,
      };
    case 'large':
      return {
        padding: spacing.component.modal.padding, // 24
        maxWidth: screenWidth - 32,
        fixedHeight: 560,
      };
    case 'xlarge':
      return {
        padding: spacing.primitive[8], // 32
        maxWidth: screenWidth - 24,
        fixedHeight: 640,
      };
  }
};

export const Popup = forwardRef<View, PopupProps>(
  (
    {
      visible,
      onClose,
      title,
      description,
      children,
      size = 'medium',
      navigation = 'normal',
      actionArea = 'neutral',
      heightType = 'hug',
      primaryAction,
      secondaryAction,
      closeOnScrim = true,
      style,
      testID,
    },
    ref
  ) => {
    const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (visible) {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 10,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        scaleAnim.setValue(0.95);
        opacityAnim.setValue(0);
      }
    }, [visible, scaleAnim, opacityAnim]);

    const handleScrimPress = () => {
      if (closeOnScrim) {
        onClose();
      }
    };

    const sizeConfig = getSizeConfig(size);
    const screenHeight = Dimensions.get('window').height;
    const maxHeight = screenHeight * 0.9;

    const contentHeight = heightType === 'fixed' ? sizeConfig.fixedHeight : undefined;
    const contentMaxHeight = heightType === 'hug' ? maxHeight : undefined;

    // Navigation bar rendering
    const renderNavigation = () => {
      if (navigation === 'floating') {
        return (
          <View style={styles.floatingCloseButton}>
            <IconButton variant="ghost" color="secondary" size="small" onPress={onClose}>
              <X />
            </IconButton>
          </View>
        );
      }

      return (
        <View style={[styles.navigationBar, { paddingHorizontal: sizeConfig.padding, paddingTop: sizeConfig.padding }]}>
          {navigation === 'emphasized' ? (
            <>
              <Text style={[styles.title, styles.titleLeft]}>{title}</Text>
              <IconButton variant="ghost" color="secondary" size="small" onPress={onClose}>
                <X />
              </IconButton>
            </>
          ) : (
            <>
              <Text style={[styles.title, styles.titleCenter]}>{title}</Text>
              <IconButton variant="ghost" color="secondary" size="small" onPress={onClose}>
                <X />
              </IconButton>
            </>
          )}
        </View>
      );
    };

    // Action area rendering
    const renderActionArea = () => {
      if (actionArea === 'none') return null;

      const buttonGap = spacing.component.modal.buttonGap; // 12

      switch (actionArea) {
        case 'strong':
          return (
            <View style={[styles.actionArea, { gap: buttonGap, paddingHorizontal: sizeConfig.padding, paddingBottom: sizeConfig.padding }]}>
              {primaryAction && (
                <Button
                  variant="solid"
                  color={primaryAction.color || 'primary'}
                  size="large"
                  display="block"
                  onPress={primaryAction.onPress}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="weak"
                  color="assistive"
                  size="large"
                  display="block"
                  onPress={secondaryAction.onPress}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </View>
          );

        case 'neutral':
          return (
            <View style={[styles.actionAreaRow, { gap: buttonGap, paddingHorizontal: sizeConfig.padding, paddingBottom: sizeConfig.padding }]}>
              {secondaryAction && (
                <Button
                  variant="weak"
                  color="assistive"
                  size="large"
                  display="block"
                  style={{ flex: 1 }}
                  onPress={secondaryAction.onPress}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="solid"
                  color={primaryAction.color || 'primary'}
                  size="large"
                  display="block"
                  style={{ flex: 1 }}
                  onPress={primaryAction.onPress}
                >
                  {primaryAction.label}
                </Button>
              )}
            </View>
          );

        case 'compact':
          return (
            <View style={[styles.actionAreaCompact, { gap: buttonGap, paddingHorizontal: sizeConfig.padding, paddingBottom: sizeConfig.padding }]}>
              {secondaryAction && (
                <Button
                  variant="weak"
                  color="assistive"
                  size="medium"
                  onPress={secondaryAction.onPress}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="solid"
                  color={primaryAction.color || 'primary'}
                  size="medium"
                  onPress={primaryAction.onPress}
                >
                  {primaryAction.label}
                </Button>
              )}
            </View>
          );

        case 'cancel':
          return (
            <View style={[styles.actionArea, { paddingHorizontal: sizeConfig.padding, paddingBottom: sizeConfig.padding }]}>
              <Button
                variant="weak"
                color="assistive"
                size="large"
                display="block"
                onPress={onClose}
              >
                {secondaryAction?.label || '닫기'}
              </Button>
            </View>
          );

        default:
          return null;
      }
    };

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <Pressable
          style={styles.scrim}
          onPress={handleScrimPress}
          testID={testID ? `${testID}-scrim` : undefined}
        >
          <Animated.View
            ref={ref}
            style={[
              styles.container,
              {
                maxWidth: sizeConfig.maxWidth,
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
              style,
            ]}
            onStartShouldSetResponder={() => true}
            testID={testID}
          >
            {/* Navigation */}
            {(navigation !== 'floating' && title) && renderNavigation()}

            {/* Content */}
            <ScrollView
              style={[
                styles.scrollContent,
                {
                  height: contentHeight,
                  maxHeight: contentMaxHeight,
                }
              ]}
              contentContainerStyle={{
                paddingHorizontal: sizeConfig.padding,
                paddingTop: (navigation === 'floating' || !title) ? sizeConfig.padding : spacing.component.modal.headerGap, // 16
                paddingBottom: actionArea === 'none' ? sizeConfig.padding : spacing.component.modal.footerGap, // 20
              }}
            >
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
              {children}
            </ScrollView>

            {/* Action Area */}
            {renderActionArea()}

            {/* Floating Close Button */}
            {navigation === 'floating' && renderNavigation()}
          </Animated.View>
        </Pressable>
      </Modal>
    );
  }
);

Popup.displayName = 'Popup';

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.component.modal.padding, // 24
  },
  container: {
    width: '100%',
    backgroundColor: colors.surface.elevated.default,
    borderRadius: radius.component.modal.default, // 24
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.component.modal.headerGap, // 16
  },
  title: {
    fontSize: typography.fontSize.lg, // 18
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.bold, // 700
    color: colors.content.base.strong,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  titleCenter: {
    flex: 1,
    textAlign: 'center',
  },
  titleLeft: {
    flex: 1,
    textAlign: 'left',
  },
  floatingCloseButton: {
    position: 'absolute',
    top: spacing.semantic.inset.xs, // 12
    right: spacing.semantic.inset.xs, // 12
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 0,
    flexShrink: 1,
  },
  description: {
    fontSize: 15,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.default,
    lineHeight: 23,
  },
  actionArea: {
    flexDirection: 'column',
  },
  actionAreaRow: {
    flexDirection: 'row',
  },
  actionAreaCompact: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
