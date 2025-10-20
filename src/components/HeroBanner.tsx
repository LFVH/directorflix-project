// components/HeroBanner.tsx
'use client'

import { CategoriaWithUrls } from '@/types'
import { useState, useEffect } from 'react'

interface HeroBannerProps {
  categorias: CategoriaWithUrls[]
  categoriaFiltrada?: string | null
}

export default function HeroBanner({ categorias, categoriaFiltrada  }: HeroBannerProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  
   const bannerConteudos = categoriaFiltrada
    ? categorias.find(c => c.id === categoriaFiltrada)?.conteudos || []
    : categorias.flatMap(c => c.conteudos)

  useEffect(() => {
    if (bannerConteudos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => 
        prev === bannerConteudos.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [bannerConteudos.length])

  if (bannerConteudos.length === 0) return null

  const currentBanner = bannerConteudos[currentBannerIndex]
  if(!currentBanner || !currentBanner.url) return null
  return (
    <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
      {/* Imagem do Banner */}
      <img
        src={currentBanner.url}
        alt={currentBanner.filename}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      {/* Conteúdo do Banner */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentBanner.filename.replace('.gif', '')}
          </h1>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
              ▶ Assistir
            </button>
            <button className="px-6 py-2 bg-gray-600/70 text-white font-semibold rounded hover:bg-gray-600 transition-colors">
              ℹ Mais Informações
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      {bannerConteudos.length > 1 && (
        <div className="absolute bottom-4 right-8 flex gap-2">
          {bannerConteudos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentBannerIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}