/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import { Area, Dot, Line } from "recharts";

import {
  getColorClassName,
  hasOnlyOneValueForKey,
  type AvailableChartColorsKeys,
} from "@/lib/chart-utils";
import { cn } from "@/lib/utils";

import type { ActiveDot, AreaChartProps } from "./types";

interface AreaSeriesProps {
  categories: string[];
  categoryColors: Map<string, AvailableChartColorsKeys>;
  areaId: string;
  fill: AreaChartProps["fill"];
  activeDot: ActiveDot | undefined;
  activeLegend: string | undefined;
  stacked: boolean;
  connectNulls: boolean;
  data: Record<string, unknown>[];
  onValueChange?: AreaChartProps["onValueChange"];
  onDotClick: (itemData: any, event: React.MouseEvent) => void;
  onCategoryClick: (dataKey: string) => void;
}

const getFillContent = ({
  fillType,
  activeDot,
  activeLegend,
  category,
}: {
  fillType: AreaChartProps["fill"];
  activeDot: ActiveDot | undefined;
  activeLegend: string | undefined;
  category: string;
}) => {
  const stopOpacity =
    activeDot || (activeLegend && activeLegend !== category) ? 0.1 : 0.3;

  switch (fillType) {
    case "none":
      return <stop stopColor="currentColor" stopOpacity={0} />;
    case "gradient":
      return (
        <>
          <stop offset="5%" stopColor="currentColor" stopOpacity={stopOpacity} />
          <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
        </>
      );
    case "solid":
    default:
      return <stop stopColor="currentColor" stopOpacity={stopOpacity} />;
  }
};

export const AreaSeries = ({
  categories,
  categoryColors,
  areaId,
  fill,
  activeDot,
  activeLegend,
  stacked,
  connectNulls,
  data,
  onValueChange,
  onDotClick,
  onCategoryClick,
}: AreaSeriesProps) => {
  return (
    <>
      {categories.map((category) => {
        const categoryId = `${areaId}-${category.replace(/[^a-zA-Z0-9]/g, "")}`;
        const color = categoryColors.get(category) as AvailableChartColorsKeys;

        return (
          <React.Fragment key={category}>
            <defs>
              <linearGradient
                className={cn(getColorClassName(color, "text"))}
                id={categoryId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                {getFillContent({
                  fillType: fill,
                  activeDot,
                  activeLegend,
                  category,
                })}
              </linearGradient>
            </defs>
            <Area
              className={cn(getColorClassName(color, "stroke"))}
              strokeOpacity={
                activeDot || (activeLegend && activeLegend !== category) ? 0.3 : 1
              }
              activeDot={(props: any) => {
                const {
                  cx: cxCoord,
                  cy: cyCoord,
                  stroke,
                  strokeLinecap,
                  strokeLinejoin,
                  strokeWidth,
                  dataKey,
                } = props;

                return (
                  <Dot
                    className={cn(
                      "stroke-background",
                      onValueChange ? "cursor-pointer" : "",
                      getColorClassName(
                        categoryColors.get(dataKey) as AvailableChartColorsKeys,
                        "fill"
                      )
                    )}
                    cx={cxCoord}
                    cy={cyCoord}
                    r={5}
                    fill=""
                    stroke={stroke}
                    strokeLinecap={strokeLinecap}
                    strokeLinejoin={strokeLinejoin}
                    strokeWidth={strokeWidth}
                    onClick={(_, event) => onDotClick(props, event)}
                  />
                );
              }}
              dot={(props: any) => {
                const {
                  stroke,
                  strokeLinecap,
                  strokeLinejoin,
                  strokeWidth,
                  cx: cxCoord,
                  cy: cyCoord,
                  dataKey,
                  index,
                } = props;

                if (
                  (hasOnlyOneValueForKey(data, category) &&
                    !(activeDot || (activeLegend && activeLegend !== category))) ||
                  (activeDot?.index === index && activeDot?.dataKey === category)
                ) {
                  return (
                    <Dot
                      key={index}
                      cx={cxCoord}
                      cy={cyCoord}
                      r={5}
                      stroke={stroke}
                      fill=""
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      strokeWidth={strokeWidth}
                      className={cn(
                        "stroke-background",
                        onValueChange ? "cursor-pointer" : "",
                        getColorClassName(
                          categoryColors.get(dataKey) as AvailableChartColorsKeys,
                          "fill"
                        )
                      )}
                    />
                  );
                }
                return <React.Fragment key={index} />;
              }}
              name={category}
              type="linear"
              dataKey={category}
              stroke=""
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              isAnimationActive={false}
              connectNulls={connectNulls}
              stackId={stacked ? "stack" : undefined}
              fill={`url(#${categoryId})`}
            />
          </React.Fragment>
        );
      })}
      {onValueChange
        ? categories.map((category) => (
            <Line
              className="cursor-pointer"
              strokeOpacity={0}
              key={category}
              name={category}
              type="linear"
              dataKey={category}
              stroke="transparent"
              fill="transparent"
              legendType="none"
              tooltipType="none"
              strokeWidth={12}
              connectNulls={connectNulls}
              onClick={(props: any, event) => {
                event.stopPropagation();
                onCategoryClick(props.name);
              }}
            />
          ))
        : null}
    </>
  );
};
