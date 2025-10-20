// components/ConteudosFiltrados.tsx
'use client'

import { CategoriaWithUrls } from '@/types'

interface ConteudosFiltradosProps {
  categorias: CategoriaWithUrls[]
  filtroAtivo: string | null
  tipoFiltro: 'categoria' | 'search' | null
  termoPesquisa: string
}

export default function ConteudosFiltrados({ 
  categorias, 
  filtroAtivo, 
  tipoFiltro, 
  termoPesquisa 
}: ConteudosFiltradosProps) {
  
  // Lógica de filtragem global
  const getConteudosFiltrados = () => {
    if (!filtroAtivo) {
      // Sem filtro - mostra todas as categorias normalmente
      return categorias
    }

    if (tipoFiltro === 'categoria') {
      // Filtro por categoria - mostra apenas a categoria selecionada
      const categoriaFiltrada = categorias.find(c => c.id === filtroAtivo)
      return categoriaFiltrada ? [categoriaFiltrada] : []
    }

    if (tipoFiltro === 'search') {
      // Filtro por busca - mostra conteúdos que batem com a busca, agrupados por categoria
      const termoLower = termoPesquisa.toLowerCase()
      
      const categoriasComBusca = categorias.map(categoria => ({
        ...categoria,
        conteudos: categoria.conteudos.filter(conteudo => 
          conteudo.nome?.toLowerCase().includes(termoLower) ||
          conteudo.name?.toLowerCase().includes(termoLower) ||
          conteudo.filename.toLowerCase().includes(termoLower) ||
          categoria.nome?.toLowerCase().includes(termoLower) ||
          categoria.name?.toLowerCase().includes(termoLower)
        )
      })).filter(categoria => categoria.conteudos.length > 0)

      return categoriasComBusca
    }

    return categorias
  }

  const conteudosFiltrados = getConteudosFiltrados()

  if (filtroAtivo && conteudosFiltrados.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-xl mb-4">
          {tipoFiltro === 'search' 
            ? `Nenhum resultado encontrado para "${termoPesquisa}"`
            : 'Nenhum conteúdo encontrado'
          }
        </p>
      </div>
    )
  }

  return (
    <section className="py-8 space-y-12">
      {conteudosFiltrados.map((categoria) => (
        <div key={categoria.id} className="relative group">
          <h2 className="text-2xl font-bold text-white mb-4 px-8">
            {categoria.nome}
            {tipoFiltro === 'search' && (
              <span className="text-gray-400 text-lg ml-2">
                ({categoria.conteudos.length} resultados)
              </span>
            )}
          </h2>
          
          {/* Carrossel da categoria - pode ser o mesmo componente otimizado */}
          <div className="relative">
            <div className="flex gap-4 px-8 overflow-x-auto scrollbar-hide scroll-smooth">
              {categoria.conteudos.map((conteudo) => (
                <div
                  key={conteudo.id}
                  className="flex-none w-64 h-36 transition-all duration-300 transform hover:scale-105 hover:z-10 flex-shrink-0"
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-800 group/item">
                    <img
                      src={conteudo.url}
                      alt={conteudo.filename}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-sm font-medium truncate">
                          {conteudo.filename.replace('.gif', '')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}