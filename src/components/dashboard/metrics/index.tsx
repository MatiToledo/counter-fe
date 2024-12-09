"use client";
import { Branch, User } from "@/lib/types/models";
import DashboardHeader from "../header";
import MetricsCards from "./cards";
import { getLSBranchId } from "@/lib/localStorage";

export default function MetricsComponent({ user }: { user: User }) {
  const selectedBranch = getLSBranchId();
  const branch = user.Branches.find((b) => b.id === selectedBranch);

  return (
    <>
      <DashboardHeader branches={user.Branches}></DashboardHeader>
      <MetricsCards branch={branch as Branch}></MetricsCards>
    </>
  );
}
