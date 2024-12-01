/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { fetchCreateMonitoring } from "@/api/endpoints/monitoring";
import { LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

export default function MonitoringForm({
  BranchId,
  alreadyExists,
  nextUpdateOn,
  mutate,
}: any) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      peopleInBars: "",
      peopleInDance: "",
    },
  });

  const options = [
    { value: "empty", label: "Nadie" },
    { value: "few", label: "Poca" },
    { value: "aLot", label: "Mucha" },
    { value: "tooMuch", label: "Demasiada" },
  ];

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (alreadyExists) {
        toast({
          variant: "destructive",
          title: `Ya se ha registrado la informacion de la sucursal, actualice nuevamente luego de las ${nextUpdateOn}`,
        });
        return;
      }
      setLoading(true);
      const fetch = await fetchCreateMonitoring({
        ...data,
        BranchId,
      });
      toast({
        variant: "default",
        title: fetch.message,
      });
      mutate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Bar Column */}
          <FormField
            control={form.control}
            name="peopleInBars"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-white underline underline-offset-4">
                  Gente en Barra
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1">
                    {options.map((option) => (
                      <FormItem
                        key={`bar-${option.value}`}
                        className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value={option.value}
                            className="border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-300">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {/* Pista Column */}
          <FormField
            control={form.control}
            name="peopleInDance"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-white underline underline-offset-4">
                  Gente en Pista
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1">
                    {options.map((option) => (
                      <FormItem
                        key={`pista-${option.value}`}
                        className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value={option.value}
                            className="border-gray-600 text-white"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-300">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <LoadingButton
          loading={loading}
          disabled={!form.formState.isDirty && !form.formState.isValid}>
          Actualizar
        </LoadingButton>
      </form>
    </Form>
  );
}
