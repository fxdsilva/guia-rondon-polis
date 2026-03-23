import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import useMainStore from '@/stores/main'
import { NEIGHBORHOOD_GROUPS } from '@/stores/mockData'

const CategoryPage = () => {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { professionals } = useMainStore()

  const initialQuery = searchParams.get('q') || ''
  const initialBairro = searchParams.get('b') || 'Todos os bairros'
  const sortParam = searchParams.get('sort') || 'recomendados'

  const [query, setQuery] = useState(initialQuery)
  const [neighborhood, setNeighborhood] = useState(initialBairro)

  const categoryName = useMemo(() => {
    if (!slug || slug === 'todas') return 'Todas as Categorias'
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }, [slug])

  const filteredPros = useMemo(() => {
    let result = professionals

    if (slug && slug !== 'todas') {
      result = result.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase())
    }

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.services.some((s) => s.toLowerCase().includes(q)),
      )
    }

    if (neighborhood !== 'Todos os bairros') {
      result = result.filter(
        (p) =>
          p.neighborhoods.includes(neighborhood) || p.neighborhoods.includes('Todos os bairros'),
      )
    }

    if (sortParam === 'avaliados') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else {
      result = [...result].sort((a, b) => {
        if (a.premium && !b.premium) return -1
        if (!a.premium && b.premium) return 1
        return b.rating - a.rating
      })
    }

    return result
  }, [professionals, slug, categoryName, query, neighborhood, sortParam])

  const handleFilterUpdate = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value && value !== 'Todos os bairros') {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 border-b pb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">{filteredPros.length} profissionais encontrados</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Filtros</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Buscar</label>
              <Input
                placeholder="Nome ou serviço..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  handleFilterUpdate('q', e.target.value)
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Bairro</label>
              <Select
                value={neighborhood}
                onValueChange={(val) => {
                  setNeighborhood(val)
                  handleFilterUpdate('b', val)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um bairro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos os bairros">Todos os bairros</SelectItem>
                  {Object.entries(NEIGHBORHOOD_GROUPS).map(([group, hoods]) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {hoods.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Ordenar por</label>
              <Select value={sortParam} onValueChange={(val) => handleFilterUpdate('sort', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recomendados">Recomendados</SelectItem>
                  <SelectItem value="avaliados">Melhor Avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {filteredPros.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPros.map((pro) => (
                <div key={pro.id} className="animate-fade-in-up">
                  <ProfessionalCard pro={pro} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed flex flex-col items-center justify-center">
              <Frown className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Nenhum profissional encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros ou busque por outro termo.
              </p>
              <Button
                onClick={() => {
                  setQuery('')
                  setNeighborhood('Todos os bairros')
                  setSearchParams(new URLSearchParams())
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
