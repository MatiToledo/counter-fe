import { UUID } from "crypto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NewMessageStore = {
  haveNewMessage: boolean;
  setHaveNewMessage: (haveNewMessage: boolean) => void;
};

export const useNewMessageStore = create(
  persist<NewMessageStore>(
    (set) => ({
      haveNewMessage: false,
      setHaveNewMessage: (haveNewMessage: boolean) =>
        set({ haveNewMessage: haveNewMessage }),
    }),
    {
      name: "new-message-storage",
    }
  )
);

type SelectedBranchStore = {
  selectedBranch: UUID;
  setSelectedBranch: (selectedBranch: UUID) => void;
};

export const useSelectedBranchStore = create(
  persist<SelectedBranchStore>(
    (set) => ({
      selectedBranch: "" as UUID,
      setSelectedBranch: (selectedBranch: UUID) =>
        set({ selectedBranch: selectedBranch }),
    }),
    {
      name: "selected-branch-storage",
    }
  )
);
