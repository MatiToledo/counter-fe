/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useLongPress } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import DialogEntry from "./dialog";

interface ButtonsProps {
  onExit: () => void;
  onEntry: (type?: string) => void;
  showEntryTypes: boolean;
  setShowEntryTypes: (show: boolean) => void;
}

export function Buttons({
  onExit,
  onEntry,
  showEntryTypes,
  setShowEntryTypes,
}: ButtonsProps) {
  const [isLongPressing, setIsLongPressing] = useState(false);

  const longPressProps = useLongPress(() => {
    setShowEntryTypes(true);
  });

  useEffect(() => {
    if (isLongPressing) {
      const timer = setTimeout(() => {
        setShowEntryTypes(true);
        setIsLongPressing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLongPressing]);

  return (
    <>
      <div className="w-full max-w-xs flex justify-between gap-4">
        <Button
          className="flex-1 h-24 text-4xl bg-primary hover:bg-primary/90"
          onClick={onExit}>
          -
        </Button>
        <Button
          {...longPressProps}
          onMouseDown={() => setIsLongPressing(true)}
          onMouseUp={() => setIsLongPressing(false)}
          onMouseLeave={() => setIsLongPressing(false)}
          onTouchStart={() => setIsLongPressing(true)}
          onTouchEnd={() => setIsLongPressing(false)}
          className={`flex-1 h-24 text-4xl bg-primary hover:bg-primary/90 relative overflow-hidden ${
            isLongPressing ? "scale-95" : ""
          }`}
          onClick={() => !isLongPressing && onEntry()}>
          <span className="absolute inset-0 flex items-center justify-center">
            +
          </span>
          <span
            className={`absolute inset-0 bg-black transition-opacity duration-500 flex items-center justify-center text-sm ${
              isLongPressing ? "opacity-50" : "opacity-0"
            }`}>
            Mantén para opciones
          </span>
        </Button>
      </div>

      <DialogEntry
        showEntryTypes={showEntryTypes}
        setShowEntryTypes={setShowEntryTypes}
        onEntry={onEntry}
      />
    </>
  );
}
