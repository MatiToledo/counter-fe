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
  YAxis,
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

export default function PeopleInPerHourCard({
  data,
  type,
}: {
  data: any;
  type: "peopleInBars" | "peopleInDance";
}) {
  const VALUES_DICTIONARY: Record<number, string> = {
    0: "Nadie",
    1: "Poca",
    2: "Mucha",
    3: "Demasiada",
  };
  const isComparison = data.metrics.some((item: any) => item.comparison);
  const isPeopleInDance = type === "peopleInDance";
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Personas en {isPeopleInDance ? "pista" : "barras"}
        </CardTitle>
        <CardDescription>
          Cantidad de personas en {isPeopleInDance ? "pista" : "barras"} por
          hora
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
                allowDataOverflow={true}
                dataKey={"hour"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                formatter={(value) => VALUES_DICTIONARY[value as number]}
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey={"total"}
                type="bump"
                stroke="var(--color-total)"
                dot={false}
                strokeWidth={2}></Line>
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
                }}></Area>
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
                }}></Area>
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Comparar con:</p>
        <div className="flex items-center gap-3">
          <DatePickerComponent
            param={
              isPeopleInDance ? "peopleInDanceVs" : "peopleInBarsVs"
            }></DatePickerComponent>
        </div>
      </CardFooter>
    </Card>
  );
}
