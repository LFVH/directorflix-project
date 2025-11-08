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
    ${conteudo.isTrend ? 'ring-2 ring-orange-500 ring-opacity-80' : ''}
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
      {/* Efeito de chamas para conteúdos em alta */}
      {conteudo.isTrend && (
        <>
          {/* Chamas animadas nos cantos - CORRIGIDO: z-index e visibilidade */}
          <div className="absolute -top-1 -left-1 w-5 h-5 text-orange-500 animate-bounce z-20">
            <FireIcon />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 text-orange-500 animate-bounce z-20" style={{ animationDelay: '0.3s' }}>
            <FireIcon />
          </div>
          <div className="absolute -bottom-1 -left-1 w-5 h-5 text-orange-500 animate-bounce z-20" style={{ animationDelay: '0.6s' }}>
            <FireIcon />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 text-orange-500 animate-bounce z-20" style={{ animationDelay: '0.9s' }}>
            <FireIcon />
          </div>

          {/* Fogo adicional no bottom right (maior e mais destacado) */}
          <div className="absolute bottom-0 right-0 w-8 h-8 text-red-500 z-20">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></div>
            <FireIcon />
          </div>

          {/* Efeito de brilho pulsante - CORRIGIDO: z-index mais baixo */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 animate-pulse z-0" />
          
          {/* Partículas flutuantes - CORRIGIDO: cores mais fortes e z-index */}
          <div className="absolute inset-0 overflow-hidden z-10">
            <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-90" />
            <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-orange-400 rounded-full animate-float opacity-80" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-6 left-8 w-1 h-1 bg-red-400 rounded-full animate-float opacity-90" style={{ animationDelay: '2s' }} />
          </div>

          {/* Badge "EM ALTA" com pulsação mais rápida - CORRIGIDO: z-index alto */}
          <div className="absolute top-2 left-2 z-30">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse-fast">
              🔥 EM ALTA
            </div>
          </div>
        </>
      )}

      <img
        src={conteudo.url}
        alt={conteudo.filename}
        className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-110 ${
          conteudo.isTrend ? 'brightness-110' : ''
        }`}
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = '/placeholder-image.jpg'
        }}
      />
      
      {/* Overlay com informações - CORRIGIDO: z-index mais baixo que os fogos */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500 ease-out z-10">
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

// Componente do ícone de fogo - CORRIGIDO: SVG mais visível
function FireIcon() {
  return (
    <svg 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      className="w-full h-full drop-shadow-lg"
    >
      <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.64-.12-.06-.05-.1-.1-.15-.17-.18-.26-.28-.58-.24-.9.03-.2.12-.4.27-.56.57-.62 1.06-1.33 1.47-2.07.36-.66.56-1.41.58-2.18.02-.77-.14-1.53-.46-2.21-.47-.98-1.26-1.81-2.22-2.33-1.02-.55-2.2-.8-3.38-.7-1.18.1-2.31.53-3.27 1.2-1.92 1.34-3.03 3.61-2.98 5.97.05 2.37 1.26 4.57 3.18 5.88.56.32 1.18.56 1.82.73.26.07.53.12.8.16.63.1 1.27.1 1.9 0 .26-.04.52-.09.77-.16.64-.17 1.26-.41 1.82-.73 1.92-1.31 3.13-3.51 3.18-5.88.01-.26-.02-.52-.06-.78z"/>
    </svg>
  )
}