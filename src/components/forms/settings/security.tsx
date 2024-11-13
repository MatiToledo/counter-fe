/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUpdatePassword } from "@/api/endpoints/auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import PasswordInput from "../../ui/password";

const FormSchema = z.object({
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
  newPassword: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

export default function SecurityForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      await fetchUpdatePassword(data);
      form.reset();
      toast({
        description: "Contraseña actualizada exitosamente",
      });
    } catch (error: any) {
      form.reset();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña actual</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Ingrese su contraseña actual"
                  {...field}></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Ingrese su nueva contraseña"
                  {...field}></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          disabled={!form.formState.isDirty && !form.formState.isValid}
          loading={loading}>
          Actualizar
        </LoadingButton>
      </form>
    </Form>
  );
}
