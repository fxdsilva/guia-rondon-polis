import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Edit3, Star, MapPin, BadgeCheck, MessageCircle, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useMainStore from '@/stores/main'
import NotFound from './NotFound'

const ProfessionalPage = () => {
  const { id } = useParams()
  const { professionals, currentUserId } = useMainStore()
  const pro = useMemo(() => professionals.find((p) => p.id === id), [id, professionals])

  if (!pro) return <NotFound />

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá ${pro.name}, vi seu perfil no Guia Rondonópolis e gostaria de um orçamento.`,
    )
    window.open(`https://wa.me/${pro.phone}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-muted/30 min-h-screen pb-32 md:pb-12">
      {pro.id === currentUserId && (
        <div className="bg-primary/10 border-b border-primary/20 text-primary px-4 py-3 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 animate-fade-in">
          <span className="font-medium text-sm sm:text-base">Este é o seu perfil público.</span>
          <Button asChild size="sm" className="shadow-sm font-semibold h-8">
            <Link to="/editar-perfil">
              <Edit3 className="w-4 h-4 mr-2" />
              Editar Perfil
            </Link>
          </Button>
        </div>
      )}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="relative">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-md"
                />
                {pro.verified && (
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
                    <BadgeCheck className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h1 className="text-3xl font-bold text-secondary">{pro.name}</h1>
                  {pro.premium && (
                    <Badge className="w-fit self-center sm:self-auto bg-accent text-accent-foreground hover:bg-accent/90">
                      Premium
                    </Badge>
                  )}
                </div>

                <p className="text-lg text-muted-foreground font-medium">
                  {pro.categories.join(' • ')}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="text-base">{pro.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({pro.reviewsCount} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {pro.neighborhoods[0]}{' '}
                      {pro.neighborhoods.length > 1 && `+${pro.neighborhoods.length - 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{pro.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <Button
                size="lg"
                className="gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg px-8 h-14 rounded-xl shadow-lg transition-transform hover:scale-105"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-6 h-6" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none mb-8 p-0">
              <TabsTrigger
                value="sobre"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-12 text-base"
              >
                Sobre e Serviços
              </TabsTrigger>
              <TabsTrigger
                value="fotos"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-12 text-base"
              >
                Fotos ({pro.gallery.length})
              </TabsTrigger>
              <TabsTrigger
                value="avaliacoes"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-12 text-base"
              >
                Avaliações ({pro.reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sobre" className="space-y-8 animate-fade-in">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Sobre o Profissional</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {pro.description}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Serviços Oferecidos</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pro.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-secondary-foreground/80">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-bold mb-4">Área de Atendimento</h3>
                <div className="flex flex-wrap gap-2">
                  {pro.neighborhoods.map((n, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-sm py-1 px-3 bg-muted/50 border-border"
                    >
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fotos" className="animate-fade-in">
              {pro.gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {pro.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden border shadow-sm group"
                    >
                      <img
                        src={img}
                        alt={`Trabalho ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhuma foto disponível no momento.
                </div>
              )}
            </TabsContent>

            <TabsContent value="avaliacoes" className="animate-fade-in">
              <div className="space-y-6">
                {pro.reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-secondary">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-secondary-foreground/80">{review.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <Button
          className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white h-12 text-lg rounded-xl shadow-lg"
          onClick={handleWhatsApp}
        >
          <MessageCircle className="w-6 h-6" />
          Falar no WhatsApp
        </Button>
      </div>
    </div>
  )
}

export default ProfessionalPage
