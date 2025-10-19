'use client'

import { useCategorias } from '@/hooks/useCategorias'
import HeroBanner from '@/components/HeroBanner'
import CarrosselCategoria from '@/components/CarrosselCategoria'
import LoadingSpinner from '@/components/LoadingSpinner'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import SearchBar from '@/components/SearchBar'

export default function DirectorPage() {
  const { data: categorias, isLoading, error } = useCategorias()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

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
              <a href="/letsgo" className="text-white hover:text-gray-300 transition-colors">Início</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Botão de Pesquisa que abre modal */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Botão de sair direto */}
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Modal de Pesquisa */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-2xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">Buscar Conteúdos</h3>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <SearchBar 
                onSearchToggle={(open) => {
                  if (!open) {
                    setTimeout(() => setIsSearchModalOpen(false), 300)
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

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