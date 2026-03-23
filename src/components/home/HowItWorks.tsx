import { Search, MousePointerClick, MessageCircle } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Busque o serviço',
      desc: 'Encontre o que precisa usando nossa barra de pesquisa ou categorias.',
    },
    {
      icon: MousePointerClick,
      title: 'Escolha um profissional',
      desc: 'Veja avaliações, fotos e informações detalhadas de cada perfil.',
    },
    {
      icon: MessageCircle,
      title: 'Fale direto no WhatsApp',
      desc: 'Sem intermediários. Clique e combine o orçamento direto com o prestador.',
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary text-center mb-16">
          Como Funciona o Guia?
        </h2>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-background shadow-lg flex items-center justify-center mb-6 z-10 text-primary">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">{step.title}</h3>
              <p className="text-muted-foreground max-w-[250px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
