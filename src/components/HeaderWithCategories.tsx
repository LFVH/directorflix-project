// components/HeaderWithCategories.tsx - COM LOGS
'use client'

import { useState, useRef, useEffect } from 'react'
import { useCategorias } from '@/hooks/useCategorias'
import { useGlobalFilter } from '@/hooks/useGlobalFilter'
import { signOut } from 'next-auth/react'
import SearchBar from './SearchBar'

export default function HeaderWithCategories() {
  const { data: categorias, isLoading } = useCategorias()
  const { 
    filtroAtivo, 
    tipoFiltro, 
    termoPesquisa,
    setFiltroCategoria, 
    setFiltroPesquisa, 
    limparFiltros 
  } = useGlobalFilter()
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 🔥 LOG do estado atual do filtro
  useEffect(() => {
    console.log('📊 Header - Estado do Filtro:', { filtroAtivo, tipoFiltro, termoPesquisa })
  }, [filtroAtivo, tipoFiltro, termoPesquisa])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categoriasPrincipais = categorias?.slice(0, 5) || []
  const categoriasRestantes = categorias?.slice(5) || []

  const handleCategoriaClick = (categoriaId: string) => {
    console.group('🖱️ handleCategoriaClick')
    console.log('Categoria clicada:', categoriaId)
    console.log('Filtro atual:', filtroAtivo)
    console.log('Tipo filtro atual:', tipoFiltro)
    
    if (filtroAtivo === categoriaId && tipoFiltro === 'categoria') {
      console.log('✅ Já está selecionada, limpando...')
      limparFiltros()
    } else {
      console.log('🔄 Aplicando novo filtro...')
      setFiltroCategoria(categoriaId)
    }
    setIsDropdownOpen(false)
    console.groupEnd()
  }

  const handleInicioClick = () => {
    console.log('🏠 Início clicado - limpando filtros')
    limparFiltros()
  }

  const handleSearch = (termo: string) => {
    console.log('🔍 Search alterado:', termo)
    setFiltroPesquisa(termo)
  }

  const handleClearSearch = () => {
    console.log('🧹 SearchBar limpo')
  }

  const handleClearAllFilters = () => {
    limparFiltros()
  }

  if (isLoading) {
    return (
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-red-600 text-2xl font-bold">Director Flix</h1>
            <nav className="hidden md:flex gap-6">
              <span className="text-gray-400">Carregando...</span>
            </nav>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-2xl font-bold">Director Flix</h1>
          
          <nav className="hidden md:flex gap-6 items-center">
            {/* Item Início */}
            <button
              onClick={handleInicioClick}
              className={`${
                !filtroAtivo 
                  ? 'text-white font-semibold' 
                  : 'text-gray-300 hover:text-white'
              } transition-colors whitespace-nowrap`}
            >
              Início
            </button>

            {/* Categorias Principais */}
            {categoriasPrincipais.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => handleCategoriaClick(categoria.id)}
                className={`${
                  filtroAtivo === categoria.id && tipoFiltro === 'categoria'
                    ? 'text-white font-semibold underline decoration-red-600'
                    : 'text-gray-300 hover:text-white'
                } transition-colors whitespace-nowrap`}
              >
                {categoria.nome}
              </button>
            ))}

            {/* Dropdown "..." */}
            {categoriasRestantes.length > 0 && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`text-gray-300 hover:text-white transition-colors p-1 ${
                    tipoFiltro === 'categoria' && categoriasRestantes.some(c => c.id === filtroAtivo)
                      ? 'text-white font-semibold underline decoration-red-600'
                      : ''
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                    <div className="px-3 py-2 border-b border-gray-700">
                      <p className="text-white text-sm font-semibold">Todas as Categorias</p>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto">
                      {categoriasRestantes.map((categoria) => (
                        <button
                          key={categoria.id}
                          onClick={() => handleCategoriaClick(categoria.id)}
                          className={`w-full text-left px-3 py-2 text-sm ${
                            filtroAtivo === categoria.id && tipoFiltro === 'categoria'
                              ? 'bg-red-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          } transition-colors flex justify-between items-center`}
                        >
                          <span>{categoria.nome}</span>
                          <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {categoria.conteudos.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* 🔥 ATUALIZADO: SearchBar controlado */}
          <SearchBar 
            onSearch={handleSearch}
            value={tipoFiltro === 'search' ? termoPesquisa : ''} // 🔥 Sincronizado com estado global
            onClear={handleClearSearch}
          />
          
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

      {/* Indicador de Filtro Ativo */}
      {filtroAtivo && (
        <div className="mt-2 flex items-center gap-2 text-sm text-white">
          <span>Filtrando por:</span>
          <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-medium">
            {tipoFiltro === 'categoria' 
              ? categorias?.find(c => c.id === filtroAtivo)?.nome
              : `"${filtroAtivo}"`
            }
          </span>
          <button
            onClick={handleClearAllFilters} // 🔥 AGORA funciona!
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </header>
  )
}