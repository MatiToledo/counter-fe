import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define la interfaz del estado del store
interface StoreState {
  selectedBranchId: string | null; // Usando string o null
  setSelectedBranchId: (id: string | null) => void;
}

// Crea el store de Zustand con persistencia
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedBranchId: null, // Valor por defecto
      setSelectedBranchId: (id: string | null) => set({ selectedBranchId: id }),
    }),
    {
      name: "selectedBranchId", // Nombre del almacenamiento
    }
  )
);
