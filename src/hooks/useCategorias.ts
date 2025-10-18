// hooks/useCategorias.ts
import { useQuery } from '@tanstack/react-query'
import { CategoriaWithUrls } from '@/types'

export const useCategorias = () => {
  return useQuery({
    queryKey: ['categorias'],
    queryFn: async (): Promise<CategoriaWithUrls[]> => {
      const response = await fetch('/api/letsgo/categorias', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao carregar categorias')
      }
      
      const result = await response.json()
      const categorias = result.data
      
      // Adiciona URLs para os GIFs (prioriza link, depois API)
      return categorias.map((categoria: any) => ({
        ...categoria,
        conteudos: categoria.conteudos.map((conteudo: any) => ({
          ...conteudo,
          url: conteudo.link || `/api/letsgo/conteudos/${conteudo.id}`
        }))
      }))
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}