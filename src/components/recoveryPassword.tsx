"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import RecoverySendForm from "./forms/recovery/send";
import RecoveryForm from "./forms/recovery";

export function RecoveryPasswordComponent() {
  const [codeSended, setCodeSended] = useState(false);
  const [multipleAccount, setMultipleAccount] = useState(false);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
        <CardDescription>
          {codeSended
            ? "Ingrese el código de recuperación enviado a su correo"
            : "Ingrese su correo a continuación para recuperar su contraseña"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!codeSended && (
          <RecoverySendForm
            setCodeSended={setCodeSended}
            setMultipleAccount={setMultipleAccount}></RecoverySendForm>
        )}
        {codeSended && (
          <RecoveryForm multipleAccount={multipleAccount}></RecoveryForm>
        )}
      </CardContent>
    </Card>
  );
}
