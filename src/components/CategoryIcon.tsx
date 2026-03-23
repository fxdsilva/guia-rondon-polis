import { Zap, Wrench, Sparkles, Car, Hammer, Wind, Monitor, Paintbrush } from 'lucide-react'
import { Category } from '@/stores/mockData'

export function CategoryIcon({
  category,
  className,
}: {
  category: Category | string
  className?: string
}) {
  switch (category) {
    case 'Eletricista':
      return <Zap className={className} />
    case 'Encanador':
      return <Wrench className={className} />
    case 'Diarista':
      return <Sparkles className={className} />
    case 'Mecânico':
      return <Car className={className} />
    case 'Pedreiro':
      return <Hammer className={className} />
    case 'Ar-condicionado':
      return <Wind className={className} />
    case 'Informática':
      return <Monitor className={className} />
    case 'Pintor':
      return <Paintbrush className={className} />
    default:
      return <Wrench className={className} />
  }
}
