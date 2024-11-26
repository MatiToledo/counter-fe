"use client";
import TabNavigation from "@/components/tabNavigation";
import { useUser } from "@/hooks/context/user";
import useSocket from "@/hooks/useSocket";
import { getLSToken } from "@/lib/localStorage";
import { useSelectedBranchStore } from "@/lib/state";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const { user } = useUser();
  const isAuthenticated = !!getLSToken();
  const setSelectedBranch = useSelectedBranchStore(
    (state) => state.setSelectedBranch
  );
  useSocket(user?.Branches[0].id, user?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      push("/logIn");
      return;
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setSelectedBranch(user.Branches[0].id);
  }, [user]);

  return (
    <Fragment>
      {user && (
        <>
          {children}
          <TabNavigation user={user}></TabNavigation>
        </>
      )}
    </Fragment>
  );
}
