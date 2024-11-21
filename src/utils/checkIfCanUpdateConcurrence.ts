/* eslint-disable @typescript-eslint/no-explicit-any */
import { Branch } from "@/lib/types/models";
import { DateTime } from "luxon";
import toastError from "./toastError";

export default function checkIfCanUpdateConcurrence(
  type: "entry" | "exit",
  branchTotal: number,
  branch: Branch,
  toast: any
): boolean {
  const { maxCapacity, opening, closing, timeZone } = branch;
  const error = { message: "" };

  if (type === "exit") checkIfCanExit(branchTotal, error);
  if (type === "entry") checkIfCanEntry(branchTotal, maxCapacity, error);
  checkIfBranchIsOpen(opening, closing, timeZone, error);

  if (error.message) {
    toastError(toast, error.message);
    return false;
  }

  return true;
}

function checkIfCanEntry(
  branchTotal: number,
  maxCapacity: number,
  error: { message: string }
): void {
  if (branchTotal >= maxCapacity) {
    error.message = "No hay más capacidad disponible en la sucursal";
  }
}

function checkIfCanExit(branchTotal: number, error: { message: string }): void {
  if (branchTotal === 0) {
    error.message = "No hay nadie en la sucursal";
  }
}

function checkIfBranchIsOpen(
  opening: string,
  closing: string,
  timeZone: string,
  error: { message: string }
): void {
  const now = DateTime.now().setZone(timeZone);
  // const now = DateTime.fromFormat("22:00", "HH:mm", { zone: timeZone });

  const cleanOpening = opening.slice(0, 5);
  const cleanClosing = closing.slice(0, 5);
  const openingTime = DateTime.fromFormat(cleanOpening, "HH:mm", {
    zone: timeZone,
  });
  const closingTime = DateTime.fromFormat(cleanClosing, "HH:mm", {
    zone: timeZone,
  });

  let isOpen;

  if (closingTime < openingTime) {
    // Caso: rango cruza la medianoche
    isOpen = now >= openingTime || now <= closingTime;
  } else {
    // Caso: rango dentro del mismo día
    isOpen = now >= openingTime && now <= closingTime;
  }

  if (!isOpen) {
    error.message =
      "La sucursal esta cerrada, abre nuevamente a las " + cleanOpening;
  }
}
