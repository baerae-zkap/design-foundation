import { ComponentProps } from 'react';
import LottieView from 'lottie-react-native';
import * as lotties from '@/design-system/components/Lottie/assets';

type LottieProps = {
  asset: keyof typeof lotties;
  isNotAutoPlay?: boolean;
  isNotLoop?: boolean;
  width?: number;
  height?: number;
};

export function Lottie({
  asset,
  isNotAutoPlay,
  isNotLoop,
  width,
  height,
  ...props
}: Readonly<LottieProps> &
  Omit<ComponentProps<typeof LottieView>, 'source' | 'autoPlay' | 'loop'>) {
  return (
    <LottieView
      source={lotties[asset]}
      autoPlay={!isNotAutoPlay}
      loop={!isNotLoop}
      style={[{ ...(width && { width }) }, { ...(height && { height }) }]}
      {...props}
    />
  );
}
