import MonitoringForm from "@/components/forms/guardBar/monitoring";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMonitoring from "@/hooks/useMonitoring";
import { UUID } from "crypto";

export default function Monitoring({ BranchId }: { BranchId: UUID }) {
  const { alreadyExists, nextUpdateOn, mutate } = useMonitoring(BranchId);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Monitoreo</CardTitle>
        <CardDescription>Actualice el estado de la sucursal</CardDescription>
      </CardHeader>
      <CardContent>
        <MonitoringForm
          alreadyExists={alreadyExists}
          BranchId={BranchId}
          mutate={mutate}
          nextUpdateOn={nextUpdateOn}
        />
      </CardContent>
    </Card>
  );
}
