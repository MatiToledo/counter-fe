"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";

export function DatePickerComponent() {
  const today = DateTime.now().toJSDate();
  const [date, setDate] = React.useState<Date>(today);
  const [isOpen, setIsOpen] = React.useState(false); // Estado para controlar el popover

  const handleSelectDate = (value: Date) => {
    setDate(value);
    setIsOpen(false); // Cerrar el popover al seleccionar una fecha
  };

  const displayDate = date
    ? DateTime.fromJSDate(date).toFormat("dd/MM/yyyy")
    : "Selecciona una fecha";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate} // Usar la función modificada
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
