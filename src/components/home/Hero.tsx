import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/MultiSelect'
import { NEIGHBORHOOD_OPTIONS } from '@/stores/mockData'

export function Hero() {
  const [query, setQuery] = useState('')
  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (neighborhoods.length > 0) params.set('b', neighborhoods.join(','))
    navigate(`/categoria/todas?${params.toString()}`)
  }

  return (
    <div className="relative bg-secondary overflow-hidden">
      <img
        src="https://img.usecurling.com/p/1600/600?q=city%20buildings&color=blue"
        alt="Rondonópolis"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
      />
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl animate-fade-in-up">
          Encontre os melhores profissionais em <span className="text-primary">Rondonópolis</span>
        </h1>
        <p
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          De eletricistas a diaristas, conecte-se direto pelo WhatsApp com prestadores de serviço de
          confiança perto de você.
        </p>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl flex flex-col md:flex-row gap-3 bg-white p-3 rounded-2xl shadow-xl animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="O que você precisa? (ex: eletricista)"
              className="pl-10 h-12 text-base border-0 focus-visible:ring-0 shadow-none bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-px h-8 bg-border hidden md:block self-center mx-2" />
          <div className="w-full md:w-72">
            <MultiSelect
              options={NEIGHBORHOOD_OPTIONS}
              selected={neighborhoods}
              onChange={setNeighborhoods}
              placeholder="Todas as regiões"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-8 rounded-xl text-base font-semibold shrink-0"
          >
            Buscar
          </Button>
        </form>
      </div>
    </div>
  )
}
