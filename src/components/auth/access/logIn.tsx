"use client";

import LogInForm from "@/components/forms/dashboard/logIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LogInTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus datos para acceder a todas las funciones de tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <LogInForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/logIn" className="text-muted-foreground text-sm underline">
          Ingresar como usuario
        </Link>
      </CardFooter>
    </Card>
  );
}
