"use client";
import { User } from "@/lib/types/models";
import { Bolt, ShieldCheck, SquareUserRound, Store } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileForm from "../forms/settings/profile";
import SecurityForm from "../forms/settings/security";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BranchTab from "./branch";
import PreferencesTab from "./preferences";
import StaffTab from "./staff";

export default function MenuSettings({ user }: { user: User }) {
  const [tabs, setTabs] = useState([
    {
      icon: Bolt,
      id: "profile",
      text: "Perfil",
      element: <ProfileForm user={user} />,
    },
    {
      icon: ShieldCheck,
      id: "security",
      text: "Seguridad",
      element: <SecurityForm />,
    },
    {
      icon: Bolt,
      id: "preferences",
      text: "App",
      element: <PreferencesTab />,
    },
  ]);

  useEffect(() => {
    if (user.role === "partner") {
      const multipleBranch = user.Branches.length > 1;

      setTabs((prev) => {
        if (!tabs.some((tab) => tab.id === "branch")) {
          return [
            ...prev.slice(0, 1),
            {
              icon: Store,
              id: "branch",
              text: multipleBranch ? "Sucursales" : "Sucursal",
              element: <BranchTab branches={user.Branches} />,
            },
            {
              icon: SquareUserRound,
              id: "members",
              text: "Personal",
              element: <StaffTab branches={user.Branches} UserId={user.id} />,
            },
            ...prev.slice(1),
          ];
        }

        return prev;
      });
    }
  }, []);

  return (
    <Tabs defaultValue={"profile"} className="w-full my-2 bg-background">
      <TabsList className={`grid w-full grid-cols-auto min-h-[70px]`}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.text}
            value={tab.id}
            className="flex flex-col items-center py-2 data-[state=active]:text-primary">
            <tab.icon className="h-5 w-5 text-primary" />
            <p className="text-muted-foreground text-sm mt-1">{tab.text}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.text}
          value={tab.id}
          className="w-full mt-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          {tab.element}
        </TabsContent>
      ))}
    </Tabs>
  );
}
