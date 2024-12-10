"use client";
import TabNavigation from "@/components/tabNavigation";
import { useUser } from "@/hooks/context/user";
import useSocket from "@/hooks/useSocket";
import { getLSBranchId, getLSToken, saveLSBranchId } from "@/lib/localStorage";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useStatusBar } from "@/hooks/useStatusBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!getLSToken();
  const selectedBranch = getLSBranchId();
  const { socket } = useSocket(selectedBranch, user?.id);
  useStatusBar();
  useEffect(() => {
    if (!isAuthenticated) {
      push("/logIn");
      return;
    }
  }, []);

  return (
    <Fragment>
      {user && socket && (
        <>
          {children}
          <TabNavigation user={user}></TabNavigation>
        </>
      )}
    </Fragment>
  );
}
