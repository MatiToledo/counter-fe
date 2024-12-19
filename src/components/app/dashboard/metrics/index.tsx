"use client";
import { useStore } from "@/lib/state";
import { Branch, User } from "@/lib/types/models";
import DashboardHeader from "../header";
import MetricsCards from "./cards";

export default function MetricsComponent({ user }: { user: User }) {
  const { selectedBranchId } = useStore();
  const branch = user.Branches.find((b) => b.id === selectedBranchId);

  return (
    <>
      <DashboardHeader branches={user.Branches}></DashboardHeader>
      <MetricsCards branch={branch as Branch}></MetricsCards>
    </>
  );
}
