import { useMemo, useState, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Search, ArrowLeft, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/MultiSelect'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { ContextualAds } from '@/components/ContextualAds'
import { MapSection } from '@/components/home/MapSection'
import useMainStore from '@/stores/main'

export default function CategoryPage() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { categories, neighborhoods, populatedProfessionals } = useMainStore()

  const query = searchParams.get('q') || ''
  const activeNeighborhoods = searchParams.get('b')?.split(',').filter(Boolean) || []

  const [localQuery, setLocalQuery] = useState(query)
  const [localNeighborhoods, setLocalNeighborhoods] = useState<string[]>(activeNeighborhoods)

  useEffect(() => {
    setLocalQuery(query)
    setLocalNeighborhoods(activeNeighborhoods)
  }, [query, activeNeighborhoods])

  // Determine if slug is a specific category or a group
  const category = useMemo(() => {
    if (!slug || slug === 'todas') return null
    return categories.find((c) => c.slug === slug)
  }, [slug, categories])

  const isGroup = !category && slug && slug !== 'todas'

  const filteredPros = useMemo(() => {
    return populatedProfessionals.filter((pro) => {
      // Filter by exact category
      if (category && pro.category_id !== category.id) {
        return false
      }

      // Filter by group (segment)
      if (isGroup) {
        const groupSlug = pro.category?.group?.toLowerCase().replace(/\s+/g, '-')
        if (groupSlug !== slug) return false
      }

      // Search query filter
      if (query) {
        const q = query.toLowerCase()
        const matchName = pro.name.toLowerCase().includes(q)
        const matchDesc = pro.description.toLowerCase().includes(q)
        const matchServices = pro.services.some((s) => s.name.toLowerCase().includes(q))
        const matchCategory = pro.category?.name.toLowerCase().includes(q)

        if (!matchName && !matchDesc && !matchServices && !matchCategory) return false
      }

      // Neighborhood filter
      if (activeNeighborhoods.length > 0) {
        if (!activeNeighborhoods.includes(pro.neighborhood_id)) return false
      }

      return true
    })
  }, [populatedProfessionals, category, isGroup, slug, query, activeNeighborhoods])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (localQuery) params.set('q', localQuery)
    if (localNeighborhoods.length > 0) params.set('b', localNeighborhoods.join(','))
    setSearchParams(params)
  }

  const neighborhoodOptions = useMemo(() => {
    return neighborhoods.map((n) => ({
      label: n.name,
      value: n.id,
      group: n.group || 'Outros',
    }))
  }, [neighborhoods])

  const title = category
    ? category.name
    : isGroup
      ? slug.replace(/-/g, ' ')
      : 'Todos os Profissionais'

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-primary pt-32 pb-16 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1600/400?q=city%20buildings&color=blue')] opacity-10 object-cover mix-blend-overlay" />
        <div className="container mx-auto relative z-10">
          <div className="absolute left-0 top-0">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white -mt-16"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 capitalize flex items-center justify-center gap-3">
            {category?.emoji || (isGroup ? '🏷️' : '🔍')} {title}
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            {query
              ? `Resultados para "${query}"`
              : 'Encontre os melhores profissionais para sua necessidade em Rondonópolis.'}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 mb-8">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl p-4 shadow-elevation border flex flex-col md:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Buscar por nome, serviço ou palavra-chave..."
              className="pl-10 h-12 text-base border-input bg-muted/30"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-80 shrink-0">
            <MultiSelect
              options={neighborhoodOptions}
              selected={localNeighborhoods}
              onChange={setLocalNeighborhoods}
              placeholder="Filtrar por bairros..."
              className="min-h-[48px] bg-muted/30 border-input"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8 font-semibold shrink-0 shadow-sm">
            <Filter className="w-5 h-5 mr-2" />
            Filtrar
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 pb-24 flex-1">
        <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
          <p>
            Mostrando {filteredPros.length} {filteredPros.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>

        {filteredPros.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPros.map((pro) => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white border rounded-3xl p-10 md:p-16 text-center shadow-sm max-w-4xl mx-auto mt-8 animate-fade-in-up">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 leading-tight">
              Ainda não há profissionais cadastrados no sistema, mas isso é apenas o começo!
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl mb-3">
              Em breve, novos talentos farão parte desta plataforma, trazendo conhecimento,
              dedicação e excelentes serviços.
            </p>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">
              Estamos construindo um espaço cheio de oportunidades — fique atento, pois grandes
              profissionais estarão disponíveis em breve!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold px-8 h-12 text-lg">
                <Link to="/cadastrar">Seja o primeiro a se cadastrar</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold px-8 h-12 text-lg"
              >
                <Link to="/">Voltar para o Início</Link>
              </Button>
            </div>
          </div>
        )}

        {slug !== 'todas' && (
          <div className="mt-12">
            <ContextualAds categorySlug={slug} layout="grid" />
          </div>
        )}
      </div>

      <MapSection
        neighborhoodId={localNeighborhoods.length > 0 ? localNeighborhoods[0] : undefined}
      />
    </div>
  )
}
