/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import { DatePickerComponent } from "@/components/datePicker";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { RotateCcw } from "lucide-react";

const chartConfig = {
  comparison: {
    label: "Comparacion",
    color: "hsl(var(--chart-2))",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type MetricCardProps = {
  identifier: "entriesPerHour" | "earningsPerHour" | "typeEntries";
  data: any;
  title: string;
  icon?: any;
  maxCapacity?: number;
  xIdentifier: string;
  yIdentifier: string;
  compareVs: any;
  setCompareVs: any;
  type: "line" | "bar" | "area";
};

export default function MetricCard({
  data,
  icon,
  title,
  maxCapacity,
  xIdentifier,
  yIdentifier,
  identifier,
  compareVs,
  setCompareVs,
  type,
}: MetricCardProps) {
  const CHART_TYPE = {
    line: (
      <LineChart
        accessibilityLayer
        data={data.metrics}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xIdentifier}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          // isAnimationActive={false}
          dataKey={yIdentifier}
          type="natural"
          stroke="var(--color-total)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-total)",
          }}
          activeDot={{
            r: 6,
          }}>
          <LabelList
            position="top"
            offset={12}
            dataKey={data.metrics[0].label ? "label" : "total"}
            className="fill-foreground "
            fontSize={12}
          />
        </Line>
      </LineChart>
    ),
    area: (
      <AreaChart
        accessibilityLayer
        data={data.metrics}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xIdentifier}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          // isAnimationActive={false}
          dataKey={"comparison"}
          type="natural"
          fill="var(--color-comparison)"
          fillOpacity={0.2}
          stroke="var(--color-comparison)"
          stackId="a"
          dot={{
            fill: "var(--color-comparison)",
          }}
          activeDot={{
            r: 6,
          }}>
          {/* <LabelList
            position="top"
            offset={8}
            dataKey={data.comparison}
            className="fill-foreground "
            fontSize={12}
          /> */}
        </Area>
        <Area
          // isAnimationActive={false}
          dataKey={yIdentifier}
          type="natural"
          fill="var(--color-total)"
          fillOpacity={0.4}
          stroke="var(--color-total)"
          dot={{
            fill: "var(--color-total)",
          }}
          activeDot={{
            r: 6,
          }}>
          {/* <LabelList
            position="top"
            offset={8}
            dataKey={data.metrics[0].label ? "label" : "total"}
            className="fill-foreground "
            fontSize={12}
          /> */}
        </Area>
      </AreaChart>
    ),
    bar: (
      <BarChart
        accessibilityLayer
        data={data.metrics}
        margin={{
          top: 20,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xIdentifier}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          // isAnimationActive={false}
          dataKey={yIdentifier}
          fill="var(--color-total)"
          radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    ),
  };

  const [date, setDate] = useState<Date | undefined>(
    compareVs[identifier]
      ? DateTime.fromISO(compareVs[identifier]).toJSDate()
      : undefined
  );

  useEffect(() => {
    if (date) {
      setCompareVs((prev: any) => ({
        ...prev,
        [identifier]: DateTime.fromJSDate(date).toFormat("yyyy-MM-dd"),
      }));
    }
  }, [date]);

  function resetCompare() {
    setCompareVs((prev: any) => ({
      ...prev,
      [identifier]: false,
    }));
    setDate(undefined);
  }

  return (
    <Card className="w-full" key={identifier}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {data.total && (
          <div className="flex items-center gap-2 text-2xl font-bold">
            {icon && icon}
            {data.total}
            {maxCapacity && (
              <p>(%{Math.round((data.total / maxCapacity) * 100)})</p>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>{CHART_TYPE[type]}</ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Comparar con:</p>
        <div className="flex items-center gap-3">
          {date && (
            <RotateCcw
              onClick={resetCompare}
              className="h-4 w-4 text-muted-foreground"></RotateCcw>
          )}
          <DatePickerComponent
            date={date}
            setDate={setDate}></DatePickerComponent>
        </div>
      </CardFooter>
    </Card>
  );
}
