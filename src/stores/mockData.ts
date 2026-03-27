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
  emoji?: string
  group?: string
  groupEmoji?: string
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
  created_at?: string
  whatsapp_clicks?: number
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

export const PLAN_FREE_ID = 'b0000000-0000-4000-8000-000000000001'
export const PLAN_PREMIUM_ID = 'b0000000-0000-4000-8000-000000000002'
export const PLAN_PENDING_ID = 'b0000000-0000-4000-8000-000000000003'
export const NB_ALL_ID = 'a0000000-0000-4000-8000-000000000006'

export const MOCK_PLANS: Plan[] = [
  {
    id: PLAN_FREE_ID,
    name: 'Gratuito',
    price: 0,
    features: ['Perfil básico', 'Aparece nas buscas'],
  },
  {
    id: PLAN_PREMIUM_ID,
    name: 'Premium',
    price: 0,
    features: ['Destaque nas buscas', 'Selo Premium', 'Galeria de fotos expandida'],
  },
  { id: PLAN_PENDING_ID, name: 'Pendente', price: 0, features: ['Aguardando aprovação'] },
]

export const MOCK_CATEGORIES: Category[] = [
  // 🏠 Casa e Construção
  {
    id: 'c0000000-0000-4000-8000-000000000001',
    name: 'Pedreiro',
    slug: 'pedreiro',
    emoji: '🧱',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'hammer',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000002',
    name: 'Pintor',
    slug: 'pintor',
    emoji: '🎨',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'paintbrush',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000003',
    name: 'Marceneiro',
    slug: 'marceneiro',
    emoji: '🪵',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'hammer',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000004',
    name: 'Vidraceiro',
    slug: 'vidraceiro',
    emoji: '🪟',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'hammer',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000005',
    name: 'Gesseiro',
    slug: 'gesseiro',
    emoji: '🏢',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'hammer',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000006',
    name: 'Azulejista',
    slug: 'azulejista',
    emoji: '📏',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'hammer',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000007',
    name: 'Reformas em geral',
    slug: 'reformas-em-geral',
    emoji: '🏗️',
    group: 'Casa e Construção',
    groupEmoji: '🏠',
    icon: 'hammer',
  },
  // ⚡ Manutenção e Técnicos
  {
    id: 'c0000000-0000-4000-8000-000000000008',
    name: 'Eletricista',
    slug: 'eletricista',
    emoji: '⚡',
    group: 'Manutenção e Técnicos',
    groupEmoji: '⚡',
    icon: 'zap',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000009',
    name: 'Encanador',
    slug: 'encanador',
    emoji: '🪠',
    group: 'Manutenção e Técnicos',
    groupEmoji: '⚡',
    icon: 'wrench',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000010',
    name: 'Ar-condicionado',
    slug: 'ar-condicionado',
    emoji: '❄️',
    group: 'Manutenção e Técnicos',
    groupEmoji: '⚡',
    icon: 'wind',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000011',
    name: 'Instalação elétrica',
    slug: 'instalacao-eletrica',
    emoji: '🔌',
    group: 'Manutenção e Técnicos',
    groupEmoji: '⚡',
    icon: 'zap',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000012',
    name: 'Aquecedor',
    slug: 'aquecedor',
    emoji: '🔥',
    group: 'Manutenção e Técnicos',
    groupEmoji: '⚡',
    icon: 'zap',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000013',
    name: 'Técnico em eletrodomésticos',
    slug: 'tecnico-em-eletrodomesticos',
    emoji: '📻',
    group: 'Manutenção e Técnicos',
    groupEmoji: '⚡',
    icon: 'wrench',
  },
  // 🧹 Serviços Domésticos
  {
    id: 'c0000000-0000-4000-8000-000000000014',
    name: 'Diarista',
    slug: 'diarista',
    emoji: '🧹',
    group: 'Serviços Domésticos',
    groupEmoji: '🧹',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000015',
    name: 'Faxineira',
    slug: 'faxineira',
    emoji: '🧼',
    group: 'Serviços Domésticos',
    groupEmoji: '🧹',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000016',
    name: 'Babá',
    slug: 'baba',
    emoji: '👶',
    group: 'Serviços Domésticos',
    groupEmoji: '🧹',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000017',
    name: 'Cuidador de idosos',
    slug: 'cuidador-de-idosos',
    emoji: '👵',
    group: 'Serviços Domésticos',
    groupEmoji: '🧹',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000018',
    name: 'Pet sitter',
    slug: 'pet-sitter',
    emoji: '🐕',
    group: 'Serviços Domésticos',
    groupEmoji: '🧹',
    icon: 'sparkles',
  },
  // 🚗 Automotivo
  {
    id: 'c0000000-0000-4000-8000-000000000019',
    name: 'Mecânico',
    slug: 'mecanico',
    emoji: '🔧',
    group: 'Automotivo',
    groupEmoji: '🚗',
    icon: 'car',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000020',
    name: 'Guincho',
    slug: 'guincho',
    emoji: '🛻',
    group: 'Automotivo',
    groupEmoji: '🚗',
    icon: 'car',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000021',
    name: 'Bateria automotiva',
    slug: 'bateria-automotiva',
    emoji: '🔋',
    group: 'Automotivo',
    groupEmoji: '🚗',
    icon: 'car',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000022',
    name: 'Lava jato',
    slug: 'lava-jato',
    emoji: '🧽',
    group: 'Automotivo',
    groupEmoji: '🚗',
    icon: 'car',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000023',
    name: 'Borracharia',
    slug: 'borracharia',
    emoji: '🛞',
    group: 'Automotivo',
    groupEmoji: '🚗',
    icon: 'car',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000024',
    name: 'Funilaria',
    slug: 'funilaria',
    emoji: '🔨',
    group: 'Automotivo',
    groupEmoji: '🚗',
    icon: 'car',
  },
  // 💻 Tecnologia
  {
    id: 'c0000000-0000-4000-8000-000000000025',
    name: 'Informática',
    slug: 'informatica',
    emoji: '💻',
    group: 'Tecnologia',
    groupEmoji: '💻',
    icon: 'monitor',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000026',
    name: 'Conserto de celular',
    slug: 'conserto-de-celular',
    emoji: '📱',
    group: 'Tecnologia',
    groupEmoji: '💻',
    icon: 'monitor',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000027',
    name: 'Instalação de internet',
    slug: 'instalacao-de-internet',
    emoji: '🌐',
    group: 'Tecnologia',
    groupEmoji: '💻',
    icon: 'monitor',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000028',
    name: 'Câmeras de segurança',
    slug: 'cameras-de-seguranca',
    emoji: '📹',
    group: 'Tecnologia',
    groupEmoji: '💻',
    icon: 'monitor',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000029',
    name: 'Redes e Wi-Fi',
    slug: 'redes-e-wifi',
    emoji: '📶',
    group: 'Tecnologia',
    groupEmoji: '💻',
    icon: 'monitor',
  },
  // 🌿 Serviços Externos
  {
    id: 'c0000000-0000-4000-8000-000000000030',
    name: 'Jardinagem',
    slug: 'jardinagem',
    emoji: '🌿',
    group: 'Serviços Externos',
    groupEmoji: '🌿',
    icon: 'wind',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000031',
    name: 'Paisagismo',
    slug: 'paisagismo',
    emoji: '🌳',
    group: 'Serviços Externos',
    groupEmoji: '🌿',
    icon: 'wind',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000032',
    name: 'Roçagem de lote',
    slug: 'rocagem-de-lote',
    emoji: '🚜',
    group: 'Serviços Externos',
    groupEmoji: '🌿',
    icon: 'wind',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000033',
    name: 'Limpeza de terreno',
    slug: 'limpeza-de-terreno',
    emoji: '🗑️',
    group: 'Serviços Externos',
    groupEmoji: '🌿',
    icon: 'wind',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000034',
    name: 'Caçamba (entulho)',
    slug: 'cacamba-entulho',
    emoji: '🏗️',
    group: 'Serviços Externos',
    groupEmoji: '🌿',
    icon: 'wind',
  },
  // 🎉 Eventos
  {
    id: 'c0000000-0000-4000-8000-000000000035',
    name: 'DJ',
    slug: 'dj',
    emoji: '🎧',
    group: 'Eventos',
    groupEmoji: '🎉',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000036',
    name: 'Fotógrafo',
    slug: 'fotografo',
    emoji: '📸',
    group: 'Eventos',
    groupEmoji: '🎉',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000037',
    name: 'Filmagem',
    slug: 'filmagem',
    emoji: '🎥',
    group: 'Eventos',
    groupEmoji: '🎉',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000038',
    name: 'Decoração',
    slug: 'decoracao',
    emoji: '🎈',
    group: 'Eventos',
    groupEmoji: '🎉',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000039',
    name: 'Buffet',
    slug: 'buffet',
    emoji: '🍽️',
    group: 'Eventos',
    groupEmoji: '🎉',
    icon: 'sparkles',
  },
  // 🧑‍🔧 Profissionais Especializados
  {
    id: 'c0000000-0000-4000-8000-000000000040',
    name: 'Advogado',
    slug: 'advogado',
    emoji: '⚖️',
    group: 'Profissionais Especializados',
    groupEmoji: '🧑‍🔧',
    icon: 'briefcase',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000041',
    name: 'Contador',
    slug: 'contador',
    emoji: '📊',
    group: 'Profissionais Especializados',
    groupEmoji: '🧑‍🔧',
    icon: 'briefcase',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000042',
    name: 'Personal trainer',
    slug: 'personal-trainer',
    emoji: '💪',
    group: 'Profissionais Especializados',
    groupEmoji: '🧑‍🔧',
    icon: 'briefcase',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000043',
    name: 'Cabeleireiro',
    slug: 'cabeleireiro',
    emoji: '✂️',
    group: 'Profissionais Especializados',
    groupEmoji: '🧑‍🔧',
    icon: 'briefcase',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000044',
    name: 'Manicure',
    slug: 'manicure',
    emoji: '💅',
    group: 'Profissionais Especializados',
    groupEmoji: '🧑‍🔧',
    icon: 'briefcase',
  },
  // 🐾 Pets
  {
    id: 'c0000000-0000-4000-8000-000000000045',
    name: 'Banho e tosa',
    slug: 'banho-e-tosa',
    emoji: '🛁',
    group: 'Pets',
    groupEmoji: '🐾',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000046',
    name: 'Adestrador',
    slug: 'adestrador',
    emoji: '🐕‍🦺',
    group: 'Pets',
    groupEmoji: '🐾',
    icon: 'sparkles',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000047',
    name: 'Veterinário',
    slug: 'veterinario',
    emoji: '🩺',
    group: 'Pets',
    groupEmoji: '🐾',
    icon: 'sparkles',
  },
  // 🚚 Transporte e Frete
  {
    id: 'c0000000-0000-4000-8000-000000000048',
    name: 'Frete',
    slug: 'frete',
    emoji: '🚚',
    group: 'Transporte e Frete',
    groupEmoji: '🚚',
    icon: 'truck',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000049',
    name: 'Mudança',
    slug: 'mudanca',
    emoji: '📦',
    group: 'Transporte e Frete',
    groupEmoji: '🚚',
    icon: 'truck',
  },
  {
    id: 'c0000000-0000-4000-8000-000000000050',
    name: 'Entregador',
    slug: 'entregador',
    emoji: '🛵',
    group: 'Transporte e Frete',
    groupEmoji: '🚚',
    icon: 'truck',
  },
]

