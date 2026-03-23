import { useState } from 'react'
import { Megaphone, TrendingUp, Target, Users, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

export default function AdvertisePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Solicitação Enviada!',
        description: 'Nossa equipe entrará em contato em breve para apresentar os planos.',
      })
      ;(e.target as HTMLFormElement).reset()
    }, 1500)
  }

  const benefits = [
    {
      icon: Target,
      title: 'Público Segmentado',
      desc: 'Seu anúncio aparece exatamente quando o cliente busca por serviços relacionados ao seu nicho.',
    },
    {
      icon: TrendingUp,
      title: 'Alta Visibilidade',
      desc: 'Destaque-se em meio aos profissionais e seja a primeira escolha para fornecimento de materiais ou serviços corporativos.',
    },
    {
      icon: Users,
      title: 'Conexão Direta',
      desc: 'Receba leads qualificados diretamente no seu WhatsApp, sem intermediários.',
    },
  ]

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1600/600?q=business%20meeting&color=blue')] opacity-10 object-cover mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Megaphone className="w-12 h-12 mx-auto mb-6 text-primary animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Divulgue sua Marca para o Público Certo
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Anuncie sua empresa no Guia Rondonópolis de forma contextual. Ofereça seus produtos e
            serviços diretamente na página dos profissionais relacionados ao seu negócio.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-10 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Por que anunciar conosco?</h2>
              <p className="text-muted-foreground text-lg">
                Conectamos prestadores de serviço, clientes finais e fornecedores em um único
                ecossistema inteligente.
              </p>
            </div>

            <div className="space-y-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-secondary">{b.title}</h3>
                    <p className="text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 p-6 rounded-2xl border">
              <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Exemplo Prático
              </h4>
              <p className="text-sm text-muted-foreground">
                Se você tem uma <strong>Loja de Materiais de Construção</strong>, seus anúncios
                aparecerão para usuários que buscam por Pedreiros, Pintores e Encanadores.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border animate-fade-in">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-secondary mb-2">Fale com nossa equipe</h3>
              <p className="text-muted-foreground">
                Preencha os dados e descubra o plano ideal para o tamanho do seu negócio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Empresa</label>
                <Input required placeholder="Sua Empresa Ltda" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seu Nome</label>
                  <Input required placeholder="João Silva" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">WhatsApp</label>
                  <Input required type="tel" placeholder="(66) 99999-9999" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Corporativo</label>
                <Input required type="email" placeholder="contato@empresa.com.br" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Segmento de Atuação</label>
                <Input required placeholder="Ex: Materiais de Construção, Autopeças..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensagem Adicional (Opcional)</label>
                <Textarea
                  placeholder="Como podemos ajudar a crescer seu negócio?"
                  className="h-24"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Contato Comercial'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
