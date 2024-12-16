/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchCheckRecovery, fetchSendRecovery } from "@/api/endpoints/auth";
import { LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FormSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico no es válido",
  }),
  role: z.enum(["partner", "user"]).nullable().optional(),
});

export default function RecoverySendForm({
  setCodeSended,
  setRole,
  setEmail,
}: any) {
  const [loading, setLoading] = useState(false);
  const [multipleAccount, setMultipleAccount] = useState(false);
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      if (!checked) {
        const checkedRes = await fetchCheckRecovery(data);
        setMultipleAccount(checkedRes.result.multipleAccount);
        setChecked(true);
        setEmail(data.email);
        if (checkedRes.result.multipleAccount) return;
      }

      await fetchSendRecovery(data);
      setRole(data.role);
      setCodeSended(true);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 min-h-[255px] flex flex-col justify-between">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {multipleAccount && checked && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormDescription>
                  Tienes múltiples cuentas, cual quieres recuperar
                </FormDescription>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="partner">Socio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <LoadingButton loading={loading} disabled={!form.formState.isDirty}>
          Continuar
        </LoadingButton>
      </form>
    </Form>
  );
}
