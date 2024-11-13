"use client";
import SettingsComponent from "@/components/settings";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Setting() {
  const context = useUser();
  return (
    <Fragment>
      {context.loading ? (
        <div>Loading...</div>
      ) : (
        <SettingsComponent user={context.user} />
      )}
    </Fragment>
  );
}
