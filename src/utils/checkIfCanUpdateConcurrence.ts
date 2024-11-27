/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from "luxon";

// export default function checkIfCanUpdateConcurrence(
//   type: "entry" | "exit",
//   branchTotal: number,
//   branch: Branch,
//   toast: any
// ): boolean {
//   const { maxCapacity, opening, closing, timeZone } = branch;
//   const error = { message: "" };

//   if (type === "exit") checkIfCanExit(branchTotal, error);
//   if (type === "entry") checkIfCanEntry(branchTotal, maxCapacity, error);
//   checkIfBranchIsOpen(opening, closing, timeZone, error);

//   if (error.message) {
//     toastError(toast, error.message);
//     return false;
//   }

//   return true;
// }

// function checkIfCanEntry(
//   branchTotal: number,
//   maxCapacity: number,
//   error: { message: string }
// ): void {
//   if (branchTotal >= maxCapacity) {
//     error.message = "No hay más capacidad disponible en la sucursal";
//   }
// }

// function checkIfCanExit(branchTotal: number, error: { message: string }): void {
//   if (branchTotal === 0) {
//     error.message = "No hay nadie en la sucursal";
//   }
// }

export function checkIfBranchIsOpen(
  opening: string,
  closing: string,
  timeZone: string
): boolean {
  const now = DateTime.now().setZone(timeZone);

  const cleanOpening = opening.slice(0, 5);
  const cleanClosing = closing.slice(0, 5);

  const openingTime = DateTime.fromFormat(cleanOpening, "HH:mm", {
    zone: timeZone,
  });
  const closingTime = DateTime.fromFormat(cleanClosing, "HH:mm", {
    zone: timeZone,
  });
  const branchHoursPassMidnight = closingTime < openingTime;
  const isAfterOpening = now >= openingTime;
  const isBeforeClosing = now <= closingTime;

  let isOpen;

  if (branchHoursPassMidnight) {
    // Caso: rango cruza la medianoche
    isOpen = isAfterOpening || isBeforeClosing;
  } else {
    // Caso: rango dentro del mismo día
    isOpen = isAfterOpening && isBeforeClosing;
  }

  return isOpen;
}
