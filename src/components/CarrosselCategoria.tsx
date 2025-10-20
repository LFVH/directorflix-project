// components/CarrosselCategoria.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { CategoriaWithUrls } from '@/types'

interface CarrosselCategoriaProps {
  categoria: CategoriaWithUrls
}

export default function CarrosselCategoria({ categoria }: CarrosselCategoriaProps) {
  const carrosselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollRequestRef = useRef<number>(0)

  // Configurações de scroll
  const SCROLL_DURATION = 600 // ms - mais longo para mais suavidade
  const SCROLL_AMOUNT = 400 // pixels por scroll

  // Função de easing para transição mais suave
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  const smoothScroll = (targetScroll: number) => {
    if (!carrosselRef.current || isScrolling) return

    const carrossel = carrosselRef.current
    const startScroll = carrossel.scrollLeft
    const distance = targetScroll - startScroll
    const startTime = performance.now()

    setIsScrolling(true)

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / SCROLL_DURATION, 1)
      const easeProgress = easeInOutQuad(progress)

      carrossel.scrollLeft = startScroll + distance * easeProgress

      if (progress < 1) {
        scrollRequestRef.current = requestAnimationFrame(animateScroll)
      } else {
        setIsScrolling(false)
        updateArrows()
      }
    }

    scrollRequestRef.current = requestAnimationFrame(animateScroll)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carrosselRef.current || isScrolling) return

    const { scrollLeft, scrollWidth, clientWidth } = carrosselRef.current
    let targetScroll: number

    if (direction === 'right') {
      // Se está no fim, volta para o início suavemente
      if (scrollLeft >= scrollWidth - clientWidth - 50) {
        targetScroll = 0
      } else {
        targetScroll = scrollLeft + SCROLL_AMOUNT
        // Garantir que não passe do fim
        targetScroll = Math.min(targetScroll, scrollWidth - clientWidth)
      }
    } else {
      // Se está no início, vai para o fim suavemente
      if (scrollLeft <= 50) {
        targetScroll = scrollWidth - clientWidth
      } else {
        targetScroll = scrollLeft - SCROLL_AMOUNT
        // Garantir que não passe do início
        targetScroll = Math.max(0, targetScroll)
      }
    }

    smoothScroll(targetScroll)
  }

  const updateArrows = () => {
    if (!carrosselRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = carrosselRef.current
    const isAtStart = scrollLeft <= 10
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10

    // Em modo cíclico, sempre mostramos ambas as setas
    setShowLeftArrow(true)
    setShowRightArrow(true)
  }

  const handleScroll = () => {
    if (!isScrolling) {
      updateArrows()
    }
  }

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (scrollRequestRef.current) {
        cancelAnimationFrame(scrollRequestRef.current)
      }
    }
  }, [])

  // Inicializar setas quando o componente monta
  useEffect(() => {
    updateArrows()
    
    const handleResize = () => {
      setTimeout(updateArrows, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [categoria.conteudos.length])

  // Atualizar setas quando os conteúdos mudam
  useEffect(() => {
    setTimeout(updateArrows, 100)
  }, [categoria.conteudos])

  return (
    <div className="relative group">
      <h2 className="text-2xl font-bold text-white mb-4 px-8">
        {categoria.nome}
      </h2>
      
      {categoria.descricao && (
        <p className="text-gray-400 mb-4 px-8 text-sm">
          {categoria.descricao}
        </p>
      )}

      <div className="relative">
        {/* Seta Esquerda */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg ${
            isScrolling ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          aria-label="Rolar para esquerda"
          disabled={isScrolling}
        >
          <svg 
            className={`w-6 h-6 ${isScrolling ? 'opacity-50' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carrossel com container para melhor performance */}
        <div className="relative px-8">
          <div
            ref={carrosselRef}
            onScroll={handleScroll}
            className={`
              flex gap-4 overflow-x-auto scrollbar-hide
              ${isScrolling ? 'scroll-auto' : 'scroll-smooth'}
              transition-opacity duration-200
            `}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: isScrolling ? 'auto' : 'smooth'
            }}
          >
            {categoria.conteudos.map((conteudo, index) => (
              <div
                key={`${conteudo.id}-${index}`}
                className="flex-none w-64 h-36 transition-all duration-500 ease-out transform hover:scale-105 hover:z-10 flex-shrink-0"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-800 group/item">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500 ease-out">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium truncate transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-300">
                        {conteudo.filename.replace('.gif', '')}
                      </p>
                      <p className="text-gray-300 text-xs truncate transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-400">
                        {conteudo.nome || conteudo.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overlay de loading durante scroll */}
          {isScrolling && (
            <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none z-20" />
          )}
        </div>

        {/* Seta Direita */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg ${
            isScrolling ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          aria-label="Rolar para direita"
          disabled={isScrolling}
        >
          <svg 
            className={`w-6 h-6 ${isScrolling ? 'opacity-50' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}