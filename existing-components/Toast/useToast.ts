import { CustomToastProps } from '@/design-system/components/Toast/Toast';
import Toast, { ToastShowParams } from 'react-native-toast-message';

type UseToastProps = Omit<
  ToastShowParams,
  'text1' | 'text2' | 'text1Style' | 'text2Style' | 'type' | 'props'
> &
  CustomToastProps;

export function useToast() {
  const toast = ({
    visibilityTime = 3000,
    title,
    description,
    leftContent,
    rightContent,
    backgroundColor,
    ...props
  }: UseToastProps) => {
    Toast.show({
      type: 'customToast',
      text1: title as string,
      text2: description as string,
      props: {
        leftContent,
        rightContent,
        backgroundColor,
      },
      visibilityTime,
      ...props,
    });
  };

  return { toast };
}
