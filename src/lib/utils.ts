import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAISuggestions = (cats: string[]) => {
  const suggestions: Record<string, string[]> = {
    Eletricista: [
      'Instalação de tomadas',
      'Troca de fiação',
      'Quadro de luz',
      'Projetos elétricos',
      'Manutenção preventiva',
    ],
    Encanador: [
      'Caça-vazamentos',
      'Desentupimento',
      'Instalação de pias',
      "Limpeza de caixa d'água",
      'Tubulação',
    ],
    Diarista: [
      'Faxina geral',
      'Limpeza pós-obra',
      'Passadoria',
      'Organização de armários',
      'Limpeza de vidros',
    ],
    Mecânico: [
      'Revisão geral',
      'Troca de óleo',
      'Suspensão',
      'Freios',
      'Injeção eletrônica',
      'Alinhamento',
    ],
    Pedreiro: ['Alvenaria', 'Reboco', 'Contra-piso', 'Assentamento de porcelanato', 'Laje'],
    'Ar-condicionado': [
      'Instalação',
      'Limpeza de filtros',
      'Carga de gás',
      'Manutenção corretiva',
      'Higienização profunda',
    ],
    Informática: [
      'Formatação',
      'Montagem de PC',
      'Remoção de vírus',
      'Configuração de redes',
      'Recuperação de dados',
    ],
    Pintor: [
      'Pintura interna',
      'Pintura externa',
      'Massa corrida',
      'Textura',
      'Grafiato',
      'Verniz',
    ],
  }
  let result: string[] = []
  cats.forEach((c) => {
    if (suggestions[c]) result.push(...suggestions[c])
  })
  if (result.length === 0)
    result = [
      'Atendimento a domicílio',
      'Orçamento sem compromisso',
      'Serviço com garantia',
      'Pagamento facilitado',
    ]
  return Array.from(new Set(result)).slice(0, 8)
}
