// hooks/useCategoriaFilter.ts
import { create } from 'zustand'

interface CategoriaFilterState {
  categoriaAtiva: string | null
  setCategoriaAtiva: (categoria: string | null) => void
  limparFiltro: () => void
}

export const useCategoriaFilter = create<CategoriaFilterState>((set) => ({
  categoriaAtiva: null,
  setCategoriaAtiva: (categoria) => set({ categoriaAtiva: categoria }),
  limparFiltro: () => set({ categoriaAtiva: null }),
}))