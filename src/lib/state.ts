import { UUID } from "crypto";
import { create } from "zustand";

// Define the store interface
interface StoreState {
  selectedBranchId: UUID;
  setSelectedBranchId: (id: UUID) => void;
  // Add more states as needed
}

// Create the Zustand store
export const useStore = create<StoreState>((set) => ({
  selectedBranchId: "" as UUID, // Default value
  setSelectedBranchId: (id: UUID) => set({ selectedBranchId: id }),
  // Define more state setters here
}));
