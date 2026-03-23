import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1600/400?q=tools&color=green')] opacity-10 object-cover mix-blend-overlay" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Você presta serviços em Rondonópolis?
        </h2>
        <p className="text-primary-foreground/90 text-lg mb-10 max-w-2xl mx-auto">
          Crie seu perfil, aumente sua visibilidade na cidade e receba contatos direto no seu
          WhatsApp todos os dias.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-bold px-8 h-14 text-lg group shadow-xl border-none"
        >
          <Link to="/cadastrar">
            Anuncie seu Serviço
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
