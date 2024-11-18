/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { fetchLogIn, fetchLogUp } from "@/api/endpoints/auth";
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
import PasswordInput from "@/components/ui/password";
import { useUser } from "@/hooks/context/user";
import { useToast } from "@/hooks/use-toast";
import { UserRoleEnum, UserSubRoleEnum } from "@/lib/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email({
      message: "El correo electrónico no es válido",
    }),
    branchName: z.string(),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["confirmPassword"],
  });

export default function LogUpForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { mutateUser } = useUser();
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["token", "role"]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      branchName: "",
      confirmPassword: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const body = {
        Auth: {
          email: data.email,
          password: data.password,
        },
        User: {
          fullName: data.fullName,
          email: data.email,
          role: UserRoleEnum.PARTNER,
          subRole: UserSubRoleEnum.ADMIN,
          branchName: data.branchName,
        },
      };
      await fetchLogUp(body);
      const fetch = await fetchLogIn({
        email: data.email,
        password: data.password,
        role: UserRoleEnum.PARTNER,
      });
      setCookie("token", fetch.token);
      setCookie("role", fetch.role);
      mutateUser();
      push("/dashboard");
    } catch (error: any) {
      console.log("error: ", error);
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Perez" {...field} />
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
        <FormField
          control={form.control}
          name="branchName"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmacion de contraseña</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton disabled={!form.formState.isDirty} loading={loading}>
          Registrarse
        </LoadingButton>
      </form>
    </Form>
  );
}
