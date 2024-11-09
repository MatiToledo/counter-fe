import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogInForm from "./forms/logIn";

export function LoginComponent() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Ingrese su correo a continuación para iniciar sesión en su cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LogInForm />
      </CardContent>
    </Card>
  );
}
