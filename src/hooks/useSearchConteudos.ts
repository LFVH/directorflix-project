// hooks/useSearchConteudos.ts
import { useState, useEffect } from 'react'
import { useDebounce } from './useDebounce'

interface Conteudo {
  id: number
  nome: string
  name: string
  filename: string
  mimetype: string
  link?: string
  categorias: Array<{ id: number; nome: string; name: string }>
  createdAt: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

interface SearchResult {
  data: Conteudo[]
  pagination: PaginationInfo
  loading: boolean
  error: string | null
}

interface UseSearchConteudosReturn {
  query: string
  setQuery: (query: string) => void
  results: SearchResult
  loadMore: (page: number) => void
  clearSearch: () => void
}

export const useSearchConteudos = (): UseSearchConteudosReturn => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult>({
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null
    },
    loading: false,
    error: null
  })

  const debouncedQuery = useDebounce(query, 300)

  const searchConteudos = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults(prev => ({ ...prev, data: [], loading: false }))
      return
    }

    setResults(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(
        `/api/letsgo/conteudos/search?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=12`
      )
      const result = await response.json()

      if (result.success) {
        if (page === 1) {
          // Primeira página - substitui os resultados
          setResults({
            data: result.data,
            pagination: result.pagination,
            loading: false,
            error: null
          })
        } else {
          // Páginas seguintes - adiciona aos resultados existentes
          setResults(prev => ({
            data: [...prev.data, ...result.data],
            pagination: result.pagination,
            loading: false,
            error: null
          }))
        }
      } else {
        setResults(prev => ({
          ...prev,
          loading: false,
          error: result.error || 'Erro na busca'
        }))
      }
    } catch (error) {
      setResults(prev => ({
        ...prev,
        loading: false,
        error: 'Erro de conexão'
      }))
    }
  }

  useEffect(() => {
    searchConteudos(debouncedQuery, 1)
  }, [debouncedQuery])

  const loadMore = async (page: number) => {
    if (!debouncedQuery) return
    await searchConteudos(debouncedQuery, page)
  }

  const clearSearch = () => {
    setQuery('')
    setResults({
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null
      },
      loading: false,
      error: null
    })
  }

  return {
    query,
    setQuery,
    results,
    loadMore,
    clearSearch
  }
}