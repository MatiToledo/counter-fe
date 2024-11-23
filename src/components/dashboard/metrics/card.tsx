/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts";

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
import { DatePickerComponent } from "@/components/datePicker";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type MetricCardProps = {
  data: any;
  title: string;
  icon?: any;
  maxCapacity?: number;
  xIdentifier: string;
  yIdentifier: string;
  type: "line" | "bar";
};

export default function MetricCard({
  data,
  icon,
  title,
  maxCapacity,
  xIdentifier,
  yIdentifier,
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
          dataKey={yIdentifier}
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-desktop)",
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
        <Bar dataKey={yIdentifier} fill="var(--color-desktop)" radius={8}>
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

  return (
    <Card>
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
        <DatePickerComponent></DatePickerComponent>
      </CardFooter>
    </Card>
  );
}
