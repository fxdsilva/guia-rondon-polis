import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/MultiSelect'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useMainStore from '@/stores/main'

export function Hero({
  selectedNeighborhoods,
  onNeighborhoodChange,
}: {
  selectedNeighborhoods?: string[]
  onNeighborhoodChange?: (val: string[]) => void
}) {
  const { categories, neighborhoods } = useMainStore()
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState('todos')
  const [categorySlug, setCategorySlug] = useState('todas')
  const [internalNeighborhoods, setInternalNeighborhoods] = useState<string[]>([])
  const navigate = useNavigate()

  const activeNeighborhoods = selectedNeighborhoods ?? internalNeighborhoods
  const setActiveNeighborhoods = onNeighborhoodChange ?? setInternalNeighborhoods

  const categoryGroups = useMemo(() => {
    const groups: Record<string, typeof categories> = {}
    categories.forEach((c) => {
      const g = c.group || 'Outros'
      if (!groups[g]) groups[g] = []
      groups[g].push(c)
    })
    return groups
  }, [categories])

  const neighborhoodOptions = useMemo(() => {
    return neighborhoods.map((n) => ({
      label: n.name,
      value: n.id,
      group: n.group || 'Outros',
    }))
  }, [neighborhoods])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (activeNeighborhoods.length > 0) params.set('b', activeNeighborhoods.join(','))

    let targetSlug = 'todas'
    if (categorySlug !== 'todas') {
      targetSlug = categorySlug
    } else if (segment !== 'todos') {
      targetSlug = segment.toLowerCase().replace(/\s+/g, '-')
    }

    navigate(`/categoria/${targetSlug}?${params.toString()}`)
  }

  const handleSegmentChange = (val: string) => {
    setSegment(val)
    setCategorySlug('todas')
  }

  return (
    <div className="flex flex-col w-full">
      {/* Top Sticky Search Bar */}
      <div className="bg-white border-b sticky top-16 z-40 shadow-sm py-3 px-4 md:px-0 animate-fade-in-down">
        <div className="container mx-auto">
          <form
            onSubmit={handleSearch}
            className="w-full flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center justify-center max-w-6xl mx-auto"
          >
            <div className="w-full md:w-48 shrink-0">
              <Select value={segment} onValueChange={handleSegmentChange}>
                <SelectTrigger className="h-10 text-sm font-medium bg-muted/30 hover:bg-muted/50 transition-colors border-input">
                  <SelectValue placeholder="Segmento" />
                </SelectTrigger>
                <SelectContent className="max-h-[350px]">
                  <SelectItem value="todos" className="font-semibold">
                    Todos os segmentos
                  </SelectItem>
                  {Object.keys(categoryGroups).map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-56 shrink-0">
              <Select value={categorySlug} onValueChange={setCategorySlug}>
                <SelectTrigger className="h-10 text-sm font-medium bg-muted/30 hover:bg-muted/50 transition-colors border-input">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="max-h-[350px]">
                  <SelectItem value="todas" className="font-semibold">
                    Todas as categorias
                  </SelectItem>
                  {segment === 'todos'
                    ? Object.entries(categoryGroups).map(([group, cats]) => (
                        <SelectGroup key={group}>
                          <SelectLabel className="text-muted-foreground bg-muted/50 mt-1">
                            {group}
                          </SelectLabel>
                          {cats.map((c) => (
                            <SelectItem key={c.id} value={c.slug}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))
                    : categoryGroups[segment]?.map((c) => (
                        <SelectItem key={c.id} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="O que você precisa?"
                className="pl-9 h-10 text-sm bg-muted/30 hover:bg-muted/50 transition-colors border-input focus-visible:ring-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-56 shrink-0">
              <MultiSelect
                options={neighborhoodOptions}
                selected={activeNeighborhoods}
                onChange={setActiveNeighborhoods}
                placeholder="Todas as regiões"
                className="bg-muted/30 hover:bg-muted/50 transition-colors border-input min-h-[40px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto h-10 px-8 font-semibold shrink-0 shadow-sm"
            >
              Buscar
            </Button>
          </form>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-secondary overflow-hidden">
        <img
          src="https://img.usecurling.com/p/1600/600?q=city%20buildings&color=blue"
          alt="Rondonópolis"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-36 md:pt-28 md:pb-48 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl animate-fade-in-up">
            Encontre os melhores profissionais em <span className="text-primary">Rondonópolis</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            De eletricistas a diaristas, conecte-se direto pelo WhatsApp com prestadores de serviço
            de confiança perto de você.
          </p>
        </div>
      </div>
    </div>
  )
}
