import { useMemo } from 'react'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'
import { CATEGORY_GROUPS } from '@/stores/mockData'

interface Props {
  categories: string[]
  layout?: 'vertical' | 'grid'
}

export function ContextualAds({ categories, layout = 'vertical' }: Props) {
  const { ads } = useMainStore()

  const expandedCategories = useMemo(() => {
    const expanded = new Set(categories.map((c) => c.toLowerCase()))
    Object.entries(CATEGORY_GROUPS).forEach(([group, cats]) => {
      if (cats.some((c) => categories.some((cat) => c.toLowerCase() === cat.toLowerCase()))) {
        expanded.add(group.toLowerCase())
      }
    })
    return Array.from(expanded)
  }, [categories])

  const matchingAds = useMemo(() => {
    return ads.filter(
      (ad) =>
        ad.active &&
        ad.targetCategories.some((tc) => expandedCategories.includes(tc.toLowerCase())),
    )
  }, [ads, expandedCategories])

  if (matchingAds.length === 0) return null

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
        {matchingAds.map((ad) => (
          <Card
            key={ad.id}
            className="overflow-hidden border-border bg-white shadow-sm hover:shadow-md transition-all group"
          >
            <div className="relative overflow-hidden h-32 bg-muted">
              <img
                src={ad.imageUrl}
                alt={ad.companyName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 text-[10px] py-0 px-1.5 bg-white/90 text-secondary hover:bg-white border-none shadow-sm"
              >
                Patrocinador
              </Badge>
              <h5 className="absolute bottom-2 left-3 right-3 font-bold text-white text-sm truncate drop-shadow-md">
                {ad.companyName}
              </h5>
            </div>
            <CardContent className="p-4 flex flex-col justify-between h-[120px]">
              <p className="text-xs text-muted-foreground line-clamp-3 mb-2">{ad.description}</p>
              <Button
                asChild
                size="sm"
                className="w-full text-xs h-8 gap-1 mt-auto"
                variant="outline"
              >
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  Visitar Site <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
