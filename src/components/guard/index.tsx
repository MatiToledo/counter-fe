import { Fragment } from "react";
import { GuardAlert } from "./alert";
import CounterComponent from "./counter";

export default function GuardComponent() {
  return (
    <Fragment>
      <CounterComponent />
      <GuardAlert></GuardAlert>
    </Fragment>
  );
}
