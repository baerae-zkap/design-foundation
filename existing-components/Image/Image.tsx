import {
  ImageProps as ImagePrimitiveProps,
  Image as ImagePrimitive,
  ImageSourcePropType,
  View,
} from 'react-native';
import { useMemo } from 'react';
import * as Images from '@/design-system/components/Image/assets';
import * as styles from '@/design-system/components/Image/Image.css';
import { BankNameType, ExchangeNameType, exchangeNameType } from '@baerae-zkap/common-registry';
import { SocialProviderType } from '@/components/AuthProvider/AuthProvider';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';

export type Asset = keyof typeof Images;

export type ImageProps =
  | {
      asset: Asset;
      src?: never;
    }
  | {
      src: string;
      asset?: never;
    };

export function Image({
  border,
  size = 'medium',
  borderRadius = 'xSmall',
  width,
  height,
  padding,
  style,
  ...props
}: Omit<ImagePrimitiveProps, 'borderRadius'> &
  ImageProps &
  styles.RootVariants &
  styles.ContentVariants &
  styles.ImageVariants) {
  const { tokens } = useTheme();

  const imageSource = useMemo(() => {
    if (props.asset) {
      return Images[props.asset] as ImageSourcePropType;
    }

    if (props.src) {
      return { uri: props.src } satisfies ImageSourcePropType;
    }

    throw new Error('asset or src required');
  }, [props.asset, props.src]);

  return (
    <View style={styles.root()}>
      <View
        style={[
          styles.content({
            tokens,
            size,
            border,
            borderRadius,
            padding,
          }),
          { ...(width && { width }) },
          { ...(height && { height }) },
          style,
        ]}
      >
        <ImagePrimitive
          source={imageSource}
          style={styles.image()}
          resizeMode="contain"
          {...props}
        />
      </View>
    </View>
  );
}

Image.displayName = 'Image';

export const bankImages = {
  Kakao: 'kakao',
  Kookmin: 'kookmin',
  Shinhan: 'shinhan',
  KBank: 'kbank',
  Hana: 'hana',
  iMBank: 'im',
} satisfies Record<BankNameType, Asset>;

//TODO: @JeongEuiwang bybit 이미지 추가, binance 이미지 업데이트
export const cexImages = {
  [exchangeNameType.BITHUMB]: 'bithumb',
  [exchangeNameType.UPBIT]: 'upbit',
  [exchangeNameType.KORBIT]: 'korbit',
  [exchangeNameType.COINONE]: 'coinon',
  [exchangeNameType.BINANCE]: 'binance',
  [exchangeNameType.BYBIT]: 'upbit',
} satisfies Record<ExchangeNameType, Asset>;

export const socialImages = {
  kakao: 'socialKakao',
  google: 'socialGoogle',
} satisfies Record<SocialProviderType, Asset>;
