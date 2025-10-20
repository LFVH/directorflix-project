// app/letsgo/page.tsx - Versão Final
'use client'

import { useCategoriaFilter } from '@/hooks/useCategoriaFilter'
import HeroBanner from '@/components/HeroBanner'
import CategoriasInfiniteScroll from '@/components/CategoriasInfiniteScroll'
import LoadingSpinner from '@/components/LoadingSpinner'
import HeaderWithCategories from '@/components/HeaderWithCategories'
import { useCategorias } from '@/hooks/useCategorias'

export default function DirectorPage() {
  const { data: categoriasBanner, isLoading: bannerLoading } = useCategorias()
  const { categoriaAtiva } = useCategoriaFilter()

  if (bannerLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-black">
      <HeaderWithCategories />
      
      <main className="pt-20">
        {/* Hero Banner - Mostra conteúdo relevante para o filtro */}
        <HeroBanner 
          categorias={categoriasBanner || []}
          categoriaFiltrada={categoriaAtiva}
        />
        
        {/* Lista com scroll infinito E filtro integrado */}
        <CategoriasInfiniteScroll />
      </main>
      
      <footer className="bg-black border-t border-gray-800 py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} Director Flix. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}