import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight } from 'lucide-react'
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

  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }))

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
    setActiveCategory(cat)
    if (window.innerWidth < 768 && prosSectionRef.current) {
      const yOffset = -80
      const element = prosSectionRef.current
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
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
    <div className="flex flex-col w-full">
      {/* Top Carousel Section */}
      <section className="pt-20 pb-16 bg-zinc-950 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Serviços <span className="text-primary">em Alta</span>
            </h2>
            <p className="text-zinc-400 text-lg">Passe o mouse ou clique para ver os destaques</p>
          </div>

          <Carousel
            opts={{ align: 'start', dragFree: true, loop: true }}
            plugins={[plugin.current]}
            className="w-full max-w-[1400px] mx-auto"
          >
            <CarouselContent className="-ml-4 pb-12 pt-4">
              {itemsToRender.map((cat, i) => (
                <CarouselItem
                  key={cat.id}
                  className="pl-4 basis-[48%] sm:basis-[33%] md:basis-[25%] lg:basis-[20%] xl:basis-[16.666%]"
                >
                  <div
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => handleCategoryClick(cat)}
                    className="group block relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-zinc-800 shadow-xl transition-all duration-500 cursor-pointer"
                  >
                    <div
                      className={cn(
                        'absolute inset-0 z-10 transition-colors duration-300 pointer-events-none rounded-xl border-2',
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
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 pointer-events-none" />

                    <div className="absolute top-3 right-3 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-xl shadow-lg ring-1 ring-white/20 pointer-events-none z-20">
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
              <CarouselPrevious className="absolute -left-5 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-primary hover:border-primary transition-all" />
              <CarouselNext className="absolute -right-5 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-primary hover:border-primary transition-all" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Dynamic Pros Section */}
      {activeCategory && (
        <section
          ref={prosSectionRef}
          className="py-20 bg-muted/50 border-b border-border transition-colors duration-500 min-h-[450px]"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-3 flex items-center gap-3">
                  Destaques em <span className="text-primary">{activeCategory.name}</span>
                  <span className="text-4xl animate-bounce">{activeCategory.emoji}</span>
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
              <div className="w-full bg-white border rounded-2xl p-12 text-center shadow-sm">
                <div className="text-5xl mb-4">{activeCategory.emoji}</div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  Nenhum destaque no momento
                </h3>
                <p className="text-muted-foreground mb-6">
                  Seja o primeiro a se destacar nesta categoria em Rondonópolis!
                </p>
                <Button asChild>
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
