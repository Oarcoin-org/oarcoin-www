import type { AvailableChartColorsKeys } from "@/lib/chart-utils";
import type React from "react";

export type PayloadItem = {
  category: string;
  value: number;
  index: string;
  color: AvailableChartColorsKeys;
  type?: string;
  payload: Record<string, unknown>;
};

export type TooltipProps = {
  active: boolean | undefined;
  payload: PayloadItem[];
  label: string;
};

export interface ChartTooltipProps extends TooltipProps {
  valueFormatter: (value: number) => string;
}

export interface ActiveDot {
  index?: number;
  dataKey?: string;
}

type BaseEventProps = {
  eventType: "dot" | "category";
  categoryClicked: string;
  [key: string]: number | string;
};

export type AreaChartEventProps = BaseEventProps | null | undefined;

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, unknown>[];
  index: string;
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  valueFormatter?: (value: number) => string;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  yAxisWidth?: number;
  intervalType?: "preserveStartEnd" | "equidistantPreserveStart";
  showTooltip?: boolean;
  showLegend?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  onValueChange?: (value: AreaChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  type?: "default" | "stacked" | "percent";
  legendPosition?: "left" | "center" | "right";
  fill?: "gradient" | "solid" | "none";
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
}
