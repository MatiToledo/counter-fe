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
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecoveryPasswordComponent() {
  const { push } = useRouter();
  const [codeSended, setCodeSended] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  return (
    <>
      <div
        className="absolute top-[16px] left-[16px]"
        onClick={() => push("/logIn")}>
        <ChevronLeft className="h-6 w-6"></ChevronLeft>
      </div>
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
              setEmail={setEmail}
              setCodeSended={setCodeSended}
              setRole={setRole}></RecoverySendForm>
          )}
          {codeSended && (
            <RecoveryForm role={role} email={email}></RecoveryForm>
          )}
        </CardContent>
      </Card>
    </>
  );
}
