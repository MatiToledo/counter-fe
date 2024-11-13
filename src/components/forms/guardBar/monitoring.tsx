"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  peopleInBars: z.string({
    required_error: "Porfavor seleccione una opcion",
  }),
  peopleInDance: z.string({
    required_error: "Porfavor seleccione una opcion",
  }),
});

export default function MonitoringForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      peopleInBars: "",
      peopleInDance: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data: ", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="peopleInBars"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el estado de las barras" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="noAccumulation">
                    Sin acumulación
                  </SelectItem>
                  <SelectItem value="little">Poca</SelectItem>
                  <SelectItem value="quite">Bastante</SelectItem>
                  <SelectItem value="tooMuch">Demasiada</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="peopleInDance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el estado de la pista de baile" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="noAccumulation">
                    Sin acumulación
                  </SelectItem>
                  <SelectItem value="little">Poca</SelectItem>
                  <SelectItem value="quite">Bastante</SelectItem>
                  <SelectItem value="tooMuch">Demasiada</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Actualizar</Button>
      </form>
    </Form>
  );
}
