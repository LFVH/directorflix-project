// app/page.tsx
import HeroCTA from '@/components/HeroCTA'
import CategoriaShowcase from '@/components/CategoriaShowcase'

export default function Home() {
  return (
    <main className="bg-black">
      <HeroCTA />
      <CategoriaShowcase />
    </main>
  )
}