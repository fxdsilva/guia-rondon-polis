import { Link } from 'react-router-dom'
import { Star, MapPin, BadgeCheck, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Professional } from '@/stores/mockData'

interface Props {
  pro: Professional
}

export function ProfessionalCard({ pro }: Props) {
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
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-lg truncate text-secondary group-hover:text-primary transition-colors">
                  {pro.name}
                </h3>
                {pro.premium && (
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 shrink-0"
                  >
                    Premium
                  </Badge>
                )}
              </div>

              <p
                className="text-sm text-muted-foreground mb-2 truncate"
                title={pro.categories.join(', ')}
              >
                {pro.categories.join(', ')}
              </p>

              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span>{pro.rating.toFixed(1)}</span>
                <span className="text-muted-foreground font-normal">
                  ({pro.reviewsCount} avaliações)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{pro.neighborhoods.join(', ')}</span>
          </div>

          <div className="mt-auto pt-6">
            <Button
              onClick={handleWhatsApp}
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white"
            >
              <MessageCircle className="w-5 h-5" />
              Chamar no WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
