/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  text: z.string(),
});

export default function MessageForm({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    sendMessage(data.text.trim());
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <Input
              {...field}
              id="message"
              placeholder="Escribe tu mensaje..."
              className="flex-1"
              autoComplete="off"
            />
          )}
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Enviar mensaje</span>
        </Button>
      </form>
    </Form>
  );
}
