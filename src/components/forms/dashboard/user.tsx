/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/context/user";
import { useToast } from "@/hooks/use-toast";
import { UserRoleEnum, UserSubRoleEnum } from "@/lib/types/enums";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchLogUp } from "@/api/endpoints/auth";
const FormSchema = z.object({
  fullName: z.string(),
  email: z.string().email({
    message: "El correo electrónico no es válido",
  }),
  role: z.enum([UserRoleEnum.PARTNER, UserRoleEnum.USER]),
  subRole: z
    .enum([UserSubRoleEnum.GUARD_BAR, UserSubRoleEnum.GUARD_DOOR])
    .nullable(),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

export default function UserForm({ BranchId }: { BranchId: UUID }) {
  const { push } = useRouter();
  const { mutateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: undefined,
      subRole: undefined,
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const { email, password, fullName, role, subRole } = data;
      const body = {
        Auth: {
          email: email,
          password: password,
        },
        User: {
          fullName: fullName,
          email: email,
          role: role,
          subRole: role === "partner" ? "partner" : subRole,
        },
        Branch: {
          id: BranchId,
        },
      };
      await fetchLogUp(body);
      await mutateUser();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  const watchRole = form.watch("role");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-rows-[auto,1fr] gap-4 min-h-[472px] relative">
        {/* Campos del formulario */}
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">Miembro</SelectItem>
                    <SelectItem value="partner">Socio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {watchRole === "user" && (
            <FormField
              control={form.control}
              name="subRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Rol</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sub Rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="guardBar">Pista</SelectItem>
                      <SelectItem value="guardDoor">Puerta</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className=" mt-4 w-full absolute bottom-2">
          <LoadingButton loading={loading} disabled={false}>
            Crear
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
