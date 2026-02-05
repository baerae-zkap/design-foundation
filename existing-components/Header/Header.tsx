import { Box, BoxProps } from '@/design-system/components/Box/Box';
import { Button } from '@/design-system/components/Button/Button';
import { Icon } from '@/design-system/components/Icon/Icon';
import { Stack, useRouter } from 'expo-router';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import * as styles from '@/design-system/components/Header/Header.css';
import { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient';

type HeaderProps = {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  hideSpaceWhenNoHistory?: boolean;
};

type ScreenOptions = Parameters<NonNullable<ExtendedStackNavigationOptions['header']>>[0];

function HeaderPrimitive({
  centerContent,
  children,
  leftContent,
  rightContent,
  options,
  hideSpaceWhenNoHistory = false,
  color = 'baseDefault',
  ...props
}: PropsWithChildren<HeaderProps> & ScreenOptions & BoxProps<'safeAreaView'>) {
  const router = useRouter();
  const hasHistory = router.canGoBack();
  const isModal = options?.presentation === 'modal';

  return (
    <Box
      as="safeAreaView"
      disableBottomSafeArea
      layout="fillWidth"
      align="center"
      color={color}
      {...props}
    >
      <Box isPrimitive layout="fillWidth" align="start">
        {hasHistory && !isModal && (
          <Button buttonType="plain" onPress={() => router.back()}>
            <Icon
              asset="chevronLeft"
              size="xxxxLarge"
              color={color === 'transparent' ? 'baseOnColor' : 'baseDefault'}
            />
          </Button>
        )}
        {!hasHistory && !hideSpaceWhenNoHistory && <Box style={styles.defaultSpace()} />}
        {leftContent}
      </Box>
      <View style={styles.centerContent()}>
        {centerContent}
        {children}
      </View>
      <Box isPrimitive layout="fillWidth" align="end">
        {rightContent}
        {hasHistory && isModal && (
          <Button buttonType="plain" onPress={() => router.dismiss()}>
            <Icon
              asset="closeBig"
              size="xxxxLarge"
              color={color === 'transparent' ? 'baseOnColor' : 'baseDefault'}
            />
          </Button>
        )}
      </Box>
    </Box>
  );
}

export function Header({
  ...props
}: PropsWithChildren<HeaderProps> &
  Omit<ComponentProps<typeof HeaderPrimitive>, keyof ScreenOptions>) {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        header: (headerProps) => <HeaderPrimitive {...props} {...headerProps} />,
      }}
    />
  );
}
