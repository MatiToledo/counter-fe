import useMetrics from "@/hooks/useMetrics";
import { Branch } from "@/lib/types/models";
import EntriesPerHourCard from "./entries";
import TypeEntrancesCard from "./typeEntrances";
import EarningsPerHourCard from "./earnings";
import PeopleInBarsPerHourCard from "./peopleInBar";

export default function MetricsCards({ branch }: { branch: Branch }) {
  const {
    entries,
    earnings,
    typeEntries,
    peopleInBars,
    peopleInDance,
    params,
  } = useMetrics(branch.id);

  // const handleSelectDate = () => {
  //   updateParam("entriesVs", "2024-11-26");
  // };

  return (
    <div className="min-h-[calc(100vh-101px)] max-h-[calc(100vh-101px)]  overflow-auto text-white flex flex-col items-center p-4 pb-6 gap-4">
      {entries && (
        <EntriesPerHourCard data={entries} maxCapacity={branch.maxCapacity} />
      )}
      {earnings && <EarningsPerHourCard data={earnings} />}
      {typeEntries && <TypeEntrancesCard data={typeEntries} />}
      {peopleInBars && (
        <PeopleInBarsPerHourCard data={peopleInBars} type="peopleInBars" />
      )}
      {peopleInDance && (
        <PeopleInBarsPerHourCard data={peopleInDance} type="peopleInDance" />
      )}
      {/* <div onClick={handleSelectDate}>push</div> */}
    </div>
  );
}
