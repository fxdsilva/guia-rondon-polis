import { useParams, useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import useMainStore from '@/stores/main'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { Building2, SearchX, Globe, Facebook, Instagram, Phone } from 'lucide-react'
import { CATEGORY_GROUPS } from '@/stores/mockData'

export default function CategoryPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''

  const { professionals, ads } = useMainStore()

  const normalizedSlug = slug?.replace(/-/g, ' ').toLowerCase() || 'todas'

  const filteredPros = useMemo(() => {
    return professionals.filter((pro) => {
      let matchesCategory = false
      if (normalizedSlug === 'todas' || normalizedSlug === 'todos') {
        matchesCategory = true
      } else {
        matchesCategory = pro.categories.some((c) => c.toLowerCase().replace(/\s+/g, '-') === slug)

        if (!matchesCategory) {
          const matchingSegment = Object.entries(CATEGORY_GROUPS).find(
            ([groupName]) => groupName.toLowerCase().replace(/\s+/g, '-') === slug,
          )

          if (matchingSegment) {
            const segmentCategories = matchingSegment[1].map((c) => c.toLowerCase())
            matchesCategory = pro.categories.some((c) =>
              segmentCategories.includes(c.toLowerCase()),
            )
          }
        }
      }

      const matchesQuery = query
        ? pro.name.toLowerCase().includes(query) ||
          pro.services.some((s) => s.toLowerCase().includes(query))
        : true

      return matchesCategory && matchesQuery
    })
  }, [professionals, normalizedSlug, query, slug])

  const activeAds = ads.filter((a) => a.active)

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-secondary mb-8 capitalize">
          {normalizedSlug === 'todas' ? 'Todos os Profissionais' : normalizedSlug}
        </h1>

        {filteredPros.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
            <SearchX className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Nenhum profissional encontrado</h2>
            <p className="text-muted-foreground">Tente buscar por outros termos ou categorias.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredPros.map((pro) => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
          </div>
        )}

        {activeAds.length > 0 && (
          <div className="mt-20 pt-16 border-t border-border">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
                <Building2 className="text-primary w-8 h-8" />
                Empresas Parceiras
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conheça os fornecedores e empresas recomendadas que apoiam nossa plataforma e estão
                visíveis em todas as categorias.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAds.map((ad) => (
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
          </div>
        )}
      </div>
    </div>
  )
}
