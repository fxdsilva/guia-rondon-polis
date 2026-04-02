import { useMemo } from 'react'
import { ExternalLink, Phone, Globe, Instagram, Facebook } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'

interface Props {
  categoryId?: string
  categorySlug?: string
  layout?: 'vertical' | 'grid'
}

export function ContextualAds({ categoryId, categorySlug, layout = 'vertical' }: Props) {
  const { ads, categories } = useMainStore()

  const expandedCategories = useMemo(() => {
    let cat
    if (categoryId) {
      cat = categories.find((c) => c.id === categoryId)
    } else if (categorySlug) {
      cat = categories.find((c) => c.slug === categorySlug)
    }

    if (!cat) {
      // Se for um slug de grupo/segmento
      if (categorySlug) {
        const groupName = categorySlug.replace(/-/g, ' ').toLowerCase()
        const groupCats = categories.filter((c) => c.group && c.group.toLowerCase() === groupName)
        if (groupCats.length > 0) {
          const names = groupCats.flatMap((c) => [c.name.toLowerCase(), c.slug.toLowerCase()])
          return [groupName, categorySlug, ...names]
        }
      }
      return []
    }

    return [
      cat.name.toLowerCase(),
      cat.slug.toLowerCase(),
      ...(cat.group ? [cat.group.toLowerCase()] : []),
    ]
  }, [categoryId, categorySlug, categories])

  const displayAds = useMemo(() => {
    if (expandedCategories.length === 0) return []
    return ads.filter(
      (ad) =>
        ad.active &&
        ad.targetCategories.some((tc) => expandedCategories.includes(tc.toLowerCase())),
    )
  }, [ads, expandedCategories])

  if (displayAds.length === 0) return null

  return (
    <div className="space-y-4 animate-fade-in">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <span className="h-px bg-border flex-1"></span>
        Sugestões de Empresas Parceiras
        <span className="h-px bg-border flex-1"></span>
      </h4>
      <div
        className={`grid gap-4 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}
      >
        {displayAds.map((ad) => (
          <Card
            key={ad.id}
            className="overflow-hidden border-border bg-white shadow-sm hover:shadow-elevation transition-all duration-300 hover:scale-[1.02] group flex flex-col"
          >
            <div className="relative overflow-hidden h-36 bg-muted shrink-0">
              <img
                src={ad.imageUrl}
                alt={ad.companyName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 text-[10px] py-0 px-2 bg-white/95 text-secondary hover:bg-white shadow-sm"
              >
                Parceiro
              </Badge>
              <h5 className="absolute bottom-3 left-4 right-4 font-bold text-white text-base truncate drop-shadow-md">
                {ad.companyName}
              </h5>
            </div>
            <CardContent className="p-4 flex flex-col flex-1 gap-3">
              <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{ad.description}</p>

              <div className="flex items-center gap-3 pt-2 pb-1 text-muted-foreground">
                {ad.phone && (
                  <a
                    href={`https://wa.me/${ad.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors"
                    title="WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {ad.website && (
                  <a
                    href={ad.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                    title="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {ad.instagram && (
                  <a
                    href={ad.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E1306C] transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {ad.facebook && (
                  <a
                    href={ad.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1877F2] transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>

              <Button
                asChild
                size="sm"
                className="w-full text-xs h-9 gap-1.5 mt-auto font-medium"
                variant="default"
              >
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  Falar com a Empresa <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
