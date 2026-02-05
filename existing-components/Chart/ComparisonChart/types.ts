import * as styles from '@/design-system/components/Chart/ComparisonChart/ComparisonChart.css';

export type BarValue = styles.ChartColorsVariants & {
  value: number;
  key: string;
};
