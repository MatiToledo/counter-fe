import { Fragment } from "react";
import Monitoring from "./monitoring";
import { GuardBarAlert } from "./alert";

export default function GuardBarComponent() {
  return (
    <Fragment>
      <Monitoring />
      <GuardBarAlert />
    </Fragment>
  );
}
