export type Category = string

export type Review = {
  id: string
  author: string
  rating: number
  text: string
  date: string
}

export type Professional = {
  id: string
  name: string
  categories: Category[]
  rating: number
  reviewsCount: number
  neighborhoods: string[]
  premium: boolean
  verified: boolean
  phone: string
  description: string
  services: string[]
  image: string
  gallery: string[]
  reviews: Review[]
  workingHours: string
}

export const CATEGORY_GROUPS = {
  'Casa e Construção': [
    'Pedreiro',
    'Pintor',
    'Marceneiro',
    'Vidraceiro',
    'Gesseiro',
    'Azulejista',
    'Reformas em geral',
  ],
  'Manutenção e Técnicos': [
    'Eletricista',
    'Encanador',
    'Ar-condicionado',
    'Instalação elétrica',
    'Aquecedor',
    'Técnico em eletrodomésticos',
  ],
  'Serviços Domésticos': ['Diarista', 'Faxineira', 'Babá', 'Cuidador de idosos', 'Pet sitter'],
  Automotivo: [
    'Mecânico',
    'Guincho',
    'Bateria automotiva',
    'Lava jato',
    'Borracharia',
    'Funilaria',
  ],
  Tecnologia: [
    'Informática',
    'Conserto de celular',
    'Instalação de internet',
    'Câmeras de segurança',
    'Redes e Wi-Fi',
  ],
  'Serviços Externos': [
    'Jardinagem',
    'Paisagismo',
    'Roçagem de lote',
    'Limpeza de terreno',
    'Caçamba (entulho)',
  ],
  Eventos: ['DJ', 'Fotógrafo', 'Filmagem', 'Decoração', 'Buffet'],
  'Profissionais Especializados': [
    'Advogado',
    'Contador',
    'Personal trainer',
    'Cabeleireiro',
    'Manicure',
  ],
  Pets: ['Banho e tosa', 'Adestrador', 'Veterinário'],
  'Transporte e Frete': ['Frete', 'Mudança', 'Entregador'],
}

export const CATEGORY_OPTIONS = [
  ...Object.entries(CATEGORY_GROUPS).flatMap(([group, cats]) =>
    cats.map((c) => ({ label: c, value: c, group })),
  ),
  { label: 'Outro (Especificar)', value: 'Outro', group: 'Outros' },
]

export const MOCK_CATEGORIES = Object.values(CATEGORY_GROUPS).flat()

export const POPULAR_CATEGORIES = [
  'Eletricista',
  'Encanador',
  'Diarista',
  'Mecânico',
  'Pedreiro',
  'Ar-condicionado',
  'Informática',
  'Pintor',
]

export const NEIGHBORHOOD_GROUPS = {
  'Centro e região': [
    'Centro',
    'Vila Goulart',
    'Vila Aurora',
    'Vila Aurora I',
    'Vila Aurora II',
    'Vila Aurora III',
    'Jardim Mato Grosso',
  ],
  'Região Sagrada Família / Universitário': [
    'Parque Sagrada Família',
    'Cidade Universitária',
    'Parque Residencial Universitário',
  ],
  'Região Atlântico / Liberdade': [
    'Jardim Atlântico',
    'Jardim Liberdade',
    'Jardim Iguaçu',
    'Jardim Iguaçu I',
    'Jardim Iguaçu II',
  ],
  'Região Salmen / Pedra 90': ['Cidade Salmen', 'Pedra Noventa', 'Jardim Primavera'],
  'Região Grande Conquista / Cidade Alta': ['Cidade Alta', 'Parque São Jorge', 'Jardim Europa'],
  'Região Vila Operária': ['Vila Operária', 'Vila Olinda', 'Vila Mariana'],
  Outros: [
    'Jardim Belo Horizonte',
    'Jardim Tropical',
    'Jardim Guanabara',
    'Jardim Brasília',
    'Jardim Santa Clara',
    'Jardim Morumbi',
    'Jardim Pindorama',
    'Jardim Copacabana',
    'Jardim Ipanema',
    'Jardim das Flores',
    'Jardim Eldorado',
    'Jardim Gramado',
    'Jardim Novo Horizonte',
    'Jardim América',
    'Jardim Beira Rio',
    'Jardim São Francisco',
    'Jardim Santa Marta',
    'Jardim Dom Bosco',
  ],
  Conjuntos: [
    'Cohab Rio Vermelho',
    'Conjunto São José',
    'Coophalis',
    'Cidade de Deus',
    'Residencial Paraíso',
    'Residencial Buriti',
    'Residencial Bela Vista',
  ],
  Rurais: [
    'Chácaras Beira Rio',
    'Chácaras Paraíso',
    'Chácaras Nossa Senhora da Guia',
    'Chácara Alegria',
    'Chácara Beija-Flor',
  ],
  Industriais: ['Distrito Industrial', 'Parque Industrial Vetorasso'],
}

