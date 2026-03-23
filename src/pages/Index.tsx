import { Hero } from '@/components/home/Hero'
import { CategoriesGrid } from '@/components/home/CategoriesGrid'
import { FeaturedPros } from '@/components/home/FeaturedPros'
import { HowItWorks } from '@/components/home/HowItWorks'
import { CtaBanner } from '@/components/home/CtaBanner'

const Index = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CategoriesGrid />
      <FeaturedPros />
      <HowItWorks />
      <CtaBanner />
    </div>
  )
}

export default Index
