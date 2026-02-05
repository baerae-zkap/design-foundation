import {
  AppState,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  View,
} from 'react-native';
import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Svg, { Rect, Defs, Mask, Path } from 'react-native-svg';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import {
  BarcodeScanningResult,
  Camera,
  CameraView as CameraViewPrimitive,
  useCameraPermissions,
} from 'expo-camera';
import * as styles from '@/design-system/components/Scanner/Scanner.css';
import { Lottie } from '@/design-system/components/Lottie/Lottie';
import { Portal } from '@rn-primitives/portal';

type RootContextProps = {
  boxSizeMin?: number;
  boxSizeRatio?: number;
};

type RootContextType = RootContextProps & {
  layout: LayoutRectangle;
};

const RootContext = createContext<RootContextType | null>(null);

function useRootContext() {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error('useRootContext must be used within a Scanner.Root');
  }

  return context;
}

type RootProps = RootContextProps & Omit<ComponentProps<typeof View>, 'style' | 'pointerEvents'>;

function Root({ boxSizeMin = 250, boxSizeRatio = 0.7, onLayout, ...props }: RootProps) {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
    onLayout?.(event);
  };

  const value = useMemo(
    () => ({ layout, boxSizeMin, boxSizeRatio }) satisfies RootContextType,
    [layout, boxSizeMin, boxSizeRatio],
  );

  return (
    <RootContext.Provider value={value}>
      {
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
          onLayout={handleLayout}
          {...props}
        />
      }
    </RootContext.Provider>
  );
}

function CameraView({
  barcodeScannerSettings = { barcodeTypes: ['qr'] },
  ...props
}: ComponentProps<typeof CameraViewPrimitive>) {
  return (
    <CameraViewPrimitive
      style={styles.cameraView()}
      barcodeScannerSettings={barcodeScannerSettings}
      {...props}
    />
  );
}

type GuideProps = {
  radius?: number;
  gap?: number;
  arcDegrees?: number;
  thickness?: number;
  tail?: number;
};

function Guide({ radius = 12, gap = 12, arcDegrees = 90, thickness = 6, tail = 10 }: GuideProps) {
  const { tokens } = useTheme();
  const { layout, boxSizeMin, boxSizeRatio } = useRootContext();

  if (!boxSizeMin || !boxSizeRatio) {
    throw new Error('boxSizeMin and boxSizeRatio are required in Guide');
  }

  const color = tokens?.border.base.default;
  const size = Math.min(layout.width * boxSizeRatio, boxSizeMin);
  const x = (layout.width - size) / 2;
  const y = (layout.height - size) / 3;
  const R = radius + gap;
  const cx = x + radius;
  const cy = y + radius;
  const cx2 = x + size - radius;
  const cy2 = y + size - radius;
  const TL = 225;
  const TR = 315;
  const BR = 45;
  const BL = 135;
  const A = arcDegrees / 2;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const pt = (cx: number, cy: number, r: number, deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  });

  const cornerPath = (cx: number, cy: number, centerDeg: number) => {
    const startDeg = centerDeg - A;
    const endDeg = centerDeg + A;
    const pStart = pt(cx, cy, R, startDeg);
    const pEnd = pt(cx, cy, R, endDeg);

    const tangent = (deg: number, dir: 1 | -1) => {
      const rad = toRad(deg + 90 * dir);

      return { dx: Math.cos(rad) * tail, dy: Math.sin(rad) * tail };
    };

    const tStart = tangent(startDeg, 1);
    const tEnd = tangent(endDeg, 1);

    return `
      M ${pStart.x - tStart.dx} ${pStart.y - tStart.dy}
      L ${pStart.x} ${pStart.y}
      A ${R} ${R} 0 ${arcDegrees > 180 ? 1 : 0} 1 ${pEnd.x} ${pEnd.y}
      L ${pEnd.x + tEnd.dx} ${pEnd.y + tEnd.dy}
    `;
  };

  return (
    <Svg pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Path
        d={cornerPath(cx, cy, TL)}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={cornerPath(cx2, cy, TR)}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={cornerPath(cx2, cy2, BR)}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d={cornerPath(cx, cy2, BL)}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

type OverlayProps = {
  radius?: number;
  opacity?: number;
};

function Overlay({ radius = 12, opacity = 0.6 }: OverlayProps) {
  const { layout, boxSizeMin, boxSizeRatio } = useRootContext();

  if (!boxSizeMin || !boxSizeRatio) {
    throw new Error('boxSizeMin and boxSizeRatio are required in Guide');
  }

  const size = Math.min(layout.width * boxSizeRatio, boxSizeMin);
  const x = (layout.width - size) / 2;
  const y = (layout.height - size) / 3;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={layout.width} height={layout.height}>
        <Defs>
          <Mask id="mask" x="0" y="0" width={layout.width} height={layout.height}>
            <Rect x="0" y="0" width={layout.width} height={layout.height} fill="white" />
            <Rect x={x} y={y} width={size} height={size} rx={radius} ry={radius} fill="black" />
          </Mask>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={layout.width}
          height={layout.height}
          fill={`rgba(0,0,0,${opacity})`}
          mask="url(#mask)"
        />
      </Svg>
    </View>
  );
}

function Loading() {
  const { tokens } = useTheme();

  return (
    <Portal name="scanner-loading-overlay">
      <View style={styles.loadingRoot()}>
        <View style={styles.loadingOverlay({ tokens })} />
        <View style={styles.loadingIndicatorWrapper({ tokens })}>
          <Lottie asset="loading" width={70} height={70} />
        </View>
      </View>
    </Portal>
  );
}

type ScannerProps = ComponentProps<typeof CameraView> & {
  interval?: number;
  isLoading?: boolean;
  onPermissionChange?: (isGranted: boolean) => void;
};

export function Scanner({
  interval = 1000,
  isLoading,
  onPermissionChange,
  onBarcodeScanned,
  ...props
}: ScannerProps) {
  const [_, requestPermission] = useCameraPermissions();
  const isRequested = useRef(false);
  const lastScannedTime = useRef(0);

  const checkCameraPermission = useCallback(async () => {
    const permission = await Camera.getCameraPermissionsAsync();
    const { granted } = permission;

    if (granted && isRequested.current) {
      onPermissionChange?.(granted);

      return;
    }

    if (!granted && !isRequested.current) {
      isRequested.current = true;
      const newPermission = await requestPermission();
      onPermissionChange?.(newPermission.granted);

      return;
    }
  }, [onPermissionChange, requestPermission]);

  const handleOnBarcodeScanned = (result: BarcodeScanningResult) => {
    const now = Date.now();

    if (now - lastScannedTime.current < interval) {
      return;
    }

    lastScannedTime.current = now;
    onBarcodeScanned?.(result);
  };

  useEffect(() => {
    checkCameraPermission();
  }, [checkCameraPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkCameraPermission();
      }
    });

    return () => subscription.remove();
  }, [checkCameraPermission]);

  return (
    <Root>
      <CameraView onBarcodeScanned={handleOnBarcodeScanned} {...props} />
      <Overlay />
      <Guide />
      {isLoading && <Loading />}
    </Root>
  );
}