export const NEIGHBORHOOD_OPTIONS = [
  { label: 'Atendo toda a cidade', value: 'Todos os bairros', group: 'Geral' },
  ...Object.entries(NEIGHBORHOOD_GROUPS).flatMap(([group, hoods]) =>
    hoods.map((n) => ({ label: n, value: n, group })),
  ),
]

export const MOCK_NEIGHBORHOODS = Object.values(NEIGHBORHOOD_GROUPS).flat()

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'João Silva',
    rating: 5,
    text: 'Excelente serviço, rápido e limpo!',
    date: '12/03/2026',
  },
  {
    id: 'r2',
    author: 'Maria Oliveira',
    rating: 4,
    text: 'Muito bom, recomendo.',
    date: '10/03/2026',
  },
  {
    id: 'r3',
    author: 'Carlos Mendes',
    rating: 5,
    text: 'Resolveu meu problema em minutos.',
    date: '05/03/2026',
  },
]

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'Roberto Carlos',
    categories: ['Eletricista', 'Instalação elétrica'],
    rating: 4.8,
    reviewsCount: 42,
    neighborhoods: ['Centro', 'Vila Aurora'],
    premium: true,
    verified: true,
    phone: '5566999999999',
    description:
      'Eletricista com mais de 10 anos de experiência. Atendimento rápido e seguro para residências e comércios. Especialista em painéis solares e instalações de alta tensão.',
    services: [
      'Troca de fiação',
      'Instalação de disjuntores',
      'Manutenção preventiva',
      'Projetos luminotécnicos',
    ],
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=electrical%20wires',
      'https://img.usecurling.com/p/400/300?q=lightbulb',
      'https://img.usecurling.com/p/400/300?q=electrical%20panel',
    ],
    reviews: MOCK_REVIEWS,
    workingHours: 'Seg-Sexta: 08h às 18h | Sábado: 08h às 12h',
  },
  {
    id: 'p2',
    name: 'Ana Souza',
    categories: ['Diarista', 'Faxineira'],
    rating: 5.0,
    reviewsCount: 128,
    neighborhoods: ['Centro', 'Parque Sagrada Família'],
    premium: true,
    verified: true,
    phone: '5566999999998',
    description:
      'Limpeza pesada e organização de ambientes. Deixo sua casa brilhando com produtos de alta qualidade e muito capricho.',
    services: ['Limpeza pós-obra', 'Faxina geral', 'Passadoria', 'Organização de armários'],
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=clean%20house',
      'https://img.usecurling.com/p/400/300?q=living%20room',
    ],
    reviews: MOCK_REVIEWS,
    workingHours: 'Seg-Sábado: 07h às 17h',
  },
  {
    id: 'p3',
    name: 'Marcos Paulo',
    categories: ['Encanador'],
    rating: 4.5,
    reviewsCount: 15,
    neighborhoods: ['Parque Sagrada Família', 'Jardim Atlântico'],
    premium: false,
    verified: false,
    phone: '5566999999997',
    description:
      'Encanador especializado em detecção de vazamentos e desentupimentos sem quebra-quebra.',
    services: ['Caça-vazamento', 'Desentupimento', 'Instalação de pias', 'Reparos em caixas dágua'],
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=3',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=plumbing',
      'https://img.usecurling.com/p/400/300?q=water%20pipe',
    ],
    reviews: MOCK_REVIEWS,
    workingHours: 'Atendimento 24h Emergencial',
  },
  {
    id: 'p4',
    name: 'Claudio Pinturas',
    categories: ['Pintor', 'Reformas em geral'],
    rating: 4.9,
    reviewsCount: 56,
    neighborhoods: ['Parque Universitário', 'Centro'],
    premium: true,
    verified: true,
    phone: '5566999999996',
    description:
      'Renove as cores da sua vida! Pintura residencial e comercial com acabamento impecável.',
    services: ['Pintura interna', 'Pintura externa', 'Texturas', 'Massa corrida'],
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=painting%20wall',
      'https://img.usecurling.com/p/400/300?q=paint%20bucket',
    ],
    reviews: MOCK_REVIEWS,
    workingHours: 'Seg-Sexta: 08h às 17h',
  },
  {
    id: 'p5',
    name: 'Tech Fix Soluções',
    categories: ['Informática', 'Conserto de celular'],
    rating: 4.7,
    reviewsCount: 89,
    neighborhoods: ['Vila Operária', 'Centro'],
    premium: false,
    verified: true,
    phone: '5566999999995',
    description:
      'Seu computador parou? Nós resolvemos. Formatação, troca de peças e montagem de PC Gamer.',
    services: ['Formatação', 'Remoção de vírus', 'Montagem de PC', 'Recuperação de dados'],
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=computer%20repair',
      'https://img.usecurling.com/p/400/300?q=motherboard',
    ],
    reviews: MOCK_REVIEWS,
    workingHours: 'Seg-Sexta: 09h às 18h',
  },
]
