import { SvgProps } from 'react-native-svg';
import * as Icons from '@/design-system/components/Icon/assets';
import * as styles from '@/design-system/components/Icon/Icon.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { Animated, Easing, View } from 'react-native';
import { ComponentProps, useEffect, useRef } from 'react';

type IconProps = {
  isSpin?: boolean;
};

type IconPrimitiveProps = {
  color?:
    | 'baseStrong'
    | 'baseDefault'
    | 'baseSecondary'
    | 'baseOnColor'
    | 'brandDefault'
    | 'errorDefault'
    | 'warningDefault'
    | 'successDefault'
    | 'infoDefault'
    | 'disabledDefault';
  asset: keyof typeof Icons;
  rotate?: number;
};

function IconPrimitive({
  color = 'baseDefault',
  asset,
  size = 'medium',
  rotate,
  ...props
}: IconPrimitiveProps & SvgProps & styles.RootVariants & styles.ContentVariants) {
  const { tokens } = useTheme();
  const IconComponent = Icons[asset];

  const colors = {
    baseStrong: tokens.content.base.strong,
    baseDefault: tokens.content.base.default,
    baseSecondary: tokens.content.base.secondary,
    baseOnColor: tokens.content.base.onColor,
    brandDefault: tokens.content.brand.default,
    errorDefault: tokens.content.error.default,
    warningDefault: tokens.content.warning.default,
    successDefault: tokens.content.success.default,
    infoDefault: tokens.content.info.default,
    disabledDefault: tokens.content.disabled.default,
  } satisfies Record<Required<IconPrimitiveProps>['color'], string>;

  return (
    <View style={styles.root({ size })}>
      <View style={styles.content({ size })}>
        <IconComponent
          width="100%"
          height="100%"
          {...(rotate && { transform: `rotate(${rotate})` })}
          {...(color && { color: colors[color] })}
          {...props}
        />
      </View>
    </View>
  );
}

export function Icon({ isSpin, ...props }: IconProps & ComponentProps<typeof IconPrimitive>) {
  const spinAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSpin) {
      Animated.loop(
        Animated.timing(spinAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinAnimation.stopAnimation();
      spinAnimation.setValue(0);
    }
  }, [isSpin, spinAnimation]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: spinAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    >
      <IconPrimitive {...props} />
    </Animated.View>
  );
}

Icon.displayName = 'Icon';
