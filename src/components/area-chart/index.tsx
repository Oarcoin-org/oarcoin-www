// Tremor AreaChart [v1.0.0]
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import {
  CartesianGrid,
  Label,
  AreaChart as RechartsAreaChart,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AxisDomain } from "recharts/types/util/types";

import {
  AvailableChartColors,
  constructCategoryColors,
  getYAxisDomain,
  hasOnlyOneValueForKey,
  type AvailableChartColorsKeys,
} from "@/lib/chart-utils";
import { cn } from "@/lib/utils";

import { AreaSeries } from "./area-series";
import { ChartLegend } from "./legend";
import { ChartTooltip } from "./tooltip";
import type {
  ActiveDot,
  AreaChartEventProps,
  AreaChartProps,
  TooltipProps,
} from "./types";

export type { AreaChartEventProps, TooltipProps };

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    colors = AvailableChartColors,
    valueFormatter = (value: number) => value.toString(),
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    showGridLines = true,
    yAxisWidth = 56,
    intervalType = "equidistantPreserveStart",
    showTooltip = true,
    showLegend = true,
    autoMinValue = false,
    minValue,
    maxValue,
    allowDecimals = true,
    connectNulls = false,
    className,
    onValueChange,
    enableLegendSlider = false,
    tickGap = 5,
    xAxisLabel,
    yAxisLabel,
    type = "default",
    legendPosition = "right",
    fill = "gradient",
    tooltipCallback,
    customTooltip,
    ...other
  } = props;
  const CustomTooltip = customTooltip;
  const paddingValue =
    (!showXAxis && !showYAxis) || (startEndOnly && !showYAxis) ? 0 : 20;
  const [legendHeight, setLegendHeight] = React.useState(60);
  const [activeDot, setActiveDot] = React.useState<ActiveDot | undefined>(undefined);
  const [activeLegend, setActiveLegend] = React.useState<string | undefined>(undefined);
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const hasOnValueChange = !!onValueChange;
  const stacked = type === "stacked" || type === "percent";
  const areaId = React.useId();

  const prevActiveRef = React.useRef<boolean | undefined>(undefined);
  const prevLabelRef = React.useRef<string | undefined>(undefined);

  function valueToPercent(value: number) {
    return `${(value * 100).toFixed(0)}%`;
  }

  function onDotClick(itemData: any, event: React.MouseEvent) {
    event.stopPropagation();

    if (!hasOnValueChange) return;
    if (
      (itemData.index === activeDot?.index && itemData.dataKey === activeDot?.dataKey) ||
      (hasOnlyOneValueForKey(data, itemData.dataKey) &&
        activeLegend &&
        activeLegend === itemData.dataKey)
    ) {
      setActiveLegend(undefined);
      setActiveDot(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(itemData.dataKey);
      setActiveDot({
        index: itemData.index,
        dataKey: itemData.dataKey,
      });
      onValueChange?.({
        eventType: "dot",
        categoryClicked: itemData.dataKey,
        ...itemData.payload,
      });
    }
  }

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) return;
    if (
      (dataKey === activeLegend && !activeDot) ||
      (hasOnlyOneValueForKey(data, dataKey) && activeDot && activeDot.dataKey === dataKey)
    ) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    setActiveDot(undefined);
  }

  return (
    <div
      ref={ref}
      className={cn("h-80 w-full", className)}
      tremor-id="tremor-raw"
      {...other}
    >
      <ResponsiveContainer>
        <RechartsAreaChart
          data={data}
          onClick={
            hasOnValueChange && (activeLegend || activeDot)
              ? () => {
                  setActiveDot(undefined);
                  setActiveLegend(undefined);
                  onValueChange?.(null);
                }
              : undefined
          }
          margin={{
            top: 12,
            bottom: xAxisLabel ? 30 : 8,
            left: yAxisLabel ? 20 : 0,
            right: 5,
          }}
          stackOffset={type === "percent" ? "expand" : undefined}
        >
          {showGridLines ? (
            <CartesianGrid
              className="stroke-foreground/15 stroke-1"
              horizontal={true}
              vertical={false}
              strokeDasharray="4 4"
            />
          ) : null}
          <XAxis
            padding={{ left: paddingValue, right: paddingValue }}
            hide={!showXAxis}
            dataKey={index}
            interval={startEndOnly ? "preserveStartEnd" : intervalType}
            tick={{ transform: "translate(0, 6)" }}
            ticks={
              startEndOnly
                ? ([data[0][index], data[data.length - 1][index]] as (string | number)[])
                : undefined
            }
            fill=""
            stroke=""
            className="text-xs fill-muted-foreground"
            tickLine={false}
            axisLine={false}
            minTickGap={tickGap}
          >
            {xAxisLabel && (
              <Label
                position="insideBottom"
                offset={-20}
                className="fill-foreground text-sm font-medium"
              >
                {xAxisLabel}
              </Label>
            )}
          </XAxis>
          <YAxis
            width={yAxisWidth}
            hide={!showYAxis}
            axisLine={false}
            tickLine={false}
            type="number"
            domain={yAxisDomain as AxisDomain}
            tick={{ textAnchor: "end", dx: -4 }}
            fill=""
            stroke=""
            className="text-xs fill-muted-foreground"
            tickFormatter={type === "percent" ? valueToPercent : valueFormatter}
            allowDecimals={allowDecimals}
          >
            {yAxisLabel && (
              <Label
                position="insideLeft"
                style={{ textAnchor: "middle" }}
                angle={-90}
                offset={-15}
                className="fill-foreground text-sm font-medium"
              >
                {yAxisLabel}
              </Label>
            )}
          </YAxis>
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            isAnimationActive={true}
            animationDuration={100}
            cursor={{ stroke: "var(--foreground)", strokeOpacity: 0.2, strokeWidth: 1 }}
            offset={20}
            position={{ y: 0 }}
            content={({ active, payload, label }) => {
              const tooltipLabel = String(label ?? "");
              const cleanPayload: TooltipProps["payload"] = payload
                ? payload.map((item: any) => ({
                    category: item.dataKey,
                    value: item.value,
                    index: item.payload[index],
                    color: categoryColors.get(item.dataKey) as AvailableChartColorsKeys,
                    type: item.type,
                    payload: item.payload,
                  }))
                : [];

              if (
                tooltipCallback &&
                (active !== prevActiveRef.current ||
                  tooltipLabel !== prevLabelRef.current)
              ) {
                tooltipCallback({ active, payload: cleanPayload, label: tooltipLabel });
                prevActiveRef.current = active;
                prevLabelRef.current = tooltipLabel;
              }

              return showTooltip && active ? (
                CustomTooltip ? (
                  <CustomTooltip
                    active={active}
                    payload={cleanPayload}
                    label={tooltipLabel}
                  />
                ) : (
                  <ChartTooltip
                    active={active}
                    payload={cleanPayload}
                    label={tooltipLabel}
                    valueFormatter={valueFormatter}
                  />
                )
              ) : null;
            }}
          />

          {showLegend ? (
            <RechartsLegend
              verticalAlign="top"
              height={legendHeight}
              content={({ payload }) =>
                ChartLegend(
                  { payload },
                  categoryColors,
                  setLegendHeight,
                  activeLegend,
                  hasOnValueChange
                    ? (clickedLegendItem: string) => onCategoryClick(clickedLegendItem)
                    : undefined,
                  enableLegendSlider,
                  legendPosition,
                  yAxisWidth
                )
              }
            />
          ) : null}

          <AreaSeries
            categories={categories}
            categoryColors={categoryColors}
            areaId={areaId}
            fill={fill}
            activeDot={activeDot}
            activeLegend={activeLegend}
            stacked={stacked}
            connectNulls={connectNulls}
            data={data}
            onValueChange={onValueChange}
            onDotClick={onDotClick}
            onCategoryClick={onCategoryClick}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
});

AreaChart.displayName = "AreaChart";

export { AreaChart };
