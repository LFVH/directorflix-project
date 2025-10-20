// components/SearchBar.tsx - Versão Corrigida
'use client'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useSearchConteudos } from '@/hooks/useSearchConteudos'
import Link from 'next/link'

interface SearchBarProps {
  onSearchToggle?: (isOpen: boolean) => void
  onResultClick?: () => void
  autoFocus?: boolean
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearchToggle, onResultClick, autoFocus = false }, ref) => {
    const { query, setQuery, results, loadMore, clearSearch } = useSearchConteudos()
    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Expõe o inputRef para o componente pai
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    // Foco automático quando o componente monta
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus()
      }
    }, [autoFocus])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          onSearchToggle?.(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onSearchToggle])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      
      if (value.length >= 2) {
        setIsOpen(true)
        onSearchToggle?.(true)
      } else {
        setIsOpen(false)
        onSearchToggle?.(false)
      }
    }

    const handleClear = () => {
      setQuery('')
      clearSearch()
      setIsOpen(false)
      onSearchToggle?.(false)
      inputRef.current?.focus()
    }

    const handleResultClick = () => {
      setIsOpen(false)
      onSearchToggle?.(false)
      onResultClick?.() // Notifica o pai que um resultado foi clicado
    }

    const handleLoadMore = () => {
      if (results.pagination.hasNextPage) {
        loadMore(results.pagination.currentPage + 1)
      }
    }

    return (
      <div ref={searchRef} className="relative">
        {/* Barra de Pesquisa */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Buscar conteúdos e categorias..."
            className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors text-lg"
            autoFocus={autoFocus}
          />
          
          {/* Ícone de Lupa */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Botão Limpar */}
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown de Resultados */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {/* Loading */}
            {results.loading && (
              <div className="p-4 text-center text-gray-400">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
                <p className="mt-2">Buscando...</p>
              </div>
            )}

            {/* Erro */}
            {results.error && (
              <div className="p-4 text-center text-red-400">
                <p>{results.error}</p>
              </div>
            )}

            {/* Resultados */}
            {!results.loading && !results.error && (
              <>
                {results.data.length === 0 && query.length >= 2 ? (
                  <div className="p-4 text-center text-gray-400">
                    Nenhum resultado encontrado para &quot;{query}&quot;
                  </div>
                ) : (
                  <>
                    {/* Header com contagem */}
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-sm text-gray-400">
                        {results.pagination.totalItems > 0 
                          ? `${results.pagination.totalItems} resultado(s) encontrado(s)`
                          : 'Digite pelo menos 2 caracteres'
                        }
                      </p>
                    </div>

                    {/* Lista de resultados */}
                    <div className="max-h-80 overflow-y-auto">
                      {results.data.map((conteudo) => (
                        <Link
                          key={conteudo.id}
                          href={`/letsgo/conteudos/editar/${conteudo.id}`}
                          onClick={handleResultClick}
                          className="block p-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded overflow-hidden">
                              <img
                                src={conteudo.link || `/api/letsgo/conteudos/${conteudo.id}`}
                                alt={conteudo.nome}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Informações */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold truncate">
                                {conteudo.nome || conteudo.name}
                              </h4>
                              <p className="text-gray-400 text-sm truncate">
                                {conteudo.filename}
                              </p>
                              
                              {/* Categorias */}
                              <div className="flex flex-wrap gap-1 mt-1">
                                {conteudo.categorias.map((categoria) => (
                                  <span
                                    key={categoria.id}
                                    className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                                  >
                                    {categoria.nome}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Ver mais resultados */}
                    {results.pagination.hasNextPage && (
                      <div className="p-3 border-t border-gray-700">
                        <button
                          onClick={handleLoadMore}
                          className="w-full text-center text-red-400 hover:text-red-300 transition-colors text-sm font-semibold"
                        >
                          Ver mais resultados
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export default SearchBar