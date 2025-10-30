'use client'

import { ConteudoWithUrl } from '@/types'

interface ConteudoItemProps {
  conteudo: ConteudoWithUrl
  layout?: 'carrossel' | 'lista'
}

export default function ConteudoItem({ conteudo, layout = 'carrossel' }: ConteudoItemProps) {
  const handleClick = () => {
    if (conteudo.linkext) {
      window.open(conteudo.linkext, '_blank', 'noopener,noreferrer')
    }
  }

  // Estilos base para ambos os layouts
  const baseStyles = `
    relative rounded-lg overflow-hidden shadow-lg bg-gray-800 group/item
    transition-all duration-500 ease-out transform
    hover:scale-105 hover:z-10 cursor-pointer
    ${conteudo.linkext ? 'hover:shadow-red-500/20' : ''}
  `

  // Estilos específicos para cada layout
  const layoutStyles = {
    carrossel: 'flex-none w-64 h-36',
    lista: 'w-full aspect-video max-w-md mx-auto'
  }

  return (
    <div 
      className={`${baseStyles} ${layoutStyles[layout]}`}
      onClick={handleClick}
      title={conteudo.linkext ? `Abrir ${conteudo.linkext} em nova aba` : 'Sem link externo'}
    >
      <img
        src={conteudo.url}
        alt={conteudo.filename}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-110"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = '/placeholder-image.jpg'
        }}
      />
      
      {/* Overlay com informações */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500 ease-out">
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-sm font-medium truncate transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-300">
            {conteudo.filename.replace('.gif', '')}
          </p>
          <p className="text-gray-300 text-xs truncate transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-400">
            {conteudo.nome || conteudo.name}
          </p>
          
          {/* Indicador de link externo */}
          {conteudo.linkext && (
            <div className="flex items-center gap-1 mt-1 transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-500">
              <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-red-400 text-xs">Abrir link externo</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}