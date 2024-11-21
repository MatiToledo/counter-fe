"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNewMessageStore } from "@/lib/state";
import { Home, MessageCircle, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function TabNavigation() {
  const newMessage = useNewMessageStore((state) => state.haveNewMessage);

  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { icon: Home, path: `/` },
    { icon: MessageCircle, path: "/chat" },
    { icon: Settings, path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background ">
      <Tabs value={pathname} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-[50px] rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.path}
              value={tab.path}
              className="flex flex-col items-center py-2 data-[state=active]:text-primary relative"
              onClick={() => router.push(tab.path)}>
              <tab.icon className="h-5 w-5" />
              {tab.path === "/chat" && newMessage && (
                <div className="w-2 h-2 rounded-full bg-muted-foreground absolute top-[10px] right-[42%]"></div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
