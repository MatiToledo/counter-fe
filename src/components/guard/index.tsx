import { Fragment } from "react";
import { GuardAlert } from "./alert";
import CounterComponent from "./counter";
import { User } from "@/lib/types/models";

export default function GuardComponent({ user }: { user: User }) {
  const branch = user.Branches[0];
  return (
    <Fragment>
      <CounterComponent BranchId={branch.id} maxCapacity={branch.maxCapacity} />
      <GuardAlert></GuardAlert>
    </Fragment>
  );
}
