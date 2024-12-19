/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePickerComponent } from "@/components/common/datePicker";
import {
  Card,
  CardContent,
  CardDescription,
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
import { RotateCcw, User2, Users2 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts";

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

export default function EntriesPerHourCard({ data, maxCapacity }: any) {
  const isComparison = data.metrics.some((item: any) => item.comparison);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aforo</CardTitle>
        <CardDescription className="flex gap-2 items-center">
          <Users2 className="w-5 h-5"></Users2>
          <p className="text-2xl font-bold">{data.total}</p>
          <p className="text-2xl font-medium">
            ( %{Math.round((data.total / maxCapacity) * 100)} )
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer id="chart-1" config={chartConfig}>
          {!isComparison ? (
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
                dataKey={"hour"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey={"total"}
                type="bump"
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
                  dataKey={"total"}
                  className="fill-foreground "
                  fontSize={12}
                />
              </Line>
            </LineChart>
          ) : (
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
                dataKey={"hour"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey={"comparison"}
                type="bump"
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
                <LabelList
                  position="top"
                  offset={8}
                  dataKey={data.comparison}
                  className="fill-foreground "
                  fontSize={12}
                />
              </Area>
              <Area
                dataKey={"total"}
                type="bump"
                fill="var(--color-total)"
                fillOpacity={0.4}
                stroke="var(--color-total)"
                dot={{
                  fill: "var(--color-total)",
                }}
                activeDot={{
                  r: 6,
                }}>
                <LabelList
                  position="top"
                  offset={8}
                  dataKey={"total"}
                  className="fill-foreground "
                  fontSize={12}
                />
              </Area>
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Comparar con:</p>
        <div className="flex items-center gap-3">
          <DatePickerComponent param={"entriesVs"}></DatePickerComponent>
        </div>
      </CardFooter>
    </Card>
  );
}
