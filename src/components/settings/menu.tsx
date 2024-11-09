import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Bolt, ShieldCheck, User } from "lucide-react";
import ProfileTab from "./profile";
import SecurityTab from "./security";
import PreferencesTab from "./preferences";

export default function MenuSettings() {
  const tabs = [
    { icon: User, id: "profile", text: "Perfil" },
    { icon: ShieldCheck, id: "security", text: "Seguridad" },
    { icon: Bolt, id: "preferences", text: "Preferencias" },
  ];
  return (
    <Tabs defaultValue={"profile"} className="w-full my-2 bg-background">
      <TabsList className="grid w-full grid-cols-3 h-[50px] rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.text}
            value={tab.id}
            className="flex flex-col items-center py-2 data-[state=active]:text-primary">
            <tab.icon className="h-5 w-5 text-black dark:text-white" />
            <p className="text-muted-foreground text-sm	mt-1">{tab.text}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="profile" className="w-full mt-6">
        <ProfileTab></ProfileTab>
      </TabsContent>
      <TabsContent value="security" className="w-full mt-6">
        <SecurityTab />
      </TabsContent>
      <TabsContent value="preferences" className="w-full mt-6">
        <PreferencesTab />
      </TabsContent>
    </Tabs>
  );
}
