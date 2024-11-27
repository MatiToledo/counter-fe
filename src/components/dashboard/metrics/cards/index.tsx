import { DatePickerComponent } from "@/components/datePicker";
import useMetrics from "@/hooks/useMetrics";
import { UUID } from "crypto";
import { EarningsPerHours } from "./earningsPerHour";
import { EntranceTypePerHours } from "./perEntranceType";
import { ConcurrenceActualPerHours } from "./perHour";

export default function MetricsCards({
  BranchId,
  maxCapacity,
}: {
  BranchId: UUID;
  maxCapacity: number;
}) {
  const { data, date, setDate, isLoading, setCompareVs, compareVs } =
    useMetrics(BranchId);

  return (
    <>
      <div className="fixed top-[16px] right-[16px] z-10">
        <DatePickerComponent
          date={date}
          setDate={setDate}></DatePickerComponent>
      </div>
      <div className="min-h-[calc(100vh-101px)] max-h-[calc(100vh-101px)] overflow-auto text-white flex flex-col items-center p-4 pb-6 gap-4 ">
        {data && data.entriesPerHour && !isLoading && (
          <ConcurrenceActualPerHours
            identifier="entriesPerHour"
            compareVs={compareVs}
            setCompareVs={setCompareVs}
            data={data.entriesPerHour}
            maxCapacity={maxCapacity}></ConcurrenceActualPerHours>
        )}
        {data && data.earningsPerHour && (
          <EarningsPerHours
            compareVs={compareVs}
            setCompareVs={setCompareVs}
            identifier="earningsPerHour"
            data={data.earningsPerHour}></EarningsPerHours>
        )}
        {data && data.typeEntries && !isLoading && (
          <EntranceTypePerHours
            compareVs={compareVs}
            setCompareVs={setCompareVs}
            identifier="entrancePerHour"
            data={data.typeEntries}></EntranceTypePerHours>
        )}
      </div>
    </>
  );
}
