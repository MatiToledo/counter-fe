/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchLogUp } from "@/api/endpoints/auth";
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
import { User } from "@/lib/types/models";
import { UUID } from "crypto";
import { useState } from "react";
import { fetchUpdateUser } from "@/api/endpoints/user";

export default function UserForm({
  BranchId,
  userSelected,
}: {
  BranchId: UUID;
  userSelected?: User | null;
}) {
  const isEdit = !!userSelected?.id;
  const { mutateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const FormSchema = z.object({
    fullName: z.string(),
    email: z.string().email({
      message: "El correo electrónico no es válido",
    }),
    role: z.enum(["partner", "user"]),
    subRole: z.enum(["guardBar", "guardDoor"]).nullable(),
    password: isEdit
      ? z.string().optional()
      : z.string().min(8, {
          message: "La contraseña debe tener al menos 8 caracteres",
        }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: isEdit ? userSelected?.fullName : "",
      email: isEdit ? userSelected?.email : "",
      role: isEdit ? userSelected?.role : undefined,
      subRole: isEdit ? (userSelected?.subRole as any) : undefined,
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data: ", data);
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

      isEdit
        ? await fetchUpdateUser(userSelected.id, body.User)
        : await fetchLogUp(body);

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
                  <Input placeholder="Ingrese el email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isEdit && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Ingrese su contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">Personal</SelectItem>
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value as any}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sub Rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="guardBar">Guardia Pista</SelectItem>
                      <SelectItem value="guardDoor">Guardia Puerta</SelectItem>
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
            {isEdit ? "Editar" : "Crear"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
