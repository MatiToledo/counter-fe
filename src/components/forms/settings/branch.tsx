/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchCreateBranch, fetchUpdateBranch } from "@/api/endpoints/branch";
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
import { useUser } from "@/hooks/context/user";
import { useToast } from "@/hooks/use-toast";
import { Branch } from "@/lib/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
  maxCapacity: z.union([
    z.number().min(1, "Debe ser mayor que 0"),
    z.literal(""),
  ]),
});

export default function BranchForm({
  branch,
  closeDialog,
}: {
  branch: Branch;
  closeDialog?: () => void;
}) {
  const { mutateUser } = useUser();
  const isEdit = !!branch.id;
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: branch.name,
      maxCapacity: branch.maxCapacity || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: branch.name,
      maxCapacity: branch.maxCapacity || "",
    });
  }, [branch]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      isEdit
        ? await fetchUpdateBranch(branch.id, data)
        : await fetchCreateBranch(data);
      await mutateUser();
      closeDialog && closeDialog();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la sucursal" {...field} />
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
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton disabled={!form.formState.isDirty} loading={loading}>
          {isEdit ? "Actualizar" : "Crear"}
        </LoadingButton>
      </form>
    </Form>
  );
}