export const MOCK_NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'a0000000-0000-4000-8000-000000000001',
    name: 'Centro',
    latitude: -16.4674,
    longitude: -54.6382,
    group: 'Centro e região',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000002',
    name: 'Vila Aurora',
    latitude: -16.475,
    longitude: -54.64,
    group: 'Centro e região',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000003',
    name: 'Parque Sagrada Família',
    latitude: -16.45,
    longitude: -54.62,
    group: 'Região Sagrada Família',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000004',
    name: 'Jardim Atlântico',
    latitude: -16.48,
    longitude: -54.65,
    group: 'Região Atlântico',
  },
  {
    id: 'a0000000-0000-4000-8000-000000000005',
    name: 'Vila Operária',
    latitude: -16.49,
    longitude: -54.61,
    group: 'Região Vila Operária',
  },
  {
    id: NB_ALL_ID,
    name: 'Todos os bairros',
    latitude: -16.4514,
    longitude: -54.6308,
    group: 'Geral',
  },
]

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'd0000000-0000-4000-8000-000000000001',
    name: 'Roberto Carlos',
    email: 'roberto@example.com',
    phone: '5566999999999',
    description:
      'Eletricista com mais de 10 anos de experiência. Atendimento rápido e seguro para residências e comércios. Especialista em painéis solares e instalações de alta tensão.',
    address: 'Av. Amazonas, 1000, Centro',
    latitude: -16.4674,
    longitude: -54.6382,
    category_id: 'c0000000-0000-4000-8000-000000000008',
    neighborhood_id: 'a0000000-0000-4000-8000-000000000001',
    plan_id: PLAN_PREMIUM_ID,
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
    created_at: '2023-01-15T10:00:00Z',
    whatsapp_clicks: 124,
  },
  {
    id: 'd0000000-0000-4000-8000-000000000002',
    name: 'Ana Souza',
    phone: '5566999999998',
    description:
      'Limpeza pesada e organização de ambientes. Deixo sua casa brilhando com produtos de alta qualidade e muito capricho.',
    category_id: 'c0000000-0000-4000-8000-000000000014',
    neighborhood_id: 'a0000000-0000-4000-8000-000000000003',
    plan_id: PLAN_PREMIUM_ID,
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=clean%20house',
      'https://img.usecurling.com/p/400/300?q=living%20room',
    ],
    working_hours: 'Seg-Sábado: 07h às 17h',
    premium_highlight: 'recommended',
    subscription_status: 'active',
    created_at: '2023-05-20T14:30:00Z',
    whatsapp_clicks: 89,
  },
  {
    id: 'd0000000-0000-4000-8000-000000000003',
    name: 'Marcos Paulo',
    phone: '5566999999997',
    description:
      'Encanador especializado em detecção de vazamentos e desentupimentos sem quebra-quebra.',
    category_id: 'c0000000-0000-4000-8000-000000000009',
    neighborhood_id: 'a0000000-0000-4000-8000-000000000004',
    plan_id: PLAN_FREE_ID,
    verified: false,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=3',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=plumbing',
      'https://img.usecurling.com/p/400/300?q=water%20pipe',
    ],
    working_hours: 'Atendimento 24h Emergencial',
    subscription_status: 'expired',
    created_at: '2023-11-05T09:15:00Z',
    whatsapp_clicks: 42,
  },
  {
    id: 'd0000000-0000-4000-8000-000000000004',
    name: 'Claudio Pinturas',
    phone: '5566999999996',
    description:
      'Renove as cores da sua vida! Pintura residencial e comercial com acabamento impecável.',
    category_id: 'c0000000-0000-4000-8000-000000000002',
    neighborhood_id: 'a0000000-0000-4000-8000-000000000002',
    plan_id: PLAN_PREMIUM_ID,
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=painting%20wall',
      'https://img.usecurling.com/p/400/300?q=paint%20bucket',
    ],
    working_hours: 'Seg-Sexta: 08h às 17h',
    subscription_status: 'active',
    created_at: '2024-01-10T08:00:00Z',
    whatsapp_clicks: 67,
  },
  {
    id: 'd0000000-0000-4000-8000-000000000005',
    name: 'Tech Fix Soluções',
    phone: '5566999999995',
    description:
      'Seu computador parou? Nós resolvemos. Formatação, troca de peças e montagem de PC Gamer.',
    address: 'Av. Bandeirantes, 250, Vila Operária',
    category_id: 'c0000000-0000-4000-8000-000000000025',
    neighborhood_id: 'a0000000-0000-4000-8000-000000000005',
    plan_id: PLAN_FREE_ID,
    verified: true,
    image: 'https://img.usecurling.com/ppl/medium?gender=male&seed=5',
    gallery: [
      'https://img.usecurling.com/p/400/300?q=computer%20repair',
      'https://img.usecurling.com/p/400/300?q=motherboard',
    ],
    working_hours: 'Seg-Sexta: 09h às 18h',
    created_at: '2024-02-18T16:45:00Z',
    whatsapp_clicks: 31,
  },
]

