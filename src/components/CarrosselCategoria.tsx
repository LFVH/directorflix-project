// components/CarrosselCategoria.tsx
'use client'

import { useState, useRef } from 'react'
import { CategoriaWithUrls } from '@/types'

interface CarrosselCategoriaProps {
  categoria: CategoriaWithUrls
}

export default function CarrosselCategoria({ categoria }: CarrosselCategoriaProps) {
  const carrosselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (!carrosselRef.current) return

    const scrollAmount = 300
    const newScrollLeft = carrosselRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount)

    carrosselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    if (!carrosselRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = carrosselRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

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
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            ‹
          </button>
        )}

        {/* Carrossel */}
        <div
          ref={carrosselRef}
          onScroll={handleScroll}
          className="flex gap-4 px-8 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categoria.conteudos.map((conteudo) => (
            <div
              key={conteudo.id}
              className="flex-none w-64 h-36 transition-all duration-300 transform hover:scale-105 hover:z-10"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-800">
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

        {/* Seta Direita */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            ›
          </button>
        )}
      </div>
    </div>
  )
}