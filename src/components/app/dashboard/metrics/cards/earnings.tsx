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

export default function EarningsPerHourCard({ data }: any) {
  const isComparison = data.metrics.some((item: any) => item.comparison);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venta estimada</CardTitle>
        <CardDescription>
          <p className="text-2xl font-bold">{data.total}</p>
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
                  dataKey={"label"}
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
                  dataKey={"comparisonLabel"}
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
                  dataKey={"label"}
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
          <DatePickerComponent param={"earningVs"}></DatePickerComponent>
        </div>
      </CardFooter>
    </Card>
  );
}
