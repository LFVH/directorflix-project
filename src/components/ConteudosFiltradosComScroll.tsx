// components/ConteudosFiltradosComScroll.tsx - ATUALIZADO
'use client'

import { useEffect, useRef } from 'react'
import { CategoriaWithUrls } from '@/types'
import { useConteudosFiltrados } from '@/hooks/useConteudosFiltrados'
import CarrosselCategoria from './CarrosselCategoria'
import { useGlobalFilter } from '@/hooks/useGlobalFilter'

interface ConteudosFiltradosComScrollProps {
  categorias: CategoriaWithUrls[]
  filtroAtivo: string | null
  tipoFiltro: 'categoria' | 'search' | null
  termoPesquisa: string
}

export default function ConteudosFiltradosComScroll({ 
  categorias, 
  filtroAtivo, 
  tipoFiltro, 
  termoPesquisa 
}: ConteudosFiltradosComScrollProps) {
  const { limparFiltros } = useGlobalFilter()
  const { 
    categoriasFiltradas, 
    loadMore, 
    hasMore, 
    loading 
  } = useConteudosFiltrados({
    categorias,
    filtroAtivo,
    tipoFiltro,
    termoPesquisa
  })

  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // 🔥 DETERMINAR LAYOUT: lista quando há apenas 1 categoria (filtro ativo ou busca)
  const shouldUseListLayout = categoriasFiltradas.length === 1 && 
    (tipoFiltro === 'categoria' || tipoFiltro === 'search')

  useEffect(() => {
    if (filtroAtivo || !hasMore || loading) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [hasMore, loading, loadMore, filtroAtivo])

  if (!loading && categoriasFiltradas.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-xl mb-4">
          {tipoFiltro === 'search' 
            ? `Nenhum resultado encontrado para "${termoPesquisa}"`
            : tipoFiltro === 'categoria'
            ? 'Nenhum conteúdo encontrado nesta categoria.'
            : 'Nenhuma categoria encontrada.'
          }
        </p>
        {filtroAtivo && (
          <button
            onClick={limparFiltros}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Ver Todas as Categorias
          </button>
        )}
      </div>
    )
  }

  return (
    <section className="py-8 space-y-12">
      {/* Header com informações do filtro */}
      {tipoFiltro === 'search' && categoriasFiltradas.length > 0 && (
        <div className="px-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Resultados para "{termoPesquisa}"
          </h2>
          <p className="text-gray-400">
            {categoriasFiltradas.reduce((total, cat) => total + cat.conteudos.length, 0)} 
            conteúdo(s) encontrado(s)
          </p>
        </div>
      )}

      {/* 🔥 RENDERIZAÇÃO CONDICIONAL: Lista ou Carrossel */}
      {categoriasFiltradas.map((categoria, index) => (
        <CarrosselCategoria 
          key={`${categoria.id}-${index}-${tipoFiltro}-${filtroAtivo}`}
          categoria={categoria}
          layout={shouldUseListLayout ? 'lista' : 'carrossel'} // 🔥 Layout dinâmico
        />
      ))}
      
      {/* Loading e Scroll Infinito */}
      {filtroAtivo ? (
        loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        )
      ) : (
        <>
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          )}
          
          {hasMore && !loading && (
            <div ref={loadMoreRef} className="h-4"></div>
          )}
        </>
      )}

      {!hasMore && categoriasFiltradas.length > 0 && !filtroAtivo && (
        <div className="text-center py-8">
          <p className="text-gray-400">
            OK Let's go.
          </p>
        </div>
      )}
    </section>
  )
}