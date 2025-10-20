// hooks/useGlobalFilter.ts - COM LOGS DETALHADOS
import { create } from 'zustand'

interface GlobalFilterState {
  filtroAtivo: string | null
  tipoFiltro: 'categoria' | 'search' | null
  termoPesquisa: string
  
  setFiltroCategoria: (categoriaId: string | null) => void
  setFiltroPesquisa: (termo: string) => void
  limparFiltros: () => void
}

export const useGlobalFilter = create<GlobalFilterState>((set, get) => ({
  filtroAtivo: null,
  tipoFiltro: null,
  termoPesquisa: '',
  
  setFiltroCategoria: (categoriaId) => {
    const estadoAtual = get()
    console.group('🎯 setFiltroCategoria')
    console.log('Estado ANTES:', estadoAtual)
    console.log('Nova categoria:', categoriaId)
    
    set({ 
      filtroAtivo: categoriaId,
      tipoFiltro: categoriaId ? 'categoria' : null,
      termoPesquisa: ''
    })
    
    // Log do estado DEPOIS (com pequeno delay para o Zustand atualizar)
    setTimeout(() => {
      console.log('Estado DEPOIS:', get())
      console.groupEnd()
    }, 10)
  },
  
  setFiltroPesquisa: (termo) => {
    const estadoAtual = get()
    console.group('🔍 setFiltroPesquisa')
    console.log('Estado ANTES:', estadoAtual)
    console.log('Novo termo:', termo)
    
    set({ 
      termoPesquisa: termo,
      filtroAtivo: termo,
      tipoFiltro: termo ? 'search' : null
    })
    
    setTimeout(() => {
      console.log('Estado DEPOIS:', get())
      console.groupEnd()
    }, 10)
  },
  
  limparFiltros: () => {
    const estadoAtual = get()
    console.group('🗑️ limparFiltros')
    console.log('Estado ANTES:', estadoAtual)
    
    set({ 
      filtroAtivo: null,
      tipoFiltro: null,
      termoPesquisa: ''
    })
    
    setTimeout(() => {
      console.log('Estado DEPOIS:', get())
      console.groupEnd()
    }, 10)
  },
}))