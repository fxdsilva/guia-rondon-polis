CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    emoji TEXT,
    "group" TEXT,
    group_emoji TEXT,
    icon TEXT,
    suggested_services TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are readable by everyone" ON public.categories;
CREATE POLICY "Categories are readable by everyone" ON public.categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Categories are insertable by everyone" ON public.categories;
CREATE POLICY "Categories are insertable by everyone" ON public.categories
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Categories are updatable by everyone" ON public.categories;
CREATE POLICY "Categories are updatable by everyone" ON public.categories
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Categories are deletable by everyone" ON public.categories;
CREATE POLICY "Categories are deletable by everyone" ON public.categories
  FOR DELETE USING (true);

-- Seed categories for Guia Rondonópolis Directory
INSERT INTO public.categories (id, name, slug, emoji, "group", group_emoji, icon) VALUES
('c0000000-0000-4000-8000-000000000001', 'Pedreiro', 'pedreiro', '🧱', 'Casa e Construção', '🏠', 'hammer'),
('c0000000-0000-4000-8000-000000000002', 'Pintor', 'pintor', '🎨', 'Casa e Construção', '🏠', 'paintbrush'),
('c0000000-0000-4000-8000-000000000003', 'Marceneiro', 'marceneiro', '🪵', 'Casa e Construção', '🏠', 'hammer'),
('c0000000-0000-4000-8000-000000000004', 'Vidraceiro', 'vidraceiro', '🪟', 'Casa e Construção', '🏠', 'hammer'),
('c0000000-0000-4000-8000-000000000005', 'Gesseiro', 'gesseiro', '🏢', 'Casa e Construção', '🏠', 'hammer'),
('c0000000-0000-4000-8000-000000000006', 'Azulejista', 'azulejista', '📏', 'Casa e Construção', '🏠', 'hammer'),
('c0000000-0000-4000-8000-000000000007', 'Reformas em geral', 'reformas-em-geral', '🏗️', 'Casa e Construção', '🏠', 'hammer'),
('c0000000-0000-4000-8000-000000000008', 'Eletricista', 'eletricista', '⚡', 'Manutenção e Técnicos', '⚡', 'zap'),
('c0000000-0000-4000-8000-000000000009', 'Encanador', 'encanador', '🪠', 'Manutenção e Técnicos', '⚡', 'wrench'),
('c0000000-0000-4000-8000-000000000010', 'Ar-condicionado', 'ar-condicionado', '❄️', 'Manutenção e Técnicos', '⚡', 'wind'),
('c0000000-0000-4000-8000-000000000011', 'Instalação elétrica', 'instalacao-eletrica', '🔌', 'Manutenção e Técnicos', '⚡', 'zap'),
('c0000000-0000-4000-8000-000000000012', 'Aquecedor', 'aquecedor', '🔥', 'Manutenção e Técnicos', '⚡', 'zap'),
('c0000000-0000-4000-8000-000000000013', 'Técnico em eletrodomésticos', 'tecnico-em-eletrodomesticos', '📻', 'Manutenção e Técnicos', '⚡', 'wrench'),
('c0000000-0000-4000-8000-000000000014', 'Diarista', 'diarista', '🧹', 'Serviços Domésticos', '🧹', 'sparkles'),
('c0000000-0000-4000-8000-000000000015', 'Faxineira', 'faxineira', '🧼', 'Serviços Domésticos', '🧹', 'sparkles'),
('c0000000-0000-4000-8000-000000000016', 'Babá', 'baba', '👶', 'Serviços Domésticos', '🧹', 'sparkles'),
('c0000000-0000-4000-8000-000000000017', 'Cuidador de idosos', 'cuidador-de-idosos', '👵', 'Serviços Domésticos', '🧹', 'sparkles'),
('c0000000-0000-4000-8000-000000000018', 'Pet sitter', 'pet-sitter', '🐕', 'Serviços Domésticos', '🧹', 'sparkles'),
('c0000000-0000-4000-8000-000000000019', 'Mecânico', 'mecanico', '🔧', 'Automotivo', '🚗', 'car'),
('c0000000-0000-4000-8000-000000000020', 'Guincho', 'guincho', '🛻', 'Automotivo', '🚗', 'car'),
('c0000000-0000-4000-8000-000000000021', 'Bateria automotiva', 'bateria-automotiva', '🔋', 'Automotivo', '🚗', 'car'),
('c0000000-0000-4000-8000-000000000022', 'Lava jato', 'lava-jato', '🧽', 'Automotivo', '🚗', 'car'),
('c0000000-0000-4000-8000-000000000023', 'Borracharia', 'borracharia', '🛞', 'Automotivo', '🚗', 'car'),
('c0000000-0000-4000-8000-000000000024', 'Funilaria', 'funilaria', '🔨', 'Automotivo', '🚗', 'car'),
('c0000000-0000-4000-8000-000000000025', 'Informática', 'informatica', '💻', 'Tecnologia', '💻', 'monitor'),
('c0000000-0000-4000-8000-000000000026', 'Conserto de celular', 'conserto-de-celular', '📱', 'Tecnologia', '💻', 'monitor'),
('c0000000-0000-4000-8000-000000000027', 'Instalação de internet', 'instalacao-de-internet', '🌐', 'Tecnologia', '💻', 'monitor'),
('c0000000-0000-4000-8000-000000000028', 'Câmeras de segurança', 'cameras-de-seguranca', '📹', 'Tecnologia', '💻', 'monitor'),
('c0000000-0000-4000-8000-000000000029', 'Redes e Wi-Fi', 'redes-e-wifi', '📶', 'Tecnologia', '💻', 'monitor'),
('c0000000-0000-4000-8000-000000000030', 'Jardinagem', 'jardinagem', '🌿', 'Serviços Externos', '🌿', 'wind'),
('c0000000-0000-4000-8000-000000000031', 'Paisagismo', 'paisagismo', '🌳', 'Serviços Externos', '🌿', 'wind'),
('c0000000-0000-4000-8000-000000000032', 'Roçagem de lote', 'rocagem-de-lote', '🚜', 'Serviços Externos', '🌿', 'wind'),
('c0000000-0000-4000-8000-000000000033', 'Limpeza de terreno', 'limpeza-de-terreno', '🗑️', 'Serviços Externos', '🌿', 'wind'),
('c0000000-0000-4000-8000-000000000034', 'Caçamba (entulho)', 'cacamba-entulho', '🏗️', 'Serviços Externos', '🌿', 'wind'),
('c0000000-0000-4000-8000-000000000035', 'DJ', 'dj', '🎧', 'Eventos', '🎉', 'sparkles'),
('c0000000-0000-4000-8000-000000000036', 'Fotógrafo', 'fotografo', '📸', 'Eventos', '🎉', 'sparkles'),
('c0000000-0000-4000-8000-000000000037', 'Filmagem', 'filmagem', '🎥', 'Eventos', '🎉', 'sparkles'),
('c0000000-0000-4000-8000-000000000038', 'Decoração', 'decoracao', '🎈', 'Eventos', '🎉', 'sparkles'),
('c0000000-0000-4000-8000-000000000039', 'Buffet', 'buffet', '🍽️', 'Eventos', '🎉', 'sparkles'),
('c0000000-0000-4000-8000-000000000040', 'Advogado', 'advogado', '⚖️', 'Profissionais Especializados', '🧑‍🔧', 'briefcase'),
('c0000000-0000-4000-8000-000000000041', 'Contador', 'contador', '📊', 'Profissionais Especializados', '🧑‍🔧', 'briefcase'),
('c0000000-0000-4000-8000-000000000042', 'Personal trainer', 'personal-trainer', '💪', 'Profissionais Especializados', '🧑‍🔧', 'briefcase'),
('c0000000-0000-4000-8000-000000000043', 'Cabeleireiro', 'cabeleireiro', '✂️', 'Profissionais Especializados', '🧑‍🔧', 'briefcase'),
('c0000000-0000-4000-8000-000000000044', 'Manicure', 'manicure', '💅', 'Profissionais Especializados', '🧑‍🔧', 'briefcase'),
('c0000000-0000-4000-8000-000000000045', 'Banho e tosa', 'banho-e-tosa', '🛁', 'Pets', '🐾', 'sparkles'),
('c0000000-0000-4000-8000-000000000046', 'Adestrador', 'adestrador', '🐕‍🦺', 'Pets', '🐾', 'sparkles'),
('c0000000-0000-4000-8000-000000000047', 'Veterinário', 'veterinario', '🩺', 'Pets', '🐾', 'sparkles'),
('c0000000-0000-4000-8000-000000000048', 'Frete', 'frete', '🚚', 'Transporte e Frete', '🚚', 'truck'),
('c0000000-0000-4000-8000-000000000049', 'Mudança', 'mudanca', '📦', 'Transporte e Frete', '🚚', 'truck'),
('c0000000-0000-4000-8000-000000000050', 'Entregador', 'entregador', '🛵', 'Transporte e Frete', '🚚', 'truck')
ON CONFLICT (id) DO NOTHING;
