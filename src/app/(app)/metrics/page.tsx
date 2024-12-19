"use client";
import MetricsComponent from "@/components/app/dashboard/metrics";
import FallbackComponent from "@/components/common/fallback";
import { useUser } from "@/hooks/context/user";
import useListenMessages from "@/hooks/useListenMessages";
import { Fragment } from "react";

export default function Metrics() {
  const { isLoading, user } = useUser();
  useListenMessages(user.id);
  return (
    <Fragment>
      {isLoading && <FallbackComponent />}
      {user && <MetricsComponent user={user} />}
    </Fragment>
  );
}
