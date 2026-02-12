/**
 * Alert Component (React Native)
 *
 * @description 현재 화면 위에 창을 띄워, 사용자의 흐름을 잠시 멈추고 주의할 내용을 안내합니다.
 * 사용자가 반드시 확인하고 넘어가야 하는 주요한 상황에 사용됩니다.
 * @see docs/components/Alert.md - AI용 상세 가이드
 *
 * @example
 * <Alert
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   heading="경고"
 *   body="이 작업은 되돌릴 수 없습니다."
 *   primaryAction={{ label: '확인', onPress: handleConfirm }}
 *   secondaryAction={{ label: '취소', onPress: handleCancel }}
 * />
 */

import React, { forwardRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export interface AlertAction {
  /** 버튼 라벨 */
  label: string;
  /** 버튼 클릭 핸들러 */
  onPress: () => void;
}

export interface AlertProps {
  /** Alert 표시 여부 */
  visible: boolean;
  /** Alert 닫기 핸들러 */
  onClose: () => void;
  /** 제목 (선택 - 없으면 body만 표시) */
  heading?: string;
  /** 본문 메시지 */
  body: string;
  /** 주요 액션 (권장 행동 - 우측 배치) */
  primaryAction: AlertAction;
  /** 보조 액션 (보조 행동 - 좌측 배치, 선택) */
  secondaryAction?: AlertAction;
  /** 부정 액션 모드 - primaryAction을 빨간색(error)으로 표시 */
  negative?: boolean;
  /** 스크림 터치 시 닫기 비활성 (기본: Alert는 반드시 버튼으로 닫아야 함) */
  closeOnScrim?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
}

const getButtonColors = (type: 'primary' | 'secondary', negative?: boolean) => {
  if (type === 'primary') {
    if (negative) {
      return {
        bg: colors.surface.error.default,
        bgPressed: colors.surface.error.defaultPressed,
        text: colors.content.base.onColor,
      };
    }
    return {
      bg: colors.surface.brand.default,
      bgPressed: colors.surface.brand.defaultPressed,
      text: colors.content.base.onColor,
    };
  }

  // Secondary button
  return {
    bg: colors.surface.base.container,
    bgPressed: colors.surface.base.containerPressed,
    text: colors.content.base.default,
  };
};

export const Alert = forwardRef<View, AlertProps>(
  (
    {
      visible,
      onClose,
      heading,
      body,
      primaryAction,
      secondaryAction,
      negative = false,
      closeOnScrim = false,
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
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
              style,
            ]}
            onStartShouldSetResponder={() => true}
            testID={testID}
          >
            {/* Heading (optional) */}
            {heading && (
              <View style={styles.header}>
                <Text style={styles.heading}>{heading}</Text>
              </View>
            )}

            {/* Body */}
            <View style={[
              styles.content,
              !heading && styles.contentWithoutHeader,
            ]}>
              <Text style={styles.body}>{body}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.footer}>
              {secondaryAction && (
                <Pressable
                  onPress={secondaryAction.onPress}
                  style={({ pressed }) => [
                    styles.button,
                                        {
                      backgroundColor: pressed
                        ? getButtonColors('secondary').bgPressed
                        : getButtonColors('secondary').bg,
                    },
                  ]}
                  testID={testID ? `${testID}-secondary` : undefined}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: getButtonColors('secondary').text },
                    ]}
                  >
                    {secondaryAction.label}
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={primaryAction.onPress}
                style={({ pressed }) => [
                  styles.button,
                                    {
                    backgroundColor: pressed
                      ? getButtonColors('primary', negative).bgPressed
                      : getButtonColors('primary', negative).bg,
                  },
                ]}
                testID={testID ? `${testID}-primary` : undefined}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: getButtonColors('primary', negative).text },
                  ]}
                >
                  {primaryAction.label}
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    );
  }
);

Alert.displayName = 'Alert';

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.component.modal.padding,
  },
  container: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.surface.elevated.default,
    borderRadius: radius.component.modal.default,
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
  header: {
    paddingHorizontal: spacing.component.modal.padding,
    paddingTop: spacing.component.modal.padding,
    paddingBottom: spacing.component.modal.headerGap,
  },
  heading: {
    fontSize: typography.fontSize.lg, // 18
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.bold, // 700
    color: colors.content.base.strong,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  content: {
    paddingHorizontal: spacing.component.modal.padding,
    paddingBottom: spacing.component.modal.footerGap,
  },
  contentWithoutHeader: {
    paddingTop: spacing.component.modal.padding,
  },
  body: {
    fontSize: 15,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.default,
    lineHeight: 23,
  },
  footer: {
    paddingHorizontal: spacing.component.modal.padding,
    paddingBottom: spacing.component.modal.padding,
    flexDirection: 'row',
    gap: spacing.component.modal.buttonGap,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: radius.component.button.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.component.button.paddingX.lg,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: -0.2,
  },
});
