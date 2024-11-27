"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/hooks/context/user";
import { useSelectedBranchStore } from "@/lib/state";
import { Branch } from "@/lib/types/models";
import { cn } from "@/lib/utils";
import { checkIfBranchIsOpen } from "@/utils/checkIfCanUpdateConcurrence";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";

export function DatePickerComponent({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const selectedBranch = useSelectedBranchStore(
    (state) => state.selectedBranch
  );

  const { user } = useUser();
  const branch = user.Branches.find((b) => b.id === selectedBranch) as Branch;
  const [isOpen, setIsOpen] = React.useState(false);
  const { opening, closing, timeZone } = branch;
  const handleSelectDate = (value: Date | undefined) => {
    if (value) {
      setDate(value);
    }
    setIsOpen(false);
  };

  const isBranchOpen = checkIfBranchIsOpen(opening, closing, timeZone);
  const displayDate = date
    ? DateTime.fromJSDate(date).toFormat("dd/MM/yyyy")
    : "Hoy";

  return (
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
              : DateTime.now().minus({ days: 2 }).toJSDate(),
          }}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
