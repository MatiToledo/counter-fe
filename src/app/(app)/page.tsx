"use client";
import DashboardHomeComponent from "@/components/app/dashboard/home";
import FallbackComponent from "@/components/common/fallback";
import GuardBarComponent from "@/components/app/guard/bar";
import GuardDoorComponent from "@/components/app/guard/door";
import { useUser } from "@/hooks/context/user";
import useListenMessages from "@/hooks/useListenMessages";
import { Fragment } from "react";

export default function Home() {
  const { user, isLoading } = useUser();

  useListenMessages(user.id);
  const COMPONENTS_DICTIONARY: Record<string, JSX.Element> = {
    partner: <DashboardHomeComponent user={user} />,
    admin: <DashboardHomeComponent user={user} />,
    guardDoor: <GuardDoorComponent user={user} />,
    guardBar: <GuardBarComponent user={user} />,
  };

  return (
    <Fragment>
      {isLoading && <FallbackComponent />}
      {user && !isLoading && <>{COMPONENTS_DICTIONARY[user.subRole]}</>}
    </Fragment>
  );
}
