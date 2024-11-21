"use client";
import { Branch, User } from "@/lib/types/models";
import { useState } from "react";
import UsersDashboard from "../metrics/users";
import DashboardHeader from "../header";

export default function DashboardHomeComponent({ user }: { user: User }) {
  const [BranchId, setBranchId] = useState(user.Branches[0].id);

  const branch = user.Branches.find((b) => b.id === BranchId);

  return (
    <div className="h-screen w-full">
      <DashboardHeader
        branches={user.Branches}
        BranchId={BranchId}
        setBranchId={setBranchId}></DashboardHeader>
      <div className="p-4">
        <UsersDashboard
          branch={branch as Branch}
          UserId={user.id}></UsersDashboard>
      </div>
    </div>
  );
}
