// components/CategoriaShowcase.tsx
'use client'

import { useCategorias } from '@/hooks/useCategorias'

export default function CategoriaShowcase() {
  const { data: categorias, isLoading } = useCategorias()

  if (isLoading) return null

  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Explore Nossa Biblioteca
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Navegue por categorias cuidadosamente organizadas para editores criativos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias?.slice(0, 6).map((categoria) => (
            <div
              key={categoria.id}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-red-500 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {categoria.nome}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {categoria.descricao}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-red-500 text-sm font-semibold">
                  {categoria.conteudos.length} referências
                </span>
                <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors">
                  Explorar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
            VER TODAS AS CATEGORIAS
          </button>
        </div>
      </div>
    </div>
  )
}