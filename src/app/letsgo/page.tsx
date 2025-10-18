// app/page.tsx
'use client'

import { useCategorias } from '@/hooks/useCategorias'
import HeroBanner from '@/components/HeroBanner'
import CarrosselCategoria from '@/components/CarrosselCategoria'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function DirectorPage() {
  const { data: categorias, isLoading, error } = useCategorias()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Erro ao carregar conteúdo</h1>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    )
  }

  if (!categorias || categorias.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Nenhum conteúdo disponível</h1>
          <p className="text-gray-400">Adicione categorias e conteúdos para começar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-red-600 text-2xl font-bold">Director Flix</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Início</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              🔍
            </button>
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="pt-16">
        {/* Hero Banner */}
        <HeroBanner categorias={categorias} />

        {/* Lista de Categorias */}
        <section className="py-8 space-y-12">
          {categorias.map((categoria) => (
            <CarrosselCategoria 
              key={categoria.id} 
              categoria={categoria} 
            />
          ))}
        </section>
      </main>

      {/* Footer */}
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