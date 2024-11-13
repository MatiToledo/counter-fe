import LogUpForm from "@/components/forms/dashboard/logUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LogUpTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuenta</CardTitle>
        <CardDescription>
          Crea tu cuenta en pocos pasos y disfruta de todos nuestros servicios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <LogUpForm />
      </CardContent>
    </Card>
  );
}
