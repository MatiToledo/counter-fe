/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePickerComponent } from "@/components/datePicker";
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
import { TYPE_ENTRANCES_VALUES_DICTIONARY } from "@/lib/dictionaries";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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

export default function TypeEntrancesCard({ data }: any) {
  const isComparison = data.metrics.some((item: any) => item.comparison);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entradas</CardTitle>
        <CardDescription>Tipo de entradas por hora</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data.metrics}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) =>
                TYPE_ENTRANCES_VALUES_DICTIONARY[value]
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              // isAnimationActive={false}
              dataKey={"total"}
              fill="var(--color-total)"
              radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            {isComparison && (
              <Bar
                // isAnimationActive={false}
                dataKey={"comparison"}
                fill="var(--color-comparison)"
                radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Comparar con:</p>
        <div className="flex items-center gap-3">
          <DatePickerComponent param={"typeEntriesVs"}></DatePickerComponent>
        </div>
      </CardFooter>
    </Card>
  );
}
