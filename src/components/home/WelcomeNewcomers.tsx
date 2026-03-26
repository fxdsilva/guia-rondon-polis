import { Link } from 'react-router-dom'
import { Sparkles, Building2, UserCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useMainStore from '@/stores/main'

export function WelcomeNewcomers() {
  const { populatedProfessionals, ads } = useMainStore()

  // As the data is ordered by created_at descending in the store (or prepended on insert),
  // the first item is the most recently added.
  const latestPro = populatedProfessionals[0]
  const latestAd = ads[0]

  if (!latestPro && !latestAd) return null

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary flex flex-wrap items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse hidden sm:block" />
            Boas-vindas aos Novos Parceiros!
            <Sparkles className="w-8 h-8 text-primary animate-pulse hidden sm:block" />
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Apoiamos quem faz nossa cidade crescer. Conheça os mais novos profissionais e empresas
            que chegaram ao Guia Rondonópolis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {latestPro && (
            <Card className="overflow-hidden hover:shadow-elevation transition-all duration-300 group animate-fade-in-up border-primary/10">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-secondary">Novo Profissional</h3>
                    <p className="text-xs text-muted-foreground">Acabou de se juntar</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  <img
                    src={latestPro.image}
                    alt={latestPro.name}
                    className="w-28 h-28 rounded-full sm:rounded-2xl object-cover border-4 border-background shadow-md group-hover:border-primary/20 transition-colors shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xl leading-tight mb-1 text-secondary group-hover:text-primary transition-colors truncate">
                      {latestPro.name}
                    </h4>
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium bg-muted px-2.5 py-1 rounded-md mb-3 text-secondary/80">
                      <span>{latestPro.category?.emoji}</span>
                      <span className="truncate">{latestPro.category?.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-5">
                      {latestPro.description}
                    </p>
                    <Button
                      asChild
                      className="w-full sm:w-auto font-semibold shadow-sm hover:shadow-md transition-all"
                    >
                      <Link to={`/profissional/${latestPro.id}`}>Visitar Perfil</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {latestAd && (
            <Card className="overflow-hidden hover:shadow-elevation transition-all duration-300 group animate-fade-in-up border-accent/10 delay-100">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-accent/10 p-2.5 rounded-xl text-accent shadow-sm group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-secondary">Nova Empresa Parceira</h3>
                    <p className="text-xs text-muted-foreground">Em destaque no guia</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  <img
                    src={latestAd.imageUrl}
                    alt={latestAd.companyName}
                    className="w-28 h-28 rounded-2xl object-cover border-4 border-background shadow-md group-hover:border-accent/20 transition-colors shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xl leading-tight mb-2 text-secondary group-hover:text-accent transition-colors truncate">
                      {latestAd.companyName}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-5 h-10">
                      {latestAd.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto font-semibold border-accent/20 hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm"
                    >
                      <a href={latestAd.link} target="_blank" rel="noopener noreferrer">
                        Conhecer Serviço
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
