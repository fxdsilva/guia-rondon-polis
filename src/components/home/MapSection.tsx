import { MapPin } from 'lucide-react'
import { useMemo } from 'react'
import useMainStore from '@/stores/main'

export function MapSection({ neighborhoodId }: { neighborhoodId?: string }) {
  const { neighborhoods } = useMainStore()

  const activeNeighborhood = useMemo(() => {
    return neighborhoods.find((n) => n.id === neighborhoodId)
  }, [neighborhoodId, neighborhoods])

  const searchQuery =
    activeNeighborhood && activeNeighborhood.name !== 'Todos os bairros'
      ? `${encodeURIComponent(activeNeighborhood.name)}, Rondonópolis, MT`
      : '-16.4514215,-54.6308515'

  return (
    <section className="py-16 bg-muted/30 border-y w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-secondary mb-3 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="text-primary w-8 h-8 shrink-0" />
              {activeNeighborhood && activeNeighborhood.name !== 'Todos os bairros'
                ? `Explore a Região: ${activeNeighborhood.name}`
                : 'Explore a Região de Rondonópolis'}
            </h2>
            <p className="text-muted-foreground text-lg">
              Encontre profissionais, parceiros comerciais e os melhores serviços na sua vizinhança
              com facilidade e rapidez.
            </p>
          </div>
        </div>

        <div className="w-full h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-elevation border border-border relative bg-muted">
          <iframe
            src={`https://maps.google.com/maps?q=${searchQuery}&z=14&output=embed`}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Rondonópolis"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
