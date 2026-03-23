import { Hero } from '@/components/home/Hero'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { FeaturedPros } from '@/components/home/FeaturedPros'
import { HowItWorks } from '@/components/home/HowItWorks'
import { CtaBanner } from '@/components/home/CtaBanner'
import { MapSection } from '@/components/home/MapSection'

const Index = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CategoriesGrid />
      <FeaturedPros />
      <HowItWorks />
      <MapSection />
      <CtaBanner />
    </div>
  )
}

export default Index