export const MOCK_SERVICES: Service[] = [
  {
    id: 'e0000000-0000-4000-8000-000000000001',
    professional_id: 'd0000000-0000-4000-8000-000000000001',
    name: 'Troca de fiação',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000002',
    professional_id: 'd0000000-0000-4000-8000-000000000001',
    name: 'Instalação de disjuntores',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000003',
    professional_id: 'd0000000-0000-4000-8000-000000000001',
    name: 'Projetos luminotécnicos',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000004',
    professional_id: 'd0000000-0000-4000-8000-000000000002',
    name: 'Limpeza pós-obra',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000005',
    professional_id: 'd0000000-0000-4000-8000-000000000002',
    name: 'Faxina geral',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000006',
    professional_id: 'd0000000-0000-4000-8000-000000000003',
    name: 'Caça-vazamento',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000007',
    professional_id: 'd0000000-0000-4000-8000-000000000003',
    name: 'Desentupimento',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000008',
    professional_id: 'd0000000-0000-4000-8000-000000000004',
    name: 'Pintura interna',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000009',
    professional_id: 'd0000000-0000-4000-8000-000000000004',
    name: 'Pintura externa',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000010',
    professional_id: 'd0000000-0000-4000-8000-000000000005',
    name: 'Formatação',
  },
  {
    id: 'e0000000-0000-4000-8000-000000000011',
    professional_id: 'd0000000-0000-4000-8000-000000000005',
    name: 'Montagem de PC',
  },
]

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r0000000-0000-4000-8000-000000000001',
    professional_id: 'd0000000-0000-4000-8000-000000000001',
    reviewer_name: 'João Silva',
    rating: 5,
    comment: 'Excelente serviço, rápido e limpo!',
    created_at: '2026-03-12T10:00:00Z',
  },
  {
    id: 'r0000000-0000-4000-8000-000000000002',
    professional_id: 'd0000000-0000-4000-8000-000000000002',
    reviewer_name: 'Maria Oliveira',
    rating: 4,
    comment: 'Muito bom, recomendo.',
    created_at: '2026-03-10T10:00:00Z',
  },
  {
    id: 'r0000000-0000-4000-8000-000000000003',
    professional_id: 'd0000000-0000-4000-8000-000000000003',
    reviewer_name: 'Carlos Mendes',
    rating: 5,
    comment: 'Resolveu meu problema em minutos.',
    created_at: '2026-03-05T10:00:00Z',
  },
]

