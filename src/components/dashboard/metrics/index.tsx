"use client";
import { useSelectedBranchStore } from "@/lib/state";
import { Branch, User } from "@/lib/types/models";
import DashboardHeader from "../header";
import MetricsCards from "./cards";

export default function MetricsComponent({ user }: { user: User }) {
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );
  const branch = user.Branches.find((b) => b.id === selectedBranch);

  return (
    <>
      <DashboardHeader branches={user.Branches}></DashboardHeader>
      <MetricsCards branch={branch as Branch}></MetricsCards>
    </>
  );
}
