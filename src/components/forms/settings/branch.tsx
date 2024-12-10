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
import { TimePickerDemo } from "@/components/ui/time-picker";
import { DateTime } from "luxon";

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
  const initialOpening = isEdit
    ? DateTime.fromFormat(branch.opening, "HH:mm:ss").toJSDate()
    : undefined;
  const initialClosing = isEdit
    ? DateTime.fromFormat(branch.closing, "HH:mm:ss").toJSDate()
    : undefined;

  const [opening, setOpening] = useState<Date | undefined>(initialOpening);
  const [closing, setClosing] = useState<Date | undefined>(initialClosing);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: branch.name,
      maxCapacity: branch.maxCapacity || "",
      profitPerPerson: branch.profitPerPerson || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: branch.name,
      maxCapacity: branch.maxCapacity || "",
      profitPerPerson: branch.profitPerPerson || "",
    });
    setOpening(initialOpening);
    setClosing(initialClosing);
  }, [branch]);

  const hasTimeChanged =
    opening?.getTime() !== initialOpening?.getTime() ||
    closing?.getTime() !== initialClosing?.getTime();
  const haveSomeChange = form.formState.isDirty || hasTimeChanged;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const body = { ...data, opening, closing };
      setLoading(true);
      isEdit
        ? await fetchUpdateBranch(branch.id, body)
        : await fetchCreateBranch(body);
      toast({
        title: isEdit
          ? "Sucursal actualizada exitosamente"
          : "Sucursal creada exitosamente",
      });
      closeDialog && closeDialog();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } finally {
      await mutateUser();
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
        <LoadingButton disabled={!haveSomeChange} loading={loading}>
          {isEdit ? "Actualizar" : "Crear"}
        </LoadingButton>
      </form>
    </Form>
  );
}
