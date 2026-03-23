export type Plan = {
  id: string
  name: string
  price: number
  features: string[]
}

export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  group?: string
  suggested_services?: string[]
}

export type Neighborhood = {
  id: string
  name: string
  latitude: number
  longitude: number
  group?: string
}

export type Service = {
  id: string
  professional_id: string
  name: string
}

export type Review = {
  id: string
  professional_id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
}

export type Professional = {
  id: string
  name: string
  email?: string
  phone: string
  description: string
  address?: string
  latitude?: number
  longitude?: number
  category_id: string
  neighborhood_id: string
  plan_id: string
  verified: boolean
  image: string
  gallery: string[]
  working_hours: string
  premium_highlight?: 'top1' | 'recommended' | null
  subscription_status?: 'active' | 'expired' | null
}

export type Ad = {
  id: string
  companyName: string
  description: string
  imageUrl: string
  link: string
  targetCategories: string[]
  active: boolean
  phone?: string
  website?: string
  facebook?: string
  instagram?: string
  isGeneral?: boolean
}

export const MOCK_PLANS: Plan[] = [
  {
    id: 'plan-free',
    name: 'Gratuito',
    price: 0,
    features: ['Perfil básico', 'Aparece nas buscas'],
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    price: 0,
    features: ['Destaque nas buscas', 'Selo Premium', 'Galeria de fotos expandida'],
  },
]

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Eletricista',
    slug: 'eletricista',
    icon: 'zap',
    group: 'Manutenção e Técnicos',
    suggested_services: ['Instalação de tomadas', 'Troca de fiação', 'Quadro de luz'],
  },
  {
    id: 'c2',
    name: 'Encanador',
    slug: 'encanador',
    icon: 'wrench',
    group: 'Manutenção e Técnicos',
    suggested_services: ['Caça-vazamentos', 'Desentupimento', 'Instalação de pias'],
  },
  {
    id: 'c3',
    name: 'Diarista',
    slug: 'diarista',
    icon: 'sparkles',
    group: 'Serviços Domésticos',
    suggested_services: ['Faxina geral', 'Limpeza pós-obra', 'Passadoria'],
  },
  {
    id: 'c4',
    name: 'Mecânico',
    slug: 'mecanico',
    icon: 'car',
    group: 'Automotivo',
    suggested_services: ['Revisão geral', 'Troca de óleo', 'Suspensão'],
  },
  {
    id: 'c5',
    name: 'Pedreiro',
    slug: 'pedreiro',
    icon: 'hammer',
    group: 'Casa e Construção',
    suggested_services: ['Alvenaria', 'Reboco', 'Contra-piso'],
  },
  {
    id: 'c6',
    name: 'Ar-condicionado',
    slug: 'ar-condicionado',
    icon: 'wind',
    group: 'Manutenção e Técnicos',
    suggested_services: ['Instalação', 'Limpeza de filtros', 'Carga de gás'],
  },
  {
    id: 'c7',
    name: 'Informática',
    slug: 'informatica',
    icon: 'monitor',
    group: 'Tecnologia',
    suggested_services: ['Formatação', 'Montagem de PC', 'Remoção de vírus'],
  },
  {
    id: 'c8',
    name: 'Pintor',
    slug: 'pintor',
    icon: 'paintbrush',
    group: 'Casa e Construção',
    suggested_services: ['Pintura interna', 'Pintura externa', 'Massa corrida'],
  },
  {
    id: 'c9',
    name: 'Frete',
    slug: 'frete',
    icon: 'truck',
    group: 'Transporte e Frete',
    suggested_services: ['Mudanças', 'Transporte de cargas', 'Montagem de móveis'],
  },
  {
    id: 'c10',
    name: 'Advogado',
    slug: 'advogado',
    icon: 'briefcase',
    group: 'Profissionais Especializados',
    suggested_services: ['Consultoria jurídica', 'Causas trabalhistas', 'Direito de família'],
  },
]

