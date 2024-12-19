"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useBranchStatus from "@/hooks/useBranchStatus";
import useHandleParams from "@/hooks/useHandleParams";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { DateTime } from "luxon";
import * as React from "react";
import { useState } from "react";

export function DatePickerComponent({ param }: { param: string }) {
  const [date, setDate] = useState<Date>();
  const { updateParam, removeParam } = useHandleParams();
  const { isBranchOpen } = useBranchStatus();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectDate = (value: Date | undefined) => {
    if (value) {
      const stringDate = DateTime.fromJSDate(value).toFormat("yyyy-MM-dd");
      updateParam(param, stringDate);
      setDate(value);
    }
    setIsOpen(false);
  };

  function handleDelete() {
    removeParam(param);
    setDate(undefined);
  }

  const displayDate = date
    ? DateTime.fromJSDate(date).toFormat("dd/MM/yyyy")
    : "Hoy";

  return (
    <div className="flex items-center gap-2">
      {date && (
        <RotateCcw
          onClick={handleDelete}
          className="h-4 w-4 text-muted-foreground"></RotateCcw>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-auto justify-start text-left font-normal hover:bg-transparent",
              !date && "text-muted-foreground"
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            locale={es}
            mode="single"
            selected={date}
            disabled={{
              after: isBranchOpen
                ? new Date()
                : DateTime.now()
                    .minus({ days: param === "date" ? 1 : 2 })
                    .toJSDate(),
            }}
            onSelect={handleSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
