import { useState } from 'react'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import useMainStore from '@/stores/main'

export function AdminCategoriesTab() {
  const { categories, addCategory, updateCategory, deleteCategory } = useMainStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    icon: '',
    group: '',
    suggested_services: [] as string[],
  })

  const handleEdit = (cat: any) => {
    setEditingId(cat.id)
    setForm({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon || '',
      group: cat.group || '',
      suggested_services: cat.suggested_services || [],
    })
    setIsOpen(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setForm({ name: '', slug: '', icon: '', group: '', suggested_services: [] })
    setIsOpen(true)
  }

  const handleSave = () => {
    if (editingId) {
      updateCategory(editingId, form)
    } else {
      addCategory(form)
    }
    setIsOpen(false)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-end">
        <Button onClick={handleNew}>
          <Plus className="w-4 h-4 mr-2" /> Nova Categoria
        </Button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Serviços Sugeridos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>{cat.slug}</TableCell>
                <TableCell>{cat.group || '-'}</TableCell>
                <TableCell
                  className="max-w-[200px] truncate"
                  title={cat.suggested_services?.join(', ')}
                >
                  {cat.suggested_services?.join(', ') || '-'}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhuma categoria cadastrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL)</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grupo</label>
              <Input
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ícone (Lucide)</label>
              <Input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium">
                Serviços da Categoria (separados por vírgula)
              </label>
              <Input
                value={form.suggested_services.join(', ')}
                onChange={(e) =>
                  setForm({
                    ...form,
                    suggested_services: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Ex: Instalação, Manutenção"
              />
              <p className="text-xs text-muted-foreground">
                Estes serviços aparecerão como sugestão para os profissionais no cadastro.
              </p>
            </div>
            <Button className="w-full mt-6" onClick={handleSave}>
              Salvar Categoria
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
