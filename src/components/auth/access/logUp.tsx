import LogUpAccountForm from "@/components/forms/dashboard/logUp/account";
import LogUpForm from "@/components/forms/dashboard/logUp/account";
import LogUpBranchForm from "@/components/forms/dashboard/logUp/branch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Auth, Branch, User } from "@/lib/types/models";
import { useState } from "react";

export type AccountDataType = {
  Auth: Partial<Auth>;
  User: Partial<User>;
  Branch?: Partial<Branch>;
};

export default function LogUpTab() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<AccountDataType>();

  const isAccount = step === 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAccount ? "Cuenta" : "Sucursal"}</CardTitle>
        <CardDescription>
          Crea tu cuenta en pocos pasos y disfruta de todos nuestros servicios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {step === 1 && <LogUpAccountForm setData={setData} setStep={setStep} />}
        {step === 2 && <LogUpBranchForm accountData={data} />}
      </CardContent>
    </Card>
  );
}
