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
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={pro.image}
                alt={pro.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-background shadow-sm"
              />
              {pro.verified && (
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                  <BadgeCheck className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1.5 mb-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg text-secondary group-hover:text-primary transition-colors flex-1 min-w-[120px] break-words">
                    {pro.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 justify-end shrink-0 max-w-full">
                    {pro.premium_highlight === 'top1' && (
                      <Badge className="bg-[#FFD700] hover:bg-[#F2C800] text-amber-950 border-transparent shadow-sm gap-1.5 px-2.5 py-0.5 w-fit max-w-full h-auto">
                        <Trophy className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-normal text-left leading-tight">
                          Top 1 {pro.category?.name}
                        </span>
                      </Badge>
                    )}
                    {pro.premium_highlight === 'recommended' && (
                      <Badge className="bg-[#3b82f6] hover:bg-[#2563eb] text-white border-transparent shadow-sm gap-1.5 px-2.5 py-0.5 w-fit max-w-full h-auto">
                        <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-normal text-left leading-tight">
                          Mais recomendado
                        </span>
                      </Badge>
                    )}
                    {!pro.premium_highlight && isPremium && (
                      <Badge
                        variant="secondary"
                        className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 w-fit"
                      >
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground flex items-start gap-1.5 mt-0.5">
                  <span className="shrink-0 mt-0.5">{pro.category?.emoji}</span>
                  <span className="break-words">{pro.category?.name || 'Profissional'}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium mt-1">
                <Star className="w-4 h-4 fill-accent text-accent shrink-0" />
                <span>{pro.rating.toFixed(1)}</span>
                <span className="text-muted-foreground font-normal">
                  ({pro.reviewsCount} avaliações)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="break-words">{pro.neighborhood?.name || 'Atende Rondonópolis'}</span>
          </div>

          <div className="mt-auto pt-6">
            <Button
              onClick={handleWhatsApp}
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white"
            >
              <MessageCircle className="w-5 h-5" /> Chamar no WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
