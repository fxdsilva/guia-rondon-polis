import { Link } from 'react-router-dom'
import { Star, MapPin, BadgeCheck, MessageCircle, Trophy, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PopulatedProfessional } from '@/stores/main'
import { PLAN_PREMIUM_ID } from '@/stores/mockData'

interface Props {
  pro: PopulatedProfessional
}

export function ProfessionalCard({ pro }: Props) {
  const isPremium = pro.plan_id === PLAN_PREMIUM_ID

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      'Olá, vi seu perfil no Guia Rondonópolis e gostaria de um orçamento.',
    )
    window.open(`https://wa.me/${pro.phone}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Link to={`/profissional/${pro.id}`}>
      <Card className="overflow-hidden hover:shadow-elevation transition-all duration-300 hover:scale-[1.02] group h-full flex flex-col">
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <img
                src={pro.image}
                alt={pro.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-background shadow-sm"
              />
              {pro.verified && (
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                  <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-base sm:text-lg leading-tight text-secondary group-hover:text-primary transition-colors break-words line-clamp-2">
                  {pro.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {pro.premium_highlight === 'top1' && (
                    <Badge className="bg-[#FFD700] hover:bg-[#F2C800] text-amber-950 border-transparent shadow-sm gap-1 px-2 py-0.5 w-fit max-w-full h-auto">
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-normal text-left leading-tight break-words">
                        Top 1 {pro.category?.name}
                      </span>
                    </Badge>
                  )}
                  {pro.premium_highlight === 'recommended' && (
                    <Badge className="bg-[#3b82f6] hover:bg-[#2563eb] text-white border-transparent shadow-sm gap-1 px-2 py-0.5 w-fit max-w-full h-auto">
                      <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-normal text-left leading-tight break-words">
                        Mais recomendado
                      </span>
                    </Badge>
                  )}
                  {!pro.premium_highlight && isPremium && (
                    <Badge
                      variant="secondary"
                      className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 w-fit whitespace-nowrap px-2 py-0.5"
                    >
                      Premium
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="shrink-0 flex items-center justify-center">
                      {pro.category?.emoji}
                    </span>
                    <span className="truncate">{pro.category?.name || 'Profissional'}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="w-4 h-4 fill-accent text-accent shrink-0" />
                    <span>{pro.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal whitespace-nowrap ml-0.5">
                      ({pro.reviewsCount} {pro.reviewsCount === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="break-words line-clamp-2">
              {pro.neighborhood?.name || 'Atende Rondonópolis'}
            </span>
          </div>

          <div className="mt-auto pt-5">
            <Button
              onClick={handleWhatsApp}
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span className="truncate">Chamar no WhatsApp</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
