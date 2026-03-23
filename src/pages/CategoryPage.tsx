import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import useMainStore, { PopulatedProfessional } from '@/stores/main'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { Building2, SearchX, Globe, Facebook, Instagram, Phone } from 'lucide-react'
import { MapSection } from '@/components/home/MapSection'
import { Button } from '@/components/ui/button'
import { PLAN_PREMIUM_ID, NB_ALL_ID } from '@/stores/mockData'

export default function CategoryPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const bParam = searchParams.get('b')
  const selectedNeighborhoodIds = bParam ? bParam.split(',') : []

  const { populatedProfessionals, ads, categories } = useMainStore()
  const normalizedSlug = slug?.replace(/-/g, ' ').toLowerCase() || 'todas'

  const filteredPros = useMemo(() => {
    return populatedProfessionals.filter((pro) => {
      let matchesCategory = false
      if (normalizedSlug === 'todas' || normalizedSlug === 'todos') {
        matchesCategory = true
      } else {
        matchesCategory = pro.category?.slug === slug
        if (!matchesCategory) {
          const groupSlug = pro.category?.group?.toLowerCase().replace(/\s+/g, '-')
          if (groupSlug === slug) matchesCategory = true
        }
      }

      const matchesQuery = query
        ? pro.name.toLowerCase().includes(query) ||
          pro.services.some((s) => s.name.toLowerCase().includes(query))
        : true

      const matchesNeighborhood =
        selectedNeighborhoodIds.length > 0 && !selectedNeighborhoodIds.includes(NB_ALL_ID)
          ? selectedNeighborhoodIds.includes(pro.neighborhood_id)
          : true

      return matchesCategory && matchesQuery && matchesNeighborhood
    })
  }, [populatedProfessionals, normalizedSlug, query, slug, selectedNeighborhoodIds])

  const sortedPros = useMemo(() => {
    return [...filteredPros].sort((a, b) => {
      const rank = (p: PopulatedProfessional) => {
        if (p.premium_highlight === 'top1') return 4
        if (p.premium_highlight === 'recommended') return 3
        if (p.plan?.id === PLAN_PREMIUM_ID) return 2
        return 1
      }
      const rankDiff = rank(b) - rank(a)
      if (rankDiff !== 0) return rankDiff
      return b.rating - a.rating
    })
  }, [filteredPros])

  const activeAds = ads.filter((a) => a.active)

  const expandedCategories = useMemo(() => {
    if (normalizedSlug === 'todas' || normalizedSlug === 'todos') return ['todas']
    const expanded = new Set<string>([normalizedSlug])
    categories.forEach((c) => {
      const groupSlug = c.group?.toLowerCase().replace(/\s+/g, '-')
      if (groupSlug === slug || c.slug === slug) {
        if (c.group) expanded.add(c.group.toLowerCase())
        expanded.add(c.slug.toLowerCase())
        expanded.add(c.name.toLowerCase())
      }
    })
    return Array.from(expanded)
  }, [normalizedSlug, slug, categories])

  const filteredAds = useMemo(() => {
    if (expandedCategories.includes('todas')) return activeAds
    return activeAds.filter((ad) =>
      ad.targetCategories.some((tc) => expandedCategories.includes(tc.toLowerCase())),
    )
  }, [activeAds, expandedCategories])

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-secondary mb-8 flex items-center gap-3 capitalize">
          {(() => {
            if (normalizedSlug === 'todas') return null
            const cat = categories.find((c) => c.slug === slug)
            if (cat) return <span>{cat.emoji}</span>
            const groupCat = categories.find(
              (c) => c.group?.toLowerCase().replace(/\s+/g, '-') === slug,
            )
            if (groupCat) return <span>{groupCat.groupEmoji}</span>
            return null
          })()}
          {normalizedSlug === 'todas' ? 'Todos os Profissionais' : normalizedSlug}
        </h1>

        {sortedPros.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
            <SearchX className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Nenhum profissional encontrado</h2>
            <p className="text-muted-foreground">Tente buscar por outros termos ou categorias.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedPros.map((pro) => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 border-t border-border">
        <MapSection neighborhoodId={selectedNeighborhoodIds[0]} />
      </div>

      <div className="container mx-auto px-4">
        <div className="pt-16 pb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
              <Building2 className="text-primary w-8 h-8" /> Empresas Parceiras
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça fornecedores recomendados para esta categoria.
            </p>
          </div>

          {filteredAds.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white border rounded-2xl overflow-hidden hover:shadow-elevation transition-all group flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative bg-muted">
                    <img
                      src={ad.imageUrl}
                      alt={ad.companyName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-secondary mb-2">{ad.companyName}</h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-4">{ad.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-border/50">
                      {ad.phone && (
                        <a
                          href={`tel:${ad.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Telefone"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                      )}
                      {ad.website && (
                        <a
                          href={ad.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Site"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {ad.facebook && (
                        <a
                          href={ad.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-[#1877F2] transition-colors"
                          title="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                      {ad.instagram && (
                        <a
                          href={ad.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-[#E4405F] transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {ad.link && (
                        <a
                          href={ad.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto text-sm font-semibold text-primary hover:text-primary/80"
                        >
                          Falar no WhatsApp &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border shadow-sm max-w-2xl mx-auto">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">
                Seja o primeiro parceiro desta categoria!
              </h3>
              <Button asChild className="mt-4">
                <Link to="/anunciar-empresa">Divulgar minha Empresa</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
