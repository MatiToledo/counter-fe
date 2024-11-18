/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "../../ui/button";
import { Input } from "../../ui/input";

import { fetchUpdateUser } from "@/api/endpoints/user";
import { useUser } from "@/hooks/context/user";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/lib/types/models";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

const FormSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico no es válido",
  }),
  fullName: z.string(),
  role: z.string(),
});

export default function ProfileForm({ user }: { user: User }) {
  const { mutateUser } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      if (data.email === user.email) {
        delete data.email;
      }
      await fetchUpdateUser(user.id, data);
      await mutateUser();
      form.reset({
        email: data.email,
        fullName: data.fullName,
      });
      toast({
        description: "Perfil actualizado exitosamente",
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton disabled={!form.formState.isDirty} loading={loading}>
          Actualizar
        </LoadingButton>
      </form>
    </Form>
  );
}
