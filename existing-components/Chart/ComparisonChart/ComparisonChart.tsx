import { Typography } from '@/design-system/components/Typography/Typography';
import { ComponentProps, ElementRef, forwardRef } from 'react';
import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps } from '@rn-primitives/types';
import { BarValue } from '@/design-system/components/Chart/ComparisonChart/types';
import { View } from 'react-native';
import * as styles from '@/design-system/components/Chart/ComparisonChart/ComparisonChart.css';
import { Box } from '@/design-system/components/Box/Box';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { Layout } from '@/design-system/components/Layout/Layout';

//TODO @JeongEuiwang
//함께 사용되는 툴팁 컴포넌트를 어떻게 렌더링 할지 (현재 디자인은 absolute하게 위치함) 논의한 후 구현해야 합니다.

type SingleBarConfig<
  T extends
    | ComponentProps<typeof VerticalBarPrimitive>
    | ComponentProps<typeof HorizontalBarPrimitive>,
> = Omit<T, 'data'> & {
  type: 'single';
} & styles.ChartColorsVariants;

type StackBarConfig<
  T extends
    | ComponentProps<typeof VerticalBarPrimitive>
    | ComponentProps<typeof HorizontalBarPrimitive>,
> = T & { type: 'stack' };

type VerticalBarConfig = {
  height: number;
};

type HorizontalBarConfig = {
  widthRatio?: number;
};

type BarPrimitiveConfig = {
  thickness: number;
  data: BarValue[];
};

type VerticalStackBarProps = StackBarConfig<ComponentProps<typeof VerticalBarPrimitive>>;
type VerticalSingleBarProps = SingleBarConfig<ComponentProps<typeof VerticalBarPrimitive>>;

export const VerticalBar = (props: VerticalSingleBarProps | VerticalStackBarProps) => {
  if (props.type === 'single') {
    const singleData = [{ value: 1, color: props.color, key: 'default' }] satisfies BarValue[];

    return <VerticalBarPrimitive {...props} data={singleData} />;
  }

  return <VerticalBarPrimitive {...props} />;
};

VerticalBar.displayName = 'ComparisonChart.VerticalBar';

export const VerticalBarPrimitive = ({
  data,
  thickness,
  height,
  gap,
  borderRadius,
}: BarPrimitiveConfig & VerticalBarConfig & styles.BarVariants) => {
  return (
    <Box isPrimitive orientation="vertical" layout="hug" style={{ height }}>
      <Box
        isPrimitive
        orientation="vertical"
        layout="fillWidthInParent"
        style={[styles.bar({ gap, borderRadius }), { width: thickness, flex: 1 }]}
      >
        {data.map(({ value, color, key }) => {
          const sumOfValues = data.reduce((sum, { value }) => sum + value, 0);
          const flexRatio = value / sumOfValues;

          return <BarSegment key={key} flexRatio={flexRatio} color={color} width={thickness} />;
        })}
      </Box>
    </Box>
  );
};

VerticalBarPrimitive.displayName = 'ComparisonChart.VerticalBarPrimitive';

type HorizontalStackBarProps = StackBarConfig<ComponentProps<typeof HorizontalBarPrimitive>>;
type HorizontalSingleBarProps = SingleBarConfig<ComponentProps<typeof HorizontalBarPrimitive>>;

export const HorizontalBar = (props: HorizontalSingleBarProps | HorizontalStackBarProps) => {
  if (props.type === 'single') {
    const singleData = [{ value: 1, color: props.color, key: 'default' }] satisfies BarValue[];

    return <HorizontalBarPrimitive {...props} data={singleData} />;
  }

  return <HorizontalBarPrimitive {...props} />;
};

HorizontalBar.displayName = 'ComparisonChart.HorizontalBar';

export const HorizontalBarPrimitive = ({
  data,
  thickness,
  widthRatio = 1,
  gap,
  borderRadius,
}: BarPrimitiveConfig & HorizontalBarConfig & styles.BarVariants) => {
  if (widthRatio < 0 || widthRatio > 1) {
    throw new Error('widthRatio must be between 0 and 1');
  }

  const contentFlexRatio = widthRatio;
  const spaceFlexRatio = 1 - widthRatio;

  return (
    <Box isPrimitive layout="fillWidth" align="startCenter">
      <Box
        isPrimitive
        layout="fillWidthInParent"
        style={[styles.bar({ gap, borderRadius }), { height: thickness, flex: contentFlexRatio }]}
      >
        {data.map(({ value, color, key }) => {
          const sumOfValues = data.reduce((sum, { value }) => sum + value, 0);
          const flexRatio = value / sumOfValues;

          return <BarSegment key={key} flexRatio={flexRatio} color={color} height={thickness} />;
        })}
      </Box>
      <Box isPrimitive layout="hug" style={{ flex: spaceFlexRatio, height: thickness }} />
    </Box>
  );
};

HorizontalBarPrimitive.displayName = 'ComparisonChart.HorizontalBarPrimitive';

type BarSegmentProps = {
  flexRatio: number;
  width?: number;
  height?: number;
};

const BarSegment = ({
  flexRatio,
  width,
  height,
  color = 'brandDefault',
}: styles.ChartColorsVariants & BarSegmentProps) => {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.chartColors({ tokens, color }),
        { flex: flexRatio, ...(width && { width }), ...(height && { height }) },
      ]}
    />
  );
};

BarSegment.displayName = 'ComparisonChart.BarSegment';

type LegendProps = {
  data: BarValue;
};

const LegendPrimitive = ({
  layout = 'hug',
  gap = 1,
  align = 'center',
  orientation = 'horizontal',
  data,
  ...props
}: LegendProps & ComponentProps<typeof Label> & ComponentProps<typeof Box>) => {
  const { tokens } = useTheme();
  const dotColor = data.color || 'brandDefault';

  return (
    <Box layout={layout} orientation={orientation} align={align} gap={gap} {...props}>
      <View style={[styles.legendDot(), styles.chartColors({ tokens, color: dotColor })]} />
      <Label {...props} />
    </Box>
  );
};

LegendPrimitive.displayName = 'ComparisonChart.LegendPrimitive';

export const Legend = ({
  layout = 'hug',
  ...props
}: ComponentProps<typeof LegendPrimitive> & ComponentProps<typeof Layout>) => {
  return (
    <Layout layout={layout}>
      <LegendPrimitive layout={layout} {...props} />
    </Layout>
  );
};

Legend.displayName = 'ComparisonChart.Legend';

type LabelProps = SlottableTextProps & {
  width?: number;
};

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive>,
  ComponentProps<typeof LabelPrimitive> & ComponentProps<typeof Layout>
>(({ layout = 'hug', ...props }, ref) => {
  return (
    <Layout layout={layout}>
      <LabelPrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});

Label.displayName = 'ComparisonChart.Label';

const LabelPrimitive = forwardRef<
  ElementRef<typeof Typography>,
  LabelProps & ComponentProps<typeof Typography>
>(({ asChild, width, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Typography;

  return <Component ref={ref} {...props} style={[style, { ...(width && { width }) }]} />;
});

LabelPrimitive.displayName = 'ComparisonChart.LabelPrimitive';
