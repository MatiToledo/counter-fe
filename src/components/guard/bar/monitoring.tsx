import MonitoringForm from "../forms/guardBar/monitoring";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";

export default function Monitoring() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Monitoreo</CardTitle>
        <CardDescription>Actualice la información de su bar</CardDescription>
      </CardHeader>
      <CardContent>
        <MonitoringForm />
      </CardContent>
    </Card>
  );
}
