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

  const popularCategoryNames = [
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
  ]

  const popularCategories = categories
    .filter((c) => popularCategoryNames.includes(c.name))
    .sort((a, b) => popularCategoryNames.indexOf(a.name) - popularCategoryNames.indexOf(b.name))

  const itemsToRender = popularCategories.length > 0 ? popularCategories : categories.slice(0, 10)

  const getImageUrl = (name: string) => {
    const map: Record<string, string> = {
      Pedreiro: 'construction%20worker',
      Eletricista: 'electrician',
      Diarista: 'cleaning%20house',
      Mecânico: 'car%20mechanic',
      Informática: 'computer%20repair',
      Jardinagem: 'gardening',
      DJ: 'dj%20party',
      Advogado: 'lawyer%20office',
      Babá: 'babysitter',
      Encanador: 'plumber',
    }
    const query = map[name] || encodeURIComponent(name.toLowerCase())
    return `https://img.usecurling.com/p/400/600?q=${query}&dpr=2`
  }

  return (
    <section className="py-20 bg-zinc-950 overflow-hidden border-y border-zinc-900 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Em Alta <span className="text-primary">Rondonópolis</span>
          </h2>
          <p className="text-zinc-400 text-lg">Os serviços mais procurados da semana</p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full max-w-[1400px] mx-auto"
        >
          <CarouselContent className="-ml-4 pb-12 pt-4">
            {itemsToRender.map((cat, i) => (
              <CarouselItem
                key={cat.id}
                className="pl-4 basis-[48%] sm:basis-[33%] md:basis-[25%] lg:basis-[20%] xl:basis-[16.666%]"
              >
                <Link
                  to={`/categoria/${cat.slug}`}
                  className="group block relative w-full h-full animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-zinc-800 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/30 group-hover:shadow-2xl ring-1 ring-white/10 group-hover:ring-primary/50">
                    {/* Background Image */}
                    <img
                      src={getImageUrl(cat.name)}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      loading="lazy"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                    {/* Top Emoji Badge */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-xl shadow-lg ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                      {cat.emoji || '✨'}
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end min-h-[50%] bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent">
                      <h3 className="font-bold text-white text-lg md:text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors drop-shadow-md">
                        {cat.name}
                      </h3>
                      {cat.group && (
                        <p className="text-xs text-zinc-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          {cat.group}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Giant Number (Netflix Style) */}
                  <div
                    className="absolute -left-3 -bottom-6 text-[100px] md:text-[130px] font-black leading-none z-30 select-none pointer-events-none tracking-tighter group-hover:scale-110 transition-transform duration-500"
                    style={{
                      WebkitTextStroke: '3px rgba(255,255,255,0.9)',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '4px 4px 15px rgba(0,0,0,0.6)',
                    }}
                  >
                    {i + 1}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-5 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-primary hover:text-white hover:border-primary transition-all" />
            <CarouselNext className="absolute -right-5 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-primary hover:text-white hover:border-primary transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
