"use client";
import MetricsComponent from "@/components/dashboard/metrics";
import FallbackComponent from "@/components/fallback";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Metrics() {
  const { isLoading, user } = useUser();
  return (
    <Fragment>
      {isLoading && <FallbackComponent />}
      {user && <MetricsComponent user={user} />}
    </Fragment>
  );
}
