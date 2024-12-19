import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LogInForm from "../forms/logIn";

export function LoginComponent() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingrese su correo a continuación para iniciar sesión en su cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LogInForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href={"/access"}
          className="text-muted-foreground text-sm underline">
          Ingresar como socio
        </Link>
      </CardFooter>
    </Card>
  );
}
