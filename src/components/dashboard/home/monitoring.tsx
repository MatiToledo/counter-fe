/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLatestMonitoring from "@/hooks/useLatestMonitoring";
import { MONITORING_VALUES_DICTIONARY } from "@/lib/dictionaries";
import { UUID } from "crypto";

export default function Monitoring({ BranchId }: { BranchId: UUID }) {
  const { latestMonitoring } = useLatestMonitoring(BranchId);
  return (
    <>
      {latestMonitoring && (
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Monitoreo
            </CardTitle>
            <CardDescription>
              Ultima actualización de la sucursal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                    Acumulación de gente en barras:
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {
                      MONITORING_VALUES_DICTIONARY[
                        latestMonitoring.peopleInBars
                      ]
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                    Gente en la pista de baile:
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {
                      MONITORING_VALUES_DICTIONARY[
                        latestMonitoring.peopleInDance
                      ]
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
