import { ProfessionalCard } from '@/components/ProfessionalCard'
import useMainStore from '@/stores/main'

export function FeaturedPros() {
  const { professionals } = useMainStore()
  const featured = professionals.filter((p) => p.premium).slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-4">Profissionais em Destaque</h2>
            <p className="text-muted-foreground">Os melhores avaliados de Rondonópolis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pro, i) => (
            <div
              key={pro.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ProfessionalCard pro={pro} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
