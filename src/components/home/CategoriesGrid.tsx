import { Link } from 'react-router-dom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import useMainStore from '@/stores/main'

export function CategoriesGrid() {
  const { categories } = useMainStore()

  const popularCategories = categories.filter((c) =>
    [
      'Pedreiro',
      'Eletricista',
      'Diarista',
      'Mecânico',
      'Informática',
      'Jardinagem',
      'DJ',
      'Advogado',
      'Babá',
      'Encanador',
    ].includes(c.name),
  )

  const itemsToRender = popularCategories.length > 0 ? popularCategories : categories.slice(0, 10)

  return (
    <section className="py-16 bg-background overflow-hidden border-b">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary mb-3">Serviços Populares e Vagas</h2>
          <p className="text-muted-foreground">O que as pessoas mais procuram em Rondonópolis</p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {itemsToRender.map((cat, i) => (
              <CarouselItem
                key={cat.id}
                className="pl-4 basis-[60%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Link
                  to={`/categoria/${cat.slug}`}
                  className="group bg-white border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary hover:shadow-elevation transition-all duration-300 h-full animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-3xl">
                    {cat.emoji || '🔧'}
                  </div>
                  <span className="font-semibold text-secondary text-center group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 hover:bg-primary hover:text-white transition-colors" />
          <CarouselNext className="hidden md:flex -right-12 hover:bg-primary hover:text-white transition-colors" />
        </Carousel>
      </div>
    </section>
  )
}
