import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { WelcomeNewcomers } from '@/components/home/WelcomeNewcomers'
import { HowItWorks } from '@/components/home/HowItWorks'
import { CtaBanner } from '@/components/home/CtaBanner'
import { MapSection } from '@/components/home/MapSection'
import { Button } from '@/components/ui/button'

const Index = () => {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([])

  return (
    <div className="flex flex-col w-full relative">
      <Hero
        selectedNeighborhoods={selectedNeighborhoods}
        onNeighborhoodChange={setSelectedNeighborhoods}
      />
      <CategoriesGrid />
      <WelcomeNewcomers />
      <HowItWorks />
      <MapSection
        neighborhood={selectedNeighborhoods.length > 0 ? selectedNeighborhoods[0] : undefined}
      />
      <CtaBanner />

      {/* Floating CTA Button */}
      <Button
        asChild
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 h-14 md:h-16 px-6 md:px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 animate-bounce hover:animate-none font-bold text-lg border-2 border-white/20 transition-transform hover:scale-105"
      >
        <Link to="/cadastrar">
          <PlusCircle className="w-6 h-6 md:mr-2" />
          <span className="hidden md:inline">Anuncie seu Serviço</span>
        </Link>
      </Button>
    </div>
  )
}

export default Index
