import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, MapPin, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CATEGORY_GROUPS } from '@/stores/mockData'
import useMainStore from '@/stores/main'

const getSlug = (str: string) => str.toLowerCase().replace(/\s+/g, '-')

export default function Layout() {
  const location = useLocation()
  const { currentUserId } = useMainStore()

  const NavLinks = () => (
    <>
      <Link to="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
        Início
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 outline-none py-2 text-left">
          Categorias <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[260px] max-h-[60vh] overflow-y-auto">
          <DropdownMenuItem asChild className="font-semibold mb-2 bg-muted/30">
            <Link to="/categoria/todas">Todas as Categorias</Link>
          </DropdownMenuItem>
          {Object.entries(CATEGORY_GROUPS).map(([group, cats]) => (
            <DropdownMenuGroup key={group} className="mb-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground bg-muted py-1">
                {group}
              </DropdownMenuLabel>
              {cats.map((cat) => (
                <DropdownMenuItem key={cat} asChild>
                  <Link to={`/categoria/${getSlug(cat)}`}>{cat}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        to={currentUserId ? '/editar-perfil' : '/cadastrar'}
        className="text-sm font-medium hover:text-primary transition-colors py-2"
      >
        {currentUserId ? 'Editar Perfil' : 'Anuncie seu Serviço'}
      </Link>
      <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors py-2">
        Admin
      </Link>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xl text-secondary">Guia Rondonópolis</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
            {!currentUserId ? (
              <Button asChild className="shadow-sm hover:shadow-md transition-all font-semibold">
                <Link to="/cadastrar">Anuncie seu Serviço</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="shadow-sm hover:shadow-md transition-all font-semibold"
              >
                <Link to={`/profissional/${currentUserId}`}>Meu Perfil</Link>
              </Button>
            )}
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
                <SheetTitle className="text-left flex items-center gap-2 border-b pb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  Guia Rondonópolis
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6 items-start w-full">
                <NavLinks />
                <div className="w-full mt-6 pt-6 border-t">
                  {!currentUserId ? (
                    <Button asChild className="w-full font-semibold">
                      <Link to="/cadastrar">Anuncie seu Serviço</Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full font-semibold">
                      <Link to={`/profissional/${currentUserId}`}>Meu Perfil</Link>
                    </Button>
                  )}
                </div>
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
                  className="text-sm text-secondary-foreground/80 hover:text-white transition-colors"
                >
                  Todas as Categorias
                </Link>
              </li>
              <li>
                <Link
                  to="/cadastrar"
                  className="text-sm text-secondary-foreground/80 hover:text-white transition-colors"
                >
                  Anuncie seu Serviço
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-secondary-foreground/80 hover:text-white transition-colors"
                >
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
