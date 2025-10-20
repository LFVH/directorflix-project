// hooks/useCategoriasInfinite.ts
import { useState, useEffect } from 'react'
import { useCategoriaFilter } from './useCategoriaFilter'
import { CategoriaWithUrls } from '@/types'

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const useCategoriasInfinite = () => {
  const { categoriaAtiva } = useCategoriaFilter()
  const [categorias, setCategorias] = useState<CategoriaWithUrls[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  // Reset quando o filtro muda
  useEffect(() => {
    setCategorias([])
    setPage(1)
    setHasMore(true)
    setInitialLoad(true)
  }, [categoriaAtiva])

  const loadMore = async (isInitialLoad = false) => {
    if (loading || (!hasMore && !isInitialLoad)) return
    
    setLoading(true)
    try {
      // Se há filtro ativo, busca apenas aquela categoria
      const url = categoriaAtiva 
        ? `/api/letsgo/categorias/${categoriaAtiva}`
        : `/api/letsgo/categorias?page=${page}&limit=3` // 3 categorias por vez

      const response = await fetch(url)
      const result = await response.json()
      
      if (result.success) {
        if (categoriaAtiva) {
          // Filtro ativo - mostra apenas a categoria filtrada
          setCategorias([result.data])
          setHasMore(false) // Não tem mais páginas com filtro
        } else {
          // Sem filtro - scroll infinito normal
          if (isInitialLoad || page === 1) {
            setCategorias(result.data)
          } else {
            setCategorias(prev => [...prev, ...result.data])
          }
          setHasMore(result.pagination?.hasNextPage || false)
          setPage(prev => prev + 1)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }

  // Carrega dados iniciais quando o filtro muda
  useEffect(() => {
    if (initialLoad) {
      loadMore(true)
    }
  }, [categoriaAtiva, initialLoad])

  return { 
    categorias: categorias.map((categoria: any) => ({
        ...categoria,
        conteudos: categoria.conteudos.map((conteudo: any) => ({
          ...conteudo,
          url: conteudo.link || `/api/letsgo/conteudos/${conteudo.id}`
        }))
      })), 
    loadMore: () => loadMore(false), 
    hasMore, 
    loading,
    categoriaAtiva 
  }
}