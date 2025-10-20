// components/CategoriasInfiniteScroll.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useCategoriasInfinite } from '@/hooks/useCategoriasInfinite'
import CarrosselCategoria from './CarrosselCategoria'
import { useCategoriaFilter } from '@/hooks/useCategoriaFilter'

export default function CategoriasInfiniteScroll() {
  const { categorias, loadMore, hasMore, loading, categoriaAtiva } = useCategoriasInfinite()
  const { limparFiltro } = useCategoriaFilter()
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Scroll infinito apenas quando NÃO há filtro ativo
  useEffect(() => {
    if (categoriaAtiva || !hasMore || loading) return

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
  }, [hasMore, loading, loadMore, categoriaAtiva])

  // Mensagem quando não há conteúdos
  if (!loading && categorias.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-xl mb-4">
          {categoriaAtiva ? 'Nenhum conteúdo encontrado nesta categoria.' : 'Nenhuma categoria encontrada.'}
        </p>
        {categoriaAtiva && (
          <button
            onClick={limparFiltro}
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
      {/* Lista de Categorias */}
      {categorias.map((categoria) => (
        <CarrosselCategoria 
          key={categoria.id} 
          categoria={categoria} 
        />
      ))}
      
      {/* Loading e Trigger para Scroll Infinito */}
      {categoriaAtiva ? (
        // Com filtro - mostra apenas loading se necessário
        loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        )
      ) : (
        // Sem filtro - scroll infinito
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

      {/* Mensagem do fim da lista */}
      {!hasMore && categorias.length > 0 && !categoriaAtiva && (
        <div className="text-center py-8">
          <p className="text-gray-400">
            Você viu todas as {categorias.length} categorias!
          </p>
        </div>
      )}
    </section>
  )
}