export const MOCK_ADS: Ad[] = [
  {
    id: 'f0000000-0000-4000-8000-000000000001',
    companyName: 'ConstruMax Materiais',
    description: 'Tudo para sua obra com os melhores preços. Entrega rápida em toda Rondonópolis!',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=construction%20materials&color=orange',
    link: 'https://wa.me/5566999999999',
    targetCategories: ['Casa e Construção', 'eletricista', 'encanador', 'pedreiro', 'pintor'],
    active: true,
    phone: '5566999999999',
    website: 'https://exemplo.com',
    isGeneral: false,
  },
  {
    id: 'f0000000-0000-4000-8000-000000000002',
    companyName: 'AutoPeças Rondon',
    description: 'Peças originais e paralelas para todas as marcas. Venha conferir nosso estoque.',
    imageUrl: 'https://img.usecurling.com/p/800/400?q=auto%20parts&color=blue',
    link: 'https://wa.me/5566999999998',
    targetCategories: ['Automotivo', 'mecanico'],
    active: true,
    phone: '5566999999998',
    instagram: 'https://instagram.com',
    isGeneral: false,
  },
]

export const CATEGORY_OPTIONS = MOCK_CATEGORIES.map((c) => ({
  label: c.name,
  value: c.id,
  group: c.group,
  emoji: c.emoji,
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
