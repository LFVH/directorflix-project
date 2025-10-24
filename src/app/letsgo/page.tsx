'use client'

import { useGlobalFilter } from '@/hooks/useGlobalFilter'
import HeroBanner from '@/components/HeroBanner'
import ConteudosFiltradosComScroll from '@/components/ConteudosFiltradosComScroll'
import LoadingSpinner from '@/components/LoadingSpinner'
import HeaderWithCategories from '@/components/HeaderWithCategories'
import { useCategorias } from '@/hooks/useCategorias'

export default function DirectorPage() {
  const { data: categorias, isLoading: bannerLoading } = useCategorias()
  const { filtroAtivo, tipoFiltro, termoPesquisa } = useGlobalFilter()

  if (bannerLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-black">
      <HeaderWithCategories />
      
      <main className="pt-20">
        <HeroBanner 
          categorias={categorias || []}
          categoriaFiltrada={tipoFiltro === 'categoria' ? filtroAtivo : null}
        />
        
        <ConteudosFiltradosComScroll 
          categorias={categorias || []}
          filtroAtivo={filtroAtivo}
          tipoFiltro={tipoFiltro}
          termoPesquisa={termoPesquisa}
        />
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