import { ComponentProps, ElementRef, forwardRef, ReactNode } from 'react';
import * as styles from '@/design-system/components/Button/Button.css';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { Layout } from '@/design-system/components/Layout/Layout';
import { Box } from '@/design-system/components/Box/Box';
import { Loading as LoadingPrimitive } from '@/design-system/components/Loading/Loading';

type ButtonProps = {
  isLoading?: boolean;
};

const ButtonPrimitive = forwardRef<
  ElementRef<typeof Pressable>,
  PressableProps & ButtonProps & styles.ButtonVariants & GridContentProps
>(
  (
    {
      isLoading = false,
      disabled = false,
      layout,
      size,
      buttonType,
      color,
      children,
      leftContent,
      centerContent,
      rightContent,
      ...props
    },
    ref,
  ) => {
    const { tokens } = useTheme();
    const isGrid = !!leftContent || !!centerContent || !!rightContent;

    return (
      <Pressable
        {...props}
        disabled={disabled || isLoading}
        ref={ref}
        style={({ pressed }) =>
          styles.button({
            tokens,
            layout,
            pressed,
            size: buttonType === 'plain' ? undefined : size,
            color,
            buttonType,
            disabled,
          })
        }
      >
        {buttonType === 'plain' && (
          <>
            {typeof children === 'string' && (
              <Text
                style={styles.text({
                  tokens,
                  color,
                  buttonType,
                  disabled,
                })}
              >
                {children}
              </Text>
            )}
            {typeof children !== 'string' && <>{children}</>}
          </>
        )}
        {buttonType !== 'plain' && !isGrid && (
          <View style={styles.container()}>
            <View style={styles.contentContainer({ isLoading })}>
              {typeof children === 'string' && (
                <Text
                  style={styles.text({
                    tokens,
                    size,
                    color,
                    buttonType,
                    disabled,
                  })}
                >
                  {children}
                </Text>
              )}
              {typeof children !== 'string' && <>{children}</>}
            </View>
            {isLoading && (
              <View style={styles.loadingContainer()}>
                <Loading color={color} buttonType={buttonType} />
              </View>
            )}
          </View>
        )}
        {buttonType !== 'plain' && isGrid && (
          <GridContent
            isLoading={isLoading}
            color={color}
            buttonType={buttonType}
            leftContent={leftContent}
            centerContent={centerContent}
            rightContent={rightContent}
          />
        )}
      </Pressable>
    );
  },
);

ButtonPrimitive.displayName = 'ButtonPrimitive';

type GridContentProps = {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
};

const GridContent = ({
  isLoading,
  color,
  buttonType,
  leftContent,
  centerContent,
  rightContent,
}: ComponentProps<typeof ButtonPrimitive> & GridContentProps) => {
  return (
    <View style={styles.gridContainer()}>
      <View style={styles.gridContentContainer({ isLoading })}>
        <Box isPrimitive layout="fillWidth" align="start">
          {leftContent}
        </Box>
        <View style={styles.centerContent()}>{centerContent}</View>
        <Box isPrimitive layout="fillWidth" align="end">
          {rightContent}
        </Box>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer()}>
          <Loading color={color} buttonType={buttonType} />
        </View>
      )}
    </View>
  );
};

export const Button = forwardRef<
  ElementRef<typeof ButtonPrimitive>,
  ComponentProps<typeof ButtonPrimitive> & ComponentProps<typeof Layout>
>(({ layout = 'hug', ...props }, ref) => {
  return (
    <Layout layout={layout}>
      <ButtonPrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});

Button.displayName = 'Button';

const Loading = ({
  size = 6,
  delay = [0, 150, 300],
  buttonType = 'filled',
  color = 'brandDefault',
}: Pick<styles.ButtonVariants, 'buttonType' | 'color'> &
  Omit<ComponentProps<typeof LoadingPrimitive>, 'color'>) => {
  const colorMap = {
    filled: {
      brandDefault: 'baseOnColor',
      brandSecondary: 'brandDefault',
      baseContainer: 'baseDefault',
      successDefault: 'successDefault',
      errorDefault: 'errorDefault',
      kakaoDefault: 'baseStrong',
      googleDefault: 'baseDefault',
    },
    outlined: {
      brandDefault: 'brandDefault',
      brandSecondary: 'brandDefault',
      baseContainer: 'baseDefault',
      successDefault: 'successDefault',
      errorDefault: 'errorDefault',
      kakaoDefault: 'baseStrong',
      googleDefault: 'baseDefault',
    },
    plain: {
      brandDefault: 'brandDefault',
      brandSecondary: 'brandDefault',
      baseContainer: 'baseDefault',
      successDefault: 'successDefault',
      errorDefault: 'errorDefault',
      kakaoDefault: 'baseStrong',
      googleDefault: 'baseDefault',
    },
  } satisfies Record<
    Required<styles.ButtonVariants>['buttonType'],
    Record<Required<styles.ButtonVariants>['color'], styles.AnimatedCircleVariants['color']>
  >;

  return <LoadingPrimitive size={size} delay={delay} color={colorMap[buttonType][color]} />;
};

Loading.displayName = 'Loading';
