"use client";
import GuardComponent from "@/components/guard";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Guard() {
  const context = useUser();
  return (
    <Fragment>
      {context.loading ? (
        <p>Loading...</p>
      ) : (
        <GuardComponent user={context.user} />
      )}
    </Fragment>
  );
}
