"use client";
import DashboardHomeComponent from "@/components/dashboard/home";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Dashboard() {
  const context = useUser();

  return (
    <Fragment>
      {context.loading ? (
        <div>Loading...</div>
      ) : (
        <DashboardHomeComponent user={context.user} />
      )}
    </Fragment>
  );
}
