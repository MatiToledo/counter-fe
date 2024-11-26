import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAlerts from "@/hooks/useAlerts";
import { ALERTS_DICTIONARY } from "@/lib/dictionaries";
import { Alert } from "@/lib/types/models";
import { UUID } from "crypto";
import { DateTime } from "luxon";

export default function LatestAlerts({ BranchId }: { BranchId: UUID }) {
  const { data } = useAlerts(BranchId);
  console.log("data: ", data);
  const latestAlerts = [
    { label: "Disturbios", sender: "Juan Pérez", time: "14:30" },
    { label: "Volumen excedido", sender: "María García", time: "15:45" },
    {
      label: "Solicitud de ayuda de guardias",
      sender: "Carlos Rodríguez",
      time: "16:20",
    },
    {
      label: "Solicitud de ayuda de guardias",
      sender: "Carlos Rodríguez",
      time: "16:20",
    },
    {
      label: "Solicitud de ayuda de guardias",
      sender: "Carlos Rodríguez",
      time: "16:20",
    },
  ];

  return (
    <>
      {data && (
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Últimas Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.result.map((alert: Alert) => (
                <div key={alert.id} className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                      {
                        ALERTS_DICTIONARY.find((a) => a.type === alert.type)
                          ?.label
                      }
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {alert.sender}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {alert.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}