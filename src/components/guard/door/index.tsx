import { Fragment } from "react";
import { GuardAlert } from "./alert";
import CounterComponent from "./counter";
import { User } from "@/lib/types/models";

export default function GuardDoorComponent({ user }: { user: User }) {
  const branch = user.Branches[0];
  return (
    <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] text-white flex flex-col items-center p-4 pb-6">
      <CounterComponent
        BranchId={branch.id}
        maxCapacity={branch.maxCapacity}
        UserId={user.id}
      />
      <GuardAlert></GuardAlert>
    </div>
  );
}
