"use client";
import FallbackComponent from "@/components/fallback";
import SettingsComponent from "@/components/settings";
import { useUser } from "@/hooks/context/user";
import { Fragment } from "react";

export default function Setting() {
  const { isLoading, user } = useUser();
  return (
    <Fragment>
      {isLoading && <FallbackComponent />}
      {user && (
        <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] text-white flex flex-col items-center p-4 pb-6 ">
          <SettingsComponent user={user} />
        </div>
      )}
    </Fragment>
  );
}
