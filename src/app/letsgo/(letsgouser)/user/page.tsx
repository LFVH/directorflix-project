'use client'

import { useGlobalFilter } from '@/hooks/useGlobalFilter'
import HeroBanner from '@/components/HeroBanner'
import ConteudosFiltradosComScroll from '@/components/letsgo/ConteudosFiltrados'
import LoadingSpinner from '@/components/LoadingSpinner'
import HeaderWithCategories from '@/components/letsgo/HeaderWithCategories'
import { useCategorias } from '@/hooks/useCategorias'
import ManageSubscriptionButton from '@/components/letsgo/ManageSubscriptionButton'

export default function UserPage() {
  return (

        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-center">
            Acesse sua assinatura:
            
          </p>
          <ManageSubscriptionButton />
        </div>

  )
}