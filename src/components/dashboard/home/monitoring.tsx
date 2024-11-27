/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Monitoring() {
  const latestAlerts = [
    {
      label: "Acumulación de gente en barras",
      value: "Poca",
      timestamp: "14:30",
    },
    {
      label: "Gente en la pista de baile:",
      value: "Mucha",
      timestamp: "19:30",
    },
  ];
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Monitoreo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {latestAlerts.map((monitor: any) => (
            <div
              key={monitor.timestamp}
              className="flex items-center space-x-4">
              <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                  {monitor.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {monitor.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
