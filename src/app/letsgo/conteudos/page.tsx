// src/app/letsgo/conteudos/page.tsx - apenas as alterações necessárias
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

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

export default function ConteudosPage() {
  const [showSearch, setShowSearch] = useState(false)
  const [conteudos, setConteudos] = useState<Conteudo[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null
  })

  useEffect(() => {
    fetchConteudos(1)
  }, [])

  const fetchConteudos = async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/letsgo/conteudos?page=${page}&limit=12`)
      const result = await response.json()
      
      if (result.success) {
        setConteudos(result.data)
        setPagination(result.pagination)
      }
    } catch (error) {
      console.error('Erro ao carregar conteúdos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este conteúdo?')) return

    try {
      const response = await fetch(`/api/letsgo/conteudos/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        // Recarregar a página atual após exclusão
        fetchConteudos(pagination.currentPage)
      } else {
        alert(result.error || 'Erro ao excluir conteúdo')
      }
    } catch (error) {
      alert('Erro ao excluir conteúdo')
    }
  }

  // ... resto do código permanece igual até o final do return ...

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Conteúdos</h1>
          
          <div className="flex items-center gap-4">
            {/* Barra de Pesquisa */}
            <SearchBar onSearchToggle={setShowSearch} />
            
            <Link
              href="/letsgo/conteudos/novo"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Novo Conteúdo
            </Link>
          </div>
        </div>

        {/* Grid de Conteúdos - mantido igual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {conteudos.map((conteudo) => (
            <div key={conteudo.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              {/* Preview do GIF */}
              <div className="h-48 bg-gray-900 flex items-center justify-center">
                <img
                  src={conteudo.link || `/api/letsgo/conteudos/${conteudo.id}`}
                  alt={conteudo.nome}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Informações */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2">
                  {conteudo.nome || conteudo.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3">
                  {conteudo.filename}
                </p>

                {/* Categorias */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {conteudo.categorias.map((categoria) => (
                    <span
                      key={categoria.id}
                      className="bg-gray-700 text-white text-xs px-2 py-1 rounded"
                    >
                      {categoria.nome}
                    </span>
                  ))}
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Link
                    href={`/letsgo/conteudos/editar/${conteudo.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(conteudo.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {conteudos.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">Nenhum conteúdo encontrado</p>
            <p className="mt-2">Crie seu primeiro conteúdo para começar</p>
          </div>
        )}

        {/* Componente de Paginação - NOVO */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => fetchConteudos(pagination.prevPage!)}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Anterior
            </button>

            <div className="flex items-center gap-2">
              <span className="text-white">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
              <span className="text-gray-400">
                ({pagination.totalItems} itens)
              </span>
            </div>

            <button
              onClick={() => fetchConteudos(pagination.nextPage!)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
}