type ColorUtility = "bg" | "stroke" | "fill" | "text";

export const chartColors = {
  primary: {
    bg: "bg-primary",
    stroke: "stroke-primary",
    fill: "fill-primary",
    text: "text-primary",
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string;
  };
};

export type AvailableChartColorsKeys = keyof typeof chartColors;

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors
) as Array<AvailableChartColorsKeys>;

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[]
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>();
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length]);
  });
  return categoryColors;
};

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility
): string => {
  return chartColors[color][type];
};

export const hasOnlyOneValueForKey = (
  array: Record<string, unknown>[],
  keyToCheck: string
): boolean => {
  const values = array.map((obj) => obj[keyToCheck]);
  const firstValue = values[0];
  return values.every((value) => value === firstValue);
};

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue?: number,
  maxValue?: number
): (string | number)[] => {
  if (autoMinValue) {
    return ["auto", "auto"];
  }
  return [minValue ?? "auto", maxValue ?? "auto"];
};
