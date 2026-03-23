import { Link } from 'react-router-dom'
import { MOCK_CATEGORIES } from '@/stores/mockData'
import { CategoryIcon } from '@/components/CategoryIcon'

export function CategoriesGrid() {
  const getSlug = (str: string) => str.toLowerCase().replace(/\s+/g, '-')

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Serviços Populares</h2>
          <p className="text-muted-foreground">As categorias mais buscadas na cidade</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MOCK_CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              to={`/categoria/${getSlug(cat)}`}
              className="group bg-white border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary hover:shadow-elevation transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <CategoryIcon category={cat} className="w-8 h-8" />
              </div>
              <span className="font-semibold text-secondary text-center group-hover:text-primary transition-colors">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
