import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAlerts from "@/hooks/useAlerts";
import { ALERTS_DICTIONARY } from "@/lib/dictionaries";
import { Alert } from "@/lib/types/models";
import { UUID } from "crypto";

export default function LatestAlerts({
  BranchId,
  userFullName,
}: {
  BranchId: UUID;
  userFullName: string;
}) {
  const { data } = useAlerts(BranchId);

  return (
    <>
      {data?.result.length > 0 && (
        <Card className="w-full  h-full min-w-full min-w-md">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Últimas Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.result.map((alert: Alert) => (
                <div key={alert.id} className="flex items-center space-x-4">
                  <div
                    className="w-1 h-12  rounded-full"
                    style={{
                      backgroundColor:
                        ALERTS_DICTIONARY.find((a) => a.type === alert.type)
                          ?.color || "#cccccc",
                    }}></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                      {
                        ALERTS_DICTIONARY.find((a) => a.type === alert.type)
                          ?.label
                      }
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {alert.sender === userFullName ? "Tú" : alert.sender}
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
