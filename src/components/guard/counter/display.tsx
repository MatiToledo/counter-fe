import { Progress } from "@/components/ui/progress";

interface DisplayProps {
  total: number;
  entries: number;
  exits: number;
  occupancyPercentage: number;
  maxCapacity: number;
}

export function Display({
  total,
  entries,
  exits,
  occupancyPercentage,
  maxCapacity,
}: DisplayProps) {
  return (
    <>
      <div className="text-9xl font-bold mb-4 mt-8 text-black dark:text-white">
        {total}
      </div>

      <div className="w-full max-w-xs mb-4">
        <Progress value={occupancyPercentage} className="h-2" />
        <div className="flex justify-between text-xs mt-1">
          <span>{total}</span>
          <span>{maxCapacity}</span>
        </div>
      </div>

      <div className="w-full max-w-xs flex justify-between mb-8 mt-2 text-center text-gray-400">
        <div>
          <div>Salidas</div>
          <div className="text-2xl">{exits}</div>
        </div>
        <div>
          <div>Entradas</div>
          <div className="text-2xl">{entries}</div>
        </div>
      </div>
    </>
  );
}
