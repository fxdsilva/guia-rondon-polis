import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const NavLinks = () => (
    <>
      <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
        Início
      </Link>
      <Link
        to="/categoria/todas"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Categorias
      </Link>
      <Link to="/cadastrar" className="text-sm font-medium hover:text-primary transition-colors">
        Cadastrar Serviço
      </Link>
      <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
        Admin
      </Link>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-secondary">Guia Rondonópolis</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
            <Button asChild>
              <Link to="/cadastrar">Anuncie Grátis</Link>
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Guia Rondonópolis
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <NavLinks />
                <Button asChild className="mt-4 w-full">
                  <Link to="/cadastrar">Anuncie Grátis</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 mt-16 animate-fade-in flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">Guia Rondonópolis</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed max-w-sm">
              Conectando os moradores de Rondonópolis aos melhores profissionais locais. Rápido,
              seguro e direto no seu WhatsApp.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/categoria/todas"
                  className="text-sm text-secondary-foreground/80 hover:text-white"
                >
                  Todas as Categorias
                </Link>
              </li>
              <li>
                <Link
                  to="/cadastrar"
                  className="text-sm text-secondary-foreground/80 hover:text-white"
                >
                  Seja um Profissional
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-foreground/80 hover:text-white">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contato</h4>
            <p className="text-sm text-secondary-foreground/80 mb-2">Suporte: (66) 99999-9999</p>
            <p className="text-sm text-secondary-foreground/80">contato@guiarondonopolis.com.br</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-secondary-foreground/60">
          &copy; {new Date().getFullYear()} Guia Rondonópolis. Todos os direitos reservados.
        </div>
      </footer>

      <a
        href="https://wa.me/5566999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-fade-in-up"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  )
}
