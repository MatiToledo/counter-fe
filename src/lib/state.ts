import { UUID } from "crypto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define la interfaz del estado del store
interface StoreState {
  selectedBranchId: UUID; // Usando string o null
  setSelectedBranchId: (id: UUID) => void;
}

// Crea el store de Zustand con persistencia
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedBranchId: null as unknown as UUID, // Valor por defecto
      setSelectedBranchId: (id: UUID) => set({ selectedBranchId: id }),
    }),
    {
      name: "selectedBranchId", // Nombre del almacenamiento
    }
  )
);
