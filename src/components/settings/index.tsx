"use client";

import { Separator } from "@/components/ui/separator";
import { User } from "@/lib/types/models";
import MenuSettings from "./menu";

export default function SettingsComponent({ user }: { user: User }) {
  return (
    <div className="container max-w-2xl max-h-[calc(100vh-50px)] overflow-hidden">
      <div className="space-y-1 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Configuración
        </h1>
        <p className="text-muted-foreground">
          Administre la configuración de su cuenta y establezca preferencias.
        </p>
      </div>
      <Separator></Separator>
      <MenuSettings user={user} />
      <Separator></Separator>
    </div>
  );
}
