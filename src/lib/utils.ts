import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, toZonedTime } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimestamp(timestamp: string | Date) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(new Date(timestamp), timezone);
  return format(localDate, "HH:mm"); // Ajusta el formato según tus necesidades
}
