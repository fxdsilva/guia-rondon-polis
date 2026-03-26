import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import useMainStore from '@/stores/main'
import { Category, PLAN_PREMIUM_ID } from '@/stores/mockData'
import { cn } from '@/lib/utils'

export function CategoriesGrid() {
  const { categories, populatedProfessionals } = useMainStore()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const prosSectionRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }))

  const popularCategoryNames = [
    'Eletricista',
    'Diarista',
    'Pintor',
    'Encanador',
    'Informática',
    'Pedreiro',
    'Mecânico',
    'Jardinagem',
    'Advogado',
    'Babá',
  ]

  const popularCategories = useMemo(
    () =>
      categories
        .filter((c) => popularCategoryNames.includes(c.name))
        .sort(
          (a, b) => popularCategoryNames.indexOf(a.name) - popularCategoryNames.indexOf(b.name),
        ),
    [categories],
  )

  const itemsToRender = popularCategories.length > 0 ? popularCategories : categories.slice(0, 10)

  useEffect(() => {
    if (!activeCategory && itemsToRender.length > 0) {
      setActiveCategory(itemsToRender[0])
    }
  }, [itemsToRender, activeCategory])

  const activePros = useMemo(() => {
    if (!activeCategory) return []
    const categoryPros = populatedProfessionals.filter((p) => p.category_id === activeCategory.id)
    const premium = categoryPros.filter((p) => p.plan_id === PLAN_PREMIUM_ID)
    if (premium.length > 0) return premium.slice(0, 4)
    return categoryPros.slice(0, 4)
  }, [activeCategory, populatedProfessionals])

  const handleCategoryClick = (cat: Category) => {
    navigate(`/categoria/${cat.slug}`)
  }

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
      Pintor: 'painter',
    }
    return `https://img.usecurling.com/p/400/600?q=${map[name] || encodeURIComponent(name.toLowerCase())}&dpr=2`
  }

  return (
    <div className="flex flex-col w-full relative">
      {/* Floating Carousel Section */}
      <section className="relative z-20 w-full max-w-[1500px] mx-auto px-4 -mt-24 md:-mt-36 mb-12">
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] rounded-[2rem] p-6 md:p-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                Serviços <span className="text-primary">em Alta</span>
              </h2>
              <p className="text-zinc-400 mt-1.5 text-sm md:text-base">
                Clique ou passe o mouse sobre um serviço para ver os destaques.
              </p>
            </div>
          </div>

          <Carousel
            opts={{ align: 'start', dragFree: true, loop: true }}
            plugins={[plugin.current]}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4 pb-6 pt-2">
              {itemsToRender.map((cat) => (
                <CarouselItem
                  key={cat.id}
                  className="pl-4 basis-[45%] sm:basis-[33%] md:basis-[25%] lg:basis-[20%] xl:basis-[16.666%]"
                >
                  <div
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => handleCategoryClick(cat)}
                    className="group block relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-800 shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl ring-2 ring-transparent hover:ring-primary/50"
                  >
                    <div
                      className={cn(
                        'absolute inset-0 z-10 transition-colors duration-300 pointer-events-none rounded-2xl border-2',
                        activeCategory?.id === cat.id ? 'border-primary' : 'border-transparent',
                      )}
                    />
                    <img
                      src={getImageUrl(cat.name)}
                      alt={cat.name}
                      className={cn(
                        'absolute inset-0 w-full h-full object-cover transition-transform duration-700',
                        activeCategory?.id === cat.id
                          ? 'scale-110 opacity-100'
                          : 'opacity-70 group-hover:scale-105 group-hover:opacity-100',
                      )}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90 pointer-events-none" />

                    <div className="absolute top-3 right-3 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-xl shadow-lg ring-1 ring-white/20 pointer-events-none z-20 group-hover:scale-110 transition-transform">
                      {cat.emoji || '✨'}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end pointer-events-none">
                      <h3
                        className={cn(
                          'font-bold text-lg md:text-xl leading-tight line-clamp-2 transition-colors drop-shadow-md',
                          activeCategory?.id === cat.id
                            ? 'text-primary'
                            : 'text-white group-hover:text-primary',
                        )}
                      >
                        {cat.name}
                      </h3>
                      {cat.group && (
                        <p className="text-xs text-zinc-300 mt-1 opacity-80">{cat.group}</p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-6 lg:-left-12 top-[45%] -translate-y-1/2 w-12 h-12 bg-zinc-800 border-white/10 text-white hover:bg-primary hover:border-primary hover:text-white transition-all shadow-xl z-30" />
              <CarouselNext className="absolute -right-6 lg:-right-12 top-[45%] -translate-y-1/2 w-12 h-12 bg-zinc-800 border-white/10 text-white hover:bg-primary hover:border-primary hover:text-white transition-all shadow-xl z-30" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Dynamic Pros Section */}
      {activeCategory && (
        <section
          ref={prosSectionRef}
          className="pt-6 pb-24 bg-transparent transition-colors duration-500 min-h-[450px]"
        >
          <div className="container mx-auto px-4 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-2 flex items-center gap-3">
                  Destaques em <span className="text-primary">{activeCategory.name}</span>
                  <span className="text-3xl animate-bounce">{activeCategory.emoji}</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Profissionais selecionados e altamente recomendados
                </p>
              </div>
              <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/10">
                <Link to={`/categoria/${activeCategory.slug}`}>
                  Ver todos da categoria
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {activePros.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activePros.map((pro, i) => (
                  <div
                    key={`${activeCategory.id}-${pro.id}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <ProfessionalCard pro={pro} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full bg-white border rounded-2xl p-12 text-center shadow-sm max-w-3xl mx-auto">
                <div className="text-6xl mb-4 opacity-80">{activeCategory.emoji}</div>
                <h3 className="text-2xl font-bold text-secondary mb-3">
                  Nenhum destaque no momento
                </h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Seja o primeiro a se destacar na categoria de {activeCategory.name} em
                  Rondonópolis!
                </p>
                <Button asChild size="lg" className="font-semibold px-8 h-12">
                  <Link to="/cadastrar">Anunciar meu serviço</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
