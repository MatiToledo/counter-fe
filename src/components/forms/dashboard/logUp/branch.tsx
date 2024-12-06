/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { fetchLogIn, fetchLogUp } from "@/api/endpoints/auth";
import { AccountDataType } from "@/components/dashboard/access/logUp";
import { LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TimePickerDemo } from "@/components/ui/time-picker";
import { useUser } from "@/hooks/context/user";
import { useToast } from "@/hooks/use-toast";
import { saveLSSubRole, saveLSToken } from "@/lib/localStorage";
import { UserRoleEnum } from "@/lib/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
  maxCapacity: z.union([
    z.number().min(1, "Debe ser mayor que 0"),
    z.literal(""),
  ]),
  profitPerPerson: z.union([
    z.number().min(1, "Debe ser mayor que 0"),
    z.literal(""),
  ]),
});

export default function LogUpBranchForm({
  accountData,
}: {
  accountData: AccountDataType | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [opening, setOpening] = useState<Date | undefined>(undefined);
  const [closing, setClosing] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const { mutateUser } = useUser();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      maxCapacity: "",
      profitPerPerson: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const body = {
        ...accountData,
        Branch: {
          name: data.name,
          maxCapacity: data.maxCapacity,
          profitPerPerson: data.profitPerPerson,
          opening,
          closing,
        },
      };
      await fetchLogUp(body);
      const fetch = await fetchLogIn({
        email: accountData?.Auth.email,
        password: accountData?.Auth.password,
        role: UserRoleEnum.PARTNER,
      });
      saveLSToken(fetch.token);
      saveLSSubRole(fetch.subRole);
      await mutateUser();
      push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la sucursal</FormLabel>
              <FormControl>
                <Input placeholder="Juan Perez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidad maxima</FormLabel>
              <FormControl>
                <Input
                  placeholder="Capacidad de la sucursal"
                  {...field}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profitPerPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ganancia por persona</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ganancia por persona"
                  {...field}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-row items-center justify-between">
          <FormLabel className=" mt-2">Horario de apertura :</FormLabel>
          <TimePickerDemo date={opening} setDate={setOpening}></TimePickerDemo>
        </FormItem>
        <FormItem className="flex flex-row items-center justify-between">
          <FormLabel className=" mt-2">Horario de cierre :</FormLabel>
          <TimePickerDemo date={closing} setDate={setClosing}></TimePickerDemo>
        </FormItem>
        <LoadingButton disabled={!form.formState.isDirty} loading={loading}>
          Registrarse
        </LoadingButton>
      </form>
    </Form>
  );
}
