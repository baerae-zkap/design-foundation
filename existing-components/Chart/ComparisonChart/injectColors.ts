import { BarValue } from '@/design-system/components/Chart/ComparisonChart/types';
import * as styles from '@/design-system/components/Chart/ComparisonChart/ComparisonChart.css';

export const injectVisualizationColors = <T extends BarValue>(data: T[]) => {
  return data.map((item, index) => {
    const categoricalColors = [
      'categorical1',
      'categorical2',
      'categorical3',
      'categorical4',
    ] satisfies styles.ChartColorsVariants['color'][];

    return {
      ...item,
      color: categoricalColors[index % 4],
    };
  });
};
