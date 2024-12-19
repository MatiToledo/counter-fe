"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogInTab from "./logIn";
import LogUpTab from "./logUp";

export function DashboardAccessComponent() {
  return (
    <Tabs defaultValue="logIn" className="mx-auto max-w-sm min-h-[570px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="logIn">Ingresar</TabsTrigger>
        <TabsTrigger value="logUp">Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value="logIn">
        <LogInTab />
      </TabsContent>
      <TabsContent value="logUp">
        <LogUpTab />
      </TabsContent>
    </Tabs>
  );
}
