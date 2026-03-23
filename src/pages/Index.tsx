import { useState } from 'react'
import { Hero } from '@/components/home/Hero'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { FeaturedPros } from '@/components/home/FeaturedPros'
import { HowItWorks } from '@/components/home/HowItWorks'
import { CtaBanner } from '@/components/home/CtaBanner'
import { MapSection } from '@/components/home/MapSection'

const Index = () => {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([])

  return (
    <div className="flex flex-col w-full">
      <Hero
        selectedNeighborhoods={selectedNeighborhoods}
        onNeighborhoodChange={setSelectedNeighborhoods}
      />
      <CategoriesGrid />
      <FeaturedPros />
      <HowItWorks />
      <MapSection
        neighborhood={selectedNeighborhoods.length > 0 ? selectedNeighborhoods[0] : undefined}
      />
      <CtaBanner />
    </div>
  )
}

export default Index
