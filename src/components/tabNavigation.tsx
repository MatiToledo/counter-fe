"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/context/user";
import { Home, MessageCircle, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function TabNavigation() {
  const user = useUser().user;
  const router = useRouter();
  const pathname = usePathname();

  const HOME_DICTIONARY: Record<string, string> = {
    partner: "/dashboard",
    guardDoor: "/guardDoor",
    guardBar: "/guardBar",
  };

  const tabs = [
    { icon: Home, path: `${HOME_DICTIONARY[user?.role as string]}` },
    { icon: MessageCircle, path: "/chat" },
    { icon: Settings, path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background ">
      <Tabs defaultValue={pathname} className="w-full  ">
        <TabsList className="grid w-full grid-cols-3 h-[50px] rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.path}
              value={tab.path}
              className="flex flex-col items-center py-2 data-[state=active]:text-primary"
              onClick={() => router.push(tab.path)}>
              <tab.icon className="h-5 w-5" />
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