export const MOCK_NEIGHBORHOODS: Neighborhood[] = [
  { id: 'n1', name: 'Centro', latitude: -16.4674, longitude: -54.6382, group: 'Centro e região' },
  { id: 'n2', name: 'Vila Aurora', latitude: -16.475, longitude: -54.64, group: 'Centro e região' },
  {
    id: 'n3',
    name: 'Parque Sagrada Família',
    latitude: -16.45,
    longitude: -54.62,
    group: 'Região Sagrada Família',
  },
  {
    id: 'n4',
    name: 'Jardim Atlântico',
    latitude: -16.48,
    longitude: -54.65,
    group: 'Região Atlântico',
  },
  {
    id: 'n5',
    name: 'Vila Operária',
    latitude: -16.49,
    longitude: -54.61,
    group: 'Região Vila Operária',
  },
  { id: 'n6', name: 'Todos os bairros', latitude: -16.4514, longitude: -54.6308, group: 'Geral' },
]

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'Roberto Carlos',
    email: 'roberto@example.com',
    phone: '5566999999999',
    description:
      'Eletricista com mais de 10 anos de experiência. Atendimento rápido e seguro para residências e comércios. Especialista em painéis solares e instalações de alta tensão.',
    address: 'Av. Amazonas, 1000, Centro',
    latitude: -16.4674,
    longitude: -54.6382,
    category_id: 'c1',
    neighborhood_id: 'n1',
    plan_id: 'plan-premium',
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=1',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=electrical%20wires',
      'https://img.usecurling.com/p/400/300?q=lightbulb',
      'https://img.usecurling.com/p/400/300?q=electrical%20panel',
    ],
    working_hours: 'Seg-Sexta: 08h às 18h | Sábado: 08h às 12h',
    premium_highlight: 'top1',
    subscription_status: 'active',
  },
  {
    id: 'p2',
    name: 'Ana Souza',
    phone: '5566999999998',
    description:
      'Limpeza pesada e organização de ambientes. Deixo sua casa brilhando com produtos de alta qualidade e muito capricho.',
    category_id: 'c3',
    neighborhood_id: 'n3',
    plan_id: 'plan-premium',
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=clean%20house',
      'https://img.usecurling.com/p/400/300?q=living%20room',
    ],
    working_hours: 'Seg-Sábado: 07h às 17h',
    premium_highlight: 'recommended',
    subscription_status: 'active',
  },
  {
    id: 'p3',
    name: 'Marcos Paulo',
    phone: '5566999999997',
    description:
      'Encanador especializado em detecção de vazamentos e desentupimentos sem quebra-quebra.',
    category_id: 'c2',
    neighborhood_id: 'n4',
    plan_id: 'plan-free',
    verified: false,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=3',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=plumbing',
      'https://img.usecurling.com/p/400/300?q=water%20pipe',
    ],
    working_hours: 'Atendimento 24h Emergencial',
    subscription_status: 'expired',
  },
  {
    id: 'p4',
    name: 'Claudio Pinturas',
    phone: '5566999999996',
    description:
      'Renove as cores da sua vida! Pintura residencial e comercial com acabamento impecável.',
    category_id: 'c8',
    neighborhood_id: 'n2',
    plan_id: 'plan-premium',
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=painting%20wall',
      'https://img.usecurling.com/p/400/300?q=paint%20bucket',
    ],
    working_hours: 'Seg-Sexta: 08h às 17h',
    subscription_status: 'active',
  },
  {
    id: 'p5',
    name: 'Tech Fix Soluções',
    phone: '5566999999995',
    description:
      'Seu computador parou? Nós resolvemos. Formatação, troca de peças e montagem de PC Gamer.',
    address: 'Av. Bandeirantes, 250, Vila Operária',
    category_id: 'c7',
    neighborhood_id: 'n5',
    plan_id: 'plan-free',
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=computer%20repair',
      'https://img.usecurling.com/p/400/300?q=motherboard',
    ],
    working_hours: 'Seg-Sexta: 09h às 18h',
  },
]

export const MOCK_SERVICES: Service[] = [
  { id: 's1', professional_id: 'p1', name: 'Troca de fiação' },
  { id: 's2', professional_id: 'p1', name: 'Instalação de disjuntores' },
  { id: 's3', professional_id: 'p1', name: 'Projetos luminotécnicos' },
  { id: 's4', professional_id: 'p2', name: 'Limpeza pós-obra' },
  { id: 's5', professional_id: 'p2', name: 'Faxina geral' },
  { id: 's6', professional_id: 'p3', name: 'Caça-vazamento' },
  { id: 's7', professional_id: 'p3', name: 'Desentupimento' },
  { id: 's8', professional_id: 'p4', name: 'Pintura interna' },
  { id: 's9', professional_id: 'p4', name: 'Pintura externa' },
  { id: 's10', professional_id: 'p5', name: 'Formatação' },
  { id: 's11', professional_id: 'p5', name: 'Montagem de PC' },
]

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    professional_id: 'p1',
    reviewer_name: 'João Silva',
    rating: 5,
    comment: 'Excelente serviço, rápido e limpo!',
    created_at: '2026-03-12T10:00:00Z',
  },
  {
    id: 'r2',
    professional_id: 'p2',
    reviewer_name: 'Maria Oliveira',
    rating: 4,
    comment: 'Muito bom, recomendo.',
    created_at: '2026-03-10T10:00:00Z',
  },
  {
    id: 'r3',
    professional_id: 'p3',
    reviewer_name: 'Carlos Mendes',
    rating: 5,
    comment: 'Resolveu meu problema em minutos.',
    created_at: '2026-03-05T10:00:00Z',
  },
]

export const MOCK_ADS: Ad[] = [
  {
    id: 'ad1',
    companyName: 'ConstruMax Materiais',
    description: 'Tudo para sua obra com os melhores preços. Entrega rápida em toda Rondonópolis!',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=construction%20materials&color=orange',
    link: 'https://wa.me/5566999999999',
    targetCategories: ['Casa e Construção', 'eletricista', 'encanador', 'pedreiro', 'pintor'],
    active: true,
    phone: '5566999999999',
    website: 'https://exemplo.com',
  },
  {
    id: 'ad2',
    companyName: 'AutoPeças Rondon',
    description: 'Peças originais e paralelas para todas as marcas. Venha conferir nosso estoque.',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=auto%20parts&color=blue',
    link: 'https://wa.me/5566999999998',
    targetCategories: ['Automotivo', 'mecanico'],
    active: true,
    phone: '5566999999998',
    instagram: 'https://instagram.com',
  },
]

// To maintain compatibility with older mock data references in isolated components
export const CATEGORY_OPTIONS = MOCK_CATEGORIES.map((c) => ({
  label: c.name,
  value: c.id,
  group: c.group,
}))
export const CATEGORY_GROUPS = MOCK_CATEGORIES.reduce(
  (acc, c) => {
    const group = c.group || 'Outros'
    if (!acc[group]) acc[group] = []
    acc[group].push(c.name)
    return acc
  },
  {} as Record<string, string[]>,
)
