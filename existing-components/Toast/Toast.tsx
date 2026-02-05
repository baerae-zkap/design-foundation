import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import * as styles from '@/design-system/components/Toast/Toast.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { ComponentProps, ReactNode } from 'react';

export type CustomToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
} & styles.RootVariants;

export const Toaster = () => {
  const config = {
    customToast: ({
      text1: title,
      text2: description,
      props: { leftContent, rightContent, backgroundColor },
    }: ToastConfigParams<CustomToastProps> & CustomToastProps) => (
      <Root backgroundColor={backgroundColor}>
        {leftContent}
        <Content>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
        </Content>
        {rightContent}
      </Root>
    ),
  } satisfies ToastConfig;

  return <Toast position="top" config={config} />;
};

export const Root = ({
  backgroundColor,
  ...props
}: ComponentProps<typeof View> & styles.RootVariants) => {
  const { tokens } = useTheme();

  return <View style={styles.root({ tokens, backgroundColor })} {...props} />;
};

export const Content = ({ ...props }: ComponentProps<typeof View>) => {
  const { tokens } = useTheme();

  return <View style={styles.content({ tokens })} {...props} />;
};

export const Title = ({ children, ...props }: ComponentProps<typeof Text>) => {
  const { tokens } = useTheme();

  return typeof children === 'string' ? (
    <Text style={styles.title({ tokens })} {...props}>
      {children}
    </Text>
  ) : (
    children
  );
};

export const Description = ({ children, ...props }: ComponentProps<typeof Text>) => {
  const { tokens } = useTheme();

  return typeof children === 'string' ? (
    <Text style={styles.description({ tokens })} {...props}>
      {children}
    </Text>
  ) : (
    children
  );
};
