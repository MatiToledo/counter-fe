"use client";
import DashboardHomeComponent from "@/components/dashboard/home";
import FallbackComponent from "@/components/fallback";
import GuardDoorComponent from "@/components/guard/door";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Home() {
  const { user, isLoading } = useUser();

  const COMPONENTS_DICTIONARY: Record<string, JSX.Element> = {
    partner: <DashboardHomeComponent user={user} />,
    admin: <DashboardHomeComponent user={user} />,
    guardDoor: <GuardDoorComponent user={user} />,
    guardBar: <GuardDoorComponent user={user} />,
  };
  return (
    <Fragment>
      {isLoading && <FallbackComponent />}
      {user && (
        <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] text-white flex flex-col items-center p-4 pb-6 ">
          {COMPONENTS_DICTIONARY[user.subRole]}
        </div>
      )}
    </Fragment>
  );
}